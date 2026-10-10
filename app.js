const fields=['people','rooms','flight','hotel','airExtra','food','gear','transfer','lesson','other'];
const el=id=>document.getElementById(id);
const money=n=>'¥'+Math.round(n).toLocaleString('zh-CN');
function calculate(){
 const v=Object.fromEntries(fields.map(id=>[id,Math.max(0,Number(el(id).value)||0)]));
 const n=Math.max(1,v.people), rooms=Math.max(1,v.rooms);
 const uncovered=el('skiExtra').checked?n:Math.max(0,n-rooms*2);
 const ski=uncovered*900;
 const rows=[['往返航班列表价',v.flight*n],['税费 / 行李预留',v.airExtra*n],['三晚酒店总额',v.hotel*rooms],['额外雪票（两天）',ski],['餐饮',v.food*n],['雪服雪镜',v.gear*n],['教学',v.lesson*n],['地面交通',v.transfer*n],['其他 / 保险预留',v.other*n]];
 const total=rows.reduce((a,r)=>a+r[1],0);
 el('perPerson').textContent=money(total/n);el('groupTotal').textContent=n+' 人合计 '+money(total)+' · '+rooms+' 间 / 3 晚';
 el('breakdown').replaceChildren(...rows.map(([name,cost])=>{const row=document.createElement('div');const a=document.createElement('span'),b=document.createElement('span');a.textContent=name;b.textContent=money(cost);row.append(a,b);return row}));
 el('roomWarning').textContent=n>rooms*2?'人数超过每间 2 成人：计算器已为超出 '+(n-rooms*2)+' 人预留额外雪票。房型入住上限、加床、早餐和加人收费仍需单独确认。':'';
}
el('calculator').addEventListener('input',calculate);el('calculator').addEventListener('submit',e=>e.preventDefault());calculate();
el('print').addEventListener('click',()=>window.print());
let toastTimer;
function toast(message){el('toast').textContent=message;el('toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>el('toast').style.display='none',4000)}
el('share').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href.split('#')[0]);toast('攻略链接已复制，可以发给同行朋友')}catch{toast('复制未成功，请复制浏览器地址栏链接分享')}});
const packing=[...document.querySelectorAll('#packing input')];
try{const saved=JSON.parse(localStorage.getItem('snow-notes-packing-2026')||'[]');packing.forEach((x,i)=>x.checked=Boolean(saved[i]))}catch{}
packing.forEach(x=>x.addEventListener('change',()=>{try{localStorage.setItem('snow-notes-packing-2026',JSON.stringify(packing.map(x=>x.checked)))}catch{}}));
