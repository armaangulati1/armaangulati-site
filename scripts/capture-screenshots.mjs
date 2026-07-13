// One-off screenshot capture for project card art. Not part of the build.
//   node scripts/capture-screenshots.mjs
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = "public/screenshots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});

async function shoot(name, url, { settle = 3500, sleepMarkers = [] } = {}) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(settle);
    const bodyText = (await page.textContent("body")) ?? "";
    for (const marker of sleepMarkers) {
      if (bodyText.toLowerCase().includes(marker.toLowerCase())) {
        console.log(`SKIP ${name}: asleep ("${marker}")`);
        await page.close();
        return false;
      }
    }
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`OK ${name}: ${url}`);
    await page.close();
    return true;
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
    await page.close();
    return false;
  }
}

await shoot("chartextract-ui", "https://armaangulati1.github.io/ChartExtract-UI/", {
  settle: 4000,
});
await shoot(
  "chartextractor",
  "https://chartextract-f9wfrftqzygappf2pgi3hts.streamlit.app/",
  {
    settle: 6000,
    sleepMarkers: ["get this app back up", "zzzz", "is asleep"],
  },
);

await browser.close();
