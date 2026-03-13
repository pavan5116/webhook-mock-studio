import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from  "./components/ProtectedRoute"
import Dashboard from "./Pages/Dashboard"
import Createmock from "./Pages/Createmock"
import Logs from "./Pages/Logs"
import Logout from "./Pages/Logout";
import Home from "./Pages/Home";
import Mocks from "./Pages/Mocks"


function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>} />
<Route path="/login" element={<Login/>}/>

<Route path="/register" element={<Register/>}/>
<Route path="/logout" element={<Logout/>}/>

<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
<Route path="/createmock" element={<ProtectedRoute><Createmock/></ProtectedRoute>} />
<Route path="/logs" element={<ProtectedRoute><Logs/></ProtectedRoute>} />
<Route path="/mocks" element={<ProtectedRoute><Mocks/></ProtectedRoute>} />

</Routes>

</BrowserRouter>

)
}

export default App;