<template>
  <div class="show-architecture-container">
    <!-- 1. 顶部全景大图区域 -->
    <header class="hero-section">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>{{ buildingData.title }}</h1>
        <p>{{ buildingData.tagline }}</p>
      </div>
    </header>

    <!-- 2. 建筑详细展示区域 -->
    <main class="details-container">
      <h2 class="section-title">经典建筑</h2>

      <!-- 建筑特性展示 -->
      <div 
        v-for="(feature, index) in buildingData.features" 
        :key="index"
        class="showcase-row"
        :class="{ 'reverse': index % 2 === 1 }"
      >
        <div class="text-block glass-panel">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
        <div class="image-block">
          <img @click="router.push('/history/architecture')" :src="feature.imageUrl" :alt="feature.title">
        </div>
      </div>
    </main>

    <footer class="footer glass-panel">
      <p>&copy; 2026 {{ buildingData.title }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import img1 from '../../assets/img/ShowSomeArchitecture/1.png';
import img2 from '../../assets/img/ShowSomeArchitecture/2.png';
import img3 from '../../assets/img/ShowSomeArchitecture/3.jpg';
import { useRouter } from 'vue-router';
const router = useRouter();

// 建筑数据
const buildingData = {
  title: '汉代高颐阙 ',
  tagline: '',
  features: [
    {
      title: '汉代高颐阙',
      description: '建于209年，位于四川雅安。其石阙仿木结构，清晰地雕刻出“一斗二升”的早期斗拱形态，承托深远出檐。作为汉代斗拱的罕见实物见证，它以石刻形式定格了木构技术的初始样貌，结构古拙雄浑，是研究汉代建筑形制的关键标本。',
      imageUrl: img1
    },
    {
      title: '唐代佛光寺东大殿',
      description: '建于857年，位于山西五台山。其外檐采用宏大的“七铺作”斗拱，高度近柱高之半，出檐深达4米。斗拱雄健如鹏翼，是唐代木构技术的顶峰之作，完美融合结构与气势，被誉为“中国第一国宝”，展现了盛唐建筑的磅礴气度。',
       imageUrl: img2
    },
    {
      title: '宋代晋祠圣母殿',
      description: '重建于1102年，位于山西太原。其斗拱配置疏朗，比例秀美，并运用“假昂”等典型宋式做法。作为现存唯一完全符合《营造法式》“副阶周匝”形制的实例，它体现了宋代斗拱的标准化与装饰化，标志着斗拱从结构主体向结构装饰一体化的重要转变。',
       imageUrl: img3
    },
  ]
};
</script>

<style scoped>
/* --- 全局重置与基础样式 --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.show-architecture-container {
  font-family: "MyCustomFont" "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  min-height: 100vh;
}

/* --- 公共的半透明与毛玻璃效果样式 --- */
.glass-panel {
  background-color: rgba(255, 255, 255, 0.85); /* 85% 透明度的白色背景 */
  backdrop-filter: blur(8px); /* 关键：为下方背景引入毛玻璃模糊效果，极大提升高级感 */
  -webkit-backdrop-filter: blur(8px); /* 兼容 Safari */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.3); /* 淡淡的白边，增加立体感 */
}

/* --- 顶部全景展示区 (Hero Section) --- */
.hero-section {
  position: relative;
  height: 100vh; /* 占满整个屏幕高度 */
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 这里使用占位图，请替换为您的建筑全景大图 */
  background-image: url('../../assets/img/ShowSomeArchitecture/0.png'); 
  background-size: cover;
  background-position: center;
  z-index: 1;
  /* 简单的视差效果 */
  transform: scale(1.05); 
  transition: transform 0.5s ease;
}

/* 鼠标悬停或滚动时的微调效果可选 */
.hero-section:hover .hero-bg {
  transform: scale(1.0);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 黑色遮罩，让文字更清晰 */
  z-index: 2;
}

.hero-content {
  
  position: relative;
  z-index: 3;
  text-align: center;
  color: white;
  padding: 40px;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
}

.hero-content h1 {
  font-size: 3.5rem;
  color: white;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
  margin-bottom: 0.5rem;
}

.hero-content p {
  font-size: 1.2rem;
  color: #eee;
  text-align: center;
  margin-bottom: 0;
}

/* --- 详细内容展示区 --- */
.details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  position: relative;
  color: #2c3e50;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #3498db;
  margin: 15px auto 0;
}

/* 单个展示行 (Flexbox 布局) */
.showcase-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px; /* 行与行之间的间距 */
  gap: 60px; /* 文字和图片之间的间距 */
}

.showcase-row:last-child {
  margin-bottom: 0;
}

.text-block {
  flex: 1; /* 占据剩余空间 */
  padding: 30px;
  height: 100%;
}

.text-block h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-left: 4px solid #3498db;
  padding-left: 15px;
}

.text-block p {
  color: #555;
  text-align: justify;
  line-height: 1.8;
  margin-bottom: 0;
}

.image-block {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: 400px;
}

.image-block img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片填满容器且不变形 */
  transition: transform 0.5s ease;
}

.image-block:hover img {
  transform: scale(1.05); /* 鼠标悬停放大效果 */
}

/* --- 核心逻辑：交错布局 --- */

/* 偶数行：改变顺序，让图片在左，文字在右 */
.showcase-row.reverse {
  flex-direction: row-reverse;
}

/* --- 页脚 --- */
.footer {
  text-align: center;
  padding: 40px;
  margin-top: 80px;
  background-color: #2c3e50;
  color: white;
  border-radius: 0;
  border: none;
}

.footer p {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
}

/* --- 响应式设计 (手机端适配) --- */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .showcase-row {
    flex-direction: column !important; /* 强制取消交错，全部变为上下结构 */
    margin-bottom: 60px;
    gap: 30px;
  }

  .image-block {
    height: 300px;
  }

  .text-block {
    padding: 20px;
  }

  .details-container {
    padding: 60px 15px;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .footer {
    padding: 30px 15px;
    margin-top: 60px;
  }
}

/* --- 平板端适配 --- */
@media (max-width: 1024px) {
  .showcase-row {
    gap: 40px;
  }

  .text-block h3 {
    font-size: 1.5rem;
  }

  .image-block {
    height: 350px;
  }
}
</style>