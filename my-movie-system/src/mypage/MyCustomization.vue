<template>
  <div :class="['page-wrapper', { 'dark-mode': isDarkMode }]" :style="{ backgroundImage: `url(${selectedBackground})` }">
    <div class="header">
      <button @click="goBack" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="page-title">个性装扮</h1>
    </div>

    <div class="customization-container">
      <div class="preview-card">
        <h3>我的个人主页预览</h3>
        <div :class="['preview-avatar-wrapper', selectedAvatarBorder]">
          <img src="https://picsum.photos/id/64/150/150" alt="头像" class="preview-avatar" />
        </div>
        <p class="preview-username">你的昵称</p>
        <div class="preview-exp-bar">
          <div class="preview-exp-fill" style="width: 65%;"></div>
        </div>
      </div>

      <div class="settings-panel">
        <div class="setting-section">
          <h2>背景设置</h2>
          <div class="background-options">
            <div 
              v-for="(bg, index) in backgrounds" 
              :key="index" 
              :class="['background-thumb', { 'selected': selectedBackground === bg }]"
              :style="{ backgroundImage: `url(${bg})` }"
              @click="selectedBackground = bg"
            ></div>
            <div 
              :class="['background-thumb', 'no-bg', { 'selected': selectedBackground === '' }]" 
              @click="selectedBackground = ''"
            >
              <span>无背景</span>
            </div>
          </div>
        </div>

        <div class="setting-section">
          <h2>主题模式</h2>
          <button @click="toggleDarkMode" :class="['theme-toggle-button', { 'dark': isDarkMode }]">
            <span v-if="isDarkMode">🌒 夜间模式</span>
            <span v-else>☀️ 白天模式</span>
          </button>
        </div>

        <div class="setting-section">
          <h2>头像边框</h2>
          <div class="avatar-border-options">
            <div 
              v-for="border in avatarBorders" 
              :key="border.name" 
              :class="['border-option', border.class, { 'selected': selectedAvatarBorder === border.class }]"
              @click="selectedAvatarBorder = border.class"
            >
              <img src="https://picsum.photos/id/64/50/50" alt="头像" class="border-preview-avatar" />
              <span class="border-name">{{ border.name }}</span>
            </div>
          </div>
        </div>

        <button class="save-button" @click="saveSettings">保存设置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isDarkMode = ref(false);
const selectedBackground = ref(''); // 默认无背景
const selectedAvatarBorder = ref(''); // 默认无边框

const backgrounds = ref([
  'https://picsum.photos/id/10/1600/900', // 示例背景1
  'https://picsum.photos/id/100/1600/900', // 示例背景2
  'https://picsum.photos/id/1000/1600/900', // 示例背景3
]);

const avatarBorders = ref([
  { name: '默认', class: '' },
  { name: '金色边框', class: 'golden-border' },
  { name: '霓虹边框', class: 'neon-border' },
  { name: '星空边框', class: 'stars-border' },
]);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const saveSettings = () => {
  console.log('保存设置:', {
    isDarkMode: isDarkMode.value,
    selectedBackground: selectedBackground.value,
    selectedAvatarBorder: selectedAvatarBorder.value,
  });
  alert('设置已保存！ (实际功能需后端支持)');
  // 在实际应用中，这里会将设置发送到后端保存
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
/* 基本样式和主题切换 */
.page-wrapper {
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fa; /* 默认白天模式背景 */
  color: #333; /* 默认白天模式文字颜色 */
  background-size: cover;
  background-position: center;
  transition: background-color 0.5s ease, color 0.5s ease, background-image 0.5s ease;
}

.page-wrapper.dark-mode {
  background-color: #2c3e50; /* 夜间模式背景 */
  color: #ecf0f1; /* 夜间模式文字颜色 */
}

/* 头部样式 */
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

.page-wrapper.dark-mode .back-button svg {
  color: #ecf0f1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-left: 15px;
}

.page-wrapper.dark-mode .page-title {
  color: #ecf0f1;
}

/* 主容器 */
.customization-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap; /* 允许换行 */
}

/* 预览卡片 */
.preview-card {
  flex: 1;
  min-width: 300px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 15px;
  backdrop-filter: blur(5px);
}

.page-wrapper.dark-mode .preview-card {
  background-color: rgba(44, 62, 80, 0.9);
  color: #ecf0f1;
}

.preview-card h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #333;
}
.page-wrapper.dark-mode .preview-card h3 {
  color: #ecf0f1;
}

.preview-avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.preview-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 头像边框样式 */
.preview-avatar-wrapper.golden-border {
  border: 4px solid gold;
  box-shadow: 0 0 15px gold;
}
.preview-avatar-wrapper.neon-border {
  border: 4px solid #00f;
  box-shadow: 0 0 15px #00f, 0 0 25px #0ff;
}
.preview-avatar-wrapper.stars-border {
  border: 4px solid transparent;
  background: linear-gradient(45deg, #ff00cc, #3333ff, #00ffcc) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  box-shadow: 0 0 20px rgba(100, 50, 200, 0.5);
}

.preview-username {
  font-size: 1.2rem;
  font-weight: 600;
  color: #444;
}
.page-wrapper.dark-mode .preview-username {
  color: #ecf0f1;
}

.preview-exp-bar {
  width: 80%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}
.page-wrapper.dark-mode .preview-exp-bar {
  background-color: #555;
}

.preview-exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
}

/* 设置面板 */
.settings-panel {
  flex: 2;
  min-width: 400px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 30px;
  backdrop-filter: blur(5px);
}

.page-wrapper.dark-mode .settings-panel {
  background-color: rgba(44, 62, 80, 0.9);
  color: #ecf0f1;
}

.setting-section h2 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.page-wrapper.dark-mode .setting-section h2 {
  color: #ecf0f1;
  border-bottom-color: #555;
}

/* 背景选项 */
.background-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.background-thumb {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.background-thumb:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.background-thumb.selected {
  border-color: #007bff;
  box-shadow: 0 0 0 2px #007bff, 0 5px 15px rgba(0, 123, 255, 0.3);
}

.background-thumb.no-bg {
  background-color: #e0e0e0;
  color: #555;
  text-shadow: none;
}
.page-wrapper.dark-mode .background-thumb.no-bg {
  background-color: #555;
  color: #ccc;
}
.background-thumb.no-bg.selected {
  border-color: #007bff;
  box-shadow: 0 0 0 2px #007bff, 0 5px 15px rgba(0, 123, 255, 0.3);
}

/* 主题切换按钮 */
.theme-toggle-button {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
}

.theme-toggle-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
}

.theme-toggle-button.dark {
  background-color: #6c757d;
  box-shadow: 0 4px 10px rgba(108, 117, 125, 0.2);
}
.theme-toggle-button.dark:hover {
  background-color: #5a6268;
  box-shadow: 0 6px 15px rgba(108, 117, 125, 0.3);
}

/* 头像边框选项 */
.avatar-border-options {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.border-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 15px;
  background-color: #f0f4f8;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease, transform 0.2s ease, background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.page-wrapper.dark-mode .border-option {
  background-color: #495057;
}

.border-option:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.border-option.selected {
  border-color: #28a745;
  box-shadow: 0 0 0 2px #28a745, 0 5px 15px rgba(40, 167, 69, 0.3);
}

.border-preview-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.border-option.golden-border .border-preview-avatar {
  border: 2px solid gold;
}
.border-option.neon-border .border-preview-avatar {
  border: 2px solid #0ff;
}
.border-option.stars-border .border-preview-avatar {
  border: 2px solid transparent;
  background: linear-gradient(45deg, #ff00cc, #3333ff) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.border-name {
  font-size: 0.9rem;
  color: #555;
}
.page-wrapper.dark-mode .border-name {
  color: #ccc;
}

/* 保存按钮 */
.save-button {
  margin-top: 30px;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  background-color: #28a745;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  align-self: flex-end; /* 靠右对齐 */
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);
}

.save-button:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.3);
}

/* 响应式调整 */
@media (max-width: 900px) {
  .customization-container {
    flex-direction: column;
    align-items: center;
  }
  .preview-card, .settings-panel {
    min-width: unset;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .page-wrapper {
    padding: 20px;
  }
  .header {
    margin-bottom: 30px;
  }
  .page-title {
    font-size: 1.8rem;
  }
  .settings-panel {
    padding: 20px;
    gap: 20px;
  }
  .setting-section h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
  .background-options, .avatar-border-options {
    justify-content: center;
  }
  .save-button {
    align-self: stretch; /* 按钮宽度与父容器相同 */
  }
}
</style>