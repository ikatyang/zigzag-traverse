# zigzag-traverse

[![npm](https://img.shields.io/npm/v/zigzag-traverse.svg)](https://www.npmjs.com/package/zigzag-traverse)
[![build](https://img.shields.io/travis/ikatyang/zigzag-traverse/master.svg)](https://travis-ci.org/ikatyang/zigzag-traverse/builds)
[![coverage](https://img.shields.io/codecov/c/github/ikatyang/zigzag-traverse/master.svg)](https://codecov.io/gh/ikatyang/zigzag-traverse)

[zigzag-order](https://en.wikipedia.org/wiki/Color_layout_descriptor#Zigzag_scanning) traversal

[Changelog](https://github.com/ikatyang/zigzag-traverse/blob/master/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save zigzag-traverse

# using yarn
yarn add zigzag-traverse
```

## Usage

```js
const zigzag_traverse = require('zigzag-traverse');

zigzag_traverse([
   0,  1,  2,  3,  4,
   5,  6,  7,  8,  9,
  10, 11, 12, 13, 14,
  15, 16, 17, 18, 19,
], 5, value => console.log(value));
//=> 0 1 5 10 6 2 3 7 11 15 16 12 8 4 9 13 17 18 14 19
```

## API

```ts
declare function zigzag_traverse<T, U extends ArrayLike<T>>(
  array: U,
  width: number,
  callback: (value: T, index: number, array: U) => void,
): void;

export = zigzag_traverse;
```

## Development

```sh
# lint
yarn run lint

# build
yarn run build

# test
yarn run test
```

## License

MIT © [Ika](https://github.com/ikatyang)
