import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [showPseudo, setShowPseudo] = useState(false);
  const [algo, setAlgo] = useState('bubble');
  const [pcode, setPcode] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();
  const location = useLocation();

  // ---- ALGO CHANGE HANDLER (FIXED FOR SMOOTHNESS) ----
  function handleAlgoChange(e) {
    const selected = e.target.value;
    setAlgo(selected);

    // Smooth navigation without page remount
    if (location.pathname.startsWith("/theory")) {
      navigate(`/theory/${selected}`, { replace: true });
    }
  }

  async function fetchPseudocode(selectedAlgo = algo) {
    try {
      const res = await API.get(`/sorts/pseudocode/${selectedAlgo}`);
      setPcode(res.data.pseudocode || 'Not available');
      setShowPseudo(true);
    } catch (err) {
      const fallback = {
        bubble: `for i from 0 to n-1
  for j from 0 to n-i-2
    if a[j] > a[j+1] then swap`,
        selection: `for i from 0 to n-1
  min=i
  for j from i+1 to n-1
    if a[j] < a[min] then min=j
  swap a[i], a[min]`,
        insertion: `for i from 1 to n-1
  key = a[i]
  j = i-1
  while j >=0 and a[j] > key
    a[j+1] = a[j]
    j--
  a[j+1] = key`,
        merge: `mergeSort(a,l,r)
  if l<r
    m=(l+r)/2
    mergeSort(a,l,m)
    mergeSort(a,m+1,r)
    merge(a,l,m,r)`,
        quick: `quickSort(a,low,high)
  if low<high
    pi=partition(a,low,high)
    quickSort(a,low,pi-1)
    quickSort(a,pi+1,high)`,
        heap: `build max heap
for i from n-1 down to 1
  swap a[0], a[i]
  heapify(a,0,i)`
      };
      setPcode(fallback[selectedAlgo] || 'Not available');
      setShowPseudo(true);
    }
  }

  useEffect(() => {
    if (showPseudo && user) fetchPseudocode(algo);
  }, [algo]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowPseudo(false);
    navigate('/login');
  }

  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <div className="logo">SV</div>
          <div>
            <div style={{ fontSize: 16 }}>Sorting Visualizer</div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}> Step-by-step</div>
          </div>
        </div>

        <div className="nav">

          {/* Sorting + Pseudocode (only when logged in) */}
          {user && (
            <>
              <select
                className="select small"
                value={algo}
                onChange={handleAlgoChange}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '6px',
                  borderRadius: '6px',
                }}
              >
                <option value="bubble">Bubble</option>
                <option value="selection">Selection</option>
                <option value="insertion">Insertion</option>
                <option value="merge">Merge</option>
                <option value="quick">Quick</option>
                <option value="heap">Heap</option>
              </select>

              <button
                className="btn small ghost"
                onClick={() => fetchPseudocode()}
              >
                Show Pseudocode
              </button>
            </>
          )}

          {/* THEORY BUTTON */}
          {user && (
            <Link
              to={`/theory/${algo}`}
              className="btn small ghost"
              style={{ marginRight: 6 }}
            >
              Theory
            </Link>
          )}

          {/* Login / Logout */}
          {user ? (
            <>
              <span style={{ color: '#dbeafe', marginLeft: 8 }}>
                Hi, {user.name}
              </span>
              <button className="btn small" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">SignUp</Link>
            </>
          )}
        </div>
      </div>

      {/* Pseudocode Drawer */}
      {user && showPseudo && (
        <div
          style={{
            maxWidth: 1100,
            margin: '12px auto',
            padding: '12px',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '8px',
          }}
          className="container"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <strong style={{ fontSize: 14 }}>
              Pseudocode: {algo}
            </strong>
            <button
              className="btn small"
              onClick={() => setShowPseudo(false)}
              style={{
                background: '#1e293b',
                color: '#f1f5f9',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '4px 8px',
              }}
            >
              Close
            </button>
          </div>

          <pre
            className="code-block"
            style={{
              marginTop: 10,
              fontSize: 13,
              background: '#1e293b',
              padding: '10px',
              borderRadius: '6px',
              overflowX: 'auto',
            }}
          >
            {pcode}
          </pre>
        </div>
      )}
    </header>
  );
}
