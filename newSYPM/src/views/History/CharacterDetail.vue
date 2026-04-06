<template>
  <div class="character-detail">
    <nav class="top-nav">
      <div class="back-btn" @click="router.back()">← 返回人物卷宗</div>
    </nav>

    <header class="hero">
      <h1>{{ character.name }}</h1>
      <p>{{ character.englishName || '' }}</p>
    </header>

    <div class="container">
      <aside class="sidebar">
        <div class="dossier-card">
          <img 
            :src="character.portrait || 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop'" 
            :alt="character.name + '先生'" 
            class="portrait"
          >
          <ul class="info-list">
            <li v-for="(info, index) in character.info" :key="index">
              <span class="info-label">{{ info.label }}</span> 
              <span class="info-value">{{ info.value }}</span>
            </li>
          </ul>
        </div>
      </aside>

      <main class="biography">
        <div v-if="character.quote" class="quote-block">
          {{ character.quote.content }}
          <div style="font-size:0.9rem; text-align:right; margin-top:15px; color:var(--text-gray);">{{ character.quote.source }}</div>
        </div>

        <section class="bio-text">
          <div v-for="(section, index) in character.sections" :key="index">
            <h2 class="section-title">{{ section.title }}</h2>
            <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
            
            <div v-if="section.images" class="gallery">
              <div v-for="(image, imgIndex) in section.images" :key="imgIndex">
                <img :src="image.src" :alt="image.alt">
                <div class="img-caption">{{ image.caption }}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

// 人物数据
const character = ref({
  name: '梁思成',
  englishName: 'Liang Sicheng (1901 - 1972)',
  portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
  info: [
    { label: '字号', value: '字企孙，号思成' },
    { label: '籍贯', value: '广东省新会县' },
    { label: '生卒日期', value: '1901.4.20 - 1972.1.9' },
    { label: '核心头衔', value: '建筑史学家、建筑师' },
    { label: '所属机构', value: '中国营造学社<br>清华大学建筑系' },
    { label: '配偶', value: '林徽因' }
  ],
  quote: {
    content: '中国建筑之个性乃即我民族之性格，即我艺术及思想特殊之一部，非但在其结构本身之材质方法而已。',
    source: '—— 梁思成《中国建筑史》'
  },
  sections: [
    {
      title: '生平概略',
      paragraphs: [
        '梁思成，生于日本东京，是中国近代著名思想家梁启超之子。他毕生致力于中国古代建筑的研究和保护，是著名的建筑史学家、建筑师、城市规划师和建筑教育家，一生心系“民族之脊梁”。',
        '青年时期赴美国宾夕法尼亚大学学习建筑，深受西方布杂艺术（Beaux-Arts）体系影响。归国后，他深感中国虽有数千年建筑历史，却无中国人自己编写的建筑史，于是与林徽因等人加入“中国营造学社”，开启了极其艰苦的古建考察之路。'
      ]
    },
    {
      title: '破译天书与发现佛光寺',
      paragraphs: [
        '宋代李诫所著的《营造法式》被誉为中国古建的“天书”，其术语深奥，常人难解。梁思成通过对清代匠人的寻访和大量实地测绘，运用现代建筑学的方法，最终成功破译了这本奇书，确立了中国传统建筑以“材”为标准的模数制体系。',
        '1937年，梁思成与林徽因等人骑毛驴深入山西五台山，发现了建于唐大中十一年（857年）的佛光寺东大殿。这一发现打破了日本学者“中国境内已无唐代木构建筑，要看唐代木构只能去日本奈良”的断言，轰动了世界建筑史学界。'
      ],
      images: [
        {
          src: 'https://images.unsplash.com/photo-1590076214815-565cb21422eb?q=80&w=800&auto=format&fit=crop',
          alt: '斗拱手稿意向图',
          caption: '《图像中国建筑史》斗拱图解（意向）'
        },
        {
          src: 'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?q=80&w=800&auto=format&fit=crop',
          alt: '古建测绘意向图',
          caption: '山西五台山佛光寺大殿剖面测绘（意向）'
        }
      ]
    },
    {
      title: '城市保护与“梁陈方案”',
      paragraphs: [
        '新中国成立前夕，为保护北京这座历史文化名城，梁思成在《全国文物古建筑目录》中圈出北京城墙、城门等关键古建，呼吁予以保护。1950年，他与陈占祥共同提出著名的“梁陈方案”，主张保护北京古城老街区，在西郊另建新的行政中心，以避免工业化对古都风貌的破坏。',
        '虽然该方案最终未能被采纳，北京古城墙也面临了被拆除的命运，但梁思成先生“保卫古城”的超前视野与悲壮努力，成为了世界城市规划史上的重要一页。'
      ]
    },
    {
      title: '主要著作与传世贡献',
      paragraphs: [
        '梁思成不仅奠定了中国建筑史学的根基，还创办了东北大学和清华大学两个建筑系，培养了大批建筑人才。他主持并参与了中华人民共和国国徽、人民英雄纪念碑的设计工作。',
        '其代表作《中国建筑史》、《图像中国建筑史》、《营造法式注释》等，至今仍是国内外研究中国古建的必读经典。他用现代科学手段，将中国建筑升华到了世界建筑史的最高殿堂。'
      ]
    }
  ]
});

// 从 store 获取人物数据
onMounted(() => {
  const characterData = store.getters.currentCharacter;
  if (characterData) {
    character.value = characterData;
  }
});

// 监听 store 中的人物数据变化
watch(() => store.getters.currentCharacter, (newCharacter) => {
  if (newCharacter) {
    character.value = newCharacter;
  }
});
</script>

<style scoped>
/* 引入传统宋体风格字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.character-detail {
  /* 定义CSS变量 */
  --primary-gold: #C29C57; 
  --gold-hover: #E3BE77;
  --bg-dark: #151311; /* 详情页背景稍微再深一点，突出内容 */      
  --card-bg: rgba(35, 30, 25, 0.6); 
  --text-light: #E2D5C5;   
  --text-gray: #9A948C;    
  --border-color: rgba(194, 156, 87, 0.3);
  
  background-color: var(--bg-dark); 
  background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px);
  color: var(--text-light);
  font-family: 'Noto Serif SC', 'SimSun', serif;
  line-height: 1.8; 
  overflow-x: hidden;
  min-height: 100vh;
}

/* 顶部导航控制 */
.top-nav {
  padding: 20px 40px;
  position: absolute;
  top: 0; left: 0;
  z-index: 10;
}

.back-btn {
  color: var(--primary-gold);
  text-decoration: none;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  padding: 5px 15px;
  transition: 0.3s;
}
.back-btn:hover { background: rgba(194, 156, 87, 0.1); border-color: var(--primary-gold); }

/* 顶部视觉 Banner */
.hero {
  height: 45vh;
  background: linear-gradient(to bottom, rgba(21,19,17,0.4), rgba(21,19,17,1)), 
              url('https://images.unsplash.com/photo-1542842407-2a5b677a21fb?q=80&w=2000&auto=format&fit=crop') center/cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 40px;
}

.hero h1 { font-size: 4rem; color: #fff; letter-spacing: 15px; text-shadow: 0 4px 15px rgba(0,0,0,0.8); margin-left: 15px; }
.hero p { font-size: 1.2rem; color: var(--primary-gold); letter-spacing: 5px; margin-top: 10px; }

/* 主体内容区布局 (Grid) */
.container {
  max-width: 1200px; margin: 0 auto; padding: 40px 20px;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;
}

/* 左侧：人物档案卡 (Sticky 固定) */
.sidebar { position: relative; }
.dossier-card {
  position: sticky;
  top: 40px; /* 页面滚动时停留在距离顶部 40px 的位置 */
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-top: 5px solid var(--primary-gold);
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.portrait {
  width: 100%; height: 350px;
  object-fit: cover;
  filter: grayscale(80%) sepia(20%) contrast(1.1); /* 老照片质感 */
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.info-list { list-style: none; font-size: 0.95rem; }
.info-list li {
  display: flex; justify-content: space-between;
  padding: 12px 0; border-bottom: 1px dashed rgba(154, 148, 140, 0.2);
}
.info-label { color: var(--text-gray); }
.info-value { color: #fff; text-align: right; max-width: 60%; }

/* 右侧：详细传记长卷 */
.biography { padding-top: 10px; }

/* 语录/引言 */
.quote-block {
  border-left: 4px solid var(--primary-gold);
  background: linear-gradient(to right, rgba(194, 156, 87, 0.1), transparent);
  padding: 30px 40px;
  margin-bottom: 50px;
  font-size: 1.25rem;
  color: var(--text-light);
  font-style: italic;
  position: relative;
}
.quote-block::before {
  content: '"'; position: absolute; left: 10px; top: -10px;
  font-size: 4rem; color: rgba(194, 156, 87, 0.2); font-family: sans-serif;
}

/* 章节标题 */
.section-title {
  font-size: 1.8rem; color: var(--primary-gold);
  margin: 40px 0 20px; display: flex; align-items: center;
}
.section-title::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(to right, var(--border-color), transparent);
  margin-left: 20px;
}

/* 正文段落 */
.bio-text p {
  font-size: 1.05rem; color: var(--text-gray);
  margin-bottom: 20px; text-indent: 2em; text-align: justify;
}

/* 图片画廊/手稿展示区 */
.gallery {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  margin: 30px 0;
}
.gallery img {
  width: 100%; height: 250px; object-fit: cover;
  border: 1px solid var(--border-color); opacity: 0.8;
  transition: 0.3s;
}
.gallery img:hover { opacity: 1; transform: scale(1.02); border-color: var(--primary-gold); }
.img-caption { text-align: center; font-size: 0.85rem; color: var(--primary-gold); margin-top: 10px; }

/* 移动端响应式 */
@media (max-width: 900px) {
  .container { grid-template-columns: 1fr; }
  .dossier-card { position: static; margin-bottom: 40px; }
  .gallery { grid-template-columns: 1fr; }
  .hero h1 { font-size: 3rem; }
}
</style>