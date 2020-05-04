import assert from 'assert';
import Path from 'path';
import fs from 'fs';
import spawn from 'cross-spawn';
import tmp from 'tmp';

describe('autofix', () => {
  beforeEach(() => {
    tmp.setGracefulCleanup();
  });

  it('should properly format comments and indent level', () => {
    const { name: tmpDir } = tmp.dirSync({
      prefix: 'typescript-sort-keys-',
      unsafeCleanup: true,
    });

    const testFilePath = Path.join(tmpDir, 'autofix.ts');
    const input = fs.readFileSync('tests/fixtures/autofix.input.ts', 'utf8');
    const expected = fs.readFileSync('tests/fixtures/autofix.output.ts', 'utf8');

    fs.writeFileSync(testFilePath, input);

    const result = spawn.sync(
      'eslint',
      [
        '--ext',
        '.ts',
        '--rulesdir',
        'build/rules',
        '--config',
        require.resolve('./fixtures/.eslintrc.js'),
        testFilePath,
        '--fix',
      ],
      { encoding: 'utf8' },
    );

    if (result.status !== 0) {
      console.error(result.stdout); // eslint-disable-line no-console
      console.error(result.stderr); // eslint-disable-line no-console

      throw new Error(`Process exited with status ${result.status}`);
    }

    const output = fs.readFileSync(testFilePath, 'utf8');

    assert.strictEqual(output, expected);
  });
});
