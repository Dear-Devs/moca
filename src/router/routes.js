const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      requiresAuth: true,
    },
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

      {
        path: "check-input-output",
        name: "check-input-output",
        component: () => import("pages/CheckInputOutput.vue"),
      },

      {
        path: "attendance-list",
        name: "attendance-list",
        component: () => import("pages/AttendanceList.vue"),
      },
      {
        path: "employees-list",
        name: "employees-list",
        component: () => import("pages/EmployeesList.vue"),
      },

      {
        path: "attendance-detail",
        name: "attendance-detail",
        component: () => import("pages/AttendanceDetail.vue"),
      },
    ],
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
    },
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

      {
        path: "attendance-list",
        name: "attendance-list",
        component: () => import("pages/AttendanceList.vue"),
      },
      {
        path: "employees-list",
        name: "employees-list",
        component: () => import("pages/EmployeesList.vue"),
      },

      {
        path: "attendance-detail",
        name: "attendance-detail",
        component: () => import("pages/AttendanceDetail.vue"),
      },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/LoginPage.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

export default routes;
