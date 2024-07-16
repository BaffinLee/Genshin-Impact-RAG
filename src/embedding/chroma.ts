import axios from 'axios';
import { ChromaClient, Collection } from 'chromadb';

export async function getCollection(): Promise<Collection> {
    try {
        const client = new ChromaClient();
        const collection = await client.getOrCreateCollection({
            name: "characters",
            embeddingFunction: {
                async generate(texts: string[]) {
                    return embedText(texts);
                },
            },
        });
        return collection;
    } catch (err) {
        console.error('Please check your chroma db service status, connect db failed!');
        throw err;
    }
    
}

export async function embedText(texts: string[]): Promise<number[][]> {
    try {
        const res = await axios.post('http://localhost:8787/embedding', {
            text: texts,
        });
        return res.data.data;
    } catch (err) {
        console.error('Please check your cloudflare worker server status, request failed!');
        throw err;
    }
}

export async function getContexts(question: string) {
    const embeddings = await embedText([question]);
    const collection = await getCollection();
    const res = await collection.query({
        queryEmbeddings: embeddings[0],
        nResults: 2,
    });
    return res.documents[0];
}
