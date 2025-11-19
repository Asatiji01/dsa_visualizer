import React, { useState } from "react";
import API from "../../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #071026 0%, #041022 100%)",
        color: "#e6eef8",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(2,6,23,0.6)",
          border: "1px solid rgba(255,255,255,0.05)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Create Account</h2>

        <form onSubmit={submit}>
          <div style={{ marginBottom: "14px" }}>
            <input
              required
              className="input"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <input
              required
              className="input"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <input
              required
              type="password"
              className="input"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn primary"
            style={{ width: "100%", marginTop: "10px" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "14px",
            marginTop: "16px",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
