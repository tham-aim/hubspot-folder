// Helper function to make HubSpot API calls
async function callHubSpotAPI(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `https://api.hubapi.com/files/v3/${endpoint}?${queryString}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${process.env.HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.status}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { parentFolderIds } = req.query;
    
    if (!parentFolderIds) {
      return res.status(400).json({ error: "parentFolderIds is required" });
    }

    // Step 1: Get subfolders from the parent folder
    const foldersResponse = await callHubSpotAPI("folders/search", { parentFolderIds });
    
    let results;
    if (!foldersResponse.results || foldersResponse.results.length === 0) {
      results = {};
    } else {
      // Step 2: For each subfolder, get all files
      const galleries = [];
      
      for (const folder of foldersResponse.results) {
        try {
          const filesResponse = await callHubSpotAPI("files/search", { 
            parentFolderIds: folder.id, 
            limit: 100 // Get all files from each subfolder
          });
          
          if (filesResponse.results) {
            // Create gallery object with subfolder name and items
            const gallery = {
              folder: folder.name,
              items: filesResponse.results.map(file => ({
                id: file.id,
                name: file.name,
                url: file.url
              }))
            };
            galleries.push(gallery);
          }
        } catch (error) {
          console.error(`Error fetching files from folder ${folder.id}:`, error);
          // Continue with other folders even if one fails
        }
      }
      
      results = galleries;
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
