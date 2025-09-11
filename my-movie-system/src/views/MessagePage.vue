<template>
  <div class="message-page-container">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <h1 class="page-title">消息</h1>
    </div>

    <!-- 消息类型选项 -->
    <div class="message-tabs-wrapper">
      <div 
        v-for="tab in tabs" 
        :key="tab.id" 
        class="tab-item-container"
      >
        <div 
          :class="['tab-item', { 'active': activeTab === tab.id }]" 
          @click="toggleTab(tab.id)"
        >
          {{ tab.label }}
          <span v-if="tab.unreadCount > 0" class="unread-badge">{{ tab.unreadCount }}</span>
        </div>
        
        <div v-show="activeTab === tab.id" class="message-content-dropdown">
          <ul class="message-list">
            <li v-for="message in tab.messages" :key="message.id" class="message-item">
              <span class="message-text">{{ message.text }}</span>
              <span class="message-time">{{ message.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- 私信列表 -->
    <div class="private-messages-section">
      <h2 class="section-title">私信</h2>
      <ul class="message-list">
        <li v-for="message in privateMessages" :key="message.id" class="message-item">
          <img :src="message.avatar" alt="用户头像" class="message-avatar" />
          <div class="message-content">
            <div class="message-header">
              <span class="message-sender">{{ message.sender }}</span>
              <span class="message-time">{{ message.time }}</span>
            </div>
            <p class="message-text">{{ message.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const goBack = () => {
  router.back();
};

const userId = ref(1); // 模拟已登录用户的ID，实际项目中应从认证状态中获取
const isLoading = ref(true);
const error = ref(null);

// 后端 API 地址
const API_BASE_URL = 'http://localhost:8080/api';

const tabs = ref([
  { id: 'like', label: '点赞', unreadCount: 0, messages: [] },
  { id: 'reply', label: '回复', unreadCount: 0, messages: [] },
  { id: 'at_me', label: '@我', unreadCount: 0, messages: [] },
  { id: 'system', label: '系统消息', unreadCount: 0, messages: [] }
]);

const activeTab = ref(null);
const privateMessages = ref([]);

/**
 * 异步加载所有消息数据
 */
const fetchMessages = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // 获取通知总未读数
    const unreadRes = await axios.get(`${API_BASE_URL}/notifications/unread-count`, { params: { userId: userId.value } });
    const unreadCounts = unreadRes.data.data;
    tabs.value.forEach(tab => {
      tab.unreadCount = unreadCounts[tab.id] || 0;
    });

    // 获取所有通知消息
    for (const tab of tabs.value) {
      const res = await axios.get(`${API_BASE_URL}/notifications`, { params: { userId: userId.value, type: tab.id } });
      tab.messages = res.data.data || [];
    }

    // 获取私信列表
    const privateRes = await axios.get(`${API_BASE_URL}/messages`, { params: { userId: userId.value } });
    privateMessages.value = privateRes.data.data || [];

  } catch (err) {
    console.error('加载消息失败:', err);
    error.value = '无法加载消息，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

const toggleTab = async (tabId) => {
  if (activeTab.value === tabId) {
    activeTab.value = null; // 再次点击时收起
  } else {
    activeTab.value = tabId;
    const tab = tabs.value.find(t => t.id === tabId);
    if (tab && tab.unreadCount > 0) {
      // 标记为已读
      await axios.post(`${API_BASE_URL}/notifications/read-by-type`, { userId: userId.value, type: tabId });
      tab.unreadCount = 0; // 清除未读数量
    }
  }
};

onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
.message-page-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  margin-right: 15px;
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.page-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  flex-grow: 1;
  text-align: center;
}

.message-tabs-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.tab-item-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tab-item-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.tab-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  font-size: 16px;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  border-radius: 12px;
  transition: color 0.2s, background-color 0.2s;
}

.tab-item.active {
  color: #007bff;
  background-color: #eaf5ff;
}

.unread-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff4d4f;
  color: #fff;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
  min-width: 20px;
  text-align: center;
  line-height: 1;
}

.message-content-dropdown {
  padding: 10px 20px;
  background-color: #eaf5ff;
  border-top: 1px solid #d4e7f8;
  border-radius: 0 0 12px 12px;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #c8dcf0;
}

.message-item:last-child {
  border-bottom: none;
}

.message-text {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
  flex-grow: 1;
}

.message-time {
  font-size: 12px;
  color: #999;
  white-space: nowrap;
}

.private-messages-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.message-item:last-child {
  border-bottom: none;
}

.message-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.message-content {
  flex-grow: 1;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.message-sender {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-text {
  font-size: 14px;
  color: #666;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
