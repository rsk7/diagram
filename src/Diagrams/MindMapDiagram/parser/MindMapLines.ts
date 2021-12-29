import { Line } from "../../parser";

export function isParentNodeLine(line: Line): boolean {
  return (
    line.text.startsWith("=") &&
    !line.text.startsWith("==") &&
    line.text.length > 1
  );
}

export function isChildNodeLine(line: Line): boolean {
  return line.text.startsWith("-") && line.text.length > 1;
}

// decides how to make a tree from a set of edges
// needs to ignore some edges that don't make sense
function makeTree(edges: Map<Line, Line[]>): Map<Line, Line[]> {
  if (!edges.size) return edges;
  const knownSet = new Set<string>();
  const entries = Array.from(edges.entries());
  const treeMap = new Map(edges);
  // set root
  knownSet.add(entries[0][0].text);
  entries[0][1].forEach((e) => knownSet.add(e.text));
  for (let i = 1; i < entries.length; i++) {
    if (!knownSet.has(entries[i][0].text)) {
      treeMap.delete(entries[i][0]);
    } else {
      entries[i][1].forEach((e) => knownSet.add(e.text));
    }
  }
  return treeMap;
}

export function findRelations(lines: Line[]): Map<Line, Line[]> {
  const edges = new Map<Line, Line[]>();
  let parentNodeIndex = -1;
  for (const line of lines) {
    if (isParentNodeLine(line)) {
      parentNodeIndex = line.lineNumber;
    }
    if (isChildNodeLine(line) && parentNodeIndex >= 0) {
      const list = edges.get(lines[parentNodeIndex]) || [];
      edges.set(lines[parentNodeIndex], [...list, line]);
    }
  }
  return makeTree(edges);
}
