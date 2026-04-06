<template>
  <section id="intro" class="intro-section">
                <div class="intro-left">
                    <img src="../assets/img/homepage/intro-line.png" alt="Decorative Line" class="intro-line">
                    <h2 class="intro-title" style=" font-family: 'MyCustomFont'; text-align: left; padding-left: 5px;">简要介绍</h2>
                    <p class="intro-text" style="font-family: 'Microsoft YaHei';">
                        中国传统建筑营造技艺是以木材为主要建筑材料，以榫卯为木构件的主要结合方法，以模数制为尺度设计和加工生产手段的建筑营造技术体系。它不仅包括设计和建造两重涵义，还涉及选址、布局、尺度等方面，反映了中国传统建筑设计与施工、技术与艺术的高度统一。<br/>
                        <br/>
                        榫卯结构：<br/>
                        榫卯结构是中国传统建筑营造技艺的核心，它通过凸出的榫头和凹进的卯眼相互嵌合，使木构件紧密结合，无需钉子和胶水，不仅结构牢固，还便于拆卸和重组。<br/>
                        <br/>
                        模数制设计：<br/>
                        传统建筑营造技艺采用模数制，以斗拱构件八等级的“材”作为模数标准，匠人可按此预制构件，简化了施工程序。<br/>
                        <br/>
                        八大作施工：<br/>
                        营造技艺的施工过程主要以“八大作”为主，即木作、瓦作、石作、土作、油漆作、彩画作、搭材作、裱糊作。
                    </p>
                </div>
                <div class="intro-right">
                    <img src="../assets/img/homepage/intro1.png" alt="Intro Image 1" class="intro-image">
                    <img src="../assets/img/homepage/intro2.png" alt="Intro Image 2" class="intro-image">
                    <img src="../assets/img/homepage/intro3.png" alt="Intro Image 3" class="intro-image">
                    <img src="../assets/img/homepage/intro4.png" alt="Intro Image 4" class="intro-image">
                    <img src="../assets/img/homepage/intro5.png" alt="Intro Image 5" class="intro-image">
                    <img src="../assets/img/homepage/intro6.png" alt="Intro Image 6" class="intro-image">
                </div>
            </section>
</template>

<script>
export default {
  name: 'Intro'
}
</script>

<style scoped>


.background-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
}

.bg-section {
    width: 100%;
    height: auto;
    display: block;
}

.bg-section img {
    width: 100%;
    height: auto;
    display: block;
    vertical-align: bottom;
}

.bg-section:last-child {
    margin-top: -22.5%;
}

/* 介绍部分样式 */
.intro-section {
    position: absolute;
    top: 16%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    display: flex;
    gap: 4vw;
    color: white;
}

.intro-left {
    flex: 6;
    display: flex;
    flex-direction: column;
    gap: 2vw;
}

.intro-line {
    max-width: 40%;
}

.intro-title {
    margin: -2% 0 -4% -1%;
    font-size: 2.5vw;
    font-family: 'Ma Shan Zheng', sans-serif;
}

.intro-text {
    margin-left: 0.5%;
    font-size: 1vw;
    line-height: 1.5;
    text-align: justify;
    height: 20vw;
    overflow-y: auto;
    font-size: 0.83vw;
}

/* 自定义滚动条样式 */
.intro-text::-webkit-scrollbar {
    width: 6px;
}

.intro-text::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
}

.intro-text::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.intro-text::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

.intro-right {
    flex: 3.2;
    margin-top: 12%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 0.35fr);
    column-gap: 0.8vw;
}

.intro-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5vw;
    transition: transform 0.3s;
    cursor: pointer;
}

.intro-image:hover {
    transform: scale(1.05);
}


</style>