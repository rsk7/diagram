import { AnnotationData } from "./AnnotationLayout";
import TextBoxDetails from "../../services/TextBoxDetails";

const FONT = "12px Arial";
const PADDING = 5;
const MIN_WIDTH = 200;

export default class AnnotationDescription {
  annotationData: AnnotationData;
  x: number;
  y: number;
  private _textBoxDetails: TextBoxDetails | undefined;
  private layoutWidth: number;

  constructor(
    x: number,
    y: number,
    layoutWidth: number,
    annotationData: AnnotationData
  ) {
    this.x = x;
    this.y = y;
    this.annotationData = annotationData;
    this.layoutWidth = layoutWidth;
  }

  get textBoxDetails(): TextBoxDetails {
    if (!this._textBoxDetails) {
      this._textBoxDetails = TextBoxDetails.Create(
        this.annotationData.text,
        FONT,
        this.layoutWidth - PADDING,
        MIN_WIDTH,
        PADDING,
        false,
        "left"
      );
    }
    return this._textBoxDetails;
  }

  get endY(): number {
    return this.y + this.textBoxDetails.height + PADDING;
  }
}
