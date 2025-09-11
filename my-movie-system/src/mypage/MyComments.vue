<template>
  <div class="page-wrapper">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">我的评论</h1>
    </div>

    <div class="main-content-container">
      <div v-if="myComments.length === 0" class="no-comments">
        <p>你还没有发表过任何评论哦～</p>
      </div>
      <div v-else class="comments-list">
        <div 
          v-for="comment in myComments" 
          :key="comment.commentId" 
          class="comment-card"
          @click="goToCommentLocation(comment)"
        >
          <div class="comment-header">
            <span class="movie-title">{{ comment.movieTitle }}</span>
            <span class="comment-time">{{ comment.time }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
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

// 评论数据
const myComments = ref([]);
const isLoading = ref(true);
const error = ref(null);

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步获取用户评论数据
 */
const fetchComments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/comments`);
    // 假设后端返回的数据格式与前端所需一致
    myComments.value = response.data;
  } catch (err) {
    console.error('获取评论数据失败:', err);
    error.value = '无法获取评论数据，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

/**
 * 导航到影片详情页并定位到评论
 */
const goToCommentLocation = (comment) => {
  // 跳转到影片详情页，并通过 hash 定位到评论位置
  router.push({
    name: 'MovieDetailPage',
    params: { id: comment.movieId },
    hash: `#comment-${comment.commentId}`,
  });
};

/**
 * 返回上一页
 */
const goBack = () => {
  router.go(-1);
};

// 在组件挂载时加载数据
onMounted(() => {
  fetchComments();
});
</script>


<style scoped>
/* 整个页面的外层容器 */
.page-wrapper {
  background-color: #eef1f5;
  min-height: 100vh;
  padding: 60px 30px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
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

/* 内容容器 - 网页版风格 */
.main-content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.no-comments {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
  padding: 50px 0;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-card {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.comment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  background-color: #fff;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.comment-time {
  font-size: 0.9rem;
  color: #888;
}

.comment-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
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
  .header {
    margin: 0 auto 30px;
  }
}
</style>