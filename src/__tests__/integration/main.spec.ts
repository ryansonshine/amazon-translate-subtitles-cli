import { runCLI } from '../helpers';

describe('translate-subs', () => {
  it('should display the help contents', () => {
    const { stdout } = runCLI(process.cwd(), ['--help']);

    expect(stdout).toContain('Usage: translate-subs [options]');
  });
});
