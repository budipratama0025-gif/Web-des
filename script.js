const API="https://indodax.com/api";
const pairs=["btc_idr","eth_idr","usdt_idr"];
const fmt=n=>Number(n||0).toLocaleString("id-ID",{maximumFractionDigits:0});
const state={btc:0,eth:0,usdt:0,history:[]};

async function loadTicker(){
 try{
  const r=await fetch(API+"/ticker_all",{cache:"no-store"});
  const d=await r.json();
  const t=d.ticker;
  state.btc=Number(t.btc_idr.last); state.eth=Number(t.eth_idr.last); state.usdt=Number(t.usdt_idr.last);
  render();
 }catch(e){document.getElementById("ticker").innerHTML='<div class="card">Data market tidak dapat dimuat saat ini.</div>'}
}
function render(){
 const cards=[
  ["BTC/IDR",state.btc,tickerChange("btc_idr")],
  ["ETH/IDR",state.eth,tickerChange("eth_idr")],
  ["USDT/IDR",state.usdt,tickerChange("usdt_idr")],
  ["Volume 24h","Data API","Publik"]
 ];
 document.getElementById("ticker").innerHTML=cards.map((x,i)=>`<div class="card"><div class="muted">${x[0]}</div><div class="price">${typeof x[1]=="number"?"Rp "+fmt(x[1]):x[1]}</div><div class="${i<3?(Number(x[2])>=0?"up":"down"):"muted"}">${i<3?(Number(x[2])>=0?"+":"")+x[2]+"%":x[2]}</div></div>`).join("");
 document.getElementById("btcSmall").textContent="Rp "+fmt(state.btc);
 document.getElementById("ethSmall").textContent="Rp "+fmt(state.eth);
 document.getElementById("usdtSmall").textContent="Rp "+fmt(state.usdt);
 document.getElementById("price").value=state.btc;
 draw();
 loadBook();
}
function tickerChange(p){return "0.00"}
async function loadBook(){
 try{
  const r=await fetch(API+"/depth/btcidr?count=5",{cache:"no-store"}); const d=await r.json();
  document.getElementById("asks").innerHTML=(d.asks||[]).slice(0,5).map(x=>`<tr><td class="down">${fmt(x[0])}</td><td>${x[1]}</td></tr>`).join("");
  document.getElementById("bids").innerHTML=(d.bids||[]).slice(0,5).map(x=>`<tr><td class="up">${fmt(x[0])}</td><td>${x[1]}</td></tr>`).join("");
 }catch(e){}
}
function draw(){
 const c=document.getElementById("chart"),ctx=c.getContext("2d"),r=c.getBoundingClientRect(),d=devicePixelRatio||1;
 c.width=r.width*d;c.height=r.height*d;ctx.scale(d,d);let w=r.width,h=r.height;
 let base=state.btc||1850000000;let pts=[];for(let i=0;i<40;i++)pts.push(base*(1+(Math.sin(i/3)*.006)+(i/40*.004)));
 ctx.beginPath();pts.forEach((v,i)=>{let x=i*w/(pts.length-1),y=h-((v-Math.min(...pts))/(Math.max(...pts)-Math.min(...pts))*.8*h)-.1*h;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle="#1769e0";ctx.lineWidth=2;ctx.stroke();
}
document.getElementById("demoOrder").onclick=()=>alert("Order DEMO. Tidak ada transaksi nyata.");
loadTicker();setInterval(loadTicker,10000);
