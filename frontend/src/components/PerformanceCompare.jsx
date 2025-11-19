import React, { useState } from "react";
import { algorithms } from "../utils/sorts";

export default function PerformanceCompare() {
  const [algoKey, setAlgoKey] = useState("bubble");
  const [arraySize, setArraySize] = useState(1000);
  const [time, setTime] = useState(null);
  const [comparisons, setComparisons] = useState(0);
  const [result, setResult] = useState([]);

  const handleCompare = () => {
    const selectedAlgo = algorithms[algoKey];
    if (!selectedAlgo) return alert("Invalid algorithm selected");

    // Generate random array
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 10000)
    );

    let compareCount = 0;

    const t0 = performance.now();
    const gen = selectedAlgo.generator([...arr]); // copy so UI doesn’t mutate

    // Execute generator & count comparisons
    for (let step of gen) {
      if (step.type === "compare") {
        compareCount++;
      }
    }
    const t1 = performance.now();

    setTime((t1 - t0).toFixed(2));
    setComparisons(compareCount);
    setResult(arr.slice(0, 20));
  };

  return (
    <div className="perf-container">
      <h2>Performance Compare</h2>

      <div className="perf-controls">
        <label>
          Algorithm:
          <select value={algoKey} onChange={(e) => setAlgoKey(e.target.value)}>
            {Object.keys(algorithms).map((k) => (
              <option key={k} value={k}>
                {algorithms[k].name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Array Size:
          <input
            type="number"
            min={10}
            max={50000}
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
          />
        </label>

        <button onClick={handleCompare}>Run Comparison</button>
      </div>

      {time && (
        <div className="perf-result">
          <p>
            ⏱️ <strong>{algorithms[algoKey].name}</strong> took{" "}
            <strong>{time} ms</strong> for {arraySize} elements.
          </p>

          <p>
            🔍 Comparisons: <strong>{comparisons}</strong>
          </p>

          <p>Example output (first 20 elements):</p>
          <code>[{result.join(", ")}]</code>
        </div>
      )}
    </div>
  );
}
