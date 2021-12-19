import TextBoxDetails from "../../services/TextBoxDetails";

const FONT = "18px Arial";
const MIN_WIDTH = 200;
const PADDING = 5;
const TITLE_BOTTOM_PADDING = 30;

export default class Title {
  private startY: number;
  private maxWidth: number;
  private _text: string;
  private startX: number;

  private _textBoxDetails: TextBoxDetails | undefined;

  constructor(startX: number, startY: number, text: string, maxWidth: number) {
    this.startX = startX;
    this.startY = startY;
    this._text = text;
    this.maxWidth = maxWidth;
  }

  get text(): string {
    return this._text;
  }

  get x(): number {
    const spacing = this.maxWidth - this.textBoxDetails.width;
    return this.startX + spacing / 2;
  }

  get y(): number {
    return this.startY - this.textBoxDetails.height - TITLE_BOTTOM_PADDING;
  }

  get endY(): number {
    return this.startY + this.textBoxDetails.height;
  }

  get textBoxDetails(): TextBoxDetails {
    if (!this._textBoxDetails) {
      this._textBoxDetails = TextBoxDetails.Create(
        this.text,
        FONT,
        this.maxWidth,
        MIN_WIDTH,
        PADDING,
        false,
        "center"
      );
    }
    return this._textBoxDetails;
  }
}
