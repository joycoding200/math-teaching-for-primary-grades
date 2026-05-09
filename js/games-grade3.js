/* ====== games-grade3.js: 三年级游戏逻辑 ====== */
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
    if(a===gameState.smAnsA&&b===gameState.smAnsB){awardStage3('summulti',document.getElementById('stageContent'),'✅ 全对！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 小数=和÷(倍数+1)');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
    if(a===gameState.dmAnsA&&b===gameState.dmAnsB){awardStage3('diffmulti',document.getElementById('stageContent'),'✅ 全对！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 小数=差÷(倍数-1)');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
      if(k===gameState.ageAnsK&&d===gameState.ageAnsD){awardStage3('age',document.getElementById('stageContent'),'✅ 全对！年龄差不变，用差倍公式');}
      else{penalizeStage3(document.getElementById('stageContent'),'❌ 年龄差不变，用差倍公式');}
    }else{
      var ans=parseInt(document.getElementById('ageAns').value);
      if(isNaN(ans)){fb.textContent='请输入数字';return}
      if(ans===gameState.ageAns3){awardStage3('age',document.getElementById('stageContent'),'✅ 正确！');}
      else{penalizeStage3(document.getElementById('stageContent'),'❌ 年龄差不变，找对倍数关系');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.plAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>人数=</span><input class="answer-input" id="plAns3"><button class="btn btn-p" onclick="GAMES.profitloss.check3()">确认</button></div>'+
      '<p class="feedback" id="plfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('plAns3').value),fb=document.getElementById('plfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.plAns3){awardStage3('profitloss',document.getElementById('stageContent'),'✅ 正确！人数=(盈+亏)÷分法差');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 公式：(盈+亏)÷(分法之差)');}
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
      if(gameState.rvCur===gameState.rvX){fb.innerHTML='🎉 还原成功！原来的数是 <b style="color:#ff6b6b;font-size:20px">'+gameState.rvX+'</b>';fb.className='feedback ok';setStars('reverse',2);celebrate();updateStarTotal();awardExplore(currentGame);}
      else{fb.innerHTML='❌ 结果不对，你再检查一下步骤顺序';fb.className='feedback err';awardResult(currentGame,false,0);}
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.reverse;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.rvAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>原来的数=</span><input class="answer-input" id="rvAns3"><button class="btn btn-p" onclick="GAMES.reverse.check3()">确认</button></div>'+
      '<p class="feedback" id="rvfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('rvAns3').value),fb=document.getElementById('rvfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.rvAns3){awardStage3('reverse',document.getElementById('stageContent'),'✅ 正确！从结果倒推还原');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 从结果倒推：运算相反，顺序倒过来');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.avAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="avAns3"><button class="btn btn-p" onclick="GAMES.average.check3()">确认</button></div>'+
      '<p class="feedback" id="avfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('avAns3').value),fb=document.getElementById('avfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.avAns3)<0.1){awardStage3('average',document.getElementById('stageContent'),'✅ 正确！平均='+gameState.avAns3);}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ (总和)÷个数');}
  }
};

