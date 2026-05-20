const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const offlineHtml = fs.readFileSync(path.join(root, "offline.html"), "utf8");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const modeDefaults = ["story", "music", "sleep", "parent"];
const lightModes = ["渐变", "跑马", "呼吸", "长亮"];
const steadyChannels = ["红光亮度", "黄光亮度", "蓝光亮度"];
const rotationModes = ["低速", "中速", "高速", "停止旋转"];

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
assert(stylesCss.includes(".light-control-panel"), "styles.css should style the light settings panel");
assert(stylesCss.includes(".rotation-control-panel"), "styles.css should style the rotation settings panel");
assert(offlineHtml.includes("设备在线后可调节灯光和旋转"), "offline page should explain controls need online device");
assert(offlineHtml.includes('data-control="light" aria-label="打开灯光设置" aria-disabled="true" disabled'), "offline light entry should be disabled");
assert(offlineHtml.includes('data-control="rotation" aria-label="切换投影旋转" aria-disabled="true" disabled'), "offline rotation entry should be disabled");
assert(offlineHtml.match(/data-light-effect="[^"]+" disabled/g)?.length === 4, "offline light options should all be disabled");
assert(offlineHtml.match(/data-rotation-speed="[^"]+" disabled/g)?.length === 4, "offline rotation options should all be disabled");
assert(stylesCss.includes(".rotation-stop-button"), "rotation stop button should have standalone styling");

console.log("device scene prototype checks passed");
