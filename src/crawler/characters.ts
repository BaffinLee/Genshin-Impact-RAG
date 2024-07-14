import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

export async function getCharacters(): Promise<string[]> {
    const file = path.resolve(__dirname, '../wiki-data/characters.json');
    if (await promisify(fs.exists)(file)) {
        return JSON.parse(await promisify(fs.readFile)(file, 'utf-8'));
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto('https://wiki.biligame.com/ys/%E8%A7%92%E8%89%B2');
    await page.waitForSelector('#CardSelectTr');

    const list = await page.evaluate(() => {
        const items = document.querySelectorAll('#CardSelectTr .divsort .L');
        return Array.from(items).map((item) => item.textContent!).filter(item => !!item);
    });

    fs.writeFileSync(file, JSON.stringify(list), 'utf-8');

    await browser.close();

    return list;
}
