import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import axios from "axios";

function Register(){

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");

  const register = async (e) => {
    e.preventDefault()

    try{

      await axios.post("http://localhost:8000/register/",{
        username:username,
        password:password,
        confirm_password:confirm
      });

      alert("Account created");

      navigate("/login");

      setUsername("")
      setPassword("")
      setConfirm("")

      

    }catch(error){

        console.error(error, error.response.data)
      alert("Register failed");

    }

  }

  return(

     <div>
        <h3>Create New account </h3>
        <form onSubmit={register}>
           <div><input type="text" value={username} placeholder="username"  onChange={(e)=>setUsername(e.target.value)} /></div> 
           <div><input type="password" value={password} placeholder="password"  onChange={(e)=>setPassword(e.target.value)} /> </div> 
           <div><input type="password" value={confirm} placeholder="confirm password"  onChange={(e)=>setConfirm(e.target.value)} /> </div> 
            <div><button type="submit">Submit</button> </div>
        </form>


        <p>Login here</p>
        <Link to="/login">Login</Link>

    </div>
  )
}

export default Register;