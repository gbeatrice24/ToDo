import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import LoginLayout from "@/layout/LoginLayout.vue";
import SignupLayout from "@/layout/SignupLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
  },
  {
    path: "/login",
    component: LoginLayout,
  },
  {
    path: "/signup",
    component: SignupLayout,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
