<template>
  <div id="app">
    <!-- 主导航栏 -->
    <nav class="main-nav">
      <div class="nav-section left">
        <h1 class="logo">电影推荐</h1>
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/categories" class="nav-item">电影分类</router-link>
        <router-link to="/my-page" class="nav-item">我的个人中心</router-link>
      </div>
      <div class="nav-section right">
        <router-link to="/messages" class="nav-item">
          <span class="icon">📧</span>
        </router-link>
        <router-link to="/my-page" class="nav-item">      </router-link>
      </div>
    </nav>
    <!-- 路由视图，用于显示各个页面的内容 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
// 在这里可以添加全局逻辑，例如身份验证或状态管理
</script>

<style>
/* 全局样式和重置 */
body {
  margin: 0;
  padding-top: 70px; /* 为固定导航栏留出空间 */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

#app {
  text-align: center;
  color: #2c3e50;
}

/* 导航栏样式 */
.main-nav {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  padding: 15px 40px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease-in-out;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #34495e;
  margin: 0;
  letter-spacing: -0.5px;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-section.left {
  gap: 30px;
}

.nav-item {
  font-weight: 500;
  color: #555;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item.router-link-active {
  color: #2c3e50;
  background-color: #f0f4f7;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.nav-item:hover {
  background-color: #f0f0f0;
  color: #1a1a1a;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.icon {
  margin-left: 8px;
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .main-nav {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }
  .nav-section {
    width: 100%;
    justify-content: center;
    gap: 15px;
  }
}
</style>
