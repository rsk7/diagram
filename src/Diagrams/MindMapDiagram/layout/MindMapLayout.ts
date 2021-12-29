import DiagramLayout from "../../DiagramLayout";
import MindMapDiagram, { MapNode } from "../MindMapDiagram";
import TreeNodeLayout from "./TreeNodeLayout";

function createNodeLayoutTree(node: MapNode): TreeNodeLayout {
  const layoutNode = new TreeNodeLayout(node);
  if (!node.children.length) return layoutNode;
  layoutNode.children = node.children.map((c) => createNodeLayoutTree(c));
  return layoutNode;
}

export interface MindMapDiagramLayout extends DiagramLayout {
  rootNode?: TreeNodeLayout;
}

export default function MindMapLayout(
  diagram: MindMapDiagram,
  startX: number = 100,
  startY: number = 100
): MindMapDiagramLayout {
  let rootLayoutNode;
  if (diagram.root) {
    const root = diagram.root;
    const rootLayoutNode = createNodeLayoutTree(root);
    rootLayoutNode.position(startX, startY);
  }
  return {
    layoutHeight: 100,
    layoutWidth: 100,
    diagramStartX: 10,
    diagramStartY: 40,
    rootNode: rootLayoutNode
  };
}
