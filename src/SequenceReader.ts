import SequenceDiagram from "./SequenceDiagram";

function findActors(lines: string[]): string[] {
  const actorLines = lines.filter(
    (l) => l.startsWith("actor:") || l.startsWith("actors:")
  );
  const actors = actorLines.reduce<string[]>((result, line) => {
    const actors = line.split(":")[1];
    return [...result, ...actors.split(",").map((a) => a.trim())];
  }, []);
  return actors.filter((a) => a.length);
}

export default function sequenceReader(text: string): SequenceDiagram {
  // split text by line
  const lines = text
    .split("\n")
    .filter((l) => l.length)
    .map((l) => l.trim());
  const actors = findActors(lines);
  return {
    actors
  };
}
