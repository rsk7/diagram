import "./App.css";
import Lifeline from "./components/Lifeline";
import SequenceDescriber from "./components/SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./diagram/parser/SequenceReader";
import useSvgMatrixState from "./components/hooks/useSvgMatrixState";
import sequenceDiagramLayout from "./diagram/layout/SequenceDiagramLayout";
import MessageArrow from "./components/MessageArrow";
import { exampleText } from "./exampleText";
import SequenceDiagram from "./diagram/SequenceDiagram";

interface SequenceState {
  diagram: SequenceDiagram;
  text: string;
}

function App() {
  const [sequenceState, setSequenceState] = useState<SequenceState>(() => {
    const text = localStorage.getItem("sequenceText") || exampleText;
    return SequenceReader(text);
  });

  const setSequenceText = (value: string) => {
    const previousSequenceText = sequenceState.text;
    const newText = SequenceReader(value, {
      enableSmartText: { previousText: previousSequenceText }
    });
    setSequenceState(newText);
  };

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceState.text);
  });

  const { lifelineProps, messageArrowProps } = sequenceDiagramLayout(
    sequenceState.diagram
  );

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
      <SequenceDescriber
        sequenceText={sequenceState.text}
        onChange={setSequenceText}
      />
    </div>
  );
}

export default App;
