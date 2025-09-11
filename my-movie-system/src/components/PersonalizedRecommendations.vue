<template>
  <div class="personal-recommendations-container">
    <h2 class="section-title">我的专属推荐</h2>
    <div class="movie-grid">
      <div 
        class="movie-card" 
        v-for="movie in displayedMovies" 
        :key="movie.id"
        @click="goToMovie(movie.id)"
      >
        <img :src="movie.poster" :alt="movie.name" class="movie-poster" />
        <div class="movie-info">
          <h3 class="movie-name">{{ movie.name }}</h3>
          <span class="movie-rating">评分：{{ movie.rating }}</span>
          <span v-if="movie.isLiked" class="liked-tag">你喜欢</span>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button 
        class="page-button" 
        @click="firstPage" 
        :disabled="currentPage === 1"
      >
        首页
      </button>
      <button 
        class="page-button" 
        @click="prevPage" 
        :disabled="currentPage === 1"
      >
        上一页
      </button>

      <button 
        v-for="page in totalPages" 
        :key="page"
        @click="goToPage(page)"
        :class="{ 'active': currentPage === page }"
        class="page-button"
      >
        {{ page }}
      </button>

      <button 
        class="page-button" 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
      >
        下一页
      </button>
      <button 
        class="page-button" 
        @click="lastPage" 
        :disabled="currentPage === totalPages"
      >
        尾页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const recommendedMovies = ref([]);
const currentPage = ref(0);
const pageSize = 8;
const loading = ref(false);
const error = ref(null);

const totalPages = ref(0);
const paginatedMovies = ref([]);

// 模拟的用户ID，实际项目中应从认证状态中获取
const currentUserId = ref('user-A');

const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } });
};

const fetchRecommendations = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(`http://localhost:8080/api/recommendations/user/${currentUserId.value}`);
    recommendedMovies.value = response.data.data;
    totalPages.value = Math.ceil(recommendedMovies.value.length / pageSize);
    updatePaginatedMovies();
  } catch (err) {
    error.value = '加载推荐电影失败。';
    console.error('Failed to fetch recommendations:', err);
  } finally {
    loading.value = false;
  }
};

const updatePaginatedMovies = () => {
  const start = currentPage.value * pageSize;
  const end = start + pageSize;
  paginatedMovies.value = recommendedMovies.value.slice(start, end);
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    updatePaginatedMovies();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    updatePaginatedMovies();
  }
};

onMounted(() => {
  fetchRecommendations();
});

watch(recommendedMovies, () => {
  totalPages.value = Math.ceil(recommendedMovies.value.length / pageSize);
  updatePaginatedMovies();
});
</script>

<style scoped>
.personal-recommendations-container {
  margin-top: 50px;
}
.section-title {
  font-size: 24px;
  font-weight: 500;
  color: #e50914;
  margin-bottom: 30px;
  text-align: center;
}
.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 核心修改：固定为每行5个卡片 */
  gap: 5px; 
}
.movie-card {
  /* 移除固定宽度，让网格自动分配空间 */
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #3a3a3a;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
}
.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
}
.movie-poster {
  width: 100%;
  height: 225px; 
  object-fit: cover;
  display: block;
}
.movie-info {
  padding: 8px;
  text-align: left;
}
.movie-name {
  font-size: 1rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-rating {
  font-size: 0.85rem;
  color: #f5a623;
}
.liked-tag {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #e50914;
  color: white;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 4px;
}
.pagination {
  margin-top: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-button {
  background-color: #333;
  color: white;
  border: 1px solid #555;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  font-size: 16px;
}
.page-button.active {
  background-color: #e50914;
  border-color: #e50914;
}
.page-button:hover:not(.active) {
  background-color: #555;
}
.page-button:disabled {
  background-color: #222;
  cursor: not-allowed;
  color: #666;
  border-color: #444;
}
</style>