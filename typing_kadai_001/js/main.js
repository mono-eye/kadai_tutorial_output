
/*-------------------------------
  main003.js
 -------------------------------*/

/*===============================
変数の初期化
===============================*/
let untyped = '';
let typed = '';
let score = 0;
let typeCount = 0;

/*===============================
必要なHTML要素の取得
===============================*/
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
//背面のHTMLの要素の取得
const wrap = document.getElementById('wrap');
//スタートボタンのidを取得
const start = document.getElementById('start');
//タイマーのidを取得
const count = document.getElementById('count');
//タイプ数の表示idを取得
const typeCounter = document.getElementById('typeCounter');



/*===============================
複数のテキストを格納する配列
===============================*/
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

/*===============================
ランダムなテキストを表示する機能
===============================*/
const createText = () => {

// 正タイプした文字列をクリア
typed = '';
typedfield.textContent = typed;


// 配列のインデックス数からランダムな数値を生成する
let random = Math.floor(Math.random() * textLists.length);

// 配列からランダムにテキストを取得し画面に表示する
untyped = textLists[random];
untypedfield.textContent = untyped;
};
 
 createText();



/*===============================
キー入力の判定ができる機能
===============================*/

const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');

    // 間違えたら100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
   return;
 }

  // 正タイプの場合
  // スコアの1ずつ加算、インクリメント演算子
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

/*===============================
タイピングをしたときに、変数に1を追加して表示させるでもシフトキーは追加しない
===============================*/

document.addEventListener('keydown', function(event) {
  if (!event.shiftKey) { // シフトキーが押されていない場合のみ
    typeCount++;
    document.getElementById('typeCounter').textContent = typeCount; // HTMLに反映
  }
});



/*===============================
タイピングスキルのランクを判定する機能
===============================*/
const rankCheck = () => {
  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;

};

/*===============================
ゲームを終了する機能
===============================*/

const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }

};

/*===============================
カウントダウンタイマーの機能
===============================*/
  // const timer = () => {};
  const timer = () => {
  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
  // カウントダウンする1ずつ減算、デクリメント演算子
      time--;
      count.textContent = time;
      // カウントが0になったらタイマーを停止する
      if(time <= 0) {
        clearInterval(id);
        // 引数id（setInterval()メソッドの戻り値）を受け取って、
        // カウントダウンを停止
        // コンソールログにメッセージを表示
        gameOver(id);
      }
    }, 1000);
  };



  // ゲームスタート時の処理
  start.addEventListener('click', () => {

   // カウントダウンタイマーを開始する
   timer();

  // ランダムなテキストを表示する
  createText();
  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';
  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';


