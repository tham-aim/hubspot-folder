import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 80;

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

app.get("/api/folders", async (req, res) => {
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
});

app.get("/api/files", async (req, res) => {
  try {
    const { parentFolderIds, limit = 100 } = req.query;
    if (!parentFolderIds) {
      return res.status(400).json({ error: "parentFolderIds is required" });
    }

    const data = await callHubSpotAPI("files/search", { parentFolderIds, limit });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
