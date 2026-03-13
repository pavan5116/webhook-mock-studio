import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api";
import { Link } from 'react-router-dom';
import axios from "axios";


function Login(){

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault()

    try{

      await API.post("/login/",{
        username:username,
        password:password
      });

      alert("Login Success");
      navigate("/dashboard")

      setUsername("")
      setPassword("")

      


    }catch(err){
        console.error(err)

      alert("Login failed");

    }

  }

  return(

    <div>

      <h2>Login</h2>

      <form onSubmit={login}>

            <div> <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} /> </div>
            <div> <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /> </div>
            <div> <button type="submit">Submit</button> </div>
        </form>

        <div><h3>New User Create account here</h3>
        <Link to="/register">Register</Link></div>
    </div>


  )
}

export default Login;