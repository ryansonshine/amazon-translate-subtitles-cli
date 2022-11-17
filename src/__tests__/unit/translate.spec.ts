import { getSrtPath } from '../../translate';

describe('translate', () => {
  describe('getSrtPath', () => {
    it('should return an srt path next to the initial video with the language code in the filename', () => {
      const videoPath = '/home/ryansonshine/my-video.mp4';
      const targetLanguage = 'th';

      const result = getSrtPath(videoPath, targetLanguage);

      expect(result).toEqual('/home/ryansonshine/my-video.th.srt');
    });
  });
});
