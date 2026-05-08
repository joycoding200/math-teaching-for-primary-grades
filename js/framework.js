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

// ═══════════════════════════════════════════
//  ── 积分 & 成就 & 连胜 & 计时引擎 ──
// ═══════════════════════════════════════════

var SCORE_CONFIG = {
  correct: 10,        // 答对基础分
  streakBonus: 5,     // 每连胜一次额外加分
  maxStreakBonus: 50, // 连胜加分上限
  wrong: -2,          // 答错扣分（不低于0）
  hintPenalty: -3,    // 每用一次提示扣分
  explore: 5,         // 探索（stage2 互动）加分
  perfect: 25         // 限时模式全对额外加分
};

var ACHIEVEMENTS = [
  {id:'first_blood',   icon:'🔰', name:'初出茅庐', desc:'首次答对题目',           cond:function(s){return s.totalCorrect>=1;}},
  {id:'streak_3',      icon:'🔥', name:'三连胜',   desc:'连续答对 3 题',          cond:function(s){return s.streak>=3;}},
  {id:'streak_5',      icon:'💥', name:'势不可挡', desc:'连续答对 5 题',          cond:function(s){return s.streak>=5;}},
  {id:'streak_10',     icon:'👑', name:'十连胜王', desc:'连续答对 10 题',         cond:function(s){return s.streak>=10;}},
  {id:'hundred',       icon:'💯', name:'百年树人', desc:'累计获得 100 积分',      cond:function(s){return s.totalScore>=100;}},
  {id:'fivehundred',   icon:'🌟', name:'积分达人', desc:'累计获得 500 积分',      cond:function(s){return s.totalScore>=500;}},
  {id:'thousand',      icon:'🏆', name:'数学大师', desc:'累计获得 1000 积分',     cond:function(s){return s.totalScore>=1000;}},
  {id:'perfect_game',  icon:'🎯', name:'满分过关', desc:'一个游戏答对 5 题无错误', cond:function(s){return s.perfectGames>=1;}},
  {id:'speed_demon',   icon:'⚡', name:'闪电思维', desc:'限时模式全对完成',       cond:function(s){return s.speedPerfect>=1;}},
  {id:'explorer',      icon:'🔭', name:'探索先锋', desc:'完成 10 次 stage2 互动', cond:function(s){return s.exploreCount>=10;}},
  {id:'night_owl',     icon:'🦉', name:'夜猫子',   desc:'完成 5 次限时挑战',     cond:function(s){return s.timedChallenges>=5;}}
];

function loadStats(){
  try{ return JSON.parse(localStorage.getItem('mathstats')||
    '{"totalScore":0,"totalCorrect":0,"totalWrong":0,"streak":0,"maxStreak":0,"perfectGames":0,"speedPerfect":0,"exploreCount":0,"timedChallenges":0,"achievements":[],"gameScores":{}}'
  ); }catch(e){ return {}; }
}
function saveStats(s){ localStorage.setItem('mathstats',JSON.stringify(s)); }

function getStats(){ return loadStats(); }

function addScore(gameId, points){
  var s=loadStats();
  s.totalScore=Math.max(0, s.totalScore+points);
  if(!s.gameScores[gameId]) s.gameScores[gameId]=0;
  s.gameScores[gameId]=Math.max(0, s.gameScores[gameId]+points);
  saveStats(s);
  updateTopStats();
}

function awardResult(gameId, isCorrect, hintsUsed, timedPerfect){
  var s=loadStats();
  hintsUsed=hintsUsed||getHintsUsed();
  if(isCorrect){
    s.totalCorrect++; s.streak++; s.maxStreak=Math.max(s.maxStreak,s.streak);
    var bonus=Math.min(s.streak*SCORE_CONFIG.streakBonus, SCORE_CONFIG.maxStreakBonus);
    s.totalScore+=SCORE_CONFIG.correct+bonus;
    if(!s.gameScores[gameId]) s.gameScores[gameId]=0;
    s.gameScores[gameId]+=SCORE_CONFIG.correct+bonus;
    updateDifficulty(true);
  } else {
    s.totalWrong++; s.streak=0;
    s.totalScore=Math.max(0, s.totalScore+SCORE_CONFIG.wrong);
    if(!s.gameScores[gameId]) s.gameScores[gameId]=0;
    s.gameScores[gameId]=Math.max(0, s.gameScores[gameId]+SCORE_CONFIG.wrong);
    updateDifficulty(false);
  }
  if(hintsUsed>0){
    s.totalScore=Math.max(0, s.totalScore+hintsUsed*SCORE_CONFIG.hintPenalty);
    if(!s.gameScores[gameId]) s.gameScores[gameId]=0;
    s.gameScores[gameId]=Math.max(0, s.gameScores[gameId]+hintsUsed*SCORE_CONFIG.hintPenalty);
  }
  if(timedPerfect){ s.speedPerfect++; s.totalScore+=SCORE_CONFIG.perfect; }
  saveStats(s); updateTopStats(); checkAchievements(gameId);
  resetHints();
}

function awardExplore(gameId){
  var s=loadStats(); s.exploreCount++;
  s.totalScore+=SCORE_CONFIG.explore;
  if(!s.gameScores[gameId]) s.gameScores[gameId]=0;
  s.gameScores[gameId]+=SCORE_CONFIG.explore;
  saveStats(s); updateTopStats(); checkAchievements(gameId);
}

function awardTimedChallenge(){
  var s=loadStats(); s.timedChallenges++;
  saveStats(s); updateTopStats(); checkAchievements();
}

function awardPerfectGame(gameId){
  var s=loadStats(); s.perfectGames++;
  saveStats(s); updateTopStats(); checkAchievements(gameId);
}

function checkAchievements(gameId){
  var s=loadStats(); var unlocked=false;
  ACHIEVEMENTS.forEach(function(a){
    if(s.achievements.indexOf(a.id)===-1 && a.cond(s)){
      s.achievements.push(a.id); unlocked=true;
      saveStats(s); showAchievementPopup(a);
    }
  });
  if(unlocked) updateTopStats();
}

function showAchievementPopup(a){
  var pop=document.createElement('div'); pop.className='achieve-popup';
  pop.innerHTML='<span class="achieve-icon">'+a.icon+'</span><div><b>'+a.name+'</b><br><small>'+a.desc+'</small></div>';
  document.body.appendChild(pop);
  setTimeout(function(){pop.remove();},3000);
}

function updateTopStats(){
  var s=loadStats();
  document.getElementById('scoreDisplay').textContent='🏆 '+s.totalScore;
  document.getElementById('streakDisplay').textContent='🔥 '+(s.streak||0);
  updateStarTotal();
}

// ── 限时挑战计时器 ──
var timerInterval=null, timerRemaining=0, timerCallback=null;

function startTimer(seconds, onTick, onEnd){
  stopTimer();
  timerRemaining=seconds; timerCallback=onEnd;
  var startTime=Date.now();
  timerInterval=setInterval(function(){
    var elapsed=Math.floor((Date.now()-startTime)/1000);
    timerRemaining=Math.max(0, seconds-elapsed);
    if(onTick) onTick(timerRemaining);
    if(timerRemaining<=0){ stopTimer(); if(onEnd) onEnd(); }
  },200);
}

function stopTimer(){
  if(timerInterval){ clearInterval(timerInterval); timerInterval=null; }
}

function getTimerRemaining(){ return timerRemaining; }

function getDifficultyTime(difficulty){
  return difficulty==='hard'?45:difficulty==='medium'?75:120;
}

// ═══════════════════════════════════════════
//  ── 故事化主题引擎 ──
// ═══════════════════════════════════════════

var THEMES = [
  {id:'default', icon:'📚', name:'经典课堂', desc:'原汁原味的数学题'},
  {id:'space',   icon:'🚀', name:'太空探险', desc:'在宇宙中探索数学奥秘',
   css:{'--c1':'#845ef7','--c2':'#339af0','--bg':'#f3f0ff','--topbar-gradient':'linear-gradient(135deg,#5f3dc4,#7950f2)'},
   map:{'小明':'宇航员小明','小红':'宇航员小红','小华':'导航员小华','小朋友':'小小宇航员','老师':'舰长','爸爸':'指挥官爸爸','妈妈':'科学家妈妈','爷爷':'老舰长','哥哥':'大副哥哥','弟弟':'学员弟弟','姐姐':'中尉姐姐','妹妹':'学员妹妹','苹果':'能量块','香蕉':'燃料棒','橘子':'氧气罐','糖果':'口粮','铅笔':'激光笔','笔记本':'数据板','巧克力':'压缩饼干','卡片':'通行证','书':'操作手册','本子':'任务日志','笔':'触控笔','元':'星际币','分':'星分','角':'星角','公里':'光秒','千米':'光秒','米':'星米','厘米':'星厘','小时':'星际时','分钟':'星际分','秒':'星际秒','天':'火星日','岁':'星际年','条':'根','个':'枚','只':'台','棵树':'信号塔','花':'指示灯','旗':'信号旗','树苗':'微型塔','跑步':'太空漫步','跳远':'低重力跳跃','游泳':'太空游泳','骑车':'驾驶月球车','开车':'驾驶飞船','篮球队':'陨石队','足球队':'星云队','汽车':'探测车','摩托车':'悬浮摩托','船':'星际飞船','飞机':'太空战机','火车':'星际列车','高铁':'超光速列车','兔子':'外星兔','乌龟':'陨石龟','鸡':'太空鸡','兔':'月球兔','牛':'银河牛','河':'星云流','路':'航道','池塘':'陨石坑','花坛':'太空花园','跑道':'发射轨道','走廊':'舰桥通道','抽屉':'货舱','箱子':'集装箱','盒子':'储存舱','邮筒':'通讯站','房间':'舱室','宿舍':'船员舱','书架':'资料架','一班':'α小队','二班':'β小队','红队':'火星队','蓝队':'海王星队','A箱':'A货舱','B箱':'B货舱'}
  },
  {id:'pirate',  icon:'🏴‍☠️', name:'海盗寻宝', desc:'在七海中破解数学谜题',
   css:{'--c1':'#e8590c','--c2':'#0ca678','--bg':'#fff4e6','--topbar-gradient':'linear-gradient(135deg,#d9480f,#e8590c)'},
   map:{'小明':'水手小明','小红':'水手小红','小华':'瞭望手小华','小朋友':'小海盗','老师':'船长','爸爸':'大副爸爸','妈妈':'航海长妈妈','爷爷':'老船长','哥哥':'炮手哥哥','弟弟':'见习海盗弟弟','姐姐':'领航员姐姐','妹妹':'见习海盗妹妹','苹果':'椰子','香蕉':'菠萝','橘子':'芒果','糖果':'金币巧克力','铅笔':'匕首','笔记本':'藏宝图','巧克力':'朗姆酒糖','卡片':'悬赏令','书':'航海日志','本子':'航海笔记','笔':'羽毛笔','元':'金币','分':'铜板','角':'银币','公里':'海里','千米':'海里','米':'码','厘米':'寸','小时':'海时','分钟':'海分','秒':'海秒','天':'日落','岁':'潮汐季','条':'根','个':'枚','只':'头','棵树':'椰子树','花':'珊瑚','旗':'海盗旗','树苗':'椰苗','跑步':'甲板奔跑','跳远':'跳帮','游泳':'潜泳','骑车':'骑海豚','开车':'驾船','篮球队':'弯刀队','足球队':'火炮队','汽车':'小船','摩托车':'快艇','船':'海盗船','飞机':'信天翁','火车':'海列车','高铁':'飓风号','兔子':'海岛兔','乌龟':'巨龟','鸡':'鹦鹉','兔':'洞穴兔','牛':'海牛','河':'洋流','路':'航线','池塘':'环礁湖','花坛':'珊瑚礁','跑道':'甲板','走廊':'船舷通道','抽屉':'宝箱','箱子':'木箱','盒子':'宝盒','邮筒':'信瓶','房间':'船舱','宿舍':'水手舱','书架':'藏宝架','一班':'弯刀队','二班':'火炮队','红队':'红胡子队','蓝队':'蓝鲸队','A箱':'A宝箱','B箱':'B宝箱'}
  },
  {id:'kitchen', icon:'🧑‍🍳', name:'美食厨房', desc:'用食谱和食材学数学',
   css:{'--c1':'#e64980','--c2':'#20c997','--bg':'#fff0f6','--topbar-gradient':'linear-gradient(135deg,#c2255c,#e64980)'},
   map:{'小明':'厨师小明','小红':'糕点师小红','小华':'帮厨小华','小朋友':'小厨师','老师':'主厨','爸爸':'大厨爸爸','妈妈':'甜点师妈妈','爷爷':'老师傅','哥哥':'切配哥哥','弟弟':'学徒弟弟','姐姐':'烘焙姐姐','妹妹':'学徒妹妹','苹果':'鸡蛋','香蕉':'香蕉','橘子':'柠檬','糖果':'马卡龙','铅笔':'擀面杖','笔记本':'食谱','巧克力':'可可粉','卡片':'菜单','书':'料理书','本子':'配方本','笔':'挤花袋','元':'元','分':'分','角':'角','公里':'千米','千米':'千米','米':'米','厘米':'厘米','小时':'小时','分钟':'分钟','秒':'秒','天':'天','岁':'岁','条':'根','个':'份','只':'只','棵树':'棵香草','花':'糖霜花','旗':'餐旗','树苗':'香草苗','跑步':'揉面','跳远':'翻锅','游泳':'搅拌','骑车':'送餐','开车':'开餐车','篮球队':'披萨队','足球队':'汉堡队','汽车':'送餐车','摩托车':'外卖摩托','船':'游轮','飞机':'航班','火车':'餐车','高铁':'高速餐车','兔子':'小兔饼干','乌龟':'龟苓膏','鸡':'烤鸡','兔':'兔肉派','牛':'奶牛','河':'汤锅','路':'传送带','池塘':'汤池','花坛':'香料园','跑道':'出餐通道','走廊':'后厨通道','抽屉':'保鲜盒','箱子':'储物箱','盒子':'餐盒','邮筒':'订单箱','房间':'厨房','宿舍':'员工间','书架':'食谱架','一班':'烘焙组','二班':'烹饪组','红队':'番茄队','蓝队':'蓝莓队','A箱':'A储物箱','B箱':'B储物箱'}
  }
];
var activeTheme='default';

function loadTheme(){ try{return localStorage.getItem('maththeme')||'default';}catch(e){return'default';} }
function saveTheme(t){ localStorage.setItem('maththeme',t); }

function toggleTheme(){
  var idx=0; THEMES.forEach(function(t,i){if(t.id===activeTheme)idx=i;});
  idx=(idx+1)%THEMES.length; activeTheme=THEMES[idx].id;
  saveTheme(activeTheme); applyThemeCSS(); updateThemeButton();
  if(currentGame&&gameStage===3) renderGameStage(); // re-render to apply theme text
}

function getActiveTheme(){ return activeTheme; }

function getThemeObj(){ return THEMES.find(function(t){return t.id===activeTheme;})||THEMES[0]; }

function applyThemeCSS(){
  var obj=getThemeObj();
  var root=document.documentElement;
  if(obj.css){
    Object.keys(obj.css).forEach(function(k){ root.style.setProperty(k, obj.css[k]); });
  } else {
    // Reset to defaults
    root.style.removeProperty('--c1'); root.style.removeProperty('--c2');
    root.style.removeProperty('--bg'); root.style.removeProperty('--topbar-gradient');
    // Also reset topbar
    document.getElementById('topbar').style.background='';
  }
  // Apply topbar gradient
  var topbar=document.getElementById('topbar');
  if(obj.css&&obj.css['--topbar-gradient']){
    topbar.style.background=obj.css['--topbar-gradient'];
  }else{
    topbar.style.background='';
  }
}

function applyThemeText(originalText){
  var obj=getThemeObj();
  if(!obj.map||obj.id==='default') return originalText;
  var result=originalText;
  // Apply replacements from longest to shortest to avoid partial matches
  var keys=Object.keys(obj.map).sort(function(a,b){return b.length-a.length;});
  keys.forEach(function(k){
    result=result.split(k).join(obj.map[k]);
  });
  return result;
}

function updateThemeButton(){
  var obj=getThemeObj();
  var btn=document.getElementById('themeToggle');
  if(btn){ btn.textContent=obj.icon; btn.style.display='inline'; }
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

var timedMode=true;

function renderGameStage(){
  if(!currentGame) return;
  var g=GAMES[currentGame];
  var container=document.getElementById('stageContent');
  if(!g){ container.innerHTML='<p style="padding:40px;text-align:center;color:#adb5bd">⏳ 游戏开发中…</p>'; return; }
  var fn=g['stage'+gameStage];
  if(fn) fn(container);
  else{ container.innerHTML='<p style="padding:40px;text-align:center;color:#adb5bd">⏳ 加载中…</p>'; return; }
  // 练一练模式：注入计时开关、提示系统和难度标签
  if(gameStage===3){
    resetHints();
    injectStage3Extras(container);
  }
}

function injectStage3Extras(container){
  var diff=getCurrentDifficulty();
  var timeLimit=getDifficultyTime(diff);
  // 难度标签 + 计时开关 + 提示按钮
  var diffLabel={easy:'🟢 基础',medium:'🟡 进阶',hard:'🔴 挑战'}[diff];
  var extrasHtml='<div style="display:flex;gap:8px;align-items:center;justify-content:center;width:100%;flex-wrap:wrap;margin-bottom:4px">'+
    '<span class="diff-badge '+diff+'">'+diffLabel+'</span>'+
    '<label style="font-size:13px;cursor:pointer;display:flex;align-items:center;gap:4px;user-select:none">'+
    '<input type="checkbox" id="timedToggle" '+(timedMode?'checked':'')+' onchange="toggleTimedMode(this.checked)"> ⏱ 计时挑战</label>'+
    '<span id="timerBadge" style="display:'+(timedMode?'inline':'none')+'" class="diff-badge '+diff+'">'+({easy:'120s',medium:'75s',hard:'45s'})[diff]+'</span>'+
    '</div>'+
    '<span style="font-size:12px;color:#adb5bd" id="timerBest"></span>'+
    '</div>'+
    '<div class="timer-wrap" id="timerWrap" style="display:'+(timedMode?'flex':'none')+'">'+
    '<span>⏱</span><div class="timer-bar-track"><div class="timer-bar-fill" id="timerFill" style="width:100%"></div></div>'+
    '<span class="timer-text" id="timerText">'+timeLimit+'s</span></div>';
  container.insertAdjacentHTML('afterbegin',extrasHtml);
  if(timedMode){ startTimedChallenge(timeLimit); }
  updateTimerBest();
}

function showStageHint(level){
  var content=document.getElementById('hintContent');
  var hint=getHint(currentGame, level);
  content.style.display='block';
  content.textContent='💡 '+(level===3?'答案':'提示'+level)+'：'+hint;
  // Show next level button
  if(level===1){
    document.getElementById('hintBtn1').classList.add('used');
    document.getElementById('hintBtn2').style.display='inline-block';
    useHint();
  }else if(level===2){
    document.getElementById('hintBtn2').classList.add('used');
    document.getElementById('hintBtn3').style.display='inline-block';
    useHint();
  }else{
    document.getElementById('hintBtn3').classList.add('used');
    useHint();
  }
}

function toggleTimedMode(on){
  timedMode=on;
  stopTimer();
  if(on){
    var diff=getCurrentDifficulty();
    startTimedChallenge(getDifficultyTime(diff));
  }
  document.getElementById('timerWrap').style.display=on?'flex':'none';
  var badge=document.getElementById('timerBadge');
  if(badge){
    var diff=getCurrentDifficulty();
    badge.textContent=({easy:'⏱ 120秒',medium:'⏱ 75秒',hard:'⏱ 45秒'})[diff];
    badge.className='diff-badge '+diff;
  }
}

function startTimedChallenge(seconds){
  stopTimer();
  document.getElementById('timerWrap').style.display='flex';
  document.getElementById('timerFill').style.width='100%';
  document.getElementById('timerFill').className='timer-bar-fill';
  document.getElementById('timerText').textContent=seconds+'s';
  document.getElementById('timerText').className='timer-text';
  startTimer(seconds,
    function(remaining){
      var pct=(remaining/seconds*100);
      var fill=document.getElementById('timerFill');
      if(!fill) return;
      fill.style.width=pct+'%';
      fill.className='timer-bar-fill'+(pct<30?' urgent':pct<60?' warn':'');
      var txt=document.getElementById('timerText');
      if(txt){
        txt.textContent=remaining+'s';
        txt.className='timer-text'+(pct<30?' urgent':'');
      }
    },
    function(){
      var fbEl=document.querySelector('#stageContent .feedback');
      if(fbEl && (!fbEl.textContent||fbEl.textContent.indexOf('✅')===-1)){
        fbEl.textContent='⏰ 时间到！点击重试';
        fbEl.className='feedback err';
        awardResult(currentGame,false,0);
      }
      awardTimedChallenge();
    }
  );
}

// ── 自适应难度 & 分层提示 ──
var currentDifficulty='easy';
var correctStreak=0;
var hintLevelUsed=0; // per question, reset each attempt

var HINT_MAP = {
  pattern:        ['观察颜色、形状或数字的变化规律','看看相邻两个之间有什么运算关系？'],
  countshape:     ['按顺序数，先单个再组合','分分类：先数小的，再数组合的'],
  balance:        ['想一想：多出来的要怎么分？','先算相差多少，再除以2'],
  simplelogic:    ['找到已经确定的那个线索','先确定一个人，剩下的用排除法'],
  queue:          ['画一画队伍的位置图','公式：总数=左数位置+右数位置−1'],
  substitution:   ['找到中间量，一步步替换','把每个中间量换成目标量的个数'],
  cycle:          ['用除法，看余数','周期长度是多少？用位置÷周期看余数'],
  tree:           ['先算段数=总长÷间隔','根据种植方式决定+1还是−1'],
  normalization:  ['先求1份的量（归一）','归一：总数÷份数；求多：1份量×新份数'],
  sumdiff:        ['画线段图帮助理解','(和+差)÷2=大数，(和−差)÷2=小数'],
  summulti:       ['把和分成(倍数+1)等份','小数=和÷(倍数+1)'],
  diffmulti:      ['差对应着倍数差','小数=差÷(倍数−1)'],
  age:            ['年龄差永远不变！','把年龄问题变成差倍问题来解'],
  profitloss:     ['两次分配的总数不变','人数=(盈+亏)÷(分法之差)'],
  reverse:        ['从结果倒推回去','运算互换：加变减、乘变除，顺序倒过来'],
  average:        ['平均数=总和÷个数','先算总和，再除以个数'],
  chickenrabbit:  ['假设全都是鸡，算算差多少腿','每换1只兔多2条腿，差值÷2=兔数'],
  venn:           ['画两个交叉的圆圈','A∪B=A+B−A∩B，减去重叠的部分'],
  pigeonhole:     ['考虑最坏情况','总数÷抽屉数，向上取整'],
  logic:          ['小偷说谎，其他人说真话','逐人假设他是小偷，检查是否自洽'],
  meeting:        ['相向而行，速度相加','相遇时间=距离÷(速度和)'],
  chase:          ['追及看速度差','追及时间=距离差÷(快−慢)'],
  work:           ['把总工作量看作1','先算各自效率(1÷天数)，再求合作'],
  boatcurrent:    ['顺水=船速+水速，逆水=船速−水速','船速=(顺+逆)÷2，水速=(顺−逆)÷2'],
  cowgrass:       ['先求每天长草量','长草量=(方案1−方案2)÷(天数差)，再求原有草']
};

function getHint(gameId, level){
  var map=HINT_MAP[gameId];
  if(!map) return '请再想想';
  if(level===1) return map[0];
  if(level===2) return map[1];
  // L3: use the question's own hint from gameState
  return gameState.currentHint||map[1];
}

function getQuestionDifficulty(gameId, pool, questionIndex){
  var ratio=pool.length>1?questionIndex/(pool.length-1):0;
  if(ratio<0.4) return 'easy';
  if(ratio<0.75) return 'medium';
  return 'hard';
}

function pickAdaptiveQuestion(gameId, pool){
  // Filter by current difficulty, fall back to all questions
  var filtered=pool.filter(function(q){
    var idx=pool.indexOf(q);
    var d=getQuestionDifficulty(gameId, pool, idx);
    return d===currentDifficulty;
  });
  if(filtered.length===0) filtered=pool;
  var p=filtered[Math.floor(Math.random()*filtered.length)];
  // Store hint for L3
  if(p.hint) gameState.currentHint=p.hint;
  if(p.explain) gameState.currentHint=p.explain;
  return p;
}

function updateDifficulty(isCorrect){
  if(isCorrect){
    correctStreak++;
    if(correctStreak>=3){
      correctStreak=0;
      if(currentDifficulty==='easy') currentDifficulty='medium';
      else if(currentDifficulty==='medium') currentDifficulty='hard';
    }
  }else{
    correctStreak=0;
    if(currentDifficulty==='hard') currentDifficulty='medium';
    else if(currentDifficulty==='medium') currentDifficulty='easy';
  }
}

function getCurrentDifficulty(){ return currentDifficulty; }
function getCorrectStreak(){ return correctStreak; }

function useHint(){
  hintLevelUsed++;
  return hintLevelUsed;
}

function resetHints(){ hintLevelUsed=0; }

function getHintsUsed(){ return hintLevelUsed; }

function updateTimerBest(){
  var best=loadStats().timedChallenges;
  var el=document.getElementById('timerBest');
  if(el) el.textContent=best>0?' | 已完成 '+best+' 次':'';
}

// ── 庆祝动画：大拇指 + "你真棒！" ──
function celebrate(){
  var overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:300;text-align:center;pointer-events:none;animation:celePopIn .4s cubic-bezier(.34,1.56,.64,1),celeFadeOut .4s 1.2s forwards';
  overlay.innerHTML='<div style="font-size:80px;animation:celeBounce .4s cubic-bezier(.34,1.56,.64,1)">👍</div><div style="font-size:28px;font-weight:900;color:#ff6b6b;margin-top:4px;text-shadow:0 2px 8px rgba(255,107,107,.3)">你真棒！</div>';
  document.body.appendChild(overlay);
  setTimeout(function(){overlay.remove();},1700);
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
  activeTheme=loadTheme();
  applyThemeCSS();
  updateThemeButton();
  updateTopStats();
  renderMenu();
}
