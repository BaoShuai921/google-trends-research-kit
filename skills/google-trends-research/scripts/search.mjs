import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const entries=(await fs.readFile(path.join(root,'references','methods.jsonl'),'utf8')).trim().split('\n').map(line=>JSON.parse(line));
const args=process.argv.slice(2);
function arg(name,fallback){const at=args.indexOf(name);return at<0?fallback:args[at+1];}
if(args.includes('--help')){
  console.log('node scripts/search.mjs --query "任务描述" [--mode seo] [--limit 5]\nnode scripts/search.mjs --id same-period\nnode scripts/search.mjs --mode compare --all');
  process.exit(0);
}
const mode=arg('--mode');
const id=arg('--id');
const query=(arg('--query','')??'').trim().toLowerCase();
const limit=Number(arg('--limit','5'));
if(!Number.isInteger(limit)||limit<1||limit>50)throw Error('limit must be an integer from 1 to 50');
if(!query&&!mode&&!id)throw Error('Provide --query, --mode or --id');
if(mode&&!entries.some(x=>x.mode===mode))throw Error('Unknown mode');
const segmenter=new Intl.Segmenter('zh',{granularity:'word'});
const terms=[...new Set([...segmenter.segment(query)].filter(x=>x.isWordLike).map(x=>x.segment))];
const candidates=entries.filter(x=>(!mode||x.mode===mode)&&(!id||x.id===id));
const ranked=candidates.map(entry=>{
  const title=(entry.zh+' '+entry.en).toLowerCase();
  const tags=entry.tags.toLowerCase();
  const body=(entry.action+' '+entry.limit).toLowerCase();
  const score=terms.reduce((sum,term)=>sum+(title.includes(term)?6:0)+(tags.includes(term)?4:0)+(body.includes(term)?1:0),0);
  return {...entry,score};
}).filter(x=>!query||x.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
const results=args.includes('--all')?ranked:ranked.slice(0,limit);
console.log(JSON.stringify({query,count:results.length,methods:results},null,2));
