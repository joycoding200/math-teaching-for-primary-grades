/* ====== 游戏逻辑：全部 25 个游戏的 stage1/2/3 + check ====== */

// ══════════════════ 一年级 ══════════════════

// 1. 找规律
GAMES.pattern = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 80" width="100%" height="70"><rect x="10" y="15" width="60" height="50" rx="8" fill="#fff5f5"/><text x="40" y="48" text-anchor="middle" font-size="28">🔴</text><text x="40" y="72" text-anchor="middle" font-size="11" fill="#868e96">第1个</text><rect x="80" y="15" width="60" height="50" rx="8" fill="#f0fffc"/><text x="110" y="48" text-anchor="middle" font-size="28">🔵</text><text x="110" y="72" text-anchor="middle" font-size="11" fill="#868e96">第2个</text><rect x="150" y="15" width="60" height="50" rx="8" fill="#fff5f5"/><text x="180" y="48" text-anchor="middle" font-size="28">🔴</text><text x="180" y="72" text-anchor="middle" font-size="11" fill="#868e96">第3个</text><rect x="220" y="15" width="60" height="50" rx="8" fill="#f0fffc"/><text x="250" y="48" text-anchor="middle" font-size="28">🔵</text><text x="250" y="72" text-anchor="middle" font-size="11" fill="#868e96">第4个</text><rect x="290" y="15" width="60" height="50" rx="8" fill="#fff5f5" stroke="#ff6b6b" stroke-width="3" stroke-dasharray="6,3"/><text x="320" y="48" text-anchor="middle" font-size="28">❓</text><text x="320" y="72" text-anchor="middle" font-size="11" fill="#ff6b6b">第5个</text></svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>观察前4个图形的排列：🔴 🔵 🔴 🔵</div>'+
      '<div class="step"><span class="step-num">2</span>发现规律：<span class="highlight">红蓝交替出现</span>，每个位置颜色固定</div>'+
      '<div class="step"><span class="step-num">3</span>第5个（奇数位）应该和第1、3个一样 → <span class="highlight">🔵</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 找规律口诀：<b>一看颜色，二看形状，三看数量，四看方向</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.pattern;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.ptAns=p.ans; gameState.ptExplain=p.explain;
    var h='<div style="display:flex;gap:8px;font-size:30px;justify-content:center;flex-wrap:wrap">';
    p.seq.forEach(function(s){ h+='<span style="background:#f8f9fa;padding:8px 12px;border-radius:12px">'+s+'</span>'; });
    h+='</div><p style="font-weight:700;text-align:center">下一个是什么？</p><div class="item-grid">';
    p.opts.forEach(function(o,i){ h+='<div class="item-chip" onclick="GAMES.pattern.choose('+i+',this)">'+o+'</div>'; });
    h+='</div><p class="feedback" id="ptfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    container.innerHTML=h;
  },
  choose: function(idx,el){
    var fb=document.getElementById('ptfb');
    if(idx===gameState.ptAns){
      fb.textContent='✅ 正确！'+gameState.ptExplain; fb.className='feedback ok';
      el.classList.add('selected'); setStars('pattern',2); celebrate(); updateStarTotal();
    }else{
      fb.textContent='❌ 再观察一下规律吧'; fb.className='feedback err';
      el.classList.add('wrong'); setTimeout(function(){ el.classList.remove('wrong'); },500);
    }
  },
  stage3: function(container){ GAMES.pattern.stage2(container); }
};

// 2. 数图形
GAMES.countshape = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 160" width="100%" height="140">'+
      '<rect x="40" y="10" width="120" height="120" fill="none" stroke="#333" stroke-width="2"/>'+
      '<line x1="100" y1="10" x2="100" y2="130" stroke="#e9ecef" stroke-width="1" stroke-dasharray="4,4"/>'+
      '<line x1="40" y1="70" x2="160" y2="70" stroke="#e9ecef" stroke-width="1" stroke-dasharray="4,4"/>'+
      '<text x="72" y="50" font-size="12" fill="#ff6b6b">1</text><text x="128" y="50" font-size="12" fill="#4ecdc4">2</text>'+
      '<text x="72" y="110" font-size="12" fill="#feca57">3</text><text x="128" y="110" font-size="12" fill="#a29bfe">4</text>'+
      '<rect x="200" y="10" width="130" height="130" fill="none" stroke="#333" stroke-width="2"/>'+
      '<line x1="200" y1="10" x2="330" y2="140" stroke="#ff6b6b" stroke-width="2"/>'+
      '<text x="230" y="100" font-size="12" fill="#ff6b6b">①</text><text x="300" y="60" font-size="12" fill="#4ecdc4">②</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>数图形要<span class="highlight">按顺序</span>：从左到右、从上到下，不遗漏不重复</div>'+
      '<div class="step"><span class="step-num">2</span>左图田字格有<span class="highlight">4个</span>小长方形</div>'+
      '<div class="step"><span class="step-num">3</span>右图对角线将长方形分成<span class="highlight">2个</span>三角形</div>'+
      '</div>'+
      '<div class="formula-box">📌 数图形口诀：<b>先数单个，再数组合，分类计数，相加得总数</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.countshape;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.csAns=p.ans;
    container.innerHTML=
      '<p style="font-weight:700;text-align:center;font-size:16px">'+p.q+'</p>'+
      (p.hint?'<p style="font-size:13px;color:#adb5bd">提示：'+p.hint+'</p>':'')+
      '<div class="answer-row"><span>答案：</span><input type="number" class="answer-input" id="csAns" placeholder="?" min="0" max="99"><button class="btn btn-p" onclick="GAMES.countshape.check()">确认 ✓</button></div>'+
      '<p class="feedback" id="csfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check: function(){
    var ans=parseInt(document.getElementById('csAns').value),fb=document.getElementById('csfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.csAns){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('countshape',2);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 再仔细数数';fb.className='feedback err';}
  },
  stage3: function(container){ GAMES.countshape.stage2(container); }
};

// 3. 移多补少
GAMES.balance = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 120" width="100%" height="100">'+
      '<rect x="20" y="10" width="140" height="80" rx="10" fill="#fff5f5" stroke="#ff6b6b" stroke-width="2"/>'+
      '<text x="90" y="45" text-anchor="middle" font-size="28">⭐⭐⭐⭐⭐</text><text x="90" y="62" text-anchor="middle" font-size="20">⭐⭐⭐</text>'+
      '<text x="90" y="82" text-anchor="middle" font-size="12" fill="#ff6b6b">左边 8个</text>'+
      '<text x="200" y="55" text-anchor="middle" font-size="28">→</text>'+
      '<text x="240" y="55" text-anchor="middle" font-size="13" fill="#4ecdc4">移3个</text>'+
      '<rect x="200" y="10" width="140" height="80" rx="10" fill="#f0fffc" stroke="#4ecdc4" stroke-width="2"/>'+
      '<text x="270" y="45" text-anchor="middle" font-size="28">⭐⭐</text><text x="270" y="62" text-anchor="middle" font-size="20">⭐⭐⭐</text>'+
      '<text x="270" y="82" text-anchor="middle" font-size="12" fill="#4ecdc4">右边 2→5个</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>先算相差：8 - 2 = <span class="highlight">6个</span></div>'+
      '<div class="step"><span class="step-num">2</span>把多出的一半移过去：6 ÷ 2 = <span class="highlight">3个</span></div>'+
      '<div class="step"><span class="step-num">3</span>两边都变成5个，一样多了！</div>'+
      '</div>'+
      '<div class="formula-box">📌 移多补少公式：<b>移动数 = (多的 - 少的) ÷ 2</b></div>';
  },
  stage2: function(container){
    var a=genRandInt(6,12),diff=genRandInt(1,Math.floor((a-1)/2))*2,b=a-diff;
    gameState.blA=a; gameState.blB=b; gameState.blAns=(a-b)/2; gameState.blMoved=0;
    container.innerHTML=
      '<p style="text-align:center"><b>'+gameState.blA+'</b>个⭐ vs <b>'+gameState.blB+'</b>个⭐</p>'+
      '<div style="display:flex;justify-content:space-around;width:100%;max-width:400px"><div id="blLeft" style="text-align:center;font-size:28px;cursor:pointer" onclick="GAMES.balance.moveLeft()"></div><div style="font-size:40px">→</div><div id="blRight" style="text-align:center;font-size:28px;cursor:pointer" onclick="GAMES.balance.moveRight()"></div></div>'+
      '<p style="font-size:13px;color:#adb5bd">点击左边减少，点击右边增加，让两边相等</p>'+
      '<p id="blCount" style="font-weight:700">已移动: 0 个</p><p class="feedback" id="blfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button>';
    GAMES.balance.renderBL2();
  },
  renderBL2: function(){
    document.getElementById('blLeft').innerHTML='⭐'.repeat(gameState.blA);
    document.getElementById('blRight').innerHTML='⭐'.repeat(gameState.blB);
  },
  moveLeft: function(){
    if(gameState.blA<=gameState.blB||gameState.blA<=1)return;
    gameState.blA--;gameState.blB++;gameState.blMoved++;
    GAMES.balance.renderBL2();GAMES.balance.checkBL();
  },
  moveRight: function(){
    if(gameState.blB<=gameState.blA||gameState.blB<=1)return;
    gameState.blB--;gameState.blA++;gameState.blMoved++;
    GAMES.balance.renderBL2();GAMES.balance.checkBL();
  },
  checkBL: function(){
    document.getElementById('blCount').textContent='已移动: '+gameState.blMoved+' 个';
    if(gameState.blA===gameState.blB){
      var fb=document.getElementById('blfb');
      if(gameState.blMoved===gameState.blAns){fb.textContent='✅ 完美！正好移动了'+gameState.blMoved+'个';fb.className='feedback ok';setStars('balance',3);celebrate();updateStarTotal();}
      else{fb.textContent='✅ 两边相等了！但可以移得更少（最优：'+gameState.blAns+'个）';fb.className='feedback ok';}
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.balance;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.blAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>移动</span><input class="answer-input" id="blAns"><span>个</span><button class="btn btn-p" onclick="GAMES.balance.check3()">确认</button></div>'+
      '<p class="feedback" id="blfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('blAns').value),fb=document.getElementById('blfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.blAns3){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('balance',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 移动数=(多出的)÷2';fb.className='feedback err';}
  }
};

// 4. 简单推理
GAMES.simplelogic = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 140" width="100%" height="120">'+
      '<circle cx="80" cy="50" r="30" fill="#fff5f5" stroke="#ff6b6b" stroke-width="2"/><text x="80" y="45" text-anchor="middle" font-size="20">小明</text><text x="80" y="65" text-anchor="middle" font-size="12" fill="#868e96">?</text>'+
      '<circle cx="180" cy="50" r="30" fill="#f0fffc" stroke="#4ecdc4" stroke-width="2"/><text x="180" y="45" text-anchor="middle" font-size="20">小红</text><text x="180" y="65" text-anchor="middle" font-size="12" fill="#868e96">🍌</text>'+
      '<circle cx="280" cy="50" r="30" fill="#fff8e1" stroke="#feca57" stroke-width="2"/><text x="280" y="45" text-anchor="middle" font-size="20">小华</text><text x="280" y="65" text-anchor="middle" font-size="12" fill="#868e96">?</text>'+
      '<line x1="110" y1="50" x2="150" y2="50" stroke="#adb5bd" stroke-width="1"/><line x1="210" y1="50" x2="250" y2="50" stroke="#adb5bd" stroke-width="1"/>'+
      '<text x="100" y="25" font-size="10" fill="#ff6b6b">不拿🍎</text>'+
      '<text x="180" y="100" font-size="10" fill="#4ecdc4">线索：拿🍌</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>根据线索②：小红拿<span class="highlight">🍌</span></div>'+
      '<div class="step"><span class="step-num">2</span>剩下🍎和🍇，线索①：小明不拿🍎 → 小明拿<span class="highlight">🍇</span></div>'+
      '<div class="step"><span class="step-num">3</span>最后小华拿<span class="highlight">🍎</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 推理口诀：<b>先确定已知，再排除不可能，剩下就是答案</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.simplelogic;
    var pz=pool[Math.floor(Math.random()*pool.length)];
    gameState.slPuzzle=pz;
    var h='<p style="font-weight:700;text-align:center">三人分别拿着：'+pz.items.join('、')+'</p>';
    h+='<p style="font-size:14px;color:#636e72;text-align:center">线索：'+pz.clues.map(function(c,i){return (i+1)+'、'+c;}).join('；')+'</p>';
    h+='<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center">';
    pz.people.forEach(function(person){
      h+='<div style="text-align:center"><div style="font-weight:700;margin-bottom:6px">'+person+'</div>';
      pz.items.forEach(function(item){
        h+='<div class="item-chip sl-choice" data-person="'+person+'" data-item="'+item+'" onclick="GAMES.simplelogic.choose(this)" style="margin:3px">'+item+'</div>';
      });
      h+='</div>';
    });
    h+='</div><p class="feedback" id="slfb">点击每个人对应的物品吧！</p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    container.innerHTML=h;
  },
  choose: function(el){
    var person=el.dataset.person,item=el.dataset.item;
    document.querySelectorAll('.sl-choice[data-person="'+person+'"]').forEach(function(c){c.classList.remove('selected');});
    el.classList.add('selected');
    var all=document.querySelectorAll('.sl-choice.selected');
    if(all.length===gameState.slPuzzle.people.length){
      var correct=true;
      all.forEach(function(a){ if(gameState.slPuzzle.ans[a.dataset.person]!==a.dataset.item) correct=false; });
      var fb=document.getElementById('slfb');
      if(correct){fb.textContent='✅ 推理正确！太棒了！';fb.className='feedback ok';setStars('simplelogic',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 有些不对哦，再想想线索';fb.className='feedback err';}
    }
  },
  stage3: function(container){ GAMES.simplelogic.stage2(container); }
};

// 5. 排队问题
GAMES.queue = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 80" width="100%" height="70">'+
      '<rect x="5" y="20" width="38" height="32" rx="6" fill="#f0f4ff"/><text x="24" y="42" text-anchor="middle" font-size="16">👫</text>'+
      '<rect x="48" y="20" width="38" height="32" rx="6" fill="#f0f4ff"/><text x="67" y="42" text-anchor="middle" font-size="16">👫</text>'+
      '<rect x="91" y="16" width="38" height="40" rx="6" fill="#fff5f5" stroke="#ff6b6b" stroke-width="2"/><text x="110" y="42" text-anchor="middle" font-size="20">🧑</text>'+
      '<rect x="134" y="20" width="38" height="32" rx="6" fill="#f0f4ff"/><text x="153" y="42" text-anchor="middle" font-size="16">👫</text>'+
      '<rect x="177" y="20" width="38" height="32" rx="6" fill="#f0f4ff"/><text x="196" y="42" text-anchor="middle" font-size="16">👫</text>'+
      '<rect x="220" y="20" width="38" height="32" rx="6" fill="#f0f4ff"/><text x="239" y="42" text-anchor="middle" font-size="16">👫</text>'+
      '<text x="110" y="68" text-anchor="middle" font-size="11" fill="#ff6b6b">左数第3</text>'+
      '<text x="110" y="80" text-anchor="middle" font-size="11" fill="#4ecdc4">右数第4</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>小明从左边数是第<span class="highlight">3</span>个，从右边数是第<span class="highlight">4</span>个</div>'+
      '<div class="step"><span class="step-num">2</span>小明被数了两次，所以要减去一次</div>'+
      '<div class="step"><span class="step-num">3</span>总人数 = 3 + 4 - 1 = <span class="highlight">6人</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 排队问题公式：<b>总人数 = 左数位置 + 右数位置 - 1</b></div>';
  },
  stage2: function(container){
    var total=genRandInt(5,12),pos=genRandInt(2,total-1);
    var fromLeft=pos,fromRight=total-pos+1;
    gameState.qTotal=total;gameState.qFromLeft=fromLeft;gameState.qFromRight=fromRight;
    gameState.qAns2=total;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">小明从左数排第<b>'+fromLeft+'</b>，从右数排第<b>'+fromRight+'</b></p>'+
      '<div style="font-size:24px;text-align:center;letter-spacing:2px">'+
      Array.from({length:total},function(_,i){return '<span'+(i===pos-1?' style="font-size:36px"':'')+'>'+(i===pos-1?'🧑':'👫')+'</span>';}).join('')+
      '</div><p style="text-align:center">👈 左 &nbsp;&nbsp;&nbsp; 右 👉</p>'+
      '<div class="answer-row"><span>一共</span><input class="answer-input" id="qAns"><span>人</span><button class="btn btn-p" onclick="GAMES.queue.check2()">确认</button></div>'+
      '<p class="feedback" id="qfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check2: function(){
    var ans=parseInt(document.getElementById('qAns').value),fb=document.getElementById('qfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.qAns2){fb.textContent='✅ 正确！'+gameState.qFromLeft+'+'+gameState.qFromRight+'-1='+gameState.qAns2;fb.className='feedback ok';setStars('queue',2);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 公式：左数+右数-1';fb.className='feedback err';}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.queue;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.qAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="qAns3"><button class="btn btn-p" onclick="GAMES.queue.check3()">确认</button></div>'+
      '<p class="feedback" id="qfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('qAns3').value),fb=document.getElementById('qfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.qAns3){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('queue',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 再想想公式：左数+右数-1';fb.className='feedback err';}
  }
};

// === appended test ===

// ══════════════════ 三年级 ══════════════════

// 11. 和倍问题
GAMES.summulti = {
  stage1: function(container){
    var b=8,mult=3,sum=b+mult*b;
    container.innerHTML=
      '<p style="text-align:center;font-size:15px">已知两数之和='+sum+'，大数是小数的'+mult+'倍</p>'+
      drawBarModel(mult*b,b,'大数','小数',mult,sum-b)+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>线段图：大数有3段，小数有1段，共<span class="highlight">4段</span></div>'+
      '<div class="step"><span class="step-num">2</span>小数 = 和÷(倍数+1) = '+sum+'÷4 = <span class="highlight">'+b+'</span></div>'+
      '<div class="step"><span class="step-num">3</span>大数 = 小数×倍数 = '+b+'×3 = <span class="highlight">'+(mult*b)+'</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 和倍公式：<b>小数 = 和÷(倍数+1)，大数 = 小数×倍数</b></div>';
  },
  stage2: function(container){
    gameState.smB=genRandInt(4,15);gameState.smMult=genRandInt(2,4);
    GAMES.summulti.updateSM();
  },
  updateSM: function(){
    var container=document.getElementById('stageContent');
    var mult=gameState.smMult,b=gameState.smB,sum=b*(mult+1);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">调整倍数，观察变化！</p>'+
      '<div class="slider-grp"><label>倍数</label><span class="slider-val" id="smMultV">'+mult+'倍</span><input type="range" id="smMultS" min="2" max="5" value="'+mult+'" oninput="GAMES.summulti.slide()"></div>'+
      '<div class="slider-grp"><label>小数</label><span class="slider-val" id="smBV">'+b+'</span><input type="range" id="smBS" min="3" max="20" value="'+b+'" oninput="GAMES.summulti.slide()"></div>'+
      '<p style="text-align:center">和 = <b id="smSumV">'+sum+'</b></p><div id="smBar">'+drawBarModel(b*mult,b,'大数','小数',mult,b*(mult-1))+'</div>';
  },
  slide: function(){
    gameState.smMult=parseInt(document.getElementById('smMultS').value);
    gameState.smB=parseInt(document.getElementById('smBS').value);
    document.getElementById('smMultV').textContent=gameState.smMult+'倍';
    document.getElementById('smBV').textContent=gameState.smB;
    document.getElementById('smSumV').textContent=gameState.smB*(gameState.smMult+1);
    document.getElementById('smBar').innerHTML=drawBarModel(gameState.smB*gameState.smMult,gameState.smB,'大数','小数',gameState.smMult,gameState.smB*(gameState.smMult-1));
  },
  stage3: function(container){
    var pool=QUESTION_BANK.summulti;
    var p=pool[Math.floor(Math.random()*pool.length)];
    var parts=p.ans.toString().split(',');
    gameState.smAnsA=parseInt(parts[0]);gameState.smAnsB=parseInt(parts[1]);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>小数=</span><input class="answer-input" id="smB"><span>大数=</span><input class="answer-input" id="smA"><button class="btn btn-p" onclick="GAMES.summulti.check3()">确认</button></div>'+
      '<p class="feedback" id="smfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var a=parseInt(document.getElementById('smA').value),b=parseInt(document.getElementById('smB').value),fb=document.getElementById('smfb');
    if(isNaN(a)||isNaN(b)){fb.textContent='请填写完整';return}
    if(a===gameState.smAnsA&&b===gameState.smAnsB){fb.textContent='✅ 全对！';fb.className='feedback ok';setStars('summulti',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 小数=和÷(倍数+1)';fb.className='feedback err';}
  }
};

// 12. 差倍问题
GAMES.diffmulti = {
  stage1: function(container){
    var b=5,mult=3,diff=b*(mult-1);
    container.innerHTML=
      '<p style="text-align:center;font-size:15px">已知两数之差='+diff+'，大数是小数的'+mult+'倍</p>'+
      drawBarModel(mult*b,b,'大数','小数',mult,diff)+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>线段图：大数3段，小数1段，差<span class="highlight">2段</span>= '+diff+'</div>'+
      '<div class="step"><span class="step-num">2</span>小数 = 差÷(倍数-1) = '+diff+'÷2 = <span class="highlight">'+b+'</span></div>'+
      '<div class="step"><span class="step-num">3</span>大数 = 小数×倍数 = '+b+'×3 = <span class="highlight">'+(mult*b)+'</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 差倍公式：<b>小数 = 差÷(倍数-1)，大数 = 小数×倍数</b></div>';
  },
  stage2: function(container){
    gameState.dmB=genRandInt(3,12);gameState.dmMult=genRandInt(2,5);
    GAMES.diffmulti.renderDM();
  },
  renderDM: function(){
    var container=document.getElementById('stageContent');
    var b=gameState.dmB,mult=gameState.dmMult,diff=b*(mult-1);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">调整倍数和差，观察线段图的变化</p>'+
      '<div class="slider-grp"><label>倍数</label><span class="slider-val" id="dmMultV">'+mult+'倍</span><input type="range" id="dmMultS" min="2" max="5" value="'+mult+'" oninput="GAMES.diffmulti.updateDM()"></div>'+
      '<div class="slider-grp"><label>小数</label><span class="slider-val" id="dmBV">'+b+'</span><input type="range" id="dmBS" min="2" max="20" value="'+b+'" oninput="GAMES.diffmulti.updateDM()"></div>'+
      '<p style="text-align:center">差 = <b id="dmDiffV">'+diff+'</b></p><div id="dmBar">'+drawBarModel(b*mult,b,'大数','小数',mult,diff)+'</div>';
  },
  updateDM: function(){
    gameState.dmB=parseInt(document.getElementById('dmBS').value);
    gameState.dmMult=parseInt(document.getElementById('dmMultS').value);
    document.getElementById('dmMultV').textContent=gameState.dmMult+'倍';
    document.getElementById('dmBV').textContent=gameState.dmB;
    var diff=gameState.dmB*(gameState.dmMult-1);
    document.getElementById('dmDiffV').textContent=diff;
    document.getElementById('dmBar').innerHTML=drawBarModel(gameState.dmB*gameState.dmMult,gameState.dmB,'大数','小数',gameState.dmMult,diff);
  },
  stage3: function(container){
    var pool=QUESTION_BANK.diffmulti;
    var p=pool[Math.floor(Math.random()*pool.length)];
    var parts=p.ans.toString().split(',');
    gameState.dmAnsA=parseInt(parts[0]);gameState.dmAnsB=parseInt(parts[1]);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>小数=</span><input class="answer-input" id="dmB"><span>大数=</span><input class="answer-input" id="dmA"><button class="btn btn-p" onclick="GAMES.diffmulti.check3()">确认</button></div>'+
      '<p class="feedback" id="dmfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var a=parseInt(document.getElementById('dmA').value),b=parseInt(document.getElementById('dmB').value),fb=document.getElementById('dmfb');
    if(isNaN(a)||isNaN(b)){fb.textContent='请填写完整';return}
    if(a===gameState.dmAnsA&&b===gameState.dmAnsB){fb.textContent='✅ 全对！';fb.className='feedback ok';setStars('diffmulti',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 小数=差÷(倍数-1)';fb.className='feedback err';}
  }
};

// 13. 年龄问题
GAMES.age = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 130" width="100%" height="110">'+
      '<text x="30" y="30" font-size="13" font-weight="700" fill="#495057">时间线：</text>'+
      '<line x1="100" y1="25" x2="340" y2="25" stroke="#adb5bd" stroke-width="2"/>'+
      '<circle cx="120" cy="25" r="5" fill="#a29bfe"/><text x="120" y="15" text-anchor="middle" font-size="10" fill="#a29bfe">3年前</text>'+
      '<circle cx="220" cy="25" r="6" fill="#ff6b6b"/><text x="220" y="15" text-anchor="middle" font-size="10" fill="#ff6b6b">今年</text>'+
      '<circle cx="300" cy="25" r="5" fill="#4ecdc4"/><text x="300" y="15" text-anchor="middle" font-size="10" fill="#4ecdc4">5年后</text>'+
      '<rect x="110" y="55" width="220" height="60" rx="10" fill="#fff5f5"/>'+
      '<text x="165" y="77" text-anchor="middle" font-size="14">👨爸爸: 35→38</text>'+
      '<text x="165" y="105" text-anchor="middle" font-size="12" fill="#ff6b6b">年龄差 27 不变！</text>'+
      '<text x="275" y="77" text-anchor="middle" font-size="14">👦小明: 8→11</text>'+
      '<text x="275" y="105" text-anchor="middle" font-size="12" fill="#4ecdc4">年龄差 27 不变！</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>核心概念：<span class="highlight">年龄差永远不变</span></div>'+
      '<div class="step"><span class="step-num">2</span>过去、现在、将来，两人的年龄差都一样</div>'+
      '<div class="step"><span class="step-num">3</span>年龄问题本质是<span class="highlight">差倍问题</span>：差=年龄差，倍数=年龄倍数关系</div>'+
      '</div>'+
      '<div class="formula-box">📌 年龄问题关键：<b>年龄差不变 → 转化为差倍问题求解</b></div>';
  },
  stage2: function(container){
    gameState.ageDad=35;gameState.ageKid=8;gameState.ageYear=0;
    GAMES.age.renderAge();
  },
  renderAge: function(){
    var container=document.getElementById('stageContent');
    var dad=gameState.ageDad+gameState.ageYear,kid=gameState.ageKid+gameState.ageYear;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">年龄差永远不变</p>'+
      '<div class="slider-grp"><label>时间穿越 (±15年)</label><span class="slider-val" id="ageYV">'+(gameState.ageYear>=0?'+':'')+gameState.ageYear+'年</span><input type="range" id="ageYS" min="-15" max="15" value="'+gameState.ageYear+'" oninput="GAMES.age.slide()"></div>'+
      '<div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">'+
      '<div style="text-align:center"><div style="font-size:50px">👨</div><div style="font-weight:700">爸爸: <b style="color:#ff6b6b;font-size:22px">'+dad+'</b>岁</div></div>'+
      '<div style="text-align:center"><div style="font-size:50px">👦</div><div style="font-weight:700">小明: <b style="color:#4ecdc4;font-size:22px">'+kid+'</b>岁</div></div>'+
      '</div>'+
      '<p style="text-align:center;font-size:18px;background:#f8f9fa;padding:8px 16px;border-radius:12px">年龄差 = '+dad+' - '+kid+' = <b style="color:#ff6b6b">'+(dad-kid)+'</b> 岁（不变！）</p>';
  },
  slide: function(){
    gameState.ageYear=parseInt(document.getElementById('ageYS').value);
    GAMES.age.renderAge();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.age;
    var p=pool[Math.floor(Math.random()*pool.length)];
    if(p.ans.toString().indexOf(',')>-1){
      var parts=p.ans.toString().split(',');
      gameState.ageAnsD=parseInt(parts[0]);gameState.ageAnsK=parseInt(parts[1]);
      gameState.ageMode='two';
    }else{
      gameState.ageAns3=p.ans;
      gameState.ageMode='one';
    }
    gameState.ageQ=p.q;gameState.ageHint=p.hint;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      (gameState.ageMode==='two'?
      '<div class="answer-row"><span>小明</span><input class="answer-input" id="ageK"><span>岁</span><span>爸爸</span><input class="answer-input" id="ageD"><span>岁</span><button class="btn btn-p" onclick="GAMES.age.check3()">确认</button></div>':
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="ageAns"><button class="btn btn-p" onclick="GAMES.age.check3()">确认</button></div>')+
      '<p class="feedback" id="agefb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var fb=document.getElementById('agefb');
    if(gameState.ageMode==='two'){
      var k=parseInt(document.getElementById('ageK').value),d=parseInt(document.getElementById('ageD').value);
      if(isNaN(k)||isNaN(d)){fb.textContent='请填写完整';return}
      if(k===gameState.ageAnsK&&d===gameState.ageAnsD){fb.textContent='✅ 全对！年龄差不变，用差倍公式';fb.className='feedback ok';setStars('age',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 年龄差不变，用差倍公式';fb.className='feedback err';}
    }else{
      var ans=parseInt(document.getElementById('ageAns').value);
      if(isNaN(ans)){fb.textContent='请输入数字';return}
      if(ans===gameState.ageAns3){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('age',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 年龄差不变，找对倍数关系';fb.className='feedback err';}
    }
  }
};

// 14. 盈亏问题
GAMES.profitloss = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 120" width="100%" height="100">'+
      '<rect x="10" y="10" width="150" height="45" rx="8" fill="#fff5f5"/><text x="85" y="30" text-anchor="middle" font-size="12">方案A：每人5颗</text><text x="85" y="48" text-anchor="middle" font-size="12" fill="#ff6b6b">少3颗（亏）</text>'+
      '<rect x="190" y="10" width="150" height="45" rx="8" fill="#f0fffc"/><text x="265" y="30" text-anchor="middle" font-size="12">方案B：每人3颗</text><text x="265" y="48" text-anchor="middle" font-size="12" fill="#4ecdc4">多7颗（盈）</text>'+
      '<text x="50" y="85" text-anchor="middle" font-size="12" fill="#a29bfe">分法差 = 5-3 = 2</text>'+
      '<text x="200" y="85" text-anchor="middle" font-size="12" fill="#f59f00">盈+亏 = 7+3 = 10</text>'+
      '<text x="320" y="85" text-anchor="middle" font-size="14" font-weight="700" fill="#ff6b6b">人数=10÷2=5</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>盈亏问题核心：两种分法，<span class="highlight">总数不变</span></div>'+
      '<div class="step"><span class="step-num">2</span>总差 = 盈 + 亏 = 每人分法之差 × 人数</div>'+
      '<div class="step"><span class="step-num">3</span>人数 = (盈+亏) ÷ (分法差)</div>'+
      '</div>'+
      '<div class="formula-box">📌 盈亏公式：<b>人数 = (盈+亏) ÷ (分法之差)</b></div>';
  },
  stage2: function(container){
    var people=genRandInt(4,8),perA=genRandInt(3,7),perB=perA-genRandInt(2,Math.min(4,perA-1));
    var candies=people*perA-genRandInt(1,perA-1);
    gameState.plPeople=people;gameState.plCandies=candies;gameState.plPerA=perA;gameState.plPerB=perB;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">分糖果🍬</p>'+
      '<div class="slider-grp"><label>每人分几个(方案1)</label><span class="slider-val" id="plPerAV">'+perA+'个</span><input type="range" id="plPerAS" min="2" max="10" value="'+perA+'" oninput="GAMES.profitloss.updatePL()"></div>'+
      '<div class="slider-grp"><label>每人分几个(方案2)</label><span class="slider-val" id="plPerBV">'+perB+'个</span><input type="range" id="plPerBS" min="1" max="8" value="'+perB+'" oninput="GAMES.profitloss.updatePL()"></div>'+
      '<div id="plViz" style="text-align:center;font-size:36px"></div><p id="plInfo" style="text-align:center;font-weight:600"></p><p class="feedback" id="plfb"></p>';
    GAMES.profitloss.updatePL();
  },
  updatePL: function(){
    var pA=parseInt(document.getElementById('plPerAS').value),pB=parseInt(document.getElementById('plPerBS').value);
    document.getElementById('plPerAV').textContent=pA+'个';document.getElementById('plPerBV').textContent=pB+'个';
    var needA=gameState.plPeople*pA,needB=gameState.plPeople*pB;
    var diffA=gameState.plCandies-needA,diffB=gameState.plCandies-needB;
    document.getElementById('plViz').innerHTML='🧑‍🎓'.repeat(gameState.plPeople)+'<br><span style="font-size:13px">'+gameState.plPeople+'人，共'+gameState.plCandies+'颗糖</span>';
    document.getElementById('plInfo').innerHTML='方案1 ('+pA+'个/人): 需要'+needA+'颗 → '+(diffA>=0?'多'+diffA:'少'+(-diffA))+'颗<br>方案2 ('+pB+'个/人): 需要'+needB+'颗 → '+(diffB>=0?'多'+diffB:'少'+(-diffB))+'颗';
  },
  stage3: function(container){
    var pool=QUESTION_BANK.profitloss;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.plAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>人数=</span><input class="answer-input" id="plAns3"><button class="btn btn-p" onclick="GAMES.profitloss.check3()">确认</button></div>'+
      '<p class="feedback" id="plfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('plAns3').value),fb=document.getElementById('plfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.plAns3){fb.textContent='✅ 正确！人数=(盈+亏)÷分法差';fb.className='feedback ok';setStars('profitloss',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 公式：(盈+亏)÷(分法之差)';fb.className='feedback err';}
  }
};

// 15. 还原问题
GAMES.reverse = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 100" width="100%" height="90">'+
      '<text x="170" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="#495057">正向：</text>'+
      '<rect x="30" y="28" width="50" height="30" rx="6" fill="#fff5f5"/><text x="55" y="48" text-anchor="middle" font-size="18">5</text>'+
      '<text x="95" y="50" font-size="16">→ +5 →</text>'+
      '<rect x="140" y="28" width="50" height="30" rx="6" fill="#f0fffc"/><text x="165" y="48" text-anchor="middle" font-size="18">10</text>'+
      '<text x="205" y="50" font-size="16">→ ×3 →</text>'+
      '<rect x="250" y="28" width="50" height="30" rx="6" fill="#fff8e1"/><text x="275" y="48" text-anchor="middle" font-size="18">30</text>'+
      '<text x="170" y="73" text-anchor="middle" font-size="13" font-weight="700" fill="#495057">倒推：</text>'+
      '<text x="95" y="75" font-size="12" fill="#ff6b6b">← -5 ←</text>'+
      '<text x="205" y="75" font-size="12" fill="#4ecdc4">← ÷3 ←</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>正着想：原来 → +a → ×b → -c = 结果</div>'+
      '<div class="step"><span class="step-num">2</span><span class="highlight">倒推</span>：结果 → +c → ÷b → -a = 原来</div>'+
      '<div class="step"><span class="step-num">3</span>加减互换，乘除互换，顺序倒过来</div>'+
      '</div>'+
      '<div class="formula-box">📌 还原问题口诀：<b>正向算，反向推；加减互换，乘除互换</b></div>';
  },
  stage2: function(container){
    var x=genRandInt(2,9),a=genRandInt(2,8),b=genRandInt(2,4),c=genRandInt(3,Math.min(10,(x+a)*b-1));
    var r=(x+a)*b-c;
    gameState.rvX=x;gameState.rvA=a;gameState.rvB=b;gameState.rvC=c;gameState.rvR=r;
    gameState.rvStep=0;gameState.rvCur=r;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">一个数经过3步运算得到 <b style="color:#ff6b6b;font-size:22px">'+r+'</b></p>'+
      '<div style="text-align:center;font-size:16px;line-height:2.2">? → <b style="color:#4ecdc4">+'+a+'</b> → <b style="color:#feca57">×'+b+'</b> → <b style="color:#fd79a8">-'+c+'</b> = '+r+'</div>'+
      '<p style="text-align:center;font-size:14px;color:#636e72">点击按钮逐步倒推还原</p>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center" id="rvBtns">'+
      '<button class="btn btn-p" onclick="GAMES.reverse.step(\'add\','+c+')">① 先 +'+c+'（减变加）</button>'+
      '<button class="btn btn-s" onclick="GAMES.reverse.step(\'div\','+b+')">② 再 ÷'+b+'（乘变除）</button>'+
      '<button class="btn btn-o" onclick="GAMES.reverse.step(\'sub\','+a+')">③ 最后 -'+a+'（加变减）</button></div>'+
      '<p class="feedback" id="rvfb">当前值: <b>'+r+'</b>（从结果开始）</p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  step: function(op,val){
    var fb=document.getElementById('rvfb'),btns=document.getElementById('rvBtns');
    if(op==='add'&&gameState.rvStep===0){gameState.rvCur+=val;gameState.rvStep++;fb.innerHTML='当前值: <b>'+gameState.rvCur+'</b>（+'+val+'后）';btns.children[0].disabled=true;}
    else if(op==='div'&&gameState.rvStep===1){gameState.rvCur/=val;gameState.rvStep++;fb.innerHTML='当前值: <b>'+gameState.rvCur+'</b>（÷'+val+'后）';btns.children[1].disabled=true;}
    else if(op==='sub'&&gameState.rvStep===2){gameState.rvCur-=val;gameState.rvStep++;fb.innerHTML='当前值: <b>'+gameState.rvCur+'</b>（-'+val+'后）';btns.children[2].disabled=true;}
    if(gameState.rvStep===3){
      if(gameState.rvCur===gameState.rvX){fb.innerHTML='🎉 还原成功！原来的数是 <b style="color:#ff6b6b;font-size:20px">'+gameState.rvX+'</b>';fb.className='feedback ok';setStars('reverse',2);celebrate();updateStarTotal();}
      else{fb.innerHTML='❌ 结果不对，你再检查一下步骤顺序';fb.className='feedback err';}
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.reverse;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.rvAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>原来的数=</span><input class="answer-input" id="rvAns3"><button class="btn btn-p" onclick="GAMES.reverse.check3()">确认</button></div>'+
      '<p class="feedback" id="rvfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('rvAns3').value),fb=document.getElementById('rvfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.rvAns3){fb.textContent='✅ 正确！从结果倒推还原';fb.className='feedback ok';setStars('reverse',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 从结果倒推：运算相反，顺序倒过来';fb.className='feedback err';}
  }
};

// 16. 平均数
GAMES.average = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 120" width="100%" height="100">'+
      '<rect x="20" y="10" width="60" height="90" rx="4" fill="#fff5f5"/><text x="50" y="40" text-anchor="middle" font-size="20">90</text>'+
      '<rect x="110" y="6" width="60" height="96" rx="4" fill="#f0fffc"/><text x="140" y="40" text-anchor="middle" font-size="20">96</text>'+
      '<rect x="200" y="13" width="60" height="87" rx="4" fill="#fff8e1"/><text x="230" y="40" text-anchor="middle" font-size="20">87</text>'+
      '<line x1="30" y1="109" x2="250" y2="109" stroke="#4ecdc4" stroke-width="2" stroke-dasharray="6,3"/>'+
      '<text x="140" y="115" text-anchor="middle" font-size="13" fill="#4ecdc4" font-weight="700">← 平均91分 →</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>平均数代表一组数据的<span class="highlight">平均水平</span></div>'+
      '<div class="step"><span class="step-num">2</span>平均数 = 总和 ÷ 个数</div>'+
      '<div class="step"><span class="step-num">3</span>(90+96+87)÷3 = 273÷3 = <span class="highlight">91</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 平均数公式：<b>平均数 = 总和 ÷ 个数</b></div>';
  },
  stage2: function(container){
    var vals=[genRandInt(60,100),genRandInt(60,100),genRandInt(60,100),genRandInt(60,100)];
    gameState.avVals=vals;gameState.avSum=vals.reduce(function(a,b){return a+b;},0);gameState.avAvg=gameState.avSum/vals.length;
    GAMES.average.renderAV();
  },
  renderAV: function(){
    var container=document.getElementById('stageContent');
    var vals=gameState.avVals,sum=vals.reduce(function(a,b){return a+b;},0),avg=sum/vals.length;
    var cols=['#ff6b6b','#4ecdc4','#feca57','#a29bfe'];
    var h='<p style="text-align:center;font-weight:700">调整数值，观察平均数变化</p>';
    h+='<div style="display:flex;gap:8px;align-items:flex-end;justify-content:center;height:140px">';
    vals.forEach(function(v,i){
      h+='<div style="text-align:center"><input type="number" class="answer-input" value="'+v+'" style="width:50px;margin-bottom:4px" onchange="GAMES.average.changeVal('+i+',this.value)"><div style="width:44px;height:'+v+'px;background:'+cols[i]+';border-radius:6px 6px 0 0;margin:0 auto"></div></div>';
    });
    h+='</div>';
    h+='<p style="text-align:center;font-size:18px;margin-top:12px">总和 = <b>'+sum+'</b> &nbsp; 平均数 = <b style="color:#ff6b6b">'+avg.toFixed(1)+'</b></p>';
    h+='<p style="text-align:center;font-size:13px;color:#adb5bd">平均数 = 总和 ÷ '+vals.length+' = '+sum+'÷'+vals.length+' = '+avg.toFixed(1)+'</p>';
    h+='<button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button>';
    container.innerHTML=h;
  },
  changeVal: function(i,newVal){
    var v=parseInt(newVal);if(isNaN(v)||v<0)return;
    gameState.avVals[i]=v;gameState.avSum=gameState.avVals.reduce(function(a,b){return a+b;},0);gameState.avAvg=gameState.avSum/gameState.avVals.length;
    GAMES.average.renderAV();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.average;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.avAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="avAns3"><button class="btn btn-p" onclick="GAMES.average.check3()">确认</button></div>'+
      '<p class="feedback" id="avfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('avAns3').value),fb=document.getElementById('avfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.avAns3)<0.1){fb.textContent='✅ 正确！平均='+gameState.avAns3;fb.className='feedback ok';setStars('average',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ (总和)÷个数';fb.className='feedback err';}
  }
};

// ══════════════════ 四年级 ══════════════════

// 17. 鸡兔同笼
GAMES.chickenrabbit = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 130" width="100%" height="115">'+
      '<rect x="10" y="10" width="160" height="55" rx="10" fill="#fff5f5"/>'+
      '<text x="90" y="30" text-anchor="middle" font-size="13" font-weight="700" fill="#ff6b6b">假设全是鸡🐔</text>'+
      '<text x="90" y="50" text-anchor="middle" font-size="12" fill="#495057">5头→10条腿(少了4条)</text>'+
      '<text x="200" y="35" font-size="24">→</text>'+
      '<rect x="230" y="10" width="120" height="55" rx="10" fill="#f0fffc"/>'+
      '<text x="290" y="30" text-anchor="middle" font-size="13" font-weight="700" fill="#4ecdc4">换兔🐰</text>'+
      '<text x="290" y="50" text-anchor="middle" font-size="12" fill="#495057">每换1只+2条腿</text>'+
      '<text x="180" y="90" text-anchor="middle" font-size="14" font-weight="700" fill="#495057">少了4条 → 换4÷2=<span style="color:#ff6b6b">2只兔</span>，<span style="color:#4ecdc4">3只鸡</span></text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span><span class="highlight">假设法</span>：假设全是鸡，算出总腿数</div>'+
      '<div class="step"><span class="step-num">2</span>与实际腿数比较，求出<span class="highlight">差值</span></div>'+
      '<div class="step"><span class="step-num">3</span>每把1只鸡换成1只兔，腿数<span class="highlight">+2</span>。差值÷2 = 兔的只数</div>'+
      '</div>'+
      '<div class="formula-box">📌 鸡兔同笼：《孙子算经》经典题 — <b>假设→比较→替换</b></div>';
  },
  stage2: function(container){
    gameState.crHeads=genRandInt(5,10);
    gameState.crRabbits=genRandInt(1,gameState.crHeads-1);
    gameState.crChickens=gameState.crHeads-gameState.crRabbits;
    gameState.crLegs=gameState.crChickens*2+gameState.crRabbits*4;
    gameState.crCurChickens=gameState.crHeads;gameState.crCurRabbits=0;
    gameState.crCurLegs=gameState.crHeads*2;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">共<b>'+gameState.crHeads+'</b>个头，<b>'+gameState.crLegs+'</b>条腿</p>'+
      '<div style="display:flex;gap:24px;justify-content:center;font-size:30px;align-items:center">'+
      '<div style="text-align:center"><div id="crChickens"></div><div style="font-size:13px">鸡 (<span id="crCC">'+gameState.crChickens+'</span>只)</div></div>'+
      '<div style="text-align:center"><div id="crRabbits"></div><div style="font-size:13px">兔 (<span id="crRC">0</span>只)</div></div>'+
      '</div>'+
      '<p>当前腿数: <b id="crLegCount">'+gameState.crCurLegs+'</b> / 目标: <b>'+gameState.crLegs+'</b></p>'+
      '<div style="display:flex;gap:8px"><button class="btn btn-p" onclick="GAMES.chickenrabbit.swapToRabbit()">🐔→🐰 换一只</button><button class="btn btn-s" onclick="GAMES.chickenrabbit.swapToChicken()">🐰→🐔 换一只</button></div>'+
      '<p class="feedback" id="crfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button>';
    GAMES.chickenrabbit.renderCR();
  },
  renderCR: function(){
    document.getElementById('crChickens').textContent='🐔'.repeat(gameState.crCurChickens);
    document.getElementById('crRabbits').textContent='🐰'.repeat(gameState.crCurRabbits);
    document.getElementById('crCC').textContent=gameState.crCurChickens;
    document.getElementById('crRC').textContent=gameState.crCurRabbits;
    document.getElementById('crLegCount').textContent=gameState.crCurLegs;
  },
  swapToRabbit: function(){
    if(gameState.crCurChickens<=0)return;
    gameState.crCurChickens--;gameState.crCurRabbits++;
    gameState.crCurLegs=gameState.crCurChickens*2+gameState.crCurRabbits*4;
    GAMES.chickenrabbit.renderCR();GAMES.chickenrabbit.checkCR();
  },
  swapToChicken: function(){
    if(gameState.crCurRabbits<=0)return;
    gameState.crCurRabbits--;gameState.crCurChickens++;
    gameState.crCurLegs=gameState.crCurChickens*2+gameState.crCurRabbits*4;
    GAMES.chickenrabbit.renderCR();GAMES.chickenrabbit.checkCR();
  },
  checkCR: function(){
    if(gameState.crCurLegs===gameState.crLegs){
      var fb=document.getElementById('crfb');
      fb.textContent='🎉 腿数对了！鸡='+gameState.crCurChickens+'只，兔='+gameState.crCurRabbits+'只';
      fb.className='feedback ok';setStars('chickenrabbit',2);celebrate();updateStarTotal();
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.chickenrabbit;
    var p=pool[Math.floor(Math.random()*pool.length)];
    var parts=p.ans.toString().split(',');
    gameState.crAnsC=parseInt(parts[0]);gameState.crAnsR=parseInt(parts[1]);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>🐔鸡</span><input class="answer-input" id="crAC"><span>只</span><span>🐰兔</span><input class="answer-input" id="crAR"><span>只</span><button class="btn btn-p" onclick="GAMES.chickenrabbit.check3()">确认</button></div>'+
      '<p class="feedback" id="crfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var c=parseInt(document.getElementById('crAC').value),r=parseInt(document.getElementById('crAR').value),fb=document.getElementById('crfb3');
    if(isNaN(c)||isNaN(r)){fb.textContent='请填写完整';return}
    if(c===gameState.crAnsC&&r===gameState.crAnsR){fb.textContent='✅ 全对！';fb.className='feedback ok';setStars('chickenrabbit',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 用假设法：先假设全是鸡，再替换';fb.className='feedback err';}
  }
};

// 18. 容斥原理
GAMES.venn = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg">'+makeVennSVG()+'</div>'+
      '<p style="text-align:center;font-size:14px;color:#495057">🎯 喜欢🍎的12人 + 喜欢🍌的15人 - 都喜欢的8人 = <b>至少喜欢一种的19人</b></p>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>两个集合的<span class="highlight">并集</span>：A ∪ B</div>'+
      '<div class="step"><span class="step-num">2</span>A∪B = A + B - A∩B（减去<span class="highlight">重复计算</span>的部分）</div>'+
      '<div class="step"><span class="step-num">3</span>关键：重叠部分被算了两次，要减一次</div>'+
      '</div>'+
      '<div class="formula-box">📌 容斥公式：<b>A∪B = A + B - A∩B</b></div>';
  },
  stage2: function(container){
    gameState.vnA=genRandInt(8,18);gameState.vnB=genRandInt(8,18);
    gameState.vnBoth=genRandInt(2,Math.min(gameState.vnA,gameState.vnB)-2);
    GAMES.venn.renderVN();
  },
  renderVN: function(){
    var container=document.getElementById('stageContent');
    var a=gameState.vnA,b=gameState.vnB,both=gameState.vnBoth;
    var onlyA=a-both,onlyB=b-both,union=onlyA+onlyB+both;
    gameState.vnUnion=union;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">喜欢🍎的'+a+'人，喜欢🍌的'+b+'人，都喜欢的'+both+'人</p>'+
      makeVennSVG()+
      '<div style="text-align:center;font-size:14px">'+
      '<span style="color:#ff6b6b">● 只喜欢🍎: '+onlyA+'</span> &nbsp; '+
      '<span style="color:#4ecdc4">● 只喜欢🍌: '+onlyB+'</span> &nbsp; '+
      '<span style="color:#a29bfe">● 都喜欢: '+both+'</span>'+
      '</div>'+
      '<div class="answer-row"><span>至少喜欢一种:</span><input class="answer-input" id="vnAns"><button class="btn btn-p" onclick="GAMES.venn.check3()">确认</button></div>'+
      '<p class="feedback" id="vnfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('vnAns').value),fb=document.getElementById('vnfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.vnUnion){fb.textContent='✅ 正确！A+B-都='+gameState.vnA+'+'+gameState.vnB+'-'+gameState.vnBoth+'='+gameState.vnUnion;fb.className='feedback ok';setStars('venn',2);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 公式：A+B-都喜欢';fb.className='feedback err';}
  },
  stage3: function(container){ GAMES.venn.stage2(container); }
};

// 19. 抽屉原理
GAMES.pigeonhole = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 130" width="100%" height="110">'+
      '<text x="30" y="25" font-size="13" font-weight="700" fill="#495057">4个🍎放入3个抽屉📦</text>'+
      '<rect x="20" y="40" width="90" height="60" rx="8" fill="#fff5f5"/><text x="65" y="60" text-anchor="middle" font-size="24">🍎</text><text x="65" y="80" text-anchor="middle" font-size="12" fill="#868e96">至少有</text>'+
      '<rect x="130" y="40" width="90" height="60" rx="8" fill="#f0fffc"/><text x="175" y="60" text-anchor="middle" font-size="24">🍎🍎</text><text x="175" y="80" text-anchor="middle" font-size="12" fill="#868e96">一个</text>'+
      '<rect x="240" y="40" width="90" height="60" rx="8" fill="#fff8e1"/><text x="285" y="60" text-anchor="middle" font-size="24">🍎</text><text x="285" y="80" text-anchor="middle" font-size="12" fill="#868e96">抽屉≥2个</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span><span class="highlight">最坏情况</span>：尽可能平均分配</div>'+
      '<div class="step"><span class="step-num">2</span>4个苹果放3个抽屉，最坏情况每个抽屉1个（共3个）</div>'+
      '<div class="step"><span class="step-num">3</span>第4个无论放哪，都导致至少一个抽屉有<span class="highlight">≥2个</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 抽屉原理：<b>物品数 > 抽屉数×k → 至少一个抽屉有 ≥ k+1 个</b></div>';
  },
  stage2: function(container){
    gameState.phItems=genRandInt(4,10);gameState.phBoxes=genRandInt(2,4);
    gameState.phInBoxes=Array(gameState.phBoxes).fill(0);
    gameState.phRemaining=gameState.phItems;
    GAMES.pigeonhole.renderPH();
  },
  renderPH: function(){
    var container=document.getElementById('stageContent');
    var h='<p style="text-align:center;font-weight:700">把<b>'+gameState.phItems+'</b>个物品放入<b>'+gameState.phBoxes+'</b>个抽屉</p>';
    h+='<div style="display:flex;gap:10px;justify-content:center">';
    for(var i=0;i<gameState.phBoxes;i++){
      h+='<div style="background:#f8f9fa;padding:10px;border-radius:12px;text-align:center;cursor:pointer;min-width:60px" onclick="GAMES.pigeonhole.addTo('+i+')">📦<br><span style="font-size:22px">'+'🍎'.repeat(gameState.phInBoxes[i])+'</span><br><span style="font-size:12px">抽屉'+(i+1)+'('+gameState.phInBoxes[i]+'个)</span></div>';
    }
    h+='</div><p>剩余: <b>'+gameState.phRemaining+'</b>个🍎</p><p style="font-size:13px;color:#adb5bd">点击抽屉放入🍎</p>';
    var maxInOne=Math.max.apply(null,gameState.phInBoxes);
    h+='<p style="font-weight:700">最多的抽屉有: <b style="color:#ff6b6b">'+maxInOne+'</b>个</p>';
    if(gameState.phRemaining===0){
      h+='<p class="feedback ok">✅ 全部放完！至少有一个抽屉有'+maxInOne+'个</p>';
    }
    h+='<button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button>';
    container.innerHTML=h;
  },
  addTo: function(i){
    if(gameState.phRemaining<=0)return;
    gameState.phInBoxes[i]++;gameState.phRemaining--;
    GAMES.pigeonhole.renderPH();
    if(gameState.phRemaining===0){setStars('pigeonhole',2);celebrate();updateStarTotal();}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.pigeonhole;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.phAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>不少于</span><input class="answer-input" id="phAns3"><span>个</span><button class="btn btn-p" onclick="GAMES.pigeonhole.check3()">确认</button></div>'+
      '<p class="feedback" id="phfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('phAns3').value),fb=document.getElementById('phfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.phAns3){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('pigeonhole',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 考虑最坏情况：平均分配后向上取整';fb.className='feedback err';}
  }
};

// 20. 逻辑推理(真假话)
GAMES.logic = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 110" width="100%" height="95">'+
      '<rect x="20" y="10" width="150" height="70" rx="10" fill="#fff5f5"/><text x="95" y="30" text-anchor="middle" font-size="14" font-weight="700">甲说："是乙"</text><text x="95" y="50" text-anchor="middle" font-size="12" fill="#868e96">假设甲是小偷（说谎）</text><text x="95" y="65" text-anchor="middle" font-size="12" fill="#ff6b6b">→ 不是乙</text>'+
      '<rect x="190" y="10" width="150" height="70" rx="10" fill="#f0fffc"/><text x="265" y="30" text-anchor="middle" font-size="14" font-weight="700">乙说："不是我"</text><text x="265" y="50" text-anchor="middle" font-size="12" fill="#868e96">乙说真话（无辜）</text><text x="265" y="65" text-anchor="middle" font-size="12" fill="#4ecdc4">→ 不是乙 ✓</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span><span class="highlight">小偷总是说谎</span>，无辜的人总是说真话</div>'+
      '<div class="step"><span class="step-num">2</span>逐人假设他是小偷，检查是否<span class="highlight">自洽</span></div>'+
      '<div class="step"><span class="step-num">3</span>唯一自洽的情况 → 找到小偷</div>'+
      '</div>'+
      '<div class="formula-box">📌 逻辑推理口诀：<b>小偷说谎，无辜说真；假设排查，自洽为答</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.logic;
    var pz=pool[Math.floor(Math.random()*pool.length)];
    gameState.lgPuzzle=pz;
    var h='<p style="text-align:center;font-weight:700">'+pz.q+'</p>';
    h+='<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">';
    for(var who in pz.statements){
      h+='<div class="item-chip lg-chip" data-who="'+who+'" onclick="GAMES.logic.toggleTruth(this)" style="padding:12px 20px;font-size:15px">'+who+'说："'+pz.statements[who]+'"<br><small style="color:#adb5bd">点击选中</small></div>';
    }
    h+='</div><p style="font-size:14px;text-align:center">点击你认为的<b>小偷</b>（小偷在说谎，其他人都说真话）</p><p class="feedback" id="lgfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    container.innerHTML=h;
  },
  toggleTruth: function(el){
    document.querySelectorAll('.lg-chip').forEach(function(c){c.style.borderColor='#dee2e6';c.style.background='#f8f9fa';});
    el.style.borderColor='#4ecdc4';el.style.background='#f0fffc';
    var who=el.dataset.who,fb=document.getElementById('lgfb'),pz=gameState.lgPuzzle;
    fb.textContent='想想看：如果'+who+'是小偷（在说谎），其他人的话是否自洽？';
    if(who===pz.culprit){fb.textContent='✅ 正确！'+who+'就是小偷！';fb.className='feedback ok';setStars('logic',2);celebrate();updateStarTotal();}
  },
  stage3: function(container){ GAMES.logic.stage2(container); }
};

// 21. 相遇问题
GAMES.meeting = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 80" width="100%" height="70">'+
      '<rect x="10" y="30" width="80" height="25" rx="6" fill="#fff5f5"/><text x="50" y="48" text-anchor="middle" font-size="12">🧑小明 60m/min</text>'+
      '<text x="180" y="48" text-anchor="middle" font-size="24">→相遇←</text>'+
      '<rect x="220" y="30" width="80" height="25" rx="6" fill="#f0fffc"/><text x="260" y="48" text-anchor="middle" font-size="12">👧小红 40m/min</text>'+
      '<text x="100" y="22" text-anchor="middle" font-size="11" fill="#868e96">← 300米 →</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>相向而行：<span class="highlight">速度和</span> = 60+40 = 100米/分</div>'+
      '<div class="step"><span class="step-num">2</span>相遇时间 = 距离 ÷ 速度和 = 300÷100 = <span class="highlight">3分钟</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 相遇问题公式：<b>时间 = 距离 ÷ (速度A + 速度B)</b></div>';
  },
  stage2: function(container){
    gameState.mtDist=genRandInt(200,600);var sA=genRandInt(30,80),sB=genRandInt(30,80);
    gameState.mtSA=sA;gameState.mtSB=sB;gameState.mtSumS=sA+sB;
    gameState.mtTime=gameState.mtDist/gameState.mtSumS;
    GAMES.meeting.renderMT();
  },
  renderMT: function(){
    var container=document.getElementById('stageContent');
    var dist=gameState.mtDist,sA=gameState.mtSA,sB=gameState.mtSB;
    var time=dist/(sA+sB);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">距离<b>'+dist+'</b>米，A速度<b>'+sA+'</b>米/分，B速度<b>'+sB+'</b>米/分</p>'+
      '<div class="slider-grp"><label>距离(米)</label><span class="slider-val">'+dist+'米</span><input type="range" id="mtDistS" min="100" max="800" value="'+dist+'" oninput="GAMES.meeting.updateMT()"></div>'+
      '<div style="display:flex;gap:16px">'+
      '<div class="slider-grp"><label>A速度</label><span class="slider-val">'+sA+'米/分</span><input type="range" id="mtSAS" min="20" max="100" value="'+sA+'" oninput="GAMES.meeting.updateMT()"></div>'+
      '<div class="slider-grp"><label>B速度</label><span class="slider-val">'+sB+'米/分</span><input type="range" id="mtSBS" min="20" max="100" value="'+sB+'" oninput="GAMES.meeting.updateMT()"></div>'+
      '</div>'+
      '<p style="text-align:center;font-size:18px">相遇时间 = '+dist+'÷('+sA+'+'+sB+') = <b style="color:#ff6b6b">'+time.toFixed(1)+'</b> 分钟</p>'+
      '<p style="text-align:center;font-size:14px;color:#adb5bd">A走了: '+(sA*time).toFixed(0)+'米 | B走了: '+(sB*time).toFixed(0)+'米</p>';
  },
  updateMT: function(){
    gameState.mtDist=parseInt(document.getElementById('mtDistS').value);
    gameState.mtSA=parseInt(document.getElementById('mtSAS').value);
    gameState.mtSB=parseInt(document.getElementById('mtSBS').value);
    gameState.mtSumS=gameState.mtSA+gameState.mtSB;
    gameState.mtTime=gameState.mtDist/gameState.mtSumS;
    GAMES.meeting.renderMT();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.meeting;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.mtAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>相遇时间=</span><input class="answer-input" id="mtAns3"><span>分钟/小时</span><button class="btn btn-p" onclick="GAMES.meeting.check3()">确认</button></div>'+
      '<p class="feedback" id="mtfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('mtAns3').value),fb=document.getElementById('mtfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.mtAns3)<0.15){fb.textContent='✅ 正确！时间=距离÷速度和';fb.className='feedback ok';setStars('meeting',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 公式：距离÷(速度A+速度B)';fb.className='feedback err';}
  }
};

// 22. 追及问题
GAMES.chase = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 80" width="100%" height="70">'+
      '<rect x="10" y="25" width="80" height="25" rx="6" fill="#fff5f5"/><text x="50" y="43" text-anchor="middle" font-size="12">🏃小红 80m/min</text>'+
      '<text x="160" y="32" text-anchor="middle" font-size="11" fill="#868e96">← 领先100米 →</text>'+
      '<rect x="220" y="25" width="80" height="25" rx="6" fill="#f0fffc"/><text x="260" y="43" text-anchor="middle" font-size="12">🚶小明 60m/min</text>'+
      '<text x="160" y="60" text-anchor="middle" font-size="12" fill="#ff6b6b" font-weight="700">速度差20m/min → 5分钟追上</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>追及问题：<span class="highlight">速度差</span> = 快 - 慢</div>'+
      '<div class="step"><span class="step-num">2</span>追及时间 = 距离差 ÷ 速度差</div>'+
      '<div class="step"><span class="step-num">3</span>100 ÷ (80-60) = <span class="highlight">5分钟</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 追及问题公式：<b>时间 = 距离差 ÷ (快 - 慢)</b></div>';
  },
  stage2: function(container){
    gameState.chLead=genRandInt(50,300);gameState.chFast=genRandInt(60,100);gameState.chSlow=genRandInt(20,gameState.chFast-20);
    GAMES.chase.renderCH();
  },
  renderCH: function(){
    var container=document.getElementById('stageContent');
    var lead=gameState.chLead,fast=gameState.chFast,slow=gameState.chSlow;
    var time=lead/(fast-slow);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">领先<b>'+lead+'</b>米，快者<b>'+fast+'</b>米/分，慢者<b>'+slow+'</b>米/分</p>'+
      '<div class="slider-grp"><label>领先距离</label><span class="slider-val">'+lead+'米</span><input type="range" id="chLeadS" min="20" max="500" value="'+lead+'" oninput="GAMES.chase.updateCH()"></div>'+
      '<div style="display:flex;gap:16px">'+
      '<div class="slider-grp"><label>快者速度</label><span class="slider-val">'+fast+'米/分</span><input type="range" id="chFastS" min="30" max="120" value="'+fast+'" oninput="GAMES.chase.updateCH()"></div>'+
      '<div class="slider-grp"><label>慢者速度</label><span class="slider-val">'+slow+'米/分</span><input type="range" id="chSlowS" min="10" max="80" value="'+slow+'" oninput="GAMES.chase.updateCH()"></div>'+
      '</div>'+
      '<p style="text-align:center;font-size:18px">追及时间 = '+lead+'÷('+fast+'-'+slow+') = <b style="color:#ff6b6b">'+time.toFixed(1)+'</b> 分钟</p>';
  },
  updateCH: function(){
    gameState.chLead=parseInt(document.getElementById('chLeadS').value);
    gameState.chFast=parseInt(document.getElementById('chFastS').value);
    gameState.chSlow=parseInt(document.getElementById('chSlowS').value);
    if(gameState.chFast<=gameState.chSlow) gameState.chFast=gameState.chSlow+10;
    GAMES.chase.renderCH();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.chase;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.chAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>追及时间=</span><input class="answer-input" id="chAns3"><span>分钟/小时</span><button class="btn btn-p" onclick="GAMES.chase.check3()">确认</button></div>'+
      '<p class="feedback" id="chfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('chAns3').value),fb=document.getElementById('chfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.chAns3)<0.15){fb.textContent='✅ 正确！时间=距离÷速度差';fb.className='feedback ok';setStars('chase',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 公式：领先距离÷(快-慢)';fb.className='feedback err';}
  }
};

// ══════════════════ 五年级 ══════════════════

// 23. 工程问题
GAMES.work = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 120" width="100%" height="100">'+
      '<rect x="10" y="10" width="100" height="45" rx="8" fill="#fff5f5"/><text x="60" y="30" text-anchor="middle" font-size="13">甲：10天完成</text><text x="60" y="48" text-anchor="middle" font-size="13" fill="#ff6b6b">每天 1/10</text>'+
      '<text x="120" y="35" font-size="20">+</text>'+
      '<rect x="140" y="10" width="100" height="45" rx="8" fill="#f0fffc"/><text x="190" y="30" text-anchor="middle" font-size="13">乙：15天完成</text><text x="190" y="48" text-anchor="middle" font-size="13" fill="#4ecdc4">每天 1/15</text>'+
      '<text x="250" y="35" font-size="20">=</text>'+
      '<rect x="270" y="10" width="80" height="45" rx="8" fill="#fff8e1"/><text x="310" y="30" text-anchor="middle" font-size="13">合作：6天</text><text x="310" y="48" text-anchor="middle" font-size="11" fill="#f59f00">1/10+1/15=1/6</text>'+
      '<text x="180" y="85" text-anchor="middle" font-size="14" font-weight="700" fill="#495057">合作时间 = 1÷(1/10+1/15) = <span style="color:#ff6b6b">6天</span></text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>把工作总量看作<span class="highlight">单位"1"</span></div>'+
      '<div class="step"><span class="step-num">2</span>工作效率 = 1÷单独完成天数</div>'+
      '<div class="step"><span class="step-num">3</span>合作天数 = 1÷(效率之和)</div>'+
      '</div>'+
      '<div class="formula-box">📌 工程问题公式：<b>合作时间 = 1÷(1/T₁ + 1/T₂)</b></div>';
  },
  stage2: function(container){
    gameState.wkT1=genRandInt(4,12);gameState.wkT2=gameState.wkT1*2;
    GAMES.work.renderWK();
  },
  renderWK: function(){
    var t1=gameState.wkT1,t2=gameState.wkT2;
    var together=Math.round(t1*t2/(t1+t2)*10)/10;
    var c=document.getElementById('stageContent');
    c.innerHTML=
      '<p style="text-align:center;font-weight:700">调整工作时间，观察合作效率</p>'+
      '<div class="slider-grp"><label>甲单独做(天)</label><span class="slider-val" id="wkT1V">'+t1+'</span><input type="range" id="wkT1S" min="3" max="20" value="'+t1+'" oninput="GAMES.work.upd()"></div>'+
      '<div class="slider-grp"><label>乙单独做(天)</label><span class="slider-val" id="wkT2V">'+t2+'</span><input type="range" id="wkT2S" min="3" max="30" value="'+t2+'" oninput="GAMES.work.upd()"></div>'+
      '<p style="text-align:center;font-size:16px">甲每天做 <b style="color:#ff6b6b">1/'+t1+'</b>，乙每天做 <b style="color:#4ecdc4">1/'+t2+'</b></p>'+
      '<p style="text-align:center;font-size:18px">合作完成需 <b style="color:#f59f00">'+together+'</b> 天</p>'+
      '<p style="font-size:12px;color:#adb5bd;text-align:center">1÷(1/'+t1+'+1/'+t2+')='+together+'</p>';
  },
  upd: function(){
    gameState.wkT1=parseInt(document.getElementById('wkT1S').value);
    gameState.wkT2=parseInt(document.getElementById('wkT2S').value);
    document.getElementById('wkT1V').textContent=gameState.wkT1;
    document.getElementById('wkT2V').textContent=gameState.wkT2;
    GAMES.work.renderWK();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.work;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.wkAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="wkAns3"><span>天</span><button class="btn btn-p" onclick="GAMES.work.check3()">确认</button></div>'+
      '<p class="feedback" id="wkfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('wkAns3').value),fb=document.getElementById('wkfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(typeof gameState.wkAns3==='number'){
      if(Math.abs(ans-gameState.wkAns3)<0.15){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('work',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 公式：1÷(1/T₁+1/T₂)';fb.className='feedback err';}
    }else{
      if(String(ans)===String(gameState.wkAns3)){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('work',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 公式：1÷(1/T₁+1/T₂)';fb.className='feedback err';}
    }
  }
};

// 24. 流水行船
GAMES.boatcurrent = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 130" width="100%" height="115">'+
      '<text x="170" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="#495057">船速 v = 20 km/h &nbsp; 水速 c = 5 km/h</text>'+
      '<rect x="30" y="35" width="130" height="50" rx="10" fill="#f0fffc"/>'+
      '<text x="95" y="55" text-anchor="middle" font-size="13">🟢 顺水</text>'+
      '<text x="95" y="75" text-anchor="middle" font-size="16" font-weight="700" fill="#4ecdc4">v + c = 25 km/h</text>'+
      '<rect x="200" y="35" width="130" height="50" rx="10" fill="#fff5f5"/>'+
      '<text x="265" y="55" text-anchor="middle" font-size="13">🔴 逆水</text>'+
      '<text x="265" y="75" text-anchor="middle" font-size="16" font-weight="700" fill="#ff6b6b">v - c = 15 km/h</text>'+
      '<text x="180" y="115" text-anchor="middle" font-size="12" fill="#a29bfe">船速=(顺+逆)÷2 &nbsp; 水速=(顺-逆)÷2</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>顺水：船速 <span class="highlight">+</span> 水速（水推船）</div>'+
      '<div class="step"><span class="step-num">2</span>逆水：船速 <span class="highlight">-</span> 水速（水挡船）</div>'+
      '<div class="step"><span class="step-num">3</span>船速 = 静水速度，水速 = 水流速度</div>'+
      '</div>'+
      '<div class="formula-box">📌 流水行船公式：<b>v船=(v顺+v逆)÷2，v水=(v顺-v逆)÷2</b></div>';
  },
  stage2: function(container){
    gameState.bcV=genRandInt(12,25);gameState.bcC=genRandInt(2,Math.floor(gameState.bcV/3));
    GAMES.boatcurrent.renderBC();
  },
  renderBC: function(){
    var v=gameState.bcV,c=gameState.bcC,down=v+c,up=v-c;
    var container=document.getElementById('stageContent');
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">调整船速和水速</p>'+
      '<div class="slider-grp"><label>船速(km/h)</label><span class="slider-val" id="bcVV">'+v+'</span><input type="range" id="bcVS" min="10" max="30" value="'+v+'" oninput="GAMES.boatcurrent.upd()"></div>'+
      '<div class="slider-grp"><label>水速(km/h)</label><span class="slider-val" id="bcCV">'+c+'</span><input type="range" id="bcCS" min="1" max="8" value="'+c+'" oninput="GAMES.boatcurrent.upd()"></div>'+
      '<p style="text-align:center;font-size:18px">顺水速度 = <b style="color:#ff6b6b">'+down+'</b> km/h &nbsp;|&nbsp; 逆水速度 = <b style="color:#4ecdc4">'+up+'</b> km/h</p>'+
      '<p style="font-size:12px;color:#adb5bd;text-align:center">船速=('+down+'+'+up+')÷2='+v+' &nbsp; 水速=('+down+'-'+up+')÷2='+c+'</p>';
  },
  upd: function(){
    gameState.bcV=parseInt(document.getElementById('bcVS').value);
    gameState.bcC=parseInt(document.getElementById('bcCS').value);
    if(gameState.bcC>=gameState.bcV) gameState.bcC=Math.max(1,gameState.bcV-2);
    document.getElementById('bcVV').textContent=gameState.bcV;
    document.getElementById('bcCV').textContent=gameState.bcC;
    document.getElementById('bcCS').value=gameState.bcC;
    GAMES.boatcurrent.renderBC();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.boatcurrent;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.bcQ=p.q;
    if(p.ans.toString().indexOf(',')>-1){
      var parts=p.ans.toString().split(',');
      gameState.bcAns1=parts[0];gameState.bcAns2=parts[1];gameState.bcMode='two';
      container.innerHTML=
        '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
        '<div class="answer-row"><input class="answer-input" id="bcAns1" placeholder="顺水速度"><input class="answer-input" id="bcAns2" placeholder="逆水速度"><button class="btn btn-p" onclick="GAMES.boatcurrent.check3()">确认</button></div>'+
        '<p class="feedback" id="bcfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    }else{
      gameState.bcAns1=p.ans;gameState.bcMode='one';
      container.innerHTML=
        '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
        '<div class="answer-row"><input class="answer-input" id="bcAns1" placeholder="答案"><button class="btn btn-p" onclick="GAMES.boatcurrent.check3()">确认</button></div>'+
        '<p class="feedback" id="bcfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    }
  },
  check3: function(){
    var fb=document.getElementById('bcfb');
    if(gameState.bcMode==='two'){
      var a1=document.getElementById('bcAns1').value,a2=document.getElementById('bcAns2').value;
      if(!a1||!a2){fb.textContent='请填写完整';return}
      if(a1===gameState.bcAns1&&a2===gameState.bcAns2){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('boatcurrent',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 顺水=v+c，逆水=v-c（或船速=(顺+逆)÷2）';fb.className='feedback err';}
    }else{
      var ans=parseFloat(document.getElementById('bcAns1').value);
      if(isNaN(ans)){fb.textContent='请输入数字';return}
      if(Math.abs(ans-parseFloat(gameState.bcAns1))<0.2){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('boatcurrent',3);celebrate();updateStarTotal();}
      else{fb.textContent='❌ 再算算：顺水=v+c，逆水=v-c';fb.className='feedback err';}
    }
  }
};

// 25. 牛吃草
GAMES.cowgrass = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 140" width="100%" height="120">'+
      '<text x="170" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="#495057">牛顿问题（牛吃草）</text>'+
      '<rect x="10" y="30" width="160" height="55" rx="10" fill="#fff5f5"/>'+
      '<text x="90" y="48" text-anchor="middle" font-size="12">方案1：8头牛10天</text>'+
      '<text x="90" y="68" text-anchor="middle" font-size="12">吃掉 8×10=80份</text>'+
      '<rect x="190" y="30" width="160" height="55" rx="10" fill="#f0fffc"/>'+
      '<text x="270" y="48" text-anchor="middle" font-size="12">方案2：11头牛5天</text>'+
      '<text x="270" y="68" text-anchor="middle" font-size="12">吃掉 11×5=55份</text>'+
      '<text x="180" y="105" text-anchor="middle" font-size="13" font-weight="700" fill="#ff6b6b">每天长草=(80-55)÷(10-5)=5份</text>'+
      '<text x="180" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="#4ecdc4">原有草=80-5×10=30份</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>两步法：先求<span class="highlight">每天长草量</span>，再求<span class="highlight">原有草量</span></div>'+
      '<div class="step"><span class="step-num">2</span>每天长草 = (N₁T₁-N₂T₂)÷(T₁-T₂)</div>'+
      '<div class="step"><span class="step-num">3</span>原有草 = N₁T₁ - 长草量×T₁ &nbsp; | &nbsp; 可吃天数 = 原有草÷(牛数-长草量)</div>'+
      '</div>'+
      '<div class="formula-box">📌 牛吃草公式：<b>长草量=(N₁T₁-N₂T₂)÷(T₁-T₂)，天数=原有草÷(N-长草量)</b></div>';
  },
  stage2: function(container){
    gameState.cgN1=8;gameState.cgT1=10;gameState.cgN2=11;gameState.cgT2=5;
    GAMES.cowgrass.renderCG();
  },
  renderCG: function(){
    var n1=gameState.cgN1,t1=gameState.cgT1,n2=gameState.cgN2,t2=gameState.cgT2;
    var g=(n1*t1-n2*t2)/(t1-t2),s=n1*t1-g*t1;
    var c=document.getElementById('stageContent');
    var extra='';
    if(g>0&&s>0){
      var n3=genRandInt(Math.ceil(g)+1,Math.ceil(g)+8);
      var t3=Math.round(s/(n3-g)*10)/10;
      extra='<p style="text-align:center;font-size:14px;color:#636e72">若 '+n3+' 头牛 → '+s.toFixed(0)+'÷('+n3+'-'+g.toFixed(1)+') ≈ <b>'+t3+'</b> 天</p>';
    }
    c.innerHTML=
      '<p style="text-align:center;font-weight:700">调整牛数和天数，观察变化</p>'+
      '<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">'+
      '<div class="slider-grp" style="max-width:160px"><label>方案1: 牛数</label><span class="slider-val" id="cgN1V">'+n1+'</span><input type="range" id="cgN1S" min="3" max="15" value="'+n1+'" oninput="GAMES.cowgrass.upd()"></div>'+
      '<div class="slider-grp" style="max-width:160px"><label>方案1: 天数</label><span class="slider-val" id="cgT1V">'+t1+'</span><input type="range" id="cgT1S" min="4" max="15" value="'+t1+'" oninput="GAMES.cowgrass.upd()"></div>'+
      '</div>'+
      '<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center">'+
      '<div class="slider-grp" style="max-width:160px"><label>方案2: 牛数</label><span class="slider-val" id="cgN2V">'+n2+'</span><input type="range" id="cgN2S" min="2" max="20" value="'+n2+'" oninput="GAMES.cowgrass.upd()"></div>'+
      '<div class="slider-grp" style="max-width:160px"><label>方案2: 天数</label><span class="slider-val" id="cgT2V">'+t2+'</span><input type="range" id="cgT2S" min="2" max="10" value="'+t2+'" oninput="GAMES.cowgrass.upd()"></div>'+
      '</div>'+
      '<p style="text-align:center;font-size:14px">每天长草: <b style="color:#ff6b6b">'+g.toFixed(1)+'</b> 份 | 原有草: <b style="color:#4ecdc4">'+s.toFixed(1)+'</b> 份</p>'+extra;
  },
  upd: function(){
    gameState.cgN1=parseInt(document.getElementById('cgN1S').value);
    gameState.cgT1=parseInt(document.getElementById('cgT1S').value);
    gameState.cgN2=parseInt(document.getElementById('cgN2S').value);
    gameState.cgT2=parseInt(document.getElementById('cgT2S').value);
    if(gameState.cgT1<=gameState.cgT2) gameState.cgT2=gameState.cgT1-1;
    document.getElementById('cgN1V').textContent=gameState.cgN1;
    document.getElementById('cgT1V').textContent=gameState.cgT1;
    document.getElementById('cgN2V').textContent=gameState.cgN2;
    document.getElementById('cgT2V').textContent=gameState.cgT2;
    document.getElementById('cgT2S').value=gameState.cgT2;
    GAMES.cowgrass.renderCG();
  },
  stage3: function(container){
    var pool=QUESTION_BANK.cowgrass;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.cgAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>需要</span><input class="answer-input" id="cgAns3"><span>天</span><button class="btn btn-p" onclick="GAMES.cowgrass.check3()">确认</button></div>'+
      '<p class="feedback" id="cgfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('cgAns3').value),fb=document.getElementById('cgfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.cgAns3)<0.15){fb.textContent='✅ 正确！先求每天长草量和原有草量';fb.className='feedback ok';setStars('cowgrass',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 先算每天长草量=(N₁T₁-N₂T₂)÷(T₁-T₂)，再算原有草量';fb.className='feedback err';}
  }
};

// ══════════════════ 二年级（补） ══════════════════

// 6. 等量代换
GAMES.substitution = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg">'+makeScaleSVG()+'</div>'+
      '<p style="text-align:center;font-size:14px;color:#495057">左边1个🍍，右边3个🍎 → 天平平衡 → <b>1🍍 = 3🍎</b></p>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>天平平衡表示两边<span class="highlight">重量相等</span></div>'+
      '<div class="step"><span class="step-num">2</span>如果 1🍎 = 2🍌，那么把每个🍎换成2个🍌</div>'+
      '<div class="step"><span class="step-num">3</span>3个🍎 × 2 = 6个🍌，所以 <span class="highlight">1🍍 = 6🍌</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 等量代换口诀：<b>找到等量，逐步替换，连乘计算</b></div>';
  },
  stage2: function(container){
    gameState={applesLeft:3,bananasPlaced:0};
    container.innerHTML=
      '<p style="text-align:center;font-size:15px">已知 1个🍍 = 3个🍎，而且 1个🍎 = 2个🍌<br>点击苹果，换成香蕉试试！</p>'+
      '<div class="scale-wrap"><div id="s2svg"></div><div class="scale-items scale-left" id="s2L"></div><div class="scale-items scale-right" id="s2R"></div></div>'+
      '<div style="background:#fff3bf;padding:10px 20px;border-radius:14px;border:2px dashed #feca57;display:flex;align-items:center;gap:10px;justify-content:center"><span>1个</span><span style="font-size:28px">🍎</span><span style="font-weight:700;color:#f59f00">=</span><span>2个</span><span style="font-size:28px">🍌</span></div>'+
      '<p class="feedback" id="s2fb">点击右边的苹果来替换吧！已替换: 0/3</p>'+
      '<button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button>';
    document.getElementById('s2svg').innerHTML=makeScaleSVG();
    document.getElementById('s2L').innerHTML='<span class="scale-item">🍍</span>';
    var r=document.getElementById('s2R');r.innerHTML='';
    for(var i=0;i<3;i++){
      var el=document.createElement('span');el.className='scale-item';el.textContent='🍎';
      el.onclick=function(){ GAMES.substitution.replaceApple(this); };
      r.appendChild(el);
    }
  },
  replaceApple: function(el){
    if(el.classList.contains('removing')) return;
    el.classList.add('removing');
    setTimeout(function(){
      el.remove();
      var r=document.getElementById('s2R');
      var b1=document.createElement('span');b1.className='scale-item';b1.textContent='🍌';b1.style.animation='pop .3s';
      var b2=document.createElement('span');b2.className='scale-item';b2.textContent='🍌';b2.style.animation='pop .3s .1s';
      r.appendChild(b1);r.appendChild(b2);
      gameState.applesLeft--;gameState.bananasPlaced+=2;
      var fb=document.getElementById('s2fb');
      fb.textContent='已替换: '+(3-gameState.applesLeft)+'/3。右边: '+gameState.applesLeft+'个🍎 + '+gameState.bananasPlaced+'个🍌';
      if(gameState.applesLeft===0){
        fb.textContent='🎉 太棒了！3个苹果全换成了6个香蕉！所以 1🍍 = 6🍌';
        fb.style.color='#00b894';
        setStars('substitution',2);celebrate();updateStarTotal();
      }
    },300);
  },
  stage3: function(container){
    var pool=QUESTION_BANK.substitution;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.subAns=p.ans;
    container.innerHTML=
      '<p style="font-size:16px;font-weight:600;text-align:center">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input type="number" class="answer-input" id="subAns" placeholder="?" min="0" max="99"><button class="btn btn-p" onclick="GAMES.substitution.check()">确认 ✓</button></div>'+
      '<p class="feedback" id="subfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check: function(){
    var ans=parseInt(document.getElementById('subAns').value),fb=document.getElementById('subfb');
    if(isNaN(ans)){fb.textContent='请输入数字哦～';return}
    if(ans===gameState.subAns){fb.textContent='✅ 太棒了！';fb.className='feedback ok';setStars('substitution',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 再想想哦～';fb.className='feedback err';}
  }
};

// 7. 周期问题
GAMES.cycle = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 100" width="100%" height="90">'+
      '<circle cx="60" cy="40" r="24" fill="#fff5f5" stroke="#ff6b6b" stroke-width="2"/><text x="60" y="45" text-anchor="middle" font-size="22">🔴</text><text x="60" y="80" text-anchor="middle" font-size="11" fill="#868e96">1,4,7..</text>'+
      '<circle cx="130" cy="40" r="24" fill="#fff8e1" stroke="#feca57" stroke-width="2"/><text x="130" y="45" text-anchor="middle" font-size="22">🟡</text><text x="130" y="80" text-anchor="middle" font-size="11" fill="#868e96">2,5,8..</text>'+
      '<circle cx="200" cy="40" r="24" fill="#f0fffc" stroke="#4ecdc4" stroke-width="2"/><text x="200" y="45" text-anchor="middle" font-size="22">🟢</text><text x="200" y="80" text-anchor="middle" font-size="11" fill="#868e96">3,6,9..</text>'+
      '<text x="130" y="20" text-anchor="middle" font-size="12" fill="#ff6b6b">周期 = 3</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>一组周期有<span class="highlight">3个</span>元素</div>'+
      '<div class="step"><span class="step-num">2</span>求第N个：用 N ÷ 周期长度，看<span class="highlight">余数</span></div>'+
      '<div class="step"><span class="step-num">3</span>余1→第1个，余2→第2个，余0→最后一个</div>'+
      '</div>'+
      '<div class="formula-box">📌 周期问题公式：<b>N ÷ 周期 = 整数...余数 → 对应位置</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.cycle;
    var c=pool[Math.floor(Math.random()*pool.length)];
    gameState.cyAns=c.ans;gameState.cyArr=c.arr;gameState.cyLen=c.len;gameState.cyPos=c.pos;
    container.innerHTML=
      '<p style="text-align:center;font-size:18px">周期：'+[...c.arr].join(' ') + ' （每'+c.len+'个一循环）</p>'+
      '<p style="font-weight:700;text-align:center">第 <b style="color:#ff6b6b;font-size:22px">'+c.pos+'</b> 个是什么？</p>'+
      '<div class="item-grid">'+[...c.arr].map(function(ch){return '<div class="item-chip" onclick="GAMES.cycle.choose(\''+ch+'\',this)">'+ch+'</div>';}).join('')+'</div>'+
      '<p class="feedback" id="cyfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  choose: function(ch,el){
    var fb=document.getElementById('cyfb');
    if(ch===gameState.cyAns){
      fb.textContent='✅ 正确！'+gameState.cyPos+'÷'+gameState.cyLen+'='+Math.floor(gameState.cyPos/gameState.cyLen)+'...'+((gameState.cyPos%gameState.cyLen)||gameState.cyLen);
      fb.className='feedback ok';el.classList.add('selected');setStars('cycle',2);celebrate();updateStarTotal();
    }else{
      fb.textContent='❌ 用除法算算：'+gameState.cyPos+'÷'+gameState.cyLen+'=?';
      fb.className='feedback err';el.classList.add('wrong');setTimeout(function(){el.classList.remove('wrong');},500);
    }
  },
  stage3: function(container){ GAMES.cycle.stage2(container); }
};

// 8. 植树问题
GAMES.tree = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 140" width="100%" height="120">'+
      '<text x="10" y="30" font-size="13" font-weight="700" fill="#495057">两端都种：</text>'+
      '<line x1="110" y1="25" x2="340" y2="25" stroke="#adb5bd" stroke-width="2"/>'+
      '<circle cx="110" cy="25" r="4" fill="#ff6b6b"/><circle cx="168" cy="25" r="4" fill="#ff6b6b"/>'+
      '<circle cx="226" cy="25" r="4" fill="#ff6b6b"/><circle cx="284" cy="25" r="4" fill="#ff6b6b"/>'+
      '<circle cx="340" cy="25" r="4" fill="#ff6b6b"/>'+
      '<text x="355" y="30" font-size="11" fill="#ff6b6b">5棵=4段+1</text>'+
      '<text x="10" y="80" font-size="13" font-weight="700" fill="#495057">圆形：</text>'+
      '<ellipse cx="235" cy="80" rx="70" ry="30" fill="none" stroke="#adb5bd" stroke-width="2"/>'+
      '<circle cx="235" cy="50" r="3" fill="#4ecdc4"/><circle cx="275" cy="67" r="3" fill="#4ecdc4"/>'+
      '<circle cx="195" cy="67" r="3" fill="#4ecdc4"/><circle cx="210" cy="105" r="3" fill="#4ecdc4"/>'+
      '<circle cx="260" cy="105" r="3" fill="#4ecdc4"/><circle cx="235" cy="110" r="3" fill="#4ecdc4"/>'+
      '<text x="355" y="85" font-size="11" fill="#4ecdc4">6棵=6段</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>先算<span class="highlight">段数</span> = 路长 ÷ 间隔</div>'+
      '<div class="step"><span class="step-num">2</span>两端都种：树数 = 段数 <span class="highlight">+ 1</span></div>'+
      '<div class="step"><span class="step-num">3</span>圆形/闭合：树数 = 段数（首尾重合）</div>'+
      '</div>'+
      '<div class="formula-box">📌 植树四种情况：<b>两端种→+1 / 只一端→= / 两端不种→-1 / 圆形→=</b></div>';
  },
  stage2: function(container){
    gameState.trLength=20;gameState.trInterval=5;gameState.trMode='both';
    GAMES.tree.renderTR();
  },
  renderTR: function(){
    var container=document.getElementById('stageContent');
    var length=gameState.trLength,interval=gameState.trInterval;
    var segments=Math.floor(length/interval);
    var trees=(gameState.trMode==='both')?segments+1:(gameState.trMode==='none')?segments-1:segments;
    trees=Math.max(0,trees);
    var names={both:'两端都种',none:'两端不种',one:'只种一端',circle:'圆形'};
    var h='<p style="text-align:center;font-weight:700">路长 <b style="color:#ff6b6b">'+length+'</b>米，间隔 <b style="color:#4ecdc4">'+interval+'</b>米</p>';
    h+='<div class="slider-grp"><label>路长(米)</label><span class="slider-val">'+length+'米</span><input type="range" id="trLenS" min="10" max="50" value="'+length+'" oninput="GAMES.tree.updateTR()"></div>';
    h+='<div class="slider-grp"><label>间隔(米)</label><span class="slider-val">'+interval+'米</span><input type="range" id="trIntS" min="1" max="10" value="'+interval+'" oninput="GAMES.tree.updateTR()"></div>';
    h+='<div class="item-grid"><span>种植方式：</span>';
    ['both','none','one','circle'].forEach(function(m){
      h+='<div class="item-chip'+(gameState.trMode===m?' selected':'')+'" onclick="GAMES.tree.setMode(\''+m+'\')">'+names[m]+'</div>';
    });
    h+='</div><div class="tree-row" style="justify-content:center">';
    for(var i=0;i<trees;i++) h+='<span class="tree">🌳</span>'+(i<trees-1?'<span class="tree-spacer" style="width:'+(interval*3)+'px"></span>':'');
    h+='</div>';
    h+='<p style="text-align:center;font-weight:700;font-size:16px">段数='+segments+'，树数=<b style="color:#ff6b6b">'+trees+'</b>棵</p>';
    container.innerHTML=h;
  },
  updateTR: function(){
    gameState.trLength=parseInt(document.getElementById('trLenS').value);
    gameState.trInterval=parseInt(document.getElementById('trIntS').value);
    GAMES.tree.renderTR();
  },
  setMode: function(m){gameState.trMode=m;GAMES.tree.renderTR();},
  stage3: function(container){
    var pool=QUESTION_BANK.tree;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.trAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="trAns3"><button class="btn btn-p" onclick="GAMES.tree.check3()">确认</button></div>'+
      '<p class="feedback" id="trfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('trAns3').value),fb=document.getElementById('trfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.trAns3){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('tree',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 先算段数，再根据种植方式确定树数';fb.className='feedback err';}
  }
};

// 9. 归一问题
GAMES.normalization = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 120" width="100%" height="100">'+
      '<rect x="20" y="10" width="80" height="50" rx="8" fill="#fff5f5"/><text x="60" y="30" text-anchor="middle" font-size="20">📦×3</text><text x="60" y="52" text-anchor="middle" font-size="13" fill="#868e96">18元</text>'+
      '<text x="120" y="40" text-anchor="middle" font-size="20">→</text>'+
      '<rect x="150" y="10" width="80" height="50" rx="8" fill="#f0fffc"/><text x="190" y="30" text-anchor="middle" font-size="20">📦×1</text><text x="190" y="52" text-anchor="middle" font-size="13" fill="#868e96">6元</text>'+
      '<text x="250" y="40" text-anchor="middle" font-size="20">→</text>'+
      '<rect x="280" y="10" width="70" height="50" rx="8" fill="#fff8e1"/><text x="315" y="30" text-anchor="middle" font-size="20">📦×5</text><text x="315" y="52" text-anchor="middle" font-size="13" fill="#868e96">30元</text>'+
      '</svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span><span class="highlight">归一</span>：先求1份是多少 → 总数 ÷ 份数</div>'+
      '<div class="step"><span class="step-num">2</span><span class="highlight">求多</span>：再求需要的份数 → 1份量 × 新份数</div>'+
      '</div>'+
      '<div class="formula-box">📌 归一问题口诀：<b>先归一，再求多；先除后乘</b></div>';
  },
  stage2: function(container){
    gameState.nmUnit=genRandInt(3,8);gameState.nmQty=genRandInt(2,5);
    gameState.nmTotal=gameState.nmUnit*gameState.nmQty;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">调整单价和数量，观察总价变化</p>'+
      '<div class="slider-grp"><label>单价(元/个)</label><span class="slider-val" id="nmUnitV">'+gameState.nmUnit+'</span><input type="range" id="nmUnitS" min="2" max="10" value="'+gameState.nmUnit+'" oninput="GAMES.normalization.upd()"></div>'+
      '<div class="slider-grp"><label>数量(个)</label><span class="slider-val" id="nmQtyV">'+gameState.nmQty+'</span><input type="range" id="nmQtyS" min="1" max="8" value="'+gameState.nmQty+'" oninput="GAMES.normalization.upd()"></div>'+
      '<p style="text-align:center;font-size:20px">总价 = <b style="color:#ff6b6b" id="nmTotalV">'+gameState.nmTotal+'</b> 元</p>'+
      '<p style="font-size:13px;color:#adb5bd;text-align:center">单价×数量=总价 | 总价÷数量=单价 | 总价÷单价=数量</p>';
  },
  upd: function(){
    gameState.nmUnit=parseInt(document.getElementById('nmUnitS').value);
    gameState.nmQty=parseInt(document.getElementById('nmQtyS').value);
    gameState.nmTotal=gameState.nmUnit*gameState.nmQty;
    document.getElementById('nmUnitV').textContent=gameState.nmUnit;
    document.getElementById('nmQtyV').textContent=gameState.nmQty;
    document.getElementById('nmTotalV').textContent=gameState.nmTotal;
  },
  stage3: function(container){
    var pool=QUESTION_BANK.normalization;
    var p=pool[Math.floor(Math.random()*pool.length)];
    gameState.nmAns=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><input class="answer-input" id="nmAns" placeholder="?"><button class="btn btn-p" onclick="GAMES.normalization.check()">确认</button></div>'+
      '<p class="feedback" id="nmfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check: function(){
    var ans=parseInt(document.getElementById('nmAns').value),fb=document.getElementById('nmfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.nmAns){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('normalization',3);celebrate();updateStarTotal();}
    else{fb.textContent='❌ 先求1份的量（归一），再求多份';fb.className='feedback err';}
  }
};

// 10. 和差问题
GAMES.sumdiff = {
  stage1: function(container){
    var sum=20,diff=6,a=(sum+diff)/2,b=(sum-diff)/2;
    container.innerHTML=
      '<p style="text-align:center;font-size:15px">已知两数之和为 <b>'+sum+'</b>，差为 <b>'+diff+'</b></p>'+
      drawBarModel(a,b,'大数','小数',1,diff)+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>线段图：大数 = 小数 + 差</div>'+
      '<div class="step"><span class="step-num">2</span>(和+差)÷2 = <span class="highlight">大数</span> = '+a+'</div>'+
      '<div class="step"><span class="step-num">3</span>(和-差)÷2 = <span class="highlight">小数</span> = '+b+'</div>'+
      '</div>'+
      '<div class="formula-box">📌 和差公式：<b>大数 = (和+差)÷2，小数 = (和-差)÷2</b></div>';
  },
  stage2: function(container){
    gameState.sdSum=genRandInt(16,40);gameState.sdDiff=genRandInt(2,Math.floor(gameState.sdSum/3));
    if(gameState.sdDiff%2!==gameState.sdSum%2) gameState.sdDiff++;
    GAMES.sumdiff.updateSD();
  },
  updateSD: function(){
    var container=document.getElementById('stageContent');
    var sum=gameState.sdSum,diff=gameState.sdDiff,a=(sum+diff)/2,b=(sum-diff)/2;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">调整滑块，观察线段图的变化！</p>'+
      '<div class="slider-grp"><label>和 (Sum)</label><span class="slider-val" id="sdSumV">'+sum+'</span><input type="range" id="sdSumS" min="10" max="60" value="'+sum+'" oninput="GAMES.sumdiff.slide()"></div>'+
      '<div class="slider-grp"><label>差 (Diff)</label><span class="slider-val" id="sdDiffV">'+diff+'</span><input type="range" id="sdDiffS" min="1" max="'+Math.floor(sum/2)+'" value="'+diff+'" oninput="GAMES.sumdiff.slide()"></div>'+
      '<div id="sdBar">'+drawBarModel(a,b,'大数','小数',1,diff)+'</div>';
  },
  slide: function(){
    gameState.sdSum=parseInt(document.getElementById('sdSumS').value);
    gameState.sdDiff=parseInt(document.getElementById('sdDiffS').value);
    document.getElementById('sdSumV').textContent=gameState.sdSum;
    document.getElementById('sdDiffV').textContent=gameState.sdDiff;
    document.getElementById('sdDiffS').max=Math.floor(gameState.sdSum/2);
    var a=(gameState.sdSum+gameState.sdDiff)/2,b=(gameState.sdSum-gameState.sdDiff)/2;
    document.getElementById('sdBar').innerHTML=drawBarModel(a,b,'大数','小数',1,gameState.sdDiff);
  },
  stage3: function(container){
    var pool=QUESTION_BANK.sumdiff;
    var p=pool[Math.floor(Math.random()*pool.length)];
    var parts=p.ans.toString().split(',');
    gameState.sdAnsA=parseInt(parts[0]);gameState.sdAnsB=parseInt(parts[1]);
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>大数=</span><input class="answer-input" id="sdA"><span>小数=</span><input class="answer-input" id="sdB"><button class="btn btn-p" onclick="GAMES.sumdiff.check3()">确认</button></div>'+
      '<p class="feedback" id="sdfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var a=parseInt(document.getElementById('sdA').value),b=parseInt(document.getElementById('sdB').value),fb=document.getElementById('sdfb');
    if(isNaN(a)||isNaN(b)){fb.textContent='请填写完整';return}
    if(a===gameState.sdAnsA&&b===gameState.sdAnsB){fb.textContent='✅ 全对！';fb.className='feedback ok';setStars('sumdiff',3);celebrate();updateStarTotal();}
    else if(a===gameState.sdAnsA){fb.textContent='大数对了！小数=(和-差)÷2';fb.className='feedback err';}
    else if(b===gameState.sdAnsB){fb.textContent='小数对了！大数=(和+差)÷2';fb.className='feedback err';}
    else{fb.textContent='再想想公式：(和±差)÷2';fb.className='feedback err';}
  }
};
