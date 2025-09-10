<template>
  <div class="search-container" ref="searchBarRef">
    <div :class="['search-bar', { 'focused': isFocused }]">
      <input 
        type="text" 
        v-model="searchQuery" 
        @focus="handleFocus" 
        @blur="handleBlur" 
        @keyup.enter="handleSearch"
        placeholder="搜索电影、类型或导演..." 
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- 使用 <teleport> 将下拉菜单渲染到 body 标签下 -->
    <teleport to="body">
      <div v-if="isDropdownVisible" 
           class="search-dropdown" 
           :style="dropdownStyle">
        
        <div v-if="history.length > 0" class="section">
          <div class="section-header">
            <span class="section-title">历史搜索</span>
            <button @click="clearHistory" class="clear-button">清空</button>
          </div>
          <div class="list">
            <span 
              v-for="item in history" 
              :key="item" 
              @click="selectSearch(item)" 
              class="list-item history-item"
            >
              {{ item }}
            </span>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <span class="section-title">热搜电影榜</span>
          </div>
          <div class="list hot-list">
            <div 
              v-for="(item, index) in hotList" 
              :key="item" 
              @click="selectSearch(item)"
              class="list-item"
            >
              <span :class="{'top-three': index < 3}" class="rank">{{ index + 1 }}</span>
              <span class="movie-name">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <span class="section-title">搜索发现</span>
          </div>
          <div class="list">
            <span 
              v-for="item in discover" 
              :key="item" 
              @click="selectSearch(item)" 
              class="list-item"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const searchQuery = ref('');
const isDropdownVisible = ref(false);
const isFocused = ref(false);
const errorMessage = ref('');
const dropdownStyle = ref({});
const searchBarRef = ref(null);

const history = ref(['复仇者联盟', '蜘蛛侠：英雄远征']);
const hotList = ref(['流浪地球2', '长津湖', '你好，李焕英', '战狼2', '哪吒之魔童降世', '速度与激情10', '消失的她', '封神第一部']);
const discover = ref(['科幻', '悬疑', '动作', '喜剧', '爱情', '冒险']);

// 新增：更新下拉菜单位置的函数
const updateDropdownPosition = () => {
  if (searchBarRef.value) {
    const rect = searchBarRef.value.getBoundingClientRect();
    dropdownStyle.value = {
      top: `${rect.bottom + 12}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
    };
  }
};

let blurTimeout = null;

const handleSearch = () => {
  if (searchQuery.value.trim() === '') {
    errorMessage.value = '请输入电影名称。';
    return;
  }
  
  errorMessage.value = '';
  
  if (!history.value.includes(searchQuery.value)) {
    history.value.unshift(searchQuery.value);
  }
  
  console.log('搜索内容:', searchQuery.value);
  isDropdownVisible.value = false;
};

const selectSearch = (item) => {
  searchQuery.value = item;
  handleSearch();
};

const clearHistory = () => {
  history.value = [];
};

const handleBlur = () => {
  isFocused.value = false;
  blurTimeout = setTimeout(() => {
    isDropdownVisible.value = false;
  }, 100);
  window.removeEventListener('scroll', updateDropdownPosition);
};

const handleFocus = () => {
  clearTimeout(blurTimeout);
  isDropdownVisible.value = true;
  isFocused.value = true;
  updateDropdownPosition();
  window.addEventListener('scroll', updateDropdownPosition);
};

// 确保在组件销毁时移除事件监听器，避免内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', updateDropdownPosition);
});
</script>

<style scoped>
.search-container {
  width: 100%;
  max-width: 500px;
  position: relative;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 8px 15px;
  border: 1px solid transparent;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.search-bar.focused {
  border-color: #ffc107;
  box-shadow: 0 0 15px #ffc107;
}

.search-input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  outline: none;
  padding-right: 10px;
}
.search-input::placeholder {
  color: #a0a0a0;
}

.search-button {
  background: none;
  border: none;
  color: #ffc107;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.search-button:hover {
  transform: scale(1.1);
}

.error-message {
  color: #e50914;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: bold;
}

.search-dropdown {
  position: fixed;
  z-index: 9999;
  background-color: rgba(30, 30, 30, 0.95);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
  padding: 15px;
  text-align: left;
}

.section {
  margin-bottom: 20px;
}
.section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
}

.clear-button {
  background: none;
  border: none;
  color: #999;
  font-size: 0.8rem;
  cursor: pointer;
}

.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.list-item {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  color: #e0e0e0;
  transition: background-color 0.2s;
}

.list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hot-list {
  display: block;
}

.hot-list .list-item {
  display: flex;
  align-items: center;
  background: none;
  padding: 8px 0;
  border-radius: 0;
}

.hot-list .list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.rank {
  display: inline-block;
  width: 25px;
  text-align: center;
  font-weight: bold;
  color: #999;
  margin-right: 8px;
}

.rank.top-three {
  color: #ffc107;
  font-size: 1.1rem;
}

.movie-name {
  font-weight: 500;
}
</style>
