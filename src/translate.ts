import { fromIni } from '@aws-sdk/credential-providers';
import {
  translateSubtitles,
  TranslateSubtitlesOptions,
} from 'amazon-translate-subtitles';
import { SupportedLanguage } from 'amazon-translate-subtitles/lib/types';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { Options } from './cli';
import { logger } from './logger';

export const main = async (options: Options): Promise<void> => {
  const video = path.resolve(cwd(), options.input);
  logger.log(`Translating subtitles from video ${video}`);

  const translateOptions: TranslateSubtitlesOptions = {
    targetLanguage: options.targetLanguage,
    video: fs.createReadStream(video),
    sourceTrackType: options.sourceType,
    ...(options.profile &&
      options.profile !== 'default' && {
        awsClientOverrides: {
          credentials: fromIni({ profile: options.profile }),
        },
      }),
    showProgress: options.progress,
    sourceLanguage: options.sourceLanguage,
  };

  logger.debug(
    `Translate options: ${JSON.stringify(
      { ...translateOptions, video: 'removed' },
      null,
      2
    )}`
  );

  const translatedSubtitles = await translateSubtitles(translateOptions);
  logger.debug(
    `Translated subtitles: ${translatedSubtitles.substring(0, 500)}`
  );

  const outputPath = options.out
    ? path.resolve(cwd(), options.out)
    : getSrtPath(video, options.targetLanguage);
  logger.debug(`Output Path: ${outputPath}`);

  await fs.promises.writeFile(outputPath, translatedSubtitles.toString());
  logger.log(`Successfully saved translated subtitles at ${outputPath}`);
};

export const getSrtPath = (
  videoPath: string,
  targetLanguage: SupportedLanguage
): string => {
  const { dir, name } = path.parse(videoPath);

  return path.join(dir, `${name}.${targetLanguage}.srt`);
};
