import TextBoxDetails, { TextAlignment } from "../../services/TextBoxDetails";

const FONT = "12px Arial";
const MAX_WIDTH = 200;
const MIN_WIDTH = 50;
const PADDING = 5;

export default class Lifeline {
  name: string;
  x: number;
  y: number;
  textBoxBorder: boolean;
  textAlignment: TextAlignment;
  length: number;

  private _textBoxDetails: TextBoxDetails | undefined;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.textBoxBorder = true;
    this.textAlignment = "center";
    this.length = 0;
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
