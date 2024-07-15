export default {
	// local server: http://localhost:8787
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
	return Response.json({});
}
