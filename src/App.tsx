import "./App.css";
import Lifeline from "./Lifeline";
import SequenceDescriber from "./SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./SequenceReader";

function App() {
  const [sequenceText, setSequenceText] = useState(() => {
    return localStorage.getItem("sequenceText") || "";
  });

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceText);
  });

  const getActors = () => SequenceReader(sequenceText).actors;

  // temp
  const start = 500;
  const width = 200;

  return (
    <div className="App">
      <svg>
        <g id="matrix-group" transform="matrix(1 0 0 1 0 0)">
          {getActors().map((a, index) => (
            <Lifeline x={start + index * width} y={200} name={a} />
          ))}
        </g>
      </svg>
      <SequenceDescriber
        sequenceText={sequenceText}
        onChange={setSequenceText}
      />
    </div>
  );
}

export default App;
