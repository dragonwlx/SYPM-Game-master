<template>
  <section @click="router.push('/wencuang')" id="wenchuang" class="wenchuang-section">
    <div id="WenChuang" class="wenchuang-title">
      <img
        src="../assets/img/homepage/works-title.png"
        alt="八大作背景"
        class="wenchuang-title-bg"
      />
      <span class="wenchuang-title-text">文创</span>
    </div>
    <div class="show-img"></div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

</script>

<style scoped>
/* 八大作部分样式 */
.wenchuang-section {
  position: absolute;
  top: 63.5%;
  left: 22.5%;
  /* transform: translate(-50%, -50%); */
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 3vw;
  min-height: 400px;
}

.wenchuang-title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wenchuang-title-bg {
  height: auto;
}

.wenchuang-title-text {
  position: absolute;
  margin: -2.4% auto auto -0.8%;
  font-size: 2.5vw;
  font-family: 'MyCustomFont';
}
.show-img {
  width: 100%;
  height: 200px;
  background-color: aqua;
}
</style>
