<template>
  <div class="bada-zuo-container">
    <!-- 1. 顶部导航栏 -->
    <nav class="navigation glass-panel">
      <div class="nav-container">
        <h1 class="nav-title">八大作技艺</h1>
        <ul class="nav-menu">
          <li 
            v-for="(item, index) in navItems" 
            :key="index"
            class="nav-item"
            :class="{ active: activeNav === item.id }"
            @click="selectNav(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </nav>

    <!-- 2. 视频播放器区域 -->
    <section class="video-section">
      <div class="video-container">
        <video 
          ref="videoPlayer"
          class="main-video"
          :src="activeNavData.videoUrl"
          controls
          poster='../../assets/img/BaDaZuo/TuZuo/poster.jpg'
        >
          您的浏览器不支持视频播放。
        </video>
      </div>
    </section>

    <!-- 3. 视频简介区域 -->
    <section class="video-description">
      <div class="description-container">
        <h2 class="description-title">{{ activeNavData.title }}</h2>
        <p class="description-text" style="font-family:'Microsoft YaHei">{{ activeNavData.description }}</p>
      </div>
    </section>

    <!-- 4. 八大作详细展示区域 -->
    <main class="details-container">
      <h2 class="section-title">{{ activeNavData.sectionTitle }}</h2>

      <!-- 技艺特性展示 -->
      <div 
        v-for="(feature, index) in activeNavData.features" 
        :key="index"
        class="showcase-row"
        :class="{ 'reverse': index % 2 === 1 }"
      >
        <div class="text-block glass-panel">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
        <div class="image-block">
          <img :src="feature.imageUrl" :alt="feature.title">
        </div>
      </div>
    </main>

    <footer class="footer glass-panel">
      <p>&copy; 2026 八大作技艺传承</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import TuZuo1 from '../../assets/img/BaDaZuo/TuZuo/1.jpg'
import TuZuo2 from '../../assets/img/BaDaZuo/TuZuo/2.jpg'
import TuZuo3 from '../../assets/img/BaDaZuo/TuZuo/3.jpg'
import ShiZuo1 from '../../assets/img/BaDaZuo/ShiZuo/1.jpg'  
import ShiZuo2 from '../../assets/img/BaDaZuo/ShiZuo/2.jpg'  
import DaCaiZuo1 from '../../assets/img/BaDaZuo/DaCaiZuo/1.jpg'
import DaCaiZuo2 from '../../assets/img/BaDaZuo/DaCaiZuo/2.png'
import MuZuo1 from '../../assets/img/BaDaZuo/MuZuo/1.jpg'
import MuZuo2 from '../../assets/img/BaDaZuo/MuZuo/2.png'
import WaZuo1 from '../../assets/img/BaDaZuo/WaZuo/1.png'
import WaZuo2 from '../../assets/img/BaDaZuo/WaZuo/2.png'
import YouZuo1 from '../../assets/img/BaDaZuo/YouZuo/1.jpg'
import YouZuo2 from '../../assets/img/BaDaZuo/YouZuo/2.png'
import CaiHuaZuo1 from '../../assets/img/BaDaZuo/CaiHuaZuo/1.png'
import CaiHuaZuo2 from '../../assets/img/BaDaZuo/CaiHuaZuo/2.jpg'
import BiaoHuZuo1 from '../../assets/img/BaDaZuo/BiaoHuZuo/1.png'
import BiaoHuZuo2 from '../../assets/img/BaDaZuo/BiaoHuZuo/2.png'



// 导航项数据
const navItems = ref([
  { id: 'tu', name: '土作' },
  { id: 'shi', name: '石作' },
  { id: 'dacai', name: '搭材作' },
  { id: 'mu', name: '木作' },
  { id: 'wa', name: '瓦作' },
  { id: 'you', name: '油作' },
  { id: 'caihua', name: '彩画作' },
  { id: 'biaohu', name: '裱糊作' }
]);

// 当前激活的导航项
const activeNav = ref('tu');

// 视频播放器引用
const videoPlayer = ref(null);

// 八大作数据
const badaZuoData = ref({
  tu: {
    title: '土作技艺',
    description: '土作是中国古代建筑 “八大作” 之一，为建筑之本、营造之基，专指以土为主要材料，通过挖、垫、夯、筑、填等工序完成地基、台基、夯土墙、灰土垫层、场地平整及防水防潮处理的营造工序。它以黄土、灰土、碎砖、砂石为原料，采用分层夯实、版筑夯打、三七灰土配比等官式工艺，承担承重、抗震、隔水、稳固结构的核心作用，上承木作、瓦石诸作，下固建筑根基，是中国古建筑坚固耐久、历经千年而不倾的关键所在，也是贯穿从民居到宫殿、坛庙、陵寝等所有营造体系的基础工艺。',
    videoUrl: 'https://cropgif.net/videos/1775144045838-e7f90d3e-0368-43dc-88ea-c853e4118367.mp4',
    sectionTitle: '土作技艺详解',
    features: [
      {
        title: '北京故宫太和殿',
        description: '太和殿是明清官式土作 “满堂红” 小夯灰土工艺的最高标准案例。台基之下的地基垫层厚达 8.13 米，采用一层三七灰土（石灰：黄土 = 3:7）、一层黏土、一层碎砖、一层卵石交替分层夯实，并用糯米水 + 白矾增强黏结度，形成复合防水抗沉降结构。600 余年历经多次强震与巨量木构荷载，无明显沉降，是官式土作 “厚基载皇构” 的极致体现，严格遵循《营造法式》与清代《工程做法则例》的顶级规制。',
        imageUrl: TuZuo1
      },
      {
        title: '北京天坛祈年殿',
        description: '祈年殿的土作完美适配圆形礼制建筑与坛庙的特殊地基要求。其圆形台基（三层汉白玉须弥座）下方，采用官式大夯灰土与满堂红地基结合，深挖至持力层后分层夯筑，灰土比例精准，外围设环形排水盲沟。地基与台明的衔接处做 “阶沿灰土” 加固，防止圆形结构因受力不均产生开裂；整个土作体系不外露，却支撑着高 38 米、全木榫卯的圆形殿宇，历经明清多次修缮，始终保持形制稳定，是坛庙类官式土作的标杆。',
        imageUrl: TuZuo2
      },{
        title: '北京太庙大殿',
        description: '太庙作为皇家祖庙，其土作工艺等级仅次于三大殿，却更强调耐久性与防潮性。地基采用 “一块玉” 式整体夯筑，三七灰土与青灰砖垫层交替，底部铺设卵石排水层；台基的台帮内侧也做厚层灰土夯实，避免地下潮气上渗侵蚀木柱柱础。其土作施工全程有皇家监工，夯层厚度、夯窝密度、灰土配比均有严格计量，数百年间未发生基础变形，完美匹配祖庙 “千秋永固” 的礼制需求，是官式祭祀建筑土作的典范。',
        imageUrl: TuZuo3
      
      }
    ]
  },
  shi: {
    title: '石作技艺',
    description: '石作是中国古代建筑 "八大作" 之一，专指以石材为主要原料，经开采、打制、雕刻、砌筑、安装而成的建筑营造工序，是官式建筑中体现等级、稳固结构与装饰美化的重要门类。其应用范围极广，上至宫殿、坛庙、陵寝的台基、须弥座、栏杆、石阶、御路、柱础、券拱，下至桥梁、碑碣、石阙、石雕构件等，均属石作范畴；工艺上讲究选料精良、凿打规整、榫卯咬合、雕饰精细，官式建筑更对石材种类、尺寸、纹饰、摆放位置有严格规制，既承担承重、防潮、耐久、护基的实用功能，又通过龙纹、凤纹、祥云、卷草等纹样彰显礼制等级与艺术审美，与土作、木作相辅相成，共同构成中国古建筑庄重坚固、华美有序的整体风貌。',
    videoUrl: 'https://cropgif.net/videos/1775182001806-1915ed11-7424-4875-b784-4643d8143b6b.mp4',
    sectionTitle: '石作技艺详解',
    features: [
      {
        title: '北京故宫保和殿',
        description: '故宫保和殿的云龙阶石是紫禁城最大、最精湛的官式石雕御路，为艾叶青石所制，明代原物，清乾隆年间重雕；长 16.7 米、宽 3.07 米、厚 1.7 米，重达约 200 吨。通体浮雕九条矫健蟠龙与流云、江崖海水纹，四周饰卷草边框，构图主次分明、刀法浑厚有力。其开采自房山大石窝，运输时沿途挖井泼水成冰道，动用数万人力畜力，是明清官式石作选材、运输、雕刻工艺的巅峰之作，彰显皇权至高无上的威仪。',
        imageUrl: ShiZuo1
      },
      {
        title: '明十三陵',
        description: '明十三陵的总神路石牌坊为五间六柱十一楼的汉白玉石牌坊，是明代官式石牌坊的最高等级形制，建于嘉靖十九年（1540 年）。整座牌坊不用一钉一铆，纯靠石构件的榫卯咬合与重力平衡构筑；额枋、立柱、夹杆石上雕刻精美的龙凤、麒麟、狮子及缠枝莲纹，通体洁白，造型庄重典雅。它不仅是十三陵入口的标志性礼制建筑，更体现了明代皇家石作在结构力学与雕刻装饰上的极高水准。',
        imageUrl: ShiZuo2
      }
    ]
  },
  dacai: {
    title: '搭材作技艺',
    description: '搭材作是中国古代建筑 "八大作" 之一，也常称搭架子作、扎彩作，主要负责在宫殿、坛庙、官署等大型工程施工时，用木材、竹竿、绳索等材料搭设脚手架、起重架、满堂红架、桥梁栈道、彩棚戏台及各类礼仪性扎作，是古代营造中不可或缺的辅助工种。它看似不直接构成建筑本体，却贯穿于木作、瓦作、石作、油饰彩画等各作施工全过程，既要满足登高作业、材料吊运、构件拼装的安全与承重需求，又要在皇家庆典、祭祀、大婚等场合搭设华丽的彩棚、灯架、围幕等陈设，讲究构架稳固、绑扎紧实、布局规整，既保障营造安全顺利，也承担礼仪场景的布置功能，是古代大型建筑工程得以实施的重要保障。',
    videoUrl: 'https://cropgif.net/videos/1775182061878-42d25728-6b37-4efa-97be-9efd9fcad65e.mp4',
    sectionTitle: '搭材作技艺详解',
    features: [
      {
        title: '北京故宫太和门',
        description: '光绪十四年太和门失火，距大婚仅 40 余天，无法完成木构重建，搭材匠人用纯杉篙 + 麻绳，按原尺寸扎起一座与真门分毫不差的彩棚太和门。架体采用双排立杆 + 多层顺水 + 斜戗加固，节点全用半边掖结、瓶子结等传统绳结，无一根铁钉；外立面裱糊彩绸、绘制瓦垄与斗拱，连鸱吻纹路都精准复刻；十丈高的架体在冬季寒风中纹丝不动，顺利完成大婚仪仗的礼制需求，是官式扎彩与架木搭设融合的极致典范。',
        imageUrl: DaCaiZuo1
      },
      {
        title: '北京故宫太和殿',
        description: '太和殿历次官式大修采用的传统杉篙脚手架，严格遵循《工程做法则例》的搭材用工用料标准。立杆、顺水、排木、斜戗、马脚的间距与规格固定，纯麻绳分层绑扎，不破坏古建筑一木一瓦；架体分区分级承重，对应瓦作、木作、彩画作的不同作业面；外侧设护身栏与脚手板，棚顶搭防雨苫布；其 "上窄下宽、层层收分" 的架型，既保证稳定性，又不遮挡建筑主体，是宫殿类大型木构搭材的绝对标准。',
        imageUrl: DaCaiZuo2
      }
    ]
  },
  mu: {
    title: '木作技艺',
    description: '木作是中国古代建筑 "八大作" 中最为核心的工种，承担着建筑骨架与内部装修的全部营造任务，主要分为大木作与小木作两大类：大木作负责建造房屋的整体承重结构，包括柱、梁、枋、檩、斗拱等关键构件，依靠精密榫卯咬合形成稳固的木构架，决定建筑的形制、尺度与抗震性能；小木作则专注于门窗、隔扇、屏风、天花、藻井、佛龛等室内外装修与精细木构件，兼顾实用功能与装饰效果。木作技艺以选材考究、榫卯精巧、尺度严谨为特点，不施一钉便能构筑出坚固耐久、形制规整的建筑体系，既是宫殿坛庙庄严气势的结构基础，也是传统建筑艺术与营造智慧的集中体现，在整个古建筑营造体系中占据着不可替代的主导地位。',
    videoUrl: 'https://cropgif.net/videos/1775182098308-6ea318c7-f5c6-4ad5-814d-352814e620bc.mp4',
    sectionTitle: '木作技艺详解',
    features: [
      {
        title: '山西五台山佛光寺东大殿',
        description: '佛光寺东大殿是现存规模最大、形制最完整的唐代木结构建筑，是研究唐代官式木构的核心实物。建于唐大中十一年（857 年），面阔七间、进深四间，单檐庑殿顶，采用殿堂型抬梁构架，柱网为 "金厢斗底槽"；斗拱雄大，出檐深远（达 4 米），为五铺作双抄单拱，无补间铺作，尽显唐代木作的雄浑大气。木构件比例协调，榫卯简洁有力，不事繁复雕饰，仅以结构本身展现美感，历经千年地震与风霜，主体木构架依然稳固如初。',
        imageUrl: MuZuo1
      },
      {
        title: '应县佛宫寺释迦塔',
        description: '俗称应县木塔，是世界现存最高、最古老的纯木结构楼阁式塔，辽清宁二年（1056 年）建成。塔高 67.31 米，外观五层六檐，内部实为九层，采用独特的 "筒中筒" 木构架体系（内外两圈八边形木柱 + 梁枋 + 斗拱），共有 54 种不同形制的斗拱，堪称斗拱的百科全书。全塔无钉无铆，纯靠榫卯咬合、斜撑加固与重力平衡，不仅承重巨大，更具备极强的抗震性能，历经多次强震仍屹立不倒，是辽代官式木作在结构创新与工艺精度上的巅峰。',
        imageUrl: MuZuo2
      }
    ]
  },
  wa: {
    title: '瓦作技艺',
    description: '瓦作是中国古建筑 "八大作" 之一，主要负责屋面、墙体、台基周边等部位的砖瓦类施工，是建筑防水、围护与外观成型的关键工序。其工作内容涵盖屋面铺瓦、脊兽安装、墙身砌筑、砖墁地面、檐头封护、排水构件安装等，在官式建筑中更严格遵循等级规制，从琉璃瓦颜色、瓦件规格到屋脊形制、吻兽摆放都有明确制度；施工上讲究瓦垄顺直、接缝严密、砌筑平整牢固，既能有效防雨、防风、保护木构与土作结构，又通过色彩与形制塑造建筑庄重华美的外观，与土作、石作、木作紧密配合，共同构成古建筑完整坚固的围护体系。',
    videoUrl: 'https://cropgif.net/videos/1775182136260-921bfa48-c00a-4d29-a874-1b6bdddd9d23.mp4',
    sectionTitle: '瓦作技艺详解',
    features: [
      {
        title: '北京故宫角楼',
        description: '故宫角楼为三重檐十字脊歇山顶，瓦作需处理多角搭接、不同坡向瓦面的复杂交接，是官式瓦作中 "异形瓦件" 应用的标杆。屋面覆黄琉璃瓦，使用了极为罕见的油瓶子嘴、撞肩板瓦、鱼壳瓦等特制瓦件，用于解决十字脊交汇处、抱厦转角处的防水与咬合难题；瓦垄在多重檐、多角脊上连续转折，却始终保持整齐划一。瓦件从模具制作、施釉、烧制到现场铺设，均需极高的精度，历经数百年风雨，角楼屋面几乎无渗漏，体现了古代瓦作工匠应对复杂结构的非凡智慧。',
        imageUrl: WaZuo1
      },
      {
        title: '北京故宫文渊阁',
        description: '文渊阁作为皇家藏书楼，按五行学说取 "水克火" 之意，采用黑琉璃瓦绿剪边的特殊瓦作形制，是清代宫殿中极为少见的黑琉璃案例。屋面满覆黑琉璃筒板瓦，边缘用绿琉璃瓦收边，瓦件的釉色深沉均匀，烧制难度远高于普通黄、绿琉璃；苫背工艺更强化防水性能，多层灰背 + 麻布层，防止雨水渗入损坏藏书。文渊阁的瓦作既遵循官式工艺标准，又因功能需求突破常规颜色等级，是功能与礼制、工艺与审美完美结合的瓦作实例。',
        imageUrl: WaZuo2
      }
    ]
  },
  you: {
    title: '油作技艺',
    description: '油作是中国古建筑 "八大作" 之一，主要负责木构件、石构件及建筑表面的油漆、披麻、捉灰、上光、罩油等防护与装饰施工，核心作用是保护木骨石质不受风雨、潮湿、虫蛀侵蚀，同时提升建筑色彩与等级。施工时常按 "先捉缝灰、通灰，再披麻挂灰、中灰、细灰，最后打磨上油或罩漆" 的工序层层处理，官式建筑更会根据规制使用桐油、光油、色油及贴金配套工艺，既让构件表面光洁平整、耐久抗腐，又能与彩画作相辅相成，营造出庄严华贵的视觉效果，是古建筑延年益寿、彰显皇家气象的重要工序。',
    videoUrl: 'https://cropgif.net/videos/1775182304535-ce6201f8-1a8a-4246-afc0-2be7c5265c1d.mp4',
    sectionTitle: '油作技艺详解',
    features: [
      {
        title: '北京故宫太和殿',
        description: '太和殿的油作严格执行皇家顶级标准，大木构件全部采用二麻六灰的高级地仗（比通用一麻五灰多一层麻、一道灰），木基层先剁斧出斧迹增强附着力，再经捉缝灰、通灰、披麻、压麻灰、中灰、细灰、磨细等多道工序；外檐通体朱红油饰（帝王专用色），用熟桐油调和银朱，分层涂刷后罩清光油，色泽沉稳耐久；斗拱、梁枋、槅扇的油饰边缘线脚精准，无流坠、无皱皮。历经数百年风雨，木构未因潮湿虫蛀大面积糟朽，是油作 "防护 + 礼制" 双重价值的极致体现。',
        imageUrl: YouZuo1
      },
      {
        title: '北京故宫交泰殿',
        description: '交泰殿作为内廷后三宫之一，油作集中展现了小木作（槅扇、槛窗）的精细工艺。采用一麻五灰标准地仗，尤其在槅扇的雕花棂格处，用 "捉灰条" 精细填缝，避免灰层空鼓脱落；外檐朱红漆，内檐则根据空间氛围用浅朱、香色等雅致色调，油层薄而匀，不遮挡木作雕刻的纹理；清代档案中明确记载其油饰修缮的用料配比与工期，是研究清代官式油作工序、材料的权威实物。',
        imageUrl: YouZuo2
      }
    ]
  },
  caihua: {
    title: '彩画作技艺',
    description: '彩画作是中国古建筑 "八大作" 之一，专门负责建筑木构部分的图案绘制、施色贴金与装饰美化，是古代建筑等级与艺术表现力最直观的体现。它不仅以青、绿、红、金等矿物颜料绘制龙纹、凤纹、旋子、锦纹等纹样，更通过和玺彩画、旋子彩画、苏式彩画等严格规制区分宫殿、坛庙、园林与民居的等级差异，构图严谨、设色典雅、层次分明；在工艺上常与油作配合，先做地仗再施彩绘，既起到防潮防蛀、保护木构件的实用作用，又以富丽堂皇的视觉效果烘托建筑的庄严气势或雅致意境，是中国传统建筑独有的装饰艺术，也是古代营造技艺中极具审美价值的重要门类。',
    videoUrl: 'https://cropgif.net/videos/1775182373508-81f69f9e-1aeb-4753-8170-243dab907593.mp4',
    sectionTitle: '彩画作技艺详解',
    features: [
      {
        title: '北京故宫太和殿',
        description: '太和殿的外檐与梁枋通体采用金龙和玺彩画，是清代官式彩画中至高无上的形制。严格遵循三段式构图（枋心、藻头、箍头），枋心满绘气势磅礴的二龙戏珠，藻头用青绿底色衬托金色龙纹与祥云，所有轮廓线均做沥粉贴金（赤金 + 库金两色金工艺），金线饱满、退晕层次分明；斗拱、平板枋、天花的彩画与大木构件严格呼应，色彩上 "上青下绿"，强化轴线对称与皇权威仪。其工序从拓样、起谱子、扎谱子，到沥粉、贴金、刷色，全程按《工程做法则例》执行，是和玺彩画的绝对标准范本。',
        imageUrl: CaiHuaZuo1
      },
      {
        title: '北京颐和园乐寿堂',
        description: '乐寿堂作为颐和园的核心殿堂，彩画采用包袱式苏式彩画，是官式园林彩画的代表。与和玺、旋子彩画的严谨不同，苏式彩画的 "包袱"（半圆形构图）内绘山水、人物、花鸟（如《西湖十景》《群仙祝寿》），画面生动，富有生活气息；框外的卡子、聚锦用软卡子（曲线），搭配雅致的香色、米色，与园林的自然氛围融合；虽为苏画，但仍遵循官式工艺，轮廓线沥粉贴金，颜料选用矿物色与植物色结合，既保留江南彩画的灵动，又具备皇家建筑的精致。',
        imageUrl: CaiHuaZuo2
      }
    ]
  },
  biaohu: {
    title: '裱糊作技艺',
    description: '裱糊作是中国古建筑 "八大作" 之一，主要负责宫殿、府邸、园林等建筑室内墙面、顶棚、隔断、梁柱以及各类木构件的裱糊装饰工作，以纸张、丝绸、锦缎等为主要材料，经调胶、托纸、裁割、刷胶、裱贴、修整等工序完成施工。它既能遮盖构件接缝、修补表面瑕疵，又能起到隔热、防潮、吸声、美化室内环境的作用，在官式建筑中还会根据等级选用不同纹样、质地的裱糊材料，配合室内陈设营造出整洁雅致、庄重华贵的空间氛围，与油作、彩画作相辅相成，共同完善古建筑的内部装饰体系，是传统室内营造中兼具实用与美观的重要工种。',
    videoUrl: 'https://cropgif.net/videos/1775182412782-137622c9-8d0c-4e4c-a86d-d849e6937724.mp4',
    sectionTitle: '裱糊作技艺详解',
    features: [
      {
        title: '北京故宫养心殿',
        description: '养心殿是清代帝王理政与寝居的核心，裱糊作完全遵循宫廷最高规格且兼顾实用性。顶棚与四壁采用 "一麻一布多层纸" 打底，面纸选用小团龙银印花纸，转角严格 "对花跟龙"；槅扇缝隙用 "博缝" 糊饰，门窗内侧裱细绢，冬季保温、夏季隔潮；墙基与木构连接处的浆糊加入黄檗、芸香等中药 "入潢"，实现长效防虫；清代内务府档案完整记载其裱糊用料配比、工期与工匠名录，是研究清宫裱作工序的权威实物资料。',
        imageUrl: BiaoHuZuo1
      },
      {
        title: '承德避暑山庄烟波致爽殿',
        description: '烟波致爽殿作为康熙、乾隆的避暑寝宫，裱作集 "保温、防虫、装饰" 于一体。顶棚与墙面用万字小团龙银印花纸，棚沟处采用 "撒鱼鳞" 工艺（裁细纸条错落糊饰，形成细密纹理，防止开裂与积尘）；明间坎墙复原丝绢裱糊与中药入潢，浆糊揉制时加入天然防虫药材；其 "梅花盘布 + 通片盖面" 的打底流程，在行宫类建筑中极具代表性，既适应塞外温差大的气候，又保持宫廷规制的精致。',
        imageUrl: BiaoHuZuo2
      }
    ]
  }
});

// 计算当前导航项的数据
const activeNavData = computed(() => {
  return badaZuoData.value[activeNav.value];
});

// 选择导航项
const selectNav = (navId) => {
  activeNav.value = navId;
  // 重置视频播放器
  if (videoPlayer.value) {
    videoPlayer.value.pause();
    videoPlayer.value.currentTime = 0;
  }
};
</script>

<style scoped>
/* --- 全局重置与基础样式 --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bada-zuo-container {
  font-family: "MyCustomFont" "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
  background-image: url("../../assets/img/common/archBack.png");
  min-height: 100vh;
}

/* --- 公共的半透明与毛玻璃效果样式 --- */
.glass-panel {
  background-color: rgba(255, 255, 255, 0); /* 85% 透明度的白色背景 */
  backdrop-filter: blur(8px); /* 关键：为下方背景引入毛玻璃模糊效果，极大提升高级感 */
  -webkit-backdrop-filter: blur(8px); /* 兼容 Safari */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid rgba(255, 255, 255, 0.3); /* 淡淡的白边，增加立体感 */
}

/* --- 导航栏样式 --- */
.navigation {
  position: sticky;
  top: 0;
  z-index: 1000;
  margin-bottom: 20px;
  border-radius: 0;
  border: none;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-title {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 0;
}

.nav-item {
  padding: 8px 16px;
  cursor: pointer;
  color: #030200;
  border-radius: 20px;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-size: 0.9rem;
}

.nav-item:hover {
  background-color: rgba(52, 152, 219, 0.1);
  color: #3498db;
}

.nav-item.active {
  background-color: #3498db;
  color: white;
  font-weight: 600;
}

/* --- 视频播放器区域 --- */
.video-section {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container {
  max-width: 1200px;
  width: 90%;
  position: relative;
}

.main-video {
  width: 100%;
  height: auto;
  border-radius: 8px;
  max-height: 600px;
}

/* --- 视频简介区域 --- */
.video-description {
  max-width: 1200px;
  margin: 20px auto;
  padding: 30px;
  width: 90%;
}

.description-title {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
  padding-left: 15px;
}

.description-text {
    font-family:'Microsoft YaHei';
  color: #555;
  line-height: 1.8;
  text-align: justify;
}

/* --- 详细内容展示区 --- */
.details-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  position: relative;
  color: #2c3e50;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: #3498db;
  margin: 15px auto 0;
}

/* 单个展示行 (Flexbox 布局) */
.showcase-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 100px; /* 行与行之间的间距 */
  gap: 60px; /* 文字和图片之间的间距 */
}

.showcase-row:last-child {
  margin-bottom: 0;
}

.text-block {
    
  flex: 1; /* 占据剩余空间 */
  padding: 30px;
  height: 100%;
}

.text-block h3 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 20px;
  border-left: 4px solid #3498db;
  padding-left: 15px;
}

.text-block p {
    font-family:'Microsoft YaHei';
  color: #555;
  text-align: justify;
  line-height: 1.8;
  margin-bottom: 0;
}

.image-block {
  flex: 1; /* 占据剩余空间 */
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  height: 400px;
}

.image-block img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片填满容器且不变形 */
  transition: transform 0.5s ease;
}

.image-block:hover img {
  transform: scale(1.05); /* 鼠标悬停放大效果 */
}

/* --- 核心逻辑：交错布局 --- */

/* 偶数行：改变顺序，让图片在左，文字在右 */
.showcase-row.reverse {
  flex-direction: row-reverse;
}

/* --- 页脚 --- */
.footer {
  text-align: center;
  padding: 40px;
  margin-top: 80px;
  background-color: #2c3e50;
  color: white;
  border-radius: 0;
  border: none;
}

.footer p {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.8);
}

/* --- 响应式设计 (手机端适配) --- */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 15px;
    gap: 10px;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: center;
  }
  
  .nav-item {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
  
  .video-container {
    width: 95%;
  }
  
  .video-description {
    width: 95%;
    padding: 20px;
  }
  
  .description-title {
    font-size: 1.5rem;
  }
  
  .showcase-row {
    flex-direction: column !important; /* 强制取消交错，全部变为上下结构 */
    margin-bottom: 60px;
    gap: 30px;
  }
  
  .image-block {
    height: 300px;
  }
  
  .text-block {
    padding: 20px;
  }
  
  .details-container {
    padding: 0 15px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .footer {
    padding: 30px 15px;
    margin-top: 60px;
  }
}

/* --- 平板端适配 --- */
@media (max-width: 1024px) {
  .showcase-row {
    gap: 40px;
  }
  
  .text-block h3 {
    font-size: 1.5rem;
  }
  
  .image-block {
    height: 350px;
  }
}
</style>