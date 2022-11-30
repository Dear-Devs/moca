const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "profile",
        name: "profile",
        component: () => import("pages/ProfilePage.vue"),
      },
      {
        path: "edit-profile",
        name: "edit-profile",
        component: () => import("pages/EditProfilePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },

];

export default routes;
