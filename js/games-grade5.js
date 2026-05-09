/* ====== games-grade5.js: 五年级游戏逻辑 ====== */
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
      '<div class="explain-box" data-interactive="true">'+
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
      if(Math.abs(ans-gameState.wkAns3)<0.15){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('work',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='❌ 公式：1÷(1/T₁+1/T₂)';fb.className='feedback err';awardResult(currentGame,false,0);}
    }else{
      if(String(ans)===String(gameState.wkAns3)){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('work',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='❌ 公式：1÷(1/T₁+1/T₂)';fb.className='feedback err';awardResult(currentGame,false,0);}
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
      '<div class="explain-box" data-interactive="true">'+
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
    var p=pickAdaptiveQuestion(currentGame,pool);
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
      if(a1===gameState.bcAns1&&a2===gameState.bcAns2){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('boatcurrent',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='❌ 顺水=v+c，逆水=v-c（或船速=(顺+逆)÷2）';fb.className='feedback err';awardResult(currentGame,false,0);}
    }else{
      var ans=parseFloat(document.getElementById('bcAns1').value);
      if(isNaN(ans)){fb.textContent='请输入数字';return}
      if(Math.abs(ans-parseFloat(gameState.bcAns1))<0.2){fb.textContent='✅ 正确！';fb.className='feedback ok';setStars('boatcurrent',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
      else{fb.textContent='❌ 再算算：顺水=v+c，逆水=v-c';fb.className='feedback err';awardResult(currentGame,false,0);}
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
      '<div class="explain-box" data-interactive="true">'+
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
    var p=pickAdaptiveQuestion(currentGame,pool);
    gameState.cgAns3=p.ans;
    container.innerHTML=
      '<p style="text-align:center;font-weight:700">'+p.q+'</p>'+
      '<div class="answer-row"><span>需要</span><input class="answer-input" id="cgAns3"><span>天</span><button class="btn btn-p" onclick="GAMES.cowgrass.check3()">确认</button></div>'+
      '<p class="feedback" id="cgfb3"></p><button class="btn btn-o" onclick="renderGameStage()">🔄 换一题</button>';
  },
  check3: function(){
    var ans=parseFloat(document.getElementById('cgAns3').value),fb=document.getElementById('cgfb3');
    if(isNaN(ans)){fb.textContent='请输入数字';return}
    if(Math.abs(ans-gameState.cgAns3)<0.15){fb.textContent='✅ 正确！先求每天长草量和原有草量';fb.className='feedback ok';setStars('cowgrass',3);celebrate();updateStarTotal();awardResult(currentGame,true,0);}
    else{fb.textContent='❌ 先算每天长草量=(N₁T₁-N₂T₂)÷(T₁-T₂)，再算原有草量';fb.className='feedback err';awardResult(currentGame,false,0);}
  }
};

