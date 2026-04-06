<template>
  <div class="architecture-detail-container">
    <!-- 名词解释弹窗 -->
    <div 
      v-if="showPopup" 
      class="term-popup"
      :style="popupStyle"
    >
      <h4>{{ popupData.title }}</h4>
      <p>{{ popupData.description }}</p>
    </div>

    <!-- 顶部导航 -->
    <header>
      <router-link to="/history/architecture" class="back-btn">返回列表</router-link>
      <h2>建筑探索</h2>
    </header>

    <!-- 主体内容 -->
    <div class="container">
      <!-- 左侧建筑详情 -->
      <main class="building-details glass-panel">
        <div class="hero-image">
            <img src="../../assets/img/Architecture/PalaceMuseum.jpg" alt="故宫博物院" style="width: 100%; height: auto; overflow: hidden;" ></img>
        </div>
        
        <h1 class="building-title"style="margin-top: 40px;">{{ buildingData.title }}</h1>
        
        <div class="building-meta">
          <span class="meta-item"><strong>建造年份：</strong> {{ buildingData.year }}</span>
          <span class="meta-item"><strong>风格：</strong> {{ buildingData.style }}</span>
          <span class="meta-item"><strong>地点：</strong> {{ buildingData.location }}</span>
        </div>

        <div class="action-links">
          <a :href="buildingData.officialUrl" target="_blank" class="btn-primary">访问官网 ↗</a>
          <router-link to="/history/architecture"  class="btn-secondary">跳转原网页 ↗</router-link>
        </div>

        <div class="building-content">
          <h3>建筑布局与礼制</h3>
          <p>故宫是世界上现存规模最大、保存最为完整的木质结构古建筑之一。它的整体布局严格遵循了中国古代的宗法礼制，所有核心建筑都对称分布在一条贯穿南北的
          <el-tooltip
        class="box-item"
        effect="light"
        content="中国古代都城及宫殿群的对称中心线。故宫建筑严格对称分布于北京中轴线上，体现了皇权至上和“居中为尊”的传统思想。"
        placement="top-end"
      >
        <span class="glossary-term">中轴线</span>
      </el-tooltip>
          
          上，前朝后寝，左祖右社。</p>
          
          <figure class="content-figure">
            <div class="content-image-placeholder" >
                <img src="../../assets/img/Architecture/ZhongZhouXian.jpg" style="height: 100%; width: auto; " ></img>
            </div>
            <figcaption class="content-caption">{{ buildingData.images[0].caption }}</figcaption>
          </figure>

          <h3>结构与工艺精髓</h3>
          <p>在建筑结构上，故宫完美展现了中国榫卯工艺的巅峰。以太和殿为例，其巨大的屋顶重量正是通过复杂的
            
            <el-tooltip
        class="box-item"
        effect="light"
        content="中国木构架建筑特有的结构部件，由方形的“斗”和弓形的“拱”交错叠建而成。它位于立柱和横梁之间，不仅能传递承重，还具有极高的抗震和装饰作用。"
        placement="top-end"
      >
        <span class="glossary-term">斗拱</span>
        </el-tooltip>系统均匀传递到立柱上的。</p>
          
          <figure class="content-figure">
            <div class="content-image-placeholder" style="overflow: hidden;">
                <img src="../../assets/img/Architecture/DouGong.jpg" style="width: 100%; height: auto; " ></img>
            </div>
            <figcaption class="content-caption">{{ buildingData.images[1].caption }}</figcaption>
          </figure>

          <p>太和殿的屋顶采用了最高等级的重檐庑殿顶，而次一级的保和殿则采用了重檐
            <el-tooltip
        class="box-item"
        effect="light"
        content="中国古代建筑的一种屋顶样式，由一条正脊、四条垂脊和四条戗脊组成（俗称九脊殿）。其视觉效果相较庑殿顶更为灵动，等级仅次于庑殿顶。"
        placement="top-start"
      >
        <span class="glossary-term">歇山顶</span>
        </el-tooltip>
            ，这些屋顶形制不仅是审美的体现，更是严格的等级象征。</p>

          <h3>色彩与文化象征</h3>
          <p>红墙黄瓦是紫禁城的标志性色彩搭配。黄色代表中央与皇权，仅限皇家建筑使用；红色则象征尊贵、吉祥与热烈。汉白玉的台基不仅起到了防潮和承重的作用，更在视觉上托举起宏伟的大殿，营造出天上宫阙的意境。</p>
        </div>
      </main>

      <!-- 右侧评论区 -->
      <aside class="comments-section glass-panel">
        <h2 class="comments-title">交流与评论 ({{ comments.length }})</h2>
        <div class="comment-form">
          <textarea 
            v-model="newComment"
            placeholder="分享您对这座建筑的看法..."
          ></textarea>
          <button class="submit-btn" @click="submitComment">发布评论</button>
        </div>
        
        <div class="comment-list">
          <div 
            v-for="(comment, index) in comments" 
            :key="index"
            class="comment-item"
          >
            <div class="comment-user">
              {{ comment.user }} 
              <span class="comment-date">{{ comment.date }}</span>
            </div>
            <div class="comment-text">{{ comment.text }}</div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElTooltip } from 'element-plus'
// 路由实例
const router = useRouter();

// 建筑数据
const buildingData = reactive({
  title: '故宫博物院 (紫禁城)',
  year: '1420年 (明永乐十八年)',
  style: '中国古典宫殿建筑',
  location: '中国北京',
  heroImage:  new URL('../../assets/img/Architecture/PalaceMuseum.jpg', import.meta.url).href,
  officialUrl: 'https://www.dpm.org.cn/',
  wikiUrl: 'https://zh.wikipedia.org/wiki/紫禁城',
  images: [
    {
      placeholder: '[图：北京故宫中轴线平面俯视/示意图]',
      caption: '图1：贯穿紫禁城核心建筑的中央轴线'
    },
    {
      placeholder: '[图：太和殿檐下复杂的斗拱结构特写]',
      caption: '图2：起到承重与防震作用的精巧榫卯斗拱'
    }
  ]
});

// 评论数据
const comments = ref([
  { user: '建筑系学长', date: '10分钟前', text: '歇山顶和庑殿顶的等级区分真的森严，古人在建筑形态上把阶级固化做到了极致。' },
  { user: '故宫重度爱好者', date: '半小时前', text: '推荐大家下雪天去，红墙白雪，那种肃穆感真的是绝了！' },
  { user: '游客A', date: '1小时前', text: '太大了，走了一天腿都快断了，但看到三大殿的那一刻觉得值了。' },
  { user: '结构迷', date: '2小时前', text: '这么庞大的木建筑群，防火在古代绝对是个地狱级难题。' },
  { user: '设计师小李', date: '3小时前', text: '故宫的色彩系统太经典了，红黄蓝绿的搭配放到现在看依然高级。' },
  { user: '历史学者_张', date: '4小时前', text: '仔细看那些脊兽，数量也是有严格规定的，太和殿是唯一有10个脊兽的建筑。' },
  { user: '摄影小白', date: '昨天 09:15', text: '随便一个角落都很出片，特别是光影打在朱红色大门上的时候。' },
  { user: '文物保护志愿者', date: '昨天 11:30', text: '看到有些游客在城墙上刻字真的很心痛，大家一定要爱护古迹啊。' },
  { user: '风水爱好者', date: '昨天 14:20', text: '从风水堪舆的角度来看，紫禁城背山面水，真的是块宝地。' },
  { user: '旅游达人', date: '昨天 16:45', text: '强烈建议租个讲解器或者请个导游，不然真的只是看一堆老房子。' },
  { user: '瓦匠老王', date: '2天前', text: '现在的古建修复越来越难了，老手艺人越来越少，希望这些技艺能传承下去。' },
  { user: '留学生Alice', date: '2天前', text: '第一次带外国朋友去，他们全都被震撼到了，中国古建筑太伟大了。' },
  { user: '细节控', date: '2天前', text: '地上的金砖才是最奢侈的，据说当年烧制一块就要好几年。' },
  { user: '皇家猫奴', date: '3天前', text: '故宫里的御猫也太可爱了吧！一边看古建一边撸猫，完美。' },
  { user: '建筑小白', date: '3天前', text: '弱弱问一句，古代没有起重机，那么粗的柱子是怎么竖起来的？' },
  { user: '纪录片导演', date: '4天前', text: '拍过很多次故宫，每一次都能发现不一样的美，这座城是活的。' },
  { user: '考研党', date: '5天前', text: '为了考建史，把故宫的平面图画了无数遍，闭上眼睛都知道怎么走。' },
  { user: '木建狂人', date: '1周前', text: '太和殿的抗震能力真的令人惊叹，全靠那些精妙的榫卯结构化解了地震的能量。' },
  { user: '历史漫步者', date: '1周前', text: '每次去都能感受到那种“居中为尊”的压迫感和庄严感，古人的空间设计极其到位。' },
  { user: '岁月的痕迹', date: '2周前', text: '站在太和殿广场上，闭上眼睛仿佛能听到几百年前的朝会声。' }
]);

// 新评论
const newComment = ref('');

// 名词解释弹窗
const showPopup = ref(false);
const popupData = reactive({
  title: '',
  description: ''
});
const popupStyle = ref({
  top: '0px',
  left: '0px'
});

// 显示名词解释弹窗
const showTermPopup = (title, description) => {
  popupData.title = title;
  popupData.description = description;
  showPopup.value = true;
  
  // 这里简化处理，实际项目中可以根据点击位置计算弹窗位置
  popupStyle.value = {
    top: '100px',
    left: '50%',
    transform: 'translateX(-50%)'
  };
};

// 关闭弹窗
const closePopup = () => {
  showPopup.value = false;
};

// 发布评论
const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.unshift({
      user: '匿名用户',
      date: '刚刚',
      text: newComment.value.trim()
    });
    newComment.value = '';
  }
};

// 点击页面空白处关闭弹窗
const handleClickOutside = (event) => {
  if (showPopup.value) {
    const popup = document.querySelector('.term-popup');
    if (popup && !popup.contains(event.target) && !event.target.classList.contains('glossary-term')) {
      closePopup();
    }
  }
};

// 监听点击事件
window.addEventListener('click', handleClickOutside);
</script>

<style scoped>
/* 引入传统宋体风格字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

/* ================= 1. 基础样式重置与全局增强 ================= */
* { 
  margin: 0; 
  padding: 0; 
  box-sizing: border-box; 
}

/* ================= 2. 全局背景图片设置 ================= */
.architecture-detail-container {
  /* 定义CSS变量 - 仿照CharacterDetail.vue主题 */
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
  line-height: 1.6; 
  position: relative; 
  min-height: 100vh;
}

/* ================= 3. 内容区域布局与半透明效果 ================= */

/* 公共的半透明与毛玻璃效果样式 */
.glass-panel {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

/* 顶部导航 */
header { 
  background: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 15px 40px; 
  display: flex; 
  align-items: center; 
  position: sticky;
  top: 0;
  z-index: 100; /* 确保在弹窗下方 */
}

.back-btn { 
  text-decoration: none; 
  color: var(--primary-gold); 
  font-weight: 600; 
  margin-right: 20px; 
  font-size: 16px; 
  transition: color 0.2s; 
}

.back-btn:hover { 
  color: var(--gold-hover); 
}

/* 主体布局 */
.container { 
  max-width: 1200px; 
  margin: 30px auto; 
  padding: 0 20px; 
  display: flex; 
  gap: 30px; 
  align-items: flex-start; 
}

/* 左侧内容区域应用半透明效果 */
.building-details { 
  flex: 2; 
  padding: 30px; 
}

/* 顶部主图 */
.hero-image { 
  width: 100%; 
  height: 400px; 
  background-color: rgba(0, 0, 0, 0.3); 
  border-radius: 8px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: var(--text-gray); 
  font-size: 18px; 
  margin-bottom: 25px; 
  border: 1px solid var(--border-color); 
}

.building-title { 
  font-size: 32px; 
  color: #fff; 
  margin-bottom: 10px; 
}

.building-meta { 
  color: var(--text-gray); 
  font-size: 14px; 
  margin-bottom: 15px; 
  display: flex; 
  gap: 20px; 
}

.meta-item strong { 
  color: var(--text-light); 
}

/* 按钮组 */
.action-links { 
  display: flex; 
  gap: 15px; 
  margin-bottom: 25px; 
  padding-bottom: 20px; 
  border-bottom: 1px solid var(--border-color); 
}

.btn-primary, .btn-secondary { 
  text-decoration: none; 
  padding: 8px 18px; 
  border-radius: 6px; 
  font-size: 14px; 
  font-weight: 500; 
  transition: all 0.3s ease; 
  display: inline-flex; 
  align-items: center; 
  cursor: pointer; 
  border-width: 1px; 
  border-style: solid;
}

.btn-primary { 
  background-color: var(--primary-gold); 
  color: #111; 
  border-color: var(--primary-gold); 
}

.btn-primary:hover { 
  background-color: var(--gold-hover); 
  border-color: var(--gold-hover); 
  transform: translateY(-2px); 
}

.btn-secondary { 
  background-color: transparent; 
  color: var(--text-light); 
  border-color: var(--border-color); 
}

.btn-secondary:hover { 
  background-color: rgba(194, 156, 87, 0.1); 
  border-color: var(--primary-gold); 
  transform: translateY(-2px); 
}

/* 正文排版 */
.building-content h3 { 
  font-size: 20px; 
  color: var(--primary-gold); 
  margin: 25px 0 15px; 
  border-left: 4px solid var(--primary-gold); 
  padding-left: 10px; 
}

.building-content p { 
  color: var(--text-gray); 
  margin-bottom: 20px; 
  text-align: justify; 
  line-height: 1.8; 
  font-size: 15px; 
}

/* 正文内插图样式 */
.content-figure { 
  margin: 25px 0; 
  width: 100%; 
  text-align: center; 
}

.content-image-placeholder { 
  width: 100%; 
  height: 280px; 
  background-color: rgba(0, 0, 0, 0.3); 
  border-radius: 8px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  color: var(--text-gray); 
  font-size: 15px; 
  margin-bottom: 12px; 
  border: 1px dashed var(--border-color); 
}

.content-caption { 
  font-size: 13px; 
  color: var(--primary-gold); 
  font-style: italic; 
}

/* 专业名词高亮样式 */
.glossary-term { 
  color: var(--primary-gold); 
  font-weight: 600; 
  border-bottom: 1px dashed var(--primary-gold); 
  cursor: pointer; 
  position: relative; 
  transition: color 0.2s, background-color 0.2s; 
  padding: 0 2px; 
}

.glossary-term:hover { 
  background-color: rgba(194, 156, 87, 0.1); 
  border-bottom: 1px solid var(--primary-gold); 
}

/* 全局弹窗样式 */
.term-popup { 
  position: fixed; 
  width: 260px; 
  background-color: var(--card-bg); 
  color: var(--text-light); 
  border: 1px solid var(--border-color);
  padding: 15px; 
  border-radius: 8px; 
  box-shadow: 0 8px 20px rgba(0,0,0,0.5); 
  font-size: 14px; 
  line-height: 1.5; 
  z-index: 1000; 
  opacity: 0; 
  visibility: hidden; 
  transition: opacity 0.2s ease, transform 0.2s ease; 
  transform: translateY(10px); 
  pointer-events: none; 
}

.term-popup.active { 
  opacity: 1; 
  visibility: visible; 
  transform: translateY(0); 
  pointer-events: auto; 
}

.term-popup h4 { 
  color: var(--primary-gold); 
  margin-bottom: 8px; 
  font-size: 16px; 
  border-bottom: 1px solid var(--border-color); 
  padding-bottom: 5px; 
}

.term-popup::after { 
  content: ''; 
  position: absolute; 
  bottom: -6px; 
  left: 50%; 
  transform: translateX(-50%); 
  border-width: 6px 6px 0; 
  border-style: solid; 
  border-color: var(--border-color) transparent transparent transparent; 
}

/* ================= 右侧评论区 ================= */
.comments-section { 
  flex: 1; 
  padding: 25px; 
  position: sticky; 
  top: 80px; /* 增加一点顶部间距，避开半透明导航栏 */
  max-height: calc(90vh - 80px); /* 限制最大高度，减去顶部间距 */
  overflow-y: auto; 
}

/* 自定义滚动条样式 */
.comments-section::-webkit-scrollbar { 
  width: 6px; 
}

.comments-section::-webkit-scrollbar-track { 
  background: rgba(0, 0, 0, 0.3); 
  border-radius: 4px; 
}

.comments-section::-webkit-scrollbar-thumb { 
  background: var(--border-color); 
  border-radius: 4px; 
}

.comments-section::-webkit-scrollbar-thumb:hover { 
  background: var(--primary-gold); 
}

.comments-title { 
  font-size: 20px; 
  color: var(--primary-gold); 
  margin-bottom: 20px; 
  padding-bottom: 10px; 
  border-bottom: 1px solid var(--border-color); 
}

.comment-form { 
  display: flex; 
  flex-direction: column; 
  gap: 10px; 
  margin-bottom: 30px; 
}

.comment-form textarea { 
  width: 100%; 
  height: 80px; 
  padding: 10px; 
  border: 1px solid var(--border-color); 
  border-radius: 6px; 
  resize: none; 
  outline: none; 
  background-color: rgba(0, 0, 0, 0.3); 
  color: var(--text-light);
  font-family: inherit; 
}

.comment-form textarea:focus { 
  border-color: var(--primary-gold); 
  background-color: rgba(0, 0, 0, 0.5); 
}

.submit-btn { 
  align-self: flex-end; 
  padding: 8px 20px; 
  background-color: var(--primary-gold); 
  color: #111; 
  border: none; 
  border-radius: 6px; 
  cursor: pointer; 
  transition: background-color 0.2s; 
}

.submit-btn:hover { 
  background-color: var(--gold-hover); 
}

.comment-item { 
  background-color: rgba(0, 0, 0, 0.3); 
  padding: 15px; 
  border-radius: 8px; 
  border-left: 3px solid var(--border-color); 
  margin-bottom: 15px; 
  transition: background-color 0.2s; 
}

.comment-item:hover { 
  background-color: rgba(194, 156, 87, 0.1); 
  border-left-color: var(--primary-gold);
}

.comment-user { 
  font-weight: 600; 
  font-size: 14px; 
  margin-bottom: 5px; 
  display: flex; 
  justify-content: space-between; 
  color: var(--text-light); 
}

.comment-date { 
  color: var(--text-gray); 
  font-size: 12px; 
  font-weight: normal; 
}

.comment-text { 
  font-size: 14px; 
  color: var(--text-gray); 
}

/* 响应式适配 */
@media (max-width: 768px) {
  header { 
    padding: 15px 20px; 
  }
  
  .container { 
    flex-direction: column; 
    margin: 20px auto; 
  }
  
  .comments-section { 
    position: static; 
    width: 100%; 
    max-height: none; 
    overflow-y: visible; 
    margin-top: 20px; 
  }
  
  .action-links { 
    flex-direction: column; 
    gap: 10px; 
  }
  
  .btn-primary, .btn-secondary { 
    width: 100%; 
    justify-content: center; 
  }
  
  .hero-image { 
    height: 250px; 
  }
  
  .building-title { 
    font-size: 26px; 
  }
  
  .building-meta { 
    flex-direction: column; 
    gap: 5px; 
  }
}
</style>