<template>
  <div class="page-wrapper">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">我的收藏</h1>
    </div>

    <div class="main-content-container">
      <div class="movies-list">
        <div 
          v-for="movie in favoritedMovies" 
          :key="movie.id" 
          class="movie-item"
          @click="goToMovieDetail(movie.id)"
        >
          <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
          <div class="movie-info">
            <span class="movie-title">{{ movie.title }}</span>
            <span class="movie-year">{{ movie.year }}</span>
            <span class="movie-rating">⭐️ {{ movie.rating }}</span>
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

// 收藏影片数据
const favoritedMovies = ref([]);
const isLoading = ref(true);
const error = ref(null);

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步获取用户收藏影片数据
 */
const fetchFavorites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/favorites`);
    // 假设后端返回的数据格式与前端所需一致
    favoritedMovies.value = response.data.map(favorite => ({
      id: favorite.movieId,
      title: favorite.title,
      poster: favorite.posterUrl,
      year: new Date(favorite.releaseDate).getFullYear(),
      rating: favorite.avgRating,
    }));
  } catch (err) {
    console.error('获取收藏数据失败:', err);
    error.value = '无法获取收藏数据，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

/**
 * 导航到电影详情页
 */
const goToMovieDetail = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } });
};

/**
 * 返回上一页
 */
const goBack = () => {
  router.go(-1);
};

// 在组件挂载时加载数据
onMounted(() => {
  fetchFavorites();
});
</script>


<style scoped>
/* 整个页面的外层容器 */
.page-wrapper {
  background-color: #eef1f5;
  min-height: 100vh;
  padding: 60px 30px; /* 增加上下内边距 */
  box-sizing: border-box;
}

/* 头部样式 */
.header {
  display: flex;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto 40px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.back-button:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

.back-button svg {
  width: 24px;
  height: 24px;
  color: #333;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-left: 15px;
}

/* 网页版风格核心改动：新增内容容器 */
.main-content-container {
  max-width: 1000px; /* 增加最大宽度 */
  margin: 0 auto; /* 居中 */
  padding: 30px; /* 增加内边距 */
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 增加阴影 */
  transition: box-shadow 0.3s ease;
}

.main-content-container:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

/* 竖向影片列表 */
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.movie-item {
  display: flex;
  align-items: center;
  background-color: #f9f9f9; /* 调整背景色，与主容器区分 */
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  padding: 15px; /* 增加内边距 */
}

.movie-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.movie-poster {
  width: 100px; /* 稍微增大海报尺寸 */
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
}

.movie-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.movie-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.movie-year, .movie-rating {
  font-size: 1rem;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 30px 15px;
  }
  .main-content-container {
    padding: 20px;
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .movie-item {
    padding: 10px;
  }
}
</style>