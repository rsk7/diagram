import { ReactNode } from "react";
import { MindMapDiagramLayout } from "../Diagrams/MindMapDiagram/layout/MindMapLayout";
import TreeNodeLayout from "../Diagrams/MindMapDiagram/layout/TreeNodeLayout";
// import TextBoxDetails from "../services/TextBoxDetails";
import DiagramSvg from "./DiagamSvg";
import Rect from "./Rect";

export default function MindMapDiagram(props: MindMapDiagramLayout) {
  function drawNode(node: TreeNodeLayout): ReactNode[] {
    if (!node) return [];
    return [
      <Rect
        key={node.text} // fix this
        boxX={node.x!}
        boxY={node.y!}
        textBoxDetails={node.textBoxDetails}
      />,
      ...node.children.map((c) => (
        <path
          d={`M${node.arrowAnchor?.right.x},${node.arrowAnchor?.right.y} C${
            node.getArrowAnchorControl()?.right.x
          },${node.getArrowAnchorControl()?.right.y} ${
            c.getArrowAnchorControl()?.left.x
          }, ${c.getArrowAnchorControl()?.left.y} ${c.arrowAnchor?.left.x},${
            c.arrowAnchor?.left.y
          }`}
          fill="none"
          stroke="black"
        />
      )),
      ...node.children.map(drawNode)
    ];
  }

  /*
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
  };*/

  return (
    <DiagramSvg>
      {props.title && (
        <Rect
          boxX={props.title.x}
          boxY={props.title.y}
          textBoxDetails={props.title.textBoxDetails}
        />
      )}
      {drawNode(props.rootNode)}
    </DiagramSvg>
  );
}
