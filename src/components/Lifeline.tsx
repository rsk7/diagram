import TextBoxDetails from "../services/TextBoxDetails";
import Rect from "./Rect";
import VerticalLine from "./VerticalLine";

interface LifelineProps {
  lineX: number;
  x: number;
  y: number;
  textBoxDetails: TextBoxDetails;
  length: number;
  annotation?: {
    index: number;
    color: string;
    font: string;
  };
}

export default function LifelineComponent(props: LifelineProps) {
  return (
    <g>
      <VerticalLine
        x={props.lineX}
        y={props.y + props.textBoxDetails.height}
        length={props.length}
      />
      <Rect
        boxX={props.x}
        boxY={props.y}
        textBoxDetails={props.textBoxDetails}
        annotation={props.annotation}
      />
    </g>
  );
}
