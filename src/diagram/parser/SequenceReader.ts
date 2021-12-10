import SequenceDiagram, {
  SequenceInteraction,
  SequenceActor
} from "../SequenceDiagram";

function createSequenceActor(text: string): SequenceActor {
  const spacingRegex = /(?<actor>.+){sp\((?<spacingRight>.+)\)}/i;
  const match = text.match(spacingRegex);
  if (match?.groups) {
    return {
      name: match.groups.actor,
      spacingRight: parseFloat(match.groups.spacingRight)
    };
  } else {
    return { name: text };
  }
}

function mergeDuplicateSequenceActors(
  mergeMap: Map<string, SequenceActor>,
  actor: SequenceActor
): Map<string, SequenceActor> {
  if (mergeMap.get(actor.name)) {
    mergeMap.set(actor.name, { ...mergeMap.get(actor.name), ...actor });
    return mergeMap;
  } else {
    mergeMap.set(actor.name, actor);
  }
  return mergeMap;
}

function findActorLines(lines: string[]): string[] {
  return lines.filter((l) => l.startsWith("actor:") || l.startsWith("actors:"));
}

function findActorNames(line: string): string[] {
  return line
    .split(":")[1]
    .split(",")
    .map((a) => a.trim());
}

function findActors(lines: string[]): SequenceActor[] {
  const actors = findActorLines(lines).reduce<string[]>((result, line) => {
    return [...result, ...findActorNames(line)];
  }, []);
  return Array.from(
    actors
      .filter((a) => a.length)
      .map(createSequenceActor)
      .reduce(mergeDuplicateSequenceActors, new Map<string, SequenceActor>())
      .values()
  );
}

function interactionMatcher(line: string): SequenceInteraction | undefined {
  const matchers = [
    /(?<from>.+) --(?<action>.+)--> (?<to>.+)/i,
    /(?<to>.+) <--(?<action>.+)-- (?<from>.+)/i,
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

function splitLines(text?: string): string[] | undefined {
  return text
    ?.split("\n")
    .filter((l) => l.length)
    .map((l) => l.trim());
}

export default function sequenceReader(
  text: string,
  previousText?: string
): {
  diagram: SequenceDiagram;
  text: string;
} {
  const currentLines = splitLines(text);
  const previousLines = splitLines(previousText);

  if (currentLines && previousLines) {
    const currentActorLines = findActorLines(currentLines);
    const previousActorLines = findActorLines(previousLines);
    for (let i = 0; i < currentActorLines.length; i++) {
      if (currentActorLines[i] !== previousActorLines[i]) {
        const currentActorNames = findActorNames(currentActorLines[i]);
        const previousActorNames = findActorNames(previousActorLines[i]);
        for (let j = 0; j < currentActorNames.length; j++) {
          // if (currentActorNames[j] !== previousActorNames[j])
        }
      }
    }
  }

  // split text by line
  const lines = text
    .split("\n")
    .filter((l) => l.length)
    .map((l) => l.trim());
  const actors = findActors(lines);
  const interactions = findInteractions(lines);

  // editor help on text
  return {
    diagram: { actors, interactions },
    text
  };
}
