/* ====== 测试套件：验证题库数据的完整性和答案检查逻辑 ====== */

var TEST_RESULTS = [];
var totalTests=0, passed=0, failed=0;
var errors=[];

function test(name, fn){
  totalTests++;
  try{
    var result=fn();
    if(result===true||result===undefined){ passed++; TEST_RESULTS.push({name:name,ok:true}); }
    else{ failed++; TEST_RESULTS.push({name:name,ok:false,msg:result}); }
  }catch(e){
    failed++; errors.push({name:name,error:e.message});
    TEST_RESULTS.push({name:name,ok:false,msg:e.message});
  }
}

// ═══════════════════════════════════════════
// 1. QUESTION_BANK 结构完整性
// ═══════════════════════════════════════════
var GAME_IDS=[
  'pattern','countshape','balance','simplelogic','queue',
  'substitution','cycle','tree','normalization','sumdiff',
  'summulti','diffmulti','age','profitloss','reverse','average',
  'chickenrabbit','venn','pigeonhole','logic','meeting','chase',
  'work','boatcurrent','cowgrass'
];

GAME_IDS.forEach(function(gid){
  test('题库存在: '+gid, function(){
    if(!QUESTION_BANK[gid]) return 'QUESTION_BANK.'+gid+' 不存在';
    if(!Array.isArray(QUESTION_BANK[gid])) return gid+' 不是数组';
    if(QUESTION_BANK[gid].length<3) return gid+' 题目数量不足（<3）';
  });
});

// ═══════════════════════════════════════════
// 2. checkAnswer() 正确性验证
// ═══════════════════════════════════════════
test('checkAnswer: 整数精确匹配', function(){
  if(!checkAnswer(5,5)) return '5===5 应返回true';
  if(checkAnswer(5,6)) return '5===6 应返回false';
});

test('checkAnswer: 浮点容差匹配', function(){
  if(!checkAnswer(3.5,3.5,0.15)) return '3.5≈3.5 应返回true';
  if(!checkAnswer(3.45,3.5,0.1)) return '3.45≈3.5(容差0.1) 应返回true';
  if(checkAnswer(3.2,3.5,0.1)) return '3.2≈3.5(容差0.1) 应返回false';
});

test('checkAnswer: 分数字符串匹配', function(){
  if(!checkAnswer(4.44,'40/9',0.15)) return '4.44≈40/9 应返回true';
  if(!checkAnswer(0.133,'2/15',0.01)) return '0.133≈2/15 应返回true';
  if(checkAnswer(5,'40/9',0.15)) return '5≈40/9 应返回false';
});

test('checkAnswer: 逗号分隔对匹配', function(){
  if(!checkAnswer('5,3','5,3')) return '"5,3"==="5,3" 应返回true';
  if(checkAnswer('5,4','5,3')) return '"5,4"!=="5,3" 应返回false';
});

test('checkAnswer: 空值处理', function(){
  if(checkAnswer('',5)) return '空字符串应返回false';
  if(checkAnswer(null,5)) return 'null应返回false';
  if(checkAnswer(undefined,5)) return 'undefined应返回false';
});

// ═══════════════════════════════════════════
// 3. 题库答案一致性验证
// ═══════════════════════════════════════════
test('pattern: 答案索引有效性', function(){
  var pool=QUESTION_BANK.pattern;
  for(var i=0;i<pool.length;i++){
    var q=pool[i];
    if(typeof q.ans!=='number') return 'Q'+i+' 答案不是数字';
    if(q.ans<0||q.ans>=q.opts.length) return 'Q'+i+' 答案索引 '+q.ans+' 超出选项范围 0-'+(q.opts.length-1);
    if(!q.seq||!q.opts) return 'Q'+i+' 缺少seq或opts';
  }
});

test('countshape/balance/queue: 整数答案一致性', function(){
  var games=['countshape','balance','queue','tree','normalization','substitution'];
  for(var g=0;g<games.length;g++){
    var pool=QUESTION_BANK[games[g]];
    for(var i=0;i<pool.length;i++){
      var q=pool[i];
      if(typeof q.ans!=='number'||!Number.isInteger(q.ans)) return games[g]+' Q'+i+' ans应为整数，实际: '+q.ans;
    }
  }
});

test('sumdiff/summulti/diffmulti/chickenrabbit: 逗号对答案', function(){
  var games=['sumdiff','summulti','diffmulti','chickenrabbit'];
  for(var g=0;g<games.length;g++){
    var pool=QUESTION_BANK[games[g]];
    for(var i=0;i<pool.length;i++){
      var ans=pool[i].ans.toString();
      if(ans.indexOf(',')===-1) return games[g]+' Q'+i+' ans应为逗号分隔对: '+ans;
      var parts=ans.split(',');
      if(parts.length!==2) return games[g]+' Q'+i+' ans应在两个数值之间: '+ans;
      if(isNaN(parseInt(parts[0]))||isNaN(parseInt(parts[1]))) return games[g]+' Q'+i+' ans包含非数字: '+ans;
    }
  }
});

test('simplelogic: 推理答案结构', function(){
  var pool=QUESTION_BANK.simplelogic;
  for(var i=0;i<pool.length;i++){
    var q=pool[i];
    if(!q.people||!q.items||!q.clues||!q.ans) return 'Q'+i+' 缺少必填字段';
    if(typeof q.ans!=='object') return 'Q'+i+' ans应为对象';
    q.people.forEach(function(p){
      if(!q.ans[p]) return 'Q'+i+' ans缺少人物: '+p;
      if(q.items.indexOf(q.ans[p])===-1) return 'Q'+i+' ans物品不在列表中: '+q.ans[p];
    });
  }
});

test('logic: 真假话推理结构', function(){
  var pool=QUESTION_BANK.logic;
  for(var i=0;i<pool.length;i++){
    var q=pool[i];
    if(!q.suspects||!q.statements||!q.culprit) return 'Q'+i+' 缺少必填字段';
    if(q.suspects.indexOf(q.culprit)===-1) return 'Q'+i+' culprit不在suspects中';
    for(var who in q.statements){
      if(q.suspects.indexOf(who)===-1) return 'Q'+i+' statements中的'+who+'不在suspects中';
    }
  }
});

test('cycle: 周期答案有效性', function(){
  var pool=QUESTION_BANK.cycle;
  for(var i=0;i<pool.length;i++){
    var c=pool[i];
    if(!c.arr||!c.len||!c.pos||!c.ans) return 'Q'+i+' 缺少必填字段';
    if(c.len<2) return 'Q'+i+' 周期长度应≥2';
    if(c.pos<1) return 'Q'+i+' 位置应≥1';
    // 验证答案在周期数组内
    var correctIdx=(c.pos-1)%c.len;
    var expectedAns=[...c.arr][correctIdx]; // 使用spread避免emoji多码点问题
    if(c.ans!==expectedAns) return 'Q'+i+' 答案'+c.ans+'不匹配: 位置'+c.pos+'应对应'+c.arr[correctIdx];
  }
});

test('meeting/chase/work/cowgrass: 浮点答案', function(){
  var games=['meeting','chase','work','cowgrass'];
  for(var g=0;g<games.length;g++){
    var pool=QUESTION_BANK[games[g]];
    for(var i=0;i<pool.length;i++){
      var q=pool[i];
      if(typeof q.ans==='number'&&q.ans<=0) return games[g]+' Q'+i+' 答案应>0';
    }
  }
});

test('boatcurrent: 混合答案类型', function(){
  var pool=QUESTION_BANK.boatcurrent;
  for(var i=0;i<pool.length;i++){
    var q=pool[i];
    // 有些是逗号对，有些是数字或分数
    var ans=q.ans.toString();
    if(ans.indexOf(',')>-1){
      var parts=ans.split(',');
      if(parts.length!==2) return 'Q'+i+' 逗号对格式错误';
    }
  }
});

// ═══════════════════════════════════════════
// 4. 框架函数验证
// ═══════════════════════════════════════════
test('genRandInt: 范围内随机', function(){
  for(var i=0;i<100;i++){
    var r=genRandInt(1,10);
    if(r<1||r>10) return '值'+r+'超出范围[1,10]';
  }
});

test('pickRandom: 返回数组元素', function(){
  var arr=['a','b','c'];
  for(var i=0;i<30;i++){
    if(arr.indexOf(pickRandom(arr))===-1) return '返回值不在数组中';
  }
});

test('getDifficultyTime: 三个难度级别', function(){
  if(getDifficultyTime('easy')!==120) return 'easy应为120s';
  if(getDifficultyTime('medium')!==75) return 'medium应为75s';
  if(getDifficultyTime('hard')!==45) return 'hard应为45s';
});

test('SCORE_CONFIG: 分值配置完整性', function(){
  var sc=SCORE_CONFIG;
  if(typeof sc.correct!=='number') return '缺少correct';
  if(typeof sc.streakBonus!=='number') return '缺少streakBonus';
  if(typeof sc.wrong!=='number') return '缺少wrong';
  if(typeof sc.explore!=='number') return '缺少explore';
  if(typeof sc.perfect!=='number') return '缺少perfect';
});

test('TOPICS: 25个游戏元数据', function(){
  if(TOPICS.length!==25) return '应有25个游戏，实际'+TOPICS.length;
  for(var i=0;i<TOPICS.length;i++){
    if(!TOPICS[i].id||!TOPICS[i].name||!TOPICS[i].cat) return 'TOPICS['+i+']缺少必填字段';
  }
});

test('SOURCES: 25个教材来源', function(){
  for(var i=0;i<TOPICS.length;i++){
    if(!SOURCES[TOPICS[i].id]) return TOPICS[i].name+' 缺少教材来源';
  }
});

test('HINT_MAP: 25个提示映射', function(){
  for(var i=0;i<TOPICS.length;i++){
    var h=HINT_MAP[TOPICS[i].id];
    if(!h) return TOPICS[i].name+' 缺少提示';
    if(!Array.isArray(h)||h.length<2) return TOPICS[i].name+' 提示不足2级';
  }
});

// ═══════════════════════════════════════════
// 输出结果
// ═══════════════════════════════════════════
function renderResults(){
  var summaryEl=document.getElementById('summary');
  var resultsEl=document.getElementById('results');
  var allPassed=(failed===0&&errors.length===0);
  summaryEl.innerHTML='<div class="summary '+(allPassed?'pass':'fail')+'">'+
    (allPassed?'✅ 全部通过！':'❌ 存在失败')+
    ' &nbsp; 总测试: '+totalTests+' &nbsp;|&nbsp; 通过: '+passed+' &nbsp;|&nbsp; 失败: '+failed+' &nbsp;|&nbsp; 错误: '+errors.length+
    '</div>';

  if(!allPassed){
    var h='';
    TEST_RESULTS.forEach(function(r){
      if(!r.ok) h+='<div class="test-item err">❌ '+r.name+': '+r.msg+'</div>';
    });
    errors.forEach(function(e){
      h+='<div class="test-item err">💥 '+e.name+': '+e.error+'</div>';
    });
    resultsEl.innerHTML=h;
  }
}

// 页面加载完成后运行
window.addEventListener('DOMContentLoaded',function(){
  setTimeout(renderResults,100);
});
