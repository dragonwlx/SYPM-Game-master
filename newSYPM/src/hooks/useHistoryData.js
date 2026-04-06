// 历史数据hook - 用于模拟新闻/公告列表数据
import { ref } from 'vue'

export function useHistoryData() {
  // 模拟新闻/公告列表数据
  const newsList = ref([
    {
      id: 1,
      title: '【新闻】故宫博物院发布"古建保护"新成果',
      time: '2026-03-15',
      type: 'news'
    },
    {
      id: 2,
      title: '【公告】关于组织开展"传统建筑技艺' + '传承活动的通知',
      time: '2026-03-14',
      type: 'announcement'
    },
    {
      id: 3,
      title: '【新闻】专家学者齐聚探讨传统建筑' + '保护与创新',
      time: '2026-03-13',
      type: 'news'
    },
    {
      id: 4,
      title: '【公告】传统建筑技艺培训班' + '开始招生啦',
      time: '2026-03-12',
      type: 'announcement'
    },
    {
      id: 5,
      title: '【新闻】"古建之光"主题展览' + '隆重开幕',
      time: '2026-03-11',
      type: 'news'
    }
  ])

  // 模拟论文数据（备用）
  const paperList = ref([
    {
      id: 1,
      title: '传统建筑榫卯结构力学分析',
      author: '张三',
      year: '2026'
    },
    {
      id: 2,
      title: '古建筑保护修复技术研究',
      author: '李四',
      year: '2023'
    }
  ])

  return {
    newsList,
    paperList
  }
}