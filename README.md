# ass-stringify

Stringify [ass-parser](https://www.npmjs.com/package/@qgustavor/ass-parser) parse tree to plain SSA/ASS subtitle format. Forked from [eush77/ass-stringify](https://github.com/eush77/ass-stringify).

## Changes:

- All dependencies replaced with native modern JavaScript functions.
- ES Modules instead of CommonJS.
- Added options.
- Format numeric timestamps.

## Demo

[https://codepen.io/qgustavor/full/YzaRXeX](https://codepen.io/qgustavor/full/YzaRXeX)

## API

### `assStringify(ass, options)`

Returns a text string. See the demo or `test/sample.ass` for an example.

Options is an object with the following keys:

- `lineBreak`: defaults to `\n`, set to `\r\n` to use Windows' line breaks
- `formatJoiner`: defaults to `, `, some subtitles use `,` instead
- `sectionJoiner`: defaults to `lineBreak` repeated twice
- `timestampKeys`: defaults to `['Start', 'End']`, defines which keys can be formatted to timestamps when numbers are provided

## References

- [Wikipedia page](http://en.wikipedia.org/wiki/SubStation_Alpha)
- [format specification](http://www.perlfu.co.uk/projects/asa/ass-specs.doc)

## Related

- [@qgustavor/ass-parser](https://www.npmjs.com/package/@qgustavor/ass-parser) - SSA/ASS parser.

## Install

```shell
npm install @qgustavor/ass-stringify
```

## License

MIT
