<template>
  <div class="character-page">
    <header class="search-header">
      <h1 class="search-title">匠心传承 · 人物卷宗</h1>
      <div class="search-box">
        <input type="text" placeholder="输入匠人姓名、学者、字号或代表作...">
        <button class="search-btn">检索卷宗</button>
      </div>
    </header>

    <div class="container">
      <aside class="filter-sidebar">
        <div class="filter-group">
          <h3 class="filter-title">历史时期</h3>
          <ul class="filter-list">
            <li 
              v-for="period in periods" 
              :key="period.value"
              :class="{ active: activePeriod === period.value }"
              @click="setActivePeriod(period.value)"
            >{{ period.label }}</li>
          </ul>
        </div>
        <div class="filter-group">
          <h3 class="filter-title">专长领域</h3>
          <ul class="filter-list">
            <li 
              v-for="field in fields" 
              :key="field.value"
              :class="{ active: activeField === field.value }"
              @click="setActiveField(field.value)"
            >{{ field.label }}</li>
          </ul>
        </div>
      </aside>

      <main class="results-area">
        <div class="results-info">
          <span>共收录 <strong>{{ visibleCards.length }}</strong> 位巨匠卷宗</span>
          <span>排序：按年代 ↓</span>
        </div>

        <div class="list-view">
          <div 
            v-for="(card, index) in visibleCards" 
            :key="index"
            class="card"
            :data-tags="card.tags"
            @click="navigateToDetail(card)"
          >
            <div class="card-left">
              <div class="dynasty-badge">{{ card.dynasty }}</div>
              <h3 class="card-name">{{ card.name }}</h3>
              <div class="card-title">{{ card.title }}</div>
            </div>
            <div class="card-right">
              <div class="card-works">【传世之作】{{ card.works }}</div>
              <p class="card-desc">{{ card.description }}</p>
              <div class="card-tags">
                <span v-for="(tag, tagIndex) in card.cardTags" :key="tagIndex" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

// 历史时期选项
const periods = [
  { label: '全部时期', value: 'all' },
  { label: '隋唐及以前', value: 'ancient' },
  { label: '宋辽金元', value: 'song' },
  { label: '明清时期', value: 'mingqing' },
  { label: '近现代学者', value: 'modern' }
];

// 专长领域选项
const fields = [
  { label: '不限', value: 'all' },
  { label: '规划设计', value: 'design' },
  { label: '木作技艺', value: 'wood' },
  { label: '样式图档', value: 'drawing' },
  { label: '学术理论', value: 'theory' }
];

// 活跃的筛选条件
const activePeriod = ref('all');
const activeField = ref('all');

// 人物数据
const cardsData = [
  {
    dynasty: '隋代',
    name: '宇文恺',
    title: '城市规划家、建筑家',
    works: '隋大兴城（唐长安城前身）、洛阳城',
    description: '出身鲜卑贵族，精通历代典章制度与建筑图样。主持设计了当时世界上最大的都城大兴城，其方格网街道和坊市布局对后世及东亚多国都城设计产生了深远影响。',
    tags: '隋唐及以前 规划设计',
    cardTags: ['都城规划', '监造']
  },
  {
    dynasty: '北宋',
    name: '喻皓',
    title: '杰出都料匠',
    works: '开宝寺琉璃塔（预想图）、《木经》',
    description: '以技艺高超闻名于世，曾主持建造开封开宝寺木塔。他将多年的营建经验总结为《木经》三卷，是中国古代较早的木结构建筑技术专著，对李诫的《营造法式》有直接启迪。',
    tags: '宋辽金元 木作技艺 学术理论',
    cardTags: ['都料匠', '木作理论']
  },
  {
    dynasty: '北宋',
    name: '李诫',
    title: '将作监少监、建筑学家',
    works: '《营造法式》',
    description: '奉旨编修《营造法式》，这是中国古代最完整的建筑技术书籍，全面总结了隋唐以来的建筑经验，确立了以“材”为标准的模数制，成为后世官式建筑的圭臬。',
    tags: '宋辽金元 学术理论',
    cardTags: ['营造法式', '模数制']
  },
  {
    dynasty: '清代',
    name: '雷发达',
    title: '"样式雷"家族始祖',
    works: '参与重建太和殿',
    description: '康熙初年，雷发达作为南方匠人应募至北京参与皇家宫殿修建。因技术精湛被提拔为设计掌案，开启了雷氏家族主导清代皇家建筑设计两百余年的辉煌历史。',
    tags: '明清时期 样式图档',
    cardTags: ['样式雷', '烫样']
  },
  {
    dynasty: '近现代',
    name: '梁思成',
    title: '建筑史学家、建筑师',
    works: '《中国建筑史》、参与设计国徽及人民英雄纪念碑',
    description: '中国建筑史学的奠基人。毕生致力于中国古代建筑的研究与保护，与营造学社同仁在兵荒马乱中实地考察全国两千多处古建，破译了《营造法式》天书，首次向世界系统地展示了中国传统建筑的科学与艺术价值。',
    tags: '近现代学者 学术理论 规划设计',
    cardTags: ['营造学社', '中国建筑史']
  },
  {
    dynasty: '近现代',
    name: '林徽因',
    title: '建筑学家、作家',
    works: '参与设计国徽、景泰蓝工艺保护',
    description: '中国现代第一位女性建筑学家。她与梁思成等营造学社成员共同走遍大江南北，考察、测绘了大量濒危古建筑，如测绘佛光寺。她不仅在建筑理论上见解独到，更以文学的笔触向大众普及建筑之美，将科学严谨与艺术浪漫完美结合。',
    tags: '近现代学者 学术理论 规划设计',
    cardTags: ['营造学社', '古建测绘']
  },
  {
    dynasty: '近现代',
    name: '刘敦桢',
    title: '建筑学家、建筑教育家',
    works: '《苏州古典园林》、《中国住宅概说》',
    description: '中国建筑教育及中国建筑史研究的开拓者之一。与梁思成同为中国营造学社的核心人物，学界素有“北梁南刘”之称。他对中国古典园林、传统民居的研究造诣极深，为中国现代建筑学留下了大量珍贵的学术文献。',
    tags: '近现代学者 学术理论',
    cardTags: ['营造学社', '古典园林']
  }
];

// 人物详细数据
const characterDetails = {
  '宇文恺': {
    name: '宇文恺',
    englishName: 'Yu Wenkai (555 - 612)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '隋代' },
      { label: '头衔', value: '城市规划家、建筑家' },
      { label: '传世之作', value: '隋大兴城、洛阳城' },
      { label: '出身', value: '鲜卑贵族' },
      { label: '专长', value: '都城规划、建筑设计' }
    ],
    quote: {
      content: '夫以天下之大，兆民之众，非一人所能独治，故必设官分职，各掌其事。',
      source: '—— 《隋书·宇文恺传》'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '宇文恺，字安乐，隋代杰出的城市规划家、建筑家。出身鲜卑贵族，祖父宇文莫豆干是北周的奠基者之一。他自幼聪慧，博览群书，精通历代典章制度与建筑图样。',
          '隋文帝杨坚建立隋朝后，宇文恺被任命为营新都副监，主持设计了当时世界上最大的都城大兴城（唐长安城前身）。他采用了棋盘式布局，将城市分为宫城、皇城和外郭城三部分，坊市分离，道路纵横交错，这种布局对后世中国乃至东亚多国的都城设计产生了深远影响。'
        ]
      },
      {
        title: '建筑成就',
        paragraphs: [
          '除了大兴城，宇文恺还主持设计了东都洛阳城，同样采用了严谨的规划布局。他还设计了明堂、仁寿宫等重要建筑，展现了卓越的建筑才华。',
          '宇文恺不仅是一位杰出的实践家，还是一位学者。他撰写了《东都图记》二十卷、《明堂图议》二卷等著作，系统总结了自己的建筑经验和理论。'
        ]
      }
    ]
  },
  '喻皓': {
    name: '喻皓',
    englishName: 'Yu Hao (960 - 1010)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '北宋' },
      { label: '头衔', value: '杰出都料匠' },
      { label: '传世之作', value: '开宝寺琉璃塔、《木经》' },
      { label: '专长', value: '木结构建筑、建筑理论' },
      { label: '影响', value: '对《营造法式》有直接启迪' }
    ],
    quote: {
      content: '木者，建筑之根本也。得其法，则千年不倒。',
      source: '—— 喻皓《木经》'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '喻皓，北宋时期杰出的都料匠（即建筑工程师），以技艺高超闻名于世。他出生于杭州，自幼学习木工技艺，凭借天赋和勤奋成为当时最著名的建筑大师。',
          '喻皓曾主持建造开封开宝寺木塔，该塔高达十三层，结构复杂，施工难度极大。他通过巧妙的设计，解决了木塔倾斜的问题，展现了卓越的建筑才能。'
        ]
      },
      {
        title: '《木经》与建筑贡献',
        paragraphs: [
          '喻皓将多年的营建经验总结为《木经》三卷，这是中国古代较早的木结构建筑技术专著。书中详细记载了木结构建筑的设计原则、施工方法和注意事项，对后世建筑产生了深远影响。',
          '《木经》的出现，为后来李诫编修《营造法式》提供了重要参考，是中国古代建筑史上的重要文献。喻皓的建筑思想和技术成就，为中国传统建筑的发展做出了巨大贡献。'
        ]
      }
    ]
  },
  '李诫': {
    name: '李诫',
    englishName: 'Li Jie (1035 - 1110)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '北宋' },
      { label: '头衔', value: '将作监少监、建筑学家' },
      { label: '传世之作', value: '《营造法式》' },
      { label: '官职', value: '将作监少监' },
      { label: '贡献', value: '确立建筑模数制' }
    ],
    quote: {
      content: '营造之事，非精究则不能工。',
      source: '—— 李诫《营造法式》'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '李诫，字明仲，北宋时期杰出的建筑学家、将作监少监。他出生于官宦世家，自幼受到良好的教育，精通经史子集，同时对建筑工程有着浓厚的兴趣。',
          '李诫在将作监任职期间，负责宫廷建筑的设计和施工，积累了丰富的实践经验。他奉旨编修《营造法式》，历时多年，终于完成了这部中国古代最完整的建筑技术书籍。'
        ]
      },
      {
        title: '《营造法式》的价值',
        paragraphs: [
          '《营造法式》全面总结了隋唐以来的建筑经验，确立了以“材”为标准的模数制，成为后世官式建筑的圭臬。书中详细记载了建筑设计、施工方法、材料规格等内容，是中国古代建筑技术的集大成之作。',
          '《营造法式》不仅在中国建筑史上占有重要地位，在世界建筑史上也具有深远影响。它为研究中国古代建筑提供了宝贵的资料，是人类建筑文化的重要遗产。'
        ]
      }
    ]
  },
  '雷发达': {
    name: '雷发达',
    englishName: 'Lei Fada (1619 - 1693)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '清代' },
      { label: '头衔', value: '"样式雷"家族始祖' },
      { label: '传世之作', value: '参与重建太和殿' },
      { label: '家族', value: '样式雷家族' },
      { label: '专长', value: '建筑设计、烫样制作' }
    ],
    quote: {
      content: '建筑之道，在于匠心独运，精益求精。',
      source: '—— 雷发达'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '雷发达，字明所，清代杰出的建筑大师，"样式雷"家族的始祖。他出生于江西南康，自幼学习木工技艺，年轻时就展现出卓越的建筑才华。',
          '康熙初年，雷发达作为南方匠人应募至北京参与皇家宫殿修建。在重建太和殿的过程中，他因技术精湛被提拔为设计掌案，开启了雷氏家族主导清代皇家建筑设计两百余年的辉煌历史。'
        ]
      },
      {
        title: '样式雷家族的辉煌',
        paragraphs: [
          '雷发达创立的"样式雷"家族，在清代二百多年间，先后有八代人主持皇家建筑设计，参与了故宫、颐和园、圆明园、避暑山庄等重要建筑的设计和修建。',
          '样式雷家族以精湛的建筑技艺和独特的烫样制作方法闻名于世。他们制作的建筑模型（烫样），不仅比例精确，而且细节丰富，为皇家建筑的设计和施工提供了重要参考。'
        ]
      }
    ]
  },
  '梁思成': {
    name: '梁思成',
    englishName: 'Liang Sicheng (1901 - 1972)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '近现代' },
      { label: '头衔', value: '建筑史学家、建筑师' },
      { label: '传世之作', value: '《中国建筑史》、参与设计国徽及人民英雄纪念碑' },
      { label: '所属机构', value: '中国营造学社、清华大学建筑系' },
      { label: '配偶', value: '林徽因' }
    ],
    quote: {
      content: '中国建筑之个性乃即我民族之性格，即我艺术及思想特殊之一部，非但在其结构本身之材质方法而已。',
      source: '—— 梁思成《中国建筑史》'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '梁思成，生于日本东京，是中国近代著名思想家梁启超之子。他毕生致力于中国古代建筑的研究和保护，是著名的建筑史学家、建筑师、城市规划师和建筑教育家，一生心系“民族之脊梁”。',
          '青年时期赴美国宾夕法尼亚大学学习建筑，深受西方布杂艺术（Beaux-Arts）体系影响。归国后，他深感中国虽有数千年建筑历史，却无中国人自己编写的建筑史，于是与林徽因等人加入“中国营造学社”，开启了极其艰苦的古建考察之路。'
        ]
      },
      {
        title: '破译天书与发现佛光寺',
        paragraphs: [
          '宋代李诫所著的《营造法式》被誉为中国古建的“天书”，其术语深奥，常人难解。梁思成通过对清代匠人的寻访和大量实地测绘，运用现代建筑学的方法，最终成功破译了这本奇书，确立了中国传统建筑以“材”为标准的模数制体系。',
          '1937年，梁思成与林徽因等人骑毛驴深入山西五台山，发现了建于唐大中十一年（857年）的佛光寺东大殿。这一发现打破了日本学者“中国境内已无唐代木构建筑，要看唐代木构只能去日本奈良”的断言，轰动了世界建筑史学界。'
        ]
      },
      {
        title: '城市保护与“梁陈方案”',
        paragraphs: [
          '新中国成立前夕，为保护北京这座历史文化名城，梁思成在《全国文物古建筑目录》中圈出北京城墙、城门等关键古建，呼吁予以保护。1950年，他与陈占祥共同提出著名的“梁陈方案”，主张保护北京古城老街区，在西郊另建新的行政中心，以避免工业化对古都风貌的破坏。',
          '虽然该方案最终未能被采纳，北京古城墙也面临了被拆除的命运，但梁思成先生“保卫古城”的超前视野与悲壮努力，成为了世界城市规划史上的重要一页。'
        ]
      },
      {
        title: '主要著作与传世贡献',
        paragraphs: [
          '梁思成不仅奠定了中国建筑史学的根基，还创办了东北大学和清华大学两个建筑系，培养了大批建筑人才。他主持并参与了中华人民共和国国徽、人民英雄纪念碑的设计工作。',
          '其代表作《中国建筑史》、《图像中国建筑史》、《营造法式注释》等，至今仍是国内外研究中国古建的必读经典。他用现代科学手段，将中国建筑升华到了世界建筑史的最高殿堂。'
        ]
      }
    ]
  },
  '林徽因': {
    name: '林徽因',
    englishName: 'Lin Huiyin (1904 - 1955)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '近现代' },
      { label: '头衔', value: '建筑学家、作家' },
      { label: '传世之作', value: '参与设计国徽、景泰蓝工艺保护' },
      { label: '所属机构', value: '中国营造学社' },
      { label: '配偶', value: '梁思成' }
    ],
    quote: {
      content: '建筑是凝固的音乐，是一首石头写成的诗。',
      source: '—— 林徽因'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '林徽因，原名林徽音，中国现代第一位女性建筑学家、作家。她出生于浙江杭州，父亲林长民是民国时期著名的政治家和外交家。林徽因自幼聪慧，勤奋好学，早年留学美国宾夕法尼亚大学，学习建筑和美术。',
          '归国后，她与梁思成结婚，并加入中国营造学社，成为该社第一位女性成员。她与梁思成等营造学社成员共同走遍大江南北，考察、测绘了大量濒危古建筑，为中国古代建筑的研究和保护做出了巨大贡献。'
        ]
      },
      {
        title: '建筑成就与文学才华',
        paragraphs: [
          '林徽因在建筑领域的成就显著。她参与了中华人民共和国国徽的设计，为新中国的象征做出了贡献。她还致力于景泰蓝工艺的保护和传承，为中国传统工艺的发展注入了新的活力。',
          '除了建筑，林徽因在文学方面也有着卓越的成就。她的诗歌、散文和小说作品，风格清新优美，情感真挚，展现了她独特的艺术才华。她的文学作品与建筑研究相互融合，体现了她对美和艺术的追求。'
        ]
      },
      {
        title: '学术贡献与影响',
        paragraphs: [
          '林徽因在建筑理论方面有着独到的见解。她主张将现代建筑理论与中国传统建筑相结合，强调建筑的民族性和时代性。她的学术思想对中国现代建筑的发展产生了深远影响。',
          '林徽因的一生，是追求美和真理的一生。她将科学严谨与艺术浪漫完美结合，用自己的才华和努力，为中国建筑和文学事业做出了不可磨灭的贡献。她的精神和成就，将永远激励着后人。'
        ]
      }
    ]
  },
  '刘敦桢': {
    name: '刘敦桢',
    englishName: 'Liu Dunzhen (1897 - 1968)',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: '近现代' },
      { label: '头衔', value: '建筑学家、建筑教育家' },
      { label: '传世之作', value: '《苏州古典园林》、《中国住宅概说》' },
      { label: '所属机构', value: '中国营造学社、东南大学、清华大学' },
      { label: '称号', value: '北梁南刘' }
    ],
    quote: {
      content: '中国古典园林是世界园林之母，其艺术价值不可估量。',
      source: '—— 刘敦桢'
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [
          '刘敦桢，字士能，中国现代著名的建筑学家、建筑教育家。他出生于湖南新宁，早年留学日本东京高等工业学校，学习建筑工程。归国后，他先后在东南大学、中央大学等校任教，培养了大批建筑人才。',
          '刘敦桢是中国营造学社的核心成员之一，与梁思成齐名，学界素有“北梁南刘”之称。他致力于中国古代建筑的研究和保护，尤其是对中国古典园林和传统民居的研究，造诣极深。'
        ]
      },
      {
        title: '学术贡献',
        paragraphs: [
          '刘敦桢的学术成就主要体现在中国古典园林和传统民居的研究方面。他的代表作《苏州古典园林》，系统地总结了苏州园林的艺术特点和营造手法，是中国园林研究的经典之作。',
          '他还著有《中国住宅概说》、《中国建筑史》等重要著作，为中国现代建筑学的发展做出了巨大贡献。他的研究方法严谨科学，注重实地考察和文献考证，为中国建筑史的研究奠定了坚实的基础。'
        ]
      },
      {
        title: '教育事业',
        paragraphs: [
          '刘敦桢不仅是一位杰出的学者，还是一位优秀的教育工作者。他在东南大学、清华大学等校任教期间，培养了大批建筑人才，为中国建筑教育的发展做出了重要贡献。',
          '他注重理论与实践相结合，鼓励学生深入实地考察，培养学生的动手能力和创新精神。他的教育理念和方法，对中国现代建筑教育产生了深远影响。'
        ]
      }
    ]
  }
};

// 计算可见的卡片
const visibleCards = computed(() => {
  return cardsData.filter(card => {
    let periodMatch = true;
    let fieldMatch = true;

    if (activePeriod.value !== 'all') {
      const periodMap = {
        'ancient': '隋唐及以前',
        'song': '宋辽金元',
        'mingqing': '明清时期',
        'modern': '近现代学者'
      };
      periodMatch = card.tags.includes(periodMap[activePeriod.value]);
    }

    if (activeField.value !== 'all') {
      const fieldMap = {
        'design': '规划设计',
        'wood': '木作技艺',
        'drawing': '样式图档',
        'theory': '学术理论'
      };
      fieldMatch = card.tags.includes(fieldMap[activeField.value]);
    }

    return periodMatch && fieldMatch;
  });
});

// 方法
const setActivePeriod = (period) => {
  activePeriod.value = period;
};

const setActiveField = (field) => {
  activeField.value = field;
};

// 跳转到人物详情页面
const navigateToDetail = (card) => {
  // 从 characterDetails 对象中获取人物详细数据
  const characterData = characterDetails[card.name] || {
    name: card.name,
    englishName: '',
    portrait: 'https://images.unsplash.com/photo-1544463478-f07823528f80?q=80&w=600&auto=format&fit=crop',
    info: [
      { label: '朝代', value: card.dynasty },
      { label: '头衔', value: card.title },
      { label: '传世之作', value: card.works }
    ],
    quote: {
      content: '',
      source: ''
    },
    sections: [
      {
        title: '生平概略',
        paragraphs: [card.description]
      }
    ]
  };
  
  // 使用 store 存储人物数据
  store.dispatch('setCharacter', characterData);
  
  // 跳转到详情页面
  router.push({
    name: 'CharacterDetail'
  });
};
</script>

<style scoped>
/* 引入传统宋体风格字体 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.character-page {
  /* 定义CSS变量 */
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
  line-height: 1.6; 
  min-height: 100vh;
}

/* 顶部搜索区 */
.search-header {
  padding: 80px 20px 40px; text-align: center;
  background: linear-gradient(to bottom, rgba(15,12,10,0.9), transparent);
  border-bottom: 1px solid var(--border-color);
}
.search-title { font-size: 2.5rem; color: var(--primary-gold); letter-spacing: 4px; margin-bottom: 30px; }
.search-box { max-width: 600px; margin: 0 auto; display: flex; position: relative; }
.search-box input {
  width: 100%; padding: 15px 25px; font-size: 1.1rem; background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--primary-gold); color: var(--text-light); border-radius: 4px; font-family: 'Noto Serif SC', serif;
}
.search-box input::placeholder { color: var(--text-gray); }
.search-btn {
  position: absolute; right: 5px; top: 5px; bottom: 5px; padding: 0 30px; background: var(--primary-gold); color: #111;
  border: none; border-radius: 2px; cursor: pointer; font-weight: bold; font-size: 1rem; transition: 0.3s;
}
.search-btn:hover { background: var(--gold-hover); }

/* 主体内容区 */
.container { max-width: 1200px; margin: 0 auto; padding: 40px 20px; display: flex; gap: 40px; }

/* 左侧筛选区 */
.filter-sidebar { flex: 0 0 200px; }
.filter-group { margin-bottom: 30px; }
.filter-title { font-size: 1.2rem; color: var(--primary-gold); border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 15px; }
.filter-list { list-style: none; }
.filter-list li { padding: 8px 0; color: var(--text-gray); cursor: pointer; transition: 0.2s; display: flex; align-items: center; }
.filter-list li::before { content: '■'; font-size: 0.5rem; margin-right: 10px; color: transparent; border: 1px solid var(--text-gray); width: 10px; height: 10px; display: inline-flex; justify-content: center; align-items: center; }
.filter-list li:hover, .filter-list li.active { color: var(--text-light); }
.filter-list li.active::before { background: var(--primary-gold); border-color: var(--primary-gold); }

/* 右侧结果区 */
.results-area { flex: 1; }
.results-info { margin-bottom: 30px; color: var(--text-gray); font-size: 0.9rem; display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(194, 156, 87, 0.2); padding-bottom: 15px;}

/* 单列列表布局 */
.list-view {
  display: flex;
  flex-direction: column; 
  gap: 30px; 
}

/* 单个横排列表卡片设计 */
.card {
  width: 100%; 
  background: linear-gradient(to right, rgba(40, 35, 30, 0.9), rgba(30, 25, 20, 0.6)); 
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--primary-gold); 
  border-radius: 4px;
  padding: 25px 30px;
  
  display: flex; /* 左右分栏 */
  align-items: flex-start; 
  gap: 30px; 
  
  transition: 0.3s;
  cursor: pointer;
  position: relative;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}

.card:hover {
  border-color: var(--primary-gold);
  transform: translateY(-3px); 
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

/* 左侧：徽章 + 姓名 + 头衔 */
.card-left {
  flex: 0 0 160px; 
  display: flex;
  flex-direction: column;
  border-right: 1px dashed rgba(194, 156, 87, 0.3); 
  padding-right: 25px;
}

.dynasty-badge {
  align-self: flex-start;
  background: transparent; color: var(--primary-gold);
  border: 1px solid var(--primary-gold);
  padding: 4px 8px; font-size: 0.8rem; letter-spacing: 1px;
  margin-bottom: 15px; 
  border-radius: 2px;
}

.card-name { 
  font-size: 1.8rem; /* 调整后的字号 */
  color: #fff; letter-spacing: 4px; font-weight: normal; 
  margin-bottom: 5px;
}

.card-title {
  font-size: 0.9rem; color: var(--primary-gold);
  letter-spacing: 1px;
}

/* 右侧：代表作 + 描述 + 标签 */
.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-works {
  font-size: 0.95rem; color: #fff;
  margin-bottom: 10px;
  background: rgba(0,0,0,0.2);
  padding: 8px 12px;
  border-radius: 2px;
  border-left: 2px solid var(--primary-gold);
}

.card-desc {
  font-size: 0.95rem; color: var(--text-gray); 
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: justify; 
}

.card-tags {
  margin-top: auto; 
  display: flex; gap: 10px; flex-wrap: wrap;
}

.tag { font-size: 0.75rem; padding: 4px 10px; border: 1px solid rgba(154, 148, 140, 0.4); color: var(--text-gray); border-radius: 20px; }

/* 移动端适配 */
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .filter-sidebar { flex: auto; display: flex; gap: 20px; overflow-x: auto; }
  .filter-group { flex: 1; min-width: 120px; }
  .card { flex-direction: column; gap: 15px; padding: 20px; border-left: none; border-top: 4px solid var(--primary-gold); }
  .card-left { flex: auto; border-right: none; border-bottom: 1px dashed rgba(194, 156, 87, 0.3); padding-right: 0; padding-bottom: 15px; width: 100%;}
}
</style>