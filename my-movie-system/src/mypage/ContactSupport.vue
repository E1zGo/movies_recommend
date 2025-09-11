<template>
  <div class="page-wrapper">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">客服联系</h1>
    </div>

    <div class="main-content-container">
      <div class="support-content">
        <h2 class="section-title">常见问题 (FAQ)</h2>
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="faq-item"
            @click="toggleAnswer(index)"
          >
            <div class="question-header">
              <span class="question">{{ faq.question }}</span>
              <svg :class="['arrow-icon', { 'rotated': faq.showAnswer }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            <div v-if="faq.showAnswer" class="answer-container">
              <p class="answer">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <h2 class="section-title">没有找到解决办法？</h2>
        <p class="help-text">如果常见问题无法解决你的疑问，请申请人工服务，我们会尽快为你提供帮助。</p>
        <button class="human-service-button" @click="requestHumanService">
          申请人工服务
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const isLoading = ref(true);
const error = ref(null);

// FAQ 数据将从后端动态获取
const faqs = ref([]);

const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步获取常见问题数据
 */
const fetchFaqs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/support/faqs`);
    // 假设后端返回的数据格式与前端所需一致
    faqs.value = response.data.map(item => ({ ...item, showAnswer: false }));
  } catch (err) {
    console.error('获取 FAQ 数据失败:', err);
    error.value = '无法加载常见问题，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

/**
 * 切换答案的显示/隐藏状态
 */
const toggleAnswer = (index) => {
  faqs.value[index].showAnswer = !faqs.value[index].showAnswer;
};

/**
 * 提交人工服务请求到后端
 */
const requestHumanService = async () => {
  try {
    // 假设后端需要一个用户ID来记录请求
    const userId = 1; // 实际项目中从认证状态获取
    await axios.post(`${API_BASE_URL}/support/request`, { userId });
    console.log('你的申请已提交，客服人员将在24小时内与你联系。');
    // TODO: 替换为更友好的UI提示，例如一个toast或弹窗
  } catch (err) {
    console.error('提交人工服务请求失败:', err);
    error.value = '提交请求失败，请稍后再试。';
  }
};

/**
 * 返回上一页
 */
const goBack = () => {
  router.go(-1);
};

// 在组件挂载时加载数据
onMounted(() => {
  fetchFaqs();
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

.support-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #eee;
}

/* FAQ 列表 */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.faq-item:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #333;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #666;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.answer-container {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.answer {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #555;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

/* 人工服务按钮 */
.help-text {
  font-size: 1rem;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.human-service-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.human-service-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
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