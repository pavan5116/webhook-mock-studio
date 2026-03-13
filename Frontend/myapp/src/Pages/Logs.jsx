import { useEffect, useState } from "react"
import API from "../Api"
import { Link } from "react-router-dom"

export default function Logs(){

  const [logs,setLogs] = useState([])

  useEffect(()=>{
    API.get("/logs/")
      .then(res => setLogs(res.data))
  },[])

  return(
    <div>

      <h2>Request Logs</h2>

      {logs.map((log,i)=>(
        <div key={i}>
          <p>{log.method} /{log.endpoint}</p>
          <p>Status: {log.status}</p>
          <p>Time: {log.time}</p>
        </div>
      ))}

      <div style={{ position: "absolute", top: "20px", right: "20px", display: "flex", gap: "15px" }}>
        <Link to="/dashboard">
          Dashboard
        </Link>
        <Link to="/logout">Logout</Link>
      </div>

      

      

    </div>
  )
}