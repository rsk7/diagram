interface RectProps {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  width: number;
  height: number;
  border: boolean;
}

export default function Rect(props: RectProps) {
  const textContainerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: props.height,
    textAlign: "center" as const,
    fontSize: props.fontSize
  };
  return (
    <g>
      <rect
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width}
        fill="white"
        {...(props.border
          ? {
              stroke: "black",
              strokeWidth: "2"
            }
          : {})}
      ></rect>
      <foreignObject
        x={props.x}
        y={props.y}
        height={props.height}
        width={props.width - 1}
      >
        <div style={textContainerStyles}>{props.text}</div>
      </foreignObject>
    </g>
  );
}

Rect.defaultProps = {
  fontSize: 12,
  border: true
};
