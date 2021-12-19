import TextBoxDetails from "../services/TextBoxDetails";
import Annotation from "./Annotation";
import Rect from "./Rect";

interface AnnotationDescriptionProps {
  boxX: number;
  boxY: number;
  textBoxDetails: TextBoxDetails;
  annotation: {
    index: number;
    color: string;
    font: string;
  };
}

export default function AnnotationDescription(
  props: AnnotationDescriptionProps
) {
  return (
    <g>
      <Annotation
        x={props.boxX}
        y={props.boxY + props.textBoxDetails.lineHeight - 5}
        font={props.annotation.font}
        index={props.annotation.index}
        fill={props.annotation.color}
        fontColor="white"
      />
      <Rect
        boxX={props.boxX + 10}
        boxY={props.boxY}
        textBoxDetails={props.textBoxDetails}
      />
    </g>
  );
}
