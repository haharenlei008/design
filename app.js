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

const lightEffectLabels = {
  crossfade: "渐变灯",
  marquee: "跑马灯",
  breathe: "呼吸灯",
  steady: "长亮",
};

const rotationSpeedLabels = {
  0: "已停转",
  1: "低速",
  2: "中速",
  3: "高速",
};

const modeDeviceDefaults = {
  story: {
    lightEffect: "crossfade",
    speedMs: 800,
    intensity: 65,
    rotationSpeed: 1,
    toast: "已切换故事模式，渐变灯会轻轻转动",
  },
  music: {
    lightEffect: "marquee",
    speedMs: 300,
    intensity: 90,
    rotationSpeed: 3,
    toast: "已切换儿歌模式，灯光和投影更有律动",
  },
  sleep: {
    lightEffect: "breathe",
    speedMs: 1200,
    intensity: 35,
    rotationSpeed: 1,
    toast: "已切换睡眠模式，灯光会慢慢呼吸",
  },
  parent: {
    lightEffect: "crossfade",
    speedMs: 500,
    intensity: 80,
    rotationSpeed: 2,
    toast: "已切换亲子模式，灯光更明亮一些",
  },
};

const stageShell = document.getElementById("stageShell");
const app = document.getElementById("app");
const sceneBg = document.getElementById("sceneBg");
const sceneBgNext = document.getElementById("sceneBgNext");
const modeEffects = document.getElementById("modeEffects");
const modeSymbol = document.getElementById("modeSymbol");
const modeTitle = document.getElementById("modeTitle");
const modeSubtitle = document.getElementById("modeSubtitle");
const playGlyph = document.getElementById("playGlyph");
const playTitle = document.getElementById("playTitle");
const playSubtitle = document.getElementById("playSubtitle");
const aiPrompt = document.getElementById("aiPrompt");
const randomButton = document.getElementById("randomButton");
const stopPlayButton = document.getElementById("stopPlayButton");
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
const lightControlPanel = document.getElementById("lightControlPanel");
const rotationControlPanel = document.getElementById("rotationControlPanel");
const lightPanelHint = document.getElementById("lightPanelHint");
const rotationPanelHint = document.getElementById("rotationPanelHint");
const lightModeStatus = document.getElementById("lightModeStatus");
const projectionMotionStatus = document.getElementById("projectionMotionStatus");
const lightEffectButtons = document.querySelectorAll("[data-light-effect]");
const rotationSpeedButtons = document.querySelectorAll("[data-rotation-speed]");
const closeLightPanelButton = document.getElementById("closeLightPanelButton");
const closeRotationPanelButton = document.getElementById("closeRotationPanelButton");
const turnOffSceneEffectsButton = document.getElementById("turnOffSceneEffectsButton");
const sceneEffectOnButton = document.getElementById("sceneEffectOnButton");
const sceneEffectOffButton = document.getElementById("sceneEffectOffButton");
const effectSpeedRange = document.getElementById("effectSpeedRange");
const lightIntensityRange = document.getElementById("lightIntensityRange");
const effectSpeedValue = document.getElementById("effectSpeedValue");
const lightIntensityValue = document.getElementById("lightIntensityValue");
const steadyRedRange = document.getElementById("steadyRedRange");
const steadyYellowRange = document.getElementById("steadyYellowRange");
const steadyBlueRange = document.getElementById("steadyBlueRange");
const steadyRedValue = document.getElementById("steadyRedValue");
const steadyYellowValue = document.getElementById("steadyYellowValue");
const steadyBlueValue = document.getElementById("steadyBlueValue");
const lightQuickValue = document.getElementById("lightQuickValue");
const rotationQuickValue = document.getElementById("rotationQuickValue");
const lightSceneButton = document.querySelector('[data-control="light"]');
const rotationControlButton = document.querySelector('[data-control="rotation"]');
const nightLightControlButton = document.querySelector('[data-control="night-light"]');
const voiceButton = document.querySelector('[data-control="voice"]');
const voiceRecordBadge = document.getElementById("voiceRecordBadge");
const voiceReviewPanel = document.getElementById("voiceReviewPanel");
const voicePanelTitle = document.getElementById("voicePanelTitle");
const voicePanelHint = document.getElementById("voicePanelHint");
const voiceDuration = document.getElementById("voiceDuration");
const voicePlayback = document.getElementById("voicePlayback");
const voicePlayButton = document.getElementById("voicePlayButton");
const closeVoiceReviewButton = document.getElementById("closeVoiceReviewButton");
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
const randomPreviewButton = document.getElementById("randomPreviewButton");
const randomPreviewPlayback = document.getElementById("randomPreviewPlayback");
const swapRandomButton = document.getElementById("swapRandomButton");
const cancelRandomButton = document.getElementById("cancelRandomButton");
const sendRandomButton = document.getElementById("sendRandomButton");
const generateInput = document.getElementById("generateInput");
const generateError = document.getElementById("generateError");
const cancelGenerateButton = document.getElementById("cancelGenerateButton");
const submitGenerateButton = document.getElementById("submitGenerateButton");
const cancelAiLoadingButton = document.getElementById("cancelAiLoadingButton");
const loadingStage = document.getElementById("loadingStage");
const aiAudioCard = document.getElementById("aiAudioCard");
const aiAudioTitle = document.getElementById("aiAudioTitle");
const aiAudioPromptPreview = document.getElementById("aiAudioPromptPreview");
const aiAudioPlayback = document.getElementById("aiAudioPlayback");
const playGeneratedAudioButton = document.getElementById("playGeneratedAudioButton");
const aiAudioProgressBar = document.getElementById("aiAudioProgressBar");
const aiAudioCurrentTime = document.getElementById("aiAudioCurrentTime");
const aiAudioDurationTime = document.getElementById("aiAudioDurationTime");
const aiAudioStreamStatus = document.getElementById("aiAudioStreamStatus");
const regenerateAudioButton = document.getElementById("regenerateAudioButton");
const closeAudioPreviewButton = document.getElementById("closeAudioPreviewButton");
const sendGeneratedAudioButton = document.getElementById("sendGeneratedAudioButton");
const sendingStage = document.getElementById("sendingStage");
const sendingHint = document.getElementById("sendingHint");
const successModalTitle = document.getElementById("successModalTitle");
const successCopy = document.getElementById("successCopy");
const finishGenerateButton = document.getElementById("finishGenerateButton");
const isOffline = app.dataset.deviceStatus === "offline";
const loadingStages = ["已收到生成要求", "正在理解你的需求", "正在准备音频流", "即将开始传输"];
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
    { symbol: "♪", type: "note", x: "15%", y: "24%", size: "52px", delay: "0s", duration: "2.2s", opacity: "0.76", drift: "-15px", driftX: "8px", spin: "8deg" },
    { symbol: "♫", type: "note", x: "78%", y: "21%", size: "48px", delay: "0.28s", duration: "2.6s", opacity: "0.68", drift: "13px", driftX: "-7px", spin: "-7deg" },
    { symbol: "♬", type: "note", x: "62%", y: "38%", size: "42px", delay: "0.74s", duration: "2.4s", opacity: "0.58", drift: "-12px", driftX: "9px", spin: "10deg" },
    { symbol: "♪", type: "note", x: "28%", y: "37%", size: "36px", delay: "1.05s", duration: "2.8s", opacity: "0.62", drift: "14px", driftX: "-6px", spin: "-6deg" },
    { symbol: "♫", type: "note", x: "86%", y: "44%", size: "34px", delay: "1.42s", duration: "2.5s", opacity: "0.48", drift: "-10px", driftX: "7px", spin: "7deg" },
    { symbol: "♪", type: "note", x: "47%", y: "17%", size: "30px", delay: "1.9s", duration: "2.3s", opacity: "0.54", drift: "9px", driftX: "-5px", spin: "-5deg" },
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
  "audio-preview": "audioPreviewModalTitle",
  sending: "sendingModalTitle",
  success: "successModalTitle",
};
let currentModalPanel = "random";
let currentRandomItem = null;
let randomPreviewUrl = "";
let lastFocusedElement = null;
let generateTimer = null;
let loadingStageTimer = null;
let aiStreamTimer = null;
let sendTimer = null;
let pendingSendItem = null;
let generatedPrompt = "";
let aiAudioUrl = "";
let aiAudioBlob = null;
let aiAudioDurationMs = 0;
let aiStreamedDurationMs = 0;
let aiAudioState = "idle";
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
let hasRenderedMode = false;
let modeTransitionTimer = null;
let modeBackgroundTimer = null;
let modeCardPulseTimer = null;
let deviceControlState = {
  lightsOn: true,
  lightEffect: "crossfade",
  speedMs: 800,
  intensity: 65,
  steadyChannels: { red: 65, yellow: 65, blue: 65 },
  rotationOn: true,
  rotationSpeed: 1,
  lastPayload: null,
};

const VOICE_HOLD_DELAY = 1500;
const MIN_VOICE_DURATION = 800;
const MAX_VOICE_DURATION = 60000;
const AI_GENERATION_DELAY_MS = 5000;
const AI_AUDIO_DURATION_MS = 20000;
const AI_STREAM_TICK_MS = 520;
const AI_STREAM_INCREMENT_MS = 1500;
const AI_PREVIEW_MIN_DURATION_MS = 1200;
const RANDOM_PREVIEW_DURATION_MS = 8000;
const MODE_BACKGROUND_TRANSITION_MS = 360;
const MODE_CONTENT_TRANSITION_MS = 320;

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
  closeSceneControlPanel();
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

function clampNumber(value, min, max, fallback) {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return fallback;
  return Math.max(min, Math.min(max, numberValue));
}

function getModeDeviceDefault(modeName = app.dataset.mode) {
  return modeDeviceDefaults[modeName] || modeDeviceDefaults.story;
}

function getChannelValues(intensity) {
  const value = clampNumber(intensity, 0, 100, 65);
  return { white: value, yellow: value, blue: value };
}

function getSteadyChannelsFromIntensity(intensity) {
  const value = Math.round(clampNumber(intensity, 0, 100, 65));
  return { red: value, yellow: value, blue: value };
}

function normalizeSteadyChannels(channels = deviceControlState.steadyChannels, fallbackIntensity = deviceControlState.intensity) {
  const fallback = Math.round(clampNumber(fallbackIntensity, 0, 100, 65));
  return {
    red: Math.round(clampNumber(channels?.red, 0, 100, fallback)),
    yellow: Math.round(clampNumber(channels?.yellow, 0, 100, fallback)),
    blue: Math.round(clampNumber(channels?.blue, 0, 100, fallback)),
  };
}

function getSteadyChannelValues(channels = deviceControlState.steadyChannels) {
  const normalizedChannels = normalizeSteadyChannels(channels);
  return {
    white: normalizedChannels.red,
    yellow: normalizedChannels.yellow,
    blue: normalizedChannels.blue,
  };
}

function getSteadyChannelAverage(channels = deviceControlState.steadyChannels) {
  const normalizedChannels = normalizeSteadyChannels(channels);
  return Math.round((normalizedChannels.red + normalizedChannels.yellow + normalizedChannels.blue) / 3);
}

function createMcpPayload(id, name, args = {}) {
  return {
    type: "mcp",
    payload: {
      jsonrpc: "2.0",
      id,
      method: "tools/call",
      params: { name, arguments: args },
    },
  };
}

function buildBrightnessPayload(intensity = deviceControlState.intensity, channels = null) {
  const channelValues = channels ? getSteadyChannelValues(channels) : getChannelValues(intensity);
  return createMcpPayload("prototype-brightness", "self.wby_rgb.set_channels", channelValues);
}

function buildLightPayload() {
  if (deviceControlState.lightEffect === "steady") {
    return [buildBrightnessPayload(deviceControlState.intensity, deviceControlState.steadyChannels)];
  }

  return [
    createMcpPayload("prototype-effect", "self.wby_rgb.set_effect", {
      effect: deviceControlState.lightEffect,
      speed_ms: deviceControlState.speedMs,
      intensity: deviceControlState.intensity,
    }),
    buildBrightnessPayload(),
  ];
}

function buildPrototypeDevicePayload(action = "state") {
  if (action === "all-off") {
    return [
      createMcpPayload("prototype-lights-off", "self.wby_rgb.off"),
      createMcpPayload("prototype-motor-stop", "self.motor.stop"),
    ];
  }

  if (action === "rotation-stop") {
    return createMcpPayload("prototype-motor-stop", "self.motor.stop");
  }

  const payloads = [];

  if (deviceControlState.lightsOn) {
    payloads.push(...buildLightPayload());
  } else {
    payloads.push(createMcpPayload("prototype-lights-off", "self.wby_rgb.off"));
  }

  if (deviceControlState.rotationOn) {
    payloads.push(
      createMcpPayload("prototype-motor-start", "self.motor.start"),
      createMcpPayload("prototype-motor-speed", "self.motor.adjust_speed", { speed: deviceControlState.rotationSpeed }),
    );
  } else {
    payloads.push(createMcpPayload("prototype-motor-stop", "self.motor.stop"));
  }

  return payloads;
}

function setLightPanelOpen(isOpen) {
  if (!lightControlPanel) return;

  lightControlPanel.classList.toggle("is-open", isOpen);
  lightControlPanel.setAttribute("aria-hidden", String(!isOpen));
}

function setRotationPanelOpen(isOpen) {
  if (!rotationControlPanel) return;

  rotationControlPanel.classList.toggle("is-open", isOpen);
  rotationControlPanel.setAttribute("aria-hidden", String(!isOpen));
}

function closeSceneControlPanel() {
  setLightPanelOpen(false);
  setRotationPanelOpen(false);
}

function updateDeviceControlUi() {
  const lightLabel = deviceControlState.lightsOn ? lightEffectLabels[deviceControlState.lightEffect] : "已关闭";
  const rotationLabel = deviceControlState.rotationOn ? rotationSpeedLabels[deviceControlState.rotationSpeed] : rotationSpeedLabels[0];
  const steadyChannels = normalizeSteadyChannels(deviceControlState.steadyChannels);

  app.dataset.lightScene = deviceControlState.lightsOn ? deviceControlState.lightEffect : "lights-off";
  app.dataset.rotationState = deviceControlState.rotationOn ? String(deviceControlState.rotationSpeed) : "stopped";

  lightEffectButtons.forEach((button) => {
    const isActive = deviceControlState.lightsOn && button.dataset.lightEffect === deviceControlState.lightEffect;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  rotationSpeedButtons.forEach((button) => {
    const isActive = button.dataset.rotationSpeed === (deviceControlState.rotationOn ? String(deviceControlState.rotationSpeed) : "0");
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (effectSpeedRange) effectSpeedRange.value = String(deviceControlState.speedMs);
  if (lightIntensityRange) lightIntensityRange.value = String(deviceControlState.intensity);
  if (steadyRedRange) steadyRedRange.value = String(steadyChannels.red);
  if (steadyYellowRange) steadyYellowRange.value = String(steadyChannels.yellow);
  if (steadyBlueRange) steadyBlueRange.value = String(steadyChannels.blue);
  if (effectSpeedValue) effectSpeedValue.textContent = `${deviceControlState.speedMs}ms`;
  if (lightIntensityValue) lightIntensityValue.textContent = `${deviceControlState.intensity}%`;
  if (steadyRedValue) steadyRedValue.textContent = `${steadyChannels.red}%`;
  if (steadyYellowValue) steadyYellowValue.textContent = `${steadyChannels.yellow}%`;
  if (steadyBlueValue) steadyBlueValue.textContent = `${steadyChannels.blue}%`;
  if (lightQuickValue) lightQuickValue.textContent = lightLabel;
  if (rotationQuickValue) rotationQuickValue.textContent = rotationLabel;
  if (lightModeStatus) lightModeStatus.textContent = lightLabel;
  if (projectionMotionStatus) projectionMotionStatus.textContent = rotationLabel;

  if (lightPanelHint) {
    if (!deviceControlState.lightsOn) {
      lightPanelHint.textContent = "灯光已关闭，可点击开启场景效果恢复当前模式默认值";
    } else if (deviceControlState.lightEffect === "steady") {
      lightPanelHint.textContent = "当前为长亮，可分别调节红黄蓝亮度";
    } else {
      lightPanelHint.textContent = `当前为${lightLabel}，亮度 ${deviceControlState.intensity}%`;
    }
  }
  if (rotationPanelHint) {
    rotationPanelHint.textContent = deviceControlState.rotationOn ? `当前投影旋转为${rotationLabel}` : "投影旋转已停止，灯光保持当前状态";
  }

  lightSceneButton?.classList.toggle("is-on", deviceControlState.lightsOn);
  rotationControlButton?.classList.toggle("is-on", deviceControlState.rotationOn);
  sceneEffectOnButton?.classList.toggle("is-on", deviceControlState.lightsOn && deviceControlState.rotationOn);
  sceneEffectOffButton?.classList.toggle("is-on", !deviceControlState.lightsOn && !deviceControlState.rotationOn);
}

function applyModeDeviceDefaults(modeName = app.dataset.mode, options = {}) {
  const defaults = getModeDeviceDefault(modeName);

  deviceControlState = {
    ...deviceControlState,
    lightsOn: true,
    lightEffect: defaults.lightEffect,
    speedMs: defaults.speedMs,
    intensity: defaults.intensity,
    steadyChannels: getSteadyChannelsFromIntensity(defaults.intensity),
    rotationOn: true,
    rotationSpeed: defaults.rotationSpeed,
  };
  deviceControlState.lastPayload = buildPrototypeDevicePayload();
  updateDeviceControlUi();

  if (!options.silent) {
    showControlToast(options.message || defaults.toast);
  }
}

function openLightControlPanel(event) {
  event?.stopPropagation();
  setDeviceMenuOpen(false);
  closeVoiceReviewPanel(false);
  closeMenu();
  setRotationPanelOpen(false);
  setLightPanelOpen(true);
}

function openRotationControlPanel(event) {
  event?.stopPropagation();
  setDeviceMenuOpen(false);
  closeVoiceReviewPanel(false);
  closeMenu();
  setLightPanelOpen(false);
  setRotationPanelOpen(true);
}

function updateLightEffect(effectName) {
  if (!lightEffectLabels[effectName] || isOffline) return;

  deviceControlState = {
    ...deviceControlState,
    lightsOn: true,
    lightEffect: effectName,
    steadyChannels:
      effectName === "steady"
        ? normalizeSteadyChannels(deviceControlState.steadyChannels, deviceControlState.intensity)
        : deviceControlState.steadyChannels,
  };
  deviceControlState.lastPayload = buildPrototypeDevicePayload();
  updateDeviceControlUi();
  showControlToast(`已切换${lightEffectLabels[effectName]}`);
}

function updateEffectSpeed(value) {
  if (isOffline) return;

  deviceControlState = {
    ...deviceControlState,
    lightsOn: true,
    speedMs: Math.round(clampNumber(value, 50, 2000, 800)),
  };
  deviceControlState.lastPayload = buildPrototypeDevicePayload();
  updateDeviceControlUi();
}

function updateLightIntensity(value) {
  if (isOffline) return;

  const intensity = Math.round(clampNumber(value, 1, 100, 65));
  deviceControlState = {
    ...deviceControlState,
    lightsOn: true,
    intensity,
    steadyChannels:
      deviceControlState.lightEffect === "steady"
        ? getSteadyChannelsFromIntensity(intensity)
        : deviceControlState.steadyChannels,
  };
  deviceControlState.lastPayload =
    deviceControlState.lightEffect === "steady"
      ? buildBrightnessPayload(deviceControlState.intensity, deviceControlState.steadyChannels)
      : buildBrightnessPayload(deviceControlState.intensity);
  updateDeviceControlUi();
}

function updateSteadyChannel(channelName, value) {
  if (isOffline || !["red", "yellow", "blue"].includes(channelName)) return;

  const steadyChannels = normalizeSteadyChannels(deviceControlState.steadyChannels);
  steadyChannels[channelName] = Math.round(clampNumber(value, 0, 100, steadyChannels[channelName]));
  deviceControlState = {
    ...deviceControlState,
    lightsOn: true,
    lightEffect: "steady",
    steadyChannels,
    intensity: getSteadyChannelAverage(steadyChannels),
  };
  deviceControlState.lastPayload = buildBrightnessPayload(deviceControlState.intensity, steadyChannels);
  updateDeviceControlUi();
}

function updateRotationSpeed(speed) {
  if (isOffline) return;

  const numericSpeed = Math.round(clampNumber(speed, 0, 3, 1));
  deviceControlState = {
    ...deviceControlState,
    rotationOn: numericSpeed > 0,
    rotationSpeed: numericSpeed > 0 ? numericSpeed : deviceControlState.rotationSpeed,
  };
  deviceControlState.lastPayload = numericSpeed > 0 ? buildPrototypeDevicePayload() : buildPrototypeDevicePayload("rotation-stop");
  updateDeviceControlUi();
  showControlToast(numericSpeed > 0 ? `投影旋转已切换为${rotationSpeedLabels[numericSpeed]}` : "投影旋转已停止");
}

function stopProjectionRotation() {
  updateRotationSpeed(0);
}

function turnOffSceneEffects() {
  if (isOffline) return;

  deviceControlState = {
    ...deviceControlState,
    lightsOn: false,
    rotationOn: false,
  };
  deviceControlState.lastPayload = buildPrototypeDevicePayload("all-off");
  updateDeviceControlUi();
  showControlToast("场景效果已关闭");
}

function restoreSceneEffects() {
  if (isOffline) return;

  applyModeDeviceDefaults(app.dataset.mode, { message: "已开启当前模式场景效果" });
}

function stopDevicePlayback() {
  showControlToast("已停止播放");
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

function createPrototypeAiAudioBlob(durationMs) {
  return createPrototypeVoiceBlob(durationMs);
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
  closeSceneControlPanel();
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

function dismissVoiceReviewPanel() {
  voicePlayback?.pause();
  closeVoiceReviewPanel(true);
  resetVoiceUi();
  voiceButton?.focus();
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
  if (!modeEffects) return;

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
  item.style.setProperty("--drift-y", effect.drift);
  item.style.setProperty("--drift-x", effect.driftX || "0px");
  item.style.setProperty("--spin", effect.spin || "0deg");
  return item;
}

function renderModeEffects(modeName) {
  if (!modeEffects) return;

  const effects = modeEffectsConfig[modeName] || modeEffectsConfig.story;
  clearModeEffects();
  modeEffects.append(...effects.map(createModeEffectItem));
}

function setModeBackground(background, shouldAnimate) {
  if (!sceneBgNext || !shouldAnimate) {
    sceneBg.style.backgroundImage = `url("${background}")`;
    sceneBgNext?.classList.remove("is-visible");
    sceneBg.classList.remove("is-dimming");
    return;
  }

  clearTimeout(modeBackgroundTimer);
  sceneBgNext.style.backgroundImage = `url("${background}")`;
  sceneBgNext.classList.remove("is-visible");
  sceneBgNext.offsetWidth;
  sceneBgNext.classList.add("is-visible");
  sceneBg.classList.add("is-dimming");
  modeBackgroundTimer = setTimeout(() => {
    sceneBg.style.backgroundImage = `url("${background}")`;
    sceneBgNext.classList.remove("is-visible");
    sceneBg.classList.remove("is-dimming");
  }, MODE_BACKGROUND_TRANSITION_MS);
}

function pulseModeCard(modeName, className = "is-reselected") {
  const card = document.querySelector(`.mode-card[data-mode="${modeName}"]`);
  if (!card) return;

  clearTimeout(modeCardPulseTimer);
  document.querySelectorAll(".mode-card").forEach((item) => {
    item.classList.remove("is-just-selected", "is-reselected");
  });
  card.offsetWidth;
  card.classList.add(className);
  modeCardPulseTimer = setTimeout(() => {
    document.querySelectorAll(".mode-card").forEach((item) => {
      item.classList.remove("is-just-selected", "is-reselected");
    });
  }, MODE_CONTENT_TRANSITION_MS);
}

function triggerModeSwitchMotion(modeName) {
  clearTimeout(modeTransitionTimer);
  app.classList.remove("is-mode-switching", "is-mode-entering");
  app.offsetWidth;
  app.classList.add("is-mode-switching");
  requestAnimationFrame(() => {
    app.classList.add("is-mode-entering");
  });
  modeTransitionTimer = setTimeout(() => {
    app.classList.remove("is-mode-switching", "is-mode-entering");
  }, MODE_CONTENT_TRANSITION_MS);
  pulseModeCard(modeName, "is-just-selected");
}

function setActiveMode(modeName) {
  const mode = modes[modeName];
  if (!mode) return;

  const previousMode = app.dataset.mode;
  const isSameMode = hasRenderedMode && previousMode === modeName;

  if (isSameMode) {
    pulseModeCard(modeName);
    return;
  }

  app.dataset.mode = modeName;
  setModeBackground(mode.background, hasRenderedMode);
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

  applyModeDeviceDefaults(modeName, { silent: !hasRenderedMode });

  if (hasRenderedMode) {
    triggerModeSwitchMotion(modeName);
  }

  hasRenderedMode = true;
}

function openMenu() {
  setDeviceMenuOpen(false);
  closeBrightnessPopover();
  closeSceneControlPanel();
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

function clearRandomPreview() {
  if (randomPreviewPlayback) {
    randomPreviewPlayback.pause();
    randomPreviewPlayback.removeAttribute("src");
    randomPreviewPlayback.load();
  }

  if (randomPreviewUrl) {
    URL.revokeObjectURL(randomPreviewUrl);
    randomPreviewUrl = "";
  }

  if (randomPreviewButton) {
    randomPreviewButton.textContent = "试听";
    randomPreviewButton.disabled = !currentRandomItem;
  }
}

async function toggleRandomPreviewPlayback() {
  if (!currentRandomItem || !randomPreviewPlayback || !randomPreviewButton) return;

  try {
    if (randomPreviewPlayback.paused) {
      if (!randomPreviewPlayback.src) {
        const previewBlob = createPrototypeAiAudioBlob(RANDOM_PREVIEW_DURATION_MS);
        randomPreviewUrl = URL.createObjectURL(previewBlob);
        randomPreviewPlayback.src = randomPreviewUrl;
        randomPreviewPlayback.load();
      }
      await randomPreviewPlayback.play();
      randomPreviewButton.textContent = "暂停";
    } else {
      randomPreviewPlayback.pause();
      randomPreviewButton.textContent = "试听";
    }
  } catch (error) {
    randomPreviewButton.textContent = "试听";
    showControlToast("试听暂时无法播放");
  }
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
  closeSceneControlPanel();
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

function getGeneratedAudioTitle() {
  const source = generatedPrompt.trim();
  return source.length > 12 ? `${source.slice(0, 12)}…` : source || "AI 内容";
}

function getGeneratedPromptPreview() {
  const source = generatedPrompt.trim();
  return source.length > 36 ? `生成要求：${source.slice(0, 36)}…` : `生成要求：${source || "AI 创作内容"}`;
}

function getAiPlayButtonIdleText() {
  if (aiAudioState === "stream-complete") return "播放试听";
  if (aiAudioState === "streaming" && aiStreamedDurationMs > 0) return "试听片段";
  return "等待音频流";
}

function setAiAudioState(state) {
  aiAudioState = state;
  aiAudioCard?.setAttribute("data-stream-state", state);
}

function setAiAudioProgress(durationMs) {
  aiStreamedDurationMs = Math.max(0, Math.min(AI_AUDIO_DURATION_MS, durationMs));
  const progress = Math.round((aiStreamedDurationMs / AI_AUDIO_DURATION_MS) * 100);

  if (aiAudioProgressBar) {
    aiAudioProgressBar.style.width = `${progress}%`;
  }
  if (aiAudioCurrentTime) {
    aiAudioCurrentTime.textContent = formatVoiceTime(aiStreamedDurationMs);
  }
  if (aiAudioDurationTime) {
    aiAudioDurationTime.textContent = formatVoiceTime(AI_AUDIO_DURATION_MS);
  }
}

function stopGeneratedAudioPlayback() {
  if (!aiAudioPlayback) return;

  aiAudioPlayback.pause();
  aiAudioPlayback.currentTime = 0;
  if (playGeneratedAudioButton) {
    playGeneratedAudioButton.textContent = getAiPlayButtonIdleText();
  }
}

function revokeAiAudioUrl() {
  if (!aiAudioUrl) return;

  URL.revokeObjectURL(aiAudioUrl);
  aiAudioUrl = "";
}

function loadAiAudioPlaybackBlob(blob) {
  if (!aiAudioPlayback || !blob) return;

  aiAudioPlayback.pause();
  revokeAiAudioUrl();
  aiAudioUrl = URL.createObjectURL(blob);
  aiAudioPlayback.src = aiAudioUrl;
  aiAudioPlayback.load();
}

function updateAiAudioTime() {
  if (!aiAudioPlayback || aiAudioState !== "stream-complete") return;

  const duration = Number.isFinite(aiAudioPlayback.duration) ? aiAudioPlayback.duration : AI_AUDIO_DURATION_MS / 1000;
  const current = Number.isFinite(aiAudioPlayback.currentTime) ? aiAudioPlayback.currentTime : 0;
  const progress = duration > 0 ? Math.min(100, Math.round((current / duration) * 100)) : 100;

  if (aiAudioProgressBar) {
    aiAudioProgressBar.style.width = `${progress}%`;
  }
  if (aiAudioCurrentTime) {
    aiAudioCurrentTime.textContent = formatVoiceTime(current * 1000);
  }
  if (aiAudioDurationTime) {
    aiAudioDurationTime.textContent = formatVoiceTime(duration * 1000);
  }
}

function updateAiAudioCopy(statusText) {
  if (aiAudioTitle) {
    aiAudioTitle.textContent = getGeneratedAudioTitle();
    aiAudioTitle.title = generatedPrompt;
  }
  if (aiAudioPromptPreview) {
    aiAudioPromptPreview.textContent = getGeneratedPromptPreview();
    aiAudioPromptPreview.title = `生成要求：${generatedPrompt}`;
  }
  if (aiAudioStreamStatus) {
    aiAudioStreamStatus.textContent = statusText;
  }
}

function clearAiAudioPreview(resetPrompt = false) {
  clearInterval(aiStreamTimer);
  aiStreamTimer = null;
  aiAudioDurationMs = 0;
  aiStreamedDurationMs = 0;
  setAiAudioState("idle");

  if (aiAudioPlayback) {
    aiAudioPlayback.pause();
    aiAudioPlayback.removeAttribute("src");
    aiAudioPlayback.load();
  }
  revokeAiAudioUrl();

  aiAudioBlob = null;
  setAiAudioProgress(0);
  if (aiAudioTitle) {
    aiAudioTitle.textContent = "AI 内容正在生成";
    aiAudioTitle.removeAttribute("title");
  }
  if (aiAudioPromptPreview) {
    aiAudioPromptPreview.textContent = "音频流准备开始传输";
    aiAudioPromptPreview.removeAttribute("title");
  }
  if (aiAudioStreamStatus) {
    aiAudioStreamStatus.textContent = "正在等待后端开始传输音频流";
  }
  if (playGeneratedAudioButton) {
    playGeneratedAudioButton.textContent = "等待音频流";
    playGeneratedAudioButton.disabled = true;
  }
  if (sendGeneratedAudioButton) {
    sendGeneratedAudioButton.disabled = true;
  }

  if (resetPrompt) {
    generatedPrompt = "";
    if (generateInput) {
      generateInput.value = "";
    }
  }
}

function clearGenerateSimulation(options = {}) {
  const { resetAudio = true, resetPrompt = false } = options;

  clearTimeout(generateTimer);
  clearInterval(loadingStageTimer);
  clearInterval(aiStreamTimer);
  generateTimer = null;
  loadingStageTimer = null;
  aiStreamTimer = null;
  generateButton?.classList.remove("is-thinking");
  if (submitGenerateButton) {
    submitGenerateButton.disabled = false;
  }
  if (resetAudio) {
    clearAiAudioPreview(resetPrompt);
  } else if (resetPrompt) {
    generatedPrompt = "";
    if (generateInput) {
      generateInput.value = "";
    }
  }
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
  clearRandomPreview();
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

  const shouldResetGenerate = currentModalPanel === "generate" || currentModalPanel === "audio-preview";
  clearRandomPreview();
  clearGenerateSimulation({ resetAudio: true, resetPrompt: shouldResetGenerate });
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
  clearRandomPreview();
  currentRandomItem = pickRandomPlayItem(app.dataset.mode, currentRandomItem?.title || playTitle.textContent);
  randomThemeTitle.textContent = currentRandomItem.title;
  if (randomThemeSubtitle) {
    randomThemeSubtitle.textContent = currentRandomItem.subtitle;
  }
  if (randomPreviewButton) {
    randomPreviewButton.disabled = false;
  }
}

function openRandomPlayModal(event) {
  clearRandomPreview();
  pendingSendItem = null;
  currentRandomItem = pickRandomPlayItem(app.dataset.mode, playTitle.textContent);
  randomThemeTitle.textContent = currentRandomItem.title;
  if (randomThemeSubtitle) {
    randomThemeSubtitle.textContent = currentRandomItem.subtitle;
  }
  if (randomPreviewButton) {
    randomPreviewButton.disabled = false;
  }
  openModal("random", event.currentTarget);
}

function confirmRandomPlay() {
  if (!currentRandomItem) return;

  clearRandomPreview();
  startSendToDevice(currentRandomItem);
}

function openGenerateModal(event) {
  clearGenerateSimulation({ resetAudio: true, resetPrompt: true });
  generateInput.value = "";
  generateError.textContent = "";
  pendingSendItem = null;
  openModal("generate", event.currentTarget);
}

function completeAiAudioStream() {
  clearInterval(aiStreamTimer);
  aiStreamTimer = null;
  stopGeneratedAudioPlayback();
  setAiAudioState("stream-complete");
  aiAudioDurationMs = AI_AUDIO_DURATION_MS;
  aiAudioBlob = createPrototypeAiAudioBlob(aiAudioDurationMs);
  loadAiAudioPlaybackBlob(aiAudioBlob);
  setAiAudioProgress(AI_AUDIO_DURATION_MS);
  updateAiAudioCopy("音频流接收完毕，可以试听后发送给设备播放");

  const audioPreviewTitle = document.getElementById("audioPreviewModalTitle");
  if (audioPreviewTitle) {
    audioPreviewTitle.textContent = "生成完成";
  }
  if (playGeneratedAudioButton) {
    playGeneratedAudioButton.textContent = "播放试听";
    playGeneratedAudioButton.disabled = false;
  }
  if (sendGeneratedAudioButton) {
    sendGeneratedAudioButton.disabled = false;
  }
  requestAnimationFrame(() => {
    sendGeneratedAudioButton?.focus();
  });
}

function stepAiAudioStream() {
  const nextDuration = aiStreamedDurationMs + AI_STREAM_INCREMENT_MS;
  setAiAudioProgress(nextDuration);

  if (aiAudioStreamStatus) {
    aiAudioStreamStatus.textContent = `正在流式接收音频，已收到 ${formatVoiceTime(aiStreamedDurationMs)} / ${formatVoiceTime(AI_AUDIO_DURATION_MS)}`;
  }
  if (playGeneratedAudioButton && playGeneratedAudioButton.disabled) {
    playGeneratedAudioButton.disabled = false;
    playGeneratedAudioButton.textContent = "试听片段";
  }

  if (aiStreamedDurationMs >= AI_AUDIO_DURATION_MS) {
    completeAiAudioStream();
  }
}

function beginAiAudioStream() {
  clearTimeout(generateTimer);
  clearInterval(loadingStageTimer);
  clearInterval(aiStreamTimer);
  generateTimer = null;
  loadingStageTimer = null;
  aiStreamTimer = null;
  generateButton.classList.remove("is-thinking");
  submitGenerateButton.disabled = false;
  clearAiAudioPreview(false);
  setAiAudioState("streaming");
  updateAiAudioCopy("后端已开始流式传输音频，收到片段后可以试听");

  const audioPreviewTitle = document.getElementById("audioPreviewModalTitle");
  if (audioPreviewTitle) {
    audioPreviewTitle.textContent = "正在接收音频流";
  }
  if (sendGeneratedAudioButton) {
    sendGeneratedAudioButton.disabled = true;
  }
  showModalPanel("audio-preview");
  requestAnimationFrame(() => {
    appModal.focus();
  });
  stepAiAudioStream();
  aiStreamTimer = setInterval(stepAiAudioStream, AI_STREAM_TICK_MS);
}

async function toggleGeneratedAudioPlayback() {
  if (!aiAudioPlayback || !playGeneratedAudioButton) return;

  if (aiAudioState === "streaming") {
    if (aiAudioPlayback.paused) {
      const previewDuration = Math.max(AI_PREVIEW_MIN_DURATION_MS, aiStreamedDurationMs);
      loadAiAudioPlaybackBlob(createPrototypeAiAudioBlob(previewDuration));
      try {
        await aiAudioPlayback.play();
        playGeneratedAudioButton.textContent = "暂停试听";
      } catch (error) {
        playGeneratedAudioButton.textContent = getAiPlayButtonIdleText();
        showControlToast("音频片段暂时无法播放");
      }
      return;
    }

    aiAudioPlayback.pause();
    playGeneratedAudioButton.textContent = getAiPlayButtonIdleText();
    return;
  }

  if (aiAudioState !== "stream-complete" || !aiAudioBlob) {
    showControlToast("音频流还在准备中");
    return;
  }

  try {
    if (aiAudioPlayback.paused) {
      if (!aiAudioPlayback.src) {
        loadAiAudioPlaybackBlob(aiAudioBlob);
      }
      await aiAudioPlayback.play();
      playGeneratedAudioButton.textContent = "暂停试听";
    } else {
      aiAudioPlayback.pause();
      playGeneratedAudioButton.textContent = "播放试听";
    }
  } catch (error) {
    playGeneratedAudioButton.textContent = "播放试听";
    showControlToast("音频暂时无法播放");
  }
}

function sendGeneratedAudioToDevice() {
  if (aiAudioState !== "stream-complete" || !aiAudioBlob) {
    showControlToast("请等待音频流传输完成");
    return;
  }

  stopGeneratedAudioPlayback();
  startSendToDevice({
    title: getGeneratedAudioTitle(),
    subtitle: "AI 生成内容 · 已发送到设备",
    sendingStage: "正在发送 AI 内容到宝宝投影灯",
    sendingHint: "请保持设备在线，内容马上开始播放",
    successTitle: "AI 内容发送成功",
    successCopy: "AI 生成内容已发送到投影灯，马上开始播放",
  });
}

function simulateGenerateRequest() {
  let stageIndex = 0;

  loadingStage.textContent = loadingStages[stageIndex];
  loadingStageTimer = setInterval(() => {
    stageIndex = Math.min(stageIndex + 1, loadingStages.length - 1);
    loadingStage.textContent = loadingStages[stageIndex];
  }, Math.max(900, Math.floor(AI_GENERATION_DELAY_MS / loadingStages.length)));

  generateTimer = setTimeout(beginAiAudioStream, AI_GENERATION_DELAY_MS);
}

function cancelAiGeneration() {
  clearGenerateSimulation({ resetAudio: true, resetPrompt: false });
  showModalPanel("generate");
  requestAnimationFrame(() => {
    generateInput?.focus();
  });
}

function regenerateAiAudio() {
  if (!generatedPrompt.trim()) {
    showModalPanel("generate");
    requestAnimationFrame(() => {
      generateInput?.focus();
    });
    return;
  }

  generateInput.value = generatedPrompt;
  clearGenerateSimulation({ resetAudio: true, resetPrompt: false });
  submitGenerateButton.disabled = true;
  generateButton.classList.add("is-thinking");
  loadingStage.textContent = loadingStages[0];
  showModalPanel("loading");
  appModal.focus();
  simulateGenerateRequest();
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
  clearAiAudioPreview(false);
  submitGenerateButton.disabled = true;
  generateButton.classList.add("is-thinking");
  loadingStage.textContent = loadingStages[0];
  showModalPanel("loading");
  appModal.focus();
  simulateGenerateRequest();
}

window.addEventListener("resize", resizeStage);
resizeStage();
updateBrightness(brightnessValue);
setActiveMode(app.dataset.mode || "story");
updateDeviceControlUi();

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

  if (event.key === "Escape" && (lightControlPanel?.classList.contains("is-open") || rotationControlPanel?.classList.contains("is-open"))) {
    closeSceneControlPanel();
    lightSceneButton?.focus();
  }
});

document.addEventListener("click", (event) => {
  if (app.classList.contains("device-menu-open") && !event.target.closest(".device-copy")) {
    setDeviceMenuOpen(false);
  }

  if (radialPopover?.classList.contains("is-open") && !event.target.closest(".radial-popover") && !event.target.closest('[data-control="brightness"]')) {
    closeBrightnessPopover();
  }

  if (lightControlPanel?.classList.contains("is-open") && !event.target.closest(".light-control-panel") && !event.target.closest('[data-control="light"]')) {
    setLightPanelOpen(false);
  }

  if (rotationControlPanel?.classList.contains("is-open") && !event.target.closest(".rotation-control-panel") && !event.target.closest('[data-control="rotation"]')) {
    setRotationPanelOpen(false);
  }
});

if (!isOffline) {
  randomButton.addEventListener("click", openRandomPlayModal);
  stopPlayButton?.addEventListener("click", stopDevicePlayback);
  swapRandomButton.addEventListener("click", refreshRandomPlayCandidate);
  randomPreviewButton?.addEventListener("click", toggleRandomPreviewPlayback);
  cancelRandomButton.addEventListener("click", closeModal);
  sendRandomButton.addEventListener("click", confirmRandomPlay);
  generateButton.addEventListener("click", openGenerateModal);
  cancelGenerateButton.addEventListener("click", closeModal);
  submitGenerateButton.addEventListener("click", submitGeneratePrompt);
  cancelAiLoadingButton?.addEventListener("click", cancelAiGeneration);
  playGeneratedAudioButton?.addEventListener("click", toggleGeneratedAudioPlayback);
  regenerateAudioButton?.addEventListener("click", regenerateAiAudio);
  closeAudioPreviewButton?.addEventListener("click", closeModal);
  sendGeneratedAudioButton?.addEventListener("click", sendGeneratedAudioToDevice);
  finishGenerateButton.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  aiAudioPlayback?.addEventListener("timeupdate", updateAiAudioTime);
  aiAudioPlayback?.addEventListener("loadedmetadata", updateAiAudioTime);
  aiAudioPlayback?.addEventListener("pause", () => {
    if (playGeneratedAudioButton) {
      playGeneratedAudioButton.textContent = getAiPlayButtonIdleText();
    }
  });
  aiAudioPlayback?.addEventListener("ended", () => {
    if (playGeneratedAudioButton) {
      playGeneratedAudioButton.textContent = getAiPlayButtonIdleText();
    }
    updateAiAudioTime();
  });
  randomPreviewPlayback?.addEventListener("pause", () => {
    if (randomPreviewButton) {
      randomPreviewButton.textContent = "试听";
    }
  });
  randomPreviewPlayback?.addEventListener("ended", () => {
    if (randomPreviewButton) {
      randomPreviewButton.textContent = "试听";
    }
  });
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

  lightSceneButton?.addEventListener("click", openLightControlPanel);
  closeLightPanelButton?.addEventListener("click", () => setLightPanelOpen(false));
  closeRotationPanelButton?.addEventListener("click", () => setRotationPanelOpen(false));
  turnOffSceneEffectsButton?.addEventListener("click", turnOffSceneEffects);
  sceneEffectOnButton?.addEventListener("click", restoreSceneEffects);
  sceneEffectOffButton?.addEventListener("click", turnOffSceneEffects);
  lightEffectButtons.forEach((button) => {
    button.addEventListener("click", () => updateLightEffect(button.dataset.lightEffect));
  });
  rotationSpeedButtons.forEach((button) => {
    button.addEventListener("click", () => updateRotationSpeed(button.dataset.rotationSpeed));
  });
  rotationControlButton?.addEventListener("click", openRotationControlPanel);
  effectSpeedRange?.addEventListener("input", (event) => {
    updateEffectSpeed(event.currentTarget.value);
  });
  lightIntensityRange?.addEventListener("input", (event) => {
    updateLightIntensity(event.currentTarget.value);
  });
  steadyRedRange?.addEventListener("input", (event) => {
    updateSteadyChannel("red", event.currentTarget.value);
  });
  steadyYellowRange?.addEventListener("input", (event) => {
    updateSteadyChannel("yellow", event.currentTarget.value);
  });
  steadyBlueRange?.addEventListener("input", (event) => {
    updateSteadyChannel("blue", event.currentTarget.value);
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
  closeVoiceReviewButton?.addEventListener("click", dismissVoiceReviewPanel);
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

}
