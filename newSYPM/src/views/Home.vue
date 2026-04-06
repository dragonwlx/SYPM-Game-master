<template>
  <div class="home">
    <Navbar />
    <div class="background-container">
      <div class="bg-section" style="position: relative">
        <!-- <img src="../assets/img/homepage/bg1.png" alt="Background 1"> -->
        
        <el-carousel class="carousel" height="auto">
          <el-carousel-item style="height: auto; position: relative;">
            <img
              src="../assets/img/lunbo/01.jpg"
              alt="Background 1"
              style="width: 100%; height: auto"
            />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 24px; font-weight: bold;">
              <div class="title" style="font-size: 32px;">北京·天坛祈年殿</div>
              <span class="sub-title" style="font-size: 10px;">蓝瓦金顶的圆形大殿，是古代帝王祭天祈福的庄严圣地</span>
            </div>
          </el-carousel-item>
          <el-carousel-item style="height: auto">
            <img
              src="../assets/img/lunbo/02.jpg"
              alt="Background 1"
              style="width: 100%; height: auto"
            />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 24px; font-weight: bold;">
              <div class="title" style="font-size: 32px;">福建·客家土楼</div>
              <span class="sub-title" style="font-size: 10px;">圆形聚居建筑，内部生活气息浓郁，兼具防御与节日氛围</span>
            </div>
          </el-carousel-item>
          <el-carousel-item style="height: auto">
            <img
              src="../assets/img/lunbo/03.jpg"
              alt="Background 1"
              style="width: 100%; height: auto"
            />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 24px; font-weight: bold;">
              <div class="title" style="font-size: 32px;">北京·颐和园</div>
              <span class="sub-title" style="font-size: 10px;">夕阳为佛香阁披上温暖光辉，更显辉煌</span>
            </div>
          </el-carousel-item>
          
          <el-carousel-item style="height: auto">
            <img
              src="../assets/img/lunbo/04.jpg"
              alt="Background 1"
              style="width: 100%; height: auto"
            />
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 24px; font-weight: bold;">
              <div class="title" style="font-size: 32px;">江南·马头墙</div>
              <span class="sub-title" style="font-size: 10px;">错落的白墙与黛瓦，构成一幅融入山水的水墨画卷</span>
            </div>
          </el-carousel-item>
          
        </el-carousel>
        <p
          style="
            font-family: var(--font-family-primary);
            position: absolute;
            bottom: 10px;
            right: 20px;
            color: #ffffff;
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            z-index: 1000;
          "
        >
          雕梁画栋非一日之功，精工细作显匠心本色
        </p>
      </div>
      <div class="bg-section">
        <img src="../assets/img/homepage/bg2.png" alt="Background 2" />
        <Intro />
        <History />
        <Works />
        <WenChuang />
        <!-- <section id="protect" class="protect-section">
          <div class="protect-title">
            <img src="../../public/assets/img/homepage/protect-title.png" alt="古建保护背景" class="protect-title-bg">
            <span class="protect-title-text">古建保护</span>
          </div>
          <p class="protect-intro">
            中国传统古建筑的保护工作是指针对历史建筑的维护、修复与合理利用的系统性活动，这些工作在近现代逐渐形成科学化、规范化的体系，并在国家政策支持与社会力量参与下不断推进。<br/>
            如今，古建筑保护已成为文化遗产保护的重要组成部分，得到了全社会的高度重视与积极践行。
          </p>
          <div class="protect-grid">
            <div class="protect-row">
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../../public/assets/img/homepage/protect1.png" alt="理念与原则" class="protect-image">
                  <div class="protect-image-overlay">理念与原则</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  ·尊重历史、保留原真性<br/>
                  根据《中国文物保护法》等法规文件，我国古建筑遵循“<font color="red">不改变文物原状</font>”的原则。<br/>
                  ·原真性，即最大限度保留古建筑的原有形制、结构、材料和工艺；<br/>
                  ·整体性，不仅要保护建筑本身，还要保护其周边环境和文化氛围；<br/>
                  ·预防为主，通过日常保养和定期维护，将隐患消灭在萌芽状态；<br/>
                  ·最小干预，在修复过程中减少对建筑本体的干预，确保古建筑在修缮后能够长期稳定。
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../../public/assets/img/homepage/protect2.png" alt="方法与技术" class="protect-image">
                  <div class="protect-image-overlay">方法与技术</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  ·<font color="red">科学保护&有效修复</font><br/>
                  ·优先采用传统工艺和材料，保留古建筑的历史风貌和文化内涵。例如，木结构的榫卯工艺、砖石结构的剔补技术等传统技艺;<br/>
                  ·利用现代科技手段为保护工作提供支持。例如，采用三维测绘、激光扫描等技术进行古建筑的前期诊断，为修复方案提供精准数据；<br/>
                  ·注重其消防安全和结构安全。例如，通过改造消防设施、设置避雷装置等方式，降低古建筑面临的风险。
                </div>
              </div>
            </div>
            <div class="protect-row">
              <div class="protect-item">
                <div class="protect-text">
                  古代各王朝制定的建筑制度做法、工料定额一类的建筑法规，如《考工记》《营造法式》《园冶》等，以及近现代的许多著名匠师，为古建保护作出巨大贡献。<br/>
                  ·林徽因与梁思成是中国古建筑保护的先驱。通过对数百座古建筑进行调查、测绘和研究，发现了佛光寺东大殿等重要建筑，形成了“<font color="red">保存现状，恢复原状</font>”的保护思想。<br/>
                  ·王时伟先生在故宫博物院主持了倦勤斋保护工程、乾隆花园修缮等重要项目。他在实践中引入数字化技术，推动了古建筑保护的现代化。<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;......
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../../public/assets/img/homepage/protect3.png" alt="人物与研究" class="protect-image">
                  <div class="protect-image-overlay">人物与研究</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  古建筑保护需要<font color="red">全社会的广泛参与和有效的传承机制</font>，以实现文化遗产的可持续发展。<br/>
                  ·故宫博物院通过举办各类展览和文化活动，提升了公众对古建筑保护的意识。<br/>
                  ·杜仙洲先生通过编写《中国古建筑修缮技术》等教材和培养专业人才，为中国古建筑保护事业奠定了坚实的人才基础。<br/>
                  ·林徽因曾对中国历代装饰图案进行了研究，这些工作不仅保护了传统工艺，还推动了传统文化的创新发展。<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;......
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../../public/assets/img/homepage/protect4.png" alt="参与与传承" class="protect-image">
                  <div class="protect-image-overlay">参与与传承</div>
                </div>
              </div>
            </div>
          </div>
        </section> -->
        <section id="game" class="game-section">
          <h2 id="Game" class="game-title">游戏区</h2>
          <img
            src="../assets/img/homepage/game-line.png"
            alt="Decorative Line"
            class="game-line"
          />
          <div class="game-content">
            <div class="game-cards">
              <div class="game-card">
                <a href="#" @click.prevent="showGame('game-youzuo')">
                  <img src="../assets/img/homepage/game1.png" alt="漆彩匠心" />
                </a>
                <div class="game-card-desc">漆彩匠心</div>
              </div>
              <div class="game-card">
                <a href="#" @click.prevent="showGame('game-muzuo')">
                  <img src="../assets/img/homepage/game2.png" alt="榫卯大师" />
                </a>
                <div class="game-card-desc">榫卯大师</div>
              </div>
            </div>
            <p class="game-more">更多八大作小游戏，敬请期待……</p>
          </div>
        </section>
        <Footer></Footer>
      </div>

      <div class="bg-section">
        <img src="../assets/img/homepage/bg3.png" alt="Background 3" />
      </div>
    </div>

    <!-- 游戏容器 -->
    <div v-if="isGameOpen" class="game-container">
      <div class="game-close-btn" @click="closeGame"></div>
      <iframe 
        :src="gameUrl" 
        class="game-iframe"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Intro from "../components/Intro.vue";
import Footer from "../components/Footer.vue";
import History from "../components/History.vue";
import Navbar from "../components/Navbar.vue";
import Works from "../components/Works.vue";
import WenChuang from "../components/WenChuang.vue";

const store = useStore();

// 计算属性
const isGameOpen = computed(() => store.getters.isGameOpen);
const currentGame = computed(() => store.getters.currentGame);
const gameUrl = computed(() => {
  if (currentGame.value) {
    return `http://localhost:3000/?game=${currentGame.value}`;
  }
  return 'http://localhost:3000/';
});

// 方法
const showGame = (name) => {
  store.dispatch('openGame', name);
};

const closeGame = () => {
  store.dispatch('closeGame');
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  font-family: "LXGW WenKai TC", sans-serif;
  color: #363030;
  scroll-behavior: smooth;
}

.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

/* 游戏容器样式 */
.game-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

/* 游戏iframe样式 */
.game-iframe {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
}

.background-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.bg-section {
  width: 100%;
  height: auto;
  display: block;
}

.bg-section img,.carousel {
  width: 100%;
  height: 100%;
  display: block;
  vertical-align: bottom;
}

.bg-section:last-child {
  margin-top: -22.5%;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5vw;
  background-color: rgba(0, 0, 0, 0.42);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  z-index: 1000;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: "Ma Shan Zheng", sans-serif;
}

/* .navbar-logo {
    height: 3vw;
    width: auto;
}

.navbar-title {
    display: flex;
    flex-direction: column;
    color: white;
}

.navbar-title-main {
    font-size: 20px;
}

.navbar-title-sub {
    font-size: 16px;
    opacity: 0.8;
} */

.navbar-right {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: opacity 0.3s;
}

.nav-item:hover {
  opacity: 0.8;
}

.search-icon {
  height: 24px;
  width: auto;
  cursor: pointer;
}

.music-icon {
  height: 24px;
  width: 24px;
  cursor: pointer;
}

.music-icon-svg {
  width: 100%;
  height: 100%;
  filter: brightness(0) invert(1);
}

/* 汉堡菜单样式 */
.hamburger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
  z-index: 1001;
}

.hamburger-menu span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

/* 响应式样式 */
@media screen and (max-width: 956px) {
  .navbar {
    height: 60px;
    padding: 0 20px;
  }

  .navbar-logo {
    height: 40px;
  }

  .navbar-title-main {
    font-size: 16px;
  }

  .navbar-title-sub {
    font-size: 12px;
  }

  .hamburger-menu {
    display: flex;
  }

  .navbar-right {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 60px;
    transition: right 0.3s ease;
  }

  .navbar-right.active {
    right: 0;
  }

  .nav-item {
    padding: 15px 20px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
  }

  .search-icon {
    margin: 15px auto;
  }
}

/* 汉堡菜单激活状态 */
.hamburger-menu.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-menu.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-menu.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* 介绍部分样式 */
.intro-section {
  position: absolute;
  top: 16%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  display: flex;
  gap: 4vw;
  color: white;
}

.intro-left {
  flex: 6;
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

.intro-line {
  max-width: 40%;
}

.intro-title {
  margin: -2% 0 -4% -1%;
  font-size: 2.5vw;
  font-family: "Ma Shan Zheng", sans-serif;
}

.intro-text {
  margin-left: 0.5%;
  font-size: 1vw;
  line-height: 1.5;
  text-align: justify;
  height: 20vw;
  overflow-y: auto;
  font-size: 0.83vw;
}

/* 自定义滚动条样式 */
.intro-text::-webkit-scrollbar {
  width: 6px;
}

.intro-text::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.intro-text::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.intro-text::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.intro-right {
  flex: 3.2;
  margin-top: 12%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 0.35fr);
  column-gap: 0.8vw;
}

.intro-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5vw;
  transition: transform 0.3s;
  cursor: pointer;
}

.intro-image:hover {
  transform: scale(1.05);
}

/* 古建保护部分样式 */
.protect-section {
  position: absolute;
  top: 67.2%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 3vw;
}

.protect-title {
  position: relative;
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.protect-title-bg {
  width: 20vw;
  height: auto;
}

.protect-title-text {
  position: absolute;
  margin: -2.4% auto auto -2.8%;
  font-size: 2.5vw;
  font-family: "Ma Shan Zheng", sans-serif;
}

.protect-intro {
  width: 70%;
  margin: -3% auto;
  font-size: 1vw;
  line-height: 1.8;
  text-align: center;
  max-width: 42%;
}

.protect-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

.protect-row {
  display: flex;
  width: 100%;
  gap: 0;
}

.protect-item {
  flex: 1;
  position: relative;
  aspect-ratio: 1/1.04;
}

/* 第一行的文字部分（偶数项） */
.protect-row:first-child .protect-item:nth-child(even) {
  flex: 0.75;
}

/* 第二行的文字部分（奇数项） */
.protect-row:last-child .protect-item:nth-child(odd) {
  flex: 0.75;
}

.protect-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1.04;
}

.protect-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.protect-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 3vw;
  font-family: "Ma Shan Zheng", sans-serif;
  letter-spacing: 0.5vw;
}

.protect-text {
  background-color: rgba(255, 255, 255, 0.42);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 1.4vw;
  box-sizing: border-box;
  display: block;
  text-align: justify;
  font-size: 1vw;
  line-height: 1.32;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.protect-text::-webkit-scrollbar {
  width: 6px;
}

.protect-text::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.protect-text::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.protect-text::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* 游戏区样式 */
.game-section {
  position: absolute;
  top: 84%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
}

.game-title {
  font-size: 2.5vw;
  font-family: "Ma Shan Zheng", sans-serif;
}

.game-line {
  max-width: 12%;
  margin: -4% 0 1% 0.4%;
}

.game-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
}

.game-cards {
  display: flex;
  gap: 2vw;
  align-items: flex-start;
}

.game-card {
  position: relative;
  width: 20vw;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  cursor: pointer;
}

.game-card:hover img {
  transform: scale(1.05);
}

.game-card img {
  width: 100%;
  /* border-radius: 0.5vw; */
  object-fit: cover;
  transition: transform 0.3s;
}

.game-card-desc {
  width: 100%;
  padding: 0.5vw;
  font-size: 1.6vw;
  text-align: center;
  box-sizing: border-box;
}

.game-more {
  margin-top: -2%;
  width: 100%;
  text-align: right;
  font-family: "Ma Shan Zheng", sans-serif;
  font-size: 1.6vw;
  color: white;
  opacity: 0.8;
}

/* 游戏容器样式 */
#game-youzuo,
#game-muzuo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: none;
}

.game-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.game-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.game-close-btn::before,
.game-close-btn::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 2px;
  background: white;
}

.game-close-btn::before {
  transform: rotate(45deg);
}

.game-close-btn::after {
  transform: rotate(-45deg);
}

/* 当游戏div打开时禁用整个body的滚动 */
.body-no-scroll {
  overflow: hidden;
  height: 100vh;
  width: 100%;
}

/* 页脚样式 */
.footer {
  position: absolute;
  top: 97.4%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  padding: 2vw 0;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.footer-logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* .footer-logo {
    max-height: 3vw;
    max-width: 3vw;
}

.footer-title {
    display: flex;
    flex-direction: column;
    font-family: 'Ma Shan Zheng', sans-serif;
}

.footer-title-main {
    font-size: 1.6vw;
}

.footer-title-sub {
    font-size: 1.4vw;
} */

.footer-links {
  display: flex;
  margin: 3% auto 0 0;
  gap: 1vw;
  font-size: 1vw;
}

.footer-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-link:hover {
  opacity: 0.8;
}

.footer-divider {
  width: 120%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0.5vw 0;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  font-size: 0.9vw;
  opacity: 0.8;
}

.footer-right {
  display: flex;
  align-items: flex-end;
  gap: 1vw;
  margin: auto 0 0 0;
}

.footer-qrcode-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 1vw;
  line-height: 1.5;
  text-align: right;
  margin-bottom: -0.2vw;
}

.footer-qrcode {
  max-width: 6vw;
  max-height: 6vw;
  object-fit: contain;
}

/* 团队弹窗样式 */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 4% 12% 4% 4%;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  max-width: 90%;
  max-height: 90vh;
  position: relative;
}

.team-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>
