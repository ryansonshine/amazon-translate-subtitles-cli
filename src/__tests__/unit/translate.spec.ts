const mockTranslateSubtites = jest.fn();

jest.mock('amazon-translate-subtitles', () => ({
  translateSubtitles: mockTranslateSubtites,
}));

import tempy from 'tempy';
import fs from 'fs';
import { getSrtPath, main } from '../../translate';
import { Options } from '../../cli';

describe('translate', () => {
  describe('main', () => {
    const defaultOptions: Options = {
      debug: false,
      input: '',
      progress: true,
      targetLanguage: 'auto',
      silent: false,
    };

    let createReadStreamSpy = jest.spyOn(fs, 'createReadStream');

    beforeEach(() => {
      jest.resetAllMocks();
      createReadStreamSpy = jest.spyOn(fs, 'createReadStream');
      jest
        .spyOn(fs.promises, 'writeFile')
        .mockImplementation((): Promise<void> => Promise.resolve());
      mockTranslateSubtites.mockResolvedValue('');
    });

    it('should resolve an absolute path for input', async () => {
      await tempy.file.task(
        async fileName => {
          await fs.promises.writeFile(fileName, 'test data');

          await main({
            ...defaultOptions,
            input: fileName,
            targetLanguage: 'th',
          });

          expect(createReadStreamSpy).toHaveBeenCalledWith(fileName);
        },
        { extension: 'mkv' }
      );
    });
  });

  describe('getSrtPath', () => {
    it('should return an srt path next to the initial video with the language code in the filename', () => {
      const videoPath = '/home/ryansonshine/my-video.mp4';
      const targetLanguage = 'th';

      const result = getSrtPath(videoPath, targetLanguage);

      expect(result).toEqual('/home/ryansonshine/my-video.th.srt');
    });
  });
});
