import { getSize } from "../../services/TextBoxSizeService";
import { SequenceActor } from "../SequenceDiagram";

export default interface LifelineProps {
  x: number;
  y: number;
  name: string;
  fontSize: number;
  width: number;
  height: number;
  length: number;
  lineX: number;
}

const DEFAULT_LENGTH = 0;
const FONT_SIZE = 12;
const MAX_WIDTH = 200;
const MIN_WIDTH = 50;
const LIFELINE_SEPARATION = 50;

function createLifeline(actor: string, x: number, y: number): LifelineProps {
  const { width, height } = getSize(actor, FONT_SIZE, MAX_WIDTH, MIN_WIDTH);
  return {
    x,
    y,
    length: DEFAULT_LENGTH,
    name: actor,
    fontSize: FONT_SIZE,
    width,
    height,
    lineX: Math.floor(width / 2) + x
  };
}

export function createLifelineSequence(
  actors: SequenceActor[],
  startX: number,
  startY: number
): LifelineProps[] {
  return actors.reduce<LifelineProps[]>((lifelineProps, actor, idx) => {
    if (!lifelineProps.length) {
      lifelineProps.push(createLifeline(actor.name, startX, startY));
    } else {
      const previous = lifelineProps[lifelineProps.length - 1];
      const previousActor = actors[idx - 1];
      const x =
        previous.x +
        previous.width +
        LIFELINE_SEPARATION * (previousActor.spacingRight || 1);
      lifelineProps.push(createLifeline(actor.name, x, startY));
    }
    return lifelineProps;
  }, []);
}

export function createLifelineSequenceMap(
  actors: SequenceActor[],
  startX: number,
  startY: number
): Map<string, LifelineProps> {
  const sequence = createLifelineSequence(actors, startX, startY);
  return sequence.reduce((acc, value) => {
    acc.set(value.name, value);
    return acc;
  }, new Map<string, LifelineProps>());
}

export function getMaxLifelineHeight(lifelines: LifelineProps[]): number {
  return lifelines.reduce((acc, value) => {
    return acc > value.height ? acc : value.height;
  }, 0);
}

export function setLifelineLength(
  lifelineProps: LifelineProps[],
  length: number
): void {
  lifelineProps.forEach((p) => (p.length = length));
}
