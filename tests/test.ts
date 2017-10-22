import zigzag_traverse = require('../src/index');

test('throw error with non-integar height', () => {
  expect(() =>
    zigzag_traverse([0, 1, 2], 2, jest.fn()),
  ).toThrowErrorMatchingSnapshot();
});

test('does nothing with 0-length array', () => {
  const fn = jest.fn();
  zigzag_traverse([], 123, fn);
  expect(fn).not.toBeCalled();
});

test('5 x 4', () => {
  const results = visit(5, 4);
  expect(results.length).toBe(5 * 4);
  expect(results).toMatchSnapshot();
});

test('5 x 5', () => {
  const results = visit(5, 5);
  expect(results.length).toBe(5 * 5);
  expect(results).toMatchSnapshot();
});

function visit(width: number, height: number) {
  const offsets = [];
  for (let i = 0; i < width * height; i++) {
    offsets.push(i);
  }

  interface Position {
    line: number;
    column: number;
    offset: number;
  }

  const positions: Position[] = [];

  zigzag_traverse(offsets, width, offset =>
    positions.push({
      offset,
      line: Math.floor(offset / width),
      column: offset % width,
    }),
  );

  return positions;
}
