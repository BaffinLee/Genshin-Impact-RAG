// http://localhost:8787
export default {
	async fetch(request: Request, env: Env) {
		const req = await request.json();
		const res = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
			text: req.text,
		});
		return Response.json(res);
	}
}
