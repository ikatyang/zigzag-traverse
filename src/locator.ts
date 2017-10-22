export interface Position {
  /** 0-based */
  line: number;
  /** 0-based */
  column: number;
}

export class Locator {
  constructor(public width: number, public height: number) {}

  public is_top_most(index: number) {
    return this._get_position(index).line === 0;
  }
  public is_bottom_most(index: number) {
    return this._get_position(index).line === this.height - 1;
  }
  public is_left_most(index: number) {
    return this._get_position(index).column === 0;
  }
  public is_right_most(index: number) {
    return this._get_position(index).column === this.width - 1;
  }
  public move(index: number, adjust_function: (position: Position) => void) {
    const position = this._get_position(index);
    adjust_function(position);
    return this._get_index(position);
  }

  private _get_index(position: Position) {
    return position.line * this.width + position.column;
  }
  private _get_position(index: number): Position {
    return { line: Math.floor(index / this.width), column: index % this.width };
  }
}
