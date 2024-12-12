const appRoutes = {
  home: "/",
  categories: "/categories",
  admin: "/admin",
  auth: {
    path: "/auth",
    login: "/auth?ref=login",
    register: "/auth?ref=register",
  },
};

const apiRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  refresh: "/auth/refresh",
};

export { appRoutes, apiRoutes };
