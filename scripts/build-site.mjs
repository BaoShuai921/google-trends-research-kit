import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rows = (await fs.readFile(path.join(root, 'skills/google-trends-research/references/methods.jsonl'), 'utf8')).trim().split(/\r?\n/).map(JSON.parse);
const template = await fs.readFile(path.join(root, 'site/library.template.html'), 'utf8');
if ((template.match(/__DATA__/g) ?? []).length !== 1) throw Error('Expected one data placeholder');
const output = template.replace('__DATA__', () => JSON.stringify(rows).replaceAll('<', '\\u003c'));
await fs.writeFile(path.join(root, 'docs/index.html'), output);
console.log(`Built docs/index.html: ${rows.length} methods`);
