<template>
  <div>
    <!-- 红色的头部 -->
    <div class="header">
      <span class="iconfont iconnew"></span>
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <!-- tab栏切换 -->
    <!-- v-model:绑定当前选中标签的标识符,就是当前的索引值,是唯一的,比较类似于for循环的可以 -->
    <!-- sticky:是否使用粘性定位布局 -->
    <!-- swipeable:是否开启手势互动切换 -->
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in categories" :title="item" :key="index">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load滚动到底部时候触发的函数 -->
          <van-list v-model="loading" :finished="finished" finished-text="我也是有底线的" @load="onLoad">
            <!-- 假设list是后台返回的数组,里面有10个元素 -->
            <div v-for="(item,index) in list" :key="index">
              <!-- 文章列表的组件 -->
              <!-- 只有单张图片的 -->
              <PostItem1 />
              <!-- 大于等于3张图片的组件 -->
              <!-- <PostItem2 /> -->
              <!-- <PostItem3 /> -->
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostItem1 from "@/components/PostItem1";
import PostItem2 from "@/components/PostItem2";
import PostItem3 from "@/components/PostItem3";
export default {
  data() {
    return {
      // 菜单的数据
      categories: [
        "关注",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "关注",
        "关注",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "关注",
        "∨"
      ],
      // 记录当前tab的切换索引,
      active: 0,
      // 假设这个数组是后台返回的数据
      list: [1, 1, 1, 1, 1, 1], //10个1
      loading: false, //是否正在加载
      finished: false, //是否已经加载完毕
      refreshing: false //是否正在下拉加载
    };
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 5000);
    },
    // 只是个空壳,只有表面
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      // 判断如果点击的是最后一个图标,跳转到栏目管理页
      if (this.active === this.categories.length - 1) {
        this.$router.push("/栏目管理");
      }
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  .iconnew {
    font-size: 20px;
    transform: scale(3);
    position: relative;
    left: 20/360 * 100vw;
    margin-right: 20px;
  }
  .search {
    flex: 1;
    height: 32/360 * 100vw;
    margin: 0 40/360 * 100vw;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 14px;
    line-height: 1;
    vertical-align: middle;
    span {
      margin-right: 5px;
    }
  }
  .iconwode {
    font-size: 20px;
  }
}
//   重置vant组件的样式
//    如果在scoped声明中去修改第三方库的class样式,必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background: #eee;
}
/deep/ .van-tab {
  flex-basis: 15% !important;
}
/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  //   font-size: 30px;
  width: 20px;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}
/deep/ .van-tabs__wrap {
  padding-right: 20px;
}
/deep/ .van-tabs__nav {
  position: static;
}
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  border-bottom: 2px #ee0a24 solid;
}
</style>