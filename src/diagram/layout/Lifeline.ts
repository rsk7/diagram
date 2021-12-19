import TextBoxDetails, { TextAlignment } from "../../services/TextBoxDetails";
import { SequenceActor } from "../SequenceDiagram";
import { AnnotationData } from "./AnnotationLayout";

const FONT = "12px Arial";
const MAX_WIDTH = 200;
const MIN_WIDTH = 50;
const PADDING = 5;

export default class Lifeline {
  x: number;
  y: number;
  textBoxBorder: boolean;
  textAlignment: TextAlignment;
  length: number;
  actor: SequenceActor;
  annotationData?: AnnotationData;

  private _textBoxDetails: TextBoxDetails | undefined;

  constructor(actor: SequenceActor, x: number, y: number) {
    this.actor = actor;
    this.x = x;
    this.y = y;
    this.textBoxBorder = true;
    this.textAlignment = "center";
    this.length = 0;
  }

  get name(): string {
    return this.actor.name;
  }

  get annotationText(): string | undefined {
    return this.actor.annotation;
  }

  get textBoxDetails(): TextBoxDetails {
    if (!this._textBoxDetails) {
      this._textBoxDetails = TextBoxDetails.Create(
        this.name,
        FONT,
        MAX_WIDTH,
        MIN_WIDTH,
        PADDING,
        this.textBoxBorder,
        this.textAlignment
      );
    }
    return this._textBoxDetails;
  }

  get lineX(): number {
    return Math.floor(this.textBoxDetails.width / 2) + this.x;
  }
}
