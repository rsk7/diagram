import { splitLines, findTitle, Line } from "../../parser";
import MindMapDiagram, { MapNode } from "../MindMapDiagram";
import { findRelations } from "./MindMapLines";

function search(root: MapNode, searchNode: MapNode): MapNode | undefined {
  if (root.content === searchNode.content) return root;
  const nextNodes = [...root.children];
  let next = nextNodes.shift();
  while (next) {
    if (next!.content === searchNode.content) return next!;
    nextNodes.push(...next!.children);
    next = nextNodes.shift();
  }
}

function createMapNode(l: Line, c: Line[]): MapNode {
  return {
    content: l.text.substring(1),
    children: c.map((c) => ({ content: c.text.substring(1), children: [] }))
  };
}

function makeTree(relations: Map<Line, Line[]>): MapNode | undefined {
  if (!relations.size) return;
  const entries = Array.from(relations.entries());
  const rootNode = createMapNode(entries[0][0], entries[0][1]);
  for (let i = 1; i < entries.length; i++) {
    const searchCandidate = createMapNode(entries[i][0], []);
    const treeNode = search(rootNode, searchCandidate);
    if (treeNode) {
      treeNode.children = [
        ...treeNode.children,
        ...entries[i][1].map((e) => createMapNode(e, []))
      ];
    }
  }
  return rootNode;
}

export default function MindMapReader(text: string): {
  diagram: MindMapDiagram;
  text: string;
} {
  const lines = splitLines(text);
  const title = findTitle(lines);
  const relations = findRelations(lines);
  const tree = makeTree(relations);
  return {
    diagram: { title, root: tree },
    text
  };
}
