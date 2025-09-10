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
import { ref, defineProps, watch, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const currentUserId = ref('user-A');
const movieData = ref({});
const likes = ref(0);
const favorites = ref(0);
const shares = ref(0);
const newCommentText = ref('');
const newReplyText = ref('');
const comments = ref([]);
const replyingToId = ref(null);

// 新增：举报弹窗相关状态
const isReportModalVisible = ref(false);
const commentToReportId = ref(null);
const reportReason = ref('');
const reportMessage = ref('');
const contactInfo = ref('');

// 模拟的电影数据列表，现在支持无限层级回复
const mockMovieDatabase = {
  '21': {
    name: '速度与激情10', rating: 9.0, poster: 'https://cdn.pixabay.com/photo/2023/07/28/18/59/ai-generated-8155998_1280.png',
    director: '路易斯·莱特里尔', actors: '范·迪塞尔, 杰森·莫玛', genres: '动作, 犯罪', duration: '141分钟', releaseYear: 2023,
    synopsis: '在无数任务和不可能的几率下，多米尼克·托雷托和他的家人，用巧妙、勇气和技巧战胜了每一个敌人。如今，他们必须面对来自过往的威胁，一个在十年前被他们击败的敌人，而现在正以复仇的姿态出现。',
    comments: [
      { 
        id: 'c1', userId: 'user-B', text: '这部电影太棒了，值得二刷！', likes: 12, replies: [] 
      },
      { 
        id: 'c2', 
        userId: 'user-C', 
        text: '剧情有点拖沓，但特效很赞。', 
        likes: 5, 
        replies: [
          { id: 'r1', userId: 'user-A', text: '我觉得剧情还行，可能是需要更长的铺垫。', likes: 2, replies: [] },
          { 
            id: 'r2', 
            userId: 'user-D', 
            text: '同感，特效确实是亮点。', 
            likes: 1, 
            replies: [
              { id: 'r5', userId: 'user-E', text: '回复 @user-D: 特效确实是一流的！', likes: 1, replies: [] }
            ] 
          }
        ] 
      },
      { 
        id: 'c3', 
        userId: 'user-A', 
        text: '这是我的第一条评论！希望大家喜欢这个新功能。', 
        likes: 20, 
        replies: [
          { 
            id: 'r3', 
            userId: 'user-E', 
            text: '这个评论功能真的很好用！', 
            likes: 3, 
            replies: [
              { id: 'r4', userId: 'user-A', text: '哈哈，谢谢你的夸奖！', likes: 5, replies: [] }
            ]
          }
        ] 
      },
    ]
  },
  '23': {
    name: '流浪地球2', rating: 9.3, poster: 'https://cdn.pixabay.com/photo/2023/09/21/04/45/ai-generated-8265779_1280.png',
    director: '郭帆', actors: '吴京, 刘德华', genres: '科幻, 冒险', duration: '173分钟', releaseYear: 2023,
    synopsis: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。然而宇宙之路危机四伏，为了拯救地球，流浪地球时代的年轻人再次挺身而出。',
    comments: [
      { id: 'c4', userId: 'user-B', text: '硬核科幻，特效堪比好莱坞大片，感觉比第一部更震撼！', likes: 5, replies: [] },
      { id: 'c5', userId: 'user-E', text: '给中国科幻电影点赞！', likes: 15, replies: [] }
    ]
  },
  '11': {
    name: '肖申克的救赎', rating: 9.7, poster: 'https://cdn.pixabay.com/photo/2016/11/29/03/40/movie-1867140_1280.jpg',
    director: '弗兰克·德拉邦特', actors: '蒂姆·罗宾斯, 摩根·弗里曼', genres: '剧情, 犯罪', duration: '142分钟', releaseYear: 1994,
    synopsis: '一名年轻的银行家被冤枉谋杀，被判终身监禁。在充满暴力与腐败的肖申克监狱中，他没有放弃对希望的追求，最终凭借智慧和毅力成功逃脱。',
    comments: [
      { id: 'c6', userId: 'user-A', text: '非常感人的一部电影，经典永流传。', likes: 25, replies: [] },
      { id: 'c7', userId: 'user-F', text: '希望是美好的，也许是人间至善。', likes: 18, replies: [] }
    ]
  }
};
const relatedMovies = ref([
  { id: '201', name: '英雄', rating: 8.8, poster: 'https://cdn.pixabay.com/photo/2023/10/05/18/43/ai-generated-8296316_1280.png' },
  { id: '202', name: '卧虎藏龙', rating: 9.1, poster: 'https://cdn.pixabay.com/photo/2023/07/26/18/06/ai-generated-8152331_1280.png' },
  { id: '203', name: '十面埋伏', rating: 8.2, poster: 'https://cdn.pixabay.com/photo/2023/08/29/14/06/ai-generated-8221192_1280.png' },
]);

const fetchMovieData = (movieId) => {
  const data = mockMovieDatabase[movieId] || {};
  movieData.value = data;
  likes.value = Math.floor(Math.random() * 200) + 50;
  favorites.value = Math.floor(Math.random() * 100) + 20;
  shares.value = Math.floor(Math.random() * 80) + 10;
  // 克隆评论数据以防止意外修改原始模拟数据
  comments.value = JSON.parse(JSON.stringify(data.comments || []));
};

watch(() => props.id, (newId) => {
  fetchMovieData(newId);
}, { immediate: true });

const handleLike = () => { likes.value++; };
const handleFavorite = () => { favorites.value++; };
const handleShare = () => { shares.value++; };

const handleComment = () => {
  if (newCommentText.value.trim() !== '') {
    const newCommentId = Date.now().toString();
    comments.value.unshift({ 
      id: newCommentId,
      userId: currentUserId.value,
      text: newCommentText.value,
      likes: 0,
      replies: []
    });
    newCommentText.value = '';
    
    nextTick(() => {
      const element = document.getElementById(`comment-${newCommentId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.outline = '3px solid #e50914';
        element.style.borderRadius = '8px';
        element.style.boxShadow = '0 0 15px rgba(229, 9, 20, 0.5)';
        setTimeout(() => {
          element.style.outline = 'none';
          element.style.boxShadow = 'none';
        }, 3000);
      }
    });
  }
};

// 递归查找并增加点赞数
const handleCommentLike = (commentId) => {
    const findAndLike = (items) => {
        for (const item of items) {
            if (item.id === commentId) {
                item.likes++;
                return true;
            }
            if (item.replies && findAndLike(item.replies)) {
                return true;
            }
        }
        return false;
    };
    findAndLike(comments.value);
};

const toggleReplyInput = (commentId) => {
    replyingToId.value = replyingToId.value === commentId ? null : commentId;
    newReplyText.value = '';
};

// 递归添加新评论或回复，支持无限层级
const handleReply = (targetId, parentId = null) => {
    if (newReplyText.value.trim() !== '') {
        const newReply = {
            id: Date.now().toString() + 'r',
            userId: currentUserId.value,
            text: newReplyText.value,
            likes: 0,
            replies: [],
        };
        
        // 递归查找目标评论/回复并添加新的回复
        const findAndAdd = (items, idToAddReplyTo) => {
            for (const item of items) {
                if (item.id === idToAddReplyTo) {
                    // 如果不是对顶级评论的回复，则加上 @用户 的标记
                    if (parentId) {
                      newReply.text = `回复 @${item.userId}: ${newReply.text}`;
                    }
                    item.replies.push(newReply);
                    return true;
                }
                if (item.replies && item.replies.length > 0) {
                    if (findAndAdd(item.replies, idToAddReplyTo)) {
                        return true;
                    }
                }
            }
            return false;
        };

        findAndAdd(comments.value, targetId);

        newReplyText.value = '';
        replyingToId.value = null;
    }
};

// 递归查找并删除评论或回复
const handleDeleteComment = (commentIdToDelete, parentId = null) => {
    // 如果有父级ID，则从父级的 replies 列表中删除
    if (parentId) {
        const findAndDeleteFromReplies = (items, targetParentId, childId) => {
            for (const item of items) {
                if (item.id === targetParentId) {
                    item.replies = item.replies.filter(r => r.id !== childId);
                    return true;
                }
                if (item.replies && item.replies.length > 0) {
                    if (findAndDeleteFromReplies(item.replies, targetParentId, childId)) {
                        return true;
                    }
                }
            }
            return false;
        };
        findAndDeleteFromReplies(comments.value, parentId, commentIdToDelete);
    } else {
        // 如果没有父级ID，则从顶级评论列表中删除
        comments.value = comments.value.filter(c => c.id !== commentIdToDelete);
    }
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

const submitReport = () => {
  console.log('提交举报信息：', {
    reportedCommentId: commentToReportId.value,
    reason: reportReason.value,
    message: reportMessage.value,
    contact: contactInfo.value,
  });
  // 这里我们使用一个临时的自定义弹窗来替代 `alert`
  showCustomModal('举报已提交，感谢您的反馈！');
  closeModal();
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

const goToMovie = (movieId) => { router.push({ name: 'MovieDetail', params: { id: movieId } }); };

onMounted(() => {
  if (route.hash) {
    nextTick(() => {
      const element = document.getElementById(route.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.outline = '3px solid #e50914';
        element.style.borderRadius = '8px';
        element.style.boxShadow = '0 0 15px rgba(229, 9, 20, 0.5)';
        setTimeout(() => {
          element.style.outline = 'none';
          element.style.boxShadow = 'none';
        }, 3000);
      }
    });
  }
});
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