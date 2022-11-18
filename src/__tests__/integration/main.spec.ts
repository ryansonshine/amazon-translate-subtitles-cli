import execa from 'execa';
import { resolve } from 'path';

const binPath = resolve(__dirname, './bin.js');

describe('translate-subs', () => {
  it('should display the help contents', async () => {
    const { stdout } = await execa(binPath, ['--help']);

    expect(stdout).toContain('Usage: translate-subs [options]');
  });
});
