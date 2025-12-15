// Run this with: npx tsx scripts/subscribe.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function subscribe() {
  const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
  const WEBHOOK_SECRET = process.env.TWITCH_WEBHOOK_SECRET;
  const CALLBACK_URL = "https://serenitydev.net/api/webhooks/twitch"; // MUST BE YOUR LIVE URL

  // 1. Get an App Access Token
  const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' });
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  // 2. Look up your Broadcaster ID (SerenityStreaming)
  // We can assume you are the owner of the client ID, or look up via user login.
  // Ideally, hardcode your ID here if you know it, otherwise we fetch it.
  const MY_BROADCASTER_ID = "547329691"; // Based on your previous JSON

  // 3. Send Subscription Request
  const subRes = await fetch('https://api.twitch.tv/helix/eventsub/subscriptions', {
    method: 'POST',
    headers: {
      'Client-ID': CLIENT_ID!,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'channel.channel_points_custom_reward_redemption.add',
      version: '1',
      condition: {
        broadcaster_user_id: MY_BROADCASTER_ID,
      },
      transport: {
        method: 'webhook',
        callback: CALLBACK_URL,
        secret: WEBHOOK_SECRET,
      },
    }),
  });

  const response = await subRes.json();
  console.log("Twitch Response:", JSON.stringify(response, null, 2));
}

subscribe();