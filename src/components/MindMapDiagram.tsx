import { ReactNode } from "react";
import { MindMapDiagramLayout } from "../Diagrams/MindMapDiagram/layout/MindMapLayout";
import TreeNodeLayout from "../Diagrams/MindMapDiagram/layout/TreeNodeLayout";
import DiagramSvg from "./DiagamSvg";
import Rect from "./Rect";
import Watermark from "./Watermark";

export default function MindMapDiagram(props: MindMapDiagramLayout) {
  function drawNode(node: TreeNodeLayout): ReactNode[] {
    if (!node) return [];
    return [
      <Rect
        key={node.text}
        boxX={node.x!}
        boxY={node.y!}
        textBoxDetails={node.textBoxDetails}
      />,
      ...node.children.map((c, idx) => (
        <path
          key={idx}
          d={`M${node.arrowAnchor?.right.x},${node.arrowAnchor?.right.y} C${
            node.getArrowAnchorControl(50)?.right.x
          },${node.getArrowAnchorControl(50)?.right.y} ${
            c.getArrowAnchorControl(50)?.left.x
          }, ${c.getArrowAnchorControl(50)?.left.y} ${c.arrowAnchor?.left.x},${
            c.arrowAnchor?.left.y
          }`}
          fill="none"
          stroke="black"
        />
      )),
      ...node.children.map(drawNode)
    ];
  }

  return (
    <DiagramSvg>
      {props.title && (
        <Rect
          boxX={props.title.x}
          boxY={props.title.y}
          textBoxDetails={props.title.textBoxDetails}
        />
      )}
      {props.rootNode && drawNode(props.rootNode)}
      {props.watermark && <Watermark {...props.watermark} />}
    </DiagramSvg>
  );
}
