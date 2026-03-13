import { useEffect, useState } from "react"
import API from "../Api"
import { Link} from "react-router-dom"

function Mocks() {
  const [mocks, setMocks] = useState([])
  

  useEffect(() => {
    API.get("/mymocks/")
      .then(res => setMocks(res.data))
      .catch(err => console.error("Error fetching mocks:", err))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Mock APIs</h2>
      {mocks.map((mock, i) => {
        const endpointPath = mock.endpoint_id || mock.endpoint
        const url = `http://localhost:8000/mock/${endpointPath}`

        return (
          <div key={i} style={{ borderBottom: "1px solid #eee", padding: "10px", marginBottom: "10px" }}>
            <b>{mock.method}</b> /mock/{endpointPath}
            <br /><br />
            <button onClick={() => {
              navigator.clipboard.writeText(url)
              alert("Copied: " + url)
            }}>
              Copy Mock URL
            </button>
          </div>
        )
      })}

      <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "15px" }}>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/logout">Logout</Link>
</div>
        
  
    </div>
  )
}

export default Mocks