<template>
  <div class="movie-detail-container">
    <div class="content-card">
      <div class="main-info-section">
        <div class="poster-container">
          <img :src="movieData.poster" :alt="movieData.name" class="movie-poster" />
        </div>
        <div class="details-text-container">
          <h1 class="movie-title">{{ movieData.name }}</h1>
          <p class="movie-id">ID: {{ id }}</p>

          <div class="rating-display">
            <span class="score">{{ movieData.rating }}</span> / 10
          </div>
          <p class="rating-text">来自 12345 位观众的评分</p>
          
          <div class="movie-details">
            <p><strong>导演:</strong> {{ movieData.director }}</p>
            <p><strong>主演:</strong> {{ movieData.actors }}</p>
            <p><strong>类型:</strong> {{ movieData.genres }}</p>
            <p><strong>片长:</strong> {{ movieData.duration }}</p>
            <p><strong>上映时间:</strong> {{ movieData.releaseYear }}</p>
          </div>
        </div>
      </div>
      
      <div class="synopsis-section">
        <h2 class="section-title">剧情简介</h2>
        <p class="synopsis-text">{{ movieData.synopsis }}</p>
      </div>

      <div class="interaction-section">
        <div class="interaction-item" @click="handleLike">
          <div class="icon-container">👍</div>
          <span class="count">{{ likes }}</span>
          <span class="label">点赞</span>
        </div>
        <div class="interaction-item" @click="handleFavorite">
          <div class="icon-container">⭐</div>
          <span class="count">{{ favorites }}</span>
          <span class="label">收藏</span>
        </div>
        <div class="interaction-item" @click="handleShare">
          <div class="icon-container">📤</div>
          <span class="count">{{ shares }}</span>
          <span class="label">分享</span>
        </div>
      </div>

      <div class="comments-section">
        <h2 class="section-title">评论区 ({{ comments.length }})</h2>
        <div class="comment-input-area">
          <input type="text" placeholder="发表你的看法..." class="comment-input" v-model="newCommentText" />
          <button class="comment-button" @click="handleComment">发表</button>
        </div>
        
        <div class="comment-list">
          <p class="no-comments" v-if="comments.length === 0">暂无评论，快来抢沙发吧！</p>
          <div 
            v-for="comment in comments" 
            :key="comment.id" 
            class="comment-item"
            :id="`comment-${comment.id}`"
          >
            <div class="comment-header">
                <span class="comment-user">用户 {{ comment.userId }}</span>
                <span v-if="comment.userId === currentUserId" class="my-comment-tag">你的评论</span>
            </div>
            <p class="comment-text">{{ comment.text }}</p>
            <div class="comment-actions">
              <span class="comment-action" @click="handleCommentLike(comment.id)">
                👍 ({{ comment.likes }})
              </span>
              <span class="comment-action" @click="toggleReplyInput(comment.id)">
                💬 回复
              </span>
              <span 
                class="comment-action"
                @click="handleCommentReport(comment.id)"
              >
                举报
              </span>
              <span 
                v-if="comment.userId === currentUserId"
                class="comment-action delete-action"
                @click="handleDeleteComment(comment.id)"
              >
                删除
              </span>
            </div>

            <div v-if="replyingToId === comment.id" class="reply-input-area">
                <input 
                    type="text" 
                    placeholder="回复这条评论..." 
                    class="comment-input" 
                    v-model="newReplyText"
                    @keyup.enter="handleReply(comment.id)"
                />
                <button class="comment-button" @click="handleReply(comment.id)">回复</button>
            </div>
            
            <div v-if="comment.replies && comment.replies.length > 0" class="reply-list">
                <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                    <p class="reply-text">
                        <span class="reply-user">用户 {{ reply.userId }}</span>: {{ reply.text }}
                    </p>
                    <div class="reply-actions">
                        <span class="comment-action" @click="handleCommentLike(reply.id)">
                            👍 ({{ reply.likes }})
                        </span>
                        <span class="comment-action" @click="toggleReplyInput(reply.id)">
                          💬 回复
                        </span>
                        <span 
                            class="comment-action"
                            @click="handleCommentReport(reply.id)"
                        >
                            举报
                        </span>
                        <span 
                            v-if="reply.userId === currentUserId"
                            class="comment-action delete-action"
                            @click="handleDeleteComment(reply.id, comment.id)"
                        >
                            删除
                        </span>
                    </div>

                    <div v-if="replyingToId === reply.id" class="reply-input-area sub-reply-input">
                        <input 
                            type="text" 
                            :placeholder="`回复 ${reply.userId}...`" 
                            class="comment-input" 
                            v-model="newReplyText"
                            @keyup.enter="handleReply(reply.id, comment.id)"
                        />
                        <button class="comment-button" @click="handleReply(reply.id, comment.id)">回复</button>
                    </div>

                    <div v-if="reply.replies && reply.replies.length > 0" class="reply-list third-level-replies">
                        <div v-for="subReply in reply.replies" :key="subReply.id" class="reply-item sub-reply-item">
                            <p class="reply-text">
                                <span class="reply-user">{{ subReply.userId }}</span> 回复 <span class="reply-user">{{ reply.userId }}</span>: {{ subReply.text }}
                            </p>
                            <div class="reply-actions">
                                <span class="comment-action" @click="handleCommentLike(subReply.id)">
                                    👍 ({{ subReply.likes }})
                                </span>
                                <span 
                                    v-if="subReply.userId === currentUserId"
                                    class="comment-action delete-action"
                                    @click="handleDeleteComment(subReply.id, reply.id)"
                                >
                                    删除
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="related-movies-section">
        <h2 class="section-title">相关推荐</h2>
        <div class="related-movies-list">
          <div v-for="movie in relatedMovies" :key="movie.id" class="related-movie-item" @click="goToMovie(movie.id)">
            <img :src="movie.poster" :alt="movie.name" class="related-movie-poster" />
            <div class="related-movie-info">
              <h3 class="related-movie-name">{{ movie.name }}</h3>
              <p class="related-movie-rating">评分：{{ movie.rating }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div v-if="isReportModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">举报评论</h3>
        <p class="modal-message">请选择举报原因并留下你的联系方式，我们会尽快处理。</p>
        
        <form class="report-form" @submit.prevent="submitReport">
          <div class="report-options">
            <div class="radio-option">
              <input type="radio" id="spam" value="垃圾广告" v-model="reportReason" required>
              <label for="spam">垃圾广告</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="hateSpeech" value="恶意辱骂" v-model="reportReason">
              <label for="hateSpeech">恶意辱骂</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="inappropriate" value="色情/低俗内容" v-model="reportReason">
              <label for="inappropriate">色情/低俗内容</label>
            </div>
            <div class="radio-option">
              <input type="radio" id="other" value="其他" v-model="reportReason">
              <label for="other">其他</label>
            </div>
          </div>
          
          <textarea 
            placeholder="请填写详细说明..." 
            v-model="reportMessage" 
            class="report-textarea"
          ></textarea>
          
          <input 
            type="text" 
            placeholder="请输入你的联系方式（选填）"
            v-model="contactInfo"
            class="report-contact"
          />

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="modal-button cancel">取消</button>
            <button type="submit" class="modal-button submit">提交举报</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const currentUserId = ref('user-A'); // 模拟已登录用户的ID，实际项目中应从认证状态中获取
const isLoading = ref(true);
const error = ref(null);

// 动态数据，从后端加载
const movieData = ref({});
const likes = ref(0);
const favorites = ref(0);
const shares = ref(0);
const relatedMovies = ref([]);

// 评论相关
const comments = ref([]);
const newCommentText = ref('');
const newReplyText = ref('');
const replyingToId = ref(null);

// 举报弹窗相关状态
const isReportModalVisible = ref(false);
const commentToReportId = ref(null);
const reportReason = ref('');
const reportMessage = ref('');
const contactInfo = ref('');

// 后端 API 地址
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步加载所有电影数据
 */
const fetchMovieData = async (movieId) => {
  isLoading.value = true;
  error.value = null;
  try {
    // 获取电影详情
    const movieRes = await axios.get(`${API_BASE_URL}/movies/${movieId}`);
    const movieDetails = movieRes.data.data;
    movieData.value = movieDetails;
    likes.value = movieDetails.likes || 0;
    favorites.value = movieDetails.favorites || 0;
    shares.value = movieDetails.shares || 0;

    // 获取相关电影
    const relatedRes = await axios.get(`${API_BASE_URL}/movies/${movieId}/related`);
    relatedMovies.value = relatedRes.data.data || [];

    // 获取评论列表
    const commentsRes = await axios.get(`${API_BASE_URL}/movies/${movieId}/comments`);
    comments.value = commentsRes.data.data || [];

  } catch (err) {
    console.error('加载电影数据失败:', err);
    error.value = '无法加载电影详情，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

/**
 * 点赞电影
 */
const handleLike = async () => {
  try {
    // 调用点赞 API，后端会处理点赞和取消点赞的逻辑
    await axios.post(`${API_BASE_URL}/movies/${props.id}/like`, { userId: currentUserId.value });
    // 重新获取电影数据以更新点赞数
    await fetchMovieData(props.id);
  } catch (err) {
    console.error('点赞失败:', err);
  }
};

/**
 * 收藏电影
 */
const handleFavorite = async () => {
  try {
    await axios.post(`${API_BASE_URL}/movies/${props.id}/favorite`, { userId: currentUserId.value });
    await fetchMovieData(props.id);
  } catch (err) {
    console.error('收藏失败:', err);
  }
};

/**
 * 分享电影
 */
const handleShare = async () => {
  try {
    await axios.post(`${API_BASE_URL}/movies/${props.id}/share`, { userId: currentUserId.value });
    await fetchMovieData(props.id);
  } catch (err) {
    console.error('分享失败:', err);
  }
};

/**
 * 发表评论
 */
const handleComment = async () => {
  if (newCommentText.value.trim() !== '') {
    try {
      await axios.post(`${API_BASE_URL}/comments`, {
        movieId: props.id,
        userId: currentUserId.value,
        content: newCommentText.value
      });
      newCommentText.value = '';
      await fetchMovieData(props.id); // 刷新评论列表
    } catch (err) {
      console.error('发表评论失败:', err);
    }
  }
};

/**
 * 递归添加新评论或回复
 */
const handleReply = async (targetId) => {
  if (newReplyText.value.trim() !== '') {
    try {
      await axios.post(`${API_BASE_URL}/comments`, {
        movieId: props.id,
        userId: currentUserId.value,
        content: newReplyText.value,
        parentId: targetId
      });
      newReplyText.value = '';
      replyingToId.value = null;
      await fetchMovieData(props.id); // 刷新评论列表
    } catch (err) {
      console.error('发表回复失败:', err);
    }
  }
};

/**
 * 评论点赞
 */
const handleCommentLike = async (commentId) => {
  try {
    await axios.post(`${API_BASE_URL}/comments/${commentId}/like`, { userId: currentUserId.value });
    await fetchMovieData(props.id); // 刷新评论列表
  } catch (err) {
    console.error('评论点赞失败:', err);
  }
};

/**
 * 删除评论
 */
const handleDeleteComment = async (commentIdToDelete) => {
  try {
    await axios.delete(`${API_BASE_URL}/comments/${commentIdToDelete}`);
    await fetchMovieData(props.id); // 刷新评论列表
  } catch (err) {
    console.error('删除评论失败:', err);
  }
};

const toggleReplyInput = (commentId) => {
  replyingToId.value = replyingToId.value === commentId ? null : commentId;
  newReplyText.value = '';
};

const handleCommentReport = (commentId) => {
  commentToReportId.value = commentId;
  isReportModalVisible.value = true;
};

const closeModal = () => {
  isReportModalVisible.value = false;
  commentToReportId.value = null;
  reportReason.value = '';
  reportMessage.value = '';
  contactInfo.value = '';
};

const submitReport = async () => {
  try {
    await axios.post(`${API_BASE_URL}/comments/${commentToReportId.value}/report`, {
      userId: currentUserId.value,
      reason: reportReason.value,
      message: reportMessage.value,
      contact: contactInfo.value,
    });
    showCustomModal('举报已提交，感谢您的反馈！');
    closeModal();
  } catch (err) {
    console.error('提交举报失败:', err);
    showCustomModal('提交举报失败，请重试。');
  }
};

const showCustomModal = (message) => {
  const modalDiv = document.createElement('div');
  modalDiv.style.cssText = `
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2000; text-align: center; font-family: 'Inter', sans-serif;
  `;
  modalDiv.innerHTML = `
    <p style="margin: 0; font-size: 16px;">${message}</p>
    <button onclick="this.parentNode.remove()" style="margin-top: 15px; padding: 8px 16px; border: none; border-radius: 4px; background-color: #e50914; color: white; cursor: pointer;">关闭</button>
  `;
  document.body.appendChild(modalDiv);
};

const goToMovie = (movieId) => {
  router.push({ name: 'MovieDetail', params: { id: movieId } });
};

// 使用 watch 监听路由参数变化，并重新加载数据
watch(() => props.id, (newId) => {
  if (newId) {
    fetchMovieData(newId);
  }
}, { immediate: true });
</script>

<style scoped>
/* 保持原有的样式，仅新增一些用于二级/三级评论的样式 */

.movie-detail-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
  min-height: 100vh;
  position: relative;
}
.content-card {
  background-color: #f8f8f8;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 960px;
  width: 100%;
  position: relative;
  color: #333;
}
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  z-index: 10;
}
.back-button:hover {
  background-color: #b20710;
}
.main-info-section {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 40px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 30px;
}
.poster-container {
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
}
.movie-poster {
  width: 280px;
  height: auto;
  display: block;
}
.details-text-container {
  flex-grow: 1;
  text-align: left;
}
.movie-title {
  font-size: 48px;
  font-weight: bold;
  color: #222;
  margin: 0 0 10px 0;
}
.movie-id {
  font-size: 18px;
  color: #777;
  margin-bottom: 20px;
}
.rating-display {
  font-size: 40px;
  font-weight: bold;
  color: #ffc107;
  display: flex;
  align-items: baseline;
}
.score {
  font-size: 56px;
}
.rating-text {
  color: #999;
  font-size: 14px;
  margin-top: 5px;
}
.movie-details {
  margin-top: 25px;
  line-height: 1.8;
}
.synopsis-section {
  text-align: left;
  margin-bottom: 40px;
}
.synopsis-text {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
}
.interaction-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 40px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.interaction-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}
.interaction-item:hover {
  transform: translateY(-5px);
  color: #e50914;
}
.icon-container {
  font-size: 2.5rem;
  margin-bottom: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.count {
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
}
.label {
  font-size: 14px;
  color: #666;
}
.comments-section {
  text-align: left;
  margin-bottom: 40px;
}
.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}
.comment-input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.comment-input {
  flex-grow: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.comment-button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.comment-button:hover {
  background-color: #b20710;
}
.no-comments {
  color: #999;
  text-align: center;
  font-size: 16px;
}
.comment-list {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}
.comment-item {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  word-wrap: break-word;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
}
.comment-item:hover {
  background-color: #f1f1f1;
}
.comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}
.comment-user {
    font-weight: bold;
    color: #007bff;
    margin-right: 10px;
}
.my-comment-tag {
    background-color: #e50914;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
}
.comment-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 10px;
}
.comment-actions {
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.comment-action {
  cursor: pointer;
  margin-right: 20px;
  transition: color 0.2s;
}
.comment-action:hover {
  color: #e50914;
}
.delete-action {
  color: #dc3545;
}
.delete-action:hover {
  color: #a71d2a;
}

/* 新增的样式 */
.sub-reply-input {
  margin-left: 20px;
  margin-top: 10px;
}

.reply-list {
  margin-top: 15px;
  border-left: 2px solid #ddd;
  padding-left: 15px;
}
.reply-item {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 8px;
}
.reply-list.third-level-replies {
  margin-left: 10px;
  margin-top: 10px;
}
.reply-item.sub-reply-item {
  background-color: #e9ecef;
}
.reply-text {
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 5px;
}
.reply-user {
  font-weight: bold;
  color: #28a745;
}
.related-movies-section {
  text-align: left;
  margin-top: 40px;
}
.related-movies-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
.related-movie-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.related-movie-item:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.related-movie-poster {
  width: 60px;
  height: 90px;
  border-radius: 5px;
  object-fit: cover;
}
.related-movie-info {
  flex-grow: 1;
}
.related-movie-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}
.related-movie-rating {
  font-size: 0.9rem;
  color: #ffc107;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin: 0;
}
.modal-message {
    font-size: 14px;
    color: #777;
    text-align: center;
    line-height: 1.5;
}
.report-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.report-options {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.radio-option {
    display: flex;
    align-items: center;
    font-size: 16px;
}
.radio-option input[type="radio"] {
    margin-right: 10px;
}
.report-textarea {
    width: 100%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    resize: vertical;
    font-family: inherit;
    font-size: 14px;
}
.report-contact {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
}
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}
.modal-button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s, color 0.2s;
}
.modal-button.cancel {
    background-color: #eee;
    color: #666;
}
.modal-button.cancel:hover {
    background-color: #ddd;
}
.modal-button.submit {
    background-color: #e50914;
    color: white;
}
.modal-button.submit:hover {
    background-color: #b20710;
}
</style>