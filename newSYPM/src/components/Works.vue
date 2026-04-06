<template>
  <section id="works" class="works-section">
          <div id="Badazuo" class="works-title">
            <img src="../assets/img/homepage/works-title.png" alt="八大作背景" class="works-title-bg">
            <span class="works-title-text">八大作</span>
          </div>
          <p class="works-intro">
            中国传统建筑营造技艺中的“八大作”是指古建筑营造过程中八大主要工序的合称，这些技艺在明清时期逐渐成熟并广泛应用于官式建筑的建造和修缮中。<br/>
            如今，这些技艺已被列为非物质文化遗产，得到了更好的保护和传承。
          </p>
          <p class="works-copyright-tip">
            （图片来自北京故宫纪录片《八大作》）
          </p>
          <div class="works-grid">
            <!-- 翻转卡片结构 -->
            <div class="work-item"  v-for="work in handleWorks" :key="work.id"  @click="router.push('/badazuo')">
              <div class="flip-card" :class="{ 'flipped': work.isFlipped }" 
                   @mouseenter="flipCard(work.id, true)" 
                   @mouseleave="flipCard(work.id, false)">
                <!-- 翻转卡片内部容器 - 必需的中间层 -->
                <div class="flip-card-inner">
                  <!-- 卡片正面 - 图片 -->
                  <div class="flip-card-front">
                    <div class="work-image-container">
                      <img :src="work.image" :alt="work.title" class="work-image">
                      <div class="work-overlay">{{ work.title }}</div>
                    </div>
                  </div>
                  <!-- 卡片背面 - 描述 -->
                  <div class="flip-card-back">
                    <div class="work-description-container">
                      <h3 class="work-back-title">{{ work.title }}</h3>
                      <p class="work-back-desc">{{ work.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
</template>

<script>
import { useMockData } from '../hooks/useMockData'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Works',
  setup() {
    const { works } = useMockData()
    const router = useRouter()
    
    // 为每个作品添加翻转状态
    const handleWorks = ref(works.value.map(work => ({
      ...work,
      isFlipped: false
    })))
    
    // 翻转卡片方法
    const flipCard = (id, isFlipped) => {
      const work = handleWorks.value.find(w => w.id === id)
      if (work) {
        work.isFlipped = isFlipped
      }
    }
    
    return {
      handleWorks,
      flipCard,
      router
    }
  }
}
</script>

<style scoped>

/* 八大作部分样式 */
.works-section {
    position: absolute;
    top: 48.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 55%;
    display: flex;
    flex-direction: column;
    gap: 3vw;
}

.works-title {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.works-title-bg {
    height: auto;
}

.works-title-text {
    position: absolute;
    margin: -2.4% auto auto -0.8%;
    font-size: 2.5vw;
    font-family: 'MyCustomFont';
}

.works-intro {
  font-family: "Microsoft YaHei";
    margin: -3.6% auto;
    font-size: 1vw;
    line-height: 1.8;
    text-align: center;
    max-width: 90%;
}

.works-copyright-tip {
  font-family: "Microsoft YaHei";
    margin: -2% 0;
    font-size: 0.7vw;
    line-height: 1.8;
    text-align: right;
    max-width: 100%;
}

.works-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 2vw;
}

.work-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 翻转卡片容器 */
.flip-card {
  
    width: 100%;
    aspect-ratio: 2/2.96;
    perspective: 1000px;
    cursor: pointer;
}

/* 翻转卡片内部容器 */
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

/* 翻转状态 */
.flip-card.flipped .flip-card-inner {
    transform: rotateY(180deg);
}

/* 卡片正面和背面 */
.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 0.5vw;
    overflow: hidden;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}

/* 卡片正面 */
.flip-card-front {
    background-color: #fff;
}

/* 卡片背面 */
.flip-card-back {
    background-color: #d8d1cb;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5vw;
}

/* 卡片描述容器 */
.work-description-container {
  
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

/* 背面标题 */
.work-back-title {
    font-size: 1.8vw;
    font-family: 'Ma Shan Zheng', sans-serif;
    margin-bottom: 1vw;
    color: #271e21;
    letter-spacing: 0.5vw;
}

/* 背面描述 */
.work-back-desc {
  font-family: "Microsoft YaHei";
    font-size: 0.9vw;
    line-height: 1.6;
    color: #271e21;
    text-align: justify;
}

/* 原有的图片容器样式 */
.work-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 2/2.96;
    border-radius: 0.5vw;
    overflow: hidden;
}

.work-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.work-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    background-color: rgba(255, 255, 255, 0.42);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.9vw;
    font-family: 'Ma Shan Zheng', sans-serif;
    letter-spacing: 1.2vw;
    padding-left: 0.6vw;
    margin-right: -0.6vw;
}

/* 响应式设计 */
@media (max-width: 956px) {
    .works-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .work-back-title {
        font-size: 3vw;
    }
    
    .work-back-desc {
        font-size: 1.5vw;
    }
}

@media (max-width: 600px) {
    .works-grid {
        grid-template-columns: 1fr;
    }
    
    .work-back-title {
        font-size: 4vw;
    }
    
    .work-back-desc {
        font-size: 2.5vw;
    }
}

</style>