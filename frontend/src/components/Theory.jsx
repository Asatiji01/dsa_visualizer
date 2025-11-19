import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, Link } from "react-router-dom";

export default function Theory() {
  const { algo } = useParams();
  const [theory, setTheory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);   // but DON'T remove previous content
        const res = await API.get(`/sorts/theory/${algo}`);
        setTheory(res.data);
        setErr("");
      } catch (e) {
        setErr(e.response?.data?.msg || "Failed to load theory");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [algo]);

  if (err)
    return (
      <div className="container">
        <div className="card">{err}</div>
      </div>
    );

  if (!theory)
    return (
      <div className="container">
        <div className="card">No theory found</div>
      </div>
    );

  const {
    title,
    description,
    timeComplexity,
    spaceComplexity,
    stable,
    usecases,
    pros,
    cons,
    example,
  } = theory;

  return (
    <div className="container">
      <div className="card" style={{ padding: 18, opacity: loading ? 0.5 : 1, transition: "opacity 0.25s" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0 }}>{title}</h2>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>{algo.toUpperCase()}</div>
          </div>
          <div>
            <Link to="/" className="btn ghost small">Back</Link>
            {/* <Link to={`/visualizer?algo=${algo}`} className="btn primary small" style={{ marginLeft: 8 }}>
              Open Visualizer
            </Link> */}
          </div>
        </div>

        {/* BODY */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>

          {/* LEFT CONTENT */}
          <div>
            <h3>About</h3>
            <p style={{ color: "var(--muted)" }}>{description}</p>

            {example && (
              <>
                <h3 style={{ marginTop: 12 }}>Example</h3>
                <div className="code-block">{example}</div>
              </>
            )}

            <h3 style={{ marginTop: 12 }}>Use cases</h3>
            <ul>{usecases?.map((u, i) => <li key={i}>{u}</li>)}</ul>

            <h3 style={{ marginTop: 12 }}>Pros & Cons</h3>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <h4>Pros</h4>
                <ul>{pros?.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div style={{ flex: 1 }}>
                <h4>Cons</h4>
                <ul>{cons?.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside>
            <div className="card" style={{ padding: 12 }}>
              <h4>Complexity</h4>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr><td>Best</td><td style={{ textAlign: "right" }}>{timeComplexity?.best}</td></tr>
                  <tr><td>Average</td><td style={{ textAlign: "right" }}>{timeComplexity?.average}</td></tr>
                  <tr><td>Worst</td><td style={{ textAlign: "right" }}>{timeComplexity?.worst}</td></tr>
                  <tr><td>Space</td><td style={{ textAlign: "right" }}>{spaceComplexity}</td></tr>
                  <tr><td>Stable</td><td style={{ textAlign: "right" }}>{stable ? "Yes" : "No"}</td></tr>
                </tbody>
              </table>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

