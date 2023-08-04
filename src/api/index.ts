import { Hono } from 'hono';
import { fetchUserProfile } from '../lib';
import { ThreadsUserProfileResponse } from '../types/threads-api';

const port = +(Bun.env.PORT ?? 1234);
const app = new Hono();
// app.get('api/users/:userId', async (context) => {
//   const userId = context.req.param('userId');
//   const data = await fetchUserProfile({ userId });

//   return context.json(data);
// });

app.get('/api/users/:userName', async (context) => {
  console.log('ok');
  const userName = context.req.param('userName');
  const data = await fetchUserProfile({ userName });

  return context.json(data);
});

export default {
  port,
  fetch: app.fetch, // <----- Esto es algo especial de Bun
};
/*
// Nativo del lenguaje
const server = Bun.serve({
  port: 1234,
  async fetch(request) {
    const { pathname, searchParams } = new URL(request.url);
    if (pathname.startsWith('/api/users')) {
      const userId = searchParams.get('userId') ?? undefined;
      const userName = searchParams.get('userName') ?? undefined;
      const data = await fetchUserProfile({ userId, userName });

      return new Response(JSON.stringify(data));
    }

    return new Response(null, { status: 404 });
  },
});

console.log(`Listening on localhost:${server.port})`);
*/