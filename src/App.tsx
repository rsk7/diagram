import "./App.css";
import Lifeline from "./Lifeline";
import SequenceDescriber from "./SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./SequenceReader";
import useSvgMatrixState from "./useSvgMatrixState";
import sequenceDiagramLayout from "./SequenceDiagramLayout";
import MessageArrow from "./MessageArrow";

function App() {
  const [sequenceText, setSequenceText] = useState(() => {
    return localStorage.getItem("sequenceText") || "";
  });

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceText);
  });

  const diagram = SequenceReader(sequenceText);
  const { lifelineProps, messageArrowProps } = sequenceDiagramLayout(diagram, {
    x: 500,
    y: 200
  });

  const {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState();

  return (
    <div className="App">
      <svg
        onMouseDown={(e) => handleMouseDown({ x: e.pageX, y: e.pageY })}
        onMouseMove={(e) => handleMouseMove({ x: e.pageX, y: e.pageY })}
        onMouseUp={(e) => handleMouseUp({ x: e.pageX, y: e.pageY })}
        onWheel={(e) => handleZoom({ x: e.pageX, y: e.pageY }, e.deltaY > 0)}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <g id="matrix-group" transform={`${matrixState.toString()}`}>
          {Array.from(lifelineProps.values()).map((p, index) => (
            <Lifeline key={index} {...p} />
          ))}
          {messageArrowProps?.map((p, index) => (
            <MessageArrow key={index} {...p} />
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
