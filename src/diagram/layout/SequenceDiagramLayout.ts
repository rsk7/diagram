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

export default function sequenceDiagramLayout(
  diagram: SequenceDiagram,
  startPosition: { x: number; y: number }
): {
  lifelineProps: LifelineProps[];
  messageArrowProps: MessageArrowProps[] | undefined;
} {
  // layout sequence diagram
  // find actor spacing
  const actors = diagram.actors;
  const lifelinePropsMap = createLifelineSequenceMap(
    actors,
    startPosition.x,
    startPosition.y
  );
  const lifelineProps = Array.from(lifelinePropsMap.values());
  const maxLifelineHeight = getMaxLifelineHeight(lifelineProps);

  const interactionStartY = maxLifelineHeight + startPosition.y;
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
