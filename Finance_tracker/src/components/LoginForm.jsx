import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", { email, password });
      onLogin();
        navigate("/dashboard")
    } catch (err) {
      alert("Invalid credentials", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form className="" onSubmit={login}>
        <div>
          <input
            className="border-1 m-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="border-1 m-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="border-1 bg-blue-500 p-2 m-2" type="submit">
          Login
        </button>
      </form>
      <div>hello</div>
    </div>
  );
}
