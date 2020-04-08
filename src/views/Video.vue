<template>
  <div>
    <video
      :poster="$axios.defaults.baseURL + post.cover[0].url"
      :src="$axios.defaults.baseURL+post.content"
      controls
      class="video"
    ></video>
    <div class="main">
      <div class="author">
        <div class="userinfo">
          <img
            src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1912218184,116310869&fm=26&gp=0.jpg"
          />
          <span>火星网友</span>
        </div>
        <!-- 如果关注是false,就加上active这个class,显示一个红色按钮 -->
        <span
          class="follow"
          :class="post.has_follow?'':'active'"
          @click="handleFollow"
        >{{post.has_follow?"已关注":'关注'}}</span>
      </div>
      <!-- 文章标题 -->
      <h2 class="title">{{post.title}}</h2>
      <!-- 按钮列表 -->
      <div class="actions">
        <div class="actions-item" :class="post.has_like?'':'active'">
          <span class="iconfont icondianzan" @click="handleLike"></span>
          <!-- 点赞 -->
          <i>{{post.like_length}}</i>
        </div>
        <div class="actions-item">
          <span class="iconfont iconweixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>
    <!-- 底部栏组件 -->
    <PostFooter :post="post" />
  </div>
</template>

<script>
// 导入底部栏组件
import PostFooter from "@/components/PostFooter";
export default {
  data() {
    return {
      // 文章详情
      post: {
        user: {},
        cover: [{}]
      },
      token: ""
    };
  },
  //   注册组件
  components: {
    PostFooter
  },
  mounted() {
    //   获取文章的id
    const { id } = this.$route.params;
    // 获取本地的token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
    // 保存一份到data
    this.token = token;
    const config = {
      url: "/post/" + id
    };
    // 如果token有值就给头信息加上token
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    // 请求文章的详情
    this.$axios(config).then(res => {
      // data是文章的详情
      const { data } = res.data;
      this.post = data;
    });
  },
  methods: {
    // 关注和取消关注
    handleFollow() {
      let url = "";
      // 先判断当前的状态,如果是关注,就取消关注
      if (this.post.has_follow) {
        // 取消关注
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        url = "/user_follows/" + this.post.user.id;
      }
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        //   修改成功之后修改关注状态
        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(this.post.has_follow ? "关注成功" : "取消关注成功");
      });
    },
    // 文章点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 修改点赞的状态
        this.post.has_like = !this.post.has_like;
        // 判断当前是否点赞
        if (this.post.has_like) {
          // 如果是点赞就加1
          this.post.like_length += 1;
        } else {
          // 取消点赞就减1
          this.post.like_length -= 1;
        }
        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style scoped lang="less">
.video {
  width: 100%;
  display: block;
  object-fit: fill;
}
.main {
  padding: 10/360 * 100vw 20/360 * 100vw;
  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userinfo {
      display: flex;
      align-items: center;
      img {
        width: 25/360 * 100vw;
        height: 25/360 * 100vw;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 5px;
      }
    }
    .follow {
      padding: 3px 10px;
      border: 1px #999 solid;
      border-radius: 50px;
      font-size: 12px;
    }
    .active {
      background: red;
      border-color: red;
      color: #fff;
    }
  }
  .title {
    font-weight: normal;
    font-size: 16px;
    margin: 10/360 * 100vw 0;
  }
  .actions {
    display: flex;
    justify-content: space-around;
    margin-top: 30/360 * 100vw;
    padding: 0 30/360 * 100vw;
  }
  .actions-item {
    display: flex;
    align-items: center;
    border: 1px #999 solid;
    padding: 3px 10px;
    border-radius: 50px;
    font-size: 12px;
    span {
      margin-right: 5px;
    }
    .iconweixin {
      color: #00c800;
    }
  }
}
</style>