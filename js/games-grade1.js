/* ====== games-grade1.js: 一年级游戏逻辑 ====== */
// ══════════════════ 一年级 ══════════════════

// 1. 找规律
GAMES.pattern = {
  stage1: function(container){
    container.innerHTML=
      '<div class="concept-svg"><svg viewBox="0 0 360 80" width="100%" height="70"><rect x="10" y="15" width="60" height="50" rx="8" fill="#fff5f5"/><text x="40" y="48" text-anchor="middle" font-size="28">🔴</text><text x="40" y="72" text-anchor="middle" font-size="11" fill="#868e96">第1个</text><rect x="80" y="15" width="60" height="50" rx="8" fill="#f0fffc"/><text x="110" y="48" text-anchor="middle" font-size="28">🔵</text><text x="110" y="72" text-anchor="middle" font-size="11" fill="#868e96">第2个</text><rect x="150" y="15" width="60" height="50" rx="8" fill="#fff5f5"/><text x="180" y="48" text-anchor="middle" font-size="28">🔴</text><text x="180" y="72" text-anchor="middle" font-size="11" fill="#868e96">第3个</text><rect x="220" y="15" width="60" height="50" rx="8" fill="#f0fffc"/><text x="250" y="48" text-anchor="middle" font-size="28">🔵</text><text x="250" y="72" text-anchor="middle" font-size="11" fill="#868e96">第4个</text><rect x="290" y="15" width="60" height="50" rx="8" fill="#fff5f5" stroke="#ff6b6b" stroke-width="3" stroke-dasharray="6,3"/><text x="320" y="48" text-anchor="middle" font-size="28">❓</text><text x="320" y="72" text-anchor="middle" font-size="11" fill="#ff6b6b">第5个</text></svg></div>'+
      '<div class="explain-box">'+
      '<div class="step"><span class="step-num">1</span>观察前4个图形的排列：🔴 🔵 🔴 🔵</div>'+
      '<div class="step"><span class="step-num">2</span>发现规律：<span class="highlight">红蓝交替出现</span>，每个位置颜色固定</div>'+
      '<div class="step"><span class="step-num">3</span>第5个（奇数位）应该和第1、3个一样 → <span class="highlight">🔴</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 找规律口诀：<b>一看颜色，二看形状，三看数量，四看方向</b></div>';
  },
  stage2: function(container){
    var pool=QUESTION_BANK.pattern;
    var p=pickAdaptiveQuestion(currentGame,pool);
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
      fb.textContent='❌ 再观察一下规律吧'; fb.className='feedback err';awardResult(currentGame,false,0);
      el.classList.add('wrong'); setTimeout(function(){ el.classList.remove('wrong'); },500);
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.pattern;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.ptAns3=p.ans; gameState.ptExplain3=p.explain;
    var h='<p style="font-weight:700;text-align:center;font-size:18px">观察规律，选出下一个</p>';
    h+='<div style="display:flex;gap:8px;font-size:30px;justify-content:center;flex-wrap:wrap;margin:12px 0">';
    p.seq.forEach(function(s){ h+='<span style="background:#f8f9fa;padding:8px 12px;border-radius:12px">'+s+'</span>'; });
    h+='</div><p style="font-weight:700;text-align:center">下一个是什么？</p><div class="item-grid">';
    p.opts.forEach(function(o,i){ h+='<div class="item-chip" onclick="GAMES.pattern.check3('+i+',this)">'+o+'</div>'; });
    h+='</div><p class="feedback" id="ptfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    container.innerHTML=h;
  },
  check3: function(idx,el){
    var fb=document.getElementById('ptfb3');
    if(idx===gameState.ptAns3){
      el.classList.add('selected');
      awardStage3('pattern', document.getElementById('stageContent'), '✅ 正确！'+gameState.ptExplain3);
    }else{
      el.classList.add('wrong'); setTimeout(function(){ el.classList.remove('wrong'); },500);
      penalizeStage3(document.getElementById('stageContent'), '❌ 再观察一下规律吧');
    }
  }
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.csAns=p.ans; gameState.csExplain=p.explain||p.hint||'';
    gameState._csCounts=[0,0,0]; // 单个、组合、整体
    container.innerHTML=
      '<p style="font-weight:700;text-align:center;font-size:16px">'+p.q+'</p>'+
      '<div style="background:#f8f9fa;border-radius:12px;padding:12px;margin:8px 0">'+
      '<p style="text-align:center;font-size:13px;color:#495057;margin-bottom:8px">📐 分类计数面板（点击+1）</p>'+
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">'+
      '<button class="btn btn-s" onclick="GAMES.countshape.incCat(0)" style="background:#fff5f5;border-color:#ff6b6b">单个: <b id="csCat0">0</b>个</button>'+
      '<button class="btn btn-s" onclick="GAMES.countshape.incCat(1)" style="background:#f0fffc;border-color:#4ecdc4">组合: <b id="csCat1">0</b>个</button>'+
      '<button class="btn btn-s" onclick="GAMES.countshape.incCat(2)" style="background:#fff8e1;border-color:#feca57">整体: <b id="csCat2">0</b>个</button>'+
      '</div>'+
      '<p style="text-align:center;font-size:16px;margin-top:8px">当前合计: <b style="color:#ff6b6b" id="csTotal">0</b></p>'+
      '<button class="btn btn-o" style="font-size:11px" onclick="GAMES.countshape.resetCat()">🔄 清零重数</button>'+
      '</div>'+
      '<div class="answer-row"><span>答案：</span><input type="number" class="answer-input" id="csAns" placeholder="?" min="0" max="99"><button class="btn btn-p" onclick="GAMES.countshape.check()">确认 ✓</button></div>'+
      '<p class="feedback" id="csfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  incCat: function(cat){
    gameState._csCounts[cat]++; document.getElementById('csCat'+cat).textContent=gameState._csCounts[cat];
    var t=gameState._csCounts[0]+gameState._csCounts[1]+gameState._csCounts[2];
    document.getElementById('csTotal').textContent=t;
    if(t===gameState.csAns) document.getElementById('csTotal').style.color='#00b894';
    else document.getElementById('csTotal').style.color='#ff6b6b';
    document.getElementById('csAns').value=t;
  },
  resetCat: function(){
    gameState._csCounts=[0,0,0];
    for(var i=0;i<3;i++) document.getElementById('csCat'+i).textContent='0';
    document.getElementById('csTotal').textContent='0';
    document.getElementById('csTotal').style.color='#ff6b6b';
    document.getElementById('csAns').value='';
  },
  check: function(){
    var ans=parseInt(document.getElementById('csAns').value),fb=document.getElementById('csfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.csAns){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('countshape',2);celebrate();updateStarTotal();awardExplore(currentGame);}
    else{fb.textContent='❌ 再仔细数数';fb.className='feedback err';awardResult(currentGame,false,0);}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.countshape;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.csAns3=p.ans; gameState.csExplain3=p.explain||p.hint;
    container.innerHTML=
      '<p style="font-weight:700;text-align:center;font-size:16px">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input type="number" class="answer-input" id="csAns3" placeholder="?" min="0" max="99"><button class="btn btn-p" onclick="GAMES.countshape.check3()">确认 ✓</button></div>'+
      '<p class="feedback" id="csfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('csAns3').value),fb=document.getElementById('csfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.csAns3){
      awardStage3('countshape', document.getElementById('stageContent'), '✅ 正确！'+gameState.csExplain3);
    }else{
      penalizeStage3(document.getElementById('stageContent'), '❌ 再仔细数数');
    }
  }
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
      '<div class="explain-box" data-interactive="true">'+
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
      if(gameState.blMoved===gameState.blAns){fb.textContent='✅ 完美！正好移动了'+gameState.blMoved+'个';fb.className='feedback ok';setStars('balance',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='✅ 两边相等了！但可以移得更少（最优：'+gameState.blAns+'个）';fb.className='feedback ok';}
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.balance;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.blAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>移动</span><input class="answer-input" id="blAns"><span>个</span><button class="btn btn-p" onclick="GAMES.balance.check3()">确认</button></div>'+
      '<p class="feedback" id="blfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('blAns').value),fb=document.getElementById('blfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.blAns3){awardStage3('balance',document.getElementById('stageContent'),'✅ 正确！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 移动数=(多出的)÷2');}
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
    gameState._slMatrix={}; // 推理矩阵：pz.people × pz.items → '?' '✓' '✗'
    pz.people.forEach(function(p){gameState._slMatrix[p]={};pz.items.forEach(function(it){gameState._slMatrix[p][it]='?';});});
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
    h+='</div>'+
      // 推理矩阵表
      '<div style="margin:12px auto;max-width:360px;background:#f8f9fa;border-radius:12px;padding:10px">'+
      '<p style="text-align:center;font-size:12px;color:#868e96;margin-bottom:6px">📋 推理矩阵（点击标记排除 ✗ 或确认 ✓）</p>'+
      '<table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="padding:4px"></th>'+
      pz.items.map(function(it){return '<th style="padding:4px;text-align:center">'+it+'</th>';}).join('')+'</tr>'+
      pz.people.map(function(person){
        return '<tr><td style="font-weight:700;padding:4px">'+person+'</td>'+
        pz.items.map(function(item){
          return '<td style="text-align:center;padding:2px"><span class="sl-matrix-cell" data-p="'+person+'" data-it="'+item+'" onclick="GAMES.simplelogic.toggleMatrix(this)" style="cursor:pointer;display:inline-block;width:28px;height:28px;line-height:28px;border-radius:50%;background:#e9ecef">?</span></td>';
        }).join('')+'</tr>';
      }).join('')+
      '</table></div>'+
      '<p class="feedback" id="slfb">点击每个人对应的物品吧！</p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
    container.innerHTML=h;
  },
  toggleMatrix: function(el){
    var p=el.dataset.p, it=el.dataset.it;
    var cur=gameState._slMatrix[p][it];
    if(cur==='?'){ gameState._slMatrix[p][it]='✗'; el.textContent='✗'; el.style.background='#fff5f5'; }
    else if(cur==='✗'){ gameState._slMatrix[p][it]='✓'; el.textContent='✓'; el.style.background='#f0fffc'; }
    else{ gameState._slMatrix[p][it]='?'; el.textContent='?'; el.style.background='#e9ecef'; }
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
      if(correct){fb.textContent='✅ 推理正确！太棒了！';fb.className='feedback ok';setStars('simplelogic',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='❌ 有些不对哦，再想想线索';fb.className='feedback err';awardResult(currentGame,false,0);}
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.simplelogic;
    var pz=pool[Math.floor(Math.random()*pool.length)];
    gameState.slPuzzle3=pz;
    container.innerHTML=
      '<p style="font-weight:700;text-align:center;font-size:16px">三人分别拿着：'+pz.items.join('、')+'</p>'+
      '<p style="font-size:14px;color:#636e72;text-align:center">线索：'+pz.clues.map(function(c,i){return (i+1)+'、'+c;}).join('；')+'</p>'+
      '<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:12px 0">'+
      pz.people.map(function(person){
        var h2='<div style="text-align:center"><div style="font-weight:700;margin-bottom:6px">'+person+'</div>';
        pz.items.forEach(function(item){
          h2+='<div class="item-chip sl-choice3" data-person="'+person+'" data-item="'+item+'" onclick="GAMES.simplelogic.choose3(this)" style="margin:3px">'+item+'</div>';
        });
        h2+='</div>'; return h2;
      }).join('')+
      '</div><p class="feedback" id="slfb3">点击每个人对应的物品吧！</p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  choose3: function(el){
    var person=el.dataset.person,item=el.dataset.item;
    document.querySelectorAll('.sl-choice3[data-person="'+person+'"]').forEach(function(c){c.classList.remove('selected');});
    el.classList.add('selected');
    var all=document.querySelectorAll('.sl-choice3.selected');
    if(all.length===gameState.slPuzzle3.people.length){
      var correct=true;
      all.forEach(function(a){ if(gameState.slPuzzle3.ans[a.dataset.person]!==a.dataset.item) correct=false; });
      var container=document.getElementById('stageContent');
      if(correct){ awardStage3('simplelogic', container, '✅ 推理正确！太棒了！'); }
      else{ penalizeStage3(container, '❌ 有些不对哦，再想想线索'); }
    }
  }
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
    if(ans===gameState.qAns2){fb.textContent='✅ 正确！'+gameState.qFromLeft+'+'+gameState.qFromRight+'-1='+gameState.qAns2;fb.className='feedback ok';setStars('queue',2);celebrate();updateStarTotal();awardExplore(currentGame);}
    else{fb.textContent='❌ 公式：左数+右数-1';fb.className='feedback err';awardResult(currentGame,false,0);}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.queue;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.qAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="qAns3"><button class="btn btn-p" onclick="GAMES.queue.check3()">确认</button></div>'+
      '<p class="feedback" id="qfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('qAns3').value),fb=document.getElementById('qfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.qAns3){awardStage3('queue',document.getElementById('stageContent'),'✅ 正确！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 再想想公式：左数+右数-1');}
  }
};

// === appended test ===

