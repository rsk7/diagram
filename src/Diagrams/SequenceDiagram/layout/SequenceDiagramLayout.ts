import SequenceDiagram, {
  SequenceActor,
  SequenceInteraction
} from "../SequenceDiagram";
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
  AnnotationData,
  createAnnotationMap,
  setAnnotationIndex
} from "./AnnotationLayout";
import AnnotationDescription from "./AnnotationDescription";
import DiagramLayout, { Positional } from "../../DiagramLayout";

const PADDING = 50;

export default class SequenceDiagramLayout implements DiagramLayout {
  private _actors: SequenceActor[] = [];
  private _interactions: SequenceInteraction[] = [];
  private _layoutHeight: number = 0;
  private _layoutWidth: number = 0;
  private _diagramStartX: number = 0;
  private _diagramStartY: number = 0;
  private _watermerk?: Positional;
  private _lifelineProps: Lifeline[] = [];
  private _messageArrowProps: MessageArrow[] = [];
  private _annotationDescriptionProps: AnnotationDescription[] = [];
  private _annotationMap: Map<string, AnnotationData>;
  private _lifelineSequenceMap: Map<string, Lifeline>;
  private _lifelineProps: Lifeline[];

  constructor(diagram: SequenceDiagram) {
    this._actors = diagram.actors;
    this._interactions = diagram.interactions || [];
    this._annotationMap = createAnnotationMap(diagram);
    this._lifelineSequenceMap = createLifelineSequenceMap(
      diagram.actors,
      PADDING,
      PADDING
    );
    this._lifelineProps = Array.from(this._lifelineSequenceMap.values());
  }

  get layoutHeight(): number {
    return this._layoutHeight;
  }

  get layoutWidth(): number {
    return this._layoutWidth;
  }

  get diagramStartX(): number {
    return this._diagramStartX;
  }

  get diagramStartY(): number {
    return this._diagramStartY;
  }
}

export default function sequenceDiagramLayout(diagram: SequenceDiagram): {
  lifelineProps: Lifeline[];
  messageArrowProps: MessageArrow[] | undefined;
  annotationDescriptionProps: AnnotationDescription[] | undefined;
  title: Title | undefined;
  layoutHeight: number;
  layoutWidth: number;
  diagramStartY: number;
  watermark?: { x: number; y: number };
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
  let layoutEndY = 0;
  let layoutEndX = 0;
  let annotationDescriptionProps;
  let watermark;

  if (lastLifeline) {
    layoutEndY = lastLifeline.endY + PADDING;
  }

  if (lastLifeline && lastMessage) {
    setLifelineLength(lifelineProps, lastMessage.endY + PADDING);
    layoutWidth =
      lastLifeline.x +
      lastLifeline.textBoxDetails.width +
      PADDING +
      PADDING * 0.2;
    layoutEndX = layoutWidth;
    layoutEndY = lastMessage.endY + 1.5 * PADDING;
  }

  if (lastLifeline) {
    annotationDescriptionProps = createAnnotationSequence(
      Array.from(annotationMap.values()),
      firstLifeline.x,
      layoutEndY,
      layoutWidth - 2 * PADDING
    );
    if (annotationDescriptionProps?.length) {
      layoutEndY =
        annotationDescriptionProps[annotationDescriptionProps.length - 1].endY;
      layoutHeight = layoutEndY + PADDING + PADDING * 0.2;
    } else {
      layoutEndY = lastLifeline.y + lastLifeline.length + PADDING * 0.6;
      layoutHeight = layoutEndY + PADDING + PADDING * 0.2;
    }
  }

  if (lastLifeline && lastMessage) {
    watermark = {
      x: layoutEndX - (PADDING + PADDING * 0.2),
      y: layoutEndY + PADDING * 0.6
    };
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
    title,
    watermark
  };
}
