import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Api";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await API.post("/login/", {
        username: username,
        password: password,
      });

      alert("Login Success");
      navigate("/dashboard");

      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <AuthLayout
      sectionLabel="§ Sign in"
      title="Welcome back"
      subtitle="Sign in to your MockAPI account"
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="text-brick hover:text-brick-dark font-medium">
            Create an account →
          </Link>
        </>
      }
    >
      <form onSubmit={login} className="space-y-5">

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brick text-on-brick py-3 rounded-sm font-medium hover:bg-brick-dark transition"
        >
          Sign in →
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
