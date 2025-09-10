<template>
  <div class="page-wrapper">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">历史记录</h1>
    </div>

    <div class="movies-list">
      <div 
        v-for="movie in historyMovies" 
        :key="movie.id" 
        class="movie-item"
        @click="goToMovieDetail(movie.id)"
      >
        <img :src="movie.poster" :alt="movie.title" class="movie-poster" />
        <div class="movie-info">
          <span class="movie-title">{{ movie.title }}</span>
          <span class="movie-year">{{ movie.year }}</span>
          <span class="movie-view-date">观看日期: {{ movie.viewDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 模拟历史观看数据，在实际应用中，这里应该从后端获取
const historyMovies = ref([
  { id: '5', title: '盗梦空间', poster: 'https://picsum.photos/id/1024/120/180', year: '2010', viewDate: '2023-01-15' },
  { id: '6', title: '星际穿越', poster: 'https://picsum.photos/id/1025/120/180', year: '2014', viewDate: '2023-01-10' },
  { id: '7', title: '蝙蝠侠：黑暗骑士', poster: 'https://picsum.photos/id/1026/120/180', year: '2008', viewDate: '2022-12-28' },
  { id: '8', title: '指环王：护戒使者', poster: 'https://picsum.photos/id/1027/120/180', year: '2001', viewDate: '2022-12-20' },
]);

const goToMovieDetail = (movieId) => {
  // 使用路由的命名跳转，并传入动态参数
  router.push({ name: 'MovieDetailPage', params: { id: movieId } });
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.page-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
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

/* 竖向影片列表 */
.movies-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.movie-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
}

.movie-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.movie-poster {
  width: 80px;
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
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.movie-year, .movie-view-date {
  font-size: 0.9rem;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .movie-item {
    flex-direction: row;
  }
}
</style>