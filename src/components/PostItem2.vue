<template>
  <router-link :to="`/post/${data.id}`">
    <!-- 循环的结构,大于3张图的布局 -->
    <div class="imgList">
      <h4>{{data.title}}</h4>
      <div class="images">
        <img
          v-for="(item,index) in data.cover"
          :key="index"
          :src="$axios.defaults.baseURL+item.url"
        />
      </div>
      <p>
        {{data.user.nickname}}
        <span>{{data.comment_length}}跟帖</span>
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  // 传入的文章数据
  props: ["data"]
};
</script>

<style scoped lang="less">
.imgList {
  padding: 20/360 * 100vw;
  border-bottom: 1px #eee solid;
  h4 {
    // 文字超出两行出现省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .images {
    margin: 10/360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }

  p {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
    span {
      margin-left: 15px;
    }
  }
}
</style>