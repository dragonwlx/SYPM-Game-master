// 模拟数据hook
import { ref, computed } from 'vue'

export function useMockData() {
  // 八大作数据
  const works = ref([
    {
      id: 1,
      title: '土作',
      image:  new URL('../assets/img/homepage/work1.png', import.meta.url).href,
      description: '土作是传统建筑中关于台基、地基等土方工程的营造技艺，可以使地基坚固、耐久、稳定，成为承载连绵殿宇的重要根基。'
    },
    {
      id: 2,
      title: '石作',
      image:  new URL('../assets/img/homepage/work2.png', import.meta.url).href,
      description: '石作是关于石构件制作、表面处理和安装的营造技艺，可以将糙石变为建筑下的精美石基，体现了石作的“稳而持重”。'
    },
    {
      id: 3,
      title: '木作',
      image:  new URL('../assets/img/homepage/work3.png', import.meta.url).href,
      description: '木作是中国传统木结构建筑营缮中的主作，榫卯是其核心技艺，常用锛、凿、锯、刨等工具，诠释了“方寸之合”的营造智慧。'
    },
    {
      id: 4,
      title: '瓦作',
      image:  new URL('../assets/img/homepage/work4.png', import.meta.url).href,
      description: '瓦作是传统建筑中砌砖墁地的营造技艺，它保护着木质屋顶和飞檐，通过苫背和瓦瓦的技艺形成了传统建筑的恢弘屋面。'
    },
    {
      id: 5,
      title: '搭材作',
      image:  new URL('../assets/img/homepage/work5.png', import.meta.url).href,
      description: '搭材作是传统建筑中以架木搭设、扎彩、棚匠为内容的营造技艺。它不仅用于搭扎彩棚，还在建筑施工中搭建脚手架。'
    },
    {
      id: 6,
      title: '油作',
      image:  new URL('../assets/img/homepage/work6.png', import.meta.url).href,
      description: '油作是为保护木构件而施以地仗油饰的营造技艺，通过熬制灰油、披麻捉灰、光三遍油的过程，形成了“厚薄有度”的油饰面。'
    },
    {
      id: 7,
      title: '彩画作',
      image:  new URL('../assets/img/homepage/work7.png', import.meta.url).href,
      description: '彩画作是传统建筑中绘制彩画的营造技艺。彩画的绘制过程，包括贴金、打金胶油等工序，体现了彩画作的精细与华丽。'
    },
    {
      id: 8,
      title: '裱糊作',
      image:  new URL('../assets/img/homepage/work8.png', import.meta.url).href,
      description: '裱糊作是传统建筑中对室内装饰的营造技艺，包括裱糊底纸等工序，具有“柔外韧内”的特点。'
    }
  ])

  // 游戏数据
  const games = ref([
    {
      id: 1,
      title: '漆彩匠心',
      image:  new URL('../assets/img/homepage/game1.png', import.meta.url).href,
      description: '体验传统漆艺的魅力，感受工匠精神'
    },
    {
      id: 2,
      title: '榫卯大师',
      image:  new URL('../assets/img/homepage/game2.png', import.meta.url).href,
      description: '挑战传统榫卯结构的组装，体验中国传统工艺的智慧'
    }
  ])

  // 古建保护数据
  const protectData = ref({
    principles: [
      '尊重历史、保留原真性',
      '整体性保护',
      '预防为主',
      '最小干预'
    ],
    techniques: [
      '传统工艺与材料',
      '现代科技手段',
      '消防安全与结构安全'
    ],
    figures: [
      '林徽因与梁思成',
      '王时伟',
      '杜仙洲'
    ],
    inheritance: [
      '公众参与',
      '人才培养',
      '文化创新'
    ]
  })

  // 计算属性
  const workCount = computed(() => works.value.length)
  const gameCount = computed(() => games.value.length)

  return {
    works,
    games,
    protectData,
    workCount,
    gameCount
  }
}