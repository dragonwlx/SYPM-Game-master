<template>
  <footer class="footer">
    <div class="footer-left">
      <div class="footer-logo-section">
        <!-- <img src="../assets/img/common/logo.png" alt="Logo" class="footer-logo">
        <div class="footer-title">
          <span class="footer-title-main">东北大学大创组</span>
          <span class="footer-title-sub">NEU TI-Group</span>
        </div> -->
      </div>
      <div class="footer-links">
        <a href="#privacy" class="footer-link">隐私政策</a>
        <span>/</span>
        <a href="#team" class="footer-link" @click.prevent="showTeamModal">创作团队</a>
        <span>/</span>
        <a href="#copyright" class="footer-link">版权声明</a>
        <span>/</span>
        <a href="https://umami.amoe.cc/share/TRmwB5gIaOQNnTHr/sypm.amoe.cc" class="footer-link" target="_blank">访问统计</a>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-info">
        <span>地址：辽宁省沈阳市浑南区创新路195号    邮政编码：110000</span>
        <span>网址：https://www.sypm.amoe.cc</span>
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-qrcode-text">
        <span>扫描二维码</span>
        <span>进入《营 · 造》网页端</span>
      </div>
      <img src="../assets/img/common/site-url-qrcode.png" alt="QR Code" class="footer-qrcode">
    </div>
    
    <!-- 团队弹窗 -->
    <div id="team-modal" class="modal" v-if="showModal">
      <div class="modal-content">
        <img src="../assets/img/homepage/team.png" alt="创作团队" class="team-image">
        <button class="close-button" @click="closeTeamModal">&times;</button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    showTeamModal() {
      this.showModal = true;
    },
    closeTeamModal() {
      this.showModal = false;
    }
  }
}
</script>

<style scoped>
/* 页脚样式 */
.footer {
    position: absolute;
    top: 97.4%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    color: white;
    padding: 2vw 0;
}

.footer-left {
    display: flex;
    flex-direction: column;
    gap: 1vw;
}

.footer-logo-section {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* .footer-logo {
    max-height: 3vw;
    max-width: 3vw;
}

.footer-title {
    display: flex;
    flex-direction: column;
    font-family: 'Ma Shan Zheng', sans-serif;
}

.footer-title-main {
    font-size: 1.6vw;
}

.footer-title-sub {
    font-size: 1.4vw;
} */

.footer-links {
    display: flex;
    margin: 3% auto 0 0;
    gap: 1vw;
    font-size: 1vw;
}

.footer-link {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s;
}

.footer-link:hover {
    opacity: 0.8;
}

.footer-divider {
    width: 120%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0.5vw 0;
}

.footer-info {
    display: flex;
    flex-direction: column;
    gap: 0.5vw;
    font-size: 0.9vw;
    opacity: 0.8;
}

.footer-right {
    display: flex;
    align-items: flex-end;
    gap: 1vw;
    margin: auto 0 0 0;
}

.footer-qrcode-text {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 1vw;
    line-height: 1.5;
    text-align: right;
    margin-bottom: -0.2vw;
}

.footer-qrcode {
    max-width: 6vw;
    max-height: 6vw;
    object-fit: contain;
}

</style>