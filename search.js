import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = 3005;

app.get("/api/folders", async (req, res) => {
  try {
    const { parentFolderIds } = req.query;
    
    if (!parentFolderIds) {
      return res.status(400).json({ error: "parentFolderIds is required" });
    }

    const response = await fetch(`https://api.hubapi.com/files/v3/folders/search?parentFolderIds=${parentFolderIds}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
