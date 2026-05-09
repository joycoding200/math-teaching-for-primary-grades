/* ====== games-grade4.js: 四年级游戏逻辑 ====== */
// ══════════════════ 四年级 ══════════════════

// 17. 鸡兔同笼
GAMES.chickenrabbit = {
  stage1: function(container){
    var heads=5, legs=14; // 示例：5头14腿 → 3鸡2兔
    var allChickenLegs=heads*2, missing=legs-allChickenLegs;
    var rabbits=missing/2, chickens=heads-rabbits;
    container.innerHTML=
      '<div class="concept-svg" id="crAnim">'+
        '<div style="display:flex;gap:16px;justify-content:center;font-size:36px;margin:8px 0;min-height:50px" id="crAnimals">'+
        Array(heads).fill('🐔').map(function(_,i){return '<span id="crAnimal'+i+'" style="transition:all .5s">🐔</span>';}).join('')+
        '</div>'+
        '<div style="text-align:center;font-size:18px;font-weight:700">'+
        '<span>总腿数：</span><b style="color:#ff6b6b;font-size:24px" id="crLegCount">'+allChickenLegs+'</b>'+
        '<span> / 目标：<b>'+legs+'</b>条</span>'+
        '</div>'+
        '<div style="text-align:center;margin-top:8px">'+
        '<span style="font-size:13px;color:#868e96" id="crStatus">假设全是鸡🐔 → 5头10条腿，差了4条</span>'+
        '</div>'+
      '</div>'+
      '<div style="text-align:center;margin:8px 0">'+
      '<button class="btn btn-p" id="crReplayBtn" style="display:none" onclick="GAMES.chickenrabbit.replayAnim()">🔄 重播动画</button>'+
      '</div>'+
      '<div class="explain-box" data-interactive="true">'+
      '<div class="step"><span class="step-num">1</span><span class="highlight">假设法</span>：假设全是鸡，算出总腿数 = '+heads+'×2 = <span class="highlight">'+allChickenLegs+'条</span></div>'+
      '<div class="step"><span class="step-num">2</span>与实际腿数比较，腿数差 = '+legs+'−'+allChickenLegs+' = <span class="highlight">'+missing+'条</span></div>'+
      '<div class="step"><span class="step-num">3</span>每把1只鸡换成1只兔，腿数<span class="highlight">+2</span>。'+missing+'÷2 = <b>'+rabbits+'只兔</b>，'+heads+'−'+rabbits+' = <b>'+chickens+'只鸡</b></div>'+
      '</div>'+
      '<div class="formula-box">📌 鸡兔同笼：《孙子算经》经典题 — <b>假设→比较→替换</b></div>';
    // 动画：逐只替换
    gameState._crAnim={heads:heads,legs:legs,currentLegs:allChickenLegs,swapped:0,totalSwaps:rabbits,chickens:chickens};
    setTimeout(function(){ GAMES.chickenrabbit.animateSwap(); },800);
  },
  animateSwap: function(){
    var a=gameState._crAnim; if(!a) return;
    if(a.swapped>=a.totalSwaps){
      document.getElementById('crStatus').textContent='✅ 达成！'+a.chickens+'只鸡 + '+a.totalSwaps+'只兔 = '+a.legs+'条腿';
      document.getElementById('crStatus').style.color='#00b894';
      document.getElementById('crReplayBtn').style.display='inline-block';
      return;
    }
    var idx=a.heads-1-a.swapped; // 从右边开始替换
    var el=document.getElementById('crAnimal'+idx);
    if(el){ el.style.transform='scale(1.3)'; el.style.opacity='0.5'; }
    setTimeout(function(){
      if(el){ el.textContent='🐰'; el.style.transform='scale(1)'; el.style.opacity='1'; }
      a.swapped++; a.currentLegs+=2;
      document.getElementById('crLegCount').textContent=a.currentLegs;
      document.getElementById('crStatus').textContent='第'+a.swapped+'次替换：鸡🐔→兔🐰，腿数 +2 → '+a.currentLegs+'条';
      if(a.currentLegs===a.legs) document.getElementById('crLegCount').style.color='#00b894';
      setTimeout(function(){ GAMES.chickenrabbit.animateSwap(); },600);
    },400);
  },
  replayAnim: function(){
    var a=gameState._crAnim; if(!a) return;
    // 重置
    a.currentLegs=a.heads*2; a.swapped=0;
    document.getElementById('crLegCount').textContent=a.currentLegs;
    document.getElementById('crLegCount').style.color='#ff6b6b';
    document.getElementById('crStatus').textContent='假设全是鸡🐔 → '+a.heads+'头10条腿，差了'+(a.legs-a.currentLegs)+'条';
    document.getElementById('crStatus').style.color='#868e96';
    document.getElementById('crReplayBtn').style.display='none';
    for(var i=0;i<a.heads;i++){
      var el=document.getElementById('crAnimal'+i); if(el) el.textContent='🐔';
    }
    setTimeout(function(){ GAMES.chickenrabbit.animateSwap(); },500);
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
      fb.className='feedback ok';setStars('chickenrabbit',2);celebrate();updateStarTotal();awardExplore(currentGame);
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.chickenrabbit;
    var p=pickAdaptiveQuestion(currentGame,pool);
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
    if(c===gameState.crAnsC&&r===gameState.crAnsR){awardStage3('chickenrabbit',document.getElementById('stageContent'),'✅ 全对！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 用假设法：先假设全是鸡，再替换');}
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
    if(ans===gameState.vnUnion){fb.textContent='✅ 正确！A+B-都='+gameState.vnA+'+'+gameState.vnB+'-'+gameState.vnBoth+'='+gameState.vnUnion;fb.className='feedback ok';setStars('venn',2);celebrate();updateStarTotal();awardExplore(currentGame);}
    else{fb.textContent='❌ 公式：A+B-都喜欢';fb.className='feedback err';awardResult(currentGame,false,0);}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.venn;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.vnAns3=p.ans; gameState.vnQ3=p.q; gameState.vnHint3=p.hint;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700;font-size:16px">'+p.q+'</p>'+
      makeVennSVG()+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="vnAns3"><button class="btn btn-p" onclick="GAMES.venn.check3()">确认</button></div>'+
      '<p class="feedback" id="vnfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('vnAns3').value),fb=document.getElementById('vnfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.vnAns3){
      awardStage3('venn', document.getElementById('stageContent'), '✅ 正确！A+B-都='+gameState.vnAns3);
    }else{
      penalizeStage3(document.getElementById('stageContent'), '❌ 公式：A+B-都喜欢');
    }
  }
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
      '<div class="explain-box" data-interactive="true">'+
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
    var h='<p style="text-align:center;font-weight:700">把<b>'+gameState.phItems+'</b>个🍎放入<b>'+gameState.phBoxes+'</b>个📦抽屉</p>';
    h+='<div style="display:flex;gap:10px;justify-content:center">';
    for(var i=0;i<gameState.phBoxes;i++){
      h+='<div style="background:#f8f9fa;padding:10px;border-radius:12px;text-align:center;cursor:pointer;min-width:64px" onclick="GAMES.pigeonhole.addTo('+i+')">📦<br><span style="font-size:22px">'+'🍎'.repeat(gameState.phInBoxes[i])+'</span><br><span style="font-size:12px">抽屉'+(i+1)+'('+gameState.phInBoxes[i]+'个)</span></div>';
    }
    h+='</div><p>剩余: <b id="phRemain">'+gameState.phRemaining+'</b>个🍎</p>';
    h+='<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">'+
    '<button class="btn btn-s" onclick="GAMES.pigeonhole.balancedDist()">⚖️ 均匀分配（最坏情况）</button>'+
    '<button class="btn btn-o" onclick="renderGameStage()">🔄 重置</button></div>'+
    '<p style="font-size:13px;color:#adb5bd;text-align:center">点击抽屉放入🍎，或点"均匀分配"看最坏情况</p>';
    var maxInOne=Math.max.apply(null,gameState.phInBoxes);
    var minGuarantee=Math.ceil(gameState.phItems/gameState.phBoxes);
    h+='<p style="font-weight:700">最多的抽屉有: <b style="color:#ff6b6b">'+maxInOne+'</b>个 &nbsp;|&nbsp; 理论至少: <b style="color:#4ecdc4">≥'+minGuarantee+'</b>个</p>';
    if(gameState.phRemaining===0){
      h+='<p class="feedback ok">✅ 全部放完！至少有一个抽屉有'+maxInOne+'个（结论：'+gameState.phItems+'÷'+gameState.phBoxes+'='+minGuarantee.toFixed(1)+' → 至少'+minGuarantee+'个）</p>';
    }
    container.innerHTML=h;
  },
  addTo: function(i){
    if(gameState.phRemaining<=0)return;
    gameState.phInBoxes[i]++;gameState.phRemaining--;
    GAMES.pigeonhole.renderPH();
    if(gameState.phRemaining===0){setStars('pigeonhole',2);celebrate();updateStarTotal();awardExplore(currentGame);}
  },
  balancedDist: function(){
    // 均匀分配：每个抽屉放 floor(items/boxes) 个，余数逐个分配
    var each=Math.floor(gameState.phItems/gameState.phBoxes);
    var rem=gameState.phItems%gameState.phBoxes;
    for(var i=0;i<gameState.phBoxes;i++){
      gameState.phInBoxes[i]=each+(i<rem?1:0);
    }
    gameState.phRemaining=0;
    GAMES.pigeonhole.renderPH();
    if(gameState.phRemaining===0){setStars('pigeonhole',2);celebrate();updateStarTotal();awardExplore(currentGame);}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.pigeonhole;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.phAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>不少于</span><input class="answer-input" id="phAns3"><span>个</span><button class="btn btn-p" onclick="GAMES.pigeonhole.check3()">确认</button></div>'+
      '<p class="feedback" id="phfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('phAns3').value),fb=document.getElementById('phfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.phAns3){awardStage3('pigeonhole',document.getElementById('stageContent'),'✅ 正确！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 考虑最坏情况：平均分配后向上取整');}
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
    if(who===pz.culprit){fb.textContent='✅ 正确！'+who+'就是小偷！';fb.className='feedback ok';setStars('logic',2);celebrate();updateStarTotal();awardExplore(currentGame);}
  },
  stage3: function(container){
    var pool=QUESTION_BANK.logic;
    var pz=pool[Math.floor(Math.random()*pool.length)];
    gameState.lgPuzzle3=pz;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700;font-size:16px">'+pz.q+'</p>'+
      '<div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin:12px 0">'+
      Object.keys(pz.statements).map(function(who){
        return '<div class="item-chip lg-chip3" data-who="'+who+'" onclick="GAMES.logic.choose3(this)" style="padding:12px 20px;font-size:15px">'+who+'说："'+pz.statements[who]+'"</div>';
      }).join('')+
      '</div><p style="font-size:14px;text-align:center;color:#636e72">找出小偷（小偷在说谎，其他人都说真话）</p>'+
      '<p class="feedback" id="lgfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  choose3: function(el){
    document.querySelectorAll('.lg-chip3').forEach(function(c){c.style.borderColor='#dee2e6';c.style.background='#f8f9fa';});
    el.style.borderColor='#ff6b6b';el.style.background='#fff5f5';
    var who=el.dataset.who,container=document.getElementById('stageContent');
    if(who===gameState.lgPuzzle3.culprit){ awardStage3('logic', container, '✅ 正确！'+who+'就是小偷！'); }
    else{ penalizeStage3(container, '❌ '+who+'不是小偷，再想想谁在说谎'); }
  }
};

// 21. 相遇问题
GAMES.meeting = {
  stage1: function(container){
    var dist=300, sA=60, sB=40, sumS=sA+sB, time=dist/sumS;
    var meetPos=sA*time; // 小明出发位置0，相遇点距起点 meetPos 米
    container.innerHTML=
      '<div class="concept-svg" id="mtAnim" style="position:relative;height:90px;background:#f8f9fa;border-radius:12px;overflow:hidden;margin-bottom:8px">'+
        // 距离标尺
        '<div style="position:absolute;top:4px;left:10px;right:10px;text-align:center;font-size:11px;color:#868e96">← '+dist+'米 →</div>'+
        // 轨道线
        '<div style="position:absolute;top:28px;left:10px;right:10px;height:2px;background:#dee2e6"></div>'+
        // 起点标记
        '<div style="position:absolute;top:18px;left:10px;font-size:10px;color:#adb5bd">0m</div>'+
        '<div style="position:absolute;top:18px;right:10px;font-size:10px;color:#adb5bd">'+dist+'m</div>'+
        // 相遇点标记（虚线）
        '<div id="mtMeetMarker" style="position:absolute;top:24px;left:'+(10+meetPos/dist*340)+'px;height:14px;border-left:2px dashed #ff6b6b;display:none"></div>'+
        // 小明（左→右）
        '<div id="mtBoy" style="position:absolute;top:34px;left:10px;font-size:28px;transition:left .1s linear">🧑</div>'+
        // 小红（右→左）
        '<div id="mtGirl" style="position:absolute;top:34px;right:10px;font-size:28px;transition:left .1s linear">👧</div>'+
        // 距离计数器
        '<div style="position:absolute;bottom:4px;left:10px;right:10px;text-align:center;font-size:14px;font-weight:700">'+
        '<span>剩余距离：</span><b style="color:#ff6b6b" id="mtRemainDist">'+dist+'</b><span>米</span> &nbsp; '+
        '<span>已过：</span><b style="color:#4ecdc4" id="mtElapsed">0</b><span>分钟</span>'+
        '</div>'+
      '</div>'+
      '<div style="text-align:center;margin:4px 0">'+
      '<button class="btn btn-p" id="mtReplayBtn" style="display:none" onclick="GAMES.meeting.replayAnim()">🔄 重播动画</button>'+
      '</div>'+
      '<div class="explain-box" data-interactive="true">'+
      '<div class="step"><span class="step-num">1</span>相向而行：<span class="highlight">速度和</span> = '+sA+'+'+sB+' = '+sumS+'米/分</div>'+
      '<div class="step"><span class="step-num">2</span>相遇时间 = 距离 ÷ 速度和 = '+dist+'÷'+sumS+' = <span class="highlight">'+time+'分钟</span></div>'+
      '</div>'+
      '<div class="formula-box">📌 相遇问题公式：<b>时间 = 距离 ÷ (速度A + 速度B)</b></div>';
    // 动画参数存入 gameState
    gameState._mtAnim={dist:dist, sA:sA, sB:sB, sumS:sumS, time:time, meetPos:meetPos, elapsed:0, animId:null};
    setTimeout(function(){ GAMES.meeting.startAnim(); },600);
  },
  startAnim: function(){
    var a=gameState._mtAnim; if(!a) return;
    var boy=document.getElementById('mtBoy'), girl=document.getElementById('mtGirl');
    var remainEl=document.getElementById('mtRemainDist'), elapsedEl=document.getElementById('mtElapsed');
    var marker=document.getElementById('mtMeetMarker');
    var trackW=340; // 可用轨道宽度（px）
    var startTime=Date.now(), animDuration=a.time*1000; // 1分钟 = 1秒动画
    if(marker) marker.style.display='block';
    function frame(){
      var raw=(Date.now()-startTime)/1000;
      var t=Math.min(raw, a.time);
      var boyM=a.sA*t, boyX=10+(boyM/a.dist)*trackW;
      var girlM=a.dist-a.sB*t, girlX=10+(girlM/a.dist)*trackW;
      if(boy) boy.style.left=boyX+'px';
      if(girl) girl.style.left=girlX+'px';
      var remain=Math.max(0, a.dist - (a.sA+a.sB)*t);
      if(remainEl) remainEl.textContent=Math.round(remain);
      if(elapsedEl) elapsedEl.textContent=t.toFixed(1);
      if(t >= a.time){
        if(remainEl) remainEl.textContent='0';
        if(elapsedEl) elapsedEl.textContent=a.time.toFixed(1);
        document.getElementById('mtReplayBtn').style.display='inline-block';
        // 相遇特效
        if(boy){ boy.textContent='🤝'; boy.style.fontSize='36px'; }
        if(girl) girl.style.display='none';
        return;
      }
      a.animId=requestAnimationFrame(frame);
    }
    a.animId=requestAnimationFrame(frame);
  },
  replayAnim: function(){
    var a=gameState._mtAnim; if(!a) return;
    if(a.animId){ cancelAnimationFrame(a.animId); a.animId=null; }
    var boy=document.getElementById('mtBoy'), girl=document.getElementById('mtGirl');
    if(boy){ boy.style.left='10px'; boy.textContent='🧑'; boy.style.fontSize='28px'; }
    if(girl){ girl.style.left=''; girl.style.right='10px'; girl.style.display=''; }
    document.getElementById('mtRemainDist').textContent=a.dist;
    document.getElementById('mtElapsed').textContent='0';
    document.getElementById('mtReplayBtn').style.display='none';
    document.getElementById('mtMeetMarker').style.display='none';
    setTimeout(function(){ GAMES.meeting.startAnim(); },300);
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.mtAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>相遇时间=</span><input class="answer-input" id="mtAns3"><span>分钟/小时</span><button class="btn btn-p" onclick="GAMES.meeting.check3()">确认</button></div>'+
      '<p class="feedback" id="mtfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('mtAns3').value),fb=document.getElementById('mtfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(checkAnswer(ans,gameState.mtAns3,0.15)){awardStage3('meeting',document.getElementById('stageContent'),'✅ 正确！时间=距离÷速度和');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 公式：距离÷(速度A+速度B)');}
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
      '<div class="explain-box" data-interactive="true">'+
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.chAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>追及时间=</span><input class="answer-input" id="chAns3"><span>分钟/小时</span><button class="btn btn-p" onclick="GAMES.chase.check3()">确认</button></div>'+
      '<p class="feedback" id="chfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('chAns3').value),fb=document.getElementById('chfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(checkAnswer(ans,gameState.chAns3,0.15)){awardStage3('chase',document.getElementById('stageContent'),'✅ 正确！时间=距离÷速度差');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 公式：领先距离÷(快-慢)');}
  }
};

