import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import MainLayout from "@/layout/MainLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
  },
  {
    path: "/login",
    component: LoginLayout, // layout for login page
    children: [
      {
        path: "",
        name: "Login",
        component: LoginView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
