/* global Chart */

// 保存された回答
let x = [
  parseInt(sessionStorage.getItem('q01')),
  parseInt(sessionStorage.getItem('q02')),
  parseInt(sessionStorage.getItem('q03')),
  parseInt(sessionStorage.getItem('q04')),
  parseInt(sessionStorage.getItem('q05')),
  parseInt(sessionStorage.getItem('q06')),
  parseInt(sessionStorage.getItem('q07')),
  parseInt(sessionStorage.getItem('q08')),
  parseInt(sessionStorage.getItem('q09')),
  parseInt(sessionStorage.getItem('q10')),
  parseInt(sessionStorage.getItem('q11')),
  parseInt(sessionStorage.getItem('q12'))
];

// 係数
let c = [
  [2, -2, 1, 0, 0, -2, 0, 0, 1, 0, 0, 2],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, -1, 0, 0, 0, 0, 1, 0, 2, 0, 0, -1],
  [-1, 1, 0, 0, 0, 0, 2, -1, 1, -1, 0, -1],
  [-1, 2, 0, 0, 0, 0, 0, 0, 1, 0, 1, -1],
  [-1, -1, 1, 2, 1, 1, -1, -1, 1, 0, 2, -1],
  [1, 0, 1, -1, 1, 2, 1, -1, 1, -1, -1, -1],
  [-1, 0, 0, -1, 3, 0, -2, 0, 0, 3, 0, 0],
  [0, -1, 0, 1, 0, 0, -1, 2, 1, -1, 0, 1]
];

let cthulhus = [
  {'name':'クトゥルフ', 'image':'cthulhu.png', 'lead':'南太平洋に沈ぬ都市ルルイエで暝る《旧支配者》', 'description':'死せるクトゥルー、ルルイエの館にて、夢見るままに待ちいたり<br>《旧支配者》の一柱。太古にゾス星系から地球に飛来しムー大陸を支配したが、星唇の乱れによりルルイエとともに海底に沈み瞑りについている。クトゥルフの見る夢は、人々の心をかき乱す。<br>ネクロノミコンには「そは永久に横たわる死者にあらねど、測り知れざる永劫のもとに死を越ゆるもの」と書かれている。'},
  {'name':'ムーン＝ビースト', 'image':'moon_beast.png', 'lead':'ドリームランドの月に棲む嗜虐な生き物', 'description':'ムーン＝ビーストは、夢の奥底にある「ドリームランド」の月からやってきて、レン高原を支配していて、拷問を楽しむ性向がある。<br>ラブクラフトの「未知なるカダスを夢に求めて」には「灰色がかった白い油ぎった肌はまるで目のないヒキガエルのようで、その皮膚は伸縮自在に形を変える。顔を鼻にあたるであろう部分にはピンク色の短い触手が生えている」と書かれている。'},
  {'name':'ヨグ＝ソトース', 'image':'yog_sothoth.png', 'lead':'時空の制約を受けない〈最極の空虚〉', 'description':'太陽のように強烈な光を放つ玉虫色の球体の集積の姿をしている。<br>あらゆる大地、あらゆる宇宙、あらゆる物質を超越する。「外なる神」のいる外宇宙への門の鍵であり守護者であり、宇宙の秘密そのものである。<br>Y\'AI\'NG\'NGAH YOG-SOTHOTH H\'EE--L\'GEB F\'AI THRODOG UAAAH<br>OGTHROD AI\'F GEB\'L-EE\'H YOG-SOTHOTH \'NGAH\'NG AI\'Y ZHRO'},
  {'name':'クトゥグア', 'image':'cthugha.png', 'lead':'フォマルはウトの「生ける炎」', 'description':'フォマルハウトに棲む《旧支配者》で、青白い炎の荒れ狂う姿をしている。召喚には危険が伴う。<br>ナイアーラトテップの天敵。<br>フングルイ ムグルウナフ クトゥグア ホマルハウト ウガア＝グアア ナフル タグン！ イア！ クトゥグア！'},
  {'name':'ハスター', 'image':'hastur.png', 'lead':'風を司る《旧支配者》の一柱「名状しがたきもの」', 'description':'かつて宇宙空間を駆け巡る力を持っていたが、現在は、アルデバランの近くの暗黒星にある「黒きハリ湖」の湖底に棲み、羊飼いの神と見なされている。クトゥルフとは敵対している。<br>読む者を破滅に誘うという戯曲「黄衣の王」に描かれた姿でも登場するという。<br>いあ！ いあ！ はすたあ！ はすたあ くふあやく ぶるぐとむ ぶぐとらぐるん ぶるぐとむ あい！ あい！ はすたあ！'},
  {'name':'ナイアーラトテップ', 'image':'nyarlathotep.png', 'lead':'《外なる神》の使者「這い寄る混沌」', 'description':'アザトースら《外なる神》の使者であり代行者。<br>様々な姿をとるため、千の貌と名を持つとも無貌とも言われる。<br>本来の姿は「咆哮する貌のない円錐形の頭部を持つ肉の塊で、触腕、鉤爪、手が際限なく伸縮する」とも言われる。'},
  {'name':'アザトース', 'image':'azathoth.png', 'lead':'万物の王にして盲目で白痴の神「魔王」', 'description':'すべての無限の中核で冒瀆の言辞を吐きちらして沸きかえる、最下の混沌の最後の無定形の暗影。<br>《外なる神》の総帥で、副王ヨグ＝ソトース、使者ナイアーラトテップなどを生み出した。'},
  {'name':'ミ＝ゴ', 'image':'mi_go.png', 'lead':'雪男、「ユゴスよりのもの」', 'description':'冥王星「ユゴス」から希少鉱物を求めて飛来した知的な菌類生物。類人猿の姿をしたものが雪男と言われている。<br>地球に飛来した後、五芒星型の頭部を持ちショゴスを生み出した「古のもの(エルダーシング)」と戦い、北半球から追い出した。'},
  {'name':'ショゴス', 'image':'shoggoth.png', 'lead':'漆黒の玉虫色に光る粘液生物', 'description':'太古に地球に飛来した五芒星型の頭部を持つ「古のもの(エルダーシング)」が作り出した奉仕種族。<br>「古のもの」に反乱を起こし、これが「古のもの」とショゴスの衰退の原因の一つとなった。<br>テケリ・リ！ テケリ・リ！'}
];

// 行列の転置
function transpose(matrix) {
  let transposedMatrix = [];

  // 行列の行数と列数を取得
  let rows = matrix.length;
  let cols = matrix[0].length;

  // 転置行列の初期化
  for (let i = 0; i < cols; i++) {
      transposedMatrix[i] = [];
  }

  // 転置操作
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          transposedMatrix[j][i] = matrix[i][j];
      }
  }

  return transposedMatrix;
}

// ベクトルと行列の積
function multiplyVectorAndMatrix(vector, matrix) {
  return vector.map((item, i) => 
    matrix[i].reduce((acc, item, j) => acc + item * vector[j], 0)
  );
}

// 回答と係数の転置を掛ける
let r = multiplyVectorAndMatrix(x, transpose(c));
// 積の最大値と一致した添字
let indices = r.map((element, index) => element === Math.max(...r) ? index : -1).filter(index => index !== -1);

// 配列の要素をランダム選択
function getRandomElement(array) {
  // 配列の長さを取得
  const length = array.length;

  // 0 から length-1 までのランダムなインデックスを生成
  const randomIndex = Math.floor(Math.random() * length);

  // ランダムなインデックスに対応する配列の要素を返す
  return array[randomIndex];
}

// 最大値をランダム選択
let cthulhu = cthulhus[getRandomElement(indices)];
document.getElementById('title').innerHTML = 'あなたと相性がいいのは ' + cthulhu['name'];
document.getElementById('lead').innerHTML = cthulhu['lead'];
document.getElementById('description').innerHTML = cthulhu['description'];
document.getElementById('picture').setAttribute('src', 'images/' + cthulhu['image']);
document.getElementById('picture').setAttribute('alt', cthulhu['name']);
