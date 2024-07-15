import { Hono } from 'hono';
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors';
import { getContexts } from '../embeding/chroma';
import axios from 'axios';

const app = new Hono();

app.use(cors({
  maxAge: 60 * 60 * 24,
  origin: '*',
}));

app.get('/chat', async (ctx) => {
  const req = await ctx.req.json();
  const contexts = getContexts(req.question);
  const res = await axios.post('http://localhost:8787/chat', {
    question: req.question,
    contexts,
  });
  return Response.json(res.data);
});

serve({
  fetch: app.fetch,
  hostname: '127.0.0.1',
  port: Number(process.env.PORT || 8080),
}, (info) => {
  console.log(`Listening on http://127.0.0.1:${info.port}`);
});
