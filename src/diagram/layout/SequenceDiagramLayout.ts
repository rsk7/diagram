import SequenceDiagram from "../SequenceDiagram";
import Lifeline from "./Lifeline";
import {
  createLifelineSequenceMap,
  getMaxLifelineHeight,
  setLifelineLength
} from "./LifelineLayout";
import MessageArrow from "./MessageArrow";
import { createMessageArrowSequence } from "./MessageArrowLayout";
import createTitle from "./TitleLayout";
import Title from "./Title";

const PADDING = 50;

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: Lifeline[];
  messageArrowProps: MessageArrow[] | undefined;
  title: Title | undefined;
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

  const firstLifeline = lifelineProps[0];
  const lastLifeline = lifelineProps[lifelineProps.length - 1];
  const lastMessage = messageArrowProps[messageArrowProps.length - 1];
  let layoutHeight = 0;
  let layoutWidth = 0;

  if (lastLifeline && lastMessage) {
    setLifelineLength(lifelineProps, lastMessage.endY + PADDING);
    layoutHeight = lastLifeline.y + lastLifeline.length + PADDING;
    layoutWidth =
      lastLifeline.x +
      lastLifeline.textBoxDetails.width +
      PADDING +
      PADDING * 0.2;
  }

  let title;

  if (firstLifeline && lastLifeline) {
    title = createTitle(
      diagram.title,
      firstLifeline.x,
      firstLifeline.y,
      lastLifeline.x + lastLifeline.textBoxDetails.width - firstLifeline.x
    );
  }

  return {
    lifelineProps,
    messageArrowProps,
    layoutHeight,
    layoutWidth,
    title
  };
}
