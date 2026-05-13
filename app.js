const DESIGN_WIDTH = 941;
const DESIGN_HEIGHT = 1672;

const modes = {
  story: {
    background: "./故事模式-背景图-2.png",
    symbol: "📖",
    title: "故事模式",
    subtitle: "会讲故事的好伙伴",
    prompt: "想听什么故事？",
    playTitle: "星星城堡历险记",
    playSubtitle: "随机讲一个睡前故事",
    playGlyph: "./图标/图标6.png",
    dot: 0,
  },
  music: {
    background: "./音乐模式-背景图-2.png",
    symbol: "♪",
    title: "儿歌模式",
    subtitle: "唱唱跳跳真开心",
    prompt: "想听什么儿歌呢？",
    playTitle: "小星星合唱会",
    playSubtitle: "随机播放一首欢快儿歌",
    playGlyph: "./图标/图标6.png",
    dot: 0,
  },
  sleep: {
    background: "./睡眠模式-背景图-2.png",
    symbol: "🌙",
    title: "睡眠模式",
    subtitle: "乖乖入睡好梦来",
    prompt: "想听什么睡前内容？",
    playTitle: "月亮海晚安曲",
    playSubtitle: "随机开启轻柔助眠内容",
    playGlyph: "./图标/图标6.png",
    dot: 1,
  },
  parent: {
    background: "./亲子模式-背景图-2.png",
    symbol: "👥",
    title: "亲子模式",
    subtitle: "一起玩真开心",
    prompt: "想来点什么亲子内容？",
    playTitle: "影子猜猜看",
    playSubtitle: "随机开始一个亲子互动",
    playGlyph: "./图标/图标6.png",
    dot: 2,
  },
};

const stageShell = document.getElementById("stageShell");
const app = document.getElementById("app");
const sceneBg = document.getElementById("sceneBg");
const modeSymbol = document.getElementById("modeSymbol");
const modeTitle = document.getElementById("modeTitle");
const modeSubtitle = document.getElementById("modeSubtitle");
const playGlyph = document.getElementById("playGlyph");
const playTitle = document.getElementById("playTitle");
const playSubtitle = document.getElementById("playSubtitle");
const aiPrompt = document.getElementById("aiPrompt");
const generateButton = document.getElementById("generateButton");
const radialPopover = document.getElementById("radialPopover");
const radialLabel = document.getElementById("radialLabel");
const radialValue = document.getElementById("radialValue");
const sideMenu = document.getElementById("sideMenu");

function resizeStage() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  stageShell.style.width = `${DESIGN_WIDTH * scale}px`;
  stageShell.style.height = `${DESIGN_HEIGHT * scale}px`;
  app.style.transform = `scale(${scale})`;
}

function setActiveMode(modeName) {
  const mode = modes[modeName];
  if (!mode) return;

  app.dataset.mode = modeName;
  sceneBg.style.backgroundImage = `url("${mode.background}")`;
  modeSymbol.textContent = mode.symbol;
  modeTitle.textContent = mode.title;
  modeSubtitle.textContent = mode.subtitle;
  playGlyph.src = mode.playGlyph;
  playTitle.textContent = mode.playTitle;
  playSubtitle.textContent = mode.playSubtitle;
  aiPrompt.textContent = mode.prompt;

  document.querySelectorAll(".mode-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.mode === modeName);
  });

  document.querySelectorAll(".page-dots span").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === mode.dot);
  });

}

function openMenu() {
  app.classList.add("menu-open");
  sideMenu.setAttribute("aria-hidden", "false");
}

function closeMenu() {
  app.classList.remove("menu-open");
  sideMenu.setAttribute("aria-hidden", "true");
}

function showRadial(label, value, x) {
  radialLabel.textContent = label;
  radialValue.textContent = value;
  radialPopover.style.left = `${x}px`;
  radialPopover.classList.add("is-open");
  clearTimeout(showRadial.timeout);
  showRadial.timeout = setTimeout(() => {
    radialPopover.classList.remove("is-open");
  }, 1800);
}

window.addEventListener("resize", resizeStage);
resizeStage();

document.querySelectorAll(".mode-card").forEach((card) => {
  card.addEventListener("click", () => setActiveMode(card.dataset.mode));
});

document.getElementById("avatarButton").addEventListener("click", openMenu);
document.getElementById("menuBackdrop").addEventListener("click", closeMenu);

document.querySelectorAll(".quick-control[data-popover]").forEach((control) => {
  control.addEventListener("click", () => {
    const isBrightness = control.dataset.popover === "brightness";
    showRadial(isBrightness ? "投影亮度" : "音量", isBrightness ? "72" : "46", isBrightness ? 86 : 292);
  });
});

document.querySelector(".quick-control.is-on").addEventListener("click", (event) => {
  event.currentTarget.classList.toggle("is-on");
});

generateButton.addEventListener("click", () => {
  generateButton.classList.add("is-thinking");
  setTimeout(() => generateButton.classList.remove("is-thinking"), 1600);
});
