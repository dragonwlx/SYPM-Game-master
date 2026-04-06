<template>
  <nav class="navbar">
    <div class="navbar-left">
      <img src="../assets/img/common/logo.png" alt="Logo" class="navbar-logo" />
    </div>
    <div class="hamburger-menu" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="navbar-right" :class="{ active: isMenuOpen }">
      <!-- 动态生成导航项 -->
      <div
        v-for="(route, index) in routes"
        :key="route.path"
        class="nav-item-container"
      >
        <!-- 一级路由 -->
        <div
          v-if="!route.children || route.children.length === 0"
          class="nav-item"
        >
          <a
            v-if="route.path != '/personalCenter'"
            :href="`#${route.path}`"
            @click.prevent="scrollToElement(route.name)"
            style="color: white"
            >{{ route.meta.title }}</a
          >
          <a v-else :href="`#${route.path}`" style="color: white">{{
            route.meta.title
          }}</a>
        </div>

        <!-- 二级路由（带气泡菜单） -->
        <div
          v-else
          class="nav-item with-dropdown"
          @mouseenter="showDropdown(route.path)"
          @mouseleave="startHideTimer(route.path)"
        >
          <a
            v-if="route.path != '/personalCenter'"
            :href="`#${route.path}`"
            @click.prevent="scrollToElement(route.name)"
            style="color: white"
            >{{ route.meta.title }}</a
          >
          <a v-else :href="`#${route.path}`" style="color: white">{{
            route.meta.title
          }}</a>
          <!-- 气泡菜单 -->
          <div
            v-if="showingDropdown === route.path"
            class="dropdown-menu"
            @mouseenter="clearHideTimer"
            @mouseleave="startHideTimer(route.path)"
          >
            <template
              v-for="childRoute in route.children"
              :key="childRoute.path"
            >
              <div
                v-if="childRoute.meta?.title"
                class="dropdown-item"
                @click="navigateTo(route.path + '/' + childRoute.path)"
              >
                {{ childRoute.meta.title }}
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- 非路由导航项 -->
      <img
        src="../assets/img/common/search.png"
        alt="Search"
        class="search-icon"
      />
      <!-- <a href="#lang" class="nav-item">Language</a> -->
      <div class="music-icon" id="music-toggle" @click="toggleMusic">
        <img
          v-if="isMusicPlaying"
          src="../assets/img/common/pause.svg"
          alt="Music"
          class="music-icon-svg"
        />
        <img
          v-else
          src="../assets/img/common/play.svg"
          alt="Music"
          class="music-icon-svg"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import router from "../router";
const music = new Audio();
music.src = "../assets/audio/bg-page.mp3";
export default {
  name: "Navbar",
  data() {
    return {
      isMenuOpen: false,
      isMusicPlaying: false,
      currentAudio: null,
      showingDropdown: null,
      hideTimer: null,
    };
  },
  computed: {
    // 从路由配置中获取导航项
    routes() {
      return router.options.routes.filter(
        (route) => route.meta && route.meta.title,
      );
    },
  },
  methods: {
    scrollToElement(selector) {
      const element = document.querySelector("#" + selector);
      console.log(element);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    toggleMusic() {
      // 这里可以添加音乐控制逻辑
      music.volume = 0.5;

      if (this.isMusicPlaying === true) {
        this.isMusicPlaying = false;
        music.pause();
      } else {
        this.isMusicPlaying = true;
        music.play();
      }
    },
    // 导航到指定路由
    navigateTo(path) {
      this.closeMenu();
      router.push(path);
    },
    // 显示下拉菜单
    showDropdown(routePath) {
      // 清除可能存在的隐藏定时器
      this.clearHideTimer();
      this.showingDropdown = routePath;
    },
    // 开始隐藏定时器
    startHideTimer(routePath) {
      // 清除之前的定时器
      this.clearHideTimer();
      // 设置新的定时器，延迟300毫秒隐藏菜单
      this.hideTimer = setTimeout(() => {
        if (this.showingDropdown === routePath) {
          this.showingDropdown = null;
        }
      }, 300);
    },
    // 清除隐藏定时器
    clearHideTimer() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
      }
    },
  },
};
</script>

<style scoped>
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

.navbar-logo {
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
}

.navbar-right {
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item-container {
  position: relative;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 20px;
  transition: opacity 0.3s;
  cursor: pointer;
  display: inline-block;
  padding: 8px 0;
}

.nav-item:hover {
  opacity: 0.8;
}

/* 带下拉菜单的导航项 */
.nav-item.with-dropdown {
  position: relative;
  padding-right: 15px;
}

.nav-item.with-dropdown::after {
  content: "▼";
  font-size: 10px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.7;
}

/* 气泡菜单样式 */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: -150%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  padding: 8px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  z-index: 1001;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: dropdownFadeIn 0.3s ease;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: auto;
  max-width: calc(100vw - 100px);
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
    height: 20px;
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
    gap: 0;
  }

  .navbar-right.active {
    right: 0;
  }

  .nav-item-container {
    width: 100%;
  }

  .nav-item {
    padding: 15px 20px;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    font-size: 16px;
  }

  .nav-item.with-dropdown {
    padding-right: 30px;
  }

  /* 移动端下拉菜单 */
  .dropdown-menu {
    position: static;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0;
    padding: 0 20px;
    margin-top: 0;
    animation: none;
  }

  .dropdown-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .search-icon {
    margin: 15px 20px;
    align-self: flex-start;
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

/* 自定义滚动条样式 */
.dropdown-menu::-webkit-scrollbar {
  height: 4px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
