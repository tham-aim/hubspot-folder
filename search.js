import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.get("/api/folders", async (req, res) => {
  try {
    const hubspotRes = await fetch("https://api.hubapi.com/files/v3/folders/search?parentFolderIds=264743914744", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HUBSPOT_TOKEN}`
      }
    });

    const data = await hubspotRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
