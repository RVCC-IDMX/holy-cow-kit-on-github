const test = require('tape');
const execa = require('execa');

test('say something', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', ['say']);
  t.match(stdout, /< say >/);
});

test('think something', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', ['--think', 'something']);
  t.match(stdout, /( something )/);
});

test('from stdin', async (t) => {
  t.plan(1);
  const { stdout } = await execa.node('cli.js', { input: 'echo' });
  t.match(stdout, /< echo >/);
});

test('json output mode', async (t) => {
  t.plan(5);
  const { stdout } = await execa.node('cli.js', ['--json', 'Hello']);
  const result = JSON.parse(stdout);
  t.equal(typeof result, 'object', 'result is an object');
  t.equal(result.text, 'Hello', 'text field matches input');
  t.equal(typeof result.bubble, 'string', 'bubble field is a string');
  t.equal(typeof result.cow, 'string', 'cow field is a string');
  t.equal(result.full, result.bubble + '\n' + result.cow, 'full field is bubble + newline + cow');
});

test('json output mode with think', async (t) => {
  t.plan(2);
  const { stdout } = await execa.node('cli.js', ['--think', '--json', 'Hello']);
  const result = JSON.parse(stdout);
  t.equal(result.text, 'Hello', 'text field matches input');
  t.match(result.bubble, /\( Hello \)/, 'bubble uses think delimiters');
});
