<template>
  <div class="classic-movies-container">
    <h2 class="section-title">经典佳片</h2>
    <div class="carousel-wrapper">
      <button class="nav-button prev" @click="scroll('prev')">&lt;</button>
      <div class="movies-carousel" ref="carousel">
        <div 
          class="movie-card" 
          v-for="movie in classicMovies" 
          :key="movie.id"
          @click="goToMovie(movie.id)"
        >
          <img :src="movie.poster" :alt="movie.name" class="movie-poster" />
          <div class="movie-info">
            <h3 class="movie-name">{{ movie.name }}</h3>
            <span class="movie-rating">评分：{{ movie.rating }}</span>
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

const classicMovies = ref([
  { id: 11, name: '肖申克的救赎', rating: 9.7, poster: 'https://cdn.pixabay.com/photo/2016/11/29/03/40/movie-1867140_1280.jpg' },
  { id: 12, name: '霸王别姬', rating: 9.6, poster: 'https://cdn.pixabay.com/photo/2023/11/03/05/59/ai-generated-8361661_1280.jpg' },
  { id: 13, name: '这个杀手不太冷', rating: 9.4, poster: 'https://cdn.pixabay.com/photo/2023/10/25/11/49/ai-generated-8340150_1280.png' },
  { id: 14, name: '阿甘正传', rating: 9.5, poster: 'https://cdn.pixabay.com/photo/2023/10/22/07/35/ai-generated-8333333_1280.png' },
  { id: 15, name: '千与千寻', rating: 9.4, poster: 'https://cdn.pixabay.com/photo/2023/10/20/15/34/ai-generated-8330107_1280.png' },
  { id: 16, name: '泰坦尼克号', rating: 9.4, poster: 'https://cdn.pixabay.com/photo/2023/07/28/18/59/ai-generated-8155998_1280.png' },
  { id: 17, name: '辛德勒的名单', rating: 9.6, poster: 'https://cdn.pixabay.com/photo/2023/10/19/08/42/ai-generated-8326265_1280.png' },
  { id: 18, name: '盗梦空间', rating: 9.3, poster: 'https://cdn.pixabay.com/photo/2023/09/21/04/45/ai-generated-8265779_1280.png' },
  { id: 19, name: '星际穿越', rating: 9.4, poster: 'https://cdn.pixabay.com/photo/2023/08/29/14/05/ai-generated-8221191_1280.png' },
  { id: 20, name: '教父', rating: 9.7, poster: 'https://cdn.pixabay.com/photo/2023/07/25/11/56/ai-generated-8149176_1280.png' },
  { id: 21, name: '指环王：护戒使者', rating: 9.1, poster: 'https://cdn.pixabay.com/photo/2023/07/28/18/59/ai-generated-8155998_1280.png' },
  { id: 22, name: '低俗小说', rating: 8.9, poster: 'https://cdn.pixabay.com/photo/2023/07/25/11/56/ai-generated-8149176_1280.png' },
  { id: 23, name: '忠犬八公的故事', rating: 9.2, poster: 'https://cdn.pixabay.com/photo/2023/09/21/04/45/ai-generated-8265779_1280.png' },
  { id: 24, name: '搏击俱乐部', rating: 9.0, poster: 'https://cdn.pixabay.com/photo/2023/08/29/14/05/ai-generated-8221191_1280.png' },
  { id: 25, name: '飞越疯人院', rating: 9.1, poster: 'https://cdn.pixabay.com/photo/2023/10/25/11/49/ai-generated-8340150_1280.png' },
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
.classic-movies-container {
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
  flex-shrink: 0;
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
  width: auto;
  max-width: 100%;
  flex-wrap: nowrap;
}
.movies-carousel::-webkit-scrollbar {
  display: none;
}
</style>