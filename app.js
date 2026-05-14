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
const modeEffects = document.getElementById("modeEffects");
const modeSymbol = document.getElementById("modeSymbol");
const modeTitle = document.getElementById("modeTitle");
const modeSubtitle = document.getElementById("modeSubtitle");
const playGlyph = document.getElementById("playGlyph");
const playTitle = document.getElementById("playTitle");
const playSubtitle = document.getElementById("playSubtitle");
const aiPrompt = document.getElementById("aiPrompt");
const randomButton = document.getElementById("randomButton");
const generateButton = document.getElementById("generateButton");
const deviceSwitcherButton = document.getElementById("deviceSwitcherButton");
const deviceMenu = document.getElementById("deviceMenu");
const deviceNameText = document.getElementById("deviceNameText");
const deviceStatusText = document.getElementById("deviceStatusText");
const deviceMenuHint = document.getElementById("deviceMenuHint");
const deviceOptions = document.querySelectorAll(".device-option");
const deviceAddButton = document.querySelector("[data-device-add]");
const radialPopover = document.getElementById("radialPopover");
const radialLabel = document.getElementById("radialLabel");
const radialValue = document.getElementById("radialValue");
const radialMeter = document.getElementById("radialMeter");
const brightnessRange = document.getElementById("brightnessRange");
const controlToast = document.getElementById("controlToast");
const voiceButton = document.querySelector('[data-control="voice"]');
const voiceRecordBadge = document.getElementById("voiceRecordBadge");
const voiceReviewPanel = document.getElementById("voiceReviewPanel");
const voicePanelTitle = document.getElementById("voicePanelTitle");
const voicePanelHint = document.getElementById("voicePanelHint");
const voiceDuration = document.getElementById("voiceDuration");
const voicePlayback = document.getElementById("voicePlayback");
const voicePlayButton = document.getElementById("voicePlayButton");
const redoVoiceButton = document.getElementById("redoVoiceButton");
const sendVoiceButton = document.getElementById("sendVoiceButton");
const sideMenu = document.getElementById("sideMenu");
const avatarButton = document.getElementById("avatarButton");
const menuBackdrop = document.getElementById("menuBackdrop");
const menuCloseButton = document.querySelector(".menu-close");
const menuActionButtons = document.querySelectorAll(".menu-action[data-menu-action]");
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
const sendingStage = document.getElementById("sendingStage");
const sendingHint = document.getElementById("sendingHint");
const successModalTitle = document.getElementById("successModalTitle");
const successCopy = document.getElementById("successCopy");
const finishGenerateButton = document.getElementById("finishGenerateButton");
const isOffline = app.dataset.deviceStatus === "offline";
const loadingStages = ["正在理解你的需求", "正在生成内容", "正在润色表达", "准备发送到设备"];
const modeEffectsConfig = {
  story: [
    { symbol: "✦", type: "star", x: "12%", y: "17%", size: "42px", delay: "0s", duration: "2.6s", opacity: "0.82", drift: "-12px" },
    { symbol: "✧", type: "star", x: "74%", y: "15%", size: "34px", delay: "0.35s", duration: "3.1s", opacity: "0.68", drift: "10px" },
    { symbol: "★", type: "star", x: "58%", y: "29%", size: "28px", delay: "0.8s", duration: "2.9s", opacity: "0.56", drift: "-9px" },
    { symbol: "✦", type: "star", x: "86%", y: "36%", size: "48px", delay: "1.15s", duration: "3.4s", opacity: "0.64", drift: "12px" },
    { symbol: "✧", type: "star", x: "18%", y: "42%", size: "31px", delay: "1.55s", duration: "3.2s", opacity: "0.5", drift: "-10px" },
    { symbol: "✦", type: "star", x: "45%", y: "20%", size: "24px", delay: "2.05s", duration: "2.7s", opacity: "0.6", drift: "8px" },
  ],
  music: [
    { symbol: "♪", type: "note", x: "15%", y: "24%", size: "52px", delay: "0s", duration: "2.2s", opacity: "0.76", drift: "-15px" },
    { symbol: "♫", type: "note", x: "78%", y: "21%", size: "48px", delay: "0.28s", duration: "2.6s", opacity: "0.68", drift: "13px" },
    { symbol: "♬", type: "note", x: "62%", y: "38%", size: "42px", delay: "0.74s", duration: "2.4s", opacity: "0.58", drift: "-12px" },
    { symbol: "♪", type: "note", x: "28%", y: "37%", size: "36px", delay: "1.05s", duration: "2.8s", opacity: "0.62", drift: "14px" },
    { symbol: "♫", type: "note", x: "86%", y: "44%", size: "34px", delay: "1.42s", duration: "2.5s", opacity: "0.48", drift: "-10px" },
    { symbol: "♪", type: "note", x: "47%", y: "17%", size: "30px", delay: "1.9s", duration: "2.3s", opacity: "0.54", drift: "9px" },
  ],
  sleep: [
    { symbol: "☾", type: "moon", x: "78%", y: "18%", size: "58px", delay: "0s", duration: "4.6s", opacity: "0.72", drift: "-8px" },
    { symbol: "✦", type: "moon", x: "17%", y: "24%", size: "30px", delay: "0.8s", duration: "5.2s", opacity: "0.46", drift: "7px" },
    { symbol: "·", type: "moon", x: "58%", y: "31%", size: "70px", delay: "1.4s", duration: "5.6s", opacity: "0.38", drift: "-6px" },
    { symbol: "Z", type: "moon", x: "29%", y: "42%", size: "28px", delay: "2s", duration: "5.1s", opacity: "0.42", drift: "-10px" },
    { symbol: "✧", type: "moon", x: "87%", y: "39%", size: "27px", delay: "2.7s", duration: "4.9s", opacity: "0.36", drift: "8px" },
  ],
  parent: [
    { symbol: "♡", type: "heart", x: "15%", y: "23%", size: "46px", delay: "0s", duration: "3.4s", opacity: "0.64", drift: "-9px" },
    { symbol: "❤", type: "heart", x: "78%", y: "26%", size: "38px", delay: "0.45s", duration: "3.7s", opacity: "0.56", drift: "10px" },
    { symbol: "✦", type: "heart", x: "55%", y: "18%", size: "31px", delay: "0.95s", duration: "3.2s", opacity: "0.58", drift: "-8px" },
    { symbol: "♡", type: "heart", x: "30%", y: "39%", size: "34px", delay: "1.3s", duration: "3.9s", opacity: "0.48", drift: "12px" },
    { symbol: "✧", type: "heart", x: "88%", y: "42%", size: "29px", delay: "1.8s", duration: "3.5s", opacity: "0.44", drift: "-10px" },
    { symbol: "❤", type: "heart", x: "68%", y: "44%", size: "26px", delay: "2.15s", duration: "4.1s", opacity: "0.42", drift: "8px" },
  ],
};
const modalTitleIds = {
  random: "randomModalTitle",
  generate: "generateModalTitle",
  loading: "loadingModalTitle",
  sending: "sendingModalTitle",
  success: "successModalTitle",
};
let currentModalPanel = "random";
let currentRandomItem = null;
let lastFocusedElement = null;
let generateTimer = null;
let loadingStageTimer = null;
let sendTimer = null;
let pendingSendItem = null;
let generatedPrompt = "";
let brightnessValue = Number(brightnessRange?.value || 72);
let brightnessCloseTimer = null;
let controlToastTimer = null;
let voiceArmTimer = null;
let voiceTimer = null;
let voiceMaxTimer = null;
let voiceBlob = null;
let voiceUrl = "";
let voiceStartedAt = 0;
let voiceDurationMs = 0;
let isVoiceArming = false;
let isVoiceRecording = false;
let isVoiceKeyboardActive = false;

const VOICE_HOLD_DELAY = 1500;
const MIN_VOICE_DURATION = 800;
const MAX_VOICE_DURATION = 60000;

function resizeStage() {
  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  stageShell.style.width = `${DESIGN_WIDTH * scale}px`;
  stageShell.style.height = `${DESIGN_HEIGHT * scale}px`;
  app.style.transform = `scale(${scale})`;
}

function setDeviceMenuOpen(isOpen) {
  if (!deviceSwitcherButton || !deviceMenu) return;

  app.classList.toggle("device-menu-open", isOpen);
  deviceSwitcherButton.setAttribute("aria-expanded", String(isOpen));
  deviceMenu.setAttribute("aria-hidden", String(!isOpen));

  if (!isOpen && deviceMenuHint) {
    deviceMenuHint.textContent = "";
  }
}

function toggleDeviceMenu(event) {
  event.stopPropagation();
  closeBrightnessPopover();
  closeVoiceReviewPanel(false);
  setDeviceMenuOpen(!app.classList.contains("device-menu-open"));
}

function selectDevice(option) {
  const isDeviceOffline = option.dataset.deviceStatus === "offline";

  deviceNameText.textContent = option.dataset.deviceName || "宝宝投影灯";
  deviceStatusText.textContent = isDeviceOffline ? "设备不在线" : "设备在线";
  deviceStatusText.classList.toggle("is-device-offline", isDeviceOffline);
  deviceSwitcherButton.classList.toggle("is-device-offline", isDeviceOffline);
  deviceSwitcherButton.querySelector(".online-dot")?.setAttribute("aria-label", isDeviceOffline ? "不在线" : "在线");

  deviceOptions.forEach((button) => {
    const isSelected = button === option;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  setDeviceMenuOpen(false);
}

function showAddDeviceFeedback(event) {
  event.stopPropagation();
  if (deviceMenuHint) {
    deviceMenuHint.textContent = "添加设备入口已打开，当前原型不跳转";
  }
}

function updateBrightness(value) {
  brightnessValue = Math.max(1, Math.min(100, Number(value) || 72));
  const angle = Math.round(brightnessValue * 3.6);

  if (brightnessRange) {
    brightnessRange.value = String(brightnessValue);
  }

  if (radialValue) {
    radialValue.textContent = `${brightnessValue}%`;
  }

  if (radialMeter) {
    radialMeter.style.setProperty("--brightness-angle", `${angle}deg`);
  }
}

function closeBrightnessPopover() {
  clearTimeout(brightnessCloseTimer);
  brightnessCloseTimer = null;

  if (!radialPopover) return;

  radialPopover.classList.remove("is-open");
  radialPopover.setAttribute("aria-hidden", "true");
}

function scheduleBrightnessClose(delay = 3200) {
  clearTimeout(brightnessCloseTimer);
  brightnessCloseTimer = setTimeout(closeBrightnessPopover, delay);
}

function openBrightnessPopover(event) {
  event.stopPropagation();
  setDeviceMenuOpen(false);
  closeVoiceReviewPanel(false);
  radialLabel.textContent = "投影亮度";
  updateBrightness(brightnessValue);
  radialPopover.classList.add("is-open");
  radialPopover.setAttribute("aria-hidden", "false");
  scheduleBrightnessClose();
}

function showControlToast(message) {
  if (!controlToast) return;

  controlToast.textContent = message;
  controlToast.classList.add("is-open");
  controlToast.setAttribute("aria-hidden", "false");
  clearTimeout(controlToastTimer);
  controlToastTimer = setTimeout(() => {
    controlToast.classList.remove("is-open");
    controlToast.setAttribute("aria-hidden", "true");
  }, 1800);
}

function formatVoiceTime(durationMs) {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setVoiceBadge(text) {
  if (voiceRecordBadge) {
    voiceRecordBadge.textContent = text;
  }
}

function setVoicePanelOpen(isOpen) {
  if (!voiceReviewPanel) return;

  voiceReviewPanel.classList.toggle("is-open", isOpen);
  voiceReviewPanel.setAttribute("aria-hidden", String(!isOpen));
}

function updateVoiceTimer() {
  const durationNode = document.getElementById("voiceDuration") || voiceDuration;
  if (!durationNode) return;

  const elapsed = voiceStartedAt ? Date.now() - voiceStartedAt : voiceDurationMs;
  durationNode.textContent = formatVoiceTime(elapsed);
  setVoiceBadge(formatVoiceTime(elapsed));
}

function clearVoiceTimers() {
  clearTimeout(voiceArmTimer);
  clearInterval(voiceTimer);
  clearTimeout(voiceMaxTimer);
  voiceArmTimer = null;
  voiceTimer = null;
  voiceMaxTimer = null;
}

function clearVoicePlayback() {
  if (voicePlayback) {
    voicePlayback.pause();
    voicePlayback.removeAttribute("src");
    voicePlayback.load();
  }

  if (voiceUrl) {
    URL.revokeObjectURL(voiceUrl);
    voiceUrl = "";
  }

  voiceBlob = null;
  if (voicePlayButton) {
    voicePlayButton.textContent = "试听";
    voicePlayButton.disabled = true;
  }
  if (sendVoiceButton) {
    sendVoiceButton.disabled = true;
  }
}

function resetVoiceUi() {
  clearVoiceTimers();
  isVoiceArming = false;
  isVoiceRecording = false;
  isVoiceKeyboardActive = false;
  voiceButton?.classList.remove("is-arming", "is-recording");
  setVoiceBadge("按住");
}

function closeVoiceReviewPanel(clearRecording = false) {
  setVoicePanelOpen(false);
  voiceReviewPanel?.classList.remove("is-recording", "is-recorded");

  if (clearRecording) {
    clearVoicePlayback();
    voiceDurationMs = 0;
    const durationNode = document.getElementById("voiceDuration") || voiceDuration;
    if (durationNode) {
      durationNode.textContent = "00:00";
    }
  }
}

function setVoicePanelRecording(hint = "松开结束录制") {
  if (!voiceReviewPanel) return;

  voiceReviewPanel.classList.add("is-recording");
  voiceReviewPanel.classList.remove("is-recorded");
  voicePanelTitle.textContent = "正在录音";
  voicePanelHint.innerHTML = `${hint} · <span id="voiceDuration">00:00</span>`;
  setVoicePanelOpen(true);
}

function writeWavText(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function createPrototypeVoiceBlob(durationMs) {
  const sampleRate = 16000;
  const seconds = Math.max(1, Math.min(60, Math.ceil(durationMs / 1000)));
  const sampleCount = sampleRate * seconds;
  const dataSize = sampleCount * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeWavText(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeWavText(view, 8, "WAVE");
  writeWavText(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeWavText(view, 36, "data");
  view.setUint32(40, dataSize, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const envelope = Math.min(1, index / 1400, (sampleCount - index) / 1400);
    const pulse = 0.58 + 0.42 * Math.sin(2 * Math.PI * 2.2 * time);
    const tone = Math.sin(2 * Math.PI * 440 * time) * 0.12 + Math.sin(2 * Math.PI * 660 * time) * 0.05;
    const sample = Math.max(-1, Math.min(1, tone * pulse * envelope));
    view.setInt16(44 + index * 2, sample * 32767, true);
  }

  return new Blob([view], { type: "audio/wav" });
}

function beginVoiceRecording() {
  if (!voiceButton || isOffline) return;

  isVoiceArming = false;
  isVoiceRecording = true;
  voiceButton.classList.remove("is-arming");
  voiceButton.classList.add("is-recording");
  setVoiceBadge("00:00");
  closeBrightnessPopover();
  setDeviceMenuOpen(false);
  closeMenu();
  voiceStartedAt = Date.now();
  voiceDurationMs = 0;
  clearVoicePlayback();
  setVoicePanelRecording();
  voiceTimer = setInterval(updateVoiceTimer, 250);
  voiceMaxTimer = setTimeout(() => {
    stopVoiceRecording();
    showControlToast("已达到 60 秒上限");
  }, MAX_VOICE_DURATION);
  updateVoiceTimer();
}

function cancelVoiceArming(showHint = false) {
  if (!isVoiceArming) return;

  clearTimeout(voiceArmTimer);
  voiceArmTimer = null;
  isVoiceArming = false;
  isVoiceKeyboardActive = false;
  voiceButton?.classList.remove("is-arming");
  setVoiceBadge("按住");

  if (showHint) {
    showControlToast("长按 1.5 秒开始录音");
  }
}

function armVoiceRecording(event) {
  if (!voiceButton || voiceButton.disabled || isOffline) return;
  if (event?.button !== undefined && event.button !== 0) return;
  if (isVoiceArming || isVoiceRecording) return;

  event?.preventDefault();
  closeVoiceReviewPanel(false);
  closeBrightnessPopover();
  setDeviceMenuOpen(false);
  closeMenu();
  isVoiceArming = true;
  voiceButton.classList.add("is-arming");
  setVoiceBadge("1.5s");
  voiceArmTimer = setTimeout(beginVoiceRecording, VOICE_HOLD_DELAY);

  try {
    if (event?.pointerId !== undefined) {
      voiceButton.setPointerCapture(event.pointerId);
    }
  } catch (error) {
    // Some browsers refuse pointer capture on synthetic or cancelled events.
  }
}

function stopVoiceRecording(event) {
  if (!isVoiceArming && !isVoiceRecording) return;

  event?.preventDefault();

  if (isVoiceArming) {
    cancelVoiceArming(true);
    return;
  }

  voiceDurationMs = Date.now() - voiceStartedAt;
  completeVoiceRecording();
}

function completeVoiceRecording() {
  clearVoiceTimers();
  voiceButton?.classList.remove("is-arming", "is-recording");
  setVoiceBadge("按住");
  isVoiceArming = false;
  isVoiceRecording = false;
  isVoiceKeyboardActive = false;

  if (!voiceDurationMs && voiceStartedAt) {
    voiceDurationMs = Date.now() - voiceStartedAt;
  }

  if (voiceDurationMs < MIN_VOICE_DURATION) {
    closeVoiceReviewPanel(true);
    showControlToast("录音时间太短");
    return;
  }

  voiceBlob = createPrototypeVoiceBlob(voiceDurationMs);
  if (voiceUrl) {
    URL.revokeObjectURL(voiceUrl);
  }
  voiceUrl = URL.createObjectURL(voiceBlob);

  if (voicePlayback) {
    voicePlayback.src = voiceUrl;
    voicePlayback.controls = true;
  }

  voiceReviewPanel?.classList.remove("is-recording");
  voiceReviewPanel?.classList.add("is-recorded");
  setVoicePanelOpen(true);
  voicePanelTitle.textContent = "录音已完成";
  voicePanelHint.innerHTML = `共 <span id="voiceDuration">${formatVoiceTime(voiceDurationMs)}</span>，可以试听后发送`;
  if (voicePlayButton) {
    voicePlayButton.textContent = "试听";
    voicePlayButton.disabled = false;
  }
  if (sendVoiceButton) {
    sendVoiceButton.disabled = false;
    sendVoiceButton.focus();
  }
}

async function toggleVoicePlayback() {
  if (!voicePlayback?.src) return;

  try {
    if (voicePlayback.paused) {
      await voicePlayback.play();
      voicePlayButton.textContent = "暂停";
    } else {
      voicePlayback.pause();
      voicePlayButton.textContent = "试听";
    }
  } catch (error) {
    showControlToast("录音暂时无法播放");
  }
}

function redoVoiceRecording() {
  closeVoiceReviewPanel(true);
  resetVoiceUi();
  showControlToast("继续长按语音按钮重新录制");
}

function sendVoiceToDevice() {
  if (!voiceBlob || voiceDurationMs < MIN_VOICE_DURATION) {
    showControlToast("请先完成一段录音");
    return;
  }

  const durationText = formatVoiceTime(voiceDurationMs);
  voicePlayback?.pause();
  closeVoiceReviewPanel(true);
  lastFocusedElement = voiceButton;
  startSendToDevice({
    title: "宝宝语音留言",
    subtitle: `录音 ${durationText} · 已发送到设备`,
    sendingStage: "正在发送语音到宝宝投影灯",
    sendingHint: "请保持设备在线，语音马上播放",
    successTitle: "语音发送成功",
    successCopy: "宝宝语音留言已发送到投影灯，马上开始播放",
  });
}

function clearModeEffects() {
  modeEffects.replaceChildren();
}

function createModeEffectItem(effect) {
  const item = document.createElement("span");
  item.className = `mode-effect mode-effect--${effect.type}`;
  item.textContent = effect.symbol;
  item.style.setProperty("--x", effect.x);
  item.style.setProperty("--y", effect.y);
  item.style.setProperty("--size", effect.size);
  item.style.setProperty("--delay", effect.delay);
  item.style.setProperty("--duration", effect.duration);
  item.style.setProperty("--effect-opacity", effect.opacity);
  item.style.setProperty("--drift", effect.drift);
  return item;
}

function renderModeEffects(modeName) {
  const effects = modeEffectsConfig[modeName] || modeEffectsConfig.story;
  clearModeEffects();
  modeEffects.append(...effects.map(createModeEffectItem));
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
  renderModeEffects(modeName);

  document.querySelectorAll(".mode-card").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.mode === modeName);
  });

  document.querySelectorAll(".page-dots span").forEach((dot, index) => {
    dot.classList.toggle("is-active", index === mode.dot);
  });

}

function openMenu() {
  setDeviceMenuOpen(false);
  closeBrightnessPopover();
  closeVoiceReviewPanel(false);
  app.classList.add("menu-open");
  sideMenu.setAttribute("aria-hidden", "false");
  avatarButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  app.classList.remove("menu-open");
  sideMenu.setAttribute("aria-hidden", "true");
  avatarButton.setAttribute("aria-expanded", "false");
}

function selectMenuAction(actionName) {
  menuActionButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.menuAction === actionName);
  });
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
  closeVoiceReviewPanel(false);
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

function clearSendSimulation() {
  clearTimeout(sendTimer);
  sendTimer = null;
}

function completeSendToDevice() {
  clearSendSimulation();

  if (pendingSendItem) {
    playTitle.textContent = pendingSendItem.title;
    playSubtitle.textContent = pendingSendItem.subtitle;
  }

  successModalTitle.textContent = pendingSendItem?.successTitle || "发送成功";
  successCopy.textContent = pendingSendItem?.successCopy || "内容已发送到宝宝投影灯，马上开始播放";
  showModalPanel("success");
  finishGenerateButton.focus();
}

function startSendToDevice(item) {
  pendingSendItem = item;
  clearGenerateSimulation();
  clearSendSimulation();
  sendingStage.textContent = item?.sendingStage || "正在发送到宝宝投影灯";
  sendingHint.textContent = item?.sendingHint || "请保持设备在线，马上就好";
  app.classList.add("modal-open");
  appModal.setAttribute("aria-hidden", "false");
  modalBackdrop.setAttribute("aria-hidden", "false");
  showModalPanel("sending");
  appModal.focus();
  sendTimer = setTimeout(completeSendToDevice, 1400);
}

function closeModal() {
  if (currentModalPanel === "loading" || currentModalPanel === "sending") return;

  clearGenerateSimulation();
  clearSendSimulation();
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
  pendingSendItem = null;
  currentRandomItem = pickRandomPlayItem(app.dataset.mode, playTitle.textContent);
  randomThemeTitle.textContent = currentRandomItem.title;
  randomThemeSubtitle.textContent = currentRandomItem.subtitle;
  openModal("random", event.currentTarget);
}

function confirmRandomPlay() {
  if (!currentRandomItem) return;

  startSendToDevice(currentRandomItem);
}

function openGenerateModal(event) {
  generateInput.value = "";
  generateError.textContent = "";
  pendingSendItem = null;
  openModal("generate", event.currentTarget);
}

function finishGenerateSuccess() {
  const title = generatedPrompt.length > 14 ? `${generatedPrompt.slice(0, 14)}…` : generatedPrompt;
  startSendToDevice({
    title: title || "AI 新内容",
    subtitle: "AI 为你新生成的内容",
  });
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

window.addEventListener("resize", resizeStage);
resizeStage();
updateBrightness(brightnessValue);
setActiveMode(app.dataset.mode || "story");

document.querySelectorAll(".mode-card").forEach((card) => {
  card.addEventListener("click", () => setActiveMode(card.dataset.mode));
});

deviceSwitcherButton?.addEventListener("click", toggleDeviceMenu);
deviceOptions.forEach((option) => {
  option.addEventListener("click", () => selectDevice(option));
});
deviceAddButton?.addEventListener("click", showAddDeviceFeedback);

avatarButton.addEventListener("click", openMenu);
menuBackdrop.addEventListener("click", closeMenu);
menuCloseButton.addEventListener("click", closeMenu);
menuActionButtons.forEach((button) => {
  button.addEventListener("click", () => selectMenuAction(button.dataset.menuAction));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && app.classList.contains("menu-open")) {
    closeMenu();
  }

  if (event.key === "Escape" && app.classList.contains("device-menu-open")) {
    setDeviceMenuOpen(false);
    deviceSwitcherButton?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (app.classList.contains("device-menu-open") && !event.target.closest(".device-copy")) {
    setDeviceMenuOpen(false);
  }

  if (radialPopover?.classList.contains("is-open") && !event.target.closest(".radial-popover") && !event.target.closest('[data-control="brightness"]')) {
    closeBrightnessPopover();
  }
});

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

  document.querySelector('[data-control="brightness"]')?.addEventListener("click", openBrightnessPopover);
  brightnessRange?.addEventListener("input", (event) => {
    updateBrightness(event.currentTarget.value);
    scheduleBrightnessClose();
  });
  brightnessRange?.addEventListener("pointerdown", () => {
    clearTimeout(brightnessCloseTimer);
  });
  brightnessRange?.addEventListener("pointerup", () => {
    scheduleBrightnessClose();
  });

  voiceButton?.addEventListener("pointerdown", armVoiceRecording);
  window.addEventListener("pointerup", stopVoiceRecording);
  window.addEventListener("pointercancel", stopVoiceRecording);
  voiceButton?.addEventListener("contextmenu", (event) => event.preventDefault());
  voiceButton?.addEventListener("click", (event) => event.preventDefault());
  voiceButton?.addEventListener("keydown", (event) => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) {
      isVoiceKeyboardActive = true;
      armVoiceRecording(event);
    }
  });
  voiceButton?.addEventListener("keyup", (event) => {
    if ((event.key === " " || event.key === "Enter") && isVoiceKeyboardActive) {
      stopVoiceRecording(event);
    }
  });
  voicePlayButton?.addEventListener("click", toggleVoicePlayback);
  redoVoiceButton?.addEventListener("click", redoVoiceRecording);
  sendVoiceButton?.addEventListener("click", sendVoiceToDevice);
  voicePlayback?.addEventListener("pause", () => {
    if (voicePlayButton) {
      voicePlayButton.textContent = "试听";
    }
  });
  voicePlayback?.addEventListener("ended", () => {
    if (voicePlayButton) {
      voicePlayButton.textContent = "试听";
    }
  });

  document.querySelector('[data-control="night-light"]')?.addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-on");
  });

}
