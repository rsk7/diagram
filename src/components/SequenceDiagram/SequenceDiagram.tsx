import useSvgMatrixState from "./useSvgMatrixState";
import Rect from "../Rect";
import LifelineComponent from "../Lifeline";
import MessageArrowComponent from "../MessageArrow";
import AnnotationDescriptionComponent from "../AnnotationDescription";
import Lifeline from "../../diagram/layout/Lifeline";
import MessageArrow from "../../diagram/layout/MessageArrow";
import AnnotationDescription from "../../diagram/layout/AnnotationDescription";
import Title from "../../diagram/layout/Title";

interface SequenceDiagramProps {
  lifelineProps: Lifeline[];
  messageArrowProps?: MessageArrow[];
  annotationDescriptionProps?: AnnotationDescription[];
  title?: Title;
  watermark?: { x: number; y: number };
}

export default function SequenceDiagram(props: SequenceDiagramProps) {
  const {
    matrixState,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleZoom
  } = useSvgMatrixState({ x: window.innerWidth * 0.4, y: 50 });

  return (
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
        {props.title && (
          <Rect
            boxX={props.title.x}
            boxY={props.title.y}
            textBoxDetails={props.title.textBoxDetails}
          />
        )}
        {props.lifelineProps.map((p, index) => (
          <LifelineComponent
            key={index}
            lineX={p.lineX}
            textBoxDetails={p.textBoxDetails}
            length={p.length}
            x={p.x}
            y={p.y}
            annotation={p.annotationData}
          />
        ))}
        {props.messageArrowProps?.map((p, index) => (
          <MessageArrowComponent
            key={index}
            textBoxDetails={p.textBoxDetails}
            labelX={p.labelX}
            labelY={p.labelY}
            points={p.points}
            annotation={p.annotationData}
          />
        ))}
        {props.annotationDescriptionProps?.map((p, index) => (
          <AnnotationDescriptionComponent
            key={index}
            boxX={p.x}
            boxY={p.y}
            textBoxDetails={p.textBoxDetails}
            annotation={p.annotationData}
          />
        ))}
        {props.watermark && (
          <text
            fill="#b0b0b0"
            style={{ font: "12px Consolas" }}
            textAnchor="end"
            x={props.watermark.x}
            y={props.watermark.y}
          >
            sequencediagram.xyz
          </text>
        )}
      </g>
    </svg>
  );
}
