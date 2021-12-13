import { SequenceActor, SequenceInteraction } from "../SequenceDiagram";

export function splitLines(text?: string): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .filter((l) => l.length)
    .map((l) => l.trim());
}

export function findActorLines(lines: string[]): string[] {
  return lines.filter((l) => l.startsWith("actor:") || l.startsWith("actors:"));
}

export function findActorNames(line?: string): string[] {
  if (!line) return [];
  return line
    .split(":")[1]
    .split(",")
    .map((a) => a.trim());
}

export function createSequenceActor(text: string): SequenceActor {
  const actorDescription = text.split("|");
  const name = actorDescription[0];
  if (actorDescription.length > 1) {
    const spacingRegex = /sp\((?<spacingRight>.+)\)/i;
    const propsMatch = actorDescription[1].match(spacingRegex);
    return {
      name,
      spacingRight: propsMatch?.groups
        ? parseFloat(propsMatch.groups.spacingRight)
        : undefined
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

export function findActors(lines: string[]): SequenceActor[] {
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

export function findInteractions(lines: string[]): SequenceInteraction[] {
  return lines.reduce<SequenceInteraction[]>(
    (interactions: SequenceInteraction[], line: string) => {
      const interaction = interactionMatcher(line);
      if (interaction) interactions.push(interaction);
      return interactions;
    },
    []
  );
}
