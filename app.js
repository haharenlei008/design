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
    playOptions: [
      { title: "星星城堡历险记", subtitle: "随机讲一个睡前故事" },
      { title: "云朵小船去旅行", subtitle: "温柔开启一个奇妙冒险" },
      { title: "会发光的小鲸鱼", subtitle: "听一段海底晚安故事" },
      { title: "森林邮递员", subtitle: "随机讲一个暖心童话" },
    ],
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
    playOptions: [
      { title: "小星星合唱会", subtitle: "随机播放一首欢快儿歌" },
      { title: "彩虹节拍操", subtitle: "一起唱唱跳跳动起来" },
      { title: "小兔子的铃铛歌", subtitle: "播放一首轻快儿歌" },
      { title: "太阳公公早安曲", subtitle: "随机开启一段快乐旋律" },
    ],
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
    playOptions: [
      { title: "月亮海晚安曲", subtitle: "随机开启轻柔助眠内容" },
      { title: "星光呼吸练习", subtitle: "跟着轻声慢慢放松" },
      { title: "云朵摇篮曲", subtitle: "播放一段安静助眠旋律" },
      { title: "晚安小森林", subtitle: "随机开启睡前陪伴内容" },
    ],
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
    playOptions: [
      { title: "影子猜猜看", subtitle: "随机开始一个亲子互动" },
      { title: "一起找星星", subtitle: "开启一个亲子观察小游戏" },
      { title: "睡前悄悄话", subtitle: "随机生成一段亲子问答" },
      { title: "手影动物园", subtitle: "一起玩一个投影互动" },
    ],
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
const randomButton = document.getElementById("randomButton");
const generateButton = document.getElementById("generateButton");
const radialPopover = document.getElementById("radialPopover");
const radialLabel = document.getElementById("radialLabel");
const radialValue = document.getElementById("radialValue");
const sideMenu = document.getElementById("sideMenu");
const modalBackdrop = document.getElementById("modalBackdrop");
const appModal = document.getElementById("appModal");
const randomThemeTitle = document.getElementById("randomThemeTitle");
const randomThemeSubtitle = document.getElementById("randomThemeSubtitle");
const swapRandomButton = document.getElementById("swapRandomButton");
const cancelRandomButton = document.getElementById("cancelRandomButton");
const sendRandomButton = document.getElementById("sendRandomButton");
const generateInput = document.getElementById("generateInput");
const generateError = document.getElementById("generateError");
const cancelGenerateButton = document.getElementById("cancelGenerateButton");
const submitGenerateButton = document.getElementById("submitGenerateButton");
const loadingStage = document.getElementById("loadingStage");
const successCopy = document.getElementById("successCopy");
const finishGenerateButton = document.getElementById("finishGenerateButton");
const isOffline = app.dataset.deviceStatus === "offline";
const loadingStages = ["正在理解你的需求", "正在生成内容", "正在润色表达", "准备发送到设备"];
const modalTitleIds = {
  random: "randomModalTitle",
  generate: "generateModalTitle",
  loading: "loadingModalTitle",
  success: "successModalTitle",
};
let currentModalPanel = "random";
let currentRandomItem = null;
let lastFocusedElement = null;
let generateTimer = null;
let loadingStageTimer = null;
let generatedPrompt = "";

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

function getActiveMode() {
  return modes[app.dataset.mode] || modes.story;
}

function pickRandomPlayItem(modeName, excludeTitle) {
  const options = getActiveMode().playOptions || modes[modeName]?.playOptions || modes.story.playOptions;
  const availableOptions = options.filter((item) => item.title !== excludeTitle);
  const candidates = availableOptions.length ? availableOptions : options;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function showModalPanel(panelName) {
  currentModalPanel = panelName;
  appModal.dataset.panel = panelName;
  appModal.setAttribute("aria-labelledby", modalTitleIds[panelName]);

  appModal.querySelectorAll(".modal-panel").forEach((panel) => {
    const isActive = panel.dataset.panel === panelName;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
}

function openModal(panelName, triggerElement) {
  closeMenu();
  lastFocusedElement = triggerElement || document.activeElement;
  showModalPanel(panelName);
  app.classList.add("modal-open");
  appModal.setAttribute("aria-hidden", "false");
  modalBackdrop.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    const focusTarget = appModal.querySelector(".modal-panel.is-active textarea, .modal-panel.is-active button") || appModal;
    focusTarget.focus();
  });
}

function clearGenerateSimulation() {
  clearTimeout(generateTimer);
  clearInterval(loadingStageTimer);
  generateTimer = null;
  loadingStageTimer = null;
  generateButton.classList.remove("is-thinking");
  submitGenerateButton.disabled = false;
}

function closeModal() {
  if (currentModalPanel === "loading") return;

  clearGenerateSimulation();
  app.classList.remove("modal-open");
  appModal.setAttribute("aria-hidden", "true");
  modalBackdrop.setAttribute("aria-hidden", "true");
  generateError.textContent = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function refreshRandomPlayCandidate() {
  currentRandomItem = pickRandomPlayItem(app.dataset.mode, currentRandomItem?.title || playTitle.textContent);
  randomThemeTitle.textContent = currentRandomItem.title;
  randomThemeSubtitle.textContent = currentRandomItem.subtitle;
}

function openRandomPlayModal(event) {
  currentRandomItem = pickRandomPlayItem(app.dataset.mode, playTitle.textContent);
  randomThemeTitle.textContent = currentRandomItem.title;
  randomThemeSubtitle.textContent = currentRandomItem.subtitle;
  openModal("random", event.currentTarget);
}

function confirmRandomPlay() {
  if (!currentRandomItem) return;

  playTitle.textContent = currentRandomItem.title;
  playSubtitle.textContent = currentRandomItem.subtitle;
  closeModal();
}

function openGenerateModal(event) {
  generateInput.value = "";
  generateError.textContent = "";
  openModal("generate", event.currentTarget);
}

function finishGenerateSuccess() {
  clearGenerateSimulation();
  const title = generatedPrompt.length > 14 ? `${generatedPrompt.slice(0, 14)}…` : generatedPrompt;
  playTitle.textContent = title || "AI 新内容";
  playSubtitle.textContent = "AI 为你新生成的内容";
  successCopy.textContent = "新的内容已经准备好，可以开始播放了";
  showModalPanel("success");
  finishGenerateButton.focus();
}

function simulateGenerateRequest() {
  const duration = 20000 + Math.floor(Math.random() * 160001);
  let stageIndex = 0;

  loadingStage.textContent = loadingStages[stageIndex];
  loadingStageTimer = setInterval(() => {
    stageIndex = Math.min(stageIndex + 1, loadingStages.length - 1);
    loadingStage.textContent = loadingStages[stageIndex];
  }, Math.max(4200, Math.floor(duration / loadingStages.length)));

  generateTimer = setTimeout(finishGenerateSuccess, duration);
}

function submitGeneratePrompt() {
  const prompt = generateInput.value.trim();

  if (!prompt) {
    generateError.textContent = "先告诉我想生成什么内容吧";
    generateInput.focus();
    return;
  }

  generatedPrompt = prompt;
  generateError.textContent = "";
  submitGenerateButton.disabled = true;
  generateButton.classList.add("is-thinking");
  showModalPanel("loading");
  appModal.focus();
  simulateGenerateRequest();
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

if (!isOffline) {
  randomButton.addEventListener("click", openRandomPlayModal);
  swapRandomButton.addEventListener("click", refreshRandomPlayCandidate);
  cancelRandomButton.addEventListener("click", closeModal);
  sendRandomButton.addEventListener("click", confirmRandomPlay);
  generateButton.addEventListener("click", openGenerateModal);
  cancelGenerateButton.addEventListener("click", closeModal);
  submitGenerateButton.addEventListener("click", submitGeneratePrompt);
  finishGenerateButton.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  generateInput.addEventListener("input", () => {
    generateError.textContent = "";
  });
  generateInput.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      submitGeneratePrompt();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  document.querySelectorAll(".quick-control[data-popover]").forEach((control) => {
    control.addEventListener("click", () => {
      const isBrightness = control.dataset.popover === "brightness";
      showRadial(isBrightness ? "投影亮度" : "音量", isBrightness ? "72" : "46", isBrightness ? 86 : 292);
    });
  });

  document.querySelector(".quick-control.is-on").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-on");
  });

}
