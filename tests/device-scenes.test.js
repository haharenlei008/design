const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const offlineHtml = fs.readFileSync(path.join(root, "offline.html"), "utf8");
const contentLibraryHtml = fs.readFileSync(path.join(root, "content-library.html"), "utf8");
const contentLibraryJs = fs.readFileSync(path.join(root, "content-library.js"), "utf8");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const contentLibraryAssetDir = path.join(root, "assets", "images", "content-library");
const contentLibraryIconDir = path.join(root, "图标", "内容库");
const contentLibraryManifestPath = path.join(root, "assets", "manifest.json");

const modeDefaults = ["story", "music", "sleep", "parent"];
const lightModes = ["渐变", "跑马", "呼吸", "长亮"];
const steadyChannels = ["红光亮度", "黄光亮度", "蓝光亮度"];
const rotationModes = ["低速", "中速", "高速", "停止旋转"];
const contentLibraryTabs = ["官方内容", "我的内容", "专题"];
const contentLibrarySubcategories = ["冒险", "晚安", "节奏", "互动"];
const officialContentCoverFiles = ["little-mermaid-cover", "goodnight-bear-cover", "number-song-cover", "color-game-cover"];
const requiredContentLibraryIconFiles = [
  " Image 1.svg",
  " Image 2.svg",
  " Image 3.svg",
  " Image 4.svg",
  " Image 5.svg",
  " Image 6.svg",
  " Image 7.svg",
  " Image 8.svg",
  " Image 9.svg",
  " Image 10.svg",
  " Image 11.svg",
  " Image 12.svg",
  " Image 13.svg",
  " Image 14.svg",
  " Image 15.svg",
  " Image 17.svg",
  " Image 18.svg",
  " Image 20.svg",
  " Image 21.svg",
];

for (const modeName of modeDefaults) {
  assert(appJs.includes(`${modeName}: {`), `app.js should define ${modeName} mode device defaults`);
}

for (const effectName of lightModes) {
  assert(indexHtml.includes(effectName), `index.html should expose ${effectName} light option`);
  assert(offlineHtml.includes(effectName), `offline.html should expose disabled ${effectName} light option`);
}

for (const rotationName of rotationModes) {
  assert(indexHtml.includes(rotationName), `index.html should expose ${rotationName} rotation option`);
  assert(offlineHtml.includes(rotationName), `offline.html should expose disabled ${rotationName} rotation option`);
}

for (const channelName of steadyChannels) {
  assert(indexHtml.includes(channelName), `index.html should expose ${channelName} for steady light mode`);
  assert(offlineHtml.includes(channelName), `offline.html should expose disabled ${channelName} for steady light mode`);
}

for (const controlName of ['data-control="light"', 'data-control="rotation"', 'data-control="voice"']) {
  assert(indexHtml.includes(controlName), `index.html should include ${controlName}`);
  assert(offlineHtml.includes(controlName), `offline.html should include disabled ${controlName}`);
}

assert(!indexHtml.includes('data-control="night-light"'), "index.html should not include a bottom night-light shortcut");
assert(indexHtml.includes("开启场景效果"), "index.html should include scene effects on action");
assert(indexHtml.includes("关闭场景效果"), "index.html should include scene effects off action");
assert(indexHtml.includes("停止播放"), "index.html should keep stop playback action");
assert(indexHtml.includes("关闭灯光"), "light panel should include light-off action");
assert(!indexHtml.includes("全部关闭"), "light panel should not label the light-off action as all-off");
assert(indexHtml.includes('data-panel="text-preview"'), "generate flow should include transcript preview panel");
assert(indexHtml.includes('id="contentLibraryButton"'), "index.html should expose a content library entry in the play panel");
assert(offlineHtml.includes('id="contentLibraryButton"'), "offline.html should expose a content library entry in the play panel");
assert(indexHtml.includes('href="./content-library.html?device=online"'), "index.html content library entry should navigate to online library page");
assert(offlineHtml.includes('href="./content-library.html?device=offline"'), "offline.html content library entry should navigate to offline library page");
assert(indexHtml.indexOf('id="contentLibraryButton"') < indexHtml.indexOf('class="play-left"'), "index.html content library entry should sit on the left side of the play panel");
assert(offlineHtml.indexOf('id="contentLibraryButton"') < offlineHtml.indexOf('class="play-left"'), "offline.html content library entry should sit on the left side of the play panel");
assert(!indexHtml.match(/<div class="play-actions"[\s\S]*?<\/div>/)?.[0].includes("contentLibraryButton"), "index.html should not group content library with random playback actions");
assert(!offlineHtml.match(/<div class="play-actions"[\s\S]*?<\/div>/)?.[0].includes("contentLibraryButton"), "offline.html should not group content library with random playback actions");
assert(!indexHtml.includes('id="playGlyph"'), "index.html play panel should not include the extra playback glyph image");
assert(!offlineHtml.includes('id="playGlyph"'), "offline.html play panel should not include the extra playback glyph image");
assert(!indexHtml.includes('data-panel="content-library"'), "index.html should not keep the old content library modal panel");
assert(!offlineHtml.includes('data-panel="content-library"'), "offline.html should not keep the old content library modal panel");
assert(offlineHtml.includes('aria-label="随机播放" aria-disabled="true" disabled'), "offline random play should stay disabled");
assert(!offlineHtml.includes('id="contentLibraryButton" type="button" aria-label="打开内容库" aria-disabled="true" disabled'), "offline content library entry should remain browsable");
assert(contentLibraryHtml.includes('id="contentLibraryApp"'), "content-library.html should include standalone content library app root");
assert(contentLibraryHtml.includes("library-bookshelf-page"), "content-library.html should keep the standalone library page class hook");
assert(contentLibraryHtml.includes('id="contentLibrarySearchInput"'), "content-library.html should include search input");
assert(contentLibraryHtml.includes('id="todayRecommendationCover"'), "content-library.html should include a cover-led today recommendation");
assert(contentLibraryHtml.includes('id="secondaryRecommendationCover"'), "content-library.html should include a secondary recommendation cover");
assert(contentLibraryHtml.includes('./图标/内容库/%20Image%2021.svg'), "content-library.html should use the supplied content-library avatar icon");
assert(contentLibraryHtml.includes('./图标/内容库/%20Image%202.svg'), "content-library.html should use the supplied content-library back icon");
assert(contentLibraryHtml.includes('./图标/内容库/%20Image%203.svg'), "content-library.html should use the supplied content-library search icon");
assert(contentLibraryHtml.includes('./图标/内容库/%20Image%2020.svg'), "content-library.html should use the supplied content-library online status icon");
assert(!contentLibraryHtml.includes("<svg"), "content-library.html should not keep inline SVG icons");
for (const inlineIcon of ["✦", "★", "▰", "♪", "☾", "●●", "⌁", "◖", "☆", "➤"]) {
  assert(!contentLibraryHtml.includes(inlineIcon), `content-library.html should replace inline ${inlineIcon} icons with supplied icon assets`);
}
for (const iconFile of requiredContentLibraryIconFiles) {
  assert(fs.existsSync(path.join(contentLibraryIconDir, iconFile)), `${iconFile} should exist in the supplied content library icon directory`);
}
const referencedContentLibraryIconPaths = [...new Set(`${contentLibraryHtml}\n${contentLibraryJs}`.match(/\.\/图标\/内容库\/[^"')\s]+\.svg/g) || [])];
assert(referencedContentLibraryIconPaths.length >= 12, "content-library page should reference the supplied icon set broadly");
for (const iconPath of referencedContentLibraryIconPaths) {
  const iconFile = decodeURIComponent(iconPath.replace("./图标/内容库/", ""));
  assert(fs.existsSync(path.join(contentLibraryIconDir, iconFile)), `${iconPath} should resolve to an existing content library icon`);
}
for (const tabName of contentLibraryTabs) {
  assert(contentLibraryHtml.includes(tabName), `content-library.html should include ${tabName} content library tab`);
}
assert(contentLibraryHtml.includes('data-library-tab="official"'), "content-library.html should include official tab control");
assert(contentLibraryHtml.includes('data-library-tab="mine"'), "content-library.html should include my content tab control");
assert(contentLibraryHtml.includes('data-library-tab="topics"'), "content-library.html should include topics tab control");
assert(contentLibraryHtml.includes('id="contentLibraryList"'), "content-library.html should include content library list");
assert(contentLibraryHtml.includes("搜索故事、儿歌、睡前内容"), "content-library.html should expose the high-fidelity search placeholder");
assert(contentLibraryHtml.includes('data-library-subcategory="all"'), "content-library.html should include all subcategory filter");
for (const subcategoryName of contentLibrarySubcategories) {
  assert(contentLibraryHtml.includes(subcategoryName), `content-library.html should include ${subcategoryName} subcategory`);
}
assert(contentLibraryHtml.includes('id="contentLibraryEmpty"'), "content-library.html should include content library empty state");
assert(contentLibraryHtml.includes('id="contentLibraryDetail"'), "content-library.html should include detail view container");
assert(contentLibraryHtml.includes('id="detailCoverArt"'), "content-library.html should include a cover-led detail view");
assert(contentLibraryHtml.includes('id="contentPreviewPlayback"'), "content-library.html should include prototype audio playback element");
assert(contentLibraryHtml.includes("设备在线后可发送播放"), "content-library.html should explain playback requires an online device");
assert(contentLibraryHtml.includes("./content-library.js"), "content-library.html should load its standalone script");
assert(indexHtml.includes("对应文本"), "audio preview should expose matching transcript text");
assert(indexHtml.includes("确认生成音频"), "transcript preview should confirm before audio generation");
assert(indexHtml.includes("编辑文案"), "audio preview should allow editing transcript and regenerating audio");
assert(appJs.includes("const modeDeviceDefaults"), "app.js should define per-mode device defaults");
assert(appJs.includes("function buildPrototypeDevicePayload"), "app.js should keep hidden device payload mapping");
assert(appJs.includes("function buildBrightnessPayload"), "app.js should build brightness set_channels payload");
assert(appJs.includes("function buildLightPayload"), "app.js should build light payload by mode");
assert(appJs.includes("let generatedTranscript"), "app.js should track editable generated transcript");
assert(appJs.includes("let confirmedTranscript"), "app.js should track transcript confirmed for audio");
assert(appJs.includes("function regenerateTranscriptPreview"), "app.js should support regenerating transcript text before audio");
assert(appJs.includes("function confirmTranscriptAndGenerateAudio"), "app.js should confirm transcript before audio streaming");
assert(appJs.includes("function editConfirmedTranscript"), "app.js should invalidate current audio before editing confirmed transcript");
assert(appJs.includes('"self.wby_rgb.set_channels"'), "app.js should map brightness to set_channels");
assert(appJs.includes("white: value, yellow: value, blue: value"), "app.js should apply brightness to white/yellow/blue channels");
assert(appJs.includes('lightEffect === "steady"'), "steady light mode should use channel brightness without set_effect");
assert(appJs.includes("steadyChannels"), "steady light mode should keep red/yellow/blue channel state");
assert(appJs.includes("getSteadyChannelValues"), "steady light mode should map visible channels to device brightness payload");
assert(appJs.includes("function applyModeDeviceDefaults"), "app.js should apply mode device defaults");
assert(appJs.includes("function turnOffSceneEffects"), "app.js should turn off scene effects");
assert(appJs.includes("function stopProjectionRotation"), "app.js should stop rotation without turning off lights");
assert(!appJs.includes("playGlyph"), "app.js should not manage the removed play panel glyph image");
assert(stylesCss.includes(".light-control-panel"), "styles.css should style the light settings panel");
assert(stylesCss.includes(".rotation-control-panel"), "styles.css should style the rotation settings panel");
assert(offlineHtml.includes("设备在线后可调节灯光和旋转"), "offline page should explain controls need online device");
assert(offlineHtml.includes('data-control="light" aria-label="打开灯光设置" aria-disabled="true" disabled'), "offline light entry should be disabled");
assert(offlineHtml.includes('data-control="rotation" aria-label="切换投影旋转" aria-disabled="true" disabled'), "offline rotation entry should be disabled");
assert(offlineHtml.match(/data-light-effect="[^"]+" disabled/g)?.length === 4, "offline light options should all be disabled");
assert(offlineHtml.match(/data-rotation-speed="[^"]+" disabled/g)?.length === 4, "offline rotation options should all be disabled");
assert(stylesCss.includes(".rotation-stop-button"), "rotation stop button should have standalone styling");
assert(indexHtml.includes('id="playHistoryPanel"'), "index.html should include playback history panel");
assert(offlineHtml.includes('id="playHistoryPanel"'), "offline.html should include playback history panel");
assert(indexHtml.includes('id="playHistoryList"'), "index.html should include playback history list");
assert(offlineHtml.includes('id="playHistoryList"'), "offline.html should include playback history list");
assert(indexHtml.includes('id="playHistoryEmpty"'), "index.html should include playback history empty state");
assert(offlineHtml.includes('id="playHistoryEmpty"'), "offline.html should include playback history empty state");
assert(indexHtml.includes('data-history-online="true"'), "online page should mark playback history as replay-capable");
assert(offlineHtml.includes('data-history-online="false"'), "offline page should mark playback history replay as disabled");
assert(appJs.includes('const PLAY_HISTORY_STORAGE_KEY'), "app.js should define localStorage key for playback history");
assert(appJs.includes('const CONTENT_LIBRARY_STORAGE_KEY'), "app.js should define localStorage key for content library");
assert(appJs.includes("function renderPlayHistory"), "app.js should render playback history records");
assert(appJs.includes("function addPlayHistoryRecord"), "app.js should add successful playback records");
assert(appJs.includes("function replayPlayHistoryRecord"), "app.js should support replaying history records");
assert(appJs.includes("function loadContentLibraryState"), "app.js should load content library state");
assert(appJs.includes("function saveContentLibraryState"), "app.js should save content library state");
assert(appJs.includes("function addContentLibraryItem"), "app.js should add AI content to my library");
assert(appJs.includes("function getContentSubcategory"), "app.js should derive subcategories for content items");
assert(appJs.includes("addPlayHistoryRecord(\"random\""), "random send success should add a playback history record");
assert(appJs.includes("addPlayHistoryRecord(\"ai\""), "AI send success should add a playback history record");
assert(appJs.includes("addPlayHistoryRecord(\"voice\""), "voice send success should add a playback history record");
assert(appJs.includes("addContentLibraryItem(\"ai\""), "AI send success should add generated content to my library");
assert(appJs.includes("library: \"内容库\""), "playback history should support content library records");
assert(contentLibraryJs.includes("const CONTENT_LIBRARY_STORAGE_KEY"), "content-library.js should define localStorage key for content library");
assert(contentLibraryJs.includes("const PLAY_HISTORY_STORAGE_KEY"), "content-library.js should define localStorage key for playback history");
assert(contentLibraryJs.includes("coverImage"), "content-library.js should expose coverImage for content items");
assert(contentLibraryJs.includes("coverAlt"), "content-library.js should expose coverAlt for accessible cover art");
assert(contentLibraryJs.includes("./assets/images/content-library/little-mermaid-cover.png"), "content-library.js should define the default AI cover asset from the cropped asset set");
assert(contentLibraryJs.includes("const libraryIconPaths"), "content-library.js should centralize supplied content library icon paths");
assert(contentLibraryJs.includes("function createLibraryIcon"), "content-library.js should render button icons from supplied content library assets");
assert(!contentLibraryJs.includes("createSvgButtonIcon"), "content-library.js should not generate inline SVG button icons");
assert(fs.existsSync(contentLibraryManifestPath), "assets/manifest.json should exist for cropped content library assets");
const contentLibraryManifest = JSON.parse(fs.readFileSync(contentLibraryManifestPath, "utf8"));
for (const coverId of officialContentCoverFiles) {
  const assetPath = `./assets/images/content-library/${coverId}.png`;
  assert(contentLibraryJs.includes(assetPath), `content-library.js should map ${coverId} to a stable cover path`);
  assert(fs.existsSync(path.join(contentLibraryAssetDir, `${coverId}.png`)), `${coverId}.png should exist in the content library asset directory`);
  assert(
    contentLibraryManifest.some((asset) => asset.path === `assets/images/content-library/${coverId}.png`),
    `${coverId}.png should be recorded in assets/manifest.json`,
  );
}
assert(fs.existsSync(path.join(contentLibraryAssetDir, "child-avatar.png")), "child-avatar.png should exist in the content library asset directory");
assert(contentLibraryJs.includes("const officialContentItems"), "content-library.js should seed official content");
assert(contentLibraryJs.includes("const contentTopics"), "content-library.js should seed topic groups");
assert(contentLibraryJs.includes("function getDeviceStatusFromUrl"), "content-library.js should read online/offline URL parameter");
assert(contentLibraryJs.includes("function loadContentLibraryState"), "content-library.js should load content library state");
assert(contentLibraryJs.includes("function saveContentLibraryState"), "content-library.js should save content library state");
assert(contentLibraryJs.includes("function renderContentLibrary"), "content-library.js should render filtered content");
assert(contentLibraryJs.includes("function renderContentDetail"), "content-library.js should render detail view");
assert(contentLibraryJs.includes("function toggleContentFavorite"), "content-library.js should toggle official favorites");
assert(contentLibraryJs.includes("function toggleContentPreview"), "content-library.js should handle prototype audio preview");
assert(contentLibraryJs.includes("function sendContentLibraryItem"), "content-library.js should send content library items");
assert(contentLibraryJs.includes('addPlayHistoryRecord(item.kind === "ai" ? "ai" : "library"'), "content-library.js should save library sends to playback history");
assert(contentLibraryJs.includes("设备在线后可发送播放"), "content-library.js should disable send in offline mode");
assert(stylesCss.includes(".history-panel"), "styles.css should style playback history panel");
assert(stylesCss.includes(".history-record"), "styles.css should style individual playback records");
assert(stylesCss.includes(".play-actions"), "styles.css should style the play-panel action group");
assert(stylesCss.includes(".content-library-button--side"), "styles.css should style the left-side content library entry");
assert(stylesCss.includes(".content-library-page"), "styles.css should style the standalone content library page");
assert(stylesCss.includes(".library-bookshelf-page"), "styles.css should style the standalone content library page surface");
assert(stylesCss.includes(".content-library-page::before"), "content-library page should add a dedicated starry overlay");
assert(stylesCss.includes(".library-recommendation-grid"), "styles.css should style the two-by-two recommendation grid");
assert(stylesCss.includes(".library-profile-avatar"), "styles.css should style the cropped child avatar");
assert(stylesCss.includes(".content-library-item"), "styles.css should style content library records");
assert(stylesCss.includes(".content-library-page .content-library-item"), "content-library page should strengthen list card surfaces for legibility");
assert(stylesCss.includes(".content-library-page .content-library-item.is-selected"), "content-library page should highlight the active detail item");
assert(stylesCss.includes(".library-cover-art"), "styles.css should style reusable content cover art");
assert(stylesCss.includes(".library-feature-cover"), "styles.css should style the today recommendation cover");
assert(stylesCss.includes(".library-book-card"), "styles.css should style bookshelf list cards");
assert(stylesCss.includes(".library-detail-cover-art"), "styles.css should style the detail cover art");
assert(stylesCss.includes(".library-detail-handle"), "styles.css should style the bottom detail sheet handle");
assert(stylesCss.includes(".library-cover-fallback"), "styles.css should keep broken cover assets from breaking layout");
assert(stylesCss.includes(".content-library-search"), "styles.css should style content library search");
assert(stylesCss.includes(".content-library-page .content-library-search"), "content-library page should strengthen the search surface for legibility");
assert(stylesCss.includes(".content-subcategory"), "styles.css should style content library subcategories");
assert(stylesCss.includes(".library-filter-panel"), "content-library page should group filters on a readable surface");
assert(stylesCss.includes(".library-detail-panel"), "styles.css should style the content library detail view");
assert(stylesCss.includes(".library-topic-card"), "styles.css should style content library topic cards");
assert(stylesCss.includes(".library-icon-img"), "styles.css should style supplied content library icon images");
assert(!stylesCss.includes('content: "☆"'), "styles.css should not render favorite icon with CSS text content");
assert(!stylesCss.includes('content: "★"'), "styles.css should not render active favorite icon with CSS text content");
assert(!stylesCss.includes('content: "◖"'), "styles.css should not render preview icon with CSS text content");
assert(!stylesCss.includes('content: "➤"'), "styles.css should not render send icon with CSS text content");

console.log("device scene prototype checks passed");
