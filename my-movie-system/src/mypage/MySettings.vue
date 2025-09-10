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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isImmortalModeEnabled = ref(false); // 控制修仙模式开关状态

const settingsOptions = ref([
  { name: '安全隐私' },
  { name: '语言' },
  { name: '修仙模式' }, // 修仙模式会单独处理
  { name: '清理缓存' },
  { name: '用户协议' },
  { name: '隐私政策' },
  { name: '关于众神TV' },
  { name: '账号切换' },
]);

const handleSettingClick = (itemName) => {
  switch (itemName) {
    case '安全隐私':
      console.log('导航到安全隐私页面');
      // router.push({ name: 'SecurityAndPrivacy' });
      break;
    case '语言':
      console.log('导航到语言设置页面');
      // router.push({ name: 'LanguageSettings' });
      break;
    case '修仙模式':
      // 修仙模式的开关由 v-model 控制，点击列表项本身不会触发操作
      break;
    case '清理缓存':
      alert('正在清理缓存...');
      console.log('缓存已清理');
      break;
    case '用户协议':
      console.log('导航到用户协议页面');
      // router.push({ name: 'UserAgreement' });
      break;
    case '隐私政策':
      console.log('导航到隐私政策页面');
      // router.push({ name: 'PrivacyPolicy' });
      break;
    case '关于众神TV':
      console.log('导航到关于页面');
      // router.push({ name: 'About' });
      break;
    case '账号切换':
      alert('正在切换账号...');
      console.log('切换账号功能');
      // router.push({ name: 'Login' });
      break;
    case '退出当前账号':
      if (confirm('确定要退出登录吗？')) {
        console.log('退出登录功能');
        // router.push({ name: 'Login' });
      }
      break;
    default:
      console.log(`点击了未知的选项: ${itemName}`);
  }
};

const goBack = () => {
  router.go(-1);
};
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