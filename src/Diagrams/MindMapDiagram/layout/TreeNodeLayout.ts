import TextBoxDetails from "../../../services/TextBoxDetails";
import { MapNode } from "../MindMapDiagram";

interface Positional {
  x: number;
  y: number;
}

const FONT = "12px Arial";
const MAX_WIDTH = 300;
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
  private _subtreeHeight: number | undefined;
  private _subtreeWidth: number | undefined;
  private _children: TreeNodeLayout[] = [];

  text: string;

  constructor(node: MapNode) {
    this.text = node.content;
  }

  get x(): number | undefined {
    return this._x;
  }

  get y(): number | undefined {
    return this._y;
  }

  get children(): TreeNodeLayout[] {
    return this._children;
  }

  set children(value: TreeNodeLayout[]) {
    this._children = value;
    this._subtreeHeight = undefined;
    this._subtreeWidth = undefined;
  }

  position(x: number, y: number) {
    this._x = x;
    this._y = y + this.subTreeHeight / 2 - this.textBoxDetails.height / 2;
    if (!this.children.length) return;
    const childrenX = this.x! + this.textBoxDetails.width + COLUMN_SPACING;
    let childrenY =
      this.y! + this.textBoxDetails.height / 2 - this.subTreeHeight / 2;
    for (const c of this.children) {
      c.position(childrenX, childrenY);
      childrenY = childrenY + c.subTreeHeight + ROW_SPACING;
    }
  }

  get subTreeWidth(): number {
    if (this._subtreeWidth) return this._subtreeWidth;
    if (!this.children.length) {
      this._subtreeWidth = this.textBoxDetails.width;
    } else {
      const maxWidth = this.children.reduce((max, c) => {
        return max < c.subTreeWidth ? c.subTreeWidth : max;
      }, 0);
      this._subtreeWidth =
        maxWidth + COLUMN_SPACING + this.textBoxDetails.width;
    }
    return this._subtreeWidth;
  }

  get subTreeHeight(): number {
    if (this._subtreeHeight) return this._subtreeHeight;
    if (!this.children.length) {
      this._subtreeHeight = this.textBoxDetails.height;
    } else {
      const maxHeight = Math.max(
        this.children.reduce((sum, c) => {
          return sum + c.subTreeHeight;
        }, 0),
        this.textBoxDetails.height
      );
      this._subtreeHeight =
        maxHeight + ROW_SPACING * Math.max(this.children.length - 1, 0);
    }
    return this._subtreeHeight;
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
