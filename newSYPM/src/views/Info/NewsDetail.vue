<template>
  <div class="news-page">
    <div class="top-nav">
      <a href="javascript:history.back()" class="back-btn">返回卷宗总览</a>
      <div class="nav-logo">遗构守望 · 资讯卷宗</div>
    </div>

    <div v-if="currentNews" class="article-container">
      <div class="main-content">
        <div class="article-header">
          <span class="article-tag">{{ getArticleTag() }}</span>
          <h1 class="article-title">{{ currentNews.title }}</h1>
          <div class="article-meta">
            <span>纪年：{{ currentNews.date }}</span>
            <span>出处：中国文化遗产研究院</span>
            <span>整理：遗构守望编辑部</span>
          </div>
        </div>

        <div class="article-body">
          <p v-for="(paragraph, index) in currentNews.content" :key="index">{{ paragraph }}</p>
        </div>

        <div class="reference-section">
          <div class="ref-title">卷宗出处与延伸阅读</div>
          <ul class="ref-list">
            <li v-for="(ref, index) in currentNews.references" :key="index" :style="{ marginTop: index > 0 ? '20px' : '0' }">
              <div class="ref-org"><span class="ref-type">{{ ref.type }}</span> {{ ref.org }}</div>
              <a :href="ref.link" target="_blank" class="ref-link">{{ ref.title }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sidebar">
        <div class="relic-profile">
          <h3 class="profile-title">遗构档案</h3>
          
          <div class="profile-item">
            <span class="profile-label">古建名称</span>
            <span class="profile-value">{{ currentNews.relicInfo.name }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">始建年份</span>
            <span class="profile-value">{{ currentNews.relicInfo.builtYear }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">地理位置</span>
            <span class="profile-value">{{ currentNews.relicInfo.location }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">建筑形制</span>
            <span class="profile-value">{{ currentNews.relicInfo.type }}</span>
          </div>
          <div class="profile-item">
            <span class="profile-label">文保级别</span>
            <span class="profile-value" :style="{ color: currentNews.relicInfo.protectionLevel.includes('全国重点') ? '#d44b38' : '' }">{{ currentNews.relicInfo.protectionLevel }}</span>
          </div>

          <div class="tags-widget">
            <span v-for="(tag, index) in currentNews.tags" :key="index">{{ tag }}</span>
          </div>

          <a 
            v-for="(button, index) in currentNews.buttons" 
            :key="index"
            :href="button.url" 
            target="_blank" 
            class="sidebar-btn" 
            :class="button.type === 'primary' ? 'btn-primary' : 'btn-secondary'"
          >
            {{ button.text }}
          </a>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// 从store获取当前新闻数据
const currentNews = computed(() => store.getters.currentNews);

// 获取文章标签
const getArticleTag = () => {
  if (!currentNews.value) return '';
  
  const tagMap = {
    digital: '前沿科技 / 数字监测',
    repair: '修缮纪实 / 传统工艺',
    rescue: '工程验收 / 抢险加固',
    mural: '文物修复 / 壁画保护',
    archaeology: '考古发现 / 学术研究',
    revive: '理论探讨 / 活化利用'
  };
  
  return tagMap[currentNews.value.work] || '文保资讯';
};
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');

.news-page {
  --bg-dark: #1a1817;
  --bg-card: #242220;
  --bg-inset: #151413;
  --gold-accent: #c6a87c;
  --gold-dim: rgba(198, 168, 124, 0.3);
  --gold-line: rgba(198, 168, 124, 0.15);
  --text-main: #d0cfcb;
  --text-hover: #ffffff;
  --text-muted: #8a8785;
  --font-serif: "Noto Serif SC", "SimSun", serif;
  --font-sans: "Noto Sans SC", "Microsoft YaHei", sans-serif;
}

.news-page {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-sans);
  margin: 0;
  padding: 0;
  line-height: 1.8;
  background-image: radial-gradient(circle at 50% 0%, #2a2623 0%, transparent 70%);
  min-height: 100vh;
}

/* 顶部导航返回 */
.top-nav { 
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 30px 20px; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  border-bottom: 1px solid var(--gold-line); 
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

.nav-logo { 
  font-family: var(--font-serif); 
  color: var(--text-muted); 
  letter-spacing: 2px; 
}

/* 详情页主体布局 */
.article-container { 
  max-width: 1200px; 
  margin: 50px auto; 
  display: flex; 
  gap: 60px; 
  padding: 0 20px; 
}

/* 左侧正文区 */
.main-content { 
  flex: 1; 
  min-width: 0; 
  padding-bottom: 80px; 
}

.article-header { 
  margin-bottom: 40px; 
}

.article-tag { 
  border: 1px solid var(--gold-dim); 
  color: var(--gold-accent); 
  padding: 4px 12px; 
  font-size: 12px; 
  display: inline-block; 
  margin-bottom: 20px; 
  font-family: var(--font-serif); 
}

.article-title { 
  font-family: var(--font-serif); 
  font-size: 32px; 
  color: var(--text-hover); 
  line-height: 1.4; 
  margin: 0 0 20px 0; 
}

.article-meta { 
  color: var(--text-muted); 
  font-size: 13px; 
  display: flex; 
  gap: 20px; 
  font-family: monospace; 
  padding-bottom: 20px; 
  border-bottom: 1px dashed var(--gold-dim); 
}

/* 深度阅读长文排版 */
.article-body { 
  font-size: 16px; 
  color: var(--text-main); 
  text-align: justify; 
}

/* 首字下沉 */
.article-body > p:first-of-type::first-letter { 
  float: left; 
  font-size: 48px; 
  line-height: 1; 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  margin: 8px 12px 0 0; 
}

.article-body h2 { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  font-size: 22px; 
  margin: 40px 0 20px 0; 
  padding-left: 15px; 
  border-left: 4px solid var(--gold-accent); 
  font-weight: normal; 
}

.article-body p { 
  margin-bottom: 25px; 
}

/* 引用语/引言区块 */
.pull-quote { 
  margin: 40px 0; 
  padding: 30px; 
  background-color: var(--bg-inset); 
  border-top: 1px solid var(--gold-dim); 
  border-bottom: 1px solid var(--gold-dim); 
  font-family: var(--font-serif); 
  font-size: 18px; 
  color: var(--gold-accent); 
  text-align: center; 
  line-height: 1.6; 
}

/* 文末官方链接模块 */
.reference-section { 
  margin-top: 60px; 
  padding: 30px; 
  background-color: var(--bg-card); 
  border: 1px dashed var(--gold-dim); 
}

.ref-title { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  font-size: 18px; 
  margin-bottom: 20px; 
  display: flex; 
  align-items: center; 
}

.ref-title::before { 
  content: "◆"; 
  margin-right: 10px; 
  font-size: 12px; 
}

.ref-list { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
}

.ref-list li { 
  margin-bottom: 15px; 
  display: flex; 
  flex-direction: column; 
}

.ref-org { 
  color: var(--text-hover); 
  font-size: 15px; 
  margin-bottom: 4px; 
  display: flex; 
  align-items: center; 
}

.ref-type { 
  font-size: 12px; 
  border: 1px solid var(--gold-dim); 
  padding: 1px 6px; 
  margin-right: 10px; 
  color: var(--gold-accent); 
  border-radius: 2px; 
}

.ref-link { 
  color: var(--text-muted); 
  text-decoration: none; 
  font-size: 13px; 
  transition: color 0.3s; 
  display: inline-flex; 
  align-items: center; 
  margin-top: 4px; 
}

.ref-link:hover { 
  color: var(--gold-accent); 
}

.ref-link::after { 
  content: "↗"; 
  margin-left: 5px; 
  font-size: 14px; 
}

/* 右侧边栏：遗构档案 */
.sidebar { 
  width: 320px; 
  flex-shrink: 0; 
}

.relic-profile { 
  background-color: var(--bg-card); 
  border: 1px solid var(--gold-dim); 
  padding: 30px; 
  position: sticky; 
  top: 40px; 
}

.profile-title { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  font-size: 20px; 
  text-align: center; 
  margin: 0 0 20px 0; 
  letter-spacing: 4px; 
  border-bottom: 1px solid var(--gold-line); 
  padding-bottom: 15px; 
}

.profile-item { 
  margin-bottom: 15px; 
  font-size: 14px; 
  display: flex; 
  justify-content: space-between; 
  border-bottom: 1px dashed var(--gold-line); 
  padding-bottom: 8px; 
}

.profile-label { 
  color: var(--text-muted); 
}

.profile-value { 
  color: var(--text-hover); 
  text-align: right; 
  font-family: var(--font-serif); 
}

.tags-widget { 
  margin-top: 30px; 
  margin-bottom: 30px; 
}

.tags-widget span { 
  display: inline-block; 
  border: 1px solid #4a4540; 
  padding: 4px 12px; 
  font-size: 12px; 
  color: var(--text-muted); 
  margin: 0 8px 8px 0; 
}

/* 侧边栏按钮 */
.sidebar-btn { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  box-sizing: border-box; 
  margin-top: 15px; 
  padding: 12px 0; 
  font-family: var(--font-serif); 
  font-size: 14px; 
  text-decoration: none; 
  transition: all 0.3s; 
}

.btn-primary { 
  background-color: rgba(198, 168, 124, 0.05); 
  border: 1px solid var(--gold-accent); 
  color: var(--gold-accent); 
}

.btn-primary:hover { 
  background-color: var(--gold-accent); 
  color: var(--bg-dark); 
}

.btn-secondary { 
  background-color: transparent; 
  border: 1px dashed var(--gold-dim); 
  color: var(--text-muted); 
}

.btn-secondary:hover { 
  border-color: var(--gold-accent); 
  color: var(--gold-accent); 
}
</style>