<template>
  <div>
    <!-- 循环的结构,大于3张图的布局 -->
    <div class="imgList">
      <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
      <div class="images">
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
        />
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
        />
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
        />
      </div>
      <p>
        火星时报
        <span>52跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
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