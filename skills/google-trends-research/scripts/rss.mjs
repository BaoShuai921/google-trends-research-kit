import fs from 'node:fs/promises';
const args=process.argv.slice(2);
function arg(name,defaultValue){const at=args.indexOf(name);return at<0?defaultValue:args[at+1];}
if(args.includes('--help')){
  console.log('node scripts/rss.mjs --geo US [--input saved-rss.xml]');
  process.exit(0);
}
const geo=(arg('--geo','US')??'').toUpperCase();
if(!/^[A-Z]{2}$/.test(geo))throw Error('geo must be a two-letter country code');
const source=new URL('https://trends.google.com/trending/rss');source.searchParams.set('geo',geo);
const filename=arg('--input');
let xml;
if(filename)xml=await fs.readFile(filename,'utf8');
else{
 const response=await fetch(source,{signal:AbortSignal.timeout(20000)});
 if(!response.ok)throw Error('RSS request status '+response.status);
 xml=await response.text();
}
function field(item,name){
 const m=item.match(new RegExp('<'+name+'(?:\\s[^>]*)?>([\\s\\S]*?)</'+name+'>'));
 if(!m)return '';
 return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").trim();
}
if(!/<rss(?:\s|>)/.test(xml))throw Error('Expected RSS XML');
const items=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m=>({title:field(m[1],'title'),approxTraffic:field(m[1],'ht:approx_traffic'),publishedAt:field(m[1],'pubDate'),link:field(m[1],'link')}));
console.log(JSON.stringify({source:source.href,capturedAt:new Date().toISOString(),geo,count:items.length,items,readingNote:'保留量级原文。RSS 字段与网页筛选及状态需分别核对。'},null,2));
