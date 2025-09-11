// Constants
const API_BASE_URL = 'https://api.hubapi.com/files/v3';
const FILE_LIMIT = 100;
const CURRENT_FOLDER_LABEL = 'current';

// Helper function to make HubSpot API calls
async function callHubSpotAPI(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/${endpoint}?${queryString}`;
  
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

// Helper function to map file data to standard format
function mapFileData(file) {
  return {
    id: file.id,
    name: file.name,
    url: file.url
  };
}

// Helper function to create gallery object
function createGallery(folderName, files) {
  return {
    folder: folderName,
    items: files.map(mapFileData)
  };
}

// Helper function to search files in a folder
async function searchFilesInFolder(parentFolderIds, folderName = null) {
  try {
    const response = await callHubSpotAPI("files/search", { 
      parentFolderIds, 
      limit: FILE_LIMIT
    });
    
    if (response.results && response.results.length > 0) {
      return createGallery(folderName || CURRENT_FOLDER_LABEL, response.results);
    }
    return null;
  } catch (error) {
    console.error(`Error fetching files from folder ${parentFolderIds}:`, error);
    return null;
  }
}

// Helper function to set CORS headers
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Helper function to search subfolders and their files
async function searchSubfolders(parentFolderIds) {
  try {
    const foldersResponse = await callHubSpotAPI("folders/search", { parentFolderIds });
    
    if (!foldersResponse.results || foldersResponse.results.length === 0) {
      return [];
    }

    const subfolderGalleries = [];
    
    // Search files in each subfolder
    for (const folder of foldersResponse.results) {
      const gallery = await searchFilesInFolder(folder.id, folder.name);
      if (gallery) {
        subfolderGalleries.push(gallery);
      }
    }
    
    return subfolderGalleries;
  } catch (error) {
    console.error('Error searching subfolders:', error);
    return [];
  }
}

export default async function handler(req, res) {
  setCORSHeaders(res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { parentFolderIds } = req.query;
    
    if (!parentFolderIds) {
      return res.status(400).json({ error: "parentFolderIds is required" });
    }

    const galleries = [];
    
    // Step 1: Search for files in the current folder
    const currentFolderGallery = await searchFilesInFolder(parentFolderIds);
    if (currentFolderGallery) {
      galleries.push(currentFolderGallery);
    }

    // Step 2: Search subfolders and their files
    const subfolderGalleries = await searchSubfolders(parentFolderIds);
    galleries.push(...subfolderGalleries);

    res.json(galleries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
