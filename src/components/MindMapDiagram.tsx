import { ReactNode } from "react";
import Title from "../Diagrams/SequenceDiagram/layout/Title";
import TextBoxDetails from "../services/TextBoxDetails";
import DiagramSvg from "./DiagamSvg";
import Rect from "./Rect";

interface TreeLayoutNode {
  x: number;
  y: number;
  arrowAnchor: {
    left: { x: number; y: number };
    right: { x: number; y: number };
  };
  textBoxDetails: TextBoxDetails;
  children: TreeLayoutNode[];
}

interface MindMapDiagramProps {
  title?: Title;
  layout?: TreeLayoutNode;
}

export default function MindMapDiagram(props: MindMapDiagramProps) {
  function drawNode(node: TreeLayoutNode): ReactNode[] {
    if (!node) return [];
    return [
      <Rect boxX={node.x} boxY={node.y} textBoxDetails={node.textBoxDetails} />,
      ...node.children.map((c) => (
        <path
          d={`M${node.arrowAnchor.right.x},${node.arrowAnchor.right.y} C${
            node.arrowAnchor.right.x + 100
          },${node.arrowAnchor.right.y} ${c.arrowAnchor.left.x - 100}, ${
            c.arrowAnchor.left.y
          } ${c.arrowAnchor.left.x},${c.arrowAnchor.left.y}`}
          fill="none"
          stroke="black"
        />
      )),
      ...node.children.map(drawNode)
    ];
  }

  const testBox = TextBoxDetails.Create(
    "test",
    "12px Arial",
    200,
    100,
    10,
    true,
    "center"
  );
  const layout = {
    x: 100,
    y: 100,
    arrowAnchor: {
      left: { x: 100, y: 150 },
      right: { x: 200, y: 150 }
    },
    textBoxDetails: testBox,
    children: [
      {
        x: 300,
        y: 300,
        arrowAnchor: {
          left: { x: 300, y: 350 },
          right: { x: 400, y: 450 }
        },
        textBoxDetails: testBox,
        children: []
      }
    ]
  };

  return (
    <DiagramSvg>
      {props.title && (
        <Rect
          boxX={props.title.x}
          boxY={props.title.y}
          textBoxDetails={props.title.textBoxDetails}
        />
      )}
      {drawNode(layout)}
      {props.layout && drawNode(props.layout)}
    </DiagramSvg>
  );
}
