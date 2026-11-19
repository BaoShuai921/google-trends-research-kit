const args=process.argv.slice(2);
function arg(name,defaultValue){const at=args.indexOf(name);return at<0?defaultValue:args[at+1];}
if(args.includes('--help')){
  console.log('node scripts/query-plan.mjs --terms "storage box|storage bin" --geo US --start 2021-01-01 --end 2025-12-31 [--property web] [--category 0]\n--property supports web, shopping, youtube, news, images. Produces a plan and legacy query URL, then verify the live site.');
  process.exit(0);
}
const terms=(arg('--terms','')??'').split('|').map(s=>s.trim()).filter(Boolean);
if(terms.length<1||terms.length>8)throw Error('Provide 1–8 search items, separated by |');
if(terms.some(t=>t.includes(',')))throw Error('The URL uses comma separators. Enter comma-bearing search terms through the webpage.');
const geo=(arg('--geo','')??'').toUpperCase();
if(!/^(?:[A-Z]{2}(?:-[A-Z0-9]{1,3})?)?$/.test(geo))throw Error('Use an ISO country/subregion code, or empty for worldwide');
const start=arg('--start');
const end=arg('--end');
const validDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value??'')&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
if(!validDate(start)||!validDate(end)||start>end)throw Error('Provide valid --start and --end dates in order');
const property=arg('--property','web');
const properties={web:'',shopping:'froogle',youtube:'youtube',news:'news',images:'images'};
if(!Object.hasOwn(properties,property))throw Error('Unknown property');
const category=String(arg('--category','0'));
if(!/^\d+$/.test(category))throw Error('Category must be a numeric category id, which must be checked in the live site');
const params={q:terms.join(','),geo,date:start+' '+end,hl:'en-US',cat:category};
if(properties[property])params.gprop=properties[property];
const legacy=new URL('https://trends.google.com/trends/explore');
for(const [key,value] of Object.entries(params))if(value)legacy.searchParams.set(key,value);
console.log(JSON.stringify({entryUrl:'https://trends.google.com/explore',classicQueryUrl:legacy.href,parameters:{terms,geo,start,end,category,property},verification:'在当前网页核对筛选项和输入类型。经典版入口有退出提示，URL 的可用性以实际页面为准。',classicNeedsBatching:terms.length>5},null,2));
