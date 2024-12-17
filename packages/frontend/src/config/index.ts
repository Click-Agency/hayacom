const appRoutes = {
  home: "/",
  categories: "/categories",
  admin: "/admin",
  auth: {
    path: "/auth",
    login: "/auth?ref=login",
    register: "/auth?ref=register",
  },
  createPacakge: "/admin/create-package",
  editPackage: "/admin/edit-package",

  createCard: "/admin/create-card",
  editCard: "/admin/edit-card",
};

const apiRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  refresh: "/auth/refresh",
  packages: "/packages",
  cards: "/cards",
};

export { appRoutes, apiRoutes };
