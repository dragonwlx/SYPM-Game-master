<template>
  <div class="architecture-container">
    <!-- 主体内容区域 -->
    <div class="main-content" >

        <!-- 左侧分类导航 -->
      <div class="sidebar">
        <div class="sidebar-title">建筑分类</div>
        <nav class="category-nav">
          <ul>
            <!-- 父分类 -->
            <li v-for="category in categories" :key="category.id" class="parent-category">
              <div
                class="parent-category-header"
                @click="toggleCategory(category.id)"
              >
                <span class="category-name">{{ category.name }}</span>
                <span class="expand-icon">{{ expandedCategories.includes(category.id) ? '▼' : '▶' }}</span>
              </div>
              <!-- 子分类 -->
              <ul v-if="expandedCategories.includes(category.id)" class="sub-categories">
                <li v-for="subCategory in category.children" :key="subCategory.id">
                  <a
                    href="#"
                    :class="{ active: isSubCategorySelected(subCategory.id) }"
                    @click.prevent="toggleSubCategory(subCategory.id)"
                  >
                    {{ subCategory.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- 清除选择按钮 -->
        <div v-if="selectedCategories.length > 0" class="clear-selection" @click="selectedCategories = []">
          清除选择
        </div>
      </div>

      <!-- 右侧主内容 -->
      <div class="content-area" style="margin-left: 30px;">
        <!-- 搜索框区域 -->
        <div class="search-section">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="输入建筑名称、风格或地点..."
            >
            <button @click="performSearch">搜索</button>
          </div>
        </div>

        <h2 class="section-title">精选建筑探索</h2>

        <div class="building-grid">
          <article
            v-for="building in filteredBuildings"
            :key="building.id"
            class="building-card"
          >
            <div class="card-image"><img :src="building.imagePlaceholder" :alt="building.title" style="width: 100%; height: 100%; overflow: hidden;">
            </div>
            <div class="card-content">
              <h3>{{ building.title }}</h3>
              <p>{{ building.description }}</p>
              <a href="#" class="enter-btn" @click.prevent="enterBuilding(building.id)">进入探索</a>
            </div>
          </article>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {useRouter} from 'vue-router'
const router = useRouter()
// 分类数据 - 嵌套结构
const categories = ref([
  {
    id: 'time',
    name: '时间分期',
    children: [
      { id: 'ancient', name: '原始社会及先秦时期' },
      { id: 'qinhan', name: '秦汉时期' },
      { id: 'weijin', name: '魏晋南北朝时期' },
      { id: 'suiyuan', name: '隋唐五代时期' },
      { id: 'songyuan', name: '宋辽金元时期' },
      { id: 'mingqing', name: '明清时期' }
    ]
  },
  {
    id: 'region',
    name: '地域流派',
    children: [
      { id: 'wan', name: '皖派（徽派）建筑' },
      { id: 'min', name: '闽派（红砖）建筑' },
      { id: 'jing', name: '京派（北方）建筑' },
      { id: 'su', name: '苏派（园林）建筑' },
      { id: 'jin', name: '晋派（晋中）建筑' },
      { id: 'chuan', name: '川派（西南）建筑' }
    ]
  },
  {
    id: 'function',
    name: '社会功能与类型',
    children: [
      { id: 'palace', name: '宫廷建筑' },
      { id: 'sacrifice', name: '祭祀建筑' },
      { id: 'religion', name: '宗教建筑' },
      { id: 'residence', name: '民居建筑' },
      { id: 'garden', name: '园林建筑' },
      { id: 'defense', name: '防御/交通' }
    ]
  }
]);

// 建筑数据 - 支持多分类
const buildings = ref([
    {
    id: 1,
    title: '故宫博物院',
    description: '世界现存最大、最完整的木质结构古建筑群，展现了中国明清时期宫廷建筑的宏伟。',
    imagePlaceholder:  new URL('../../assets/img/Architecture/PalaceMuseum.jpg', import.meta.url).href,
    categories: ['mingqing', 'jing', 'palace']
  },
  {
    id: 2,
    title: '悉尼歌剧院',
    description: '表现主义风格的杰作，以其独特的帆船形屋顶闻名于世，是现代建筑的标志性作品。',
    imagePlaceholder: '[建筑图片 2]',
    categories: ['modern', 'su', 'garden']
  },
  
  {
    id: 3,
    title: '巴黎圣母院',
    description: '典型的哥特式基督教教堂建筑，以其华丽的玫瑰窗和飞扶壁结构著称。',
    imagePlaceholder: '[建筑图片 3]',
    categories: ['weijin', 'religion']
  },
  {
    id: 4,
    title: '流水别墅',
    description: '有机建筑的代表作，巧妙地将现代建筑结构与周围的自然瀑布环境融为一体。',
    imagePlaceholder: '[建筑图片 4]',
    categories: ['modern', 'garden']
  },
  {
    id: 5,
    title: '哈利法塔',
    description: '目前世界最高的人造建筑，其设计融合了伊斯兰建筑元素与现代工程技术的巅峰。',
    imagePlaceholder: '[建筑图片 5]',
    categories: ['modern', 'defense']
  },
  {
    id: 6,
    title: '罗马斗兽场',
    description: '古罗马文明的象征，展现了卓越的拱门技术和宏大的圆形剧场设计理念。',
    imagePlaceholder: '[建筑图片 6]',
    categories: ['qinhan', 'defense']
  }
]);

// 响应式数据
const expandedCategories = ref([]); // 展开的父分类
const selectedCategories = ref([]); // 选中的子分类
const searchQuery = ref('');

// 计算属性：根据分类和搜索过滤建筑
const filteredBuildings = computed(() => {
  return buildings.value.filter(building => {
    // 分类过滤
    const categoryMatch = selectedCategories.value.length === 0 || 
      selectedCategories.value.some(cat => building.categories.includes(cat));
    // 搜索过滤
    const searchMatch = !searchQuery.value || 
      building.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      building.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return categoryMatch && searchMatch;
  });
});

// 方法：切换父分类展开/收起
const toggleCategory = (categoryId) => {
  const index = expandedCategories.value.indexOf(categoryId);
  if (index > -1) {
    expandedCategories.value.splice(index, 1);
  } else {
    expandedCategories.value.push(categoryId);
  }
};

// 方法：切换子分类选择
const toggleSubCategory = (subCategoryId) => {
  const index = selectedCategories.value.indexOf(subCategoryId);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(subCategoryId);
  }
};

// 方法：判断子分类是否被选中
const isSubCategorySelected = (subCategoryId) => {
  return selectedCategories.value.includes(subCategoryId);
};

// 方法：执行搜索
const performSearch = () => {
  // 搜索逻辑已经在计算属性中处理
  console.log('搜索:', searchQuery.value);
};

// 方法：进入建筑详情
const enterBuilding = (buildingId) => {
  console.log('进入建筑:', buildingId);
  router.push("/architectureDetail")
  // 实际项目中可以跳转到建筑详情页
};
</script>

<style scoped>
/* 引入传统宋体风格字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.architecture-container {
  /* 定义CSS变量 - 仿照Character.vue主题 */
  --primary-gold: #C29C57;
  --gold-hover: #E3BE77;
  --bg-dark: #1E1B19;
  --card-bg: rgba(35, 30, 25, 0.85);
  --text-light: #E2D5C5;
  --text-gray: #9A948C;
  --border-color: rgba(194, 156, 87, 0.3);

  background-color: var(--bg-dark);
  /* 模拟传统纹理的深色底纹 */
  background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 2px, transparent 2px, transparent 4px);
  color: var(--text-light);
  font-family: 'Noto Serif SC', 'SimSun', serif;
  min-height: 100vh;
  padding: 40px 20px;
}

/* 主内容区域 - 左右分栏 */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

/* 左侧内容区域 */
.content-area {
  flex: 1;
  min-width: 0;
}

/* 搜索框区域 */
.search-section {
  transform: translate(150px);
  padding: 20px;
  border-radius: 12px;

  background: var(--card-bg);
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  max-width: 500px;
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--primary-gold);
  border-radius: 25px 0 0 25px;
  outline: none;
  font-size: 14px;
  color: var(--text-light);
  font-family: 'Noto Serif SC', serif;
  transition: border-color 0.3s;
}

.search-bar input::placeholder {
  color: var(--text-gray);
}

.search-bar input:focus {
  border-color: var(--gold-hover);
}

.search-bar button {
  padding: 12px 24px;
  background-color: var(--primary-gold);
  color: #111;
  border: 2px solid var(--primary-gold);
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.search-bar button:hover {
  background-color: var(--gold-hover);
}

.section-title {
  margin-bottom: 25px;
  font-size: 24px;
  color: var(--primary-gold);
  border-left: 4px solid var(--primary-gold);
  padding-left: 10px;
}

/* 建筑卡片网格 */
.building-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.building-card {
  background: linear-gradient(to right, rgba(40, 35, 30, 0.9), rgba(30, 25, 20, 0.6));
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.building-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.5);
  border-color: var(--primary-gold);
}

/* 占位图片样式 */
.card-image {
  height: 150px;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-gray);
  font-size: 14px;
  border-bottom: 1px solid var(--border-color);
}

.card-content {
  padding: 15px;
}

.card-content h3 {
  margin-bottom: 8px;
  color: #fff;
  font-size: 16px;
}

.card-content p {
  color: var(--text-gray);
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 15px;
}

.enter-btn {
  display: inline-block;
  text-decoration: none;
  color: var(--primary-gold);
  font-weight: 600;
  font-size: 14px;
  transition: color 0.3s;
}

.enter-btn:hover {
  color: var(--gold-hover);
}

.enter-btn::after {
  content: ' →';
}

/* 右侧分类导航 */
.sidebar {
  width: 280px;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 25px;
  position: sticky;
  top: 40px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-gold);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.category-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 父分类样式 */
.parent-category {
  margin-bottom: 4px;
}

.parent-category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.parent-category-header:hover {
  background: rgba(194, 156, 87, 0.1);
  border-color: var(--border-color);
  transform: translateX(2px);
}

.category-name {
  font-weight: 600;
  color: var(--text-light);
}

.expand-icon {
  font-size: 12px;
  color: var(--primary-gold);
  transition: transform 0.3s ease;
}

/* 子分类样式 */
.sub-categories {
  margin-top: 4px;
  margin-left: 15px;
  animation: slideDown 0.3s ease;
}

.sub-categories li {
  margin-bottom: 2px;
}

.sub-categories a {
  text-decoration: none;
  color: var(--text-gray);
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: block;
  font-size: 14px;
}

.sub-categories a:hover, .sub-categories a.active {
  background: var(--primary-gold);
  color: #111;
  transform: translateX(3px);
}

/* 清除选择按钮 */
.clear-selection {
  margin-top: 20px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-gray);
  transition: all 0.3s ease;
}

.clear-selection:hover {
  background: rgba(194, 156, 87, 0.1);
  border-color: var(--primary-gold);
  color: var(--text-light);
}

/* 动画效果 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    gap: 30px;
  }
  
  .sidebar {
    width: 100%;
    position: static;
  }
  
  .parent-category-header {
    padding: 10px 12px;
  }
  
  .sub-categories {
    margin-left: 10px;
  }
  
  .sub-categories a {
    padding: 6px 10px;
    font-size: 13px;
  }
}

@media (max-width: 1024px) {
  .building-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .architecture-container {
    padding: 20px 15px;
  }
  
  .search-section {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .search-bar {
    max-width: 100%;
  }
  
  .search-bar input {
    padding: 10px 14px;
  }
  
  .search-bar button {
    padding: 10px 20px;
  }
  
  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  .building-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .sidebar {
    padding: 20px;
  }
  
  .category-nav ul {
    gap: 6px;
  }
  
  .category-nav a {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>