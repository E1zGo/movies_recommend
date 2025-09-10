<template>
  <div class="hot-movies-container">
    <h2 class="section-title">热门电影</h2>
    <div class="carousel-wrapper">
      <button class="nav-button prev" @click="scroll('prev')">&lt;</button>
      <div class="movies-carousel" ref="carousel">
        <div 
          class="movie-card" 
          v-for="movie in hotMovies" 
          :key="movie.id"
          @click="goToMovie(movie.id)"
        >
          <img :src="movie.poster" :alt="movie.name" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-name">{{ movie.name }}</h3>
            <span class="movie-rating">{{ movie.rating }}</span>
          </div>
        </div>
      </div>
      <button class="nav-button next" @click="scroll('next')">&gt;</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const carousel = ref(null);

const hotMovies = ref([
  { id: 21, name: '速度与激情10', rating: 9.0, poster: 'https://cdn.pixabay.com/photo/2023/07/28/18/59/ai-generated-8155998_1280.png' },
  { id: 22, name: '消失的她', rating: 8.8, poster: 'https://cdn.pixabay.com/photo/2023/07/25/11/56/ai-generated-8149176_1280.png' },
  { id: 23, name: '流浪地球2', rating: 9.3, poster: 'https://cdn.pixabay.com/photo/2023/09/21/04/45/ai-generated-8265779_1280.png' },
  { id: 24, name: '封神第一部', rating: 9.1, poster: 'https://cdn.pixabay.com/photo/2023/08/29/14/05/ai-generated-8221191_1280.png' },
  { id: 25, name: '孤注一掷', rating: 8.9, poster: 'https://cdn.pixabay.com/photo/2023/10/25/11/49/ai-generated-8340150_1280.png' },
  { id: 26, name: '八角笼中', rating: 8.7, poster: 'https://cdn.pixabay.com/photo/2023/10/22/07/35/ai-generated-8333333_1280.png' },
  { id: 27, name: '长安三万里', rating: 9.2, poster: 'https://cdn.pixabay.com/photo/2023/10/20/15/34/ai-generated-8330107_1280.png' },
  { id: 28, name: 'GT赛车：极速狂飙', rating: 8.5, poster: 'https://cdn.pixabay.com/photo/2023/10/19/08/42/ai-generated-8326265_1280.png' },
  { id: 29, name: '奥本海默', rating: 9.1, poster: 'https://cdn.pixabay.com/photo/2023/11/03/05/59/ai-generated-8361661_1280.jpg' },
  { id: 30, name: '芭比', rating: 7.9, poster: 'https://cdn.pixabay.com/photo/2016/11/29/03/40/movie-1867140_1280.jpg' },
]);

const scroll = (direction) => {
  const container = carousel.value;
  if (!container) return;
  
  const scrollAmount = 320;
  if (direction === 'next') {
    container.scrollLeft += scrollAmount;
  } else {
    container.scrollLeft -= scrollAmount;
  }
};

const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetailPage', params: { id: movieId } });
};
</script>

<style scoped>
.hot-movies-container {
  margin-top: 50px;
  text-align: center;
}
.section-title {
  font-size: 30px;
  font-weight: 300;
  color: #e50914; 
  margin-bottom: 20px;
}
.movie-card {
  width: 150px;
  background-color: #3a3a3a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  flex-shrink: 0; /* 新增: 防止卡片被压缩 */
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
  padding: 15px;
  text-align: left;
}
.movie-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-rating {
  font-size: 15px;
  color: #f5a623; 
}
.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  max-width: 100%;
}
.nav-button {
  background-color: #333;
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 26px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  flex-shrink: 0;
  opacity: 0.8;
}
.nav-button:hover {
  background-color: #555;
  transform: scale(1.1);
  opacity: 1;
}
.movies-carousel {
  display: flex;
  overflow-x: auto;
  gap: 20px; 
  padding: 10px 0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  width: auto; /* 核心修改：允许宽度自动调整 */
  max-width: 100%;
  flex-wrap: nowrap; /* 核心修改：强制不换行，保持长条 */
}
.movies-carousel::-webkit-scrollbar {
  display: none;
}
</style>
