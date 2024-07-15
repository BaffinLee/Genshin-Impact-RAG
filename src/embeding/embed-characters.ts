import { exists, readFile, writeFile } from "fs";
import path from "path";
import { promisify } from "util";
import { Collection } from 'chromadb';
import { embedText, getCollection } from "./chroma";

export async function embedCharacters() {
    const file = path.resolve(__dirname, '../wiki-data/characters.json');
    const characters = JSON.parse(await promisify(readFile)(file, 'utf-8'));
    const collection = await getCollection();
    for (let character of characters) {
        await embedCharacter(character, collection);
    }
}

async function embedCharacter(character: string, collection: Collection) {
    const record = await collection.get({ ids: [character] });
    if (record.ids.length === 1 && record.ids[0] === character) {
        return;
    }

    const file = path.resolve(__dirname, `../wiki-data/embeding/${character.replace(/\//g, '-')}.json`);
    if (await promisify(exists)(file)) {
        await collection.add({
            ids: [character],
            embeddings: [JSON.parse(await promisify(readFile)(file, 'utf-8'))],
        });
        return;
    }

    const characterDataFile = path.resolve(__dirname, `../wiki-data/character/${character.replace(/\//g, '-')}.md`);
    const characterData = await promisify(readFile)(characterDataFile, 'utf-8');
    const index = characterData.indexOf('命之座\n---');
    const text = characterData.slice(0, Math.min(512, index === -1 ? 512 : index));
    const embeddings = await embedText([text]);

    await collection.add({
        ids: [character],
        embeddings,
    });

    await promisify(writeFile)(file, JSON.stringify(embeddings[0]), 'utf-8');
}
