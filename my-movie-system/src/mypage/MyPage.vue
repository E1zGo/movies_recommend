<template>
  <div class="my-page-container">
    <!-- 顶部横幅，包含用户头像、信息、以及背景图 -->
    <div class="user-banner">
      <img src="https://picsum.photos/1920/200?blur=5" alt="Banner Background" class="banner-bg" />
      <div class="banner-content">
        <div class="user-main-info">
          <img src="https://picsum.photos/id/64/150/150" alt="User Avatar" class="user-avatar" />
          <div class="info-details">
            <h1 class="user-name">{{ username }}</h1>
            <p class="user-id">UID: 12345678</p>
            <p class="user-bio">
              <span class="bio-text">编辑个性签名</span>
              <span class="bio-icon">📝</span>
            </p>
          </div>
          <div class="exp-bar-wrapper">
            <div class="exp-bar">
              <div class="exp-bar-fill" :style="{ width: exp + '%' }"></div>
            </div>
            <span class="exp-text">经验值: {{ exp }}/100</span>
          </div>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <div class="stat-number">71</div>
            <div class="stat-label">关注</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">84</div>
            <div class="stat-label">粉丝</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">893</div>
            <div class="stat-label">获赞数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">3.7万</div>
            <div class="stat-label">播放数</div>
          </div>
        </div>
        <div class="edit-profile-button" @click="goToEditProfile">
          编辑资料
        </div>
      </div>
    </div>

    <!-- 主内容区，包含导航栏和左右两栏布局 -->
    <div class="content-wrapper">
      <div class="main-content-area">
        <!-- 导航 Tabs -->
        <div class="tabs-nav">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-item"
            :class="{ 'active': activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </div>
          <div class="tab-search">
            <input type="text" placeholder="搜索内容" class="tab-search-input" />
            <button class="tab-search-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19.5 21L21 19.5L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#555"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 标签页内容 -->
        <div class="tab-content">
          <!-- 主页 -->
          <div v-if="activeTab === 'home'" class="content-section">
            <div class="placeholder-content">
              <p>主页内容区域</p>
            </div>
          </div>
          
          <!-- 评论 -->
          <div v-if="activeTab === 'comments'" class="content-section">
            <div class="section-header">
              <h2 class="section-title">我的评论</h2>
            </div>
            <div class="comments-list">
              <div v-for="comment in comments" :key="comment.id" class="comment-item">
                <div class="comment-header">
                  <span class="comment-date">{{ comment.date }}</span>
                  <a :href="comment.videoLink" class="comment-link">在 {{ comment.videoTitle }} 评论了</a>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
              </div>
            </div>
          </div>

          <!-- 投稿 -->
          <div v-if="activeTab === 'contributions'" class="content-section">
            <div class="placeholder-content">
              <p>投稿内容区域</p>
            </div>
          </div>

          <!-- 我的收藏 -->
          <div v-if="activeTab === 'collection'" class="content-section">
            <div class="section-header">
              <h2 class="section-title">我的收藏</h2>
            </div>
            <div class="movie-grid">
              <div v-for="movie in favoritedMovies" :key="movie.id" class="movie-card">
                <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
                <div class="movie-info">
                  <span class="movie-title">{{ movie.title }}</span>
                  <div class="movie-meta">
                    <span class="movie-year">{{ movie.year }}</span>
                    <span class="movie-rating">⭐️ {{ movie.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 观看记录 -->
          <div v-if="activeTab === 'history'" class="content-section">
            <div class="section-header">
              <h2 class="section-title">观看记录</h2>
              <a href="#" class="view-more">更多 ></a>
            </div>
            <div class="movie-grid">
              <div v-for="movie in historyMovies" :key="movie.id" class="movie-card">
                <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
                <div class="movie-info">
                  <span class="movie-title">{{ movie.title }}</span>
                  <div class="movie-meta">
                    <span class="movie-year">{{ movie.year }}</span>
                    <span class="movie-view-date">{{ movie.viewDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-block">
          <div class="block-title">个人成就</div>
          <div class="achievement-item">
            <div class="achievement-icon">🎖️</div>
            <div class="achievement-text">等级 Lv.6</div>
          </div>
          <div class="achievement-item">
            <div class="achievement-icon">🏅</div>
            <div class="achievement-text">2023 年度 UP 主</div>
          </div>
        </div>

        <div class="sidebar-block">
          <div class="block-title">公告</div>
          <p class="announcement-text">
            编辑我的公告
          </p>
        </div>
        
        <!-- 其他功能模块列表 -->
        <div class="sidebar-block module-list">
          <div class="block-title">更多模块</div>
          <div v-for="module in modules" :key="module.name" class="module-item" @click="handleModuleClick(module)">
            <span class="module-icon">{{ module.icon }}</span>
            <span class="module-name">{{ module.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 模拟已登录用户的 ID，在实际项目中，这应从认证状态管理中获取
const userId = ref(1); 

// 个人信息
const username = ref('');
const exp = ref(0);
const isLoadingProfile = ref(true);

// 加载状态和错误信息
const isLoading = ref(true);
const error = ref(null);

// 评论数据
const comments = ref([]);
// 收藏影片数据
const favoritedMovies = ref([]);
// 历史观看数据
const historyMovies = ref([]);

// 默认显示观看历史页
const activeTab = ref('history');

// 顶部导航栏 Tabs
const tabs = ref([
  { id: 'comments', name: '评论' },
  { id: 'collection', name: '收藏' },
  { id: 'history', name: '观看记录' },
]);

// 其他功能模块列表
const modules = ref([
  { name: '我的评论', icon: '📝', route: '/my-page/comments' },
  { name: '个性装扮', icon: '🎨', route: '/my-page/customization' },
  { name: '设置', icon: '⚙️', route: '/my-page/settings' },
  { name: '客服联系', icon: '📞', route: '/my-page/contact-support' },
]);

// 处理模块点击，如果有路由则跳转
const handleModuleClick = (module) => {
  if (module.route) {
    router.push(module.route);
  } else {
    console.log(`你点击了 "${module.name}" 模块！`);
  }
};

const goToEditProfile = () => {
  router.push({ name: 'EditProfile' });
};

// 后端 API 地址
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步获取用户个人信息
 */
const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}`);
    const userData = response.data;
    username.value = userData.username;
    exp.value = userData.exp; // 假设后端返回exp字段
  } catch (err) {
    console.error('获取个人信息失败:', err);
    error.value = '无法获取个人信息，请稍后再试。';
  } finally {
    isLoadingProfile.value = false;
  }
};

/**
 * 异步获取用户评论数据
 */
const fetchComments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/comments`);
    // 假设后端返回的数据格式与前端所需一致
    comments.value = response.data.map(comment => ({
      id: comment.socialId, // 使用后端返回的唯一ID
      date: new Date(comment.createdAt).toLocaleDateString(),
      videoTitle: comment.movieTitle, // 假设后端返回电影标题
      videoLink: `/movie/${comment.movieId}`, // 假设后端返回电影ID
      content: comment.comment,
    }));
  } catch (err) {
    console.error('获取评论数据失败:', err);
    error.value = '无法获取评论数据，请稍后再试。';
  }
};

/**
 * 异步获取用户收藏影片数据
 */
const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/favorites`);
    // 假设后端返回的数据格式与前端所需一致
    favoritedMovies.value = response.data.map(fav => ({
      id: fav.movieId,
      title: fav.title,
      poster: fav.posterUrl,
      year: new Date(fav.releaseDate).getFullYear(),
      rating: fav.avgRating, // 使用电影的平均评分
    }));
  } catch (err) {
    console.error('获取收藏数据失败:', err);
    error.value = '无法获取收藏数据，请稍后再试。';
  }
};

/**
 * 异步获取用户观看历史数据
 */
const fetchHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/history`);
    // 假设后端返回的数据格式与前端所需一致
    historyMovies.value = response.data.map(history => ({
      id: history.movieId,
      title: history.title,
      poster: history.posterUrl,
      year: new Date(history.releaseDate).getFullYear(),
      viewDate: new Date(history.viewDate).toLocaleDateString(),
    }));
  } catch (err) {
    console.error('获取观看历史数据失败:', err);
    error.value = '无法获取观看历史数据，请稍后再试。';
  }
};

// 在组件挂载时，并行加载所有数据
onMounted(async () => {
  await Promise.all([
    fetchUserProfile(),
    fetchComments(),
    fetchFavorites(),
    fetchHistory()
  ]);
  isLoading.value = false;
});
</script>


<style scoped>
/* Main container */
.my-page-container {
  font-family: 'Inter', sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

/* User banner section */
.user-banner {
  position: relative;
  height: 200px; /* 固定高度，与背景图适配 */
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.banner-content {
  position: relative;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 40px 20px 40px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.7); /* 半透明背景，让背景图隐约可见 */
}

.user-main-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.user-id {
  font-size: 0.9rem;
  color: #999;
  margin-top: 5px;
}

.user-bio {
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
}

.bio-text {
  cursor: pointer;
}

/* 经验条样式 */
.exp-bar-wrapper {
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.exp-bar {
  width: 150px;
  height: 8px;
  background-color: #eef1f5;
  border-radius: 4px;
  overflow: hidden;
}

.exp-bar-fill {
  height: 100%;
  background: #42b983;
  transition: width 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.exp-text {
  font-size: 0.8rem;
  color: #666;
}

/* 用户数据统计 */
.user-stats {
  display: flex;
  gap: 30px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 0.8rem;
  color: #999;
}

.edit-profile-button {
  background-color: #00a1d6;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.edit-profile-button:hover {
  background-color: #008cb3;
}

/* Main content and sidebar wrapper */
.content-wrapper {
  max-width: 1200px;
  margin: 20px auto;
  display: flex;
  gap: 20px;
}

.main-content-area {
  flex: 3;
}

.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-block {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.block-title {
  font-size: 1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.achievement-icon {
  font-size: 1.2rem;
}

.announcement-text {
  font-size: 0.9rem;
  color: #666;
}

/* Tabs navigation */
.tabs-nav {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.tab-item {
  padding: 15px 20px;
  cursor: pointer;
  color: #666;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
}

.tab-item.active {
  color: #00a1d6;
  border-bottom-color: #00a1d6;
}

.tab-search {
  margin-left: auto;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  background-color: #f7f7f7;
}

.tab-search-input {
  border: none;
  background-color: transparent;
  padding: 8px 15px;
  outline: none;
  font-size: 0.9rem;
}

.tab-search-button {
  border: none;
  background-color: #f7f7f7;
  padding: 8px 15px;
  cursor: pointer;
}

/* Video grid and content */
.content-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.sort-options {
  margin-left: 20px;
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #999;
}

.sort-item {
  cursor: pointer;
}

.sort-item.active {
  color: #00a1d6;
  font-weight: 600;
}

.view-all, .view-more {
  margin-left: auto;
  color: #00a1d6;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.view-all {
  margin-right: 15px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.video-card {
  position: relative;
  background-color: #f7f7f7;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-thumbnail {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}

.video-overlay {
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: #fff;
  padding: 5px 10px;
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-end;
}

.video-info {
  padding: 10px;
}

.video-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.video-stats {
  font-size: 0.8rem;
  color: #999;
}

.stat-icon {
  margin-right: 5px;
}

/* Placeholder content for other tabs */
.placeholder-content {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #ccc;
}

/* 评论列表样式 */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  background-color: #fcfcfc;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #eee;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.comment-date {
  font-size: 0.8rem;
  color: #999;
}

.comment-link {
  font-size: 0.9rem;
  color: #00a1d6;
  text-decoration: none;
  font-weight: 500;
}

.comment-link:hover {
  text-decoration: underline;
}

.comment-content {
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
}

/* 电影网格样式 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  justify-content: center;
}

.movie-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.movie-poster {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}

.movie-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.movie-year, .movie-rating, .movie-view-date {
  font-size: 0.9rem;
  color: #666;
}

/* 更多模块列表样式 */
.module-list {
  padding-top: 10px;
}

.module-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.module-item:last-child {
  border-bottom: none;
}

.module-item:hover {
  background-color: #f7f7f7;
}

.module-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
}

.module-name {
  font-size: 1rem;
  font-weight: 500;
  color: #444;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    padding: 0 20px;
  }
}

@media (max-width: 768px) {
  .user-banner {
    height: auto;
    padding-bottom: 20px;
  }

  .banner-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .user-main-info {
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .user-stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }

  .edit-profile-button {
    margin-top: 20px;
  }

  .module-list {
    display: none;
  }
}
</style>
