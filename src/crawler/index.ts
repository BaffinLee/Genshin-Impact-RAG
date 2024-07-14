import { getAllCharacterInfos } from "./character-info";
import { getCharacters } from "./characters";

async function run() {
    const characters = await getCharacters();
    await getAllCharacterInfos(characters);
}

run();
