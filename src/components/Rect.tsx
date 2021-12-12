import { WrapText } from "../services/TextBoxSizeService";

type TextAlignment = "center" | "left" | "right";

interface RectProps {
  x: number;
  y: number;
  text: string;
  font: string;
  width: number;
  height: number;
  border: boolean;
  textAlign: TextAlignment;
  padding: number;
}

function getTextPosition(
  boxX: number,
  boxY: number,
  width: number,
  padding: number,
  alignment: TextAlignment
): { textX: number; textY: number; textAnchor: string } {
  switch (alignment) {
    case "left":
      return {
        textX: boxX + padding,
        textY: boxY + padding,
        textAnchor: "start"
      };
    case "right":
      return {
        textX: boxX + width - padding,
        textY: boxY + padding,
        textAnchor: "end"
      };
    case "center":
      return {
        textX: boxX + padding + (width - padding * 2) / 2,
        textY: boxY + padding + 2,
        textAnchor: "middle"
      };
    default:
      throw new Error("unknown text alignment");
  }
}

export default function Rect(props: RectProps) {
  const wrapTextResult = WrapText(
    props.text,
    props.font,
    props.width - props.padding * 2
  );
  const { textX, textY, textAnchor } = getTextPosition(
    props.x,
    props.y,
    props.width,
    props.padding,
    props.textAlign
  );
  return (
    <g>
      <rect
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
        fill="transparent"
        {...(props.border
          ? {
              stroke: "black",
              strokeWidth: "2"
            }
          : {})}
      ></rect>
      <text
        style={{ font: props.font }}
        x={textX}
        y={textY}
        textAnchor={textAnchor}
      >
        {wrapTextResult.map((l, idx) => (
          <tspan
            key={idx}
            alignmentBaseline="hanging"
            x={textX}
            dy={`${idx === 0 ? 0 : 1.1}em`}
          >
            {l.text}
          </tspan>
        ))}
      </text>
    </g>
  );
}

Rect.defaultProps = {
  border: true,
  textAlign: "center"
};
