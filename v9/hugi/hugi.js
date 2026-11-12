/* 허기 모션 — HPP_공유/브랜딩/허기_모션/index.html(2026-11-13 01:59 판)을 hugi_port.py로 옮김. 직접 고치지 말고 원본을 고친 뒤 다시 돌린다. */
(function(){
const HG_BASE=(document.currentScript&&document.currentScript.src||'').replace(/[^/]*$/,'')||'hugi/';
const MARKUP='<div id="hg-stage"><div id="hg-shadow"></div><div id="hg-hugi" role="img" aria-label="허기"><svg id="hg-rig" viewBox="0 0 760 700" aria-hidden="true"><defs><clipPath id="hg-cL"><circle cx="337" cy="357" r="50.8"/></clipPath><clipPath id="hg-cR"><circle cx="418" cy="357" r="50.6"/></clipPath><clipPath id="hg-cA"><circle cx="337" cy="357" r="50.8"/><circle cx="418" cy="357" r="50.6"/></clipPath></defs><g id="hg-sq"><g id="hg-lk"><g id="hg-ac"><g id="hg-br"><g id="hg-pg"><g id="hg-bodies"></g><g id="hg-eyes"><g id="hg-vec"><circle cx="337" cy="357" r="52.3" fill="#FF6A22"/><circle cx="418" cy="357" r="52.1" fill="#FF6A22"/><circle cx="337" cy="357" r="50.5" fill="#FDFDFD"/><circle cx="418" cy="357" r="50.3" fill="#FDFDFD"/><g clip-path="url(#hg-cA)"><circle id="hg-pL" r="20.8" fill="#0A0A0A"/><circle id="hg-pR" r="20.9" fill="#0A0A0A"/></g><g clip-path="url(#hg-cL)"><g id="hg-lidL"><rect id="hg-lrL" x="240" width="200" fill="#FF7631"/><line id="hg-llL" stroke="#1B1B1B" stroke-width="6" stroke-linecap="round"/></g></g><g clip-path="url(#hg-cR)"><g id="hg-lidR"><rect id="hg-lrR" x="320" width="200" fill="#FF7631"/><line id="hg-llR" stroke="#1B1B1B" stroke-width="6" stroke-linecap="round"/></g></g></g></g></g></g></g></g></g><g id="hg-fx"></g></svg><div id="hg-bubble" aria-hidden="true"></div></div></div>';
const ROOT=document.getElementById('hugi-root');if(!ROOT||!window.gsap)return;ROOT.innerHTML=MARKUP;const $=s=>ROOT.querySelector(s);const FLOOR=0;
const NS='http://www.w3.org/2000/svg';
const H=$('#hg-hugi'),S=$('#hg-sq'),LK=$('#hg-lk'),AC=$('#hg-ac'),EGR=$('#hg-eyes'),BR=$('#hg-br'),PG=$('#hg-pg'),FX=$('#hg-fx'),SH=$('#hg-shadow'),ST=$('#hg-stage'),BUB=$('#hg-bubble'),CTA=document.createElement('i'),INFO=null;
const RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const Y='#FFC21A',BEIGE='#E3CDB5',BLUE='#7FD0F5',GRAY='#B8A292';
const FEET='380 665';                      // 몸이 눌리고 늘어나는 기준점(발 바닥)
gsap.defaults({overwrite:'auto'});
gsap.ticker.lagSmoothing(0);               // 프레임이 밀려도 동작 속도를 억지로 줄이지 않음

/* ================= 그림 ================= */
/* 팔다리 = 원본 시트의 동그란 혹 4개. 몸 둘레를 따라 미끄러지며 움직이고(몸 중심 기준 회전 + 가장자리 거리 보정), 늘 몸 가장자리에 반쯤 묻혀 있음 */
const NUB={"aL":{"f":"nub_armL.png","x":84,"y":314,"w":99,"h":118,"th":189.0},"aR":{"f":"nub_armR.png","x":575,"y":309,"w":101,"h":116,"th":349.6},"lL":{"f":"nub_legL.png","x":182,"y":551,"w":136,"h":118,"th":122.4},"lR":{"f":"nub_legR.png","x":442,"y":559,"w":131,"h":107,"th":58.8}};
const GEO={c:[381.3, 410.5],R:[231.5,231.0,231.0,231.0,231.0,231.0,232.0,234.0,234.5,235.0,234.5,234.5,232.0,231.0,230.5,230.5,231.0,232.0,232.0,232.0,232.0,231.5,229.5,229.5,229.5,229.5,231.5,232.0,232.5,232.5,232.0,232.0,231.5,232.0,232.5,232.5,232.5,233.0,232.5,232.5,232.5,232.0,232.0,231.5,231.5,231.5,231.5,231.5,230.0,229.5,229.0,228.5,228.5,228.5,228.0,227.5,226.5,226.5,220.5,220.5,220.5,220.5,220.0,219.5,218.0,217.5,217.5,217.5,217.5,217.5,216.0,215.5,215.0,215.0,214.5,214.5,214.5,214.5,214.5,214.5,214.5,214.5,214.5,214.5,214.5,214.0,214.5,214.5,214.5,214.5,214.5,214.5,214.5,215.5,216.0,215.5,215.5,215.5,216.0,216.0,216.5,216.5,216.5,217.0,217.5,219.0,219.5,219.0,219.0,219.0,219.5,219.5,219.5,219.0,219.0,219.0,219.0,219.0,219.5,219.5,219.5,219.5,220.0,221.5,222.0,223.5,222.5,222.5,225.0,226.0,226.5,226.5,228.0,228.0,228.0,228.0,228.0,229.0,231.5,232.0,232.5,233.0,233.0,233.0,232.5,232.0,229.5,229.0,229.5,230.0,230.0,229.5,229.5,228.5,228.5,228.5,228.5,228.5,229.0,230.0,230.5,230.5,230.5,230.5,230.0,231.0,231.5,232.0,232.5,234.0,234.0,233.5,233.5,233.5,234.0,234.5,235.5,235.5,235.5,235.5,235.5,234.5,233.5,233.0,233.0,232.0,231.5,231.5,231.5,231.5,231.5,231.0,231.0,231.0,231.0,231.0,231.0,231.5,231.0,231.0,231.0,231.0,231.0,230.5,230.5,230.5,230.5,230.5,230.0,230.0,229.5,228.0,228.0,227.0,226.0,226.0,224.5,224.5,224.0,224.0,223.5,224.0,224.0,224.0,224.0,224.0,224.5,224.5,225.0,226.5,226.5,226.5,226.5,226.5,226.0,226.0,226.0,226.0,224.5,224.5,224.5,223.0,223.0,223.0,222.5,222.5,222.5,222.5,222.5,222.5,222.5,222.5,223.5,224.0,224.0,223.5,223.5,223.5,223.5,223.5,223.5,223.5,223.5,223.5,223.5,223.5,223.0,222.0,221.5,221.0,221.5,222.0,222.0,222.0,221.5,221.5,221.5,221.5,221.5,222.0,222.0,222.0,222.5,222.5,222.5,222.0,221.5,221.5,221.0,221.0,220.0,220.0,219.5,219.5,219.5,219.5,219.5,219.5,219.5,219.5,219.5,220.0,220.0,220.0,220.0,220.0,220.5,221.0,221.5,222.0,222.5,223.0,222.5,222.5,222.5,223.0,222.5,222.5,222.5,223.0,223.0,223.0,223.0,223.0,223.0,223.0,223.5,226.5,226.5,226.5,223.5,225.5,226.5,227.5,226.5,227.5,227.5,228.0,228.0,228.0,228.0,227.5,227.5,227.5,227.5,228.0,228.5,228.5,229.0,229.0,229.5,229.5,229.5,230.0,230.0,230.0,230.0,230.0,231.0,231.5]};
const PATCH=['happy','sad','angry','wow','doubt','wink','shy','squint','closed','sparkle','hop','surprised'];
const FACE={x:190,y:240,w:380,h:280};
function img(href,x,y,w,h){const e=document.createElementNS(NS,'image');e.setAttribute('href',href);e.setAttributeNS('http://www.w3.org/1999/xlink','href',href);e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('width',w);e.setAttribute('height',h);e.setAttribute('preserveAspectRatio','none');e.style.opacity=0;return e;}
const BEL={},PEL={},LO={},LI={},LS={};
/* 팔다리는 몸 뒤에 붙어 있는 4개의 조각. 바깥 그룹(LO)은 자세, 안쪽 그룹(LI)은 움직임을 맡아 서로 더해집니다 */
/* 몸 뒤 받침: 팔다리와 몸이 만나는 자리 뒤에 몸 색을 깔아 팔다리가 움직여도 틈이 비치지 않게 */
const LG={};
Object.keys(NUB).forEach(k=>{const d=NUB[k],g=document.createElementNS(NS,'g');const e=img(HG_BASE+''+d.f,d.x,d.y,d.w,d.h);e.style.opacity=1;g.appendChild(e);$('#hg-bodies').appendChild(g);LG[k]=g;BEL[k]=e;
  LO[k]={rotation:0};LI[k]={rotation:0,x:0,y:0,scaleX:1,scaleY:1};LS[k]={rotation:0,scaleY:1,skewX:0};});
{const e=img(HG_BASE+'body_core.png',0,0,760,700);e.style.opacity=1;$('#hg-bodies').appendChild(e);BEL.body=e;}
PATCH.forEach(k=>{const e=img(HG_BASE+'eye_'+k+'.png',FACE.x,FACE.y,FACE.w,FACE.h);$('#hg-eyes').appendChild(e);PEL[k]=e;});
const VEC=$('#hg-vec');VEC.style.opacity=1;
let poseNow='base',eyeNow='vec';
/* 표정 · 자세가 바뀔 때 몸이 먼저 살짝 반응해서, 그림이 바뀌는 순간을 움직임 뒤로 가려 줍니다 */
function accent(amt){amt=amt||1;gsap.timeline({overwrite:false}).to(AC,{scaleY:1-.045*amt,scaleX:1+.02*amt,duration:5/60,ease:'power2.out',svgOrigin:FEET,overwrite:'auto'}).to(AC,{scaleY:1,scaleX:1,duration:22/60,ease:SPR,svgOrigin:FEET,overwrite:false});}
/* 자세 = 팔다리의 기본 모양. aL/aR은 팔을 들어 올린 각도(0이면 아래로 늘어짐), sp는 다리를 벌린 각도, dy는 몸 내려앉기 */
const LP={base:{},up:{aL:20,aR:20},out:{aL:18,aR:18},wave:{aL:4,aR:20},point:{aL:0,aR:18},think:{aL:0,aR:16},sit:{aL:-8,aR:-8,sp:34,dy:16},rest:{aL:-8,aR:-8}};
function pose(n,d){if(!LP[n])n='base';poseNow=n;const p=Object.assign({aL:0,aR:0,sp:0,dy:0},LP[n]);d=d==null?.32:d;const e='back.out(1.1)';
  gsap.to(LO.aL,{rotation:p.aL,duration:d,ease:e});gsap.to(LO.aR,{rotation:-p.aR,duration:d,ease:e});
  gsap.to(LO.lL,{rotation:p.sp,duration:d,ease:e});gsap.to(LO.lR,{rotation:-p.sp,duration:d,ease:e});
  gsap.to(PG,{y:p.dy,duration:Math.max(.28,d),ease:'sine.inOut'});}
/* 표정 바꾸기: 눈이 가늘어졌다가(3프레임) 새 표정으로 바뀌며 통통 튀듯 열림(8프레임). 사람이 눈을 깜빡이며 표정을 바꾸는 것과 같은 흐름 */
let eyeBusy=false,eyePend=null;
function showEye(n){const to=n==='vec'?VEC:PEL[n];[VEC,...Object.values(PEL)].forEach(el=>gsap.set(el,{opacity:el===to?1:0}));eyeNow=n;}
function eyes(n,fast){
  if(eyeBusy){eyePend=n;return;}
  if(n===eyeNow)return;
  eyeBusy=true;eyePend=null;accent(.5);
  const tl=gsap.timeline({onComplete:()=>{eyeBusy=false;if(eyePend&&eyePend!==eyeNow){const p=eyePend;eyePend=null;eyes(p);}}});
  tl.to(EGR,{scaleY:.1,scaleX:1.06,duration:(fast?2:3)/60,ease:'power2.in',overwrite:false})
    .call(()=>showEye(n))
    .to(EGR,{scaleY:1,scaleX:1,duration:(fast?6:9)/60,ease:'back.out(2.6)',overwrite:false});}

/* ================= 눈동자 · 눈꺼풀(연속 움직임) ================= */
const E={gx:0,gy:0,pr:1,lid:0,tilt:0};
const EC={L:[337,357],R:[418,357],pL:[340.4,356.7],pR:[415.3,356.7]};
const tg={x:0,y:0};let gazeMode='mouse',sacc={x:0,y:0},orbitT=0,mx=null,my=null,lastMove=0;
function look(x,y){gazeMode='fixed';tg.x=x;tg.y=y;}
function lookMouse(){gazeMode='mouse';}
const pLe=$('#hg-pL'),pRe=$('#hg-pR');
function renderEyes(){
  const gx=E.gx*31,gy=E.gy*29;
  pLe.setAttribute('cx',EC.pL[0]+gx);pLe.setAttribute('cy',EC.pL[1]+gy);pLe.setAttribute('r',20.8*E.pr);
  pRe.setAttribute('cx',EC.pR[0]+gx);pRe.setAttribute('cy',EC.pR[1]+gy);pRe.setAttribute('r',20.9*E.pr);
  [['L',EC.L,1],['R',EC.R,-1]].forEach(([k,c,sg])=>{
    const bottom=c[1]-53+E.lid*(106+6);           // 눈꺼풀 아래 선
    const rect=$('#hg-lr'+k),line=$('#hg-ll'+k);
    rect.setAttribute('y',c[1]-160);rect.setAttribute('height',Math.max(0,bottom-(c[1]-160)));
    const ly=Math.min(bottom,c[1]+44);line.setAttribute('x1',c[0]-60);line.setAttribute('x2',c[0]+60);line.setAttribute('y1',ly);line.setAttribute('y2',ly);
    line.style.opacity=Math.min(1,E.lid*8);
    $('#hg-lid'+k).setAttribute('transform','rotate('+(sg*E.tilt)+' '+c[0]+' '+c[1]+')');
  });
}
function blink(){if(RM||E.lid>.05||eyeNow!=='vec'||!/^(idle|listening|speaking|thinking|poke)$/.test(state))return;
  const tl=gsap.timeline();tl.to(E,{lid:1,duration:4/60,ease:'power1.in',overwrite:false}).to(E,{lid:0,duration:7/60,ease:'power1.out',overwrite:false},'+=.03');
  if(Math.random()<.2)tl.to(E,{lid:1,duration:4/60,ease:'power1.in',overwrite:false},'+=.1').to(E,{lid:0,duration:7/60,ease:'power1.out',overwrite:false},'+=.03');}
(function loop(){setTimeout(()=>{blink();loop();},2500+Math.random()*3200);})();
(function micro(){setTimeout(()=>{if(gazeMode==='mouse'&&performance.now()-lastMove>1800){sacc.x=(Math.random()-.5)*.5;sacc.y=(Math.random()-.5)*.3;setTimeout(()=>{sacc.x=sacc.y=0;},700+Math.random()*600);}micro();},1700+Math.random()*2200);})();
window.addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;lastMove=performance.now();touch();if(state==='sleeping'&&Date.now()-sleepAt>2500)wake();});

/* ================= 효과(시트와 같은 색의 단순한 선) ================= */
function mk(tag,at,parent){const e=document.createElementNS(NS,tag);for(const k in at)e.setAttribute(k,at[k]);(parent||FX).appendChild(e);return e;}
const FXB=document.createElementNS(NS,'g');FXB.id='hg-fxb';S.parentNode.insertBefore(FXB,S);
/* 잡아 늘리기 층: 몸 전체(팔다리 포함)를 감싸, 잡고 당기는 방향으로 늘림 */
const PL=document.createElementNS(NS,'g');PL.id='hg-pl';S.parentNode.insertBefore(PL,S);PL.appendChild(S);
/* 머리 쪽 효과(강조선 · 물음표 · 별 · 땀 · 점 · 로딩 · z)는 모두 머리 오른쪽 위 한 점(EMO, 몸 별 무늬 쪽)에서 나오고,
   이 층이 매 프레임 그 점을 따라가 몸이 눌리거나 기울어도 머리에 붙어 있음 */
const EMO=[539,253];const FXA=document.createElementNS(NS,'g');FXA.id='hg-fxa';FX.parentNode.insertBefore(FXA,FX.nextSibling);
function followFx(){const sx=gsap.getProperty(S,'scaleX')||1,sy=gsap.getProperty(S,'scaleY')||1,rot=(gsap.getProperty(S,'rotation')||0)*Math.PI/180,py=gsap.getProperty(PG,'y')||0;
  const lx=(EMO[0]-380)*sx,ly=-(665-(EMO[1]+py))*sy,ax=380+lx*Math.cos(rot)-ly*Math.sin(rot),ay=665+lx*Math.sin(rot)+ly*Math.cos(rot);
  FXA.setAttribute('transform','translate('+(ax-EMO[0]).toFixed(2)+' '+(ay-EMO[1]).toFixed(2)+')');}
function clearFx(){[FX,FXB,FXA].forEach(g=>{g.querySelectorAll('*').forEach(e=>{gsap.killTweensOf(e);if(e._o)gsap.killTweensOf(e._o);});g.innerHTML='';});}
function burst(cx,cy,o){o=Object.assign({n:3,a0:-70,a1:-20,r1:60,r2:108,col:Y,w:14,p:FX},o||{});
  for(let i=0;i<o.n;i++){const a=(o.a0+(o.a1-o.a0)*(o.n===1?.5:i/(o.n-1)))*Math.PI/180;
    const x1=cx+Math.cos(a)*o.r1,y1=cy+Math.sin(a)*o.r1,x2=cx+Math.cos(a)*o.r2,y2=cy+Math.sin(a)*o.r2;
    const l=mk('line',{x1,y1,x2:x1,y2:y1,stroke:o.col,'stroke-width':o.w,'stroke-linecap':'round'},o.p);
    gsap.timeline({onComplete:()=>l.remove()}).to(l,{attr:{x2,y2},duration:.16,ease:'power2.out'}).to(l,{attr:{x1:x2,y1:y2},duration:.18,ease:'power2.in'},.45);}}
const burstR=o=>burst(EMO[0]+4,EMO[1]-4,Object.assign({a0:-82,a1:-8,r1:22,r2:76,w:13,p:FXA},o)),burstL=burstR;   // 한 방향(오른쪽 위)으로 통일, 몸 가장자리에서 바로 시작
function sweat(x,y){const p=mk('path',{d:'M0,-30 C14,-10 22,2 0,18 C-22,2 -14,-10 0,-30Z',fill:BLUE},FXA);gsap.set(p,{x,y,scale:0,svgOrigin:'0 0'});
  gsap.timeline({onComplete:()=>p.remove()}).to(p,{scale:1.2,duration:.2,ease:'back.out(2)'}).to(p,{y:y+40,opacity:0,duration:.7,ease:'power1.in'},'+=.25');}
function star4(x,y,s){const p=mk('path',{d:'M0,-1 Q.14,-.14 1,0 Q.14,.14 0,1 Q-.14,.14 -1,0 Q-.14,-.14 0,-1Z',fill:Y},FXA);gsap.set(p,{x,y,scale:0,rotation:0,svgOrigin:'0 0'});
  gsap.timeline({onComplete:()=>p.remove()}).to(p,{scale:s,rotation:20,duration:.25,ease:'back.out(2)'}).to(p,{scale:0,rotation:-20,duration:.25,ease:'power2.in'},'+=.5');}
function glyph(ch,x,y,size,col){const t=mk('text',{'font-size':size,'font-weight':900,fill:col||Y,'text-anchor':'middle','font-family':'Pretendard,system-ui,sans-serif'},FXA);t.textContent=ch;gsap.set(t,{x,y,scale:0,svgOrigin:'0 0'});return t;}
function pop(ch,x,y,size,hold){const t=glyph(ch,x,y,size);gsap.timeline({onComplete:()=>t.remove()}).to(t,{scale:1,rotation:-8,duration:.35,ease:'elastic.out(1.2,.4)'}).to(t,{opacity:0,y:y-20,duration:.3},'+='+(hold||1));}
function dust(x,y,s){s=s||1;[-1,1].forEach(d=>{const c=mk('circle',{r:16*s,fill:BEIGE},FXB);gsap.set(c,{x:x+d*120,y:y+6,opacity:.9});gsap.to(c,{x:x+d*(120+110*s),y:y-14*s,scale:1.7,opacity:0,duration:.5,ease:'power2.out',onComplete:()=>c.remove()});});}
function dots(x,y,k){k=k||1;for(let i=0;i<3;i++){const c=mk('circle',{r:10,fill:GRAY},FXA);gsap.set(c,{x:x+i*30,y,scale:0,svgOrigin:'0 0'});gsap.to(c,{scale:1,duration:.2,delay:i*.06,ease:'back.out(2)'});gsap.to(c,{y:y-18,duration:.35*k,yoyo:true,repeat:-1,repeatDelay:.5*k,delay:i*.16*k,ease:'sine.inOut'});}}
/* ===== AI 상태 신호: 모두 머리 오른쪽 위(EMO)에서, 상태가 이어지는 동안 유지 =====
   듣는 중 = 머리 쪽으로 들어오는 하늘색 물결 / 말하는 중 = 바깥으로 퍼지는 노란 물결 / 생각 중 = 점 세 개 / 불러오는 중 = 도는 점
   모르는 질문 = 물음표 / 칭찬 = 하트 / 오류 = 빨간 경고 배지 / 놀람 · 인사 = 강조선 */
function arcD(r){const a0=-80*Math.PI/180,a1=-10*Math.PI/180,cx=EMO[0],cy=EMO[1];return 'M'+(cx+r*Math.cos(a0)).toFixed(1)+','+(cy+r*Math.sin(a0)).toFixed(1)+' A'+r+','+r+' 0 0 1 '+(cx+r*Math.cos(a1)).toFixed(1)+','+(cy+r*Math.sin(a1)).toFixed(1);}
function wavePulse(dir,col){const rs=dir>0?[30,50,70]:[70,50,30];rs.forEach((r,i)=>{const a=mk('path',{d:arcD(r),fill:'none',stroke:col,'stroke-width':10,'stroke-linecap':'round',opacity:0},FXA);
  gsap.timeline({delay:i*.09,onComplete:()=>a.remove()}).to(a,{opacity:1,duration:.12,ease:'sine.out'}).to(a,{opacity:0,duration:.3,ease:'sine.in'},'+=.06');});}
function listenWaves(){wavePulse(-1,BLUE);const t=setInterval(()=>{if(state!=='listening'){clearInterval(t);return;}wavePulse(-1,BLUE);},1300);timers.push(t);}
function heart(x,y,s){const p=mk('path',{d:'M0,.35 C-.5,0 -.56,-.46 -.26,-.5 C-.09,-.53 0,-.41 0,-.3 C0,-.41 .09,-.53 .26,-.5 C.56,-.46 .5,0 0,.35Z',fill:'#FF7FA3'},FXA);gsap.set(p,{x,y,scale:0,svgOrigin:'0 0'});
  gsap.timeline({onComplete:()=>p.remove()}).to(p,{scale:s,duration:.3,ease:'back.out(2.4)'}).to(p,{y:y-34,duration:.9,ease:'sine.out'},'<').to(p,{opacity:0,scale:s*.8,duration:.3,ease:'power1.in'},'-=.25');}
function alertBadge(x,y){const g=mk('g',{},FXA);mk('circle',{r:33,fill:'#FF4A1C'},g);const t=mk('text',{y:17,'font-size':48,'font-weight':900,fill:'#fff','text-anchor':'middle','font-family':'Pretendard,system-ui,sans-serif'},g);t.textContent='!';
  gsap.set(g,{x,y,scale:0,svgOrigin:'0 0'});gsap.timeline().to(g,{scale:1,duration:.3,ease:'back.out(2.4)'}).to(g,{rotation:12,duration:.06,yoyo:true,repeat:5,ease:'sine.inOut'},'+=.05').to(g,{rotation:0,duration:.08});}
function spinner(x,y){const g=mk('g',{},FXA);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;mk('circle',{r:8,cx:Math.cos(a)*38,cy:Math.sin(a)*38,fill:GRAY,opacity:.15+i/8*.85},g);}
  gsap.set(g,{x,y});gsap.to(g,{rotation:360,duration:1,ease:'steps(8)',repeat:-1,svgOrigin:x+' '+y});}
function zzz(x,y){const tl=gsap.timeline({repeat:-1});for(let i=0;i<3;i++){const t=glyph('z',x,y,54+i*14,'#9FA8C9');tl.fromTo(t,{scale:0,opacity:1,x,y},{scale:1,x:x+34+i*18,y:y-56-i*22,duration:1.2,ease:'power1.out'},i*.8).to(t,{opacity:0,duration:.4},i*.8+1.0);}}
/* 어지러움 별: 머리 위 납작한 고리를 따라 도는 별 3개. 앞으로 올 때 크고 진하게, 뒤로 갈 때 작고 옅게(머리를 감싸 도는 느낌) */
function orbit(x,y){const g=mk('g',{},FXA),st=[];for(let i=0;i<3;i++){st.push(mk('path',{d:'M0,-1 Q.14,-.14 1,0 Q.14,.14 0,1 Q-.14,.14 -1,0 Q-.14,-.14 0,-1Z',fill:Y},g));}
  const o={t:0},place=()=>{st.forEach((p,i)=>{const a=o.t+i*2.094,z=Math.sin(a);p.setAttribute('transform','translate('+(x+Math.cos(a)*128).toFixed(1)+' '+(y+z*26).toFixed(1)+') rotate('+(o.t*60%360).toFixed(1)+') scale('+(27+z*8).toFixed(2)+')');p.setAttribute('opacity',(.7+z*.3).toFixed(2));});};
  place();gsap.fromTo(g,{scale:0,svgOrigin:x+' '+y},{scale:1,duration:.3,ease:'back.out(2)'});gsap.to(o,{t:Math.PI*2,duration:1.3,repeat:-1,ease:'none',onUpdate:place});g._o=o;}
/* 2026-11-13 감정 추가용 효과 — 모두 머리 오른쪽 위(EMO) 근처에서 나옴 */
/* 김(숨 내쉬기 · 흥): 동그라미 셋이 오른쪽 위로 퍼지며 사라짐 */
function puff(x,y,col){for(let i=0;i<3;i++){const c=mk('circle',{r:19-i*4,fill:col||'#C4B2A1'},FXA);gsap.set(c,{x:x+i*14,y:y-i*10,scale:0,opacity:.95,svgOrigin:'0 0'});
  gsap.timeline({delay:i*.07,onComplete:()=>c.remove()}).to(c,{scale:1,duration:.18,ease:'back.out(2)'}).to(c,{x:x+34+i*24,y:y-28-i*16,scale:1.7,opacity:0,duration:.65,ease:'power1.out'});}}
/* 두근거리는 하트: 제자리에서 두 번씩 쿵쿵 뛰고 사라짐(칭찬받음의 떠오르는 하트와 다름) */
function heartBeat(x,y,s,n){const p=mk('path',{d:'M0,.35 C-.5,0 -.56,-.46 -.26,-.5 C-.09,-.53 0,-.41 0,-.3 C0,-.41 .09,-.53 .26,-.5 C.56,-.46 .5,0 0,.35Z',fill:'#FF7FA3'},FXA);gsap.set(p,{x,y,scale:0,svgOrigin:'0 0'});
  const tl=gsap.timeline({onComplete:()=>p.remove()});tl.to(p,{scale:s,duration:.25,ease:'back.out(2.4)'});
  for(let i=0;i<n;i++)tl.to(p,{scale:s*1.25,duration:.08,ease:'power2.out'}).to(p,{scale:s,duration:.12,ease:'power2.in'}).to(p,{scale:s*1.16,duration:.08,ease:'power2.out'}).to(p,{scale:s,duration:.26,ease:'power2.in'});
  tl.to(p,{scale:0,opacity:0,duration:.25,ease:'power2.in'},'+=.1');}
/* 꼬르륵: 짧은 물결선 두 줄이 부르르 떨다 사라짐 */
function rumble(x,y){for(let i=0;i<2;i++){const p=mk('path',{d:'M0,0 q8,-10 16,0 t16,0 t16,0',fill:'none',stroke:GRAY,'stroke-width':8,'stroke-linecap':'round','stroke-linejoin':'round'},FXA);
  gsap.set(p,{x:x+i*12,y:y+i*28,scale:0,svgOrigin:'0 0'});
  gsap.timeline({delay:i*.12,onComplete:()=>p.remove()}).to(p,{scale:1.15,duration:.16,ease:'back.out(2)'}).to(p,{x:'+=6',duration:.05,yoyo:true,repeat:7,ease:'sine.inOut'}).to(p,{opacity:0,duration:.25});}}

/* ================= 프레임 기반 움직임 도구 =================
   모든 움직임은 60fps 기준 프레임 번호로 키프레임을 적습니다. 예) [7,{...},'power2.out'] = 7번째 프레임까지 이 값으로. */
const SQ=s=>({scaleY:s,scaleX:+(1/Math.sqrt(s)).toFixed(4)});          // 부피 유지: 세로가 줄면 가로가 늘어남
const SPR=p=>p>=1?1:1-Math.exp(-5.2*p)*Math.cos(p*12.6);                // 용수철처럼 튕기며 제자리로
function kf(tl,tg_,frames,base){base=base||0;let p=0;frames.forEach(([f,props,ease])=>{tl.to(tg_,Object.assign({duration:Math.max(.001,(f-p)/60),ease:ease||'sine.inOut',overwrite:false},props),(base+p)/60);p=f;});return base+p;}
/* 팔 도구: [프레임, 들어 올린 각도, 곡선]. 양팔이 대칭으로 움직이고 which로 한쪽만 고를 수 있음 */
function arms(tl,fr,b,which){
  if(which!=='R')kf(tl,LI.aL,fr.map(([f,v,e])=>[f,{rotation:v},e]),b);
  if(which!=='L')kf(tl,LI.aR,fr.map(([f,v,e])=>[f,{rotation:-v},e]),b);}
/* 다리 도구: [프레임, {sp:벌린 각도, y:들어올림, sy:길이}, 곡선] */
function legs(tl,fr,b,which){
  const ly=o=>(o.y||0)-Math.max(0,(o.sy||1)-1)*55;               // 다리가 길어지면 그만큼 위로 올려 바닥을 뚫지 않게
  if(which!=='R')kf(tl,LI.lL,fr.map(([f,o,e])=>[f,{rotation:o.sp||0,y:ly(o),scaleY:o.sy||1},e]),b);
  if(which!=='L')kf(tl,LI.lR,fr.map(([f,o,e])=>[f,{rotation:-(o.sp||0),y:ly(o),scaleY:o.sy||1},e]),b);}
function flapFr(n,fr,amp,c){c=c||0;const a=[];for(let i=0;i<n;i++)a.push([(i+1)*fr,c+(i%2?-amp:amp)*Math.pow(.93,i),'sine.inOut']);a.push([(n+1)*fr+5,0,'sine.out']);return a;}
function swayLoop(tl,amp,t){amp=amp||3.5;t=t||0;
  tl.to(LI.aL,{rotation:-amp,duration:1.15,ease:'sine.inOut',overwrite:false},t).to(LI.aL,{rotation:amp,duration:2.3,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},t+1.15)
    .to(LI.aR,{rotation:amp,duration:1.35,ease:'sine.inOut',overwrite:false},t+.4).to(LI.aR,{rotation:-amp,duration:2.7,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},t+1.75);}
/* 서 있을 때 체중 이동: 다리가 번갈아 아주 조금 들리고 기울어 완전히 굳어 보이지 않게 */
function legIdle(tl,t){t=t||0;tl.to(LI.lL,{rotation:1.5,y:-1.5,duration:2.9,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},t).to(LI.lR,{rotation:-1.5,y:-1.5,duration:2.9,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},t+1.4);}
/* 옆으로 움직이는 거리: 무대가 좁으면(모바일) 비례해서 줄여 화면 밖으로 나가지 않게 */
function moveK(){const budget=ST.clientWidth/2-H.offsetWidth*.46;return Math.max(.3,Math.min(1,budget/150));}
function hop(tl,b,h,dx,o){o=o||{};dx=(dx||0)*moveK();const A=o.arms==null?1:o.arms;                       // 72프레임(1.2초) 뛰기: 몸 · 팔 · 다리가 함께
  kf(tl,S,[[7,SQ(.84),'power2.out'],[10,SQ(1.14),'power2.out'],[28,SQ(1.05),'sine.out'],[40,SQ(1.1),'sine.in'],[44,SQ(1.1),'none'],[48,SQ(.76),'power3.out'],[54,SQ(1.08),'power2.out'],[60,SQ(.98),'sine.inOut'],[72,SQ(1),'sine.out']],b);
  kf(tl,H,[[10,{y:0},'none'],[28,{y:-h},'power2.out'],[44,{y:0},'power2.in']],b);
  if(dx)tl.to(H,{x:()=>{const bb=bounds();return Math.max(bb.minX,Math.min(bb.maxX,gsap.getProperty(H,'x')+dx));},duration:34/60,ease:'sine.inOut',overwrite:false},(b+10)/60);   // 걸음이 시작될 때 무대 안쪽으로 도착 위치를 묶음
  const af=a=>[[7,-10*a,'power2.out'],[10,26*a,'power2.out'],[28,44*a,'sine.out'],[44,16*a,'sine.in'],[48,-8*a,'power3.out'],[54,18*a,'power2.out'],[60,3*a,'sine.inOut'],[72,0,'sine.out']];
  if(o.step){arms(tl,af(A),b+(o.step==='L'?0:6),'R');arms(tl,af(A*.55),b+(o.step==='L'?6:0),'L');}else arms(tl,af(A),b);
  const lf=(k,lift,spm)=>[[7,{sp:-4*k,sy:1-.18*k},'power2.out'],[10,{sp:0,sy:1+.22*k},'power2.out'],[28,{sp:7*k*(spm||1),y:lift==null?-4*k:-lift,sy:1+.05*k},'sine.out'],[44,{sp:5*k,sy:1+.16*k},'sine.in'],[48,{sp:24*k,sy:1-.15*k},'power3.out'],[54,{sp:2*k,sy:1+.1*k},'power2.out'],[60,{sp:5*k,sy:1-.04*k},'sine.inOut'],[72,{sp:0,sy:1},'sine.out']];
  if(o.step==='L'){legs(tl,lf(1,32,2),b,'L');legs(tl,lf(.2,0),b,'R');}else if(o.step==='R'){legs(tl,lf(.2,0),b,'L');legs(tl,lf(1,32,2),b,'R');}else legs(tl,lf(1),b);
  tl.call(()=>dust(380,650),null,(b+48)/60);return b+72;}
function shake(tl,tg_,prop,b,amp,n,fr,decay){decay=decay||.72;const fl=[];for(let i=0;i<n;i++)fl.push([(i+1)*fr,{[prop]:(i%2?-1:1)*amp*Math.pow(decay,i)},'sine.inOut']);fl.push([(n+1)*fr+4,{[prop]:0},'sine.out']);return kf(tl,tg_,fl,b);}
function face(p,e,o){o=o||{};pose(p,o.pd);eyes(e,o.ed);gsap.to(E,{lid:o.lid||0,pr:o.pr||1,tilt:o.tilt||0,duration:.12,ease:'power2.out',overwrite:'auto'});}

/* ================= 상태 관리 ================= */
let main=null,timers=[],state='idle',busy=false,sleepAt=0,drag=null;
const phys={on:false,x:0,y:0,vx:0,vy:0,hit:0};
const later=(fn,ms)=>{const t=setTimeout(fn,ms/Math.max(.05,gsap.globalTimeline.timeScale()));timers.push(t);return t;};
function rest(keepBubble){
  if(main){main.kill();main=null}
  timers.forEach(t=>{clearTimeout(t);clearInterval(t)});timers=[];
  gsap.killTweensOf([S,LK,...Object.values(LI)]);
  gsap.to(Object.values(LI),{rotation:0,x:0,y:0,scaleX:1,scaleY:1,duration:.24,ease:'power2.out',overwrite:true});
  gsap.to(S,Object.assign({rotation:0,skewX:0,x:0,y:0,duration:.2,ease:'power2.out',svgOrigin:FEET},SQ(1)));   // 튀지 않고 자연스럽게 제자리로
  const y=gsap.getProperty(H,'y');
  if(y<0&&!phys.on){gsap.to(H,{y:0,duration:Math.min(.45,Math.abs(y)/800+.15),ease:'power2.in'});}
  clearFx();if(!keepBubble)say('');lookMouse();
}
const T=v=>{main=gsap.timeline(Object.assign({delay:.06},v||{}));return main;};
function say(t){if(!t){BUB.classList.remove('on');return;}BUB.textContent=t;BUB.classList.add('on');}
function typeSay(t,ms){let i=0;BUB.classList.add('on');BUB.textContent='';const it=setInterval(()=>{i++;BUB.textContent=t.slice(0,i);if(i>=t.length)clearInterval(it);},ms||34);timers.push(it);}
const toIdle=()=>go('idle',1);

/* ================= 동작 목록 ================= */
const M={
 idle:{g:'ai',l:'대기',sit:'아무 질문도 없을 때',mo:'숨 쉬듯 부풀고, 팔이 천천히 흔들리고, 2.5~5.5초마다 눈을 깜빡이며, 마우스가 있는 쪽으로 눈동자가 따라갑니다.',ui:'히어로 질문창 옆, 대화창 구석',
  run(){face('base','vec');main=gsap.timeline({delay:.06});swayLoop(main,3.5);legIdle(main);}},
 hello:{g:'ai',l:'처음 인사',sit:'페이지를 처음 열었을 때',mo:'팔을 퍼덕이며 떨어져 납작하게 착지(팔다리가 옆으로 퍼짐), 용수철처럼 일어나 한 번 뛰고, 한쪽 팔을 높이 들어 흔들며 인사합니다.',ui:'히어로 첫 화면(1회만)',
  run(){const tl=T({onComplete:toIdle});gsap.set(H,{y:-440});face('up','hop');
   kf(tl,H,[[34,{y:0},'power2.in']]);kf(tl,S,[[34,SQ(1.08),'sine.in'],[37,SQ(.62),'power3.out'],[46,SQ(.66),'none'],[52,SQ(1.1),'power2.out'],[58,SQ(.97),'sine.inOut'],[72,SQ(1),SPR]]);
   arms(tl,[[9,16,'sine.inOut'],[17,-16,'sine.inOut'],[25,16,'sine.inOut'],[34,-4,'sine.in'],[40,22,'power3.out'],[46,20,'none'],[54,-6,'power2.out'],[62,10,'sine.inOut'],[78,0,SPR]],0);
   legs(tl,[[10,{sp:6}],[22,{sp:-4}],[34,{sp:8,sy:1.15},'sine.in'],[37,{sp:28,sy:.88},'power3.out'],[46,{sp:26,sy:.9},'none'],[52,{sp:-2,sy:1.1},'power2.out'],[58,{sp:3,sy:.97}],[78,{sp:0,sy:1},SPR]],0);
   tl.call(()=>pose('base',.2),null,24/60).call(()=>{eyes('squint',.05);dust(380,650);},null,34/60).call(()=>{face('base','surprised');},null,50/60);
   const e=hop(tl,78,70,0);tl.call(()=>{face('wave','vec');burstL();say('오..! 안녕하세요. 저는 허기라고 해요.');},null,(e+2)/60);
   arms(tl,flapFr(8,11,22),e+8,'R');shake(tl,S,'rotation',e+4,4,6,10);tl.call(()=>say(''),null,(e+170)/60);}},
 listening:{g:'ai',l:'듣는 중',sit:'사용자가 질문을 입력하는 동안',mo:'입력창(아래)을 내려다보고 몸을 살짝 기울이고, 글자를 칠 때마다 작게 끄덕이며 팔이 가볍게 움찔합니다. 머리 쪽으로 하늘색 소리 물결이 들어옵니다.',ui:'질문창에 포커스가 있을 때',
  run(){face('base','vec');look(0,.8);listenWaves();main=gsap.timeline({delay:.06});kf(main,S,[[14,{rotation:3},'power2.out']]);main.to(S,{rotation:1.5,duration:1.4,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},14/60);swayLoop(main,2.2);legIdle(main,.3);}},
 thinking:{g:'ai',l:'생각 중',sit:'질문을 보내고 대답을 만드는 동안',mo:'위를 올려다보며 한쪽 팔을 들어 올려 톡톡 치고, 발도 번갈아 두드립니다. 점 세 개가 뜨고, 3.5초가 넘으면 납작하게 눌려 점이 느려집니다.',ui:'질문 전송 직후 ~ 첫 글자가 나오기 전',
  run(){face('think','vec');look(.45,-.9);dots(552,208);main=gsap.timeline({delay:.06});kf(main,S,[[16,{rotation:-3},'sine.out']]);main.to(S,{rotation:3,duration:1.1,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},16/60);
   main.to(LI.aR,{rotation:-14,duration:.28,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},.3).to(LI.lL,{rotation:7,y:-3,duration:.3,yoyo:true,repeat:-1,repeatDelay:.3,ease:'sine.inOut',overwrite:false},.4).to(LI.lR,{rotation:-7,y:-3,duration:.3,yoyo:true,repeat:-1,repeatDelay:.3,ease:'sine.inOut',overwrite:false},.7);
   later(()=>{clearFx();main&&main.kill();pose('rest',.4);gsap.to(Object.values(LI),{rotation:0,y:0,duration:.3,overwrite:true});gsap.to(S,Object.assign({rotation:0,duration:.35,ease:'power2.inOut'},SQ(.78)));face('rest','vec',{lid:.45});look(0,.5);dots(552,208,1.8);say('조금만 기다려 주세요…');},3500);}},
 speaking:{g:'ai',l:'말하는 중',sit:'대답 글자가 나오는 동안',mo:'입이 없어서 말하는 박자로 몸이 통통 뜨고, 말하듯 팔을 번갈아 들썩입니다. 눈은 가끔 깜빡이며 웃는 눈과 정면을 오가고, 말하는 박자에 맞춰 노란 소리 물결이 바깥으로 퍼집니다.',ui:'대답이 나오는 말풍선 · 대화창',
  run(){face('base','happy');const R=(a,b)=>a+Math.random()*(b-a);const tick=()=>{if(state!=='speaking')return;const d=(7+Math.random()*6)/60;
    main=gsap.timeline({onComplete:tick}).to(S,Object.assign({rotation:(Math.random()-.5)*3,duration:d,ease:'sine.out'},SQ(1.04))).to(S,Object.assign({duration:d,ease:'sine.in'},SQ(.985)));
    main.to([LI.lL,LI.lR],{scaleY:1.03,duration:d,ease:'sine.out',overwrite:false},0).to([LI.lL,LI.lR],{scaleY:1,duration:d,ease:'sine.in',overwrite:false},d).to(LI.aL,{rotation:R(4,30),duration:d*2,ease:'sine.inOut',overwrite:false},0).to(LI.aR,{rotation:-R(4,30),duration:d*2,ease:'sine.inOut',overwrite:false},d*.5);
    if((PS.tk=(PS.tk||0)+1)%2===1)wavePulse(1,Y);};tick();
   const flip=()=>{if(state!=='speaking')return;eyes(eyeNow==='happy'?'vec':'happy');later(flip,2200+Math.random()*1400);};later(flip,2400);}},
 notknow:{g:'ai',l:'모르는 질문',sit:'범위 밖이거나 근거가 없는 질문',mo:'고개를 갸웃하며 양팔을 들어 어깨를 으쓱하고 물음표를 띄운 뒤, 연락하기 버튼 쪽으로 걸어가 팔로 가리킵니다.',ui:'범위 밖 질문 응대 → 연락하기 안내',
  run(){const tl=T({onComplete:toIdle});face('base','vec');look(-.5,-.85);pop('?',592,212,108,1.4);
   kf(tl,S,[[12,{rotation:-7},'back.out(2)'],[70,{rotation:-7},'none'],[84,{rotation:0},'power2.inOut']]);
   arms(tl,[[10,40,'back.out(2.4)'],[22,34,'sine.inOut'],[34,40,'sine.inOut'],[70,38,'none'],[86,0,'power2.inOut']],0);
   legs(tl,[[10,{sp:4,sy:.94}],[70,{sp:4,sy:.94},'none'],[86,{sp:0,sy:1}]],0);
   tl.call(()=>{look(.9,.3);},null,70/60);
   const e=hop(tl,86,26,70,{step:'R',arms:.4});tl.call(()=>{pose('point',.4);CTA.classList.remove('pulse');void CTA.offsetWidth;CTA.classList.add('pulse');},null,(e-18)/60);
   arms(tl,flapFr(4,10,6),e,'R');tl.to({},{duration:2},e/60);tl.call(()=>{pose('base',.4);look(-.9,.2);},null,(e+100)/60);hop(tl,e+120,22,-70,{step:'L',arms:.4});}},
 praised:{g:'ai',l:'칭찬받음',sit:'사용자가 칭찬하거나 고맙다고 할 때',mo:'볼을 붉히며 팔을 내리고 발끝을 번갈아 모았다 벌리며 몸을 꼬다가, 눈이 웃으며 팔을 들고 한 번 뜁니다. 분홍 하트가 떠오릅니다.',ui:'대화 중 감사 · 칭찬 문장 뒤',
  run(){const tl=T({onComplete:toIdle});face('rest','shy');later(()=>heart(584,210,62),250);shake(tl,S,'rotation',0,9,6,10,.8);
   const wf=[];for(let i=0;i<7;i++)wf.push([10+i*10,{sp:i%2?6:-12},'sine.inOut']);wf.push([88,{sp:0}]);legs(tl,wf,0);arms(tl,[[14,-16,'sine.inOut'],[60,-20,'sine.inOut'],[78,0]],0);
   tl.call(()=>{face('up','happy');heart(598,196,72);},null,78/60);hop(tl,80,50,0,{arms:.6});tl.to({},{duration:.5},152/60);}},
 error:{g:'ai',l:'오류',sit:'연결이 끊기거나 대답을 못 가져왔을 때',mo:'눈물이 맺히고 팔이 힘없이 늘어지고 다리는 안쪽으로 모이며 몸이 가라앉습니다. 빨간 경고 배지가 떠서 오류가 끝날 때까지 남습니다.',ui:'응답 실패 · 다시 시도 안내',
  run(){const tl=T();face('rest','sad');kf(tl,S,[[30,Object.assign({rotation:-2},SQ(.93)),'power2.out'],[80,Object.assign({rotation:0},SQ(.84)),'sine.inOut']]);
   arms(tl,[[30,-30,'power2.out'],[80,-44,'sine.inOut']],0);legs(tl,[[30,{sp:-7,sy:.95},'power2.out'],[80,{sp:-10,sy:.88},'sine.inOut']],0);
   tl.call(()=>alertBadge(590,202),null,.3);}},
 loading:{g:'ai',l:'불러오는 중',sit:'자료를 불러오느라 기다려야 할 때',mo:'낮게 눌려 천천히 숨 쉬고, 팔이 느리게 흔들리고 발을 번갈아 톡톡 두드리고, 옆에서 점이 돕니다.',ui:'화면 전환 · 자료 불러오기',
  run(){face('rest','vec',{lid:.45});look(0,.5);spinner(586,206);main=gsap.timeline({delay:.06});kf(main,S,[[18,SQ(.8),'power2.out']]);main.to(S,Object.assign({duration:1.2,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},SQ(.83)),18/60);
   swayLoop(main,4);main.to(LI.lL,{rotation:6,y:-3,duration:.3,yoyo:true,repeat:-1,repeatDelay:.9,ease:'sine.inOut',overwrite:false},.5).to(LI.lR,{rotation:-6,y:-3,duration:.3,yoyo:true,repeat:-1,repeatDelay:.9,ease:'sine.inOut',overwrite:false},1.1);}},
 surprise:{g:'ai',l:'예상 밖 질문',sit:'예상하지 못한 질문이나 큰 변화',mo:'눈이 커지며 팔이 양옆으로 확 펼쳐지고 몸이 움찔 줄었다가 위로 튀고, 눌리며 착지합니다.',ui:'엉뚱한 질문 · 갑작스러운 알림',
  run(){const tl=T({onComplete:toIdle});face('out','surprised',{pd:.18});burstR();kf(tl,S,[[3,SQ(.9),'power2.out']]);hop(tl,4,90,0,{arms:.6});tl.call(()=>pose('base',.5),null,50/60);tl.to({},{duration:.4},78/60);}},

 happy:{g:'emo',l:'기쁨',sit:'좋은 소식 · 대화가 잘 풀릴 때',mo:'눈이 웃으며 양팔을 번쩍 들고 두 번 통통 뛰고, 뛸 때 팔이 퍼덕입니다.',ui:'칭찬 뒤 · 성공 화면',
  run(){const tl=T({onComplete:toIdle});face('up','happy');burstR();const e=hop(tl,0,44,0,{arms:.7});hop(tl,e-8,44,0,{arms:.7});tl.call(()=>pose('base',.5),null,(e+60)/60);tl.to({},{duration:.4},(e+66)/60);}},
 cheer:{g:'emo',l:'신남',sit:'큰 성과 · 완료',mo:'양팔을 번쩍 들고 눈이 반짝이며 크게 두 번 뛰고, 팔이 힘차게 흔들리며 별이 터집니다.',ui:'복사 완료 · 발송 완료 · 프로젝트 도착',
  run(){const tl=T({onComplete:toIdle});face('up','sparkle');[[578,206],[630,250],[612,160],[664,206],[548,166]].forEach((p,i)=>later(()=>star4(p[0],p[1],32-i*3),i*120));const e=hop(tl,0,80,0,{arms:.7});hop(tl,e-8,80,0,{arms:.7});tl.call(()=>pose('base',.5),null,(e+70)/60);tl.to({},{duration:.5},(e+76)/60);}},
 sad:{g:'emo',l:'슬픔',sit:'안 좋은 소식 · 사과할 때',mo:'눈물이 맺히고 팔이 축 처지고 다리가 안쪽으로 모이며 몸이 천천히 가라앉습니다.',ui:'오류 · 못 도와줄 때',
  run(){const tl=T();face('rest','sad');kf(tl,S,[[54,Object.assign({rotation:-2},SQ(.92)),'power2.out']]);arms(tl,[[40,-30,'power2.out'],[90,-44,'sine.inOut']],0);legs(tl,[[40,{sp:-8,sy:.93},'power2.out']],0);sweat(560,238);later(()=>sweat(572,248),1400);}},
 angry:{g:'emo',l:'화남',sit:'같은 곳을 너무 많이 눌렀을 때',mo:'눈썹이 내려가고 팔을 뻣뻣하게 내린 채 발을 번갈아 쿵쿵 구르며 몸이 떨립니다. 잠시 뒤 숨을 고릅니다.',ui:'연타 · 장난 반응',
  run(){const tl=T({onComplete:toIdle});face('rest','angry');burstR({n:4,col:'#FF4A1C'});
   shake(tl,LK,'x',6,6,12,3,.92);arms(tl,[[6,-8,'power2.out'],[14,-12],[22,-7],[30,-12],[38,-7],[46,-12],[54,-7],[62,-10],[72,0]],0);
   for(let i=0;i<4;i++){legs(tl,[[8,{y:-32,sp:i%2?-6:6},'power2.out'],[13,{y:3,sy:.86},'power3.in'],[20,{y:0,sy:1},'power2.out']],i*17,i%2?'R':'L');kf(tl,S,[[8,SQ(.97),'power2.out'],[13,SQ(.9),'power3.in'],[17,SQ(.94),'power2.out']],i*17);tl.call(()=>dust(i%2?470:290,650,.55),null,(i*17+13)/60);}
   kf(tl,S,[[14,SQ(1.04),'sine.inOut'],[40,SQ(.98),'sine.inOut'],[60,SQ(1),'sine.inOut']],72);legs(tl,[[14,{sy:1.03},'sine.inOut'],[40,{sy:.99},'sine.inOut'],[60,{sy:1}]],72);tl.to({},{duration:.4},132/60);}},
 shy:{g:'emo',l:'부끄러움',sit:'수줍은 대답 · 사생활 질문',mo:'눈을 내리깔고 볼이 붉어지고 팔을 몸 쪽으로 오므리며 발끝을 번갈아 비벼 몸을 비틉니다.',ui:'사적인 질문에 가볍게 넘길 때',
  run(){const tl=T({onComplete:toIdle});face('rest','shy');shake(tl,S,'rotation',0,8,6,11,.8);arms(tl,[[14,-20,'sine.inOut'],[70,-22,'sine.inOut'],[90,0]],0);
   const wf=[];for(let i=0;i<7;i++)wf.push([10+i*11,{sp:i%2?8:-12},'sine.inOut']);wf.push([96,{sp:0}]);legs(tl,wf,0);tl.to({},{duration:.8},1.7);}},
 wink:{g:'emo',l:'윙크',sit:'가벼운 농담 · 잡담',mo:'몸을 살짝 기울이며 한쪽 눈을 찡긋하고, 한쪽 팔을 휙 들었다 내리며 반짝이를 하나 보냅니다.',ui:'잡담 · 마무리 인사',
  run(){const tl=T({onComplete:toIdle});face('base','wink');kf(tl,S,[[12,{rotation:4},'back.out(2)'],[70,{rotation:4},'none'],[84,{rotation:0},'sine.inOut']]);arms(tl,[[10,62,'back.out(1.6)'],[20,40,'sine.inOut'],[30,62,'sine.inOut'],[46,0,'power2.inOut']],0,'R');star4(582,212,28);tl.to({},{duration:.3},1.5);}},
 wow:{g:'emo',l:'눈 반짝',sit:'기대 · 배고픔(허기)이 드러날 때',mo:'눈이 별처럼 반짝이고 양팔을 활짝 펴 파르르 떨며 몸이 들썩이고, 발이 통통 뜁니다.',ui:'질문이 들어오는 순간 · 프로젝트 소개',
  run(){const tl=T({onComplete:toIdle});face('out','wow');for(let i=0;i<4;i++){kf(tl,S,[[8,SQ(1.05),'sine.out'],[16,SQ(.99),'sine.inOut']],i*16);legs(tl,[[8,{sy:1.14,y:-3},'sine.out'],[16,{sy:.94},'sine.inOut']],i*16);}
   arms(tl,flapFr(10,5,14),0);kf(tl,S,[[4,SQ(1)]],64);star4(580,208,28);star4(628,262,20);tl.call(()=>pose('base',.5),null,64/60);tl.to({},{duration:1.2},64/60);}},
 doubt:{g:'emo',l:'의심',sit:'근거가 약한 말 · 의심스러운 질문',mo:'한쪽 눈썹을 올리듯 고개를 기울이며 어깨를 으쓱하고(양팔이 올라감) 위를 봅니다.',ui:'애매한 질문에 되묻기 전',
  run(){const tl=T({onComplete:toIdle});face('base','doubt');kf(tl,S,[[16,{rotation:-5},'back.out(2)'],[100,{rotation:-5},'none'],[116,{rotation:0},'sine.inOut']]);arms(tl,[[10,36,'back.out(2.6)'],[100,36,'none'],[120,0,'power2.inOut']],0);legs(tl,[[10,{sp:5,sy:.95}],[100,{sp:5,sy:.95},'none'],[120,{sp:0,sy:1}]],0);}},
 sleepy:{g:'emo',l:'졸림',sit:'오래 아무도 건드리지 않을 때',mo:'눈꺼풀이 천천히 내려오다 하품하듯 늘어나며 팔이 위로 쭉 펴지고, 눈을 감고 팔다리가 늘어져 천천히 숨 쉬며 z가 올라갑니다.',ui:'25초 이상 입력 · 움직임 없음',
  run(){const tl=T();state='sleeping';sleepAt=Date.now();face('rest','vec');look(0,.5);gsap.to(E,{lid:.55,duration:1.1,ease:'sine.inOut',overwrite:'auto'});
   kf(tl,S,[[40,SQ(1.06),'sine.inOut'],[70,SQ(.95),'sine.inOut']]);arms(tl,[[40,56,'sine.inOut'],[70,-10,'sine.inOut']],0);legs(tl,[[40,{sp:0,sy:1.1}],[70,{sp:12,sy:.95}]],0);
   tl.call(()=>{eyes('closed',.35);zzz(556,222);},null,1.4);tl.to(S,Object.assign({duration:1.9,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},SQ(1.02)),2.2);}},
 dizzy:{g:'emo',l:'어지러움',sit:'빙글빙글 돌려졌을 때 · 연타',mo:'몸이 크게 기울어 흔들리고, 팔이 따로따로 휘청이며 발이 어긋나게 비틀거리고, 눈동자가 빙글빙글 돌며 별 세 개가 머리 위를 돕니다.',ui:'연타 장난 반응',
  run(){const tl=T({onComplete:toIdle});face('base','vec');gazeMode='orbit';orbit(381,146);shake(tl,S,'rotation',0,12,10,13,.9);arms(tl,flapFr(10,13,30,20),0,'L');arms(tl,flapFr(9,15,26,18),2,'R');
   const wf=[];for(let i=0;i<9;i++)wf.push([(i+1)*14,{sp:i%2?14:-10,y:i%2?-4:0},'sine.inOut']);wf.push([140,{sp:0}]);legs(tl,wf,0);tl.to({},{duration:1},2.3);}},
 /* ---- 2026-11-13 추가 감정 8개 ---- */
 moved:{g:'emo',l:'감동',sit:'진심이 담긴 칭찬 · 응원을 들었을 때',mo:'눈이 반짝이며 그렁그렁해지고, 팔을 몸 쪽으로 모은 채 몸이 천천히 부풀며 떨리다가 눈물 두 방울이 떨어집니다. 마지막엔 눈웃음을 짓습니다.',ui:'긴 칭찬 · 응원 메시지 뒤',
  run(){const tl=T({onComplete:toIdle});face('rest','sparkle');
   kf(tl,S,[[40,SQ(1.05),'sine.out'],[150,SQ(1.05),'none'],[175,SQ(1),'sine.inOut']]);shake(tl,S,'rotation',40,2.2,10,10,.95);
   arms(tl,[[20,-24,'power2.out'],[150,-24,'none'],[175,0,'sine.inOut']],0);legs(tl,[[20,{sp:-6,sy:.97}],[150,{sp:-6,sy:.97},'none'],[175,{sp:0,sy:1}]],0);
   later(()=>sweat(556,248),900);later(()=>sweat(572,260),1700);tl.call(()=>eyes('happy'),null,150/60);tl.to({},{duration:.5},175/60);}},
 proud:{g:'emo',l:'뿌듯함',sit:'일을 잘 끝냈을 때 · 성과를 소개할 때',mo:'가슴을 펴듯 몸이 위로 쭉 늘어나며 살짝 젖혀지고, 눈웃음을 지으며 팔을 양옆으로 벌려 버티고, 고개를 두 번 끄덕입니다. 짧은 노란 강조선이 납니다.',ui:'프로젝트 결과 소개 · 완료 화면',
  run(){const tl=T({onComplete:toIdle});face('out','happy');burstR({r2:62});
   kf(tl,S,[[14,Object.assign({rotation:-4},SQ(1.09)),'back.out(1.6)'],[84,Object.assign({rotation:-4},SQ(1.09)),'none'],[100,Object.assign({rotation:0},SQ(1)),'sine.inOut']]);
   kf(tl,BR,[[8,{y:7},'sine.out'],[16,{y:0},'sine.in'],[24,{y:7},'sine.out'],[32,{y:0},'sine.in']],34);
   arms(tl,[[14,8,'back.out(2)'],[84,8,'none'],[100,0]],0);legs(tl,[[14,{sp:8,sy:1.06},'back.out(1.6)'],[84,{sp:8,sy:1.06},'none'],[100,{sp:0,sy:1}]],0);
   tl.call(()=>pose('base',.4),null,90/60);tl.to({},{duration:.3},100/60);}},
 hungry:{g:'emo',l:'배고픔',sit:'허기가 드러날 때 · 더 알고 싶은 게 생겼을 때',mo:'배가 꼬르륵하듯 몸이 쪼그라들며 부르르 떨리고, 팔이 배 쪽으로 처지고 눈이 반쯤 감깁니다. 잠시 뒤 무언가를 찾은 듯 눈이 반짝 커지며 몸을 펴고 한 번 뜁니다.',ui:'질문을 기다릴 때 · 더 보기 유도',
  run(){const tl=T({onComplete:toIdle});face('rest','vec',{lid:.35});look(0,.7);
   kf(tl,S,[[18,SQ(.9),'power2.out'],[26,SQ(.93),'sine.inOut'],[34,SQ(.89),'sine.inOut'],[44,SQ(.92),'sine.inOut'],[80,SQ(.9),'sine.inOut'],[88,SQ(1.06),'back.out(2)']]);
   shake(tl,LK,'x',18,5,8,3,.85);tl.call(()=>rumble(560,246),null,18/60);shake(tl,LK,'x',56,4,6,3,.85);tl.call(()=>rumble(566,240),null,56/60);
   arms(tl,[[18,-20,'power2.out'],[82,-22,'none'],[90,0,'power2.out']],0);legs(tl,[[18,{sp:-5,sy:.95}],[82,{sp:-5,sy:.95},'none'],[90,{sp:0,sy:1}]],0);
   tl.call(()=>{face('up','wow');lookMouse();star4(586,206,30);},null,84/60);const e=hop(tl,92,46,0,{arms:.6});tl.call(()=>pose('base',.5),null,e/60);tl.to({},{duration:.3},e/60);}},
 flutter:{g:'emo',l:'설렘',sit:'기다리던 질문 · 좋아하는 이야기가 나올 때',mo:'눈웃음을 지으며 몸을 좌우로 박자 있게 흔들고, 발뒤꿈치를 번갈아 들며 통통 들썩입니다. 머리 옆에 분홍 하트가 두근두근 뜁니다.',ui:'관심 주제 질문 · 다시 찾아온 방문자',
  run(){const tl=T({onComplete:toIdle});face('base','happy');later(()=>heartBeat(588,214,58,3),150);
   for(let i=0;i<4;i++){kf(tl,S,[[12,Object.assign({rotation:i%2?-6:6},SQ(1.04)),'sine.out'],[24,Object.assign({rotation:0},SQ(.98)),'sine.in']],i*24);
    kf(tl,H,[[12,{y:-10},'sine.out'],[24,{y:0},'sine.in']],i*24);legs(tl,[[12,{y:-8,sy:1.08},'sine.out'],[24,{y:0,sy:1},'sine.in']],i*24,i%2?'R':'L');}
   arms(tl,flapFr(8,12,10,8),0);kf(tl,S,[[6,SQ(1)]],96);tl.to({},{duration:.4},104/60);}},
 nervous:{g:'emo',l:'긴장',sit:'중요한 질문 · 평가받는 느낌이 들 때',mo:'눈동자가 작아지며 좌우를 힐끗거리고, 팔을 몸에 붙이고 무릎을 모은 채 다리가 달달 떨립니다. 머리 옆으로 땀이 한 방울 흐릅니다.',ui:'면접형 질문 · 어려운 질문 직후',
  run(){const tl=T({onComplete:toIdle});face('rest','vec',{pr:.62});look(-.8,0);
   tl.call(()=>look(.8,0),null,.45).call(()=>look(-.8,0),null,.9).call(()=>look(0,.2),null,1.4);later(()=>sweat(560,236),700);
   kf(tl,S,[[12,SQ(.95),'power2.out'],[110,SQ(.95),'none'],[124,SQ(1),'sine.inOut']]);shake(tl,LK,'x',0,2.5,28,4,.99);
   arms(tl,[[12,-16,'power2.out'],[110,-16,'none'],[124,0]],0);
   const lf=[];for(let i=0;i<14;i++)lf.push([8+i*7,{sp:i%2?-9:-5,y:i%2?-2:0},'sine.inOut']);lf.push([124,{sp:0,y:0}]);legs(tl,lf,0);
   tl.call(()=>gsap.to(E,{pr:1,duration:.2}),null,112/60);tl.to({},{duration:.3},124/60);}},
 panic:{g:'emo',l:'당황',sit:'실수했거나 예상 못 한 일에 허둥댈 때',mo:'눈이 휘둥그레지며 양팔을 번갈아 마구 휘젓고, 제자리에서 발을 동동 구르며 몸이 좌우로 흔들립니다. 땀방울이 연달아 튑니다.',ui:'잘못 연결된 링크 · 실수 사과 직전',
  run(){const tl=T({onComplete:toIdle});face('up','surprised',{pd:.15});
   arms(tl,flapFr(12,6,34,10),0,'L');arms(tl,flapFr(12,6,34,10),3,'R');shake(tl,S,'rotation',0,6,12,7,.93);
   for(let i=0;i<10;i++)legs(tl,[[4,{y:-18},'power2.out'],[8,{y:0},'power2.in']],i*8,i%2?'R':'L');
   [0,320,640].forEach((ms,i)=>later(()=>sweat(552+i*12,230+i*8),ms));tl.call(()=>pose('base',.4),null,84/60);tl.to({},{duration:.4},90/60);}},
 sulky:{g:'emo',l:'삐짐',sit:'놀림을 받았거나 장난이 길어질 때',mo:'흥 하고 김을 내뿜으며 몸을 한쪽으로 기울이고, 눈을 반쯤 감고 딴 데를 봅니다. 팔은 아래로 붙이고 발끝으로 바닥을 톡톡 칩니다. 한 번 힐끗 돌아봤다가 다시 고개를 돌립니다.',ui:'연타 뒤 · 장난 반응',
  run(){const tl=T({onComplete:toIdle});face('rest','vec',{lid:.45});look(-.95,-.1);puff(556,250);
   kf(tl,S,[[14,{rotation:-6},'back.out(1.6)'],[150,{rotation:-6},'none'],[166,{rotation:0},'sine.inOut']]);
   arms(tl,[[10,-14,'power2.out'],[150,-14,'none'],[166,0]],0);
   for(let i=0;i<5;i++)legs(tl,[[6,{y:-10,sp:-4},'power2.out'],[11,{y:0,sp:0},'power2.in']],20+i*18,'R');
   tl.call(()=>look(.7,0),null,100/60).call(()=>{look(-.95,-.1);puff(556,250);},null,124/60);tl.to({},{duration:.3},166/60);}},
 relieved:{g:'emo',l:'안도',sit:'걱정하던 일이 잘 풀렸을 때',mo:'눈을 꼭 감고 숨을 크게 들이마시듯 몸이 부풀었다가, 후 하고 내쉬며 몸과 팔다리가 축 늘어지고 김이 퍼집니다. 그리고 눈웃음을 짓습니다.',ui:'오류가 풀린 뒤 · 다시 연결됐을 때',
  run(){const tl=T({onComplete:toIdle});face('base','closed');
   kf(tl,S,[[40,SQ(1.1),'sine.inOut'],[52,SQ(1.1),'none'],[80,SQ(.88),'power2.out'],[110,SQ(.92),'sine.inOut'],[130,SQ(1),'sine.inOut']]);
   arms(tl,[[40,24,'sine.inOut'],[52,24,'none'],[80,-26,'power2.out'],[110,-20,'sine.inOut'],[130,0,'sine.inOut']],0);
   legs(tl,[[40,{sy:1.06}],[52,{sy:1.06},'none'],[80,{sp:10,sy:.92},'power2.out'],[130,{sp:0,sy:1},'sine.inOut']],0);
   tl.call(()=>puff(556,248),null,54/60).call(()=>eyes('happy'),null,96/60);tl.to({},{duration:.5},130/60);}},

 walkR:{g:'act',l:'오른쪽으로 걷기',sit:'버튼 · 안내 위치로 이동할 때',mo:'눈은 가는 쪽을 보며 발을 번갈아 내딛고, 팔을 흔들며 통통 튀어 이동합니다.',ui:'연락하기 같은 버튼 근처로 이동',
  run(){const tl=T({onComplete:toIdle});face('base','vec');look(.9,.2);let b=0;for(let i=0;i<3;i++)b=hop(tl,b,26,48,{step:i%2?'R':'L',arms:.5})-18;tl.to({},{duration:.5},(b+20)/60);}},
 walkL:{g:'act',l:'왼쪽으로 걷기',sit:'버튼 · 안내 위치로 이동할 때',mo:'눈은 가는 쪽을 보며 발을 번갈아 내딛고, 팔을 흔들며 통통 튀어 이동합니다.',ui:'콘텐츠 옆으로 비켜줄 때',
  run(){const tl=T({onComplete:toIdle});face('base','vec');look(-.9,.2);let b=0;for(let i=0;i<3;i++)b=hop(tl,b,26,-48,{step:i%2?'L':'R',arms:.5})-18;tl.to({},{duration:.5},(b+20)/60);}},
 jump:{g:'act',l:'점프',sit:'주의를 끌고 싶을 때',mo:'웅크리며 팔을 뒤로 젖혔다가 팔을 번쩍 들며 높이 뛰고, 다리를 벌려 눌리며 착지합니다.',ui:'놓친 알림 · 시선 끌기',
  run(){const tl=T({onComplete:toIdle});face('base','hop');hop(tl,0,120,0,{arms:1.8});tl.to({},{duration:.3},1.5);}},
 wave:{g:'act',l:'팔 흔들기',sit:'인사 · 작별',mo:'한쪽 팔을 높이 들어 좌우로 흔들고 몸도 같이 살짝 흔듭니다.',ui:'처음 인사 · 대화 종료',
  run(){const tl=T({onComplete:toIdle});face('wave','vec');burstL();arms(tl,flapFr(9,10,20),8,'R');shake(tl,S,'rotation',0,5,8,11,.85);tl.call(()=>pose('base',.5),null,2.2);tl.to({},{duration:.8},2.3);}},
 sit:{g:'act',l:'앉아 쉬기',sit:'대화가 끝나고 기다릴 때',mo:'털썩 주저앉아 다리를 양옆으로 쭉 벌리고, 팔을 내려놓은 채 천천히 숨 쉽니다.',ui:'대화가 끝난 뒤 · 최소화 전',
  run(){const tl=T();face('sit','vec');kf(tl,S,[[6,SQ(.9),'power2.out'],[40,SQ(1),SPR]]);tl.to(S,Object.assign({duration:1.7,yoyo:true,repeat:-1,ease:'sine.inOut',overwrite:false},SQ(1.03)),.8);}},
 squish:{g:'act',l:'납작해지기',sit:'눌리거나 지쳤을 때',mo:'위에서 눌린 듯 납작해지며 팔다리가 옆으로 쫙 퍼졌다가, 탱 하고 튀어 오르며 제자리로 돌아옵니다.',ui:'버튼 눌림 · 닫을 때',
  run(){const tl=T({onComplete:toIdle});face('base','squint');kf(tl,S,[[5,SQ(.58),'power3.out'],[40,SQ(.6),'none'],[46,SQ(1.18),'power2.out'],[56,SQ(.96),'sine.inOut'],[78,SQ(1),SPR]]);
   arms(tl,[[7,20,'power3.out'],[13,10],[21,20],[29,10],[37,18],[40,14],[46,-8,'power2.out'],[56,8,'sine.inOut'],[78,0,SPR]],0);legs(tl,[[5,{sp:28,sy:.88},'power3.out'],[14,{sp:25,sy:.9}],[23,{sp:28,sy:.88}],[32,{sp:25,sy:.9}],[40,{sp:26,sy:.9}],[46,{sp:-3,sy:1.2},'power2.out'],[56,{sp:2,sy:.96},'sine.inOut'],[78,{sp:0,sy:1},SPR]],0);
   tl.call(()=>eyes('vec',.1),null,45/60);tl.to({},{duration:.4},90/60);}},
 stretch:{g:'act',l:'늘어나기',sit:'잡아당겼을 때',mo:'양팔을 위로 쭉 뻗으며 길게 늘어나 떨리고, 다리는 아래로 늘어집니다. 놓으면 팔다리가 확 접히며 용수철처럼 돌아옵니다.',ui:'끌어올리기',
  run(){const tl=T({onComplete:toIdle});face('up','vec',{pr:.6});kf(tl,S,[[18,SQ(1.18),'power2.out'],[110,SQ(1.18),'none'],[116,SQ(.84),'power3.out'],[124,SQ(1.08),'power2.out'],[134,SQ(.98),'sine.inOut'],[150,SQ(1),SPR]]);
   arms(tl,[[18,28,'power2.out'],[30,8],[46,28],[62,8],[78,28],[94,8],[110,20],[116,-60,'power3.out'],[124,6,'power2.out'],[134,-4],[150,0,SPR]],0);legs(tl,[[18,{sp:6,sy:1.25},'power2.out'],[40,{sp:3,sy:1.22}],[64,{sp:7,sy:1.26}],[88,{sp:3,sy:1.22}],[110,{sp:6,sy:1.25}],[116,{sp:20,sy:.85},'power3.out'],[124,{sp:-2,sy:1.1}],[150,{sp:0,sy:1},SPR]],0);
   shake(tl,LK,'x',18,3,10,3,.97);tl.call(()=>{pose('base',.2);face('base','vec');},null,115/60);tl.to({},{duration:.4},160/60);}},

 secProject:{g:'site',emo:'wow',l:'프로젝트 구역 도착',sit:'스크롤해서 프로젝트 소개에 닿았을 때',mo:'눈이 반짝이며 양팔을 펴 떨고 몸을 들썩이며 별을 날립니다.',ui:'스크롤 위치 기준',
  run(){M.wow.run();state='secProject';}},
 secResume:{g:'site',l:'이력 · 자소서 구역 도착',sit:'스크롤해서 이력 · 자기소개에 닿았을 때',mo:'위를 보며 고개를 기울이고, 한쪽 팔을 들어 올려 곰곰이 생각하는 모습입니다.',ui:'스크롤 위치 기준',
  run(){const tl=T({onComplete:toIdle});face('think','vec');look(.45,-.9);kf(tl,S,[[28,{rotation:4},'back.out(2)'],[56,{rotation:-3},'sine.inOut'],[84,{rotation:3},'sine.inOut'],[110,{rotation:-3},'sine.inOut'],[130,{rotation:0},'sine.out']]);arms(tl,flapFr(8,12,7),10,'R');tl.call(()=>pose('base',.5),null,2.1);}},
 secContact:{g:'site',l:'연락처 구역 도착',sit:'스크롤해서 연락하기에 닿았을 때',mo:'버튼 쪽으로 걸어가 한쪽 팔을 쭉 뻗어 가리키고 버튼이 두근두근 커집니다.',ui:'연락하기 버튼 근처',
  run(){const tl=T();face('base','vec');look(.9,.3);const e=hop(tl,0,26,90,{step:'R',arms:.4});tl.call(()=>{pose('point',.4);CTA.classList.remove('pulse');void CTA.offsetWidth;CTA.classList.add('pulse');say('궁금한 건 여기로 물어봐 주세요');},null,(e-16)/60);
   arms(tl,flapFr(6,14,6),e,'R');tl.call(()=>{pose('base',.5);look(-.9,.2);},null,(e+180)/60);const r1=hop(tl,e+200,20,-45,{step:'L',arms:.4});const r2=hop(tl,r1-18,20,-45,{step:'R',arms:.4});tl.call(()=>go('idle',1),null,(r2+12)/60);}},
 copyOk:{g:'site',emo:'cheer',l:'복사 · 전송 완료',sit:'연락처를 복사했거나 메시지를 보냈을 때',mo:'양팔을 번쩍 들고 눈이 반짝이며 별과 함께 크게 두 번 뜁니다.',ui:'복사 성공 알림 자리',
  run(){M.cheer.run();say('복사했어요!');later(()=>say(''),1700);}},
 ctaNudge:{g:'site',l:'버튼 눈여겨보기',sit:'오래 머물렀는데 연락하기를 누르지 않았을 때',mo:'버튼 쪽을 보며 한쪽 팔을 뻗어 가리키고, 세 번 살짝 부릅니다.',ui:'60초 머문 뒤 한 번만',
  run(){const tl=T({onComplete:toIdle});face('point','vec');look(.9,.3);CTA.classList.remove('pulse');void CTA.offsetWidth;CTA.classList.add('pulse');for(let i=0;i<3;i++){kf(tl,S,[[8,Object.assign({rotation:6},SQ(1.04)),'sine.out'],[16,Object.assign({rotation:0},SQ(1)),'sine.in']],i*36);}arms(tl,flapFr(6,16,6),0,'R');tl.call(()=>pose('base',.5),null,1.8);tl.to({},{duration:.6},110/60);}},

 /* ---- 2026-11-13 감정마다 짝이 되는 상태 하나씩 (HPP3 임의 지정, 사용자 "임의적으로 지정해서 만들어") ----
    sec = 상태 탭 안의 묶음 이름, emo = 이 상태에서 나오는 감정. 동작은 짝 감정을 그대로 씀.
    신남 = 상황 탭 '복사 · 전송 완료', 눈 반짝 = 상황 탭 '프로젝트 구역 도착'이 이미 짝 */
 answerDone:PS_('대답이 끝난 뒤','대답을 잘 마침','질문에 끝까지 답하고 방문자가 이해했다고 할 때','happy','대답 말풍선이 끝난 직후'),
 showResult:PS_('대답이 끝난 뒤','성과 설명','프로젝트 결과 · 수치 · 배운 점을 설명할 때','proud','프로젝트 결과 카드를 보여 줄 때'),
 refuse:PS_('대답이 끝난 뒤','답할 수 없는 질문','개인정보처럼 답하지 않기로 한 질문을 정중히 거절할 때','sad','거절 안내 말풍선'),
 privateQ:PS_('대답이 끝난 뒤','사적인 질문','연애 · 외모처럼 사적인 질문을 가볍게 넘길 때','shy','가볍게 넘기는 대답'),
 longPraise:PS_('방문자의 말에 반응','긴 칭찬 · 응원','진심이 담긴 긴 칭찬이나 응원 메시지를 받았을 때(짧은 칭찬은 칭찬받음)','moved','칭찬이 두 문장 이상일 때'),
 interviewQ:PS_('방문자의 말에 반응','면접형 질문','약점 · 단점 · 실패 경험처럼 평가하는 질문을 받았을 때','nervous','대답을 시작하기 직전'),
 corrected:PS_('방문자의 말에 반응','잘못 답했다는 지적','방문자가 허기의 대답이 틀렸다고 알려 줄 때','panic','정정하는 대답 직전'),
 teased:PS_('방문자의 말에 반응','놀리는 말 반복','장난 · 놀리는 말이 두 번 넘게 이어질 때','sulky','장난 질문 응대'),
 vagueQ:PS_('방문자의 말에 반응','애매한 질문','무엇을 묻는지 흐린 질문이라 되물어야 할 때','doubt','되묻는 말풍선 직전'),
 goodbye:PS_('방문자의 말에 반응','마무리 인사','방문자가 고맙다 · 잘 봤다며 대화를 마칠 때','wink','대화 종료 인사'),
 revisit:PS_('흐름 · 연결','다시 찾아온 방문자','예전에 들렀던 방문자가 다시 왔을 때 첫인사','flutter','재방문 첫 화면(처음 인사 대신)'),
 nudge:PS_('흐름 · 연결','대화가 멈춤','대답 뒤 한동안 다음 질문이 없어 더 물어보라고 권할 때','hungry','대답 뒤 20초 정도 입력이 없을 때'),
 reconnect:PS_('흐름 · 연결','다시 연결됨','오류가 난 뒤 다시 대답을 받아 왔을 때','relieved','오류 배지가 사라지는 순간'),
 longIdle:PS_('흐름 · 연결','오래 기다림','방문자가 아무것도 하지 않고 오래 머물 때','sleepy','25초 이상 입력 · 움직임 없음'),
 tapSpam:PS_('화면을 만질 때','같은 곳 연타','허기를 짧은 시간에 여러 번 눌렀을 때','angry','허기를 연달아 누를 때'),
 shaken:PS_('화면을 만질 때','빙글빙글 흔들기','허기를 잡고 크게 흔들거나 던졌을 때','dizzy','잡고 흔든 뒤 놓을 때')
};
/* 짝 상태의 동작 설명은 짝 감정 설명을 그대로 씀 */
Object.keys(M).forEach(k=>{const m=M[k];if(m.emo&&!m.mo)m.mo=M[m.emo].l+' 감정 — '+M[m.emo].mo;});
function PS_(sec,l,sit,emo,ui){return{g:'ai',sec,l,sit,emo,ui,run(){M[emo].run();}};}
function pairOf(k){const m=M[k];if(m.emo)return{t:'짝 감정',l:M[m.emo].l};const s=Object.keys(M).find(j=>M[j].emo===k);return s?{t:'나오는 상태',l:M[s].l}:null;}

function go(k,quiet){
  if(drag||phys.on)return;
  rest(quiet);state=k;
  if(!quiet)showInfo(k);
  M[k].run();
}
function showInfo(k){}

/* ================= 매 프레임 갱신: 눈동자 · 몸 기울임 · 그림자 ================= */
/* 그림자: 몸이 바닥에서 얼마나 떴는지(높이)에 따라 진하기 · 크기를 정함. 닿아 있을 때만 또렷하고, 몸이 눌리면 옆으로 넓어짐 */
function placeShadow(){
  const w=H.offsetWidth||260,hx=gsap.getProperty(H,'x'),hy=gsap.getProperty(H,'y'),h=Math.max(0,-hy);
  const g=Math.exp(-h/(w*.075));                                   // 땅에 닿음 1 → 몸 높이의 약 1/5만 떠도 거의 사라짐
  const sq=gsap.getProperty(S,'scaleX')||1;                         // 착지 때 몸이 눌려 넓어지면 그림자도 넓어짐
  const sx=sq*(1+(1-g)*.35),sy=1+(1-g)*.25;
  SH.style.transform='translateX('+hx.toFixed(1)+'px) scale('+sx.toFixed(3)+','+sy.toFixed(3)+')';
  SH.style.opacity=g.toFixed(3);
  SH.style.setProperty('--c',Math.exp(-h/3).toFixed(3));          // 바닥에 딱 닿았을 때만 보이는 진한 접촉 그림자
}
/* 잡아 늘리기: 잡고 당기면 몸 전체가 아니라 당기는 쪽 바깥 면만 손 쪽으로 늘어남(반죽 가장자리를 집어 당기듯).
   당기는 방향의 몸 가장자리를 중심으로, 가까울수록 많이 · 멀수록 적게 밀어내는 변위 필터. 놓으면 출렁이며 돌아옴 */
const PS={a:0,v:0,ang:-90,on:false};
/* 사파리 · 모바일에서도 똑같이 보이게 필터를 쓰지 않음. 몸 정수리 가장자리(털 포함)를 잘라 둔 조각을 세로 띠 14개로 나눠 몸 뒤에 숨겨 두고,
   당기면 가운데 띠는 많이 · 바깥 띠는 조금 밀어내 가장자리가 동그랗게 불룩해짐. 당기는 방향에 맞춰 몸 둘레를 따라 돌려 놓음 */
const CAP={n:30,hw:150};
const PCG=(()=>{const g=document.createElementNS(NS,'g');g.style.display='none';const defs=$('#hg-rig defs'),cx=GEO.c[0],cy=GEO.c[1],sw=CAP.hw*2/CAP.n,strips=[];
  for(let i=0;i<CAP.n;i++){const x0=cx-CAP.hw+i*sw,cp=document.createElementNS(NS,'clipPath');cp.id='hg-pc'+i;const r=document.createElementNS(NS,'rect');
    r.setAttribute('x',(x0-.7).toFixed(2));r.setAttribute('y',cy-470);r.setAttribute('width',(sw+1.4).toFixed(2));r.setAttribute('height',410);cp.appendChild(r);defs.appendChild(cp);
    const sg=document.createElementNS(NS,'g');sg.setAttribute('clip-path','url(#hg-pc'+i+')');const inner=document.createElementNS(NS,'g');
    const im=img(HG_BASE+'body_core.png',0,0,760,700);im.style.opacity=1;inner.appendChild(im);sg.appendChild(inner);g.appendChild(sg);
    const t=(x0+sw/2-cx)/CAP.hw;strips.push({el:inner,im,gw:Math.pow(Math.max(0,1-t*t),2)});}   // 넓고 둥근 언덕 모양, 양끝은 0(움직이지 않음)
  const bd=$('#hg-bodies');bd.insertBefore(g,bd.firstChild);return{g,strips};})();
function pullStretch(dt){
  if(RM)return;
  const w=H.offsetWidth||260;let tgt=0;
  if(drag&&drag.rx!=null){
    let dx=drag.rx-pos.x,dy=drag.ry-pos.y;                          // 손이 있는 곳 - 몸이 있는 곳(몸은 손을 조금 늦게 따라옴)
    if(pos.y>-2&&dy>0)dy=0;                                         // 땅에서 아래로 당기면 발이 바닥을 뚫지 않게 세로는 무시
    const d=Math.hypot(dx,dy);
    tgt=46*Math.tanh(d/(w*.3));                                      // 바깥 면이 늘어나는 길이(그림 단위). 탄탄한 떡처럼 조금 버티며 늘어남
    if(d>2){let ta=Math.atan2(dy,dx)*180/Math.PI,da=((ta-PS.ang+540)%360)-180;PS.ang+=da*(1-Math.exp(-dt*3.5));}   // 방향을 바꾸면 불룩한 곳이 몸 둘레를 따라 천천히 옮겨 감
  }
  const W=34,Z=.72,n=Math.ceil(dt/SUB),h=dt/n;for(let i=0;i<n;i++){PS.v+=(-W*W*(PS.a-tgt)-2*Z*W*PS.v)*h;PS.a+=PS.v*h;}   // 단단한 용수철: 출렁임 없이 한 번 살짝 튕기고 바로 돌아옴(1/240초씩 나눠 계산해 프레임이 늦어도 튀지 않음)
  PS.a=Math.max(0,Math.min(52,PS.a));
  if(PS.a<.4&&!drag){if(PS.on){PCG.g.style.display='none';PS.on=false;}return;}
  const la=PS.ang-(gsap.getProperty(S,'rotation')||0),cx=GEO.c[0],cy=GEO.c[1];   // 몸이 기울어 있으면 몸 그림 기준 방향으로
  // 당기는 방향이 위를 향하도록 돌린 틀 안에서 몸 그림을 세로 띠로 나눠 바깥쪽으로 밀어냄. 그림은 거꾸로 돌려 넣어 가만히 있을 땐 몸과 똑같음
  PCG.g.setAttribute('transform','rotate('+(la-270).toFixed(2)+' '+cx+' '+cy+')');
  const back='rotate('+(270-la).toFixed(2)+' '+cx+' '+cy+')';
  PCG.strips.forEach(st=>{st.el.setAttribute('transform','translate(0 '+(-PS.a*st.gw).toFixed(2)+')');st.im.setAttribute('transform',back);});
  if(!PS.on){PCG.g.style.display='';PS.on=true;}
}
/* 용수철 계산 단위: 프레임 간격을 1/240초 이하로 잘게 나눠 계산. 처음 몇 초처럼 프레임이 늦게 와도(30fps 이하) 값이 커지며 몸이 깨지지 않게 */
const SUB=1/240;
let fpsN=0,fpsT=performance.now();
gsap.ticker.add((time,dtms)=>{
  const dt=Math.min(.05,(dtms||16.7)/1000)*gsap.globalTimeline.timeScale();
  let tx=tg.x,ty=tg.y;
  if(gazeMode==='mouse'&&mx!==null){const r=H.getBoundingClientRect();const ex=r.left+r.width*(377/760),ey=r.top+r.height*(357/700);
    const dx=mx-ex,dy=my-ey,d=Math.hypot(dx,dy),m=Math.min(1,Math.max(0,(d-r.width*.06)/(r.width*.7)));tx=d?dx/d*m:0;ty=d?dy/d*m:0;
    tx+=sacc.x;ty+=sacc.y;}
  else if(gazeMode==='orbit'){orbitT+=dt*7.5;tx=Math.cos(orbitT)*.95;ty=Math.sin(orbitT)*.8;}
  else if(gazeMode==='mouse'){tx=sacc.x;ty=sacc.y;}
  const k=1-Math.exp(-dt*(gazeMode==='orbit'?40:16));            // 눈동자는 목표를 향해 부드럽게 따라감
  E.gx+=(tx-E.gx)*k;E.gy+=(ty-E.gy)*k;
  renderEyes();
  gsap.set(EGR,{x:E.gx*4,y:E.gy*3});                              // 표정 그림도 시선 쪽으로 아주 조금 이동(고개를 돌린 느낌)
  if(eyeNow==='vec'&&!drag&&state!=='angry'){gsap.set(LK,{rotation:E.gx*1.6,svgOrigin:FEET});}
  placeShadow();
  followFx();
  pullStretch(dt);
  
  gsap.set(LK,{y:-2.3*Math.abs(gsap.getProperty(S,'rotation'))});   // 몸이 기울면 한쪽 발이 바닥 아래로 내려가므로 그만큼 몸을 올림
  limbSpring(dt);
  physics(dt);
});
if(!RM){gsap.to(BR,{scaleY:1.024,scaleX:.992,duration:1.8,yoyo:true,repeat:-1,ease:'sine.inOut',svgOrigin:FEET,overwrite:false});}
(function sway(){setTimeout(()=>{if(state==='idle'&&!RM&&!drag){gsap.to(S,{rotation:(Math.random()-.5)*2.4,duration:1.2,ease:'sine.inOut',yoyo:true,repeat:1,svgOrigin:FEET});}sway();},4000+Math.random()*3000);})();

/* ================= 만지기: 클릭 · 연타 ================= */
let clicks=0,clickT=null;
function poke(){clicks++;clearTimeout(clickT);clickT=setTimeout(()=>clicks=0,1300);
  if(clicks>=8){clicks=0;go('angry');showInfo('angry');return;}
  if(clicks>=4){go('dizzy');showInfo('dizzy');return;}
  rest();state='poke';const tl=T({onComplete:toIdle});face('base',['happy','wow','happy'][Math.floor(Math.random()*3)]);
  arms(tl,[[4,-10,'power2.out'],[9,46,'power2.out'],[15,14,'sine.inOut'],[36,0,SPR]],0);legs(tl,[[4,{sy:.86},'power2.out'],[9,{sp:10,sy:1.15},'power2.out'],[36,{sp:0,sy:1},SPR]],0);
  kf(tl,S,[[4,SQ(.84),'power2.out'],[9,SQ(1.1),'power2.out'],[14,SQ(.97),'sine.inOut'],[34,SQ(1),SPR]]);burstR({n:2,a0:-60,a1:-30});tl.to({},{duration:.4},50/60);}

/* ================= 만지기: 끌기 · 던지기 ================= */
function bounds(){const w=ST.clientWidth,hw=H.offsetWidth*.5+6;return{minX:-(w/2-hw),maxX:w/2-hw,minY:-(ST.clientHeight-FLOOR+H.offsetWidth*.05-H.offsetHeight*.85)};}
const pos={x:0,y:0,tx:0,ty:0};
H.addEventListener('pointerdown',e=>{if(phys.on)return;e.preventDefault();rest();gsap.killTweensOf(Object.values(LI));gsap.killTweensOf(H);   // 공중(인사 · 점프 중)에서 잡아도 땅으로 내려가던 움직임과 손을 따라가는 움직임이 싸우지 않게state='drag';H.setPointerCapture(e.pointerId);H.classList.add('drag');
  pos.x=pos.tx=gsap.getProperty(H,'x');pos.y=pos.ty=gsap.getProperty(H,'y');
  drag={ox:e.clientX-pos.x,oy:e.clientY-pos.y,lx:e.clientX,ly:e.clientY,t:performance.now(),vx:0,vy:0,moved:0,sx:e.clientX,sy:e.clientY,on:false,rx:pos.x,ry:pos.y,stuck:pos.y>-2};});
H.addEventListener('pointermove',e=>{if(!drag)return;const b=bounds();const now=performance.now(),dt=Math.max(8,now-drag.t);
  pos.tx=Math.max(b.minX,Math.min(b.maxX,e.clientX-drag.ox));pos.ty=Math.max(b.minY,Math.min(0,e.clientY-drag.oy));drag.rx=e.clientX-drag.ox;drag.ry=e.clientY-drag.oy;
  drag.vx=drag.vx*.7+((e.clientX-drag.lx)/dt*1000)*.3;drag.vy=drag.vy*.7+((e.clientY-drag.ly)/dt*1000)*.3;drag.lx=e.clientX;drag.ly=e.clientY;drag.t=now;
  drag.moved=Math.max(drag.moved,Math.hypot(e.clientX-drag.sx,e.clientY-drag.sy));
  if(drag.moved>6&&!drag.on){drag.on=true;face('base','vec',{pr:.6});look(0,-.4);}});
function release(){if(!drag)return;const d=drag;drag=null;H.classList.remove('drag');
  if(d.moved<=6){state='idle';poke();return;}
  phys.on=true;phys.x=pos.x;phys.y=pos.y;phys.vx=Math.max(-1600,Math.min(1600,d.vx));phys.vy=Math.max(-1600,Math.min(1600,d.vy));phys.hit=0;state='fall';face('base','hop');lookMouse();}
H.addEventListener('pointerup',release);H.addEventListener('pointercancel',release);
function dangle(vx,vy,dt){const sp=Math.min(1,Math.hypot(vx,vy)/1800),t=performance.now()/1000,fl=Math.sin(t*18)*10*sp,k=1-Math.exp(-(dt||.016)*14);
  const lg=Math.max(-32,Math.min(32,vx*.02));
  [[LI.aL,10+sp*24+fl,1],[LI.aR,-(10+sp*24-fl),1],[LI.lL,lg+sp*8,1+sp*.12],[LI.lR,lg-sp*8,1+sp*.12]].forEach(([g,r,sy])=>{const cr=gsap.getProperty(g,'rotation'),cs=gsap.getProperty(g,'scaleY');gsap.set(g,{rotation:cr+(r-cr)*k,scaleY:cs+(sy-cs)*k});});}
/* 팔다리 스프링: 정해진 동작(자세 + 키프레임)을 그대로 따라가지 않고 용수철처럼 조금 늦게 따라오며 넘쳤다 가라앉음.
   몸이 움직이는 방향의 반대로 끌리고, 빠르게 움직일 때는 길어지고 끝이 휘어서 딱딱하지 않고 말랑하게 보임 */
const SPK={aL:{th:0,w:0},aR:{th:0,w:0},lL:{th:0,w:0},lR:{th:0,w:0}};
let hPrev=null;
function limbSpring(dt){
  const hx=gsap.getProperty(H,'x'),hy=gsap.getProperty(H,'y');
  let vx=0,vy=0;if(hPrev){vx=(hx-hPrev[0])/dt;vy=(hy-hPrev[1])/dt;}hPrev=[hx,hy];
  vx=Math.max(-2500,Math.min(2500,vx));vy=Math.max(-2500,Math.min(2500,vy));
  const W0=23,Z=.55;
  Object.keys(SPK).forEach(k=>{
    const st=SPK[k],isArm=k[0]==='a';
    const cmd=gsap.getProperty(LO[k],'rotation')+gsap.getProperty(LI[k],'rotation');
    const sgn=(k==='aR'||k==='lR')?-1:1;let drag=isArm?(vx*.0075+sgn*vy*.0042):(vx*.0085+sgn*vy*.0030);      // 몸이 움직이는 반대쪽으로 끌려감(도)
    drag=isArm?Math.max(-18,Math.min(18,drag)):Math.max(-30,Math.min(30,drag));
    const target=cmd+drag;
    const n=Math.ceil(dt/SUB),h=dt/n;for(let i=0;i<n;i++){st.w+=(-W0*W0*(st.th-target)-2*Z*W0*st.w)*h;st.th+=st.w*h;}
    if(Math.abs(st.th-cmd)>40){st.th=cmd+Math.sign(st.th-cmd)*40;st.w*=.5;}
    const sp=Math.min(1,Math.abs(st.w)/320);
    const skc=isArm?9:4,sk=Math.max(-skc,Math.min(skc,(isArm?-1:1)*st.w*.022));
    LS[k].rotation=st.th-cmd;LS[k].scaleY=1+sp*.1;LS[k].skewX=sk;
    placeLimb(k,st.th,sp,sk);
  });
}
/* 각도(도) → 몸 둘레 위치. 왼쪽 팔다리는 +가 바깥 · 위쪽, 오른쪽은 -가 바깥 · 위쪽(이전 동작 값을 그대로 씀) */
const ORB={aL:{k:.5,lo:-26,hi:16,w:8},aR:{k:.5,lo:-26,hi:16,w:8},lL:{k:.4,lo:-12,hi:18,w:14},lR:{k:.4,lo:-12,hi:18,w:14}};
function Rat(a){a=((a%360)+360)%360;const i=Math.floor(a),f=a-i;return GEO.R[i]*(1-f)+GEO.R[(i+1)%360]*f;}
/* 혹의 폭 안에서 몸 가장자리가 가장 안쪽인 곳에 맞춤: 넓은 다리의 한쪽이 몸 밖으로 뜨지 않게 */
function Rmin(a,w){let m=1e9;for(let j=-w;j<=w;j+=2)m=Math.min(m,Rat(a+j));return m;}
function placeLimb(k,th,sp,sk){
  const d=NUB[k],o=ORB[k],sg=(k==='aR'||k==='lR')?-1:1,cx=GEO.c[0],cy=GEO.c[1];
  let a=th*o.k*sg;a=a>0?o.hi*Math.tanh(a/o.hi):-o.lo*Math.tanh(a/-o.lo);const phi=a*sg;   // 몸 둘레를 따라 도는 각도(한계에 가까울수록 부드럽게 덜 감: 팔이 머리 위로 올라가 귀처럼 보이지 않게)
  const t0=d.th,t1=t0+phi,r0=Rat(t0),dr=Rmin(t1,o.w)-Rmin(t0,o.w),rad=Math.PI/180;
  const ax=cx+r0*Math.cos(t0*rad),ay=cy+r0*Math.sin(t0*rad);       // 쉬는 자세에서 혹이 몸에 닿는 점
  const L=LI[k],tx=dr*Math.cos(t1*rad)+L.x,ty=dr*Math.sin(t1*rad)+L.y;
  let sN=L.scaleY*(1+sp*(k[0]==='a'?.05:.1)),sT=L.scaleX*(1-sp*.04);                 // 몸 바깥 방향으로 늘어나고 옆으로 살짝 좁아짐
  if(k[0]==='a')sN*=1+Math.min(.15,Math.max(0,Math.abs(th*o.k)-14)/120);   // 팔: 한계보다 더 들라는 만큼은 위로 가지 않고 바깥으로 길어짐(귀처럼 보이지 않게)
  const bx=Math.pow(gsap.getProperty(S,'scaleX')||1,-.7),by=Math.pow(gsap.getProperty(S,'scaleY')||1,-.7);   // 몸이 눌린 만큼 팔다리는 반대로 펴서 뿔처럼 납작해지지 않게
  LG[k].setAttribute('transform','translate('+tx.toFixed(2)+' '+ty.toFixed(2)+') rotate('+phi.toFixed(2)+' '+cx+' '+cy+') translate('+ax.toFixed(2)+' '+ay.toFixed(2)+') scale('+bx.toFixed(4)+' '+by.toFixed(4)+') rotate('+(t0+sk).toFixed(2)+') scale('+sN.toFixed(4)+' '+sT.toFixed(4)+') rotate('+(-t0)+') translate('+(-ax).toFixed(2)+' '+(-ay).toFixed(2)+')');
}
function physics(dt){
  if(drag&&drag.on){                       // 끌고 있는 동안: 손을 따라 천천히 쫓아오고, 속도만큼 길어지며 기운다
    if(drag.stuck&&Math.hypot(drag.rx-pos.x,drag.ry-pos.y)>H.offsetWidth*.22)drag.stuck=false;   // 땅에서 잡아 당기면 발이 잠깐 붙어 있다가 충분히 늘어나면 톡 떨어짐
    if(!drag.stuck){const k=1-Math.exp(-dt*13);pos.x+=(pos.tx-pos.x)*k;pos.y+=(pos.ty-pos.y)*k;gsap.set(H,{x:pos.x,y:pos.y});}
    const sp=Math.min(1,Math.hypot(drag.vx,drag.vy)/1800);
    gsap.set(S,Object.assign({rotation:Math.max(-14,Math.min(14,drag.vx*.011)),svgOrigin:FEET},SQ(1+sp*.06)));
    dangle(drag.vx,drag.vy,dt);drag.vx*=.92;drag.vy*=.92;return;}
  if(!phys.on)return;
  dangle(phys.vx,phys.vy*.5,dt);const b=bounds();phys.vy+=2600*dt;phys.x+=phys.vx*dt;phys.y+=phys.vy*dt;
  if(phys.x<b.minX||phys.x>b.maxX){phys.x=Math.max(b.minX,Math.min(b.maxX,phys.x));if(Math.abs(phys.vx)>260){const sg=phys.vx>0?1:-1;phys.vx*=-.55;if(!phys.hit){phys.hit=1;eyes('surprised',.06);burst(sg>0?640:120,330,{n:3,a0:sg>0?-30:-150,a1:sg>0?30:-210,r1:50,r2:90});
      gsap.fromTo(S,{scaleX:1,scaleY:1,rotation:0},{scaleX:.88,scaleY:1.1,rotation:-sg*4,duration:.08,yoyo:true,repeat:1,svgOrigin:FEET});}}else phys.vx=0;}
  if(phys.y>=0){phys.y=0;if(phys.vy>650){phys.vy=-phys.vy*.3;phys.vx*=.7;eyes('squint',.04);dust(380,650);
      gsap.timeline().to(S,Object.assign({duration:3/60,ease:'power3.out',svgOrigin:FEET},SQ(.72))).to(S,Object.assign({duration:34/60,ease:SPR},SQ(1)));
      [LI.aL,LI.aR].forEach((g,i)=>gsap.timeline().to(g,{rotation:(i?-1:1)*60,duration:3/60,ease:'power3.out',overwrite:true}).to(g,{rotation:0,duration:34/60,ease:SPR}));[LI.lL,LI.lR].forEach((g,i)=>gsap.timeline().to(g,{rotation:(i?-1:1)*26,scaleY:.88,duration:3/60,ease:'power3.out',overwrite:true}).to(g,{rotation:0,scaleY:1,duration:34/60,ease:SPR}));}
    else{phys.on=false;phys.vy=0;gsap.set(H,{x:phys.x,y:0});landed();return;}}
  if(phys.y<b.minY){phys.y=b.minY;phys.vy=Math.abs(phys.vy)*.3;}
  gsap.set(H,{x:phys.x,y:phys.y});
}
function landed(){state='land';rest();state='land';const tl=T({onComplete:toIdle});face('base','squint');dust(380,650);
  kf(tl,S,[[4,SQ(.7),'power3.out'],[26,SQ(.72),'none'],[34,SQ(1.1),'power2.out'],[42,SQ(.97),'sine.inOut'],[64,SQ(1),SPR]]);
  arms(tl,[[4,22,'power3.out'],[12,19],[20,22],[26,20],[34,-8,'power2.out'],[44,8,'sine.inOut'],[66,0,SPR]],0);legs(tl,[[4,{sp:28,sy:.88},'power3.out'],[15,{sp:25,sy:.9}],[26,{sp:26,sy:.9}],[34,{sp:-3,sy:1.16},'power2.out'],[44,{sp:2,sy:.97},'sine.inOut'],[66,{sp:0,sy:1},SPR]],0);
  tl.call(()=>eyes('surprised',.08),null,34/60).call(()=>eyes('vec',.14),null,62/60);hop(tl,76,30,0);tl.call(()=>eyes('happy',.1),null,100/60).to({},{duration:.5},150/60);}

/* ================= 졸기 · 깨기 ================= */
let idleT=null;function touch(){clearTimeout(idleT);if(RM)return;idleT=setTimeout(()=>{if(state==='idle'&&!drag){go('sleepy');}},25000);}
function wake(){rest();state='wake';const tl=T({onComplete:toIdle});face('base','surprised');gsap.to(E,{lid:0,duration:.1});burstR();kf(tl,S,[[3,SQ(.9),'power2.out']]);hop(tl,4,70,0,{arms:1.2});tl.to({},{duration:.3},80/60);}
touch();

/* ================= v9 연결: 크기 · 상태 API ================= */
function setSize(v){H.style.setProperty('--w',v+'px');SH.style.setProperty('--w',v+'px');}
function fitSize(){const v=parseFloat(getComputedStyle(ROOT).getPropertyValue('--hg-w'))||96;setSize(v);}
fitSize();window.addEventListener('resize',fitSize);
const IN=document.getElementById('ask-input');let typingT=null;
function nod(){if(state==='listening')wavePulse(-1,BLUE);gsap.fromTo(BR,{y:0},{y:H.offsetHeight*.012*2,duration:.07,yoyo:true,repeat:1,ease:'sine.inOut',overwrite:false});}
const KEEP=/^(listening|thinking|speaking|error|loading)$/;   // 이어지는 상태는 같은 이름이 다시 와도 처음부터 다시 하지 않음
window.HUGI={
  set(k){if(!M[k])return;if(k===state&&(k==='idle'||KEEP.test(k)))return;go(k);},
  typing(){touch();if(/^(thinking|speaking)$/.test(state))return;
    if(state!=='listening')go('listening');else nod();
    clearTimeout(typingT);typingT=setTimeout(()=>{if(state==='listening'&&!(IN&&IN.value.trim()))go('idle');},3000);},
  get state(){return state;}
};
/* 화면 밖에 있으면 매 프레임 계산을 쉬게 함 */
if('IntersectionObserver' in window){new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)gsap.ticker.wake();else gsap.ticker.sleep();});}).observe(ST);}
function START(){let seen=false;try{seen=sessionStorage.getItem('hg-hello')==='1';sessionStorage.setItem('hg-hello','1');}catch(e){}
  if(seen||RM)go('idle',1);else go('hello');}
window.__hugiRig={LO,LI,LS,LG,PG,S,PS,pose,gsap,placeLimb,go,M,showEye,get state(){return state;}};
/* ================= 시작 ================= */
gsap.set([S,LK,AC,BR,PG],{svgOrigin:FEET});gsap.set(EGR,{svgOrigin:'377 357'});
/* 시작 준비: 쓰는 그림을 모두 미리 풀어(decode) 두고, 눈 표정 12장과 늘리기 조각을 아주 옅게 3프레임 그려 둔 뒤 인사를 시작.
   처음 표정이 바뀌거나 처음 잡아당길 때 그림을 그제야 풀면서 멈칫하던 것을 없앰 */
function warm(){const pe=Object.values(PEL);pe.forEach(el=>gsap.set(el,{opacity:.01}));PCG.g.style.display='';
  return new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{pe.forEach(el=>{if(el!==PEL[eyeNow])gsap.set(el,{opacity:0});});if(!PS.on)PCG.g.style.display='none';r();}))));}
const PRE=[...new Set([...$('#hg-rig').querySelectorAll('image')].map(e=>e.getAttribute('href')))];
Promise.all(PRE.map(src=>{const i=new Image();i.src=src;return(i.decode?i.decode():new Promise(r=>{i.onload=i.onerror=r;})).catch(()=>{});})).then(warm).then(()=>setTimeout(START,300));
})();
