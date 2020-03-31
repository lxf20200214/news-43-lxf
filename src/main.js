import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入vant ui组件库
import Vant from "vant";
// 导入axios
import axios from "axios";

// 绑定到原型,加上之后,以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// 给axios添加基准路径,添加完了之后请求的url就会拼接这个地址
axios.defaults.baseURL = "http://localhost:3000";

// 注册vant插件(vue.use都是用来注册插件)
Vue.use(Vant);

Vue.config.productionTip = false;

// 添加路由的守卫
// to:代表你即将要访问的页面
// from:代表你即将要离开的页面
// next：必须要调用，next就类似于你node.js的中间件,调用才会加载后面的内容
router.beforeEach((to, form, next) => {
  // 判断是否去的是个人中心页
  // console.log(to);
  // 需要验证的页面
  if (to.meta.authorization) {
    // 判断是否是在登录状态,是否有token
    // 如果本地的数据是空会返回null，null是没有token属性，会导致js报错
    // 所以可以加个判断，如果本地的数据空的，等于空的对象
    const userJson = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 有token就可以正常访问
    if (userJson.token) {
      next();
    } else {
      // 跳转到登录页,next这个函数可以传递路径,并且会跳转该路径
      next("/login");
    }
  } else {
    // 非个人中心
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
