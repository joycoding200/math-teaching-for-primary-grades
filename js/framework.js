/* ====== 核心框架：元数据、进度管理、导航、共享工具 ====== */

// ── 25 个游戏元数据 ──
var TOPICS = [
  // 一年级：直观感知与简单规律
  {id:'pattern',icon:'🔮',name:'找规律',cat:'一年级',g:'pattern'},
  {id:'countshape',icon:'🔷',name:'数图形',cat:'一年级',g:'countshape'},
  {id:'balance',icon:'🎯',name:'移多补少',cat:'一年级',g:'balance'},
  {id:'simplelogic',icon:'🔍',name:'简单推理',cat:'一年级',g:'simplelogic'},
  {id:'queue',icon:'👫',name:'排队问题',cat:'一年级',g:'queue'},
  // 二年级：等量关系与基础应用
  {id:'substitution',icon:'⚖️',name:'等量代换',cat:'二年级',g:'substitution'},
  {id:'cycle',icon:'🔁',name:'周期问题',cat:'二年级',g:'cycle'},
  {id:'tree',icon:'🌳',name:'植树问题',cat:'二年级',g:'tree'},
  {id:'normalization',icon:'🧮',name:'归一问题',cat:'二年级',g:'normalization'},
  {id:'sumdiff',icon:'📐',name:'和差问题',cat:'二年级',g:'sumdiff'},
  // 三年级：倍数关系与逆向思维
  {id:'summulti',icon:'📏',name:'和倍问题',cat:'三年级',g:'summulti'},
  {id:'diffmulti',icon:'📊',name:'差倍问题',cat:'三年级',g:'diffmulti'},
  {id:'age',icon:'👴',name:'年龄问题',cat:'三年级',g:'age'},
  {id:'profitloss',icon:'📦',name:'盈亏问题',cat:'三年级',g:'profitloss'},
  {id:'reverse',icon:'↩️',name:'还原问题',cat:'三年级',g:'reverse'},
  {id:'average',icon:'📈',name:'平均数',cat:'三年级',g:'average'},
  // 四年级：经典模型与原理
  {id:'chickenrabbit',icon:'🐔',name:'鸡兔同笼',cat:'四年级',g:'chickenrabbit'},
  {id:'venn',icon:'🔴',name:'容斥原理',cat:'四年级',g:'venn'},
  {id:'pigeonhole',icon:'🗄️',name:'抽屉原理',cat:'四年级',g:'pigeonhole'},
  {id:'logic',icon:'🧩',name:'逻辑推理',cat:'四年级',g:'logic'},
  {id:'meeting',icon:'🏃',name:'相遇问题',cat:'四年级',g:'meeting'},
  {id:'chase',icon:'💨',name:'追及问题',cat:'四年级',g:'chase'},
  // 五年级：综合应用与抽象建模
  {id:'boatcurrent',icon:'⛵',name:'流水行船',cat:'五年级',g:'boatcurrent'},
  {id:'work',icon:'🔧',name:'工程问题',cat:'五年级',g:'work'},
  {id:'cowgrass',icon:'🐄',name:'牛吃草',cat:'五年级',g:'cowgrass'}
];

// ── 全局状态 ──
var GAMES = {};
var currentGame = null;
var gameStage = 1;
var gameState = {};

// ── 进度持久化 ──
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem('mathgames')||'{}'); }catch(e){ return {}; }
}
function saveProgress(p){ localStorage.setItem('mathgames',JSON.stringify(p)); }
function getStars(gameId){ var p=loadProgress(); return p[gameId]||0; }
function setStars(gameId,stars){
  var p=loadProgress();
  p[gameId]=Math.max(p[gameId]||0,stars);
  saveProgress(p);
  updateStarTotal();
}
function updateStarTotal(){
  var p=loadProgress(), t=0;
  Object.values(p).forEach(function(v){ t+=v; });
  document.getElementById('starTotal').textContent='⭐ '+t;
}

// ── 菜单渲染 ──
var GRADES = {
  '一年级':{emoji:'🌱',desc:'直观感知·简单规律',color:'#ff6b6b'},
  '二年级':{emoji:'🌿',desc:'等量关系·基础应用',color:'#4ecdc4'},
  '三年级':{emoji:'🌳',desc:'倍数关系·逆向思维',color:'#feca57'},
  '四年级':{emoji:'🌲',desc:'经典模型·原理入门',color:'#a29bfe'},
  '五年级':{emoji:'🏆',desc:'综合应用·抽象建模',color:'#fd79a8'}
};

function renderMenu(){
  var cats=[];
  TOPICS.forEach(function(t){
    if(cats.indexOf(t.cat)===-1) cats.push(t.cat);
  });
  var h='';
  cats.forEach(function(cat){
    var g=GRADES[cat]||{emoji:'📚',desc:'',color:'#636e72'};
    h+='<div class="section-title"><span style="font-size:24px">'+g.emoji+'</span> <span style="color:'+g.color+'">'+cat+'</span><span style="font-size:11px;color:#adb5bd;margin-left:8px">'+g.desc+'</span></div><div class="topic-grid">';
    TOPICS.filter(function(t){return t.cat===cat;}).forEach(function(t){
      var s=getStars(t.id);
      h+='<div class="topic-card" onclick="openGame(\''+t.id+'\')">';
      h+='<span class="icon">'+t.icon+'</span>';
      h+='<span class="name">'+t.name+'</span>';
      h+='<div class="stars">'+'⭐'.repeat(s)+'☆'.repeat(3-s)+'</div>';
      if(s>=3) h+='<span class="badge" style="background:#00b894">✓</span>';
      h+='</div>';
    });
    h+='</div>';
  });
  document.getElementById('menuView').innerHTML=h;
}

// ── 导航 ──
function goMenu(){
  document.getElementById('menuView').style.display='block';
  document.getElementById('gameView').classList.remove('active');
  document.getElementById('backBtn').classList.remove('show');
  document.getElementById('topTitle').textContent='🧮 数学思维小课堂';
  currentGame=null;
  renderMenu();
}

function openGame(gameId){
  currentGame=gameId;
  gameStage=1;
  gameState={};
  document.getElementById('menuView').style.display='none';
  document.getElementById('gameView').classList.add('active');
  document.getElementById('backBtn').classList.add('show');
  var t=TOPICS.find(function(x){return x.id===gameId;});
  document.getElementById('topTitle').textContent=t.icon+' '+t.name;
  document.getElementById('gameTitle').textContent=t.name;
  document.getElementById('gameDesc').textContent=t.cat+' · 小学奥数思维训练';
  document.querySelectorAll('#stageTabs .stage-tab').forEach(function(b,i){
    b.classList.toggle('active',i===0);
  });
  renderGameStage();
}

function switchStage(stage){
  gameStage=stage;
  document.querySelectorAll('#stageTabs .stage-tab').forEach(function(b,i){
    b.classList.toggle('active',i+1===stage);
  });
  renderGameStage();
}

function renderGameStage(){
  if(!currentGame) return;
  var g=GAMES[currentGame];
  var container=document.getElementById('stageContent');
  if(!g){ container.innerHTML='<p style="padding:40px;text-align:center;color:#adb5bd">⏳ 游戏开发中…</p>'; return; }
  var fn=g['stage'+gameStage];
  if(fn) fn(container);
  else container.innerHTML='<p style="padding:40px;text-align:center;color:#adb5bd">⏳ 加载中…</p>';
}

// ── 庆祝动画 ──
function celebrate(){
  var c=document.getElementById('cele');
  var cols=['#ff6b6b','#feca57','#4ecdc4','#a29bfe','#fd79a8','#00b894','#ffd93d','#6c5ce7'];
  for(var i=0;i<50;i++){
    var el=document.createElement('div'); el.className='confetti';
    el.style.left=Math.random()*100+'%';
    el.style.top=-(Math.random()*40)+'px';
    el.style.background=cols[Math.floor(Math.random()*cols.length)];
    el.style.animationDelay=Math.random()*.5+'s';
    el.style.animationDuration=(1+Math.random()*1.5)+'s';
    el.style.borderRadius=Math.random()>.5?'50%':'3px';
    el.style.width=(6+Math.random()*10)+'px';
    el.style.height=(6+Math.random()*10)+'px';
    c.appendChild(el);
    setTimeout(function(){el.remove();},2000);
  }
}

// ── 共享工具函数 ──
function genRandInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// 天平 SVG
function makeScaleSVG(){
  return '<svg viewBox="0 0 400 220"><polygon points="200,210 185,170 215,170" fill="#adb5bd"/><line x1="60" y1="160" x2="340" y2="160" stroke="#495057" stroke-width="5"/><line x1="100" y1="160" x2="100" y2="192" stroke="#adb5bd" stroke-width="2"/><line x1="300" y1="160" x2="300" y2="192" stroke="#adb5bd" stroke-width="2"/><ellipse cx="100" cy="198" rx="42" ry="10" fill="#f8f9fa" stroke="#adb5bd" stroke-width="2"/><ellipse cx="300" cy="198" rx="42" ry="10" fill="#f8f9fa" stroke="#adb5bd" stroke-width="2"/></svg>';
}

// 线段图模型
function drawBarModel(aVal,bVal,aLabel,bLabel,multiplier,diff){
  var max=Math.max(aVal,bVal)*1.25;
  var ap=(aVal/max*100), bp=(bVal/max*100);
  var segs='';
  for(var i=0;i<multiplier;i++){
    segs+='<span'+(i===multiplier-1?' class="hl"':'')+'></span>';
  }
  return '<div class="bar-wrap"><div class="bar-row"><span class="bar-lbl">'+aLabel+'</span><div class="bar-track"><div class="bar-fill a" style="width:'+ap+'%"><div class="bar-seg">'+segs+'</div></div></div><span style="font-weight:700;color:#ff6b6b">'+aVal+'</span></div><div class="bar-row"><span class="bar-lbl">'+bLabel+'</span><div class="bar-track"><div class="bar-fill b" style="width:'+bp+'%"><span>'+bVal+'</span></div></div><span style="font-weight:700;color:#4ecdc4">'+bVal+'</span></div><p style="text-align:center;color:#868e96;font-size:13px;margin-top:6px">'+aLabel+' - '+bLabel+' = <b style="color:#f59f00">'+diff+'</b>，'+aLabel+' 是 '+bLabel+' 的 <b style="color:#ff6b6b">'+multiplier+'倍</b></p></div>';
}

// 韦恩图 SVG
function makeVennSVG(){
  return '<svg viewBox="0 0 300 160" width="280" height="150"><circle cx="110" cy="80" r="60" fill="rgba(255,107,107,.3)" stroke="#ff6b6b" stroke-width="2"/><circle cx="190" cy="80" r="60" fill="rgba(78,205,196,.3)" stroke="#4ecdc4" stroke-width="2"/><text x="70" y="70" font-size="14" fill="#ff6b6b" font-weight="700">🍎</text><text x="210" y="70" font-size="14" fill="#4ecdc4" font-weight="700">🍌</text><text x="145" y="85" font-size="13" fill="#a29bfe" font-weight="700">都喜欢</text></svg>';
}

// ── 初始化 ──
document.querySelectorAll('#stageTabs .stage-tab').forEach(function(btn){
  btn.addEventListener('click',function(){
    switchStage(parseInt(btn.dataset.stage));
  });
});

function init(){
  renderMenu();
  updateStarTotal();
}
