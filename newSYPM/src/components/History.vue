<template>
  <section class="history-section">
    <!-- 历史标题区域 -->
    <div id="History" class="history-title">
      <img src="../assets/img/homepage/historyCut.png" alt="发展历程" />
    </div>
    <div class="parts" :style="hoverPart!==null?'':''" style="display: flex; position: relative; height: 250px; width: 1263px; transition: background-color 0.3s ease;">
      <div
        v-for="(part, index) in historyParts"
        :key="index"
        class="part-wrapper"
        :style="{
          left: part.left,
          top: +(part.top.split('px')[0])+50+'px',
          zIndex: part.zIndex,
          height: part.height
        }"
        @mouseenter="hoverPart = index"
        @mouseleave="hoverPart = null"
        @click="router.push({name:'ShowSomeArchitecture',params:{id:index}})"
      >
        <img
          class="part"
          :src="part.originalSrc"
          :alt="part.title"
          :style="{
            height: part.height,
            zIndex: part.zIndex,
            display: hoverPart === null ? 'block' : (hoverPart === index ? 'block' : 'none')
          }"
        />
        <img
          class="part"
          :src="part.blackWhiteSrc"
          :alt="part.title"
          :style="{
            height: part.height,
            zIndex: part.zIndex,
            display: hoverPart === null ? 'none' : (hoverPart === index ? 'none' : 'block') 
          }"
        />
        <div v-if="hoverPart === index" class="tooltip">
          <div class="tooltip-title">{{ part.title }}</div>
          <div class="tooltip-content">{{ part.content }}</div>
        </div>
      </div>
    </div>
    <div id="Info" style="display: flex; width: 100%; gap: 20px; margin-bottom: 70px;">
      <div class="history-content">
        <!-- 左侧：新闻/公告列表区域 -->
        <div class="list-container">
          <!-- 标题栏 -->
          <div class="list-header">
            <div class="header-title">最新动态</div>
            <div class="more-button" @click="showMoreNews">更多</div>
          </div>

          <!-- 新闻/公告列表 -->
          <div class="news-list">
            <div v-for="item in newsList" :key="item.id" class="news-item">
              <!-- 小房子图标 -->
              <div class="icon-wrapper">
                <svg
                  class="house-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <!-- 新闻标题和时间 -->
              <div class="news-content" >
                <div class="news-title" style="font-family: 'Microsoft YaHei';">{{ item.title }}</div>
                <div class="news-time">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：功能按钮区域 -->
        <div class="buttons-container" @click="router.push('/info/news')">
          <div class="function-button"  @click="showAnnouncements">资讯</div>
          <div class="function-button"  @click="showPapers">学术</div>
        </div>
      </div>
      <div class="show" style="width: 50%; display: flex; margin-top: 20px ;position: relative;">
        <img
          src="../assets/img/common/todayArchi.jpg"
          alt="今日荐筑"
          style="width: 80%; border-radius: 8px 0 0 8px;"
          @click="router.push('/architectureDetail')"
        />
        <p style="position: absolute; left: 0; bottom: 0; color: #fff;font-size: 25px;">今日荐筑</p>
        <div class="update-button" @click="showPapers" >用户上传</div>
      </div>
    </div>
    
    
    <!-- 内容展示区域 - 左右分栏结构 -->
  </section>
</template>

<script>
import { ref } from 'vue';
// 引入历史数据hook
import { useHistoryData } from "../hooks/useHistoryData";
import { useRouter } from 'vue-router';

export default {
  name: "History",
  setup() {
    const router = useRouter();
    // 使用hook获取模拟数据
    const { newsList } = useHistoryData();
    // 当前悬浮的图片索引
    const hoverPart = ref(null);
    
    // 历史图片拼接数据
    const historyParts = ref([
      {
        id: 1,
        originalSrc:  new URL('../assets/img/history/original/图1.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图1.png', import.meta.url).href,
        left: '0px',
        top: '70px',
        height: '70px',
        zIndex: 'auto',
        title: '原始穴居:北方的半穴居',
        content: '在远古时期，北方黄河流域的先民利用黄土层深厚、雨水较少的特点，挖掘地穴或半地穴作为居所。这种形式防风保暖，是中国北方民居最早的雏形。'
      },
      {
        id: 2,
        originalSrc:  new URL('../assets/img/history/original/图2.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图2.png', import.meta.url).href,
        left: '90px',
        top: '45px',
        height: '70px',
        zIndex: 'auto',
        title: ' 原始巢居：南方的干栏式建筑',
        content: '南方长江流域气候潮湿，先民在树木或桩基上搭建房屋，形成“巢居”。这种干栏式建筑能有效防潮、防虫兽，是河姆渡文化等南方古文明的标志。'
      },
      {
        id: 3,
        originalSrc:  new URL('../assets/img/history/original/图3.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图3.png', import.meta.url).href,
        left: '50px',
        top: '90px',
        height: '70px',
        zIndex: 'auto',
        title: '木构框架的萌芽',
        content: '随着工具的进步，人类开始利用圆木支起简易的构架。这种脱离地面的独立支撑体系，标志着中国建筑开始走向“墙倒屋不塌”的木构技术路线。'
      },
      {
        id: 4,
        originalSrc:  new URL('../assets/img/history/original/图4.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图4.png', import.meta.url).href,
        left: '150px',
        top: '70px',
        height: '80px',
        zIndex: 'auto',
        title: '宫殿基址与夯土技术',
        content: '进入夏商时期，大规模的夯土台基出现。人们通过反复夯实泥土来承载沉重的木构殿宇，这种“土木结合”的方式奠定了中国高等级建筑的基础。'
      },
      {
        id: 5,
        originalSrc:  new URL('../assets/img/history/original/图5.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图5.png', import.meta.url).href,
        left: '130px',
        top: '110px',
        height: '70px',
        zIndex: 'auto',
        title: '院落意识与中轴线布局',
        content: '西周至春秋时期，建筑不再是孤立的单体，而是开始以院落为中心进行组织。中轴对称、层层递进的布局理念，开始渗透进礼制建筑中。'
      },
      {
        id: 6,
        originalSrc:  new URL('../assets/img/history/original/图6.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图6.png', import.meta.url).href,
        left: '230px',
        top: '60px',
        height: '100px',
        zIndex: '1',
        title: '壮丽的城防与门户',
        content: '春秋战国至秦代，由于战争频繁，城市的防御体系与壮观的门户成为重点。巨大的城墙与宏伟的城楼不仅是军事防线，也是帝国权威的象征。'
      },
      {
        id: 7,
        originalSrc:  new URL('../assets/img/history/original/图7.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图7.png', import.meta.url).href,
        left: '330px',
        top: '0px',
        height: '130px',
        zIndex: 'auto',
        title: '汉代的高台与阙楼',
        content: '汉代崇尚高耸威严，盛行在宫殿前设置“阙楼”。这些高耸的建筑不仅是礼仪性的门户，也展示了汉代人在石刻、砖瓦技术上的飞速进步。'
      },
      {
        id: 8,
        originalSrc:  new URL('../assets/img/history/original/图8.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图8.png', import.meta.url).href,
        left: '390px',
        top: '75px',
        height: '100px',
        zIndex: '2',
        title: '斗拱艺术的成型',
        content: '作为中国建筑的灵魂，斗拱在汉至魏晋时期逐渐成熟。它既是支撑屋檐的结构件，又像花朵般绽放，为建筑增添了灵动的韵律感。'
      },
      {
        id: 9,
        originalSrc:  new URL('../assets/img/history/original/图9.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图9.png', import.meta.url).href,
        left: '480px',
        top: '-35px',
        height: '180px',
        zIndex: '1',
        title: '佛教传入与塔的演变',
        content: '魏晋南北朝时期，随佛教传入的佛塔与中国本土的楼阁相结合。这种垂直向上的建筑形式，改变了中国原有平铺直叙的城市天际线。'
      },
      {
        id: 10,
        originalSrc:  new URL('../assets/img/history/original/图10.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图10.png', import.meta.url).href,
        left: '490px',
        top: '30px',
        height: '140px',
        zIndex: 'auto',
        title: '隋唐的宏伟气度',
        content: '隋唐时期，中国木构建筑达到巅峰。其特点是斗拱硕大、屋檐舒展，整体风格简洁、雄浑且庄严，展现了盛世大唐的包容与气量。'
      },
      {
        id: 11,
        originalSrc:  new URL('../assets/img/history/original/图11.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图11.png', import.meta.url).href,
        left: '660px',
        top: '80px',
        height: '80px',
        zIndex: '2',
        title: '宋代法式与比例美学',
        content: '宋代《营造法式》的出现，标志着建筑进入了标准化时代。相比唐代的雄浑，宋代建筑更趋向于秀丽与精巧，对构件比例的控制达到了极致。'
      },
      {
        id: 12,
        originalSrc:  new URL('../assets/img/history/original/图12.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图12.png', import.meta.url).href,
        left: '790px',
        top: '-10px',
        height: '120px',
        zIndex: '1',
        title: ' 楼阁繁盛与垂直探索',
        content: '宋元时期，多层木造楼阁技术极为成熟。通过复杂的榫卯叠加，人们建造出结构复杂、造型优美的多层建筑，展示了高超的数学与物理应用。'
      },
      {
        id: 13,
        originalSrc:  new URL('../assets/img/history/original/图13.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图13.png', import.meta.url).href,
        left: '870px',
        top: '-20px',
        height: '140px',
        zIndex: 'auto',
        title: ' 园林艺术的意境升华',
        content: `随着文人文化的兴起，建筑开始与自然景观深度融合。不再追求绝对的对称，而是通过“借景”、“对景”等手段，在有限的空间内营造出无限的诗意。`
      },
      {
        id: 14,
        originalSrc:  new URL('../assets/img/history/original/图14.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图14.png', import.meta.url).href,
        left: '900px',
        top: '90px',
        height: '90px',
        zIndex: '2',
        title: '明清紫禁城的礼制巅峰',
        content: '明清两代，以北京故宫为代表的皇宫建筑群达到了封建礼制的最高峰。严密的等级制度通过屋顶形式、开间数量和色彩完全视觉化。'
      },
      {
        id: 15,
        originalSrc:  new URL('../assets/img/history/original/图15.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图15.png', import.meta.url).href,
        left: '990px',
        top: '-20px',
        height: '130px',
        zIndex: '1',
        title: '天圆地方的象征表达',
        content: '天坛等礼制建筑，通过圆形的屋顶与方型的台基，完美诠释了中国传统“天圆地方”的宇宙观。这是中国哲学思想在空间营造上的极致体现。'
      },
      {
        id: 16,
        originalSrc:  new URL('../assets/img/history/original/图16.png', import.meta.url).href,
        blackWhiteSrc:  new URL('../assets/img/history/blackWhite/图16.png', import.meta.url).href,
        left: '1070px',
        top: '20px',
        height: '120px',
        zIndex: 'auto',
        title: '民间营造的多元与传承',
        content: '在宏大的宫殿之外，遍布全国的民居因地制宜，形成了各具特色的地方风格。它们在传承传统技艺的同时，也见证了近现代生活方式的变迁。'
      }
    ]);

    // 方法定义
    const showMoreNews = () => {
      console.log("点击更多新闻");
    };

    const showAnnouncements = () => {
      console.log("点击公告");
    };

    const showPapers = () => {
      console.log("点击论文");
    };

    return {
      router,
      newsList,
      hoverPart,
      historyParts,
      showMoreNews,
      showAnnouncements,
      showPapers,
    };
  },
};
</script>

<style scoped>
.parts {
  position: relative;
  height: 200px;
  /* width: 90%; */
}

.part-wrapper {
  position: absolute;
  height: auto;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease;
}

.parts .part {
  height: 70px;
  width: auto;
  display: block;
  transition: opacity 0.3s ease;
}

.tooltip {
  
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(39, 30, 33, 0.95);
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  white-space: nowrap;
  margin-bottom: 10px;
  animation: fadeInUp 0.3s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: rgba(39, 30, 33, 0.95);
}

.tooltip-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #d8d1cb;
}

.tooltip-content {
  white-space: normal;
  word-break: break-all;
  
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
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

.bg-section img {
  width: 100%;
  height: auto;
  display: block;
  vertical-align: bottom;
}

.bg-section:last-child {
  margin-top: -22.5%;
}
/* 发展历程部分样式 */
.history-section {
  
  position: absolute;
  top: 31%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.history-title {
  width: 100%;
  height: auto;
}

.history-title img {
  width: 100%;
  height: auto;
  display: block;
}

/* 内容展示区域 - 左右分栏结构 */
.history-content {
  width: 50%;
  margin-top: 20px;
  display: flex;
}

/* 左侧列表区域 - 透明背景 */
.list-container {
  flex: 3;
  background: #948367;
  padding: 20px;
  border-radius: 8px 0 0 8px;
}

/* 标题栏 */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #b0b0b0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.more-button {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.more-button:hover {
  opacity: 1;
}

/* 新闻列表 */
.news-list {
  max-height: 300px;
  overflow-y: auto;
}

/* 新闻列表项 */
.news-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
}

.news-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* 小房子图标 */
.icon-wrapper {
  margin-right: 12px;
  display: flex;
  align-items: center;
}

.house-icon {
  width: 20px;
  height: 20px;
  color: #fff;
  opacity: 0.8;
}

/* 新闻内容 */
.news-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.news-title {
  font-size: 8px;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.news-time {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  margin-left: 20px;
}

/* 右侧按钮区域 - 背景色#271e21 */
.buttons-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #271e21;
  padding: 30px 20px;
  border-radius: 0 8px 8px 0;
  justify-content: space-around;
}

/* 功能按钮 */
.function-button {
  padding: 25px 20px;
  background-color: #d8d1cb;
  background-image: url('../assets/img/common/news.png');
  background-size: cover;
  border-radius: 12px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #271e21;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.function-button:nth-child(2) {
  background-image: url('../assets/img/common/study.png');
}

.function-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background-color: #e8e1db;
}

.update-button {
  writing-mode: vertical-rl;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  padding: 25px 20px;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #271e21;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  background-color: #948367;
  border-radius: 0 8px 8px 0;
}

/* 响应式设计 - 在小屏幕下调整布局 */
@media (max-width: 956px) {
  .history-content {
    flex-direction: column;
    gap: 20px;
  }

  .list-container {
    width: 100%;
  }

  .buttons-container {
    width: 100%;
    flex-direction: row;
    gap: 15px;
    padding: 15px;
  }

  .function-button {
    flex: 1;
    font-size: 20px;
    padding: 20px 15px;
  }

  .news-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .news-time {
    margin-left: 0;
  }
}
</style>
