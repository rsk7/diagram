import SequenceDiagram from "../SequenceDiagram";
import LifelineProps, {
  createLifelineSequenceMap,
  getMaxLifelineHeight,
  setLifelineLength
} from "./LifelineLayout";
import MessageArrowProps, {
  createMessageArrowSequence,
  getMaxMessageY
} from "./MessageArrowLayout";

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: LifelineProps[];
  messageArrowProps: MessageArrowProps[] | undefined;
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
