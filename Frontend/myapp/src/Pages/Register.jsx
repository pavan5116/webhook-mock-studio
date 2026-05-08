import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Api";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await API.post("/register/", {
        username: username,
        password: password,
        confirm_password: confirm,
      });

      alert("Account created");
      navigate("/login");

      setUsername("");
      setPassword("");
      setConfirm("");
    } catch (error) {
      console.error(error, error.response.data);
      alert("Register failed");
    }
  };

  return (
    <AuthLayout
      sectionLabel="§ Register"
      title="Create your account"
      subtitle="Start mocking APIs in seconds"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-brick hover:text-brick-dark font-medium">
            Sign in →
          </Link>
        </>
      }
    >
      <form onSubmit={register} className="space-y-5">

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">Username</label>
          <input
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">Password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-widest text-ink-muted mb-2">Confirm password</label>
          <input
            type="password"
            value={confirm}
            placeholder="confirm password"
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 bg-paper border border-rule rounded-sm text-ink placeholder-ink-muted focus:outline-none focus:border-brick focus:ring-2 focus:ring-brick/15 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brick text-on-brick py-3 rounded-sm font-medium hover:bg-brick-dark transition"
        >
          Create account →
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
