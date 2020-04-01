<template>
  <div>
    <div class="video">
      <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
      <div class="cover">
        <!-- 封面图片 -->
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
        />
        <!-- 图片上的按钮 -->
        <div class="cover-layer">
          <span class="iconfont iconshipin"></span>
        </div>123
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
.video {
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
  .cover {
    width: 100%;
    height: 170/360 * 100vw;
    position: relative;
    margin: 20/360 * 100vw 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cover-layer {
      width: 55/360 * 100vw;
      height: 55/360 * 100vw;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-27/360 * 100vw) translateY(-27/360 * 100vw);
      display: flex;
      align-items: center;
      justify-content: center;
      .iconshipin {
        color: #fff;
        font-size: 32px;
      }
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