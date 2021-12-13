import SequenceDiagram from "../SequenceDiagram";
import Lifeline from "./Lifeline";
import {
  createLifelineSequenceMap,
  getMaxLifelineHeight,
  setLifelineLength
} from "./LifelineLayout";
import MessageArrow from "./MessageArrow";
import {
  createMessageArrowSequence,
  getMaxMessageY
} from "./MessageArrowLayout";

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: Lifeline[];
  messageArrowProps: MessageArrow[] | undefined;
} {
  // layout sequence diagram
  // find actor spacing
  const TOP_LEFT_PADDING = 50;
  const actors = diagram.actors;
  const lifelinePropsMap = createLifelineSequenceMap(
    actors,
    TOP_LEFT_PADDING,
    TOP_LEFT_PADDING
  );
  const lifelineProps = Array.from(lifelinePropsMap.values());
  const maxLifelineHeight = getMaxLifelineHeight(lifelineProps);

  const interactionStartY = maxLifelineHeight + TOP_LEFT_PADDING;
  const interactions = diagram.interactions || [];
  const messageArrowProps = createMessageArrowSequence(
    interactions,
    interactionStartY,
    lifelinePropsMap
  );
  const maxMessageY = getMaxMessageY(messageArrowProps);
  setLifelineLength(lifelineProps, maxMessageY);

  return {
    lifelineProps,
    messageArrowProps
  };
}
