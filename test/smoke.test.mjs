import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skill = path.join(root, 'skills/google-trends-research');
function run(script, args) {
  return spawnSync(process.execPath, [path.join(skill, 'scripts', script), ...args], { cwd: os.tmpdir(), encoding: 'utf8' });
}
function json(script, args) {
  const result = run(script, args);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('method sources and stable identifiers cover the eight subject areas', async () => {
  const methods = (await fs.readFile(path.join(skill, 'references/methods.jsonl'), 'utf8')).trim().split(/\r?\n/).map(JSON.parse);
  assert.equal(methods.length, 34);
  assert.equal(new Set(methods.map(m => m.id)).size, 34);
  assert.equal(new Set(methods.map(m => m.mode)).size, 8);
  const sources = JSON.parse(await fs.readFile(path.join(skill, 'references/sources.json'), 'utf8'));
  assert.equal(sources.items.length, 10);
  for (const m of methods) {
    for (const field of ['id', 'mode', 'zh', 'en', 'action', 'limit', 'sourceUrl', 'officialUrl', 'reviewedOn']) assert.ok(m[field], `${m.id}: ${field}`);
    assert.ok(sources.items.some(v => v.index === m.video && m.at >= 0 && m.end > m.at && m.end <= v.durationSeconds));
    assert.equal(new URL(m.sourceUrl).hostname, 'www.youtube.com');
    assert.ok(['developers.google.com', 'support.google.com', 'www.oecd.org', 'www.searching-for-health.com'].includes(new URL(m.officialUrl).hostname));
  }
});

test('Chinese business question retrieves seasonality from another working directory', () => {
  const result = json('search.mjs', ['--query', '美国收纳盒 季节性', '--limit', '3']);
  assert.ok(result.methods.some(m => m.id === 'seasonality'));
  assert.equal(json('search.mjs', ['--id', 'same-period']).methods[0].id, 'same-period');
});

test('query plan preserves literal punctuation and rejects impossible dates', () => {
  const result = json('query-plan.mjs', ['--terms', '"storage box" -plastic|storage bin', '--geo', 'US', '--start', '2021-01-01', '--end', '2025-12-31', '--property', 'shopping']);
  assert.equal(result.parameters.terms[0], '"storage box" -plastic');
  assert.equal(new URL(result.classicQueryUrl).searchParams.get('gprop'), 'froogle');
  assert.equal(new URL(result.classicQueryUrl).searchParams.get('q'), '"storage box" -plastic,storage bin');
  assert.notEqual(run('query-plan.mjs', ['--terms', 'book', '--start', '2025-02-30', '--end', '2025-03-01']).status, 0);
});

test('RSS preserves traffic buckets, decodes text and leaves absent fields empty', () => {
  const result = json('rss.mjs', ['--geo', 'US', '--input', path.join(root, 'test/fixtures/rss.xml')]);
  assert.equal(result.count, 2);
  assert.equal(result.items[0].approxTraffic, '500+');
  assert.equal(result.items[0].title, 'Example & Test');
  assert.equal(result.items[0].link, 'https://example.com/research?a=1&b=2');
  assert.equal(result.items[1].approxTraffic, '');
  assert.equal(result.items[1].publishedAt, '');
});

test('static demo uses the current methods and includes the chapter entry', async () => {
  const html = await fs.readFile(path.join(root, 'docs/index.html'), 'utf8');
  const rows = JSON.parse(html.match(/const methods=(.*);/)[1]);
  const methods = (await fs.readFile(path.join(skill, 'references/methods.jsonl'), 'utf8')).trim().split(/\r?\n/).map(JSON.parse);
  assert.deepEqual(rows, methods);
  assert.ok(html.includes('sample/index.html'));
  assert.ok(!html.includes('__DATA__'));
  assert.ok(!/<script\b[^>]+src=/i.test(html));
  for (let n = 1; n <= 5; n++) await fs.access(path.join(root, `docs/assets/sample-0${n}.png`));
});
