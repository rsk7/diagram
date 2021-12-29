import TextBoxDetails from "../../../services/TextBoxDetails";
import { MapNode } from "../MindMapDiagram";

interface Positional {
  x: number;
  y: number;
}

const FONT = "12px Arial";
const MAX_WIDTH = 200;
const MIN_WIDTH = 50;
const PADDING = 10;
const COLUMN_SPACING = 100;
const ROW_SPACING = 20;
const ROUNDING = 15;
const BORDER = true;
const ALIGNMENT = "center";

export default class TreeNodeLayout {
  private _x: number | undefined;
  private _y: number | undefined;
  private _textBoxDetails: TextBoxDetails | undefined;

  text: string;
  children: TreeNodeLayout[] = [];

  constructor(node: MapNode) {
    this.text = node.content;
  }

  get x(): number | undefined {
    return this._x;
  }

  get y(): number | undefined {
    return this._y;
  }

  // first pass at positioning
  // this needs some changes
  position(startX: number, startY: number): void {
    this._x = startX;
    this._y = startY;
    if (!this.children.length) return;
    const childrenX = this.x! + this.textBoxDetails.width + COLUMN_SPACING;
    let y = this.y! + this.textBoxDetails.height / 2 - this.height / 2;
    for (const c of this.children) {
      c.position(childrenX, y);
      y = y + c.height + ROW_SPACING;
    }
  }

  get width(): number {
    if (!this.children.length) {
      return this.textBoxDetails.width;
    }
    const maxWidth = this.children.reduce((max, c) => {
      return max < c.width ? c.width : max;
    }, 0);
    return maxWidth + COLUMN_SPACING + this.textBoxDetails.width;
  }

  get height(): number {
    if (!this.children.length) {
      return this.textBoxDetails.height;
    }
    const maxHeight = Math.max(
      this.children.reduce((sum, c) => {
        return sum + c.height;
      }, 0),
      this.textBoxDetails.height
    );
    return maxHeight;
  }

  get textBoxDetails(): TextBoxDetails {
    if (!this._textBoxDetails) {
      this._textBoxDetails = TextBoxDetails.Create(
        this.text,
        FONT,
        MAX_WIDTH,
        MIN_WIDTH,
        PADDING,
        BORDER,
        ALIGNMENT,
        ROUNDING
      );
    }
    return this._textBoxDetails;
  }

  get arrowAnchor(): { left: Positional; right: Positional } | null {
    if (!this.x || !this.y) return null;
    return {
      left: { x: this.x, y: this.y + this.textBoxDetails.height / 2 },
      right: {
        x: this.x + this.textBoxDetails.width,
        y: this.y + this.textBoxDetails.height / 2
      }
    };
  }

  getArrowAnchorControl(distance: number = 100):
    | {
        left: Positional;
        right: Positional;
      }
    | undefined {
    if (!this.arrowAnchor) return;
    return {
      left: {
        x: this.arrowAnchor.left.x - distance,
        y: this.arrowAnchor.left.y
      },
      right: {
        x: this.arrowAnchor.right.x + distance,
        y: this.arrowAnchor.right.y
      }
    };
  }
}
