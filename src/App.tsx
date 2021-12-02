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

  const [matrix, setMatrix] = useState([1, 0, 0, 1, 0, 0]);

  const test = () => {
    console.log("test called");
    const newMatrix = [...matrix];
    newMatrix[4] += 5;
    // newMatrix[5] += 5;
    setMatrix(newMatrix);
  };

  const [mouseDownLocation, setMouseDownLocation] = useState({});

  return (
    <div className="App">
      <svg
        onMouseDown={(e) => setMouseDownLocation({ x: e.pageX, y: e.pageY })}
      >
        <g id="matrix-group" transform={`matrix(${matrix.join(" ")})`}>
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
