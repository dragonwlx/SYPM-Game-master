<template>
  <div class="personal-center-container">
    <!-- 1. 登录模块 -->
    <section v-if="!isLoggedIn" class="login-section glass-panel">
      <h2>欢迎登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="loginForm.username"
            placeholder="请输入用户名"
            required
          >
        </div>
        <div class="input-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password"
            placeholder="请输入密码"
            required
          >
        </div>
        <div v-if="loginError" class="error-message">
          {{ loginError }}
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">登 录</button>
      </form>
      <!-- <p class="login-hint">
        (登录账号：admin，密码：admin)
      </p> -->
    </section>

    <!-- 2. 个人中心主界面 -->
    <section v-else class="dashboard-section glass-panel">
        <!-- 左侧导航栏 -->
        <aside class="sidebar">
            <div class="user-info-mini">
                <h3>{{ userInfo.username }}</h3>
                <p>ID: {{ userInfo.id }}</p>
            </div>
            <ul class="nav-menu">
                <li 
                  v-for="menuItem in menuItems" 
                  :key="menuItem.id"
                  class="nav-item"
                  :class="{ active: activeMenuItem === menuItem.id }"
                  @click="selectMenuItem(menuItem.id)"
                >
                  {{ menuItem.name }}
                </li>
            </ul>
            <button class="logout-btn" @click="handleLogout">退出登录</button>
        </aside>

        <!-- 右侧内容展示区 -->
        <main class="content-area">
            <div class="content-header">
                <h2>{{ currentMenuItem?.name || '个人中心' }}</h2>
            </div>
            <div class="content-body">
                <!-- 个人资料 -->
                <div v-if="activeMenuItem === 'profile'" class="profile-content">
                    <div class="card">
                        <h4>账户概况</h4>
                        <p>欢迎您回来！您的账户状态正常，会员等级为 <strong>建筑专家</strong>。</p>
                        <p>注册时间：2026-01-15</p>
                        <p>最后登录：刚刚</p>
                    </div>
                    <div class="card">
                        <h4>快速统计</h4>
                        <p>收藏建筑：12 | 评论数：45 | 浏览时长：120 小时</p>
                    </div>
                </div>

                <!-- 我的评论 -->
                <div v-if="activeMenuItem === 'comments'" class="comments-content">
                    <div v-for="(comment, index) in userComments" :key="index" class="card">
                        <h4>评论 #{{ comment.id }}</h4>
                        <p>发布于《{{ comment.building }}》</p>
                        <p class="comment-text">{{ comment.content }}</p>
                        <p class="comment-date">{{ comment.date }}</p>
                    </div>
                </div>

                <!-- 我的收藏 -->
                <div v-if="activeMenuItem === 'favorites'" class="favorites-content">
                    <div v-for="(favorite, index) in userFavorites" :key="index" class="card">
                        <h4>{{ favorite.emoji }} {{ favorite.name }}</h4>
                        <p>{{ favorite.type }} / {{ favorite.status }}</p>
                    </div>
                </div>

                <!-- 建筑浏览 -->
                <div v-if="activeMenuItem === 'buildings'" class="buildings-content">
                    <div v-for="(building, index) in recentBuildings" :key="index" class="card">
                        <h4>{{ building.name }}</h4>
                        <p>浏览进度：{{ building.progress }}%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" :style="{ width: building.progress + '%' }"></div>
                        </div>
                        <p class="progress-date">{{ building.date }}</p>
                    </div>
                </div>

                <!-- 学习记录 -->
                <div v-if="activeMenuItem === 'learning'" class="learning-content">
                    <div v-for="(course, index) in learningCourses" :key="index" class="card">
                        <h4>{{ course.name }}</h4>
                        <p>课程进度：{{ course.progress }}%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                        </div>
                        <p class="course-date">{{ course.date }}</p>
                    </div>
                </div>

                <!-- 上传管理 -->
                <div v-if="activeMenuItem === 'uploads'" class="uploads-content">
                    <div v-for="(upload, index) in userUploads" :key="index" class="card">
                        <h4>{{ upload.emoji }} {{ upload.name }}</h4>
                        <p>类型：{{ upload.type }} | 大小：{{ upload.size }} | 浏览量：{{ upload.views }}</p>
                    </div>
                </div>

                <!-- 设置 -->
                <div v-if="activeMenuItem === 'settings'" class="settings-content">
                    <div class="card">
                        <h4>修改密码</h4>
                        <div class="input-group">
                            <label>当前密码</label>
                            <input type="password" v-model="passwordForm.current" placeholder="••••••">
                        </div>
                        <div class="input-group">
                            <label>新密码</label>
                            <input type="password" v-model="passwordForm.new" placeholder="••••••">
                        </div>
                        <button class="btn btn-primary" @click="updatePassword">保存更改</button>
                    </div>
                    <div class="card">
                        <h4>通知设置</h4>
                        <p><input type="checkbox" v-model="notificationSettings.email" checked> 接收邮件通知</p>
                        <p><input type="checkbox" v-model="notificationSettings.system" checked> 接收系统更新推送</p>
                    </div>
                </div>
            </div>
        </main>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

// 登录状态
const isLoggedIn = ref(false);
const loginForm = reactive({ username: '', password: '' });
const loginError = ref('');

// 用户信息
const userInfo = reactive({
  username: '建筑专家',
  id: 'ARCH-2026-001'
});

// 菜单数据
const menuItems = ref([
  { id: 'profile', name: '个人中心' },
  { id: 'comments', name: '我的评论' },
  { id: 'favorites', name: '我的收藏' },
  { id: 'buildings', name: '建筑浏览' },
  { id: 'learning', name: '学习记录' },
  { id: 'uploads', name: '上传管理' },
  { id: 'settings', name: '设置' }
]);

// 当前激活的菜单
const activeMenuItem = ref('profile');

// 计算当前菜单项
const currentMenuItem = computed(() => {
  return menuItems.value.find(item => item.id === activeMenuItem.value);
});

// 我的评论数据
const userComments = ref([
  {
    id: '1024',
    building: '故宫博物院',
    content: '故宫的斗拱结构真的太精妙了，体现了中国古代建筑的智慧。',
    date: '2026-10-01'
  },
  {
    id: '1023',
    building: '悉尼歌剧院',
    content: '建筑造型独特，与周围环境融为一体，不愧是现代建筑的杰作。',
    date: '2026-09-28'
  }
]);

// 我的收藏数据
const userFavorites = ref([
  {
    emoji: '🏛️',
    name: '故宫博物院',
    type: '古代建筑',
    status: '已收藏'
  },
  {
    emoji: '🏢',
    name: '上海中心大厦',
    type: '现代建筑',
    status: '已收藏'
  },
  {
    emoji: '🏰',
    name: '巴黎圣母院',
    type: '哥特式建筑',
    status: '已收藏'
  }
]);

// 最近浏览的建筑
const recentBuildings = ref([
  {
    name: '故宫博物院',
    progress: 75,
    date: '2026-10-05'
  },
  {
    name: '悉尼歌剧院',
    progress: 90,
    date: '2026-10-04'
  }
]);

// 学习课程
const learningCourses = ref([
  {
    name: '中国古代建筑史',
    progress: 60,
    date: '2026-10-03'
  },
  {
    name: '现代建筑设计原理',
    progress: 35,
    date: '2026-10-02'
  }
]);

// 上传文件
const userUploads = ref([
  {
    emoji: '📷',
    name: '故宫太和殿照片.jpg',
    type: '图片',
    size: '2.4MB',
    views: 120
  },
  {
    emoji: '📋',
    name: '建筑分析报告.pdf',
    type: '文档',
    size: '1.8MB',
    views: 85
  }
]);

// 设置表单
const passwordForm = reactive({
  current: '',
  new: ''
});

const notificationSettings = reactive({
  email: true,
  system: true
});

// 处理登录
const handleLogin = () => {
  if (loginForm.username === 'admin' && loginForm.password === 'admin') {
    isLoggedIn.value = true;
    loginError.value = '';
    // 保存登录状态到localStorage
    localStorage.setItem('userToken', JSON.stringify({
      username: loginForm.username,
      token: 'mock-token-' + Date.now(),
      id: userInfo.id
    }));
  } else {
    loginError.value = '用户名或密码错误，请使用 admin/admin 登录';
  }
};

// 处理退出登录
const handleLogout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem('userToken');
  loginForm.username = '';
  loginForm.password = '';
};

// 选择菜单项
const selectMenuItem = (menuId) => {
  activeMenuItem.value = menuId;
};

// 更新密码
const updatePassword = () => {
  if (passwordForm.current && passwordForm.new) {
    // 这里可以添加密码更新逻辑
    alert('密码更新成功！');
    passwordForm.current = '';
    passwordForm.new = '';
  } else {
    alert('请输入完整的密码信息');
  }
};

// 初始化检查登录状态
onMounted(() => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    isLoggedIn.value = true;
  }
});
</script>

<style scoped>
/* --- 全局重置与基础样式 --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', 'Noto Sans CJK SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.personal-center-container {
  min-height: 100vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
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

/* --- 登录模块 --- */
.login-section {
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-section h2 {
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 24px;
}

/* --- 个人中心主布局 --- */
.dashboard-section {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

/* 左侧导航栏 */
.sidebar {
  width: 250px;
  background-color: #f9fafb;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.user-info-mini {
  padding: 0 20px 20px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 10px;
}

.user-info-mini h3 {
  font-size: 1.1rem;
  margin-bottom: 4px;
  color: #2c3e50;
}

.user-info-mini p {
  font-size: 0.85rem;
  color: #6b7280;
}

.nav-menu {
  list-style: none;
  flex: 1;
  overflow-y: auto;
}

.nav-item {
  padding: 12px 20px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
  border-left: 3px solid transparent;
  font-size: 0.95rem;
}

.nav-item:hover {
  background-color: #eef2ff;
  color: #3498db;
}

.nav-item.active {
  background-color: #eef2ff;
  color: #3498db;
  border-left-color: #3498db;
  font-weight: 600;
}

.logout-btn {
  margin: 20px;
  padding: 10px;
  background: #fee2e2;
  color: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background: #fecaca;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  background-color: white;
}

.content-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.content-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
}

/* 卡片样式 */
.card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card h4 {
  margin-bottom: 10px;
  color: #2c3e50;
  font-size: 1.1rem;
}

.card p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* 评论样式 */
.comment-text {
  font-style: italic;
  margin: 10px 0;
}

.comment-date {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 10px;
}

/* 进度条样式 */
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #e5e7eb;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #3498db;
  width: 0%;
  transition: width 0.5s ease;
}

.progress-date {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 5px;
}

/* 输入组样式 */
.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #6b7280;
  font-size: 0.9rem;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-group input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

/* 按钮样式 */
.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  border: 1px solid #3498db;
  box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

/* 错误消息 */
.error-message {
  color: #ef4444;
  font-size: 0.9rem;
  margin: 10px 0;
}

/* 登录提示 */
.login-hint {
  margin-top: 15px;
  font-size: 0.8rem;
  color: #9ca3af;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .personal-center-container {
    padding: 10px;
  }
  
  .dashboard-section {
    flex-direction: column-reverse;
    height: 95vh;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
  }
  
  .user-info-mini {
    display: none;
  }
  
  .nav-menu {
    display: flex;
    overflow-x: auto;
  }
  
  .nav-item {
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
    padding: 8px 15px;
  }
  
  .nav-item.active {
    border-left: none;
    border-bottom-color: #3498db;
  }
  
  .logout-btn {
    display: none;
  }
  
  .content-area {
    padding: 20px;
  }
  
  .login-section {
    padding: 30px;
  }
}

/* 平板端适配 */
@media (max-width: 1024px) {
  .sidebar {
    width: 200px;
  }
  
  .content-area {
    padding: 30px;
  }
  
  .card {
    padding: 15px;
  }
}
</style>