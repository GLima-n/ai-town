import { httpRouter } from 'convex/server';
import { handleReplicateWebhook } from './music';
import { httpAction } from './_generated/server';
import { api } from './_generated/api';

const http = httpRouter();
http.route({
  path: '/replicate_webhook',
  method: 'POST',
  handler: handleReplicateWebhook,
});

http.route({
  path: '/update_agent_status',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const { agentName, description } = await request.json();
    await ctx.runMutation(api.world.updateAgentStatus, {
      agentName,
      description,
    });
    return new Response(null, { status: 200 });
  }),
});

export default http;
