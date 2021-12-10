import "./App.css";
import Lifeline from "./components/Lifeline";
import SequenceDescriber from "./components/SequenceDescriber";
import { useState, useEffect, useRef } from "react";
import SequenceReader from "./diagram/parser/SequenceReader";
import useSvgMatrixState from "./components/hooks/useSvgMatrixState";
import sequenceDiagramLayout from "./diagram/layout/SequenceDiagramLayout";
import MessageArrow from "./components/MessageArrow";
import { exampleText } from "./exampleText";

function usePrevious(value: string) {
  const ref = useRef<string>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App() {
  const [sequenceText, setSequenceText] = useState(() => {
    return localStorage.getItem("sequenceText") || exampleText;
  });

  const previousSequenceText = usePrevious(sequenceText);

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceText);
  });

  const { diagram, text } = SequenceReader(sequenceText, previousSequenceText);

  const { lifelineProps, messageArrowProps } = sequenceDiagramLayout(diagram);

  const {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState({ x: window.innerWidth * 0.4, y: 50 });

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
          {lifelineProps.map((p, index) => (
            <Lifeline key={index} {...p} />
          ))}
          {messageArrowProps?.map((p, index) => (
            <MessageArrow key={index} {...p} />
          ))}
        </g>
      </svg>
      <SequenceDescriber sequenceText={text} onChange={setSequenceText} />
    </div>
  );
}

export default App;
