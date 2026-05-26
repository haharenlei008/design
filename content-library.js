const DESIGN_WIDTH = 941;
const DESIGN_HEIGHT = 1672;
const CONTENT_LIBRARY_STORAGE_KEY = "ai-projector-content-library-v1";
const PLAY_HISTORY_STORAGE_KEY = "ai-projector-play-history-v1";
const PLAY_HISTORY_MAX_RECORDS = 20;
const PREVIEW_DURATION_MS = 8000;
const AI_AUDIO_DURATION_MS = 20000;
const CONTENT_LIBRARY_COVER_BASE = "./assets/images/content-library/";
const AI_DEFAULT_COVER_IMAGE = "./assets/images/content-library/little-mermaid-cover.png";

const modeConfig = {
  story: {
    title: "故事模式",
    shortTitle: "故事",
    background: "./故事模式-背景图-2.png",
    effect: "star",
    accent: "#fcd34d",
  },
  music: {
    title: "儿歌模式",
    shortTitle: "儿歌",
    background: "./音乐模式-背景图-2.png",
    effect: "note",
    accent: "#55d7ff",
  },
  sleep: {
    title: "睡眠模式",
    shortTitle: "睡眠",
    background: "./睡眠模式-背景图-2.png",
    effect: "moon",
    accent: "#b9a6ff",
  },
  parent: {
    title: "亲子模式",
    shortTitle: "亲子",
    background: "./亲子模式-背景图-2.png",
    effect: "heart",
    accent: "#ffbe76",
  },
};

const subcategoryLabels = {
  adventure: "冒险",
  goodnight: "晚安",
  rhythm: "节奏",
  interaction: "互动",
};

const contentTopics = [
  {
    id: "bedtime-stars",
    title: "睡前推荐",
    subtitle: "温柔安睡、经典童话和轻声陪伴",
    mode: "sleep",
    itemIds: ["official-story-0", "official-sleep-0"],
  },
  {
    id: "classic-fairy-tales",
    title: "经典童话",
    subtitle: "适合睡前慢慢讲的善良故事",
    mode: "story",
    itemIds: ["official-story-0", "official-sleep-0"],
  },
  {
    id: "move-and-sing",
    title: "启蒙儿歌",
    subtitle: "数字、节奏和轻快旋律",
    mode: "music",
    itemIds: ["official-music-0"],
  },
  {
    id: "family-play",
    title: "亲子互动",
    subtitle: "用投影认识颜色和世界",
    mode: "parent",
    itemIds: ["official-parent-0"],
  },
];

const officialCoverImages = {
  "official-story-0": {
    coverImage: "./assets/images/content-library/little-mermaid-cover.png",
    coverAlt: "小美人鱼童话封面",
  },
  "official-music-0": {
    coverImage: "./assets/images/content-library/number-song-cover.png",
    coverAlt: "数字歌儿歌封面",
  },
  "official-sleep-0": {
    coverImage: "./assets/images/content-library/goodnight-bear-cover.png",
    coverAlt: "晚安小熊睡眠故事封面",
  },
  "official-parent-0": {
    coverImage: "./assets/images/content-library/color-game-cover.png",
    coverAlt: "一起认识颜色亲子互动封面",
  },
};

const rawOfficialContentItems = [
  {
    id: "official-story-0",
    title: "小美人鱼",
    subtitle: "经典童话，善良的美人鱼为了爱勇敢追梦。",
    mode: "story",
    subcategory: "adventure",
    topicId: "classic-fairy-tales",
    durationText: "8分钟",
    source: "官方内容",
    audioLabel: "小美人鱼睡前故事试听",
    transcript: "在蔚蓝的海底，住着一位善良美丽的小美人鱼公主。她勇敢追求自己的梦想，为了爱与希望，经历重重考验，最终收获了成长与幸福。",
  },
  {
    id: "official-music-0",
    title: "数字歌",
    subtitle: "跟着旋律学数字，快乐又有趣！",
    mode: "music",
    subcategory: "rhythm",
    topicId: "move-and-sing",
    durationText: "3分钟",
    source: "官方内容",
    audioLabel: "数字歌儿歌试听",
    transcript: "一二三，跟着小星星一起数。轻快的旋律带着宝宝认识数字，也让睡前的学习变得快乐又轻松。",
  },
  {
    id: "official-sleep-0",
    title: "晚安小熊",
    subtitle: "温暖安抚故事，陪伴宝贝安心入睡。",
    mode: "sleep",
    subcategory: "goodnight",
    topicId: "bedtime-stars",
    durationText: "6分钟",
    source: "官方内容",
    audioLabel: "晚安小熊睡眠故事试听",
    transcript: "小熊把星星被子轻轻盖好，月亮也慢慢闭上眼睛。温柔的故事陪着宝贝放松下来，安心进入梦乡。",
  },
  {
    id: "official-parent-0",
    title: "一起认识颜色",
    subtitle: "亲子互动游戏，认识缤纷色彩世界。",
    mode: "parent",
    subcategory: "interaction",
    topicId: "family-play",
    durationText: "5分钟",
    source: "官方内容",
    audioLabel: "一起认识颜色亲子互动试听",
    transcript: "红色像小太阳，蓝色像大海，绿色像草地。爸爸妈妈和宝宝一起找颜色，认识缤纷的世界。",
  },
];

const stageShell = document.getElementById("stageShell");
const app = document.getElementById("contentLibraryApp");
const librarySceneBg = document.getElementById("librarySceneBg");
const contentBackButton = document.getElementById("contentBackButton");
const contentDeviceStatus = document.getElementById("contentDeviceStatus");
const contentDeviceStatusWrap = contentDeviceStatus?.closest(".library-device-status");
const contentLibrarySearchInput = document.getElementById("contentLibrarySearchInput");
const contentLibraryTabButtons = document.querySelectorAll("[data-library-tab]");
const contentLibraryFilterButtons = document.querySelectorAll("[data-library-filter]");
const contentLibrarySubcategoryButtons = document.querySelectorAll("[data-library-subcategory]");
const activeKeywordChip = document.getElementById("activeKeywordChip");
const clearSearchButton = document.getElementById("clearSearchButton");
const contentTopicList = document.getElementById("contentTopicList");
const contentLibraryList = document.getElementById("contentLibraryList");
const contentLibraryEmpty = document.getElementById("contentLibraryEmpty");
const contentLibraryHint = document.getElementById("contentLibraryHint");
const todayRecommendation = document.getElementById("todayRecommendation");
const todayRecommendationCover = document.getElementById("todayRecommendationCover");
const todayRecommendationTitle = document.getElementById("todayRecommendationTitle");
const todayRecommendationSubtitle = document.getElementById("todayRecommendationSubtitle");
const todayRecommendationMeta = document.getElementById("todayRecommendationMeta");
const todayRecommendationButton = document.getElementById("todayRecommendationButton");
const secondaryRecommendation = document.getElementById("secondaryRecommendation");
const secondaryRecommendationCover = document.getElementById("secondaryRecommendationCover");
const secondaryRecommendationTitle = document.getElementById("secondaryRecommendationTitle");
const secondaryRecommendationSubtitle = document.getElementById("secondaryRecommendationSubtitle");
const secondaryRecommendationMeta = document.getElementById("secondaryRecommendationMeta");
const secondaryRecommendationButton = document.getElementById("secondaryRecommendationButton");
const favoriteSummaryButton = document.getElementById("favoriteSummaryButton");
const aiSummaryButton = document.getElementById("aiSummaryButton");
const favoriteSummaryCount = document.getElementById("favoriteSummaryCount");
const aiSummaryCount = document.getElementById("aiSummaryCount");
const recentContentRail = document.getElementById("recentContentRail");
const contentLibraryDetail = document.getElementById("contentLibraryDetail");
const closeContentDetailButton = document.getElementById("closeContentDetailButton");
const returnContentDetailButton = document.getElementById("returnContentDetailButton");
const detailCover = document.getElementById("detailCover");
const detailCoverArt = document.getElementById("detailCoverArt");
const detailModeLabel = document.getElementById("detailModeLabel");
const detailCoverTitle = document.getElementById("detailCoverTitle");
const detailSource = document.getElementById("detailSource");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailMeta = document.getElementById("detailMeta");
const detailTranscript = document.getElementById("detailTranscript");
const detailFavoriteButton = document.getElementById("detailFavoriteButton");
const detailPreviewButton = document.getElementById("detailPreviewButton");
const detailSendButton = document.getElementById("detailSendButton");
const contentPreviewPlayback = document.getElementById("contentPreviewPlayback");
const contentLibraryToast = document.getElementById("contentLibraryToast");

const officialContentItems = rawOfficialContentItems.map((item, index) =>
  normalizeContentLibraryItem(
    {
      ...item,
      ...officialCoverImages[item.id],
      kind: "official",
    },
    index,
  ),
);

let contentLibraryState = { favoriteOfficialIds: [], myItems: [] };
let playHistoryRecords = [];
let activeContentLibraryTab = "official";
let activeContentLibraryFilter = "all";
let activeContentLibrarySubcategory = "all";
let activeContentLibrarySearch = "";
let activeTopicId = "";
let activeDetailItemId = "";
let previewItemId = "";
let previewObjectUrl = "";

const deviceStatus = getDeviceStatusFromUrl();
const isOffline = deviceStatus === "offline";

function resizeContentLibraryStage() {
  if (!stageShell || !app) return;

  const scale = Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
  stageShell.style.width = `${DESIGN_WIDTH * scale}px`;
  stageShell.style.height = `${DESIGN_HEIGHT * scale}px`;
  app.style.transform = `scale(${scale})`;
}

function getDeviceStatusFromUrl() {
  try {
    const device = new URLSearchParams(window.location.search).get("device");
    return device === "offline" ? "offline" : "online";
  } catch (error) {
    return "online";
  }
}

function createContentLibraryId(kind) {
  return `${kind}-content-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createPlayHistoryId(type) {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatDuration(durationMs) {
  const totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function cloneDevicePayload(payload) {
  if (!payload || typeof payload !== "object") return null;

  try {
    return JSON.parse(JSON.stringify(payload));
  } catch (error) {
    return null;
  }
}

function buildPlayContentPayload(type, title, modeName) {
  return {
    service: "self.wby_audio.play",
    payloadVersion: "prototype-v1",
    data: {
      type,
      title,
      mode: modeConfig[modeName] ? modeName : "story",
      source: "content-library",
    },
  };
}

function getContentSubcategory(item = {}) {
  const source = `${item.title || ""} ${item.subtitle || ""} ${item.transcript || ""} ${item.audioLabel || ""}`.toLowerCase();

  if (/晚安|睡|月亮|摇篮|呼吸|安静|梦|放松|goodnight|sleep/.test(source)) {
    return "goodnight";
  }
  if (/儿歌|星星|合唱|节拍|铃铛|太阳|歌|曲|唱|跳|rhythm|music/.test(source)) {
    return "rhythm";
  }
  if (/亲子|一起|猜|找|问答|手影|互动|悄悄话|interaction|parent/.test(source)) {
    return "interaction";
  }

  return "adventure";
}

function normalizeContentLibraryItem(item = {}, index = 0) {
  const kind = item.kind === "ai" ? "ai" : "official";
  const modeName = modeConfig[item.mode] ? item.mode : "story";
  const modeTitle = modeConfig[modeName]?.title || "故事模式";
  const fallbackTitle = kind === "ai" ? "AI 生成内容" : "官方精选内容";
  const title = String(item.title || fallbackTitle).trim() || fallbackTitle;
  const transcript = String(item.transcript || (kind === "ai" ? item.audioLabel || title : `${modeTitle}精选内容：${title}`)).trim();
  const id = String(item.id || (kind === "official" ? `official-${modeName}-${index}` : createContentLibraryId(kind)));
  const coverDefaults = kind === "official" ? officialCoverImages[id] : null;
  const fallbackCoverAlt = kind === "ai" ? "AI 创作内容封面" : `${title}绘本封面`;

  return {
    id,
    kind,
    title,
    subtitle: String(item.subtitle || (kind === "ai" ? "AI 生成内容 · 已发送到设备" : `${modeTitle}推荐内容`)).trim(),
    mode: modeName,
    subcategory: item.subcategory || getContentSubcategory({ ...item, title, transcript }),
    topicId: String(item.topicId || ""),
    durationText: String(item.durationText || (kind === "ai" ? formatDuration(AI_AUDIO_DURATION_MS) : formatDuration(PREVIEW_DURATION_MS))).trim(),
    source: String(item.source || (kind === "ai" ? "AI 创作" : "官方内容")).trim(),
    transcript,
    audioLabel: String(item.audioLabel || item.subtitle || title).trim(),
    coverImage: String(item.coverImage || coverDefaults?.coverImage || (kind === "ai" ? AI_DEFAULT_COVER_IMAGE : `${CONTENT_LIBRARY_COVER_BASE}${id}.png`)).trim(),
    coverAlt: String(item.coverAlt || coverDefaults?.coverAlt || fallbackCoverAlt).trim(),
    createdAt: item.createdAt || new Date().toISOString(),
    devicePayload: cloneDevicePayload(item.devicePayload) || buildPlayContentPayload(kind === "ai" ? "ai" : "library", title, modeName),
  };
}

function normalizeContentLibraryState(state = {}) {
  const officialIds = new Set(officialContentItems.map((item) => item.id));
  const favoriteOfficialIds = Array.isArray(state.favoriteOfficialIds)
    ? [...new Set(state.favoriteOfficialIds.map(String))].filter((id) => officialIds.has(id))
    : [];
  const myItems = Array.isArray(state.myItems)
    ? state.myItems
        .map((item, index) => normalizeContentLibraryItem({ ...item, kind: "ai" }, index))
        .filter((item) => item.kind === "ai")
        .slice(0, 20)
    : [];

  return { favoriteOfficialIds, myItems };
}

function loadContentLibraryState() {
  let storedState = null;

  try {
    storedState = window.localStorage?.getItem(CONTENT_LIBRARY_STORAGE_KEY) ?? null;
  } catch (error) {
    storedState = null;
  }

  if (storedState === null) {
    return normalizeContentLibraryState();
  }

  try {
    return normalizeContentLibraryState(JSON.parse(storedState));
  } catch (error) {
    return normalizeContentLibraryState();
  }
}

function saveContentLibraryState() {
  try {
    window.localStorage?.setItem(CONTENT_LIBRARY_STORAGE_KEY, JSON.stringify(contentLibraryState));
  } catch (error) {
    showContentLibraryHint("当前浏览器暂时无法保存内容库");
  }
}

function addContentLibraryItem(kind, details = {}) {
  if (kind !== "ai") return null;

  const item = normalizeContentLibraryItem({
    id: createContentLibraryId(kind),
    kind,
    title: details.title,
    subtitle: details.subtitle || "AI 生成内容 · 已发送到设备",
    mode: details.mode,
    durationText: details.durationText || formatDuration(AI_AUDIO_DURATION_MS),
    source: details.source || "AI 创作",
    transcript: details.transcript,
    audioLabel: details.audioLabel,
    coverImage: details.coverImage || AI_DEFAULT_COVER_IMAGE,
    coverAlt: details.coverAlt || "AI 创作内容封面",
    devicePayload: details.devicePayload,
  });

  contentLibraryState.myItems = [item, ...contentLibraryState.myItems.filter((existingItem) => existingItem.id !== item.id)].slice(0, 20);
  saveContentLibraryState();
  renderContentLibrary();
  return item;
}

function normalizePlayHistoryRecord(record = {}, index = 0) {
  const typeLabels = {
    random: "随机播放",
    ai: "AI 生成",
    voice: "语音留言",
    library: "内容库",
  };
  const type = typeLabels[record.type] ? record.type : "library";
  const modeName = modeConfig[record.mode] ? record.mode : "story";
  const title = String(record.title || typeLabels[type]).trim() || typeLabels[type];

  return {
    id: String(record.id || createPlayHistoryId(type)),
    type,
    title,
    subtitle: String(record.subtitle || "").trim(),
    mode: modeName,
    durationText: String(record.durationText || formatDuration(PREVIEW_DURATION_MS)).trim(),
    createdAt: record.createdAt || new Date(Date.now() - index * 1000).toISOString(),
    source: String(record.source || typeLabels[type]).trim(),
    transcript: String(record.transcript || "").trim(),
    audioLabel: String(record.audioLabel || title).trim(),
    devicePayload: cloneDevicePayload(record.devicePayload) || buildPlayContentPayload(type, title, modeName),
  };
}

function loadPlayHistoryRecords() {
  let storedRecords = null;

  try {
    storedRecords = window.localStorage?.getItem(PLAY_HISTORY_STORAGE_KEY) ?? null;
  } catch (error) {
    storedRecords = null;
  }

  if (storedRecords === null) return [];

  try {
    const parsedRecords = JSON.parse(storedRecords);
    return Array.isArray(parsedRecords) ? parsedRecords.map(normalizePlayHistoryRecord).slice(0, PLAY_HISTORY_MAX_RECORDS) : [];
  } catch (error) {
    return [];
  }
}

function savePlayHistoryRecords() {
  try {
    window.localStorage?.setItem(PLAY_HISTORY_STORAGE_KEY, JSON.stringify(playHistoryRecords));
  } catch (error) {
    showContentLibraryHint("当前浏览器暂时无法保存播放记录");
  }
}

function addPlayHistoryRecord(type, details = {}) {
  const record = normalizePlayHistoryRecord({
    ...details,
    id: createPlayHistoryId(type),
    type,
    createdAt: new Date().toISOString(),
  });

  playHistoryRecords = [record, ...playHistoryRecords.filter((item) => item.id !== record.id)].slice(0, PLAY_HISTORY_MAX_RECORDS);
  savePlayHistoryRecords();
  return record;
}

function getMyContentItems() {
  const favoriteIdSet = new Set(contentLibraryState.favoriteOfficialIds);
  const favoriteItems = officialContentItems.filter((item) => favoriteIdSet.has(item.id));
  return [...favoriteItems, ...contentLibraryState.myItems];
}

function getAllContentItems() {
  return [...officialContentItems, ...contentLibraryState.myItems];
}

function findContentLibraryItem(itemId) {
  return getAllContentItems().find((item) => item.id === itemId);
}

function findTopic(topicId) {
  return contentTopics.find((topic) => topic.id === topicId);
}

function matchesContentLibrarySearch(item, searchText = activeContentLibrarySearch) {
  const query = searchText.trim().toLowerCase();
  if (!query) return true;

  const topic = findTopic(item.topicId);
  const source = [
    item.title,
    item.subtitle,
    item.source,
    item.transcript,
    item.audioLabel,
    item.coverAlt,
    modeConfig[item.mode]?.title,
    modeConfig[item.mode]?.shortTitle,
    subcategoryLabels[item.subcategory],
    topic?.title,
    topic?.subtitle,
  ]
    .join(" ")
    .toLowerCase();

  return source.includes(query);
}

function filterContentItems(sourceItems) {
  let visibleItems = [...sourceItems];

  if (activeContentLibraryFilter !== "all") {
    visibleItems = visibleItems.filter((item) => item.mode === activeContentLibraryFilter);
  }

  if (activeContentLibrarySubcategory !== "all") {
    visibleItems = visibleItems.filter((item) => item.subcategory === activeContentLibrarySubcategory);
  }

  return visibleItems.filter((item) => matchesContentLibrarySearch(item));
}

function getVisibleTopicItems() {
  const matchingTopics = contentTopics.filter((topic) => {
    const topicText = `${topic.title} ${topic.subtitle} ${modeConfig[topic.mode]?.title || ""}`.toLowerCase();
    const searchMatch = !activeContentLibrarySearch || topicText.includes(activeContentLibrarySearch.toLowerCase());
    const modeMatch = activeContentLibraryFilter === "all" || topic.mode === activeContentLibraryFilter;
    return searchMatch && modeMatch;
  });

  if (!matchingTopics.length) {
    activeTopicId = "";
    return { topics: [], items: [] };
  }

  if (!matchingTopics.some((topic) => topic.id === activeTopicId)) {
    activeTopicId = matchingTopics[0].id;
  }

  const activeTopic = findTopic(activeTopicId);
  const topicItems = activeTopic ? activeTopic.itemIds.map(findContentLibraryItem).filter(Boolean) : [];

  return {
    topics: matchingTopics,
    items: filterContentItems(topicItems),
  };
}

function getContentLibraryItemsForActiveView() {
  if (activeContentLibraryTab === "mine") {
    return filterContentItems(getMyContentItems());
  }

  if (activeContentLibraryTab === "topics") {
    return getVisibleTopicItems().items;
  }

  return filterContentItems(officialContentItems);
}

function createMetaPill(text) {
  const pill = document.createElement("span");
  pill.textContent = text;
  return pill;
}

function getContentCoverImage(item = {}) {
  if (item.coverImage) return item.coverImage;
  if (item.kind === "ai") return AI_DEFAULT_COVER_IMAGE;
  return `${CONTENT_LIBRARY_COVER_BASE}${item.id || "official-story-0"}.png`;
}

function createCoverImageElement(item, className = "library-cover-art") {
  const cover = document.createElement("div");
  cover.className = className;

  const fallback = document.createElement("span");
  fallback.className = "library-cover-fallback";
  fallback.textContent = (item.title || "内容").slice(0, 2);

  const image = document.createElement("img");
  image.src = getContentCoverImage(item);
  image.alt = item.coverAlt || `${item.title || "内容"}封面`;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.remove();
    cover.classList.add("is-fallback");
  });

  cover.append(fallback, image);
  return cover;
}

function renderCoverInto(container, item, className = "library-cover-art") {
  if (!container) return;
  container.replaceChildren(createCoverImageElement(item, className));
}

function createSvgButtonIcon(path) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 32 32");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  iconPath.setAttribute("d", path);
  svg.append(iconPath);
  return svg;
}

function showContentLibraryHint(message) {
  if (!contentLibraryHint) return;

  contentLibraryHint.textContent = message || (isOffline ? "设备在线后可发送播放" : "");
  if (!message || isOffline) return;

  clearTimeout(showContentLibraryHint.timer);
  showContentLibraryHint.timer = setTimeout(() => {
    contentLibraryHint.textContent = "";
  }, 2400);
}

function showContentLibraryToast(message) {
  if (!contentLibraryToast) return;

  contentLibraryToast.textContent = message;
  contentLibraryToast.setAttribute("aria-hidden", "false");
  contentLibraryToast.classList.add("is-visible");
  clearTimeout(showContentLibraryToast.timer);
  showContentLibraryToast.timer = setTimeout(() => {
    contentLibraryToast.classList.remove("is-visible");
    contentLibraryToast.setAttribute("aria-hidden", "true");
  }, 2200);
}

function updateDeviceUi() {
  if (contentBackButton) {
    contentBackButton.href = isOffline ? "./offline.html" : "./index.html";
  }

  if (contentDeviceStatus) {
    contentDeviceStatus.textContent = isOffline ? "设备离线" : "设备在线";
  }
  contentDeviceStatusWrap?.classList.toggle("is-offline", isOffline);

  app?.classList.toggle("is-offline", isOffline);
  if (detailSendButton && isOffline) {
    detailSendButton.textContent = "在线后发送";
    detailSendButton.disabled = true;
    detailSendButton.setAttribute("aria-disabled", "true");
  }
  showContentLibraryHint(isOffline ? "离线可浏览和收藏，设备在线后可发送播放" : "");
}

function renderFeatureRecommendation(nodes, item) {
  if (!item) return;

  const { card, cover, title, subtitle, meta } = nodes;
  if (card) {
    card.dataset.contentId = item.id;
    card.dataset.mode = item.mode;
  }
  if (title) title.textContent = item.title;
  if (subtitle) subtitle.textContent = item.title === "小美人鱼" ? "善良的公主勇敢追梦" : item.subtitle.replace(/[，。！]/g, " ").trim();
  renderCoverInto(cover, item, "library-cover-art library-feature-cover-art");
  if (meta) {
    meta.replaceChildren(createMetaPill(modeConfig[item.mode]?.title || "故事模式"));
  }
}

function renderRecommendation() {
  const storyItem = findContentLibraryItem("official-story-0") || officialContentItems[0];
  const sleepItem = findContentLibraryItem("official-sleep-0") || officialContentItems[1];

  renderFeatureRecommendation(
    {
      card: todayRecommendation,
      cover: todayRecommendationCover,
      title: todayRecommendationTitle,
      subtitle: todayRecommendationSubtitle,
      meta: todayRecommendationMeta,
    },
    storyItem,
  );
  renderFeatureRecommendation(
    {
      card: secondaryRecommendation,
      cover: secondaryRecommendationCover,
      title: secondaryRecommendationTitle,
      subtitle: secondaryRecommendationSubtitle,
      meta: secondaryRecommendationMeta,
    },
    sleepItem,
  );

  if (favoriteSummaryCount) favoriteSummaryCount.textContent = `${Math.max(12, getMyContentItems().length)}个内容`;
  if (aiSummaryCount) aiSummaryCount.textContent = `${Math.max(8, contentLibraryState.myItems.length)}个内容`;

  recentContentRail?.replaceChildren();
}

function renderTopics() {
  if (!contentTopicList) return;

  const { topics } = getVisibleTopicItems();
  contentTopicList.hidden = activeContentLibraryTab !== "topics";
  contentTopicList.replaceChildren();

  if (activeContentLibraryTab !== "topics") return;

  topics.forEach((topic) => {
    const card = document.createElement("button");
    card.className = "library-topic-card";
    card.type = "button";
    card.dataset.topicId = topic.id;
    card.classList.toggle("is-active", topic.id === activeTopicId);

    const coverStack = document.createElement("span");
    coverStack.className = "library-topic-cover-stack";
    topic.itemIds.slice(0, 3).forEach((itemId) => {
      const topicItem = findContentLibraryItem(itemId);
      if (!topicItem) return;
      const image = document.createElement("img");
      image.src = getContentCoverImage(topicItem);
      image.alt = "";
      image.loading = "lazy";
      coverStack.append(image);
    });

    const title = document.createElement("strong");
    title.textContent = topic.title;
    const subtitle = document.createElement("span");
    subtitle.textContent = topic.subtitle;
    const count = document.createElement("small");
    count.textContent = `${topic.itemIds.length} 条 · ${modeConfig[topic.mode]?.shortTitle || "内容"}`;

    card.append(coverStack, title, subtitle, count);
    card.addEventListener("click", () => {
      activeTopicId = topic.id;
      renderContentLibrary();
    });
    contentTopicList.append(card);
  });
}

function renderContentCard(item) {
  const favoriteIdSet = new Set(contentLibraryState.favoriteOfficialIds);
  const isFavorite = favoriteIdSet.has(item.id);
  const record = document.createElement("article");
  record.className = `content-library-item content-library-item--${item.kind} library-book-card`;
  record.setAttribute("role", "listitem");
  record.dataset.contentId = item.id;
  record.dataset.mode = item.mode;
  record.classList.toggle("is-selected", item.id === activeDetailItemId);

  const cover = createCoverImageElement(item, "library-cover-art library-card-cover");

  const content = document.createElement("div");
  content.className = "library-book-copy";

  const head = document.createElement("div");
  head.className = "content-library-item-head";

  const copy = document.createElement("div");
  copy.className = "content-library-copy";
  const title = document.createElement("p");
  title.textContent = item.title;
  const subtitle = document.createElement("small");
  subtitle.textContent = item.subtitle || item.audioLabel;
  copy.append(title, subtitle);

  const badge = document.createElement("span");
  badge.className = `content-library-kind content-library-kind--${item.kind}`;
  badge.textContent = item.kind === "ai" ? "AI 内容" : modeConfig[item.mode]?.title || "故事模式";
  head.append(copy, badge);

  const meta = document.createElement("div");
  meta.className = "content-library-meta";
  meta.append(createMetaPill(subcategoryLabels[item.subcategory] || "经典童话"), createMetaPill(item.source), createMetaPill(item.durationText));

  const body = document.createElement("p");
  body.className = "content-library-desc";
  body.textContent = item.subtitle || item.audioLabel || "精选内容，可发送到投影灯播放";

  const actions = document.createElement("div");
  actions.className = "content-library-item-actions";

  if (item.kind === "official") {
    const favoriteButton = document.createElement("button");
    favoriteButton.className = "content-favorite-button";
    favoriteButton.type = "button";
    favoriteButton.textContent = isFavorite ? "已收藏" : "收藏";
    favoriteButton.setAttribute("aria-label", isFavorite ? `取消收藏${item.title}` : `收藏${item.title}`);
    favoriteButton.setAttribute("aria-pressed", String(isFavorite));
    favoriteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleContentFavorite(item.id);
    });
    actions.append(favoriteButton);
  }

  const previewButton = document.createElement("button");
  previewButton.className = "content-preview-button";
  previewButton.type = "button";
  previewButton.textContent = previewItemId === item.id && !contentPreviewPlayback.paused ? "暂停" : "试听";
  previewButton.setAttribute("aria-label", `试听${item.title}`);
  previewButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleContentPreview(item.id);
  });
  actions.append(previewButton);

  const sendButton = document.createElement("button");
  sendButton.className = "content-send-button";
  sendButton.type = "button";
  sendButton.textContent = isOffline ? "在线后发" : "发送播放";
  sendButton.setAttribute("aria-label", `${isOffline ? "设备在线后发送" : "发送播放"}${item.title}`);
  sendButton.disabled = isOffline;
  sendButton.setAttribute("aria-disabled", String(isOffline));
  sendButton.addEventListener("click", (event) => {
    event.stopPropagation();
    sendContentLibraryItem(item.id);
  });
  actions.append(sendButton);

  record.addEventListener("click", () => openContentDetail(item.id));
  content.append(head, meta, body, actions);
  record.append(cover, content);
  return record;
}

function updateSelectedContentCards() {
  document.querySelectorAll(".content-library-item[data-content-id]").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.contentId === activeDetailItemId);
  });
}

function renderContentLibrary() {
  if (!contentLibraryList || !contentLibraryEmpty) return;

  contentLibraryTabButtons.forEach((button) => {
    const isActive = button.dataset.libraryTab === activeContentLibraryTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  contentLibraryFilterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.libraryFilter === activeContentLibraryFilter);
  });

  contentLibrarySubcategoryButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.librarySubcategory === activeContentLibrarySubcategory);
  });

  renderRecommendation();
  renderTopics();

  if (contentLibrarySearchInput && contentLibrarySearchInput.value !== activeContentLibrarySearch) {
    contentLibrarySearchInput.value = activeContentLibrarySearch;
  }

  const visibleItems = getContentLibraryItemsForActiveView();
  contentLibraryList.replaceChildren();
  contentLibraryEmpty.hidden = visibleItems.length > 0;

  if (!visibleItems.length) {
    const emptyTitle = contentLibraryEmpty.querySelector("strong");
    const emptyCopy = contentLibraryEmpty.querySelector("small");
    if (emptyTitle) emptyTitle.textContent = activeContentLibraryTab === "mine" ? "还没有我的内容" : "没有找到内容";
    if (emptyCopy) {
      emptyCopy.textContent =
        activeContentLibraryTab === "mine" ? "收藏官方内容，或发送 AI 生成内容后会出现在这里" : "换个关键词、模式或子分类试试";
    }
  }

  visibleItems.forEach((item) => {
    contentLibraryList.append(renderContentCard(item));
  });

  if (activeDetailItemId) {
    renderContentDetail(activeDetailItemId);
  }
  updateSelectedContentCards();
}

function openContentDetail(itemId) {
  activeDetailItemId = itemId;
  renderContentDetail(itemId);
  contentLibraryDetail?.classList.add("is-open");
  contentLibraryDetail?.setAttribute("aria-hidden", "false");
  updateSelectedContentCards();
}

function closeContentDetail() {
  activeDetailItemId = "";
  contentLibraryDetail?.classList.remove("is-open");
  contentLibraryDetail?.setAttribute("aria-hidden", "true");
  updateSelectedContentCards();
}

function renderContentDetail(itemId = activeDetailItemId) {
  const item = findContentLibraryItem(itemId);
  if (!item || !contentLibraryDetail) return;

  const mode = modeConfig[item.mode] || modeConfig.story;
  const isFavorite = contentLibraryState.favoriteOfficialIds.includes(item.id);

  contentLibraryDetail.dataset.mode = item.mode;
  if (detailCover) detailCover.style.setProperty("--detail-accent", mode.accent);
  renderCoverInto(detailCoverArt, item, "library-cover-art library-detail-cover-image");
  if (detailModeLabel) detailModeLabel.textContent = mode.title;
  if (detailCoverTitle) detailCoverTitle.textContent = item.title;
  if (detailSource) detailSource.textContent = `${subcategoryLabels[item.subcategory] || "经典童话"} · ${item.source} · ${item.durationText}`;
  if (detailTitle) detailTitle.textContent = item.title;
  if (detailSubtitle) detailSubtitle.textContent = item.subtitle || item.audioLabel;
  if (detailTranscript) detailTranscript.textContent = item.transcript || "精选内容，可发送到投影灯播放。";

  if (detailMeta) {
    detailMeta.replaceChildren(
      createMetaPill(`#${subcategoryLabels[item.subcategory] || "经典童话"}`),
      createMetaPill(`#${findTopic(item.topicId)?.title || "睡前推荐"}`),
    );
  }

  if (detailFavoriteButton) {
    detailFavoriteButton.hidden = item.kind !== "official";
    detailFavoriteButton.textContent = isFavorite ? "已收藏" : "收藏";
    detailFavoriteButton.setAttribute("aria-label", isFavorite ? `取消收藏${item.title}` : `收藏${item.title}`);
    detailFavoriteButton.setAttribute("aria-pressed", String(isFavorite));
  }

  if (detailPreviewButton) {
    detailPreviewButton.textContent = previewItemId === item.id && !contentPreviewPlayback.paused ? "暂停" : "试听";
    detailPreviewButton.setAttribute("aria-label", `试听${item.title}`);
  }

  if (detailSendButton) {
    detailSendButton.textContent = isOffline ? "在线后发送" : "发送播放";
    detailSendButton.setAttribute("aria-label", `${isOffline ? "设备在线后发送" : "发送播放"}${item.title}`);
    detailSendButton.disabled = isOffline;
    detailSendButton.setAttribute("aria-disabled", String(isOffline));
  }
}

function toggleContentFavorite(itemId) {
  const item = officialContentItems.find((officialItem) => officialItem.id === itemId);
  if (!item) return;

  const favoriteIdSet = new Set(contentLibraryState.favoriteOfficialIds);
  if (favoriteIdSet.has(itemId)) {
    favoriteIdSet.delete(itemId);
    showContentLibraryToast("已从我的内容移除");
  } else {
    favoriteIdSet.add(itemId);
    showContentLibraryToast("已收藏到我的内容");
  }

  contentLibraryState.favoriteOfficialIds = [...favoriteIdSet];
  saveContentLibraryState();
  renderContentLibrary();
}

function writeWavText(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function createPrototypeAudioBlob(durationMs) {
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

function updatePreviewButtons() {
  document.querySelectorAll(".content-preview-button").forEach((button) => {
    const card = button.closest("[data-content-id]");
    const itemId = card?.dataset.contentId || activeDetailItemId;
    button.textContent = previewItemId === itemId && !contentPreviewPlayback.paused ? "暂停" : "试听";
  });

  if (activeDetailItemId) {
    renderContentDetail(activeDetailItemId);
  }
}

async function toggleContentPreview(itemId) {
  const item = findContentLibraryItem(itemId);
  if (!item || !contentPreviewPlayback) return;

  try {
    if (previewItemId === item.id && !contentPreviewPlayback.paused) {
      contentPreviewPlayback.pause();
      updatePreviewButtons();
      return;
    }

    if (previewObjectUrl) {
      URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = "";
    }

    previewItemId = item.id;
    const previewBlob = createPrototypeAudioBlob(item.kind === "ai" ? AI_AUDIO_DURATION_MS : PREVIEW_DURATION_MS);
    previewObjectUrl = URL.createObjectURL(previewBlob);
    contentPreviewPlayback.src = previewObjectUrl;
    contentPreviewPlayback.load();
    await contentPreviewPlayback.play();
    updatePreviewButtons();
  } catch (error) {
    previewItemId = "";
    updatePreviewButtons();
    showContentLibraryToast("试听暂时无法播放");
  }
}

function sendContentLibraryItem(itemId) {
  const item = findContentLibraryItem(itemId);
  if (!item) return;

  if (isOffline) {
    showContentLibraryHint("设备在线后可发送播放");
    showContentLibraryToast("设备在线后可发送播放");
    return;
  }

  addPlayHistoryRecord(item.kind === "ai" ? "ai" : "library", {
    title: item.title,
    subtitle: item.subtitle || `${item.source} · 已发送到设备`,
    mode: item.mode,
    durationText: item.durationText,
    source: item.source,
    transcript: item.transcript,
    audioLabel: item.audioLabel,
    devicePayload: item.devicePayload,
  });

  showContentLibraryToast("内容已发送到投影灯");
  showContentLibraryHint("已写入播放记录");
  renderRecommendation();
}

function initContentLibraryPage() {
  resizeContentLibraryStage();
  updateDeviceUi();
  contentLibraryState = loadContentLibraryState();
  playHistoryRecords = loadPlayHistoryRecords();

  if (librarySceneBg) {
    librarySceneBg.style.backgroundImage = `url("${modeConfig.story.background}")`;
  }

  window.addEventListener("resize", resizeContentLibraryStage);

  todayRecommendationButton?.addEventListener("click", () => {
    const itemId = todayRecommendation?.dataset.contentId;
    if (itemId) openContentDetail(itemId);
  });
  todayRecommendation?.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    const itemId = todayRecommendation?.dataset.contentId;
    if (itemId) openContentDetail(itemId);
  });
  secondaryRecommendationButton?.addEventListener("click", () => {
    const itemId = secondaryRecommendation?.dataset.contentId;
    if (itemId) openContentDetail(itemId);
  });
  secondaryRecommendation?.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    const itemId = secondaryRecommendation?.dataset.contentId;
    if (itemId) openContentDetail(itemId);
  });

  favoriteSummaryButton?.addEventListener("click", () => {
    activeContentLibraryTab = "mine";
    activeTopicId = "";
    renderContentLibrary();
  });
  aiSummaryButton?.addEventListener("click", () => {
    activeContentLibraryTab = "mine";
    activeContentLibrarySearch = "AI";
    activeTopicId = "";
    renderContentLibrary();
  });

  contentLibraryTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeContentLibraryTab = ["official", "mine", "topics"].includes(button.dataset.libraryTab) ? button.dataset.libraryTab : "official";
      activeTopicId = "";
      closeContentDetail();
      renderContentLibrary();
    });
  });

  contentLibraryFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeContentLibraryFilter = modeConfig[button.dataset.libraryFilter] ? button.dataset.libraryFilter : "all";
      activeTopicId = "";
      renderContentLibrary();
    });
  });

  contentLibrarySubcategoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeContentLibrarySubcategory = button.dataset.librarySubcategory || "all";
      renderContentLibrary();
    });
  });

  contentLibrarySearchInput?.addEventListener("input", (event) => {
    activeContentLibrarySearch = event.currentTarget.value.trim();
    activeTopicId = "";
    renderContentLibrary();
  });

  activeKeywordChip?.addEventListener("click", () => {
    activeContentLibrarySearch = "睡前";
    activeTopicId = "";
    renderContentLibrary();
  });

  clearSearchButton?.addEventListener("click", () => {
    activeContentLibrarySearch = "";
    activeContentLibraryFilter = "all";
    activeContentLibrarySubcategory = "all";
    activeTopicId = "";
    renderContentLibrary();
  });

  closeContentDetailButton?.addEventListener("click", closeContentDetail);
  returnContentDetailButton?.addEventListener("click", closeContentDetail);
  detailFavoriteButton?.addEventListener("click", () => toggleContentFavorite(activeDetailItemId));
  detailPreviewButton?.addEventListener("click", () => toggleContentPreview(activeDetailItemId));
  detailSendButton?.addEventListener("click", () => sendContentLibraryItem(activeDetailItemId));

  contentPreviewPlayback?.addEventListener("ended", () => {
    previewItemId = "";
    updatePreviewButtons();
  });

  contentPreviewPlayback?.addEventListener("pause", updatePreviewButtons);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contentLibraryDetail?.classList.contains("is-open")) {
      closeContentDetail();
    }
  });

  renderContentLibrary();
  openContentDetail("official-story-0");
}

initContentLibraryPage();
