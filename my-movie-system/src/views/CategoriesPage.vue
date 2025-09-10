<template>
  <div class="categories-container">
    <h1 class="page-title">电影分类筛选</h1>

    <div class="filter-section">
      <h3>按时间</h3>
      <div class="filter-buttons">
        <button :class="['filter-button', { 'active': selectedYear === '' }]" @click="selectedYear = ''">
          全部
        </button>
        <button :class="['filter-button', { 'active': selectedYear === '2020s' }]" @click="selectedYear = '2020s'">
          2020s
        </button>
        <button :class="['filter-button', { 'active': selectedYear === '2010s' }]" @click="selectedYear = '2010s'">
          2010s
        </button>
        <button :class="['filter-button', { 'active': selectedYear === '2000s' }]" @click="selectedYear = '2000s'">
          2000s
        </button>
        <button :class="['filter-button', { 'active': selectedYear === '1990s' }]" @click="selectedYear = '1990s'">
          1990s
        </button>
      </div>
    </div>

    <div class="filter-section">
      <h3>按类型</h3>
      <div class="filter-tags">
        <button v-for="tag in availableGenres" :key="tag"
          :class="['filter-tag', { 'active': selectedGenres.includes(tag) }]" @click="toggleGenre(tag)">
          {{ tag }}
        </button>
      </div>
    </div>

    <div class="movie-grid">
      <div v-for="movie in filteredMovies" :key="movie.id"
        class="movie-card-wrapper"
        @click="goToMovie(movie.id)">
        <div class="movie-card">
          <div class="movie-poster-container">
            <img :src="movie.poster" :alt="movie.name" class="movie-poster" />
          </div>
          <div class="movie-info">
            <h3 class="movie-name">{{ movie.name }}</h3>
            <span class="movie-rating">{{ movie.year }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredMovies.length === 0" class="no-results">
      <p>没有找到符合条件的电影。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // 引入 useRouter

const router = useRouter(); // 获取 router 实例

// 移除 defineEmits(['movie-clicked']);

const moviesData = ref([
  { id: '1', name: '流浪地球2', poster: 'https://picsum.photos/id/1/200/300', year: 2023, genres: ['科幻', '冒险'] },
  { id: '2', name: '封神第一部', poster: 'https://picsum.photos/id/2/200/300', year: 2023, genres: ['奇幻', '动作'] },
  { id: '3', name: '肖申克的救赎', poster: 'https://picsum.photos/id/3/200/300', year: 1994, genres: ['剧情', '犯罪'] },
  { id: '4', name: '阿凡达', poster: 'https://picsum.photos/id/4/200/300', year: 2009, genres: ['科幻', '冒险'] },
  { id: '5', name: '霸王别姬', poster: 'https://picsum.photos/id/5/200/300', year: 1993, genres: ['剧情', '爱情'] },
  { id: '6', name: '泰坦尼克号', poster: 'https://picsum.photos/id/6/200/300', year: 1997, genres: ['爱情', '剧情'] },
  { id: '7', name: '千与千寻', poster: 'https://picsum.photos/id/7/200/300', year: 2001, genres: ['动画', '奇幻'] },
  { id: '8', name: '哈利·波特', poster: 'https://picsum.photos/id/8/200/300', year: 2001, genres: ['奇幻', '冒险'] },
  { id: '9', name: '盗梦空间', poster: 'https://picsum.photos/id/9/200/300', year: 2010, genres: ['科幻', '悬疑'] },
  { id: '10', name: '星际穿越', poster: 'https://picsum.photos/id/10/200/300', year: 2014, genres: ['科幻', '冒险'] },
  { id: '11', name: '复仇者联盟4', poster: 'https://picsum.photos/id/11/200/300', year: 2019, genres: ['动作', '科幻'] },
  { id: '12', name: '绿皮书', poster: 'https://picsum.photos/id/12/200/300', year: 2018, genres: ['剧情', '传记'] },
  { id: '13', name: '哪吒之魔童降世', poster: 'https://picsum.photos/id/13/200/300', year: 2019, genres: ['动画', '奇幻'] },
  { id: '14', name: '你的名字', poster: 'https://picsum.photos/id/14/200/300', year: 2016, genres: ['动画', '爱情'] },
  { id: '15', name: '让子弹飞', poster: 'https://picsum.photos/id/15/200/300', year: 2010, genres: ['剧情', '喜剧'] },
]);

const availableGenres = ref(['科幻', '动作', '奇幻', '剧情', '冒险', '悬疑', '喜剧', '爱情', '犯罪', '动画', '传记']);

const selectedYear = ref('');
const selectedGenres = ref([]);

const filteredMovies = computed(() => {
  let filtered = moviesData.value;
  if (selectedYear.value) {
    const startYear = parseInt(selectedYear.value.slice(0, 4));
    const endYear = startYear + 9;
    filtered = filtered.filter(movie => movie.year >= startYear && movie.year <= endYear);
  }
  if (selectedGenres.value.length > 0) {
    // 核心改动：使用 .every() 方法确保电影包含所有选中的类型
    filtered = filtered.filter(movie =>
      selectedGenres.value.every(genre => movie.genres.includes(genre))
    );
  }
  return filtered;
});

const toggleGenre = (genre) => {
  const index = selectedGenres.value.indexOf(genre);
  if (index === -1) {
    selectedGenres.value.push(genre);
  } else {
    selectedGenres.value.splice(index, 1);
  }
};

const goToMovie = (movieId) => {
  // 使用 router.push() 进行导航
  router.push({ name: 'MovieDetailPage', params: { id: movieId } });
};
</script>

<style scoped>
/* 整个页面的容器，采用更清爽的浅色系或中性色 */
.categories-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  color: #333;
  font-family: 'Inter', sans-serif;
  background-color: #f7f7f7;
  min-height: 100vh;
}

/* 页面标题的样式，简洁明了 */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #222;
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 1px;
}

/* 筛选区域的容器样式 */
.filter-section {
  margin-bottom: 40px;
}

/* 筛选标题的样式，更加内敛 */
.filter-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 15px;
  border-left: 3px solid #ccc;
  padding-left: 10px;
}

/* 筛选按钮和标签的容器 */
.filter-buttons, .filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 筛选按钮和标签的基础样式，简约扁平化 */
.filter-button,
.filter-tag {
  background-color: #fff;
  color: #555;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;
}

/* 悬停时的效果，使用更柔和的背景色和阴影 */
.filter-button:hover,
.filter-tag:hover {
  background-color: #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 选中状态的样式，使用简单的颜色变化 */
.filter-button.active,
.filter-tag.active {
  background-color: #f0f0f0;
  color: #222;
  border-color: #bbb;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 电影网格布局 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

/* 单个电影卡片的外层容器 */
.movie-card-wrapper {
  cursor: pointer;
}

/* 电影卡片的样式，使用白色背景和轻微阴影 */
.movie-card {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* 电影卡片悬停时的动画效果 */
.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 海报图片的容器，用于控制圆角 */
.movie-poster-container {
  overflow: hidden;
}

/* 海报图片样式 */
.movie-poster {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.2s ease;
}

/* 悬停时海报的放大效果 */
.movie-card:hover .movie-poster {
  transform: scale(1.03);
}

/* 电影信息的容器 */
.movie-info {
  padding: 10px;
  text-align: center;
}

/* 电影名称的样式 */
.movie-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 电影上映年份的样式 */
.movie-rating {
  font-size: 0.8rem;
  color: #999;
}

/* 没有结果时的提示信息样式 */
.no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 60px;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}
</style>
