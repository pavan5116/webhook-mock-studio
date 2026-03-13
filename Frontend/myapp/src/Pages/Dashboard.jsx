import { useEffect, useState } from "react"
import API from "../Api"
import { Link } from "react-router-dom"

export default function Dashboard(){

  const [data,setData] = useState(null)

  useEffect(()=>{

    API.get("/dashboard/")
      .then(res => setData(res.data))
      .catch(err => console.log(err.response.data))

  },[])

  if(!data) return <p>Loading...</p>

  return(
    <div>

      <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "15px" }}>
     <Link to="/createmock">
          Create Mock API
        </Link>
      <Link to="/mocks">
          My Mocks
        </Link>
      <Link to="/logs">
          Logs
        </Link>
    <Link to="/logout">Logout</Link>
</div>

      <h2>Dashboard</h2>

      <p>Total APIs: {data.total_apis}</p>

      <p>Total Requests: {data.total_requests}</p>

      <h3>Recent Logs</h3>

      {data.recent_logs.map((log,i)=>(
        <div key={i}>
          {log.method} /{log.endpoint} → {log.status}
        </div>
      ))}

     

        

    </div>
  )
}