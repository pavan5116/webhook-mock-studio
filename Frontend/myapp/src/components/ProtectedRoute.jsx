import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../Api";



function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {

    API.get("/check/")
      .then(() => {
        setAuth(true);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      });

  }, []);

  if (loading) return <p>Loading...</p>;

  if (!auth) return <Navigate to="/login"/>;

  return children;
}

export default ProtectedRoute;