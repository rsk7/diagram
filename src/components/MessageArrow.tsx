import TextBoxDetails from "../services/TextBoxDetails";
import Rect from "./Rect";

interface MessageArrowProps {
  points: [number, number][];
  labelX: number;
  labelY: number;
  textBoxDetails: TextBoxDetails;
  annotation?: {
    index: number;
    color: string;
    font: string;
  };
}

export default function MessageArrowComponent(props: MessageArrowProps) {
  const points = props.points.map((p) => `${p[0]}, ${p[1]}`).join(" ");
  return (
    <g>
      <polyline
        points={points}
        fill="none"
        stroke="black"
        markerEnd="url(#arrow)"
      ></polyline>
      <Rect
        boxX={props.labelX}
        boxY={props.labelY}
        textBoxDetails={props.textBoxDetails}
        annotation={props.annotation}
      />
    </g>
  );
}
