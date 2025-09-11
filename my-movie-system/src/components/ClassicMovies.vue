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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const carousel = ref(null)
const classicMovies = ref([]) // 动态加载

// 滚动
const scroll = (direction) => {
  const container = carousel.value
  if (!container) return
  const scrollAmount = 320
  container.scrollLeft += direction === 'next' ? scrollAmount : -scrollAmount
}

// 跳转到电影详情页
const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetailPage', params: { id: movieId } })
}

// 从后端加载数据
const loadClassicMovies = async () => {
  try {
    const res = await axios.get('/api/movies', {
      params: {
        type: 'classic',   // 后端可根据 type 或标签来返回经典电影
        page: 1,
        size: 15
      }
    })
    classicMovies.value = res.data.data || [] // 假设标准返回 { code, message, data }
  } catch (err) {
    console.error('加载经典电影失败', err)
  }
}

onMounted(() => {
  loadClassicMovies()
})
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