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
    <van-tabs v-model="active" swipeable sticky @scroll="handeleScroll">
      <van-tab
        v-for="(item,index) in categories"
        :title="item.name"
        :key="index"
        v-if="item.is_top===1 || item.name==='∨'"
      >
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load滚动到底部时候触发的函数 -->
          <!-- immediate-check这个属性可以阻止list组件默认就加载一次 -->
          <van-list
            v-model="categories[active].loading"
            :finished="categories[active].finished"
            finished-text="我也是有底线的"
            @load="onLoad"
            :immediate-check="false"
          >
            <!-- 假设list是后台返回的数组,里面有10个元素 -->
            <div v-for="(item,index) in categories[active].posts" :key="index">
              <!-- 文章列表的组件 -->
              <!-- 只有单张图片的 -->
              <PostItem1
                v-if="item.type===1 &&item.cover.length>0 && item.cover.length<3"
                :data="item"
              />

              <!-- 大于等于3张图片的组件 -->
              <PostItem2 v-if="item.type===1 &&item.cover.length>=3" :data="item" />

              <!-- 视频 -->
              <PostItem3 v-if="item.type===2" :data="item" />
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

      categories: [],
      // 记录当前tab的切换索引,
      active: 0,
      token: "",
      refreshing: false //是否正在下拉加载
    };
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  mounted() {
    // 在请求之前,应该先判断本地有没有栏目数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    // 本地的token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 把token保存到data
    this.token = token;
    // 如果本地有数据,获取本地的数据来渲染
    if (categories) {
      if (categories[0].name !== "关注" && token) {
        // 获取栏目数据
        this.getCategories();
        return;
      } else if (categories[0].name === "关注" && !token) {
        // 获取栏目数据
        this.getCategories();
        return;
      } else {
        this.categories = categories;
        // 给每个栏目都加上pageIndex = 1
        this.handleCategories();
      }
    } else {
      // 获取栏目数据

      this.getCategories();
    }
  },
  methods: {
    // 当栏目数据加载完成后
    // 循环给栏目加上pageIndex,每个栏目都有自己的pageIndex
    handleCategories() {
      this.categories = this.categories.map(v => {
        v.pageIndex = 1;
        // 每个栏目都有自己的我文章列表
        v.posts = [];
        v.loading = false;
        v.finished = false;
        v.scrollY = 0; //给每个栏目添加一个滚动条高度
        v.isload = false; //当前栏目是否正在请求,跟上面的loading不一样,loading是组件控制,isload我们要自己控制
        return v;
      });
      // 请求文章列表,页面一开始都是请求头条栏目下的文章
      this.getList();
    },

    // 获取栏目数据,如果有token就加到头信息,没有就不加
    getCategories() {
      // 请求的配置
      const config = {
        url: "/category"
      };
      // 如果有token, 把token添加到头信息中;
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }

      // 没有本地的数据才去请求栏目接口
      this.$axios(config).then(res => {
        console.log(res);
        // 菜单的数据
        const { data } = res.data;
        // 给data添加一个点击跳转到栏目管理的图标
        data.push({
          name: "∨"
        });
        this.categories = data;
        // 把菜单的数据保存到本地
        localStorage.setItem("categories", JSON.stringify(data));
        // 给每个栏目都加上pageIndex=1
        this.handleCategories();
      });
    },

    onLoad() {
      // 请求文章列表
      this.getList();
    },

    // 封装一个请求文章列表的方法
    getList() {
      const { pageIndex, id, name, isload } = this.categories[this.active];
      // 如果当前正在加载,直接返回
      if (isload) return;
      // 表示开始加载
      this.categories[this.active].isload = true;
      // 当前栏目下pageIndex加1
      this.categories[this.active].pageIndex += 1;
      // 如果当前的栏目的数据已经加载完毕了,直接return;

      if (this.categories[this.active].finished) {
        return;
      }

      //请求文章的配置
      const config = {
        url: "/post",
        params: {
          pageIndex: pageIndex,
          pageSize: 5,
          category: id
        }
      };
      // 判断当前栏目是否是关注栏目
      if (name === "关注") {
        // 如果是的话就需要加上token
        config.headers = {
          Authorization: this.token
        };
      }
      // 请求文章列表
      this.$axios(config).then(res => {
        const { data, total } = res.data;

        // 把新的文章数据合并到原来的文章列表中
        // 这里因为active也会导致的刷新

        this.categories[this.active].posts = [
          ...this.categories[this.active].posts,
          ...data
        ];

        // 赋值的方式页面才会更新
        this.categories = [...this.categories];
        // 加载状态结束

        this.categories[this.active].loading = false;

        // 根据总数据的条数,判断是否是最后一页

        if (this.categories[this.active].posts.length === total) {
          this.categories[this.active].finished = true;
        }
        // 加载完毕之后吧isload的状态设置为false
        this.categories[this.active].isload = false;
      });
    },
    // 监听tab滚动的事件
    handeleScroll(data) {
      // 因为栏目不管是从本地获取或者请求接口也好,都是需要时间的
      // 所以需要等this.categories有值才设置滚动条的高度
      if (this.categories.length === 0) return;
      // scrollTop是滚动条的距离
      const { scrollTop } = data;

      //把滚动条的高度赋值给当前栏目下的scrollY
      this.categories[this.active].scrollY = scrollTop;
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
      // 先过滤出is_top等于1的或者是v图标的栏目
      const arr = this.categories.filter(v => {
        return v.is_top || v.name === "∨";
      });

      //
      // 判断如果点击的是最后一个图标,跳转到栏目管理页
      if (this.active === arr.length - 1) {
        this.$router.push("/category");
        // 退出函数,不执行下一步
        return;
      }
      // 请求不同的栏目的数据
      this.getList();
      // 页面滚动到当前栏目下的scrollY值
      // 我们需要等待文章数据的渲染,渲染完成了之后才进行滚动
      // 时间可以随便写

      setTimeout(() => {
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 0);
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