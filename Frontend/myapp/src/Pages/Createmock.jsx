import React, { useState, useEffect } from 'react'
import API from '../Api'
import { Link, useNavigate } from "react-router-dom"

export default function Createmock() {
    const [endpoint, setEndpoint] = useState("")
    const [method, setMethod] = useState("GET")
    const [response, setResponse] = useState("")
    const [status, setStatus] = useState("200")
    const [headers, setHeaders] = useState("")
    const nav = useNavigate()

    const createapi = async (e) => {
        e.preventDefault()

        try {
            const bodyData = response ? JSON.parse(response) : {}
            const headerData = headers ? JSON.parse(headers) : {}

            await API.post("/mock/", {
                endpoint_id: endpoint,
                method: method,
                response_body: bodyData,
                status_code: parseInt(status),
                headers: headerData
            })

            const url = `http://localhost:8000/mock/${endpoint}`
            await navigator.clipboard.writeText(url)
            
            alert(`Mock API Created!\nEndpoint: ${url}\nCopied to clipboard`)

            nav("/mocks")


            setEndpoint("")
            setMethod("GET")
            setResponse("")
            setStatus("200")
            setHeaders("")
            
        } catch (err) {
            if (err instanceof SyntaxError) {
                alert("Check your JSON formatting in the Response or Headers fields.")
            } else {
                console.error("Error creating mock:", err)
                alert("Something went wrong. check the console.")
            }
        }
    }

    return (
        <div>
          <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <Link to="/logout">Logout</Link>

      
      </div>
            <center>
                <form onSubmit={createapi}>
                    <br />
                    <h2>Create New Mock API</h2>
                    <hr width="50%" />
                    <br />

                    <table border="0" cellPadding="10">
                        <tbody>
                            <tr>
                                <td align="right"><b>Endpoint Path:</b></td>
                                <td>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. users/list" 
                                        size="40" 
                                        value={endpoint}
                                        required 
                                        onChange={(e) => setEndpoint(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td align="right"><b>HTTP Method:</b></td>
                                <td>
                                    <select value={method} onChange={(e) => setMethod(e.target.value)}>
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td align="right"><b>Status Code:</b></td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td align="right" valign="top"><b>Response Headers:</b></td>
                                <td>
                                    <textarea 
                                        rows="4" 
                                        cols="40" 
                                        placeholder='{ "Content-Type": "application/json" }'
                                        value={headers}
                                        onChange={(e) => setHeaders(e.target.value)}
                                    ></textarea>
                                    <br />
                                    <small>(Enter as JSON format)</small>
                                </td>
                            </tr>

                            <tr>
                                <td align="right" valign="top"><b>Response Body:</b></td>
                                <td>
                                    <textarea 
                                        rows="8" 
                                        cols="40" 
                                        placeholder='{ "id": 1, "name": "Test" }'
                                        value={response}
                                        required
                                        onChange={(e) => setResponse(e.target.value)}
                                    ></textarea>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan="2" align="center">
                                    <br />
                                    <input type="submit" value="Save Mock API" />
                                    &nbsp;&nbsp;&nbsp;
                                    <input type="button" value="Clear" onClick={() => {
                                        setEndpoint(""); setResponse(""); setHeaders("");
                                    }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </center>

            <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        </div>
    )
}