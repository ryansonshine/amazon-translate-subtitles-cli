import type { SupportedLanguage } from 'amazon-translate-subtitles/lib/types';
import { Command } from 'commander';
import { logger } from './logger';
import { main } from './translate';
export interface Options {
  debug: boolean;
  input: string;
  targetLanguage: SupportedLanguage;
  sourceLanguage?: SupportedLanguage;
  out?: string;
  profile?: string;
  progress: boolean;
  silent: boolean;
}

const packageJson = require('../package.json');
const version: string = packageJson.version;
const program = new Command();

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
  .option('-S, --silent', 'disables all logging', false)
  .parse(process.argv);

const options = program.opts() as Options;
if (options.debug) logger.setVerbose(true);
if (options.silent) logger.disable();

logger.debug(`Program options: ${JSON.stringify(options, null, 2)}`);

void (async () => {
  try {
    const profile =
      options.profile ||
      process.env.AWS_PROFILE ||
      process.env.AWS_DEFAULT_PROFILE ||
      'default';
    if (logger.isVerbose()) void (await logger.logSystemInfo(profile));
    await main(options);
  } catch (e) {
    logger.error('Failed to translate subtitles');
    logger.handleError(e, options.debug);
  }
})();
