import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outputDir = resolve(root, "launch_notes_assets", "weekly_2026_05_22");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const chromePort = 9224;

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();
  }

  static async connect(url) {
    const ws = new WebSocket(url);
    const client = new CdpClient(ws);
    await new Promise((resolveOpen, rejectOpen) => {
      ws.addEventListener("open", resolveOpen, { once: true });
      ws.addEventListener("error", rejectOpen, { once: true });
    });
    ws.addEventListener("message", (event) => client.handleMessage(JSON.parse(event.data)));
    return client;
  }

  handleMessage(message) {
    if (message.id && this.pending.has(message.id)) {
      const { resolveSend, rejectSend } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) {
        rejectSend(new Error(message.error.message));
      } else {
        resolveSend(message.result || {});
      }
      return;
    }

    const listeners = this.listeners.get(message.method) || [];
    for (const listener of listeners) listener(message.params || {});
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolveSend, rejectSend });
    });
  }

  waitFor(method, timeoutMs = 5000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const timeout = setTimeout(() => {
        this.listeners.set(
          method,
          (this.listeners.get(method) || []).filter((listener) => listener !== onEvent),
        );
        rejectEvent(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const onEvent = (params) => {
        clearTimeout(timeout);
        this.listeners.set(
          method,
          (this.listeners.get(method) || []).filter((listener) => listener !== onEvent),
        );
        resolveEvent(params);
      };
      this.listeners.set(method, [...(this.listeners.get(method) || []), onEvent]);
    });
  }

  close() {
    this.ws.close();
  }
}

async function waitForChrome() {
  const versionUrl = `http://127.0.0.1:${chromePort}/json/version`;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(versionUrl);
      if (response.ok) return;
    } catch {
      // Chrome is still booting.
    }
    await delay(100);
  }
  throw new Error("Chrome remote debugging endpoint did not start");
}

async function createPage() {
  const response = await fetch(`http://127.0.0.1:${chromePort}/json/new?about:blank`, { method: "PUT" });
  if (!response.ok) {
    throw new Error(`Unable to create Chrome target: ${response.status}`);
  }
  const target = await response.json();
  const page = await CdpClient.connect(target.webSocketDebuggerUrl);
  await page.send("Page.enable");
  await page.send("Runtime.enable");
  await page.send("Emulation.setDeviceMetricsOverride", {
    width: 941,
    height: 1672,
    deviceScaleFactor: 1,
    mobile: false,
  });
  return page;
}

async function navigate(page, fileName) {
  const url = pathToFileURL(resolve(root, fileName)).href;
  const loaded = page.waitFor("Page.loadEventFired", 8000).catch(() => undefined);
  await page.send("Page.navigate", { url });
  await loaded;
  await page.send("Runtime.evaluate", {
    expression: "document.fonts && document.fonts.ready",
    awaitPromise: true,
  });
  await delay(450);
}

async function evaluate(page, expression, waitMs = 300) {
  await page.send("Runtime.evaluate", { expression, awaitPromise: true, userGesture: true });
  await delay(waitMs);
}

async function screenshot(page, name) {
  const result = await page.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
    fromSurface: true,
  });
  await writeFile(resolve(outputDir, name), Buffer.from(result.data, "base64"));
}

async function captureScenario({ name, file = "index.html", actions, waitMs = 300 }) {
  const page = await createPage();
  try {
    await navigate(page, file);
    if (actions) {
      await evaluate(page, actions, waitMs);
    }
    await screenshot(page, name);
  } finally {
    page.close();
  }
}

const promptText = "一个关于小恐龙找月亮的睡前故事";
const prepareAiTranscript = `
  document.getElementById("generateButton").click();
  document.getElementById("generateInput").value = "${promptText}";
  document.getElementById("generateInput").dispatchEvent(new Event("input", { bubbles: true }));
  document.getElementById("submitGenerateButton").click();
`;

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const userDataDir = resolve("/tmp", `ai-lamp-weekly-chrome-${Date.now()}`);
const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--no-first-run",
  "--no-default-browser-check",
  "--allow-file-access-from-files",
  `--remote-debugging-port=${chromePort}`,
  `--user-data-dir=${userDataDir}`,
  "--window-size=941,1672",
  "about:blank",
], { stdio: "ignore" });

try {
  await waitForChrome();
  await captureScenario({
    name: "01-ai-transcript-preview.png",
    actions: prepareAiTranscript,
  });
  await captureScenario({
    name: "02-ai-audio-stream-preview.png",
    actions: `${prepareAiTranscript}
      document.getElementById("confirmTranscriptButton").click();
      beginAiAudioStream();
    `,
    waitMs: 1400,
  });
  await captureScenario({
    name: "03-random-preview.png",
    actions: 'document.getElementById("randomButton").click();',
  });
  await captureScenario({
    name: "04-light-settings.png",
    actions: `
      document.querySelector('[data-control="light"]').click();
      document.querySelector('[data-light-effect="steady"]').click();
    `,
  });
  await captureScenario({
    name: "05-rotation-settings.png",
    actions: 'document.querySelector(\'[data-control="rotation"]\').click();',
  });
  await captureScenario({
    name: "06-mode-card-feedback.png",
    actions: 'document.querySelector(\'.mode-card[data-mode="story"]\').click();',
    waitMs: 450,
  });
  await captureScenario({
    name: "07-offline-disabled-controls.png",
    file: "offline.html",
  });
} finally {
  chrome.kill();
  await rm(userDataDir, { recursive: true, force: true });
}

console.log(`Captured screenshots in ${outputDir}`);
