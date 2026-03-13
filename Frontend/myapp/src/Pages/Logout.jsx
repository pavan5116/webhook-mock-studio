import { useEffect } from "react"
import API from "../Api"
import { useNavigate } from "react-router-dom"

export default function Logout() {
  const nav = useNavigate()

  useEffect(() => {
    const performLogout = async () => {
      try {
        await API.get("/logout/")
        nav("/")
      } catch (error) {
        console.error(error, error.response?.data)
        nav("/")
      }
    }

    performLogout()
  }, [nav])

  return <div>Logging out...</div>
}