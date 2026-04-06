<template>
  <div class="news-page">
    <div class="header-section">
      <div class="header-title">遗构守望 · 文保资讯卷宗</div>
      <div class="search-box">
        <input 
          type="text" 
          class="search-input" 
          placeholder="检索古建名称、遗址所在地或文保技术..."
          v-model="searchQuery"
        >
        <button class="search-btn" @click="performSearch">查阅</button>
      </div>
    </div>

    <div class="main-container">
      <div class="sidebar">
        <div class="filter-group" data-filter-type="work">
          <div class="filter-title">保护工作分类</div>
          <div 
            v-for="item in filterData.work" 
            :key="item.value"
            class="filter-item" 
            :class="{ active: currentFilters.work === item.value }"
            :data-value="item.value"
            @click="updateFilter('work', item.value)"
          >{{ item.label }}</div>
        </div>

        <div class="filter-group" data-filter-type="shape">
          <div class="filter-title">历史建筑形制</div>
          <div 
            v-for="item in filterData.shape" 
            :key="item.value"
            class="filter-item" 
            :class="{ active: currentFilters.shape === item.value }"
            :data-value="item.value"
            @click="updateFilter('shape', item.value)"
          >{{ item.label }}</div>
        </div>

        <div class="filter-group" data-filter-type="dynasty">
          <div class="filter-title">历史断代</div>
          <div 
            v-for="item in filterData.dynasty" 
            :key="item.value"
            class="filter-item" 
            :class="{ active: currentFilters.dynasty === item.value }"
            :data-value="item.value"
            @click="updateFilter('dynasty', item.value)"
          >{{ item.label }}</div>
        </div>
      </div>

      <div class="content-area" id="cardContainer">
        <div 
          v-for="(card, index) in filteredCards" 
          :key="index"
          class="news-card"
          :data-work="card.work"
          :data-shape="card.shape"
          :data-dynasty="card.dynasty"
          @click="navigateToDetail(card)"
        >
          <div class="card-left">
            <span class="dynasty-tag">{{ card.dynastyTag }}</span>
            <div class="building-name">{{ card.buildingName }}</div>
            <div class="project-type">{{ card.projectType }}</div>
          </div>
          <div class="card-right">
            <div class="news-header">
              <h3 class="news-title">{{ card.title }}</h3>
              <span class="news-date">{{ card.date }}</span>
            </div>
            <p class="news-desc">{{ card.description }}</p>
            <div class="tags-container">
              <span v-for="(tag, tagIndex) in card.tags" :key="tagIndex">{{ tag }}</span>
            </div>
          </div>
        </div>

        <div v-if="filteredCards.length === 0" id="noResult" class="no-result">
          此分类下暂无相关卷宗记录...
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// 搜索关键词
const searchQuery = ref('');

// 筛选数据
const filterData = {
  work: [
    { value: 'all', label: '全部动态' },
    { value: 'rescue', label: '抢险与加固' },
    { value: 'repair', label: '落架大修与复原' },
    { value: 'digital', label: '数字化与测绘' },
    { value: 'archaeology', label: '考古勘察报告' },
    { value: 'mural', label: '壁画彩塑修复' },
    { value: 'revive', label: '活化与预防性保护' }
  ],
  shape: [
    { value: 'all', label: '不限形制' },
    { value: 'palace', label: '殿堂楼阁' },
    { value: 'tower', label: '塔寺石窟' },
    { value: 'tomb', label: '坛庙与陵寝' },
    { value: 'folk', label: '乡土与传统民居' }
  ],
  dynasty: [
    { value: 'all', label: '全部时期' },
    { value: 'tang', label: '隋唐及以前' },
    { value: 'song', label: '宋辽金元' },
    { value: 'mingqing', label: '明清时期' }
  ]
};

// 新闻卡片数据
const newsCards = [
  {
    work: 'repair',
    shape: 'palace',
    dynasty: 'mingqing',
    dynastyTag: '清代官式',
    buildingName: '故宫养心殿',
    projectType: '落架大修',
    title: '【修缮纪实】养心殿百年大修：传统“八大作”工艺的严谨复现',
    date: '2026.04.02',
    description: '本次修缮严格遵循“不改变文物原状”的原则。木作、瓦作、油作、画作等“八大作”非遗传承人齐聚，针对透风砖风化、檐柱糟朽等病害进行了针对性修复，重现皇家宫殿营建规制。',
    tags: ['官式建筑', '非遗工艺'],
    content: [
      '养心殿作为清代皇帝的寝宫和处理日常政务的地方，具有极高的历史价值。本次大修是自清代以来规模最大的一次整体性修缮。',
      '修缮过程中，工匠们严格按照传统工艺进行操作，使用了与原建筑相同的材料和工艺，确保了修缮后的养心殿保持原有风貌。',
      '针对透风砖风化问题，工匠们采用了传统的砖雕工艺进行修复，确保了砖体的透气性和耐久性。',
      '对于檐柱糟朽问题，采用了局部换柱的方法，保留了原柱的主体部分，只对糟朽严重的部分进行替换。',
      '通过这次大修，养心殿的整体结构得到了加固，延长了建筑的使用寿命，同时也为后人留下了宝贵的传统工艺资料。'
    ],
    references: [
      {
        type: '官方出处',
        org: '故宫博物院',
        link: 'https://www.dpm.org.cn/',
        title: '养心殿大修工程报告'
      },
      {
        type: '权威史料',
        org: '中国建筑史学会',
        link: '#',
        title: '清代官式建筑营造技艺研究'
      }
    ],
    relicInfo: {
      name: '故宫养心殿',
      builtYear: '清代康熙年间',
      location: '北京 · 故宫',
      type: '宫殿建筑',
      protectionLevel: '全国重点文保 (第一批)'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'https://www.dpm.org.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  },
  {
    work: 'digital',
    shape: 'tower',
    dynasty: 'song',
    dynastyTag: '辽代木构',
    buildingName: '应县木塔',
    projectType: '数字监测',
    title: '【前沿科技】释迦塔高精度数字孪生系统上线，毫米级监测倾斜度',
    date: '2026.03.28',
    description: '联合多家科研院所，利用三维激光扫描与内部光纤传感网络，构建了木塔的动态受力分析模型。该系统不仅实现了文物本体的永久性数字存档，更为后续的纠偏方案提供了力学依据。',
    tags: ['数字孪生', '结构力学'],
    content: [
      '佛宫寺释迦塔，世称应县木塔，作为世界现存最古老、最高大的全木结构高层塔式建筑，历经近千年风雨侵蚀与多次地震。',
      '随着时间的推移，塔体局部构件出现了不同程度的糟朽、劈裂与变形，整体结构呈现出肉眼可见的倾斜。',
      '如何在上不破坏原构件的前提下，对其进行精准的“健康监测”，一直是文物保护界的世界级难题。',
      '近日，由中国文化遗产研究院联合多家高校及科研院所共同研发的“释迦塔高精度数字孪生与结构安全预警系统”正式上线。',
      '该系统的投入使用，标志着我国在木构古建的预防性保护领域迈出了关键性的一步。',
      '为了获取极其复杂的内部大木作结构信息，科研团队摒弃了传统的破坏性勘测，转而采用地基激光雷达（LiDAR）、无人机倾斜摄影以及手持式高精度扫描仪。',
      '在长达半年的测绘中，团队对木塔内部的暗层、错综复杂的斗栱网络以及成百上千个榫卯节点进行了无死角的信息采集。',
      '通过处理超过 50 亿个点云数据，团队在虚拟空间中“一比一”地复刻了这座千年木塔的三维几何模型。',
      '这个模型不仅保留了建筑的宏观形制，连每一根柱子的裂纹走向、每一块残损的铺作都被精确记录在案，形成了不可磨灭的永久性数字档案。',
      '数字孪生并非简单的三维建档，更重要的是“孪生”。研究人员根据木材的真实材种（主要为红松与华北落叶松）、实时含水率以及历史病害记录，为数字模型赋予了真实的物理和力学属性。',
      '这意味着系统可以在计算机中进行“压力测试”。通过输入当地的气象数据与地质运动数据，系统能够模拟木塔在强风、地震等极端工况下的受力状态，提前寻找结构最脆弱的“应力集中点”，从而指导现实中的加固工作。',
      '配合数字空间的模型，工程团队在现实的木塔本体上也进行了极其克制的“微创手术”。在关键的承重柱、倾斜严重的二层至三层核心筒区域，隐蔽安装了数十个光纤布拉格光栅（FBG）传感器与双轴倾角仪。',
      '这些设备如同微小的“听诊器”，能够全天候实时捕捉木塔在环境温湿度变化下的微小形变与倾斜率波动。',
      '一旦某根立柱的位移超过设定的毫米级安全阈值，系统便会自动触发预警机制。从“抢救性保护”向“预防性保护”的深刻转变，正在应县木塔的数字与现实空间中交织发生。'
    ],
    references: [
      {
        type: '官方出处',
        org: '中国文化遗产研究院 (CACH)',
        link: 'http://www.cach.org.cn/',
        title: '《释迦塔数字孪生项目公报》'
      },
      {
        type: '权威史料',
        org: '营造学社史料数字档案馆',
        link: '#',
        title: '《应县木塔》1933年梁思成等历史测绘图纸及建筑形制详解'
      }
    ],
    relicInfo: {
      name: '佛宫寺释迦塔',
      builtYear: '辽清宁二年 (1056)',
      location: '山西朔州 · 应县',
      type: '八角五层六檐木塔',
      protectionLevel: '全国重点文保 (第一批)'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'http://www.cach.org.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  },
  {
    work: 'rescue',
    shape: 'palace',
    dynasty: 'tang',
    dynastyTag: '唐代遗构',
    buildingName: '佛光寺东大殿',
    projectType: '抢险加固',
    title: '【工程验收】五台山佛光寺东大殿屋面漏雨抢险加固工程顺利完工',
    date: '2026.03.15',
    description: '针对近年来极端天气频发导致的屋面局部渗漏问题，国家文物局组织专家进行了微创式防水修补。工程秉承“最小干预”原则，在不动原结构的基础上，有效排除了大木作受潮隐患。',
    tags: ['唐代大木作', '最小干预'],
    content: [
      '佛光寺东大殿是我国现存最早的唐代木构建筑之一，具有极高的历史和艺术价值。',
      '近年来，由于极端天气频发，东大殿屋面出现了局部渗漏问题，对建筑本体造成了潜在威胁。',
      '为了保护这一珍贵的文化遗产，国家文物局组织专家进行了专项抢险加固工程。',
      '工程秉承“最小干预”原则，在不动原结构的基础上，采用微创式防水修补技术。',
      '施工过程中，专家们对屋面的瓦件、望板、苫背等部分进行了仔细检查和修复，确保了屋面的防水性能。',
      '同时，对大殿内部的大木作构件进行了全面检查，排除了受潮隐患，确保了建筑的结构安全。',
      '经过数月的精心施工，工程顺利完工，东大殿的屋面漏雨问题得到了有效解决。',
      '这次工程不仅保护了珍贵的唐代木构建筑，也为类似建筑的保护提供了宝贵经验。'
    ],
    references: [
      {
        type: '官方出处',
        org: '国家文物局',
        link: 'http://www.ncha.gov.cn/',
        title: '佛光寺东大殿抢险加固工程报告'
      },
      {
        type: '权威史料',
        org: '中国建筑科学研究院',
        link: '#',
        title: '唐代木构建筑保护技术研究'
      }
    ],
    relicInfo: {
      name: '佛光寺东大殿',
      builtYear: '唐大中十一年 (857)',
      location: '山西忻州 · 五台山',
      type: '殿堂建筑',
      protectionLevel: '全国重点文保 (第一批)'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'http://www.ncha.gov.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  },
  {
    work: 'mural',
    shape: 'tomb',
    dynasty: 'song',
    dynastyTag: '元代道观',
    buildingName: '永乐宫',
    projectType: '壁画修复',
    title: '【文物修复】永乐宫三清殿《朝元图》壁画微观病害治理取得阶段性成果',
    date: '2026.02.19',
    description: '保护团队利用多光谱成像技术诊断壁画深层病害。针对地仗层空鼓、颜料层起甲粉化等问题，采用高分子纳米材料进行了无损加固，使这幅中国美术史上的巨制重焕生机。',
    tags: ['多光谱成像', '壁画保护'],
    content: [
      '永乐宫三清殿的《朝元图》壁画是我国元代壁画的杰出代表，被誉为“东方艺术瑰宝”。',
      '由于年代久远，壁画出现了地仗层空鼓、颜料层起甲粉化等多种病害，严重威胁着壁画的安全。',
      '为了保护这一珍贵的文化遗产，保护团队采用了先进的多光谱成像技术对壁画进行全面诊断。',
      '通过多光谱成像技术，专家们能够清晰地观察到壁画深层的病害情况，为修复工作提供了科学依据。',
      '针对地仗层空鼓问题，团队采用了低压灌浆技术，将特制的加固材料注入空鼓部位，使地仗层与墙体重新粘结。',
      '对于颜料层起甲粉化问题，采用了高分子纳米材料进行加固，既保证了修复效果，又不会对壁画造成二次伤害。',
      '修复过程中，团队严格遵循“最小干预”原则，尽量保留壁画的原始面貌。',
      '经过数月的精心修复，《朝元图》壁画的微观病害得到了有效治理，重现了昔日的辉煌。',
      '这次修复工作不仅保护了珍贵的壁画遗产，也为我国壁画保护技术的发展积累了宝贵经验。'
    ],
    references: [
      {
        type: '官方出处',
        org: '山西省文物局',
        link: 'http://www.sx文物局.gov.cn/',
        title: '永乐宫壁画修复工程报告'
      },
      {
        type: '权威史料',
        org: '中国文物保护技术协会',
        link: '#',
        title: '中国古代壁画保护技术研究'
      }
    ],
    relicInfo: {
      name: '永乐宫',
      builtYear: '元代',
      location: '山西运城 · 芮城',
      type: '道观建筑',
      protectionLevel: '全国重点文保 (第一批)'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'http://www.sx文物局.gov.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  },
  {
    work: 'archaeology',
    shape: 'tomb',
    dynasty: 'song',
    dynastyTag: '宋代园林',
    buildingName: '晋祠圣母殿',
    projectType: '考古勘察',
    title: '【考古发现】圣母殿底部须弥座最新勘探：揭示北宋初期基址演变',
    date: '2026.01.24',
    description: '在近期的建筑考古调查中，研究人员对圣母殿台基进行了探沟发掘。新出土的柱础残件及地层关系表明，现存大殿在北宋天圣年间重建时，曾在更早期的夯土台基上进行了扩建。',
    tags: ['建筑考古', '地层学'],
    content: [
      '晋祠圣母殿是我国宋代建筑的杰出代表，具有极高的历史和艺术价值。',
      '为了深入了解圣母殿的建造历史和演变过程，研究人员对圣母殿底部的须弥座进行了考古勘探。',
      '通过探沟发掘，研究人员发现了大量的柱础残件、砖瓦碎片等遗物，为研究圣母殿的建造历史提供了重要线索。',
      '地层分析表明，现存的圣母殿台基是在更早期的夯土台基基础上扩建而成的。',
      '根据出土遗物和地层关系，研究人员推断，圣母殿在北宋天圣年间重建时，对原有建筑进行了大规模的扩建和改造。',
      '这次考古发现不仅揭示了圣母殿的建造历史，也为研究宋代建筑的发展演变提供了重要资料。',
      '同时，研究人员还发现了一些与圣母殿相关的附属建筑遗迹，为了解晋祠的整体布局提供了新的视角。',
      '这次考古勘察是晋祠保护和研究工作的重要组成部分，为制定科学的保护方案提供了依据。'
    ],
    references: [
      {
        type: '官方出处',
        org: '山西省考古研究所',
        link: 'http://www.sxkg.cn/',
        title: '晋祠圣母殿考古勘察报告'
      },
      {
        type: '权威史料',
        org: '中国考古学会',
        link: '#',
        title: '宋代建筑考古研究'
      }
    ],
    relicInfo: {
      name: '晋祠圣母殿',
      builtYear: '北宋天圣年间',
      location: '山西太原 · 晋祠',
      type: '殿堂建筑',
      protectionLevel: '全国重点文保 (第一批)'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'http://www.sxkg.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  },
  {
    work: 'revive',
    shape: 'folk',
    dynasty: 'mingqing',
    dynastyTag: '明清古村',
    buildingName: '宏村西递',
    projectType: '活化利用',
    title: '【理论探讨】从“标本式保护”到“活态传承”：徽派民居的微更新实践',
    date: '2025.12.11',
    description: '探讨如何在维持原有街巷肌理、水系网络和粉墙黛瓦风貌的同时，采用隐蔽式手法植入现代给排水与消防设施。通过“微介入”提升原住民生活质量，防止古村落空心化。',
    tags: ['传统村落', '微更新'],
    content: [
      '宏村和西递是我国皖南地区保存最为完整的明清古村落，被誉为“中国画里的乡村”。',
      '随着时代的发展，古村落面临着空心化、基础设施落后等问题，如何在保护的同时实现可持续发展成为了亟待解决的问题。',
      '为了探索古村落保护与发展的新路径，研究人员提出了“微更新”的理念，即在维持原有街巷肌理、水系网络和粉墙黛瓦风貌的同时，采用隐蔽式手法植入现代基础设施。',
      '在实践中，研究人员采用了多种创新技术，如隐蔽式给排水系统、智能消防设施、可再生能源利用等，既保证了古村落的传统风貌，又提升了居民的生活质量。',
      '同时，通过发展文化旅游、手工艺传承等产业，为古村落注入了新的活力，防止了空心化现象的发生。',
      '这种“微更新”的模式不仅保护了珍贵的文化遗产，也为其他传统村落的保护与发展提供了借鉴。',
      '通过实践证明，传统村落的保护与发展并不是相互矛盾的，而是可以相互促进的。',
      '只有在保护的基础上进行合理的发展，才能实现传统村落的可持续发展，让古老的村落重新焕发生机。'
    ],
    references: [
      {
        type: '官方出处',
        org: '住房和城乡建设部',
        link: 'http://www.mohurd.gov.cn/',
        title: '传统村落保护与发展规划'
      },
      {
        type: '权威史料',
        org: '中国城市规划学会',
        link: '#',
        title: '传统村落微更新理论与实践'
      }
    ],
    relicInfo: {
      name: '宏村西递',
      builtYear: '明清时期',
      location: '安徽黄山 · 黟县',
      type: '传统村落',
      protectionLevel: '世界文化遗产'
    },
    buttons: [
      {
        text: '前往官方项目主页',
        url: 'http://www.mohurd.gov.cn/',
        type: 'primary'
      },
      {
        text: '查阅权威历史档案库',
        url: '#',
        type: 'secondary'
      }
    ]
  }
];

// 当前筛选条件
const currentFilters = ref({
  work: 'all',
  shape: 'all',
  dynasty: 'all'
});

// 计算过滤后的卡片
const filteredCards = computed(() => {
  return newsCards.filter(card => {
    const matchWork = currentFilters.value.work === 'all' || currentFilters.value.work === card.work;
    const matchShape = currentFilters.value.shape === 'all' || currentFilters.value.shape === card.shape;
    const matchDynasty = currentFilters.value.dynasty === 'all' || currentFilters.value.dynasty === card.dynasty;
    const matchSearch = !searchQuery.value || 
      card.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      card.buildingName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      card.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()));
    return matchWork && matchShape && matchDynasty && matchSearch;
  });
});

// 更新筛选条件
const updateFilter = (filterType, value) => {
  currentFilters.value[filterType] = value;
};

// 执行搜索
const performSearch = () => {
  // 搜索逻辑已在computed属性中实现，这里可以添加额外的搜索逻辑
};

// 跳转到详情页
const navigateToDetail = (card) => {
  // 存储新闻数据到store
  store.dispatch('setNews', card);
  // 跳转到详情页
  router.push('/info/news-detail');
};
</script>

<style scoped>
/* 引入字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');

.news-page {
  --bg-dark: #1a1817;
  --bg-card: #242220;
  --gold-accent: #c6a87c;
  --gold-dim: rgba(198, 168, 124, 0.3);
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
  padding: 40px;
  line-height: 1.6;
  min-height: 100vh;
}

/* 顶部搜索区 */
.header-section { 
  text-align: center; 
  margin-bottom: 50px; 
}

.header-title { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  font-size: 28px; 
  letter-spacing: 4px; 
  margin-bottom: 30px; 
}

.search-box { 
  display: inline-flex; 
  border: 1px solid var(--gold-dim); 
  border-radius: 4px; 
  overflow: hidden; 
  width: 500px; 
  max-width: 100%; 
  transition: border-color 0.3s ease; 
}

.search-box:focus-within { 
  border-color: var(--gold-accent); 
}

.search-input { 
  flex-grow: 1; 
  background: transparent; 
  border: none; 
  color: var(--text-hover); 
  padding: 12px 20px; 
  outline: none; 
}

.search-btn { 
  background-color: var(--gold-accent); 
  color: var(--bg-dark); 
  border: none; 
  padding: 0 30px; 
  font-weight: bold; 
  cursor: pointer; 
  font-family: var(--font-serif); 
  transition: opacity 0.3s; 
}

.search-btn:hover { 
  opacity: 0.9; 
}

/* 主体布局 */
.main-container { 
  display: flex; 
  max-width: 1200px; 
  margin: 0 auto; 
  gap: 50px; 
}

/* 左侧侧边栏 */
.sidebar { 
  width: 220px; 
  flex-shrink: 0; 
}

.filter-group { 
  margin-bottom: 40px; 
}

.filter-title { 
  font-family: var(--font-serif); 
  color: var(--gold-accent); 
  border-bottom: 1px solid var(--gold-dim); 
  padding-bottom: 10px; 
  margin-bottom: 15px; 
  font-size: 16px; 
  letter-spacing: 1px; 
}

.filter-item { 
  color: var(--text-muted); 
  margin-bottom: 12px; 
  cursor: pointer; 
  display: flex; 
  align-items: center; 
  font-size: 14px; 
  transition: all 0.3s ease; 
}

.filter-item::before { 
  content: "□"; 
  margin-right: 10px; 
  color: var(--text-muted); 
  transition: color 0.3s ease; 
}

.filter-item:hover { 
  color: var(--text-hover); 
  transform: translateX(4px); 
}

.filter-item:hover::before { 
  color: var(--gold-accent); 
}

.filter-item.active { 
  color: var(--gold-accent); 
  font-weight: bold; 
}

.filter-item.active::before { 
  content: "■"; 
  color: var(--gold-accent); 
}

/* 右侧内容区 */
.content-area { 
  flex-grow: 1; 
}

/* 资讯卡片及过渡动画 */
.news-card { 
  display: flex; 
  border: 1px solid var(--gold-dim); 
  background-color: var(--bg-card); 
  margin-bottom: 24px; 
  transition: all 0.4s ease; 
  cursor: pointer; 
  opacity: 1; 
  transform: scale(1); 
  transform-origin: top center;
}

.news-card:hover { 
  border-color: var(--gold-accent); 
  transform: translateY(-2px); 
  box-shadow: 0 4px 20px rgba(0,0,0,0.4); 
}

/* 过滤隐藏时的样式 */
.news-card.hidden { 
  display: none; 
}

.card-left { 
  width: 140px; 
  padding: 25px 20px; 
  border-right: 1px dashed var(--gold-dim); 
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  align-items: flex-start; 
}

.dynasty-tag { 
  border: 1px solid var(--gold-dim); 
  color: var(--gold-accent); 
  padding: 4px 10px; 
  font-size: 12px; 
  display: inline-block; 
  margin-bottom: 15px; 
  font-family: var(--font-serif); 
}

.building-name { 
  font-family: var(--font-serif); 
  font-size: 22px; 
  color: var(--text-hover); 
  margin-bottom: 8px; 
  line-height: 1.3; 
}

.project-type { 
  color: var(--gold-accent); 
  font-size: 13px; 
  opacity: 0.8; 
}

.card-right { 
  padding: 25px 30px; 
  flex-grow: 1; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
}

.news-header { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  margin-bottom: 12px; 
}

.news-title { 
  font-size: 19px; 
  color: var(--text-hover); 
  margin: 0; 
  font-weight: normal; 
  font-family: var(--font-serif); 
  line-height: 1.5; 
}

.news-date { 
  color: var(--text-muted); 
  font-size: 12px; 
  white-space: nowrap; 
  margin-left: 15px; 
  font-family: monospace; 
}

.news-desc { 
  color: var(--text-muted); 
  font-size: 14px; 
  margin-bottom: 20px; 
  display: -webkit-box; 
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical; 
  overflow: hidden; 
  line-height: 1.8; 
}

.tags-container span { 
  border: 1px solid #4a4540; 
  border-radius: 20px; 
  padding: 4px 14px; 
  font-size: 12px; 
  color: var(--text-muted); 
  margin-right: 8px; 
  transition: border-color 0.3s ease; 
}

.news-card:hover .tags-container span { 
  border-color: var(--gold-dim); 
  color: var(--text-main); 
}

/* 查无结果时的提示 */
.no-result { 
  text-align: center; 
  color: var(--text-muted); 
  font-family: var(--font-serif); 
  padding: 50px; 
  border: 1px dashed var(--gold-dim); 
}
</style>