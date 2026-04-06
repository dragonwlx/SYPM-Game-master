import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/history",
    name: "History",
    meta: {
      title: "历程",
    },
    children: [
      {
        path: "event",
        name: "Event",
        component: () => import("../views/History/Event.vue"),
        meta: {
          title: "事件",
        },
      },
      {
        path: "architecture",
        name: "Architecture",
        component: () => import("../views/History/Architecture.vue"),
        meta: {
          title: "建筑",
        },
      },
      {
        path: "character",
        name: "Character",
        component: () => import("../views/History/Character.vue"),
        meta: {
          title: "人物",
        },
      },
      {
        path: "character-detail",
        name: "CharacterDetail",
        component: () => import("../views/History/CharacterDetail.vue"),
        meta: null
      },
    ],
  },
  {
    path: "/architectureDetail",
    name: "ArchitectureDetail",
    component: () => import("../views/History/ArchitectureDetail.vue"),
    
  },
  {
    path:"/showSomeArchitecture",
    name:"ShowSomeArchitecture",
    component: () => import("../views/History/ShowSomeArchitecture.vue"),
    
  },

  {
    path: "/info",
    name: "Info",
    meta: {
      title: "信息",
    },
    children: [
      {
        path: "news",
        name: "News",
        component: () => import("../views/Info/News.vue"),
        meta: {
          title: "资讯",
        },
      },
      {
        path: "news-detail",
        name: "NewsDetail",
        component: () => import("../views/Info/NewsDetail.vue"),
        
      },
      {
        path: "academic",
        name: "Academic",
        component: () => import("../views/Info/Academic.vue"),
        meta: {
          title: "学术",
        },
      },
      {
        path: "protect",
        name: "Protect",
        component: () => import("../views/Info/Protect.vue"),
        meta: {
          title: "古建保护",
        },
      },
    ],
  },
  {
    path: "/badazuo",
    name: "Badazuo",
    component: () => import("../views/BaDaZuo/index.vue"),
    meta: {
      title: "八大作",
    },
  },
  {
    path: "/wencuang",
    name: "WenChuang",
    component: () => import("../views/WenChuang/index.vue"),
    meta: {
      title: "文创",
    },
  },
  {
    path: "/game",
    name: "Game",
    component: () => import("../views/Game/index.vue"),
    meta: {
      title: "游戏",
    },
  },
  {
    path:"/personalCenter",
    name:"PersonalCenter",
    component: () => import("../views/PersonalCenter/index.vue"),
    meta: {
      title: "个人中心",
    },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 1. 所有路由跳转后，滚动到页面顶部（x=0 水平，y=0 垂直）
    return { top: 0, left: 0 }
  }
});

export default router;
