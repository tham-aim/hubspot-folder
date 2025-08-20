export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>HubSpot API Server</h1>
      <p>Your Next.js API server is running successfully!</p>
      
      <h2>Available API Endpoint:</h2>
      <ul>
        <li>
          <strong>GET /api/search</strong> - Search for files or folders
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID&type=folders|files&limit=100</code>
        </li>
      </ul>
      
      <h2>Search Types:</h2>
      <ul>
        <li><strong>type=folders</strong> - Search only folders</li>
        <li><strong>type=files</strong> - Search only files</li>
      </ul>
      
      <h2>Parameters:</h2>
      <ul>
        <li><strong>parentFolderIds</strong> (required) - The folder ID to search in</li>
        <li><strong>type</strong> (required) - Either 'folders' or 'files'</li>
        <li><strong>limit</strong> (optional) - Limit for files search, default: 100</li>
      </ul>
      
      <h2>Test URLs:</h2>
      <p>
        <a href="/api/search?parentFolderIds=264743914744&type=folders" target="_blank">
          Search Folders
        </a>
      </p>
      <p>
        <a href="/api/search?parentFolderIds=264743914744&type=files&limit=10" target="_blank">
          Search Files (Limit 10)
        </a>
      </p>
      
      <h2>CORS Support:</h2>
      <p>✅ Cross-origin requests are enabled for all origins</p>
    </div>
  )
}
