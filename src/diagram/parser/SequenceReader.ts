import SequenceDiagram, { SequenceInteraction } from "../SequenceDiagram";

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

function interactionMatcher(line: string): SequenceInteraction | undefined {
  const matchers = [
    /(?<from>.+) ----(?<action>.+)----> (?<to>.+)/i,
    /(?<to>.+) <----(?<action>.+)---- (?<from>.+)/i,
    /(?<from>.+) call(s*) (?<action>.+) on (?<to>.+)/i,
    /(?<from>.+) return(s*) (?<action>.+) to (?<to>.+)/i
  ];
  for (const matcher of matchers) {
    const match = line.match(matcher);
    if (match?.groups) {
      return {
        fromActor: match.groups.from,
        toActor: match.groups.to,
        description: match.groups.action
      };
    }
  }
}

function findInteractions(lines: string[]): SequenceInteraction[] {
  return lines.reduce<SequenceInteraction[]>(
    (interactions: SequenceInteraction[], line: string) => {
      const interaction = interactionMatcher(line);
      if (interaction) interactions.push(interaction);
      return interactions;
    },
    []
  );
}

export default function sequenceReader(text: string): SequenceDiagram {
  // split text by line
  const lines = text
    .split("\n")
    .filter((l) => l.length)
    .map((l) => l.trim());
  const actors = findActors(lines);
  const interactions = findInteractions(lines);
  return {
    actors,
    interactions
  };
}
