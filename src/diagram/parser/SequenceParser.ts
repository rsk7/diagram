import { SequenceActor, SequenceInteraction } from "../SequenceDiagram";

export function splitLines(text?: string): string[] {
  if (!text) return [];
  return text.split("\n").map((l) => l.trim());
}

export function findActorLines(lines: string[]): string[] {
  return lines.filter(isActorLine);
}

function isActorLine(line: string): boolean {
  return line.startsWith("actor:") || line.startsWith("actors:");
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
  return Array.from(
    lines
      .reduce<SequenceActor[]>(
        (acc: SequenceActor[], line: string, index: number) => {
          if (isActorLine(line)) {
            const actorNames = findActorNames(line);
            const actors = actorNames
              .filter((a) => a.length)
              .map(createSequenceActor);
            const followingLine = lines[index + 1] || "";
            if (actors.length) {
              annotationAdder(followingLine, actors[actors.length - 1]);
              acc.push(...actors);
            }
          }
          return acc;
        },
        []
      )
      .reduce(mergeDuplicateSequenceActors, new Map<string, SequenceActor>())
      .values()
  );
}

export function findTitle(lines: string[]): string {
  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && lines[i].startsWith("====")) {
      return lines[i - 1];
    }
  }
  return "";
}

function interactionMatcher(line: string): SequenceInteraction | undefined {
  const matchers = [
    /(?<from>.+)--(?<action>.+)-->(?<to>.+)/i,
    /(?<to>.+)<--(?<action>.+)--(?<from>.+)/i,
    /(?<from>.+) call(s*) (?<action>.+) on (?<to>.+)/i,
    /(?<from>.+) return(s*) (?<action>.+) to (?<to>.+)/i
  ];
  for (const matcher of matchers) {
    const match = line.match(matcher);
    if (match?.groups) {
      return {
        fromActor: match.groups.from.trim(),
        toActor: match.groups.to.trim(),
        description: match.groups.action.trim()
      };
    }
  }
}

export function findInteractions(lines: string[]): SequenceInteraction[] {
  return lines.reduce<SequenceInteraction[]>(
    (interactions: SequenceInteraction[], line: string, index: number) => {
      const interaction = interactionMatcher(line);
      if (interaction) {
        // check if following line is plain text
        const followingLine = lines[index + 1] || "";
        annotationAdder(followingLine, interaction);
        interactions.push(interaction);
      }
      return interactions;
    },
    []
  );
}

function annotationAdder(
  nextLine: string,
  destination: { annotation?: string }
) {
  if (
    nextLine.trim().length &&
    !interactionMatcher(nextLine) &&
    !isActorLine(nextLine)
  ) {
    destination.annotation = nextLine;
  }
}
