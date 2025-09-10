<template>
  <div class="home-page-container">
    <!-- 英雄区: 搜索 + 欢迎语 -->
    <div class="hero-section">
      <div class="hero-backdrop"></div>
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到你的电影世界</h1>
        <p class="hero-intro">探索、发现、沉浸，你的每一次观影都是一场独特的旅程。</p>
      </div>
      <!-- 搜索框被移动到这里，作为 hero-section 的直接子元素 -->
      <SearchBar />
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <div class="section-title-wrapper">
        <h2 class="section-title">🎬 热门电影</h2>
        <p class="section-subtitle">当前最受关注的热门影片，不错过每一个精彩瞬间。</p>
      </div>
      <HotMovies />
      <div class="divider"></div>

      <div class="section-title-wrapper">
        <h2 class="section-title">✨ 经典佳作</h2>
        <p class="section-subtitle">岁月沉淀下的不朽经典，值得一再回味。</p>
      </div>
      <ClassicMovies @movie-clicked="$emit('movie-clicked', $event)" />
      <div class="divider"></div>

      <div class="section-title-wrapper">
        <h2 class="section-title">🎯 专属推荐</h2>
        <p class="section-subtitle">根据你的喜好，为你量身定制的私人片单。</p>
      </div>
      <PersonalizedRecommendations />
      <div class="divider"></div>

      <div class="section-title-wrapper">
        <h2 class="section-title">☁️ 热门词云</h2>
        <p class="section-subtitle">快速了解当前电影圈的流行趋势。</p>
      </div>
      <WordCloud />
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
// 确保这些组件文件存在于正确的位置
import SearchBar from './components/SearchBar.vue';
import HotMovies from './components/HotMovies.vue';
import ClassicMovies from './components/ClassicMovies.vue';
import PersonalizedRecommendations from './components/PersonalizedRecommendations.vue';
import WordCloud from './components/WordCloud.vue';

defineEmits(['movie-clicked']);
</script>

<style scoped>
/* 整个页面容器，采用清爽的浅色系或中性色 */
.home-page-container {
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7;
  color: #333;
  min-height: 100vh;
}

/* 英雄区 - 核心视觉区域 */
.hero-section {
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  /* 采用简约的纯色背景或浅色背景图 */
  background: #f0f0f0;
}

.hero-backdrop {
  display: none; /* 隐藏背后的模糊效果，简化设计 */
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  max-width: 800px;
  margin-bottom: 30px;
}

.hero-title {
  font-size: 3rem; /* 字体大小适中 */
  font-weight: 700;
  margin-bottom: 15px;
  /* 去除渐变和阴影，使用纯色 */
  color: #222;
  animation: none; /* 去除动画 */
}

.hero-intro {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #666;
  font-style: normal; /* 去除斜体 */
  font-weight: 400;
  letter-spacing: normal;
}

/* 主内容区 - 卡片化布局 */
.main-content {
  padding: 50px 5%;
  position: relative;
  background-color: #fff; /* 使用白色背景，增加内容的区分度 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 增加轻微的阴影 */
}

.section-title-wrapper {
  margin-bottom: 40px;
  text-align: left; /* 左对齐，更符合豆瓣的风格 */
  border-left: 3px solid #ccc; /* 增加左侧的线条装饰 */
  padding-left: 10px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  letter-spacing: normal;
  text-transform: none;
  /* 去除阴影 */
  text-shadow: none;
}

.section-subtitle {
  font-size: 1rem;
  color: #999;
  margin-top: 5px;
  font-style: normal;
}

/* 分隔线 - 简化设计 */
.divider {
  width: 100%;
  height: 1px;
  background: #e0e0e0;
  margin: 60px auto;
  position: relative;
  animation: none; /* 去除动画 */
}

@media (max-width: 768px) {
  .hero-section {
    height: 300px;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-intro {
    font-size: 1rem;
  }
  .main-content {
    padding: 40px 5%;
  }
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
