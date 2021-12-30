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

export function findRelationLines(lines: Line[]): Line[] {
  const relations = findRelations(lines);
  return [
    ...Array.from(relations.keys()),
    ...Array.from(relations.values()).flat()
  ];
}

export function findRelations(lines: Line[]): Map<Line, Line[]> {
  const edges = new Map<Line, Line[]>();
  let parentNodeIndex = -1;
  for (const line of lines) {
    if (isParentNodeLine(line)) {
      parentNodeIndex = line.lineNumber - 1;
      edges.set(lines[parentNodeIndex], []);
    }
    if (isChildNodeLine(line) && parentNodeIndex >= 0) {
      const list = edges.get(lines[parentNodeIndex]) || [];
      edges.set(lines[parentNodeIndex], [...list, line]);
    }
  }
  return edges;
}
