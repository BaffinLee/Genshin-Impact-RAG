// local server: http://localhost:8787

export default {
	async fetch(request: Request, env: Env) {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/embeding':
				return handleEmbeding(request, env);
			case '/chat':
				return handleChat(request, env);
			default:
				return Response.json({});
		}
	}
}

async function handleEmbeding(request: Request, env: Env) {
	const req = await request.json();
	const res = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
		text: req.text,
	});
	return Response.json(res);
}

async function handleChat(request: Request, env: Env) {
	const { contexts, question } = await request.json();
	if (!question) {
		throw new Error('Need question');
	}

	const systemPrompt = `When answering the question or responding, use the context provided if relevant, do not use context if not provided or relevant. Context: ${
		contexts?.join('\n') || ''
	}`;

	const res = await env.AI.run('@cf/qwen/qwen1.5-14b-chat-awq', {
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: question },
		],
	});
	return Response.json(res);
}
