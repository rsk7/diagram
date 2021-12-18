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
import GithubLogo from "./GitHub-Mark-32px.png";
import { ReactComponent as TextIcon } from "./bootstrap-icons/card-text.svg";
import Downloader from "./components/downloader";
import Rect from "./components/Rect";

interface SequenceState {
  diagram: SequenceDiagram;
  text: string;
  smartTextEnabled: boolean;
  showSequenceDescriber: boolean;
}

function App() {
  const [sequenceState, setSequenceState] = useState<SequenceState>(() => {
    const text = localStorage.getItem("sequenceText") || exampleText;
    return {
      ...SequenceReader(text),
      smartTextEnabled: false,
      showSequenceDescriber: true
    };
  });

  const setSequenceText = (value: string) => {
    const previousSequenceText = sequenceState.text;
    const newSequenceState = SequenceReader(value, {
      enableSmartText: sequenceState.smartTextEnabled
        ? { previousText: previousSequenceText }
        : undefined
    });
    setSequenceState({ ...sequenceState, ...newSequenceState });
  };

  const toggleSmartText = () => {
    setSequenceState({
      ...sequenceState,
      smartTextEnabled: !sequenceState.smartTextEnabled
    });
  };

  const toggleCloseState = () => {
    setSequenceState({
      ...sequenceState,
      showSequenceDescriber: !sequenceState.showSequenceDescriber
    });
  };

  useEffect(() => {
    localStorage.setItem("sequenceText", sequenceState.text);
  });

  const {
    lifelineProps,
    messageArrowProps,
    layoutHeight,
    layoutWidth,
    title,
    diagramStartY
  } = sequenceDiagramLayout(sequenceState.diagram);

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
      <a id="github" href="https://github.com/rsk7/diagram">
        <img src={GithubLogo} alt="Github" />
      </a>
      <div id="tools">
        <TextIcon id="textIcon" className="tool" onClick={toggleCloseState} />
        <Downloader
          svgIdSelector="mainDiagram"
          type="png"
          layoutHeight={layoutHeight}
          layoutWidth={layoutWidth}
          diagramStartY={diagramStartY}
        />
      </div>
      <svg
        id="mainDiagram"
        xmlns="http://www.w3.org/2000/svg"
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
          {title && (
            <Rect
              boxX={title.x}
              boxY={title.y}
              textBoxDetails={title.textBoxDetails}
            />
          )}
          {lifelineProps.map((p, index) => (
            <Lifeline
              key={index}
              lineX={p.lineX}
              textBoxDetails={p.textBoxDetails}
              length={p.length}
              x={p.x}
              y={p.y}
            />
          ))}
          {messageArrowProps?.map((p, index) => (
            <MessageArrow
              key={index}
              textBoxDetails={p.textBoxDetails}
              labelX={p.labelX}
              labelY={p.labelY}
              points={p.points}
            />
          ))}
        </g>
      </svg>
      <SequenceDescriber
        isVisible={sequenceState.showSequenceDescriber}
        sequenceText={sequenceState.text}
        smartTextOn={sequenceState.smartTextEnabled}
        onSmartTextToggle={toggleSmartText}
        onChange={setSequenceText}
        onClose={toggleCloseState}
      />
    </div>
  );
}

export default App;
