import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #071026 0%, #041022 100%)",
        color: "#e6eef8",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "28px",
          borderRadius: "14px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          boxShadow: "0 8px 40px rgba(2,6,23,0.7)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            className="logo"
            style={{
              width: "48px",
              height: "48px",
              margin: "0 auto 10px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            S
          </div>
          <h2 style={{ margin: 0, fontWeight: 600 }}>Login</h2>
          <p style={{ color: "var(--muted)", fontSize: "14px" }}>
            Access your Sorting Visualizer
          </p>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            type="email"
            required
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
              color: "inherit",
              outline: "none",
            }}
          />

          <input
            type="password"
            required
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
              color: "inherit",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="btn primary"
            style={{
              marginTop: "8px",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: 600,
              cursor: "pointer",
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
              color: "#fff",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "var(--accent)" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
