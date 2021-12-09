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

function findActors(lines: string[]): SequenceActor[] {
  const actorLines = lines.filter(
    (l) => l.startsWith("actor:") || l.startsWith("actors:")
  );
  const actors = actorLines.reduce<string[]>((result, line) => {
    const actors = line.split(":")[1];
    return [...result, ...actors.split(",").map((a) => a.trim())];
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

export default function sequenceReader(text: string): {
  diagram: SequenceDiagram;
  text: string;
} {
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
