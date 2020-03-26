import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// 引入vant ui组件库
import Vant from "vant";
// 导入axios
import axios from "axios";

// 绑定到原型,加上之后,以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// 注册vant插件(vue.use都是用来注册插件)
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
