import { MapNode } from "../MindMap";
import TreeNodeLayout from "./TreeNodeLayout";

function createNodeLayoutTree(node: MapNode): TreeNodeLayout {
  const layoutNode = new TreeNodeLayout(node);
  if (!node.children.length) return layoutNode;
  layoutNode.children = node.children.map((c) => MindMapLayout(c));
  return layoutNode;
}

export default function MindMapLayout(
  node: MapNode,
  startX: number = 100,
  startY: number = 100
): TreeNodeLayout {
  const layoutNode = createNodeLayoutTree(node);
  layoutNode.position(startX, startY);
  return layoutNode;
}
