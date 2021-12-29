import { SequenceActor, SequenceInteraction } from "../SequenceDiagram";
import { interactionLineRegex } from "./regex";
import {
  findActorLines,
  findInteractionLines,
  isAnnotationLine,
  isActorLine
} from "./SequenceLines";
import { Line, findTitleLines } from "../../parser";

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

export function findActors(lines: Line[]): SequenceActor[] {
  const actorLines = findActorLines(lines);
  return Array.from(
    actorLines
      .reduce<SequenceActor[]>(
        (acc: SequenceActor[], line: Line, index: number) => {
          if (isActorLine(line)) {
            const actorNames = findActorNames(line.text);
            const actors = actorNames
              .filter((a) => a.length)
              .map(createSequenceActor);
            const followingLine = actorLines[index + 1] || "";
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

export function findTitle(lines: Line[]): string {
  const titleLines = findTitleLines(lines);
  return titleLines?.length ? lines[0].text : "";
}

function interactionMatcher(line: string): SequenceInteraction | undefined {
  for (const matcher of interactionLineRegex) {
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

export function findInteractions(lines: Line[]): SequenceInteraction[] {
  const interactionLines = findInteractionLines(lines);
  return interactionLines.reduce<SequenceInteraction[]>(
    (interactions: SequenceInteraction[], line: Line, index: number) => {
      const interaction = interactionMatcher(line.text);
      if (interaction) {
        // check if following line is plain text
        const followingLine = interactionLines[index + 1] || "";
        annotationAdder(followingLine, interaction);
        interactions.push(interaction);
      }
      return interactions;
    },
    []
  );
}

function annotationAdder(nextLine: Line, destination: { annotation?: string }) {
  if (isAnnotationLine(nextLine)) {
    destination.annotation = nextLine.text;
  }
}
