import type { SupportedLanguage } from 'amazon-translate-subtitles/lib/types';
import { Command } from 'commander';
import { main } from './translate';

const packageJson = require('../package.json');
const version: string = packageJson.version;

const program = new Command();

export interface Options {
  debug: boolean;
  input: string;
  targetLanguage: SupportedLanguage;
  sourceLanguage?: SupportedLanguage;
  out?: string;
  profile?: string;
  progress: boolean;
}

program
  .version(version)
  .name('translate-subs')
  .option('-d, --debug', 'enables verbose logging', false)
  .requiredOption('-i, --input <file>', 'source video file path')
  .requiredOption(
    '-t, --target-language <language>',
    'target language to translate to (ISO 639-1)'
  )
  .option(
    '-s, --source-language <language>',
    'source language to translate from (ISO 639-1)',
    'en'
  )
  .option('-o, --out <file>', 'path and filename to save the srt file')
  .option('-p, --profile <profile>', 'AWS profile to use for AWS SDK')
  .option('-n, --no-progress', 'disables progress bar', false)
  .parse(process.argv);

const options = program.opts() as Options;

void (async () => {
  await main(options);
})();
