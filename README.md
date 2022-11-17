# amazon-translate-subtitles-cli

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> CLI for translating subtitles embedded in video files using Amazon Translate

## Install

```bash
npm install -g amazon-translate-subtitles-cli
```

## Usage

```bash
Usage: translate-subs [options]

Options:
  -V, --version                     output the version number
  -d, --debug                       enables verbose logging (default: false)
  -i, --input <file>                source video file path
  -t, --target-language <language>  target language to translate to (ISO 639-1)
  -s, --source-language <language>  source language to translate from (ISO 639-1) (default: "en")
  -o, --out <file>                  path and filename to save the srt file
  -p, --profile <profile>           AWS profile to use for AWS SDK
  -n, --no-progress                 disables progress bar
  -h, --help                        display help for command

Examples:

  $ translate-subs --input my-movie.mkv --target-language th
  Translating subtitles from video /home/ryansonshine/my-movie.mkv
  Translating [================================================] 100% / 0.0s remaining
  Successfully saved translated subtitles at /home/ryansonshine/my-movie.th.srt
```

## Related

- [amazon-translate-subtitles][api-url] - API for this CLI

[build-img]:https://github.com/ryansonshine/amazon-translate-subtitles-cli/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/ryansonshine/amazon-translate-subtitles-cli/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/amazon-translate-subtitles-cli
[downloads-url]:https://www.npmtrends.com/amazon-translate-subtitles-cli
[npm-img]:https://img.shields.io/npm/v/amazon-translate-subtitles-cli
[npm-url]:https://www.npmjs.com/package/amazon-translate-subtitles-cli
[issues-img]:https://img.shields.io/github/issues/ryansonshine/amazon-translate-subtitles-cli
[issues-url]:https://github.com/ryansonshine/amazon-translate-subtitles-cli/issues
[codecov-img]:https://codecov.io/gh/ryansonshine/amazon-translate-subtitles-cli/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/ryansonshine/amazon-translate-subtitles-cli
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
[api-url]:https://github.com/ryansonshine/amazon-translate-subtitles
