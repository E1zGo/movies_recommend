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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goBack = () => {
  router.back();
};

const tabs = ref([
  { 
    id: 'like', 
    label: '点赞', 
    unreadCount: 3, 
    messages: [
      { id: 1, text: '张三赞了你的评论', time: '1分钟前' },
      { id: 2, text: '李四赞了你的帖子', time: '1小时前' },
      { id: 3, text: '王五赞了你的照片', time: '昨天' }
    ] 
  },
  { 
    id: 'reply', 
    label: '回复', 
    unreadCount: 1, 
    messages: [
      { id: 4, text: '张三回复了你的评论: "说得对！"', time: '3分钟前' }
    ] 
  },
  { 
    id: 'at_me', 
    label: '@我', 
    unreadCount: 2, 
    messages: [
      { id: 5, text: '李四在帖子中@了你', time: '2小时前' },
      { id: 6, text: '王五在评论中@了你', time: '昨天' }
    ] 
  },
  { 
    id: 'system', 
    label: '系统消息', 
    unreadCount: 5, 
    messages: [
      { id: 7, text: '新版本上线，更多功能等你来体验！', time: '刚刚' },
      { id: 8, text: '系统维护通知：请提前保存您的草稿', time: '昨天' }
    ] 
  }
]);

const activeTab = ref(null);

const toggleTab = (tabId) => {
  if (activeTab.value === tabId) {
    activeTab.value = null; // 再次点击时收起
  } else {
    activeTab.value = tabId;
    const tab = tabs.value.find(t => t.id === tabId);
    if (tab) {
      tab.unreadCount = 0; // 清除未读数量
    }
  }
};

const privateMessages = ref([
  { id: 10, sender: '小明', avatar: 'https://picsum.photos/id/1005/50/50', text: '你好，很高兴认识你！', time: '1分钟前' },
  { id: 11, sender: '小红', avatar: 'https://picsum.photos/id/1006/50/50', text: '你的文章写得太棒了！', time: '1小时前' },
  { id: 12, sender: '小华', avatar: 'https://picsum.photos/id/1009/50/50', text: '在吗？有个问题想请教一下。', time: '昨天' }
]);
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
