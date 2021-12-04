import "./App.css";
import Lifeline from "./Lifeline";
import SequenceDescriber from "./SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./SequenceReader";
import useSvgDragState from "./useSvgDragState";
import useSvgZoomState from "./useSvgZoomState";

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

  const { dragState, handleMouseDown, handleMouseUp, handleMouseMove } =
    useSvgDragState({ x: 0, y: 0 });
  const { zoomState, handleZoom } = useSvgZoomState(1);

  return (
    <div className="App">
      <svg
        onMouseDown={(e) => handleMouseDown({ x: e.pageX, y: e.pageY })}
        onMouseMove={(e) => handleMouseMove({ x: e.pageX, y: e.pageY })}
        onMouseUp={(e) => handleMouseUp({ x: e.pageX, y: e.pageY })}
        onWheel={(e) => handleZoom(e.deltaY > 0)}
        style={{
          cursor: dragState.mouseDownPosition ? "grabbing" : "grab"
        }}
      >
        <g
          id="matrix-group"
          transform={`matrix(${zoomState}, 0, 0, ${zoomState}, ${dragState.currentTransform.x}, ${dragState.currentTransform.y})`}
        >
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
