<template>
  <div class="protect">
    <div class="background-container">
      <div class="bg-section">
        <img src="../assets/img/homepage/bg2.png" alt="Background 2">
        <section class="protect-section">
          <div class="protect-title">
            <img src="../assets/img/homepage/protect-title.png" alt="古建保护背景" class="protect-title-bg">
            <span class="protect-title-text">古建保护</span>
          </div>
          <p class="protect-intro">
            中国传统古建筑的保护工作是指针对历史建筑的维护、修复与合理利用的系统性活动，这些工作在近现代逐渐形成科学化、规范化的体系，并在国家政策支持与社会力量参与下不断推进。<br/>
            如今，古建筑保护已成为文化遗产保护的重要组成部分，得到了全社会的高度重视与积极践行。
          </p>
          <div class="protect-grid">
            <div class="protect-row">
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../assets/img/homepage/protect1.png" alt="理念与原则" class="protect-image">
                  <div class="protect-image-overlay">理念与原则</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  ·尊重历史、保留原真性<br/>
                  根据《中国文物保护法》等法规文件，我国古建筑遵循“<font color="red">不改变文物原状</font>”的原则。<br/>
                  ·原真性，即最大限度保留古建筑的原有形制、结构、材料和工艺；<br/>
                  ·整体性，不仅要保护建筑本身，还要保护其周边环境和文化氛围；<br/>
                  ·预防为主，通过日常保养和定期维护，将隐患消灭在萌芽状态；<br/>
                  ·最小干预，在修复过程中减少对建筑本体的干预，确保古建筑在修缮后能够长期稳定。
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../assets/img/homepage/protect2.png" alt="方法与技术" class="protect-image">
                  <div class="protect-image-overlay">方法与技术</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  ·<font color="red">科学保护&有效修复</font><br/>
                  ·优先采用传统工艺和材料，保留古建筑的历史风貌和文化内涵。例如，木结构的榫卯工艺、砖石结构的剔补技术等传统技艺;<br/>
                  ·利用现代科技手段为保护工作提供支持。例如，采用三维测绘、激光扫描等技术进行古建筑的前期诊断，为修复方案提供精准数据；<br/>
                  ·注重其消防安全和结构安全。例如，通过改造消防设施、设置避雷装置等方式，降低古建筑面临的风险。
                </div>
              </div>
            </div>
            <div class="protect-row">
              <div class="protect-item">
                <div class="protect-text">
                  古代各王朝制定的建筑制度做法、工料定额一类的建筑法规，如《考工记》《营造法式》《园冶》等，以及近现代的许多著名匠师，为古建保护作出巨大贡献。<br/>
                  ·林徽因与梁思成是中国古建筑保护的先驱。通过对数百座古建筑进行调查、测绘和研究，发现了佛光寺东大殿等重要建筑，形成了“<font color="red">保存现状，恢复原状</font>”的保护思想。<br/>
                  ·王时伟先生在故宫博物院主持了倦勤斋保护工程、乾隆花园修缮等重要项目。他在实践中引入数字化技术，推动了古建筑保护的现代化。<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;......
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../assets/img/homepage/protect3.png" alt="人物与研究" class="protect-image">
                  <div class="protect-image-overlay">人物与研究</div>
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-text">
                  古建筑保护需要<font color="red">全社会的广泛参与和有效的传承机制</font>，以实现文化遗产的可持续发展。<br/>
                  ·故宫博物院通过举办各类展览和文化活动，提升了公众对古建筑保护的意识。<br/>
                  ·杜仙洲先生通过编写《中国古建筑修缮技术》等教材和培养专业人才，为中国古建筑保护事业奠定了坚实的人才基础。<br/>
                  ·林徽因曾对中国历代装饰图案进行了研究，这些工作不仅保护了传统工艺，还推动了传统文化的创新发展。<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;......
                </div>
              </div>
              <div class="protect-item">
                <div class="protect-image-container">
                  <img src="../assets/img/homepage/protect4.png" alt="参与与传承" class="protect-image">
                  <div class="protect-image-overlay">参与与传承</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Protect'
}
</script>

<style scoped>
.protect {
  min-height: 100vh;
}

.background-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.bg-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.bg-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.protect-section {
  position: relative;
  padding: 100px 50px;
}

.protect-title {
  position: relative;
  text-align: center;
  margin-bottom: 40px;
}

.protect-title-bg {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.protect-title-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.protect-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
  font-size: 16px;
  line-height: 1.6;
  color: #666;
}

.protect-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.protect-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.protect-item {
  position: relative;
}

.protect-image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.protect-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.protect-image-container:hover .protect-image {
  transform: scale(1.05);
}

.protect-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

.protect-text {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .protect-section {
    padding: 50px 20px;
  }
  
  .protect-row {
    grid-template-columns: 1fr;
  }
  
  .protect-title-text {
    font-size: 24px;
  }
}
</style>