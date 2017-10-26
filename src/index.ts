import { Locator } from './locator';

const enum Kind {
  Origin,
  GoRight,
  GoLeftBottom,
  GoBottom,
  GoTopRight,
}

export = <T extends ArrayLike<any>>(
  array: T,
  width: number,
  callback: (value: T[number], index: number, array: T) => void,
) => {
  if (array.length === 0) {
    return;
  }

  const height = array.length / width;

  if (height % 1 !== 0) {
    throw new Error(`Expected height to be an integer, but received ${height}`);
  }

  const locator = new Locator(width, height);

  let index = 0;
  let kind = Kind.Origin as Kind;

  callback(array[index], index, array);

  while (index !== array.length - 1) {
    move_index();
    callback(array[index], index, array);
  }

  function move_index() {
    switch (kind) {
      case Kind.Origin:
        go_right();
        break;
      case Kind.GoRight:
        if (locator.is_top_most(index)) {
          go_left_bottom();
        } else {
          go_top_right();
        }
        break;
      case Kind.GoLeftBottom:
        if (locator.is_bottom_most(index)) {
          go_right();
        } else if (locator.is_left_most(index)) {
          go_bottom();
        } else {
          go_left_bottom();
        }
        break;
      case Kind.GoBottom:
        if (locator.is_left_most(index)) {
          go_top_right();
        } else {
          go_left_bottom();
        }
        break;
      case Kind.GoTopRight:
        if (locator.is_right_most(index)) {
          go_bottom();
        } else if (locator.is_top_most(index)) {
          go_right();
        } else {
          go_top_right();
        }
        break;
      // istanbul ignore next
      default:
        throw new Error(`Unexpected kind ${kind}`);
    }
  }

  function go_right() {
    kind = Kind.GoRight;
    index = locator.move(index, pos => pos.column++);
  }
  function go_left_bottom() {
    kind = Kind.GoLeftBottom;
    // tslint:disable-next-line:ban-comma-operator
    index = locator.move(index, pos => (pos.line++, pos.column--));
  }
  function go_bottom() {
    kind = Kind.GoBottom;
    index = locator.move(index, pos => pos.line++);
  }
  function go_top_right() {
    kind = Kind.GoTopRight;
    // tslint:disable-next-line:ban-comma-operator
    index = locator.move(index, pos => (pos.line--, pos.column++));
  }
};
