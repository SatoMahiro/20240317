let colors = [];
let heights = [];
let widths = [];
let speeds = [];
let amplitudes = [];
let initialAngles = [];

function setup() { //初始設定函數，只會執行一次
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container'); // 將畫布附加到 #sketch-container 中
  clear();

  // 鑲嵌 iframe 網頁
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.attribute('width', windowWidth);
  iframe.attribute('height', windowHeight);
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '-1'); // 使 iframe 在動畫背後顯示
  iframe.style('pointer-events', 'auto'); // 允許操作 iframe 內容

  let numLines = 70; // 修改線條數量為 70
  let colorOptions = [
    color(255, 182, 193, 150), // 粉紅色
    color(255, 0, 0, 150), // 紅色
    color(255, 0, 255, 150), // 洋紅色
    color(255, 160, 122, 150), // 淺橘色
    color(255, 255, 224, 150), // 淺黃色
    color(255, 255, 0, 150), // 黃色
    color(173, 216, 230, 150), // 淺藍色
  ];
  for (let j = 0; j < numLines; j++) {
    let colorChoice = random(colorOptions);
    if (colorChoice.levels[1] === 255 && random(1) > 0.5) { // 增加紫色比例的一半改為暗草綠色
      colorChoice = color(85, 107, 47, 150);
    }
    colors.push(colorChoice); // 預先選定顏色，加入透明度
    heights.push(random(20, 35)); // 預先選定高度
    widths.push(random(30, 50)); // 預先選定寬度
    speeds.push(random(0.05, 0.075)); // 預先選定速度
    amplitudes.push(random(0.1, 0.125)); // 預先選定幅度
    initialAngles.push(random(TWO_PI)); // 預先選定初始角度
  }
}

function draw() { //繪圖函數，會一直執行
  clear(); // 設定背景為透明
  blendMode(BLEND); // 設定混合模式

  let numLines = 70; // 修改線條數量為 70
  let segments = 10;

  for (let j = 0; j < numLines; j++) {
    let x = (windowWidth / numLines) * j + (windowWidth / numLines) / 2;
    let y = windowHeight;

    beginShape(); // 開始繪製形狀
    noFill(); // 不填充形狀內部
    stroke(colors[j]); // 使用預先選定的顏色
    strokeWeight(widths[j]); // 使用預先選定的寬度
    vertex(x, y); // 確保線條從視窗底部開始

    for (let i = 0; i < segments; i++) {
      let angle = sin(frameCount * speeds[j] + i * 0.5 + initialAngles[j]) * amplitudes[j]; // 使用預先選定的速度、幅度和初始角度
      let newX = x + sin(angle) * heights[j]; // 使用預先選定的高度
      let newY = y - heights[j];
      vertex(newX, newY); // 繪製頂點
      x = newX;
      y = newY;
    }
    endShape(); // 結束繪製形狀
  }
}
