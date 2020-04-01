<template>
  <div>
    <!-- 循环的结构,少于3张图片的布局 -->
    <div class="imgText">
      <div class="imgText-left">
        <h4>
          林志玲穿透视黑纱裙米兰看秀
          腹部微隆显孕味
        </h4>
        <p>
          火星时报
          <span>52跟帖</span>
        </p>
      </div>
      <img src="http://img0.imgtn.bdimg.com/it/u=3526072524,431286876&fm=26&gp=0.jpg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.imgText {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #eee solid;
  .imgText-left {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;

    h4 {
      //   文字超出两行出现省略号
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
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
  img {
    width: 110/360 * 100vw;
    height: 75/360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    flex-shrink: 0;
  }
}
</style>