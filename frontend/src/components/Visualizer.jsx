import React, { useEffect, useRef, useState } from 'react'
import { algorithms } from '../utils/sorts'
import API from '../api'
import './Visualizer.css'
import { Link } from "react-router-dom";

const DEFAULT_ARRAY = [5, 2, 7, 1, 4];
const MAX_SIZE = 7;

export default function Visualizer() {
  const [arr, setArr] = useState(DEFAULT_ARRAY.slice(0, MAX_SIZE));
  const [size, setSize] = useState(Math.min(DEFAULT_ARRAY.length, MAX_SIZE));
  const [algoKey, setAlgoKey] = useState('bubble');
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [inputArray, setInputArray] = useState('');
  const [compareData, setCompareData] = useState([]);
  const timer = useRef(null);

  const theoryMap = {
    bubble: 'Bubble Sort repeatedly steps through the list...',
    selection: 'Selection Sort divides array into sorted + unsorted parts...',
    insertion: 'Insertion Sort inserts each element into correct position...',
    merge: 'Merge Sort divides array, sorts recursively and merges...',
    quick: 'Quick Sort picks a pivot and partitions the array...',
    heap: 'Heap Sort builds a max heap and repeatedly extracts the largest...'
  };

  useEffect(() => {
    generateSteps();
    setPlaying(false);
    setIndex(0);
  }, [arr, algoKey]);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIndex(i => Math.min(i + 1, steps.length - 1));
      }, 700);
    } else clearInterval(timer.current);

    return () => clearInterval(timer.current);
  }, [playing, steps.length]);

  useEffect(() => {
    if (index >= steps.length - 1) setPlaying(false);
  }, [index, steps.length]);

  function generateSteps() {
    const gen = algorithms[algoKey].generator(arr.slice(0, size));
    const s = [];
    for (const step of gen) s.push(step);
    setSteps(s);
  }

  function handleRandomize() {
    const n = size;
    const a = Array.from({ length: n }, () =>
      Math.floor(Math.random() * 100) + 1
    );
    setArr(a);
  }

  function handleSetSize(val) {
    const v = Math.max(1, Math.min(MAX_SIZE, Number(val)));
    setSize(v);
    setArr(a => {
      const copy = a.slice(0, v);
      while (copy.length < v)
        copy.push(Math.floor(Math.random() * 50) + 1);
      return copy;
    });
  }

  function handleReset() {
    setArr(DEFAULT_ARRAY.slice(0, size));
    setIndex(0);
    setPlaying(false);
  }

  function handleInputArray() {
    try {
      const custom = inputArray
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));

      if (custom.length) setArr(custom.slice(0, MAX_SIZE));
    } catch {
      alert('Invalid input!');
    }
  }

  // -------------------- IMPORTANT FIX ----------------------
  function comparePerformance() {
    const data = Object.keys(algorithms).map(k => {
      const gen = algorithms[k].generator(arr.slice(0, size));

      let compares = 0;

      for (const step of gen) {
        if (step.type === "compare") compares++;
      }

      return {
        name: algorithms[k].name,
        steps: compares
      };
    });

    setCompareData(data);
  }
  // ---------------------------------------------------------

  const isSorted =
    JSON.stringify(arr.slice().sort((a, b) => a - b)) === JSON.stringify(arr);

  const current = steps[index] || { arr };

  return (
    <div className="visualizer-container">
      <div className="navbar">
        <h2>Sorting Visualizer</h2>
        <span className="algo-name">{algorithms[algoKey].name}</span>
      </div>

      <div className="controls-panel">
        <select
          value={algoKey}
          onChange={e => setAlgoKey(e.target.value)}
          disabled={isSorted}
        >
          {Object.keys(algorithms).map(k => (
            <option key={k} value={k}>
              {algorithms[k].name}
            </option>
          ))}
        </select>

        <label>
          Size:
          <input
            type="number"
            min={1}
            max={MAX_SIZE}
            value={size}
            onChange={e => handleSetSize(e.target.value)}
            disabled={isSorted}
          />
        </label>

        <input
          type="text"
          placeholder="Enter array (e.g. 5,2,9)"
          value={inputArray}
          onChange={e => setInputArray(e.target.value)}
        />
        <button onClick={handleInputArray} disabled={isSorted}>
          Set Array
        </button>

        <button onClick={handleRandomize} disabled={isSorted}>Randomize</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => setPlaying(p => !p)} disabled={isSorted}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => setIndex(i => Math.max(i - 1, 0))} disabled={isSorted}>
          Prev
        </button>
        <button
          onClick={() => setIndex(i => Math.min(i + 1, steps.length - 1))}
          disabled={isSorted}
        >
          Next
        </button>

        <button onClick={comparePerformance}>Compare Performance</button>
      </div>

      <div className="array-row">
        {(current.arr || arr).map((v, idx) => {
          const maxVal = Math.max(...(current.arr || arr), 1);
          const height = Math.max(24, Math.round((v / maxVal) * 160));
          const isI = current.i === idx;
          const isJ = current.j === idx;
          const extra = isI || isJ ? 'highlight' : '';

          return (
            <div
              key={idx}
              className={`array-item ${extra}`}
              style={{ height: height + 20 }}
            >
              <div>{v}</div>
            </div>
          );
        })}
      </div>

      <div className="info-section">
        <div className="card">
          <h3>Description</h3>
          <p>{theoryMap[algoKey]}</p>
        </div>

        <div className="card">
          <h3>Step Details</h3>
          <div><strong>Action:</strong> {current.description || '---'}</div>
        </div>
      </div>

      {compareData.length > 0 && (
        <div className="compare-section">
          <h3>Performance Comparison</h3>
          <table>
            <thead>
              <tr><th>Algorithm</th><th>Comparisons</th></tr>
            </thead>
            <tbody>
              {compareData.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.steps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
