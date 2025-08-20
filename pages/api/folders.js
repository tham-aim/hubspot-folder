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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { parentFolderIds } = req.query;
    if (!parentFolderIds) {
      return res.status(400).json({ error: "parentFolderIds is required" });
    }

    const data = await callHubSpotAPI("folders/search", { parentFolderIds });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
