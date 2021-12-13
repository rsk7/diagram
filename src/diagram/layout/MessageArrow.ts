import TextBoxDetails, { TextAlignment } from "../../services/TextBoxDetails";
import { SequenceInteraction } from "../SequenceDiagram";

export const INTERACTION_LINE_PADDING = 5;
const MIN_WIDTH = 50;
export const MESSAGE_ARROW_DESCRIPTION_PADDING = 20;
const FONT = "12px Arial";
const PADDING = 5;

export default class MessageArrow {
  fromLifelineLineX: number;
  toLifelineLineX: number;
  interaction: SequenceInteraction;
  textBoxBorder: boolean;
  startY: number;

  private _textBoxDetails: TextBoxDetails | undefined;

  constructor(
    fromLifelineLineX: number,
    toLifelineLineX: number,
    interaction: SequenceInteraction,
    startY: number
  ) {
    this.fromLifelineLineX = fromLifelineLineX;
    this.toLifelineLineX = toLifelineLineX;
    this.interaction = interaction;
    this.textBoxBorder = false;
    this.startY = startY;
  }

  private get distanceX(): number {
    return this.fromLifelineLineX - this.toLifelineLineX;
  }

  protected get textAlignment(): TextAlignment {
    return this.distanceX > 0 ? "left" : "right";
  }

  protected get textMaxWidth(): number {
    return Math.abs(this.distanceX) - MESSAGE_ARROW_DESCRIPTION_PADDING - 10;
  }

  get textBoxDetails(): TextBoxDetails {
    if (!this._textBoxDetails) {
      this._textBoxDetails = TextBoxDetails.Create(
        this.interaction.description,
        FONT,
        this.textMaxWidth,
        MIN_WIDTH,
        PADDING,
        this.textBoxBorder,
        this.textAlignment
      );
    }
    return this._textBoxDetails;
  }

  get labelX(): number {
    return this.distanceX < 0
      ? this.fromLifelineLineX + MESSAGE_ARROW_DESCRIPTION_PADDING / 10
      : this.fromLifelineLineX -
          this.textBoxDetails.width -
          MESSAGE_ARROW_DESCRIPTION_PADDING / 10;
  }

  get labelY(): number {
    return (
      this.startY +
      MESSAGE_ARROW_DESCRIPTION_PADDING +
      MESSAGE_ARROW_DESCRIPTION_PADDING * 0.4
    );
  }

  get y(): number {
    return (
      this.startY +
      this.textBoxDetails.height +
      INTERACTION_LINE_PADDING +
      MESSAGE_ARROW_DESCRIPTION_PADDING
    );
  }

  protected get startX(): number {
    return this.fromLifelineLineX;
  }

  protected get endX(): number {
    return this.toLifelineLineX - (this.textAlignment === "left" ? -5 : 5);
  }

  get points(): [number, number][] {
    return [
      [this.startX, this.y],
      [this.endX, this.y]
    ];
  }
}
