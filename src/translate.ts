import { fromIni } from '@aws-sdk/credential-providers';
import { translateSubtitles } from 'amazon-translate-subtitles';
import { SupportedLanguage } from 'amazon-translate-subtitles/lib/types';
import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import { Options } from './cli';

export const main = async (options: Options): Promise<void> => {
  const video = path.resolve(cwd(), options.input);
  console.log(`Translating subtitles from video ${video}`);

  const translatedSubtitles = await translateSubtitles({
    targetLanguage: options.targetLanguage,
    video: fs.createReadStream(video),
    ...(options.profile
      ? {
          awsClientOverrides: {
            credentials: fromIni({ profile: options.profile }),
          },
        }
      : {}),
    showProgress: options.progress,
    sourceLanguage: options.sourceLanguage,
  });

  const outputPath = options.out
    ? path.resolve(cwd(), options.out)
    : getSrtPath(video, options.targetLanguage);

  await fs.promises.writeFile(outputPath, translatedSubtitles.toString());
  console.log(`Successfully saved translated subtitles at ${outputPath}`);
};

export const getSrtPath = (
  videoPath: string,
  targetLanguage: SupportedLanguage
): string => {
  const { dir, name } = path.parse(videoPath);

  return path.join(dir, `${name}.${targetLanguage}.srt`);
};
