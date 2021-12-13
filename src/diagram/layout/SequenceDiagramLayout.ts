import SequenceDiagram from "../SequenceDiagram";
import Lifeline from "./Lifeline";
import {
  createLifelineSequenceMap,
  getMaxLifelineHeight,
  setLifelineLength
} from "./LifelineLayout";
import MessageArrow from "./MessageArrow";
import { createMessageArrowSequence } from "./MessageArrowLayout";

const PADDING = 50;

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: Lifeline[];
  messageArrowProps: MessageArrow[] | undefined;
  layoutHeight: number;
  layoutWidth: number;
} {
  const actors = diagram.actors;
  const lifelinePropsMap = createLifelineSequenceMap(actors, PADDING, PADDING);
  const lifelineProps = Array.from(lifelinePropsMap.values());
  const maxLifelineHeight = getMaxLifelineHeight(lifelineProps);

  const interactionStartY = maxLifelineHeight + PADDING;
  const interactions = diagram.interactions || [];
  const messageArrowProps = createMessageArrowSequence(
    interactions,
    interactionStartY,
    lifelinePropsMap
  );

  const lastLifeline = lifelineProps[lifelineProps.length - 1];
  const lastMessage = messageArrowProps[messageArrowProps.length - 1];
  let layoutHeight = 0;
  let layoutWidth = 0;

  if (lastLifeline && lastMessage) {
    setLifelineLength(
      lifelineProps,
      lastMessage.endY - lastLifeline.y + PADDING
    );
    layoutHeight = lastLifeline.y + lastLifeline.length + PADDING;
    layoutWidth =
      lastLifeline.x +
      lastLifeline.textBoxDetails.width +
      PADDING +
      PADDING * 0.2;
  }

  return {
    lifelineProps,
    messageArrowProps,
    layoutHeight,
    layoutWidth
  };
}
