import "./App.css";
import Lifeline from "./components/Lifeline";
import SequenceDescriber from "./components/SequenceDescriber";
import { useState, useEffect } from "react";
import SequenceReader from "./diagram/parser/SequenceReader";
import useSvgMatrixState from "./components/hooks/useSvgMatrixState";
import sequenceDiagramLayout from "./diagram/layout/SequenceDiagramLayout";
import MessageArrow from "./components/MessageArrow";

const defaultSequenceText = `SEQUENCE DIAGRAMS
=================

Draws sequence diagrams with a simple language. Everything supported is shown below.

Remove "#" character from start of line to render examples.


EXAMPLE 1:
Simple diagram showing three entities.

#actors: user, computer, server
#
#user -- does something --> computer
#computer -- asks server --> server
#server -- confirms to computer --> computer
#computer -- shows results --> user


EXAMPLE 2:
Adding more entities to the same diagram with optional spacing. db{sp:(1|2)} adds 1 unit or spacing to the left and 2 units of spacing to the right.

#actors: db{sp=(1|2)}, queue
#
#server -- check db --> db
#server -- add to queue --> queue


Try changing the name of one of the actors. All active references are updated.

To save as image, click the camera icon on the top right of this text box.
`;

function App() {
  const [sequenceText, setSequenceText] = useState(() => {
    return localStorage.getItem("sequenceText") || defaultSequenceText;
  });

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceText);
  });

  const { lifelineProps, messageArrowProps } = sequenceDiagramLayout(
    SequenceReader(sequenceText),
    {
      x: window.innerWidth * 0.5,
      y: 100
    }
  );

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
          {lifelineProps.map((p, index) => (
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
