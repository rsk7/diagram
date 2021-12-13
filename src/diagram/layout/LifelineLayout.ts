import { SequenceActor } from "../SequenceDiagram";
import Lifeline from "./Lifeline";

const LIFELINE_SEPARATION = 50;

export function createLifelineSequence(
  actors: SequenceActor[],
  startX: number,
  startY: number
): Lifeline[] {
  return actors.reduce<Lifeline[]>((lifelineProps, actor, idx) => {
    if (!lifelineProps.length) {
      lifelineProps.push(new Lifeline(actor.name, startX, startY));
    } else {
      const previous = lifelineProps[lifelineProps.length - 1];
      const previousActor = actors[idx - 1];
      const x =
        previous.x +
        previous.textBoxDetails.width +
        LIFELINE_SEPARATION * (previousActor.spacingRight || 1);
      lifelineProps.push(new Lifeline(actor.name, x, startY));
    }
    return lifelineProps;
  }, []);
}

export function createLifelineSequenceMap(
  actors: SequenceActor[],
  startX: number,
  startY: number
): Map<string, Lifeline> {
  const sequence = createLifelineSequence(actors, startX, startY);
  return sequence.reduce((acc, value) => {
    acc.set(value.name, value);
    return acc;
  }, new Map<string, Lifeline>());
}

export function getMaxLifelineHeight(lifelines: Lifeline[]): number {
  return lifelines.reduce((acc, value) => {
    return acc > value.textBoxDetails.height
      ? acc
      : value.textBoxDetails.height;
  }, 0);
}

export function setLifelineLength(
  lifelineProps: Lifeline[],
  length: number
): void {
  lifelineProps.forEach((p) => (p.length = length));
}
