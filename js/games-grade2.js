/* ====== games-grade2.js: 二年级游戏逻辑 ====== */
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
        setStars('substitution',2);celebrate();updateStarTotal();awardExplore(currentGame);
      }
    },300);
  },
  stage3: function(container){
    var pool=QUESTION_BANK.substitution;
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.subAns=p.ans;
    container.innerHTML=
      '<p style="font-size:16px;font-weight:600;text-align:center">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input type="number" class="answer-input" id="subAns" placeholder="?" min="0" max="99"><button class="btn btn-p" onclick="GAMES.substitution.check()">确认 ✓</button></div>'+
      '<p class="feedback" id="subfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check: function(){
    var ans=parseInt(document.getElementById('subAns').value),fb=document.getElementById('subfb');
    if(isNaN(ans)){fb.textContent='请输入数字哦～';return}
    if(ans===gameState.subAns){awardStage3('substitution',document.getElementById('stageContent'),'✅ 太棒了！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 再想想哦～');}
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
    gameState._cyCurPos=1; gameState._cyAnimId=null;
    container.innerHTML=
      '<p style="text-align:center;font-size:18px">周期：'+[...c.arr].join(' ') + ' （每'+c.len+'个一循环）</p>'+
      '<div style="background:#f8f9fa;border-radius:12px;padding:16px;text-align:center;margin:8px 0">'+
      '<div style="display:flex;gap:12px;justify-content:center;font-size:36px;flex-wrap:wrap" id="cyAnimRow">'+
      [...c.arr].map(function(ch,i){return '<span id="cyAnim'+i+'" style="transition:all .3s;padding:4px 8px;border-radius:8px">'+ch+'</span>';}).join('')+
      '</div>'+
      '<p style="margin-top:8px;font-size:14px;color:#636e72">位置 <b style="color:#ff6b6b;font-size:20px" id="cyCurPos">1</b> → <b id="cyCurItem" style="font-size:22px">'+c.arr[0]+'</b></p>'+
      '<div class="slider-grp" style="max-width:280px;margin:8px auto">'+
      '<label>拖动位置</label><span class="slider-val" id="cyPosV">1</span>'+
      '<input type="range" id="cyPosS" min="1" max="30" value="1" oninput="GAMES.cycle.slidePos()"></div>'+
      '<button class="btn btn-s" id="cyAutoBtn" onclick="GAMES.cycle.toggleAuto()">▶ 自动演示</button>'+
      '</div>'+
      '<p style="font-weight:700;text-align:center">第 <b style="color:#ff6b6b;font-size:22px">'+c.pos+'</b> 个是什么？</p>'+
      '<div class="item-grid">'+[...c.arr].map(function(ch){return '<div class="item-chip" onclick="GAMES.cycle.choose(\''+ch+'\',this)">'+ch+'</div>';}).join('')+'</div>'+
      '<p class="feedback" id="cyfb"></p><button class="btn btn-o" onclick="GAMES.cycle.stopAnim();renderGameStage()">🔄 换一题</button>';
  },
  slidePos: function(){
    var pos=parseInt(document.getElementById('cyPosS').value);
    var idx=(pos-1)%gameState.cyLen, ch=gameState.cyArr[idx];
    document.getElementById('cyCurPos').textContent=pos;
    document.getElementById('cyCurItem').textContent=ch;
    document.getElementById('cyPosV').textContent=pos;
    document.querySelectorAll('#cyAnimRow span').forEach(function(s,i){s.style.background=i===idx?'#fff5f5':'';s.style.transform=i===idx?'scale(1.2)':'';});
  },
  toggleAuto: function(){
    var btn=document.getElementById('cyAutoBtn');
    if(gameState._cyAnimId){ GAMES.cycle.stopAnim(); btn.textContent='▶ 自动演示'; return; }
    btn.textContent='⏸ 停止'; var pos=parseInt(document.getElementById('cyPosS').value);
    function step(){ if(!gameState._cyAnimId) return;
      pos=pos>=30?1:pos+1; document.getElementById('cyPosS').value=pos; GAMES.cycle.slidePos();
      gameState._cyAnimId=setTimeout(step,500);
    }
    gameState._cyAnimId=setTimeout(step,100);
  },
  stopAnim: function(){ if(gameState._cyAnimId){clearTimeout(gameState._cyAnimId);gameState._cyAnimId=null;} },
  choose: function(ch,el){
    var fb=document.getElementById('cyfb');
    if(ch===gameState.cyAns){
      fb.textContent='✅ 正确！'+gameState.cyPos+'÷'+gameState.cyLen+'='+Math.floor(gameState.cyPos/gameState.cyLen)+'...'+((gameState.cyPos%gameState.cyLen)||gameState.cyLen);
      fb.className='feedback ok';el.classList.add('selected');setStars('cycle',2);celebrate();updateStarTotal();awardExplore(currentGame);
    }else{
      fb.textContent='❌ 用除法算算：'+gameState.cyPos+'÷'+gameState.cyLen+'=?';
      fb.className='feedback err';awardResult(currentGame,false,0);el.classList.add('wrong');setTimeout(function(){el.classList.remove('wrong');},500);
    }
  },
  stage3: function(container){
    var pool=QUESTION_BANK.cycle;
    var c=pool[Math.floor(Math.random()*pool.length)];
    gameState.cyAns3=c.ans; gameState.cyArr3=c.arr; gameState.cyLen3=c.len; gameState.cyPos3=c.pos;
    container.innerHTML=
      '<p style="text-align:center;font-size:18px">周期：'+[...c.arr].join(' ') + ' （每'+c.len+'个一循环）</p>'+
      '<p style="font-weight:700;text-align:center">第 <b style="color:#ff6b6b;font-size:22px">'+c.pos+'</b> 个是什么？</p>'+
      '<div class="item-grid">'+[...c.arr].map(function(ch){return '<div class="item-chip" onclick="GAMES.cycle.check3(\''+ch+'\',this)">'+ch+'</div>';}).join('')+'</div>'+
      '<p class="feedback" id="cyfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(ch,el){
    var fb=document.getElementById('cyfb3');
    if(ch===gameState.cyAns3){
      fb.textContent='✅ 正确！'+gameState.cyPos3+'÷'+gameState.cyLen3+'='+Math.floor(gameState.cyPos3/gameState.cyLen3)+'...'+((gameState.cyPos3%gameState.cyLen3)||gameState.cyLen3);
      fb.className='feedback ok';el.classList.add('selected');
      awardStage3('cycle', document.getElementById('stageContent'));
    }else{
      el.classList.add('wrong'); setTimeout(function(){el.classList.remove('wrong');},500);
      penalizeStage3(document.getElementById('stageContent'), '❌ 用除法算算：'+gameState.cyPos3+'÷'+gameState.cyLen3+'=?');
    }
  }
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.trAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>答案：</span><input class="answer-input" id="trAns3"><button class="btn btn-p" onclick="GAMES.tree.check3()">确认</button></div>'+
      '<p class="feedback" id="trfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseInt(document.getElementById('trAns3').value),fb=document.getElementById('trfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.trAns3){awardStage3('tree',document.getElementById('stageContent'),'✅ 正确！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 先算段数，再根据种植方式确定树数');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.nmAns=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><input class="answer-input" id="nmAns" placeholder="?"><button class="btn btn-p" onclick="GAMES.normalization.check()">确认</button></div>'+
      '<p class="feedback" id="nmfb"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check: function(){
    var ans=parseInt(document.getElementById('nmAns').value),fb=document.getElementById('nmfb');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(ans===gameState.nmAns){awardStage3('normalization',document.getElementById('stageContent'),'✅ 正确！');}
    else{penalizeStage3(document.getElementById('stageContent'),'❌ 先求1份的量（归一），再求多份');}
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
    if(a===gameState.sdAnsA&&b===gameState.sdAnsB){awardStage3('sumdiff',document.getElementById('stageContent'),'✅ 全对！');}
    else if(a===gameState.sdAnsA){penalizeStage3(document.getElementById('stageContent'),'大数对了！小数=(和-差)÷2');}
    else if(b===gameState.sdAnsB){penalizeStage3(document.getElementById('stageContent'),'小数对了！大数=(和+差)÷2');}
    else{penalizeStage3(document.getElementById('stageContent'),'再想想公式：(和±差)÷2');}
  }
};
