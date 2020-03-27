import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    // 除了首页之外的页面都可以用懒加载
    // .vue的扩展名可以忽略
    component: () => import("@/views/Login")
  },
  {
    // 注册页
    path: "/register",
    component: () => import("@/views/Register")
  },
  {
    // 个人中心
    path: "/personal",
    component: () => import("@/views/Personal")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
