import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由配置
const routes = [
  {
    path: "/",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    // 除了首页之外的页面都可以用懒加载
    // .vue的扩展名可以忽略
    component: () => import("@/views/Login"),
  },
  {
    // 注册页
    path: "/register",
    component: () => import("@/views/Register"),
  },
  {
    // 个人中心
    path: "/personal",
    component: () => import("@/views/Personal"),
    // 路由可以通过meta自定义数据,可以选择在路由上随意加上自己的数据
    // 它的值可以是任意类型
    meta: {
      // 代表这个页面需要授权
      authorization: true,
    },
  },
  {
    // 编辑页
    path: "/edit-profile",
    component: () => import("@/views/EditProfile"),
    meta: {
      // 代表这个页面需要授权
      authorization: true,
    },
  },
  {
    // 我的关注页
    path: "/follow",
    component: () => import("@/views/Follow"),
    meta: {
      // 代表这个页面需要授权
      authorization: true,
    },
  },
  {
    // 我的跟帖页
    path: "/comment",
    component: () => import("@/views/Comment"),
    meta: {
      // 代表这个页面需要授权
      authorization: true,
    },
  },
  {
    // 我的收藏页
    path: "/star",
    component: () => import("@/views/Star"),
    meta: {
      // 代表这个页面需要授权
      authorization: true,
    },
  },
  {
    // 栏目管理
    path: "/category",
    component: () => import("@/views/Category"),
  },
  {
    // 搜索页
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    // 文章详情页
    path: "/post/:id",
    component: () => import("@/views/Post"),
  },
  {
    // 视频文章详情页
    path: "/video/:id",
    component: () => import("@/views/Video"),
  },
  {
    // 文章的跟帖列表页面
    path: "/post-comment/:id",
    component: () => import("@/views/PostComment"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
