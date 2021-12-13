import { TextAlignment } from "../../services/TextBoxDetails";
import MessageArrow, {
  INTERACTION_LINE_PADDING,
  MESSAGE_ARROW_DESCRIPTION_PADDING
} from "./MessageArrow";

const MAX_WIDTH = 200;

export default class MessageArrowReflexive extends MessageArrow {
  protected get textMaxWidth(): number {
    return MAX_WIDTH;
  }

  protected get textAlignment(): TextAlignment {
    return "left";
  }

  get y(): number {
    return (
      this.startY +
      INTERACTION_LINE_PADDING +
      MESSAGE_ARROW_DESCRIPTION_PADDING * 2
    );
  }

  protected get endX(): number {
    return this.startX + 5;
  }

  private get loopX(): number {
    return this.startX + MESSAGE_ARROW_DESCRIPTION_PADDING * 1.5;
  }

  private get loopY(): number {
    return (
      this.y + this.textBoxDetails.height + MESSAGE_ARROW_DESCRIPTION_PADDING
    );
  }

  get points(): [number, number][] {
    return [
      [this.startX, this.y],
      [this.loopX, this.y],
      [this.loopX, this.loopY],
      [this.endX, this.loopY]
    ];
  }

  get endY(): number {
    return this.loopY;
  }

  get labelX(): number {
    return this.loopX + MESSAGE_ARROW_DESCRIPTION_PADDING * 0.2;
  }

  get labelY(): number {
    return this.y + MESSAGE_ARROW_DESCRIPTION_PADDING * 0.5;
  }
}
