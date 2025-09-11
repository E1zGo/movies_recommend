<template>
  <div class="page-wrapper">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">设置</h1>
    </div>

    <div class="settings-list-container">
      <div class="settings-list">
        <div 
          v-for="item in settingsOptions" 
          :key="item.name" 
          class="setting-item"
          @click="handleSettingClick(item.name)"
        >
          <span class="item-name">{{ item.name }}</span>
          <div v-if="item.name === '修仙模式'" class="toggle-container">
            <span class="immortal-mode-label">{{ isImmortalModeEnabled ? '已开启' : '未开启' }}</span>
            <input type="checkbox" id="immortalModeToggle" class="toggle-checkbox" v-model="isImmortalModeEnabled">
            <label for="immortalModeToggle" class="toggle-label"></label>
          </div>
          <svg v-else class="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
      
      <button class="logout-button" @click="handleSettingClick('退出当前账号')">
        退出当前账号
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 模拟已登录用户的 ID，在实际项目中应从认证状态管理中获取
const userId = ref(1); 

const isImmortalModeEnabled = ref(false); // 控制修仙模式开关状态
const isLoading = ref(true); // 加载状态
const error = ref(null); // 错误信息

// 其他功能模块列表
const settingsOptions = ref([
  { name: '安全隐私', route: 'SecurityAndPrivacy' },
  { name: '语言', route: 'LanguageSettings' },
  { name: '修仙模式' }, // 修仙模式会单独处理
  { name: '清理缓存' },
  { name: '用户协议', route: 'UserAgreement' },
  { name: '隐私政策', route: 'PrivacyPolicy' },
  { name: '关于众神TV', route: 'About' },
  { name: '账号切换' },
]);

// 后端 API 地址
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步加载用户设置
 */
const fetchUserSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId.value}/settings`);
    isImmortalModeEnabled.value = response.data.isImmortalModeEnabled; // 假设后端返回该字段
  } catch (err) {
    console.error('获取用户设置失败:', err);
    error.value = '无法加载设置，请稍后再试。';
  } finally {
    isLoading.value = false;
  }
};

/**
 * 异步保存修仙模式状态到后端
 */
const saveImmortalModeSetting = async (isEnabled) => {
  try {
    await axios.post(`${API_BASE_URL}/users/${userId.value}/settings/immortal-mode`, { isEnabled });
    console.log('修仙模式状态已成功保存到后端');
  } catch (err) {
    console.error('保存修仙模式设置失败:', err);
    error.value = '修仙模式状态保存失败。';
  }
};

/**
 * 监听修仙模式开关状态变化，并自动保存到后端
 */
watch(isImmortalModeEnabled, (newValue) => {
  saveImmortalModeSetting(newValue);
});

/**
 * 处理设置点击事件
 */
const handleSettingClick = async (item) => {
  switch (item.name) {
    case '安全隐私':
    case '语言':
    case '用户协议':
    case '隐私政策':
    case '关于众神TV':
      if (item.route) {
        router.push({ name: item.route });
      }
      break;
    case '清理缓存':
      // TODO: 替换为 UI 模态框或消息提示
      console.log('正在调用后端 API 清理缓存...');
      try {
        await axios.post(`${API_BASE_URL}/users/${userId.value}/cache/clear`);
        console.log('后端缓存已清理');
        // TODO: 在前端显示清理成功的提示
      } catch (err) {
        console.error('清理缓存失败:', err);
        // TODO: 在前端显示错误提示
      }
      break;
    case '账号切换':
      // TODO: 替换为 UI 模态框
      console.log('正在调用后端 API 切换账号...');
      // 模拟后端登录状态重置
      // router.push({ name: 'Login' });
      break;
    default:
      console.log(`点击了未知的选项: ${item.name}`);
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchUserSettings();
});
</script>




<style scoped>
.page-wrapper {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
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

.settings-list-container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.settings-list {
  display: flex;
  flex-direction: column;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.setting-item:hover {
  background-color: #f0f0f0;
}

/* 移除最后一个列表项的下边框 */
.setting-item:last-of-type {
  border-bottom: none;
}

.item-name {
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #999;
}

/* 修仙模式开关样式 */
.toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.immortal-mode-label {
  font-size: 0.9rem;
  color: #666;
}

/* 自定义开关样式 */
.toggle-checkbox {
  display: none;
}

.toggle-label {
  display: block;
  width: 48px;
  height: 28px;
  background-color: #ccc;
  border-radius: 14px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.4s;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #4CAF50;
}

.toggle-checkbox:checked + .toggle-label::after {
  transform: translateX(20px);
}

/* 退出登录按钮样式 */
.logout-button {
  width: 100%;
  padding: 20px;
  background-color: transparent;
  border: none;
  font-size: 1.1rem;
  color: #dc3545;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #f8d7da;
}
</style>