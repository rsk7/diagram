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
import createAnnotationSequence, {
  createAnnotationMap,
  setAnnotationIndex
} from "./AnnotationLayout";
import AnnotationDescription from "./AnnotationDescription";

const PADDING = 50;

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: Lifeline[];
  messageArrowProps: MessageArrow[] | undefined;
  annotationDescriptionProps: AnnotationDescription[] | undefined;
  title: Title | undefined;
  layoutHeight: number;
  layoutWidth: number;
  diagramStartY: number;
} {
  const annotationMap = createAnnotationMap(diagram);
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

  setAnnotationIndex([...lifelineProps, ...messageArrowProps], annotationMap);

  const firstLifeline = lifelineProps[0];
  const lastLifeline = lifelineProps[lifelineProps.length - 1];
  const lastMessage = messageArrowProps[messageArrowProps.length - 1];

  let layoutHeight = 0;
  let layoutWidth = 0;
  let annotationDescriptionProps;

  if (lastLifeline && lastMessage) {
    setLifelineLength(lifelineProps, lastMessage.endY + PADDING);
    layoutWidth =
      lastLifeline.x +
      lastLifeline.textBoxDetails.width +
      PADDING +
      PADDING * 0.2;
    annotationDescriptionProps = createAnnotationSequence(
      Array.from(annotationMap.values()),
      firstLifeline.x,
      lastMessage.endY + 1.5 * PADDING,
      layoutWidth - 2 * PADDING
    );
    if (annotationDescriptionProps?.length) {
      layoutHeight =
        annotationDescriptionProps[annotationDescriptionProps.length - 1].endY +
        PADDING;
    } else {
      layoutHeight = lastLifeline.y + lastLifeline.length + PADDING;
    }
  }

  let title;
  let diagramStartY = 0;

  // setting up the title
  if (firstLifeline && lastLifeline) {
    title = createTitle(
      diagram.title,
      firstLifeline.x,
      firstLifeline.y,
      lastLifeline.x + lastLifeline.textBoxDetails.width - firstLifeline.x
    );

    if (title) {
      diagramStartY = title.y - PADDING;
      layoutHeight = layoutHeight + title.textBoxDetails.height + PADDING;
    }
  }

  return {
    lifelineProps,
    messageArrowProps,
    annotationDescriptionProps,
    diagramStartY,
    layoutHeight,
    layoutWidth,
    title
  };
}
