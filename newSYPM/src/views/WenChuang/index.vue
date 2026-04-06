<template>
  <div class="product-page" id="top">
    <header class="top-nav">
      <a href="index.html" class="back-btn">返回首页</a>
    </header>

    <div class="title-section">
      <h1 class="title-text" :class="{ fade: isFading }">{{ currentProduct.pageTitle }}</h1>
      <div class="title-decoration">
        <div class="cloud-pattern"></div>
        <div class="cloud-pattern" style="width: 20px; height: 20px;"></div>
        <div class="cloud-pattern"></div>
      </div>
    </div>

    <main class="product-container">
      <div class="product-gallery">
        <div class="gallery-main">
          <div class="placeholder-text" :class="{ fade: isFading }">{{ currentProduct.imgText }}</div>
        </div>
      </div>

      <div class="product-info">
        <h2 class="info-title" :class="{ fade: isFading }">{{ currentProduct.title }}</h2>
        
        <p class="info-desc" :class="{ fade: isFading }">{{ currentProduct.desc }}</p>

        <div class="cultural-archive" :class="{ fade: isFading }">
          <div class="archive-badge">器物档案</div>
          <div class="archive-item" v-for="(item, index) in currentProduct.archive" :key="index">
            <span class="archive-label">{{ item.label }}</span>
            <span class="archive-value">{{ item.value }}</span>
          </div>
        </div>

        <div class="info-actions">
          <a href="#" class="btn btn-primary">点击购买</a>
          <a href="#recommend" class="btn btn-secondary">浏览更多文创 <span>↓</span></a>
        </div>
      </div>
    </main>

    <section id="recommend" class="recommend-section">
      <div class="recommend-header">
        <h3 class="recommend-title">点击切换展出之匠心器物</h3>
      </div>
      
      <div class="recommend-grid">
        <a 
          href="javascript:void(0)" 
          class="rec-card" 
          :class="{ active: currentProductId === 'xiangnang' }"
          @click="switchProduct('xiangnang')"
        >
          <div class="rec-img">[ 瑞兽香囊 ]</div>
          <div class="rec-name">【花神系列】龙凤香囊</div>
          <div class="rec-tag">瑞兽呈祥 · 丝织非遗</div>
        </a>
        <a 
          href="javascript:void(0)" 
          class="rec-card" 
          :class="{ active: currentProductId === 'yuqi' }"
          @click="switchProduct('yuqi')"
        >
          <div class="rec-img">[ 玉器研究 典籍 ]</div>
          <div class="rec-name">《玉器研究》专刊书系</div>
          <div class="rec-tag">故宫出版 · 学术汇编</div>
        </a>
        <a 
          href="javascript:void(0)" 
          class="rec-card" 
          :class="{ active: currentProductId === 'chaju' }"
          @click="switchProduct('chaju')"
        >
          <div class="rec-img">[ 宫廷茶具 ]</div>
          <div class="rec-name">千里江山图·骨瓷茶具</div>
          <div class="rec-tag">名画衍伸 · 雅集茶器</div>
        </a>
      </div>
    </section>

    <footer class="footer">
      大音希声 · 大象无形 —— 故宫文创匠心数字展厅
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 展品数据库
const productData = {
  'xiangnang': {
    pageTitle: '故宫瑞兽花神香囊 · 绝代芳华',
    imgText: '[ 瑞兽香囊 8:12 PNG 光影展示区 ]',
    title: '【花神系列】故宫瑞兽香囊（龙凤呈祥）',
    desc: '此款香囊为故宫匠心系列展品之一。设计灵感源自院藏“清康熙·明黄缎绣花鸟纹荷包”，重新解构明清宫廷瑞兽——龙凤元素。匠人采用精妙的苏绣技艺，历经多道工序纯手工缝制，将丝线的流光溢彩与古典纹样完美融合。其内充填之香料，更复刻了古籍记载的“花神瑞气”古方，香气悠远，承载着祈福辟邪的深厚意蕴。',
    archive: [
      { label: '灵感溯源：', value: '清代宫廷刺绣荷包与瑞兽图谱' },
      { label: '核心技艺：', value: '传统苏绣平针、打籽绣工艺' },
      { label: '文化寓意：', value: '龙凤呈祥、阴阳和合、辟邪纳福' },
      { label: '香道典故：', value: '复刻《香乘》所载宫廷节令香方' }
    ]
  },
  'yuqi': {
    pageTitle: '玉器研究专刊 · 学术珍藏',
    imgText: '[ 《玉器研究》典籍 8:12 PNG 展示区 ]',
    title: '《玉器研究》专刊书系（第二辑）',
    desc: '本书是关于玉器研究的重磅专刊，由故宫出版社出版。全书分为玉学理论篇、玉器研究篇、海外藏玉篇等几大部分，汇集了众多顶尖学者多年来对中国古代玉器及玉文化的深度探索。装帧采用深蓝色特种纸与烫金工艺，不仅是玉器爱好者的学术指南，更是一件值得珍藏的纸上艺术品。',
    archive: [
      { label: '文献溯源：', value: '故宫博物院历代玉器藏品及海内外珍藏' },
      { label: '装帧技艺：', value: '特种纸精装烫金、高清数字影印' },
      { label: '文化寓意：', value: '君子比德于玉、温润而泽' },
      { label: '学术价值：', value: '汇集国内外顶尖玉器专家最新考证' }
    ]
  },
  'chaju': {
    pageTitle: '千里江山骨瓷茶具 · 雅集必备',
    imgText: '[ 千里江山图茶具 8:12 PNG 展示区 ]',
    title: '【名画系列】千里江山图·骨瓷茶具',
    desc: '此套茶具提取了北宋王希孟《千里江山图》卷中经典的青绿山水元素，采用高级含量的天然骨瓷材质，经1300度高温烧制而成。瓷体通透，釉面温润如玉，青绿画卷在杯盏间绵延展开。品茗之时，仿佛置身于连绵群山与浩渺江水之中，尽显东方文人雅致之美。',
    archive: [
      { label: '灵感溯源：', value: '北宋 王希孟《千里江山图》卷' },
      { label: '核心技艺：', value: '1300度高温釉中彩、高规格骨瓷' },
      { label: '文化寓意：', value: '江山如画、胸怀广阔、文人雅集' },
      { label: '器物美学：', value: '人体工学防烫设计与中式器型完美融合' }
    ]
  }
};

// 响应式数据
const currentProductId = ref('xiangnang');
const isFading = ref(false);

// 计算当前产品数据
const currentProduct = computed(() => {
  return productData[currentProductId.value];
});

// 切换产品逻辑
const switchProduct = (id) => {
  // 1. 更新当前产品ID
  currentProductId.value = id;
  
  // 2. 触发淡入淡出动画
  isFading.value = true;
  
  // 3. 等待动画结束后恢复显示
  setTimeout(() => {
    isFading.value = false;
    
    // 4. 平滑回滚到顶部附近
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 300); // 300ms 对应 CSS 中的 transition 时间
};
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');

.product-page {
  --bg-dark: #1a1817;
  --bg-card: #242220;
  --bg-inset: #151413;
  --gold-accent: #c6a87c;
  --gold-dim: rgba(198, 168, 124, 0.3);
  --gold-line: rgba(198, 168, 124, 0.15);
  --text-main: #d0cfcb;
  --text-hover: #ffffff;
  --text-muted: #8a8785;
  --font-serif: "Noto Serif SC", "SimSun", "STSong", serif;
  --font-sans: "Noto Sans SC", "Microsoft YaHei", sans-serif;
}

/* 开启平滑滚动，用于锚点和JS回顶跳转 */
html { scroll-behavior: smooth; }

.product-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-sans);
  margin: 0;
  padding: 0;
  line-height: 1.6;
  background-image: radial-gradient(circle at 50% 0%, #2a2623 0%, transparent 70%);
  min-height: 100vh;
}

/* 顶部极简导航栏 */
.top-nav { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 30px 20px; 
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 
}

.back-btn { 
  color: var(--gold-accent); 
  text-decoration: none; 
  font-family: var(--font-serif); 
  font-size: 16px; 
  display: flex; 
  align-items: center; 
  transition: color 0.3s; 
}

.back-btn:hover { 
  color: var(--text-hover); 
}

.back-btn::before { 
  content: "←"; 
  margin-right: 8px; 
}

/* 主标题区：带花纹与平滑过渡 */
.title-section { 
  text-align: center; 
  padding: 40px 0 60px 0; 
  position: relative; 
}

.title-text {
  font-family: var(--font-serif);
  color: var(--gold-accent);
  font-size: 32px;
  letter-spacing: 6px;
  margin: 0;
  font-weight: normal;
  position: relative;
  z-index: 1;
  margin-top: 10px;
  transition: opacity 0.3s ease; /* 增加淡入淡出过渡 */
}

.title-text::before, .title-text::after {
  content: ""; 
  position: absolute; 
  top: 50%; 
  transform: translateY(-50%); 
  width: 80px; 
  height: 1px; 
  background-color: var(--gold-dim);
}

.title-text::before { left: -100px; }
.title-text::after { right: -100px; }

.title-decoration { 
  display: inline-flex; 
  gap: 15px; 
  margin-top: 30px; 
}

.cloud-pattern { 
  width: 30px; 
  height: 30px; 
  border: 1px solid var(--gold-line); 
  border-radius: 50%; 
  position: relative; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

.cloud-pattern::after { 
  content: "☁"; 
  color: var(--gold-dim); 
  font-size: 14px; 
}

/* 产品主详情区 */
.product-container { 
  max-width: 1200px; 
  margin: 0 auto 80px auto; 
  padding: 0 20px; 
  display: flex; 
  gap: 60px; 
}

/* 左侧无边框悬浮画廊 (8:12) */
.product-gallery { 
  flex: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

.gallery-main {
  width: 100%; 
  aspect-ratio: 8 / 12; 
  background-color: transparent; 
  border: none; 
  background-image: none; 
  box-shadow: none; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  position: relative; 
  overflow: hidden;
}

.gallery-main img { 
  max-width: 100%; 
  max-height: 100%; 
  object-fit: contain; 
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); 
}

.placeholder-text {
  position: absolute; 
  color: var(--gold-accent); 
  font-family: var(--font-serif); 
  opacity: 0.6; 
  letter-spacing: 2px; 
  z-index: 1;
  transition: opacity 0.3s ease; /* 增加淡入淡出过渡 */
}

/* 右侧信息与交互区 */
.product-info { 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
}

.info-title { 
  font-family: var(--font-serif); 
  font-size: 28px; 
  color: var(--text-hover); 
  margin: 0 0 20px 0; 
  font-weight: normal; 
  transition: opacity 0.3s ease;
}

.info-desc { 
  color: var(--text-muted); 
  font-size: 15px; 
  line-height: 1.8; 
  margin-bottom: 30px; 
  text-align: justify; 
  transition: opacity 0.3s ease;
}

/* 文化档案区块 */
.cultural-archive { 
  background-color: rgba(198, 168, 124, 0.03); 
  border: 1px dashed var(--gold-dim); 
  padding: 25px; 
  margin-bottom: 40px; 
  position: relative; 
  transition: opacity 0.3s ease;
}

.archive-badge { 
  position: absolute; 
  top: -12px; 
  left: 20px; 
  background-color: var(--bg-dark); 
  color: var(--gold-accent); 
  padding: 0 10px; 
  font-family: var(--font-serif); 
  font-size: 14px; 
  letter-spacing: 2px; 
}

.archive-item { 
  display: flex; 
  margin-bottom: 12px; 
  font-size: 14px; 
}

.archive-item:last-child { margin-bottom: 0; }

.archive-label { 
  color: var(--text-muted); 
  width: 80px; 
  flex-shrink: 0; 
}

.archive-value { 
  color: var(--text-main); 
  font-family: var(--font-serif); 
}

/* 按钮区 */
.info-actions { 
  display: flex; 
  gap: 20px; 
}

.btn { 
  padding: 15px 35px; 
  font-family: var(--font-serif); 
  font-size: 16px; 
  letter-spacing: 2px; 
  cursor: pointer; 
  text-decoration: none; 
  display: inline-flex; 
  justify-content: center; 
  align-items: center; 
  transition: all 0.3s ease; 
  border-radius: 2px; 
}

.btn-primary { 
  background-color: var(--gold-accent); 
  color: var(--bg-dark); 
  border: 1px solid var(--gold-accent); 
  font-weight: bold; 
}

.btn-primary:hover { 
  background-color: #d4ba94; 
  box-shadow: 0 0 15px rgba(198, 168, 124, 0.4); 
}

.btn-secondary { 
  background-color: transparent; 
  color: var(--gold-accent); 
  border: 1px solid var(--gold-accent); 
}

.btn-secondary:hover { 
  background-color: rgba(198, 168, 124, 0.1); 
}

.btn-secondary span { 
  margin-left: 8px; 
  font-family: sans-serif; 
  font-size: 18px; 
}

/* 底部互动卡片推荐区 */
.recommend-section { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 80px 20px 60px 20px; 
  border-top: 1px solid var(--gold-line); 
}

.recommend-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 30px; 
}

.recommend-title { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  font-size: 22px; 
  font-weight: normal; 
}

.recommend-grid { 
  display: flex; 
  gap: 30px; 
}

.rec-card { 
  flex: 1; 
  background-color: var(--bg-card); 
  border: 1px solid var(--gold-line); 
  padding: 20px; 
  transition: all 0.4s ease; 
  cursor: pointer; 
  text-decoration: none; 
  display: block; 
  position: relative; 
  overflow: hidden; 
}

/* 选中状态的卡片边框高亮 */
.rec-card.active { 
  border-color: var(--gold-accent); 
  box-shadow: 0 0 15px rgba(198,168,124,0.15); 
}

.rec-card.active::after { 
  content: ''; 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 4px; 
  height: 100%; 
  background-color: var(--gold-accent); 
}

.rec-card:hover { 
  border-color: var(--gold-accent); 
  transform: translateY(-5px); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.3); 
}

.rec-img { 
  width: 100%; 
  aspect-ratio: 1; 
  background-color: var(--bg-inset); 
  border: 1px solid var(--gold-line); 
  margin-bottom: 15px; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: var(--text-muted); 
  font-size: 12px; 
}

.rec-name { 
  color: var(--text-hover); 
  font-family: var(--font-serif); 
  font-size: 16px; 
  margin-bottom: 8px; 
  text-align: center; 
}

.rec-tag { 
  color: var(--gold-accent); 
  font-size: 12px; 
  text-align: center; 
  letter-spacing: 1px; 
}

.footer { 
  text-align: center; 
  padding: 40px; 
  color: var(--text-muted); 
  font-size: 13px; 
  border-top: 1px solid var(--bg-card); 
  margin-top: 40px; 
  font-family: var(--font-serif); 
}

/* 淡入淡出动画类 */
.fade { opacity: 0 !important; }
</style>