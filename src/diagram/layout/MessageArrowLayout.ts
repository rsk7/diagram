import { SequenceInteraction } from "../SequenceDiagram";
import LifelineProps from "./LifelineLayout";
import { getSize } from "../../services/TextBoxSizeService";

export default interface MessageArrowProps {
  startX: number;
  startY: number;
  description: string;
  endX: number;
  endY: number;
  labelX: number;
  labelY: number;
  labelHeight: number;
  labelWidth: number;
}

const INTERACTION_LINE_PADDING = 5;
const MIN_WIDTH = 50;
const MESSAGE_ARROW_DESCRIPTION_PADDING = 20;
const FONT_SIZE = 12;
const END_PADDING = 50;

function createMessageArrow(
  interaction: SequenceInteraction,
  startY: number,
  lifelinePropsMap: Map<string, LifelineProps>
): MessageArrowProps | undefined {
  const fromLifeline = lifelinePropsMap.get(interaction.fromActor);
  const toLifeline = lifelinePropsMap.get(interaction.toActor);
  if (!fromLifeline || !toLifeline) return;
  const distanceX = fromLifeline.lineX - toLifeline.lineX;
  const { width, height } = getSize(
    interaction.description,
    FONT_SIZE,
    Math.abs(distanceX) - MESSAGE_ARROW_DESCRIPTION_PADDING - 10,
    MIN_WIDTH
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
  return {
    startX: fromLifeline.lineX,
    startY: y,
    endX: toLifeline.lineX - (distanceX > 0 ? -5 : 5),
    endY: y,
    description: interaction.description,
    labelX,
    labelY: startY + MESSAGE_ARROW_DESCRIPTION_PADDING + 4,
    labelHeight: height,
    labelWidth: width
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
      const ma = createMessageArrow(value, previous.startY, lifelinePropsMap);
      if (ma) acc.push(ma);
    }
    return acc;
  }, []);
}

export function getMaxMessageY(messageArrowProps: MessageArrowProps[]): number {
  if (messageArrowProps.length) {
    return messageArrowProps[messageArrowProps.length - 1].startY + END_PADDING;
  } else {
    return END_PADDING;
  }
}
