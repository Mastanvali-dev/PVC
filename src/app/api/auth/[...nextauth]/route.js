import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { validateUser } from '@/lib/auth';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        const user = await validateUser(credentials.phone, credentials.password);
        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  basePath: '',
  baseUrl: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
