import Rect from "./Rect";
import LifelineComponent from "./Lifeline";
import MessageArrowComponent from "./MessageArrow";
import AnnotationDescriptionComponent from "./AnnotationDescription";
import Lifeline from "../Diagrams/SequenceDiagram/layout/Lifeline";
import MessageArrow from "../Diagrams/SequenceDiagram/layout/MessageArrow";
import AnnotationDescription from "../Diagrams/SequenceDiagram/layout/AnnotationDescription";
import Title from "../Diagrams/SequenceDiagram/layout/Title";
import DiagramSvg from "./DiagamSvg";
import Watermark from "./Watermark";

interface SequenceDiagramProps {
  lifelineProps: Lifeline[];
  messageArrowProps?: MessageArrow[];
  annotationDescriptionProps?: AnnotationDescription[];
  title?: Title;
  watermark?: { x: number; y: number };
}

export default function SequenceDiagram(props: SequenceDiagramProps) {
  return (
    <DiagramSvg>
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
      {props.watermark && <Watermark {...props.watermark} />}
    </DiagramSvg>
  );
}
