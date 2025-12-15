import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"

const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

const handler = NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
      authorization: {
        params: {
          // 1. Force the Redirect URI (Keep this from before)
          redirect_uri: `${BASE_URL}/api/auth/callback/twitch`,
          
          // 2. Set the Scope to just OpenID (No email)
          scope: "openid",
          
          // 3. THE FIX: Explicitly tell Twitch we do NOT want email claims.
          // This prevents the "insufficient_scope" error by overriding NextAuth's defaults.
          claims: JSON.stringify({
            id_token: {
              email: null,
              email_verified: null
            }
          })
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture;
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }