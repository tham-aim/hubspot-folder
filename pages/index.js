export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>HubSpot API Server</h1>
      <p>Your Next.js API server is running successfully!</p>
      
      <h2>Available API Endpoints:</h2>
      <ul>
        <li>
          <strong>GET /api/search</strong> - Combined search for files and folders
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID&type=both&limit=100</code>
        </li>
        <li>
          <strong>GET /api/folders</strong> - Search folders only
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID</code>
        </li>
        <li>
          <strong>GET /api/files</strong> - Search files only
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID&limit=100</code>
        </li>
      </ul>
      
      <h2>Search Types:</h2>
      <ul>
        <li><strong>type=folders</strong> - Search only folders</li>
        <li><strong>type=files</strong> - Search only files</li>
      </ul>
      
      <h2>Test URLs:</h2>
      <p>
        <a href="/api/search?parentFolderIds=264743914744&type=folders" target="_blank">
          Search Folders
        </a>
      </p>
      <p>
        <a href="/api/search?parentFolderIds=264743914744&type=folders" target="_blank">
          Folders Only
        </a>
      </p>
      <p>
        <a href="/api/search?parentFolderIds=264743914744&type=files&limit=10" target="_blank">
          Files Only (Limit 10)
        </a>
      </p>
    </div>
  )
}
