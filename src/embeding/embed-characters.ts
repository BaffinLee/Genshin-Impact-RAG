import axios from "axios";
import { exists, readFile, writeFile } from "fs";
import path from "path";
import { promisify } from "util";

export async function embedCharacters() {
    const file = path.resolve(__dirname, '../wiki-data/characters.json');
    const characters = JSON.parse(await promisify(readFile)(file, 'utf-8'));
    for (let character of characters) {
        await embedCharacter(character);
    }
}

async function embedCharacter(character: string) {
    const file = path.resolve(__dirname, `../wiki-data/embeding/${character.replace(/\//g, '-')}.json`);
    if (await promisify(exists)(file)) {
        return;
    }
    const characterDataFile = path.resolve(__dirname, `../wiki-data/character/${character.replace(/\//g, '-')}.md`);
    const characterData = await promisify(readFile)(characterDataFile, 'utf-8');
    const index = characterData.indexOf('命之座\n---');
    const res = await axios.post('http://localhost:8787', {
        text: characterData.slice(0, Math.min(512, index === -1 ? 512 : index)),
    });

    if (!Array.isArray(res.data?.data?.[0])) {
        console.error(res.data);
        throw new Error(`embeding failed for character: ${character}`);
    }

    await promisify(writeFile)(file, JSON.stringify(res.data.data[0]), 'utf-8');
}
