export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ token, request: { nextUrl } }) {
      const isLoggedIn = !!token;
      const isOnAdminPage = nextUrl.pathname.startsWith('/admin');
      if (isOnAdminPage) {
        if (isLoggedIn) return null;
        return '/admin/login?callbackUrl=' + encodeURI(nextUrl.pathname);
      } else if (isLoggedIn) {
        return '/admin/orders';
      }
      return null;
    },
  },
  providers: [],
};
