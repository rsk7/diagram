import "./App.css";
import Lifeline from "./Lifeline";
import SequenceDescriber from "./SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./SequenceReader";
import useSvgMatrixState from "./useSvgMatrixState";

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

  const {
    matrix,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState([1, 0, 0, 1, 0, 0]);

  return (
    <div className="App">
      <svg
        onMouseDown={(e) => handleMouseDown({ x: e.pageX, y: e.pageY })}
        onMouseMove={(e) => handleMouseMove({ x: e.pageX, y: e.pageY })}
        onMouseUp={(e) => handleMouseUp({ x: e.pageX, y: e.pageY })}
        onWheel={(e) => handleZoom({ x: e.pageX, y: e.pageY }, e.deltaY > 0)}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <g id="matrix-group" transform={`matrix(${matrix.join(", ")})`}>
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
