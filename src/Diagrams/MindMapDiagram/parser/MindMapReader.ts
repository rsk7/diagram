import { splitLines, findTitle, Line } from "../../parser";
import MindMapDiagram, { MapNode } from "../MindMapDiagram";
import { findRelations } from "./MindMapLines";

function search(root: MapNode, text: string): MapNode | undefined {
  if (root.content === text) return root;
  const nextNodes = [...root.children];
  let next = nextNodes.shift();
  while (next) {
    if (next!.content === text) return next!;
    nextNodes.push(...next!.children);
    next = nextNodes.shift();
  }
}

function makeTree(relations: Map<Line, Line[]>): MapNode | undefined {
  if (!relations.size) return;
  const entries = Array.from(relations.entries());
  const rootNode = {
    content: entries[0][0].text,
    children: entries[0][1].map((e) => ({ content: e.text, children: [] }))
  };
  for (let i = 1; i < entries.length; i++) {
    const text = entries[i][0].text;
    const treeNode = search(rootNode, text);
    if (treeNode) {
      treeNode.children = entries[i][1].map((e) => ({
        content: e.text,
        children: []
      }));
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
  console.log(tree);
  return {
    diagram: { title, root: undefined },
    text
  };
}
