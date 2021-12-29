export interface Line {
  text: string;
  lineNumber: number;
}

export function splitLines(text?: string): Line[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l, idx) => ({ text: l.trim(), lineNumber: idx + 1 }));
}

export function findTitleLines(lines: Line[]): Line[] {
  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && lines[i].text.startsWith("====")) {
      return [lines[i - 1], lines[i]];
    }
  }
  return [];
}

export function findTitle(lines: Line[]): string {
  const titleLines = findTitleLines(lines);
  return titleLines?.length ? lines[0].text : "";
}
