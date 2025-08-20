export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>HubSpot Galleries API</h1>
      <p>Your Next.js API server is running successfully!</p>
      
      <h2>Available API Endpoint:</h2>
      <ul>
        <li>
          <strong>GET /api/search</strong> - Get galleries with subfolders and files
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID</code>
        </li>
      </ul>
      
      <h2>What it does:</h2>
      <ul>
        <li><strong>Step 1:</strong> Gets all subfolders from the parent folder using HubSpot API</li>
        <li><strong>Step 2:</strong> For each subfolder, retrieves all files and returns them with ID and URL</li>
      </ul>
      
      <h2>Parameters:</h2>
      <ul>
        <li><strong>parentFolderIds</strong> (required) - The parent folder ID to search in</li>
      </ul>
      
      <h2>Response Format:</h2>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`[
  {
    "folder": "Gallery Name",
    "items": [
      {
        "id": "file_id_1",
        "url": "file_url_1"
      },
      {
        "id": "file_id_2", 
        "url": "file_url_2"
      }
    ]
  }
]`}
      </pre>
      
      <h2>Test URL:</h2>
      <p>
        <a href="/api/search?parentFolderIds=264743914744" target="_blank">
          Get Galleries
        </a>
      </p>
      
      <h2>CORS Support:</h2>
      <p>✅ Cross-origin requests are enabled for all origins</p>
    </div>
  )
}
