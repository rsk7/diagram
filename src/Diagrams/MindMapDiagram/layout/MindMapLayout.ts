import DiagramLayout from "../../DiagramLayout";
import createTitle from "../../SequenceDiagram/layout/TitleLayout";
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

const DIAGRAM_PADDING = 100;

export default function MindMapLayout(
  diagram: MindMapDiagram,
  startX: number = 100,
  startY: number = 100
): MindMapDiagramLayout {
  let rootLayoutNode;
  let title;
  let watermark;
  if (diagram.root) {
    const root = diagram.root;
    rootLayoutNode = createNodeLayoutTree(root);
    rootLayoutNode.position(startX, startY);
    if (diagram.title) {
      title = createTitle(
        diagram.title,
        startX,
        startY,
        rootLayoutNode.subTreeWidth
      );
    }
    if (rootLayoutNode.subTreeWidth > 300) {
      watermark = {
        x: startX + rootLayoutNode.subTreeWidth - DIAGRAM_PADDING * 0.1,
        y: startY + rootLayoutNode.subTreeHeight + DIAGRAM_PADDING * 0.5
      };
    }
  }
  return {
    layoutHeight: (rootLayoutNode?.subTreeHeight || 0) + 2 * DIAGRAM_PADDING,
    layoutWidth: (rootLayoutNode?.subTreeWidth || 0) + 2 * DIAGRAM_PADDING,
    title,
    diagramStartX: startX - DIAGRAM_PADDING,
    diagramStartY: (title?.y || startY) - DIAGRAM_PADDING / 4,
    rootNode: rootLayoutNode,
    watermark
  };
}
