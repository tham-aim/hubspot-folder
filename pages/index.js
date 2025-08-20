export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>HubSpot API Server</h1>
      <p>Your Next.js API server is running successfully!</p>
      
      <h2>Available API Endpoints:</h2>
      <ul>
        <li>
          <strong>GET /api/folders</strong> - Search folders
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID</code>
        </li>
        <li>
          <strong>GET /api/files</strong> - Search files
          <br />
          <code>?parentFolderIds=YOUR_FOLDER_ID&limit=100</code>
        </li>
      </ul>
      
      <h2>Test URLs:</h2>
      <p>
        <a href="/api/folders?parentFolderIds=264743914744" target="_blank">
          Test Folders API
        </a>
      </p>
      <p>
        <a href="/api/files?parentFolderIds=264743914744&limit=10" target="_blank">
          Test Files API
        </a>
      </p>
    </div>
  )
}
