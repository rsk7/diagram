import { SequenceInteraction } from "../SequenceDiagram";
import LifelineProps from "./LifelineLayout";
import { getSize } from "../../services/TextBoxSizeService";

export default interface MessageArrowProps {
  description: string;
  labelX: number;
  labelY: number;
  labelHeight: number;
  labelWidth: number;
  points: number[][];
  y: number;
  textPadding: number;
  font: string;
}

const INTERACTION_LINE_PADDING = 5;
const MIN_WIDTH = 50;
const MAX_WIDTH = 200;
const MESSAGE_ARROW_DESCRIPTION_PADDING = 20;
const FONT = "12px Arial";
const PADDING = 5;

function createReflexiveMessageArrow(
  interaction: SequenceInteraction,
  lifeline: LifelineProps,
  startY: number
): MessageArrowProps {
  const { width, height } = getSize(
    interaction.description,
    FONT,
    MAX_WIDTH,
    MIN_WIDTH,
    PADDING
  );
  const y =
    startY + INTERACTION_LINE_PADDING + MESSAGE_ARROW_DESCRIPTION_PADDING;
  const startX = lifeline.lineX;
  const endX = lifeline.lineX + 5;
  const loopX = startX + MESSAGE_ARROW_DESCRIPTION_PADDING * 1.5;
  const loopY = y + height + MESSAGE_ARROW_DESCRIPTION_PADDING;
  return {
    points: [
      [startX, y],
      [loopX, y],
      [loopX, loopY],
      [endX, loopY]
    ],
    y: loopY,
    description: interaction.description,
    labelX: loopX + MESSAGE_ARROW_DESCRIPTION_PADDING * 0.5,
    labelY: y + MESSAGE_ARROW_DESCRIPTION_PADDING * 0.5,
    labelHeight: height,
    labelWidth: width,
    textPadding: PADDING,
    font: FONT
  };
}

function createMessageArrow(
  interaction: SequenceInteraction,
  startY: number,
  lifelinePropsMap: Map<string, LifelineProps>
): MessageArrowProps | undefined {
  const fromLifeline = lifelinePropsMap.get(interaction.fromActor);
  const toLifeline = lifelinePropsMap.get(interaction.toActor);
  if (!fromLifeline || !toLifeline) return;
  if (fromLifeline.name === toLifeline.name)
    return createReflexiveMessageArrow(interaction, toLifeline, startY);
  const distanceX = fromLifeline.lineX - toLifeline.lineX;
  const { width, height } = getSize(
    interaction.description,
    FONT,
    Math.abs(distanceX) - MESSAGE_ARROW_DESCRIPTION_PADDING - 10,
    MIN_WIDTH,
    PADDING
  );
  const labelX =
    distanceX < 0
      ? fromLifeline.lineX + MESSAGE_ARROW_DESCRIPTION_PADDING / 2
      : fromLifeline.lineX - width - MESSAGE_ARROW_DESCRIPTION_PADDING / 2;
  const y =
    startY +
    height +
    INTERACTION_LINE_PADDING +
    MESSAGE_ARROW_DESCRIPTION_PADDING;
  const startX = fromLifeline.lineX;
  const endX = toLifeline.lineX - (distanceX > 0 ? -5 : 5);
  return {
    points: [
      [startX, y],
      [endX, y]
    ],
    y,
    description: interaction.description,
    labelX,
    labelY: startY + MESSAGE_ARROW_DESCRIPTION_PADDING + 4,
    labelHeight: height,
    labelWidth: width,
    textPadding: PADDING,
    font: FONT
  };
}

export function createMessageArrowSequence(
  interactions: SequenceInteraction[],
  startY: number,
  lifelinePropsMap: Map<string, LifelineProps>
): MessageArrowProps[] {
  return interactions.reduce<MessageArrowProps[]>((acc, value) => {
    if (!acc.length) {
      const ma = createMessageArrow(value, startY, lifelinePropsMap);
      if (ma) acc.push(ma);
    } else {
      const previous = acc[acc.length - 1];
      const ma = createMessageArrow(value, previous.y, lifelinePropsMap);
      if (ma) acc.push(ma);
    }
    return acc;
  }, []);
}

// TODO: this is not relative, need to calculate lenght using y - lifeline start y
export function getMaxMessageY(messageArrowProps: MessageArrowProps[]): number {
  if (messageArrowProps.length) {
    return messageArrowProps[messageArrowProps.length - 1].y;
  } else {
    return 0;
  }
}
