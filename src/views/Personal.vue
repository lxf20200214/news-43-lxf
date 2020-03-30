<template>
  <div class="container">
    <!-- 导航栏 -->
    <NavigateBar title="个人中心" showHome="ture" />
    <!-- 头部 -->
    <router-link to="/edit-profile">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <img
            :src="
            userInfo.head_img
              ? $axios.defaults.baseURL + userInfo.head_img
              : 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1260305692,2555177882&fm=26&gp=0.jpg'
          "
            alt="头像"
          />
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <span class="iconfont iconxingbienan" v-if="userInfo.gender === 1"></span>
            <span class="iconfont iconxingbienv" v-if="userInfo.gender === 0"></span>
            {{ userInfo.nickname }}
          </div>
          <p>{{ moment(userInfo.create_date).format("YYYY-MM-DD") }}</p>
        </div>
        <!-- 右侧的箭头图标 -->
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <!-- 组件的调用,单双标签都可以 -->

    <Listbar
      v-for="(item, index) in rows"
      :key="index"
      :label="item.label"
      :tips="item.tips"
      :path="item.path"
    />

    <!-- handleClick点击退出按钮时候触发 -->
    <!-- click.native这个事件类型,会给Listbar这个组件最外部的div强制绑定点击事件,不要去跟事件传递作比较 -->
    <Listbar @click.native="handleClick" label="退出" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件,import后面接上的组件变量名(变量就意味着可以随便改名字)
// @代表src目录
import Listbar from "@/components/Listbar";
// 导入头部导航栏
import NavigateBar from "@/components/NavigateBar";
// 引入第三方的日期格式处理的工具库
import moment from "moment";

export default {
  data() {
    return {
      // 组织一个列表按钮栏的数据
      rows: [
        { label: "我的关注", tips: "关注的用户", path: "/follow" },
        { label: "我的跟帖", tips: "跟帖回复", path: "/comments" },
        { label: "我的收藏", tips: "文章视频", path: "/star" }
      ],
      userInfo: {},
      moment
    };
  },
  // 注册组件,导入的子组件都必须注册才可以在模板渲染
  components: {
    Listbar,
    // 注册头部导航组件
    NavigateBar
  },
  mounted() {
    //   从本地获取token和id
    const jsonStr = localStorage.getItem("userInfo");
    // 把字符串转换成对象,userJson就是用户的信息对象
    // userJson.token和userJson.user.id这两个值是接口需要的
    const userJson = JSON.parse(jsonStr);
    // 发起异步的请求
    this.$axios({
      url: "/user/" + userJson.user.id,
      //   添加头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      //   console.log(res);

      //   解构出用户的数据
      const { data } = res.data;
      //   赋值给data的userInfo
      this.userInfo = data;
    });
  },
  methods: {
    //   退出事件
    handleClick() {
      // 询问用户是否确定退出
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗?"
        })
        .then(() => {
          //   点击确定时候触发的函数
          // 清除本地的存储的用户数据
          localStorage.removeItem("userInfo");
          //   跳转到登录页,必须要使用replace,因为退出不可能在返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // 点击取消按钮触发的函数
        });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;
  .avatar {
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .profile {
    flex: 1;
    padding-left: 20/360 * 100vw;
    line-height: 1.5;
    .iconxingbienan {
      color: rgb(63, 180, 226);
    }
    .iconxingbienv {
      color: palevioletred;
    }
    p {
      color: #999;
    }
  }
}
</style>
