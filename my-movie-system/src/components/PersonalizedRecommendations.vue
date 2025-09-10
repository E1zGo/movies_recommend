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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); 

const userLikedMovies = ref([
  { id: 101, name: '星际穿越', rating: 9.4, poster: 'https://cdn.pixabay.com/photo/2023/08/29/14/05/ai-generated-8221191_1280.png', isLiked: true },
  { id: 102, name: '盗梦空间', rating: 9.3, poster: 'https://cdn.pixabay.com/photo/2023/09/21/04/45/ai-generated-8265779_1280.png', isLiked: true },
]);
const allRecommendations = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `推荐电影 ${i + 1}`,
    rating: (9.5 - i * 0.05).toFixed(1),
    poster: `https://picsum.photos/id/${10 + i}/300/450`,
  }))
);

const itemsPerPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => {
  const totalItems = allRecommendations.value.length + userLikedMovies.value.length;
  return Math.ceil(totalItems / itemsPerPage);
});
const displayedMovies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  if (currentPage.value === 1) {
    const recommendedSlice = allRecommendations.value.slice(0, itemsPerPage - userLikedMovies.value.length);
    return [...userLikedMovies.value, ...recommendedSlice];
  } else {
    const startIndex = start - userLikedMovies.value.length;
    const endIndex = end - userLikedMovies.value.length;
    return allRecommendations.value.slice(startIndex, endIndex);
  }
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const firstPage = () => {
    currentPage.value = 1;
};
const lastPage = () => {
    currentPage.value = totalPages.value;
};

const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetailPage', params: { id: movieId } });
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
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