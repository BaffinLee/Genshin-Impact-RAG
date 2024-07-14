import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import TurndownService from 'turndown';

export async function getCharacterInfo(character: string) {
    const file = path.resolve(__dirname, `../wiki-data/character/${character}.md`);
    if (await promisify(fs.exists)(file)) {
        return await promisify(fs.readFile)(file, 'utf-8');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(`https://wiki.biligame.com/ys/${encodeURIComponent(character)}`);
    await page.waitForSelector('#mw-content-text');

    const html = await page.evaluate(() => {
        const dom = document.querySelector('#mw-content-text') as HTMLElement;
        const info = dom.querySelector('.bg-snm');
        info?.previousElementSibling?.previousElementSibling?.remove();
        info?.previousElementSibling?.remove();
        info?.remove();
        ['属性数据', '突破', '立绘', '角色故事', '其它信息', '技能升级材料', '天赋'].forEach(item => {
            const el = dom.querySelector(`#${item}`);
            el?.parentElement?.nextElementSibling?.remove();
            el?.parentElement?.remove();
        });
        Array(5).fill(0).map((_, i) => i + 1).forEach(i => {
            dom.querySelectorAll(`[alt="${i}星.png"]`).forEach(item => {
                item.replaceWith(document.createTextNode(`${i}星`));
            });
        });
        dom.querySelectorAll('style').forEach(item => item.remove());
        dom.querySelectorAll('img').forEach(item => item.remove());
        dom.querySelectorAll('a').forEach(item => {
            item.textContent?.trim()
                ? item.replaceWith(document.createTextNode(item.textContent || ''))
                : item.remove();
        });
        dom.querySelector('#navigationFrame')?.remove();
        dom.querySelectorAll('table').forEach(item => {
            item.querySelectorAll('tr').forEach(tr => {
                tr.textContent = Array.from(tr.querySelectorAll('th,td')).map(td => td.textContent || '').join(' ');
                tr.parentElement?.insertBefore(document.createElement('br'), tr);
            });
        });
        document.querySelector('#toc')?.remove();
        const end = dom.querySelector(`#角色相关`)?.parentElement;
        while (end?.nextElementSibling) {
            end?.nextElementSibling?.remove();
        }
        end?.remove();
        return dom.outerHTML;
    });
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);

    fs.writeFileSync(file, markdown, 'utf-8');

    await browser.close();

    return markdown;
}

export async function getAllCharacterInfos(characters: string[]) {
    for (let character of characters) {
        await getCharacterInfo(character);
        await (new Promise((resolve) => setTimeout(resolve, 1000)));
    }
}
