<template>
  <div class="edit-profile-container">
    <div class="content-card">
      <h1 class="page-title">修改个人信息</h1>
      <p class="instruction">在这里管理你的个人资料。</p>
      
      <form @submit.prevent="updateProfile">
        <!-- 头像修改区 -->
        <div class="form-group avatar-group">
          <label class="form-label">头像</label>
          <div class="avatar-edit-wrapper">
            <img :src="avatarUrl" alt="头像预览" class="avatar-preview" />
            <div class="avatar-overlay">
              <span class="avatar-text">更换头像</span>
            </div>
            <input type="file" @change="handleAvatarChange" class="avatar-input" accept="image/*" />
          </div>
        </div>
        
        <!-- 昵称修改区 -->
        <div class="form-group">
          <label for="nickname" class="form-label">昵称</label>
          <input 
            type="text" 
            id="nickname" 
            v-model="nickname" 
            class="form-input" 
            placeholder="请输入新昵称"
          />
        </div>
        
        <!-- 生日修改区 -->
        <div class="form-group">
          <label for="birthday" class="form-label">生日</label>
          <input 
            type="date" 
            id="birthday" 
            v-model="birthday" 
            class="form-input"
          />
        </div>

        <button type="submit" class="save-button">保存修改</button>
      </form>
      
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>

      <button @click="goBack" class="back-button">返回</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const userId = ref(1); // 模拟已登录用户的ID，实际项目中应从认证状态中获取

// 动态数据，从后端加载
const avatarUrl = ref('');
const nickname = ref('');
const birthday = ref('');

const message = ref('');
const messageType = ref('');

// 后端 API 地址
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 异步加载用户个人信息
 */
const fetchUserProfile = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/users/${userId.value}/profile`);
        const profile = res.data.data;
        if (profile) {
            avatarUrl.value = profile.avatarUrl || 'https://default-avatar-url.com';
            nickname.value = profile.nickname || '';
            birthday.value = profile.birthday || '';
        }
    } catch (err) {
        console.error('加载用户信息失败:', err);
        showMessage('加载用户信息失败，请重试。', 'error');
    }
};

/**
 * 处理头像上传
 */
const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const res = await axios.post(`${API_BASE_URL}/users/${userId.value}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            avatarUrl.value = res.data.data.avatarUrl; // 假设后端返回新的头像URL
            showMessage('头像已更新！', 'success');
        } catch (err) {
            console.error('上传头像失败:', err);
            showMessage('上传头像失败，请重试。', 'error');
        }
    }
};

/**
 * 保存修改后的个人信息
 */
const updateProfile = async () => {
    if (!nickname.value || !birthday.value) {
        showMessage('请填写所有必填项！', 'error');
        return;
    }

    try {
        await axios.put(`${API_BASE_URL}/users/${userId.value}/profile`, {
            nickname: nickname.value,
            birthday: birthday.value
        });
        showMessage('个人信息保存成功！', 'success');
        // 可选：保存成功后跳转回个人主页
        // router.push({ name: 'ProfilePage', params: { id: userId.value } });
    } catch (err) {
        console.error('保存失败:', err);
        showMessage('保存失败，请重试。', 'error');
    }
};

/**
 * 返回上一页
 */
const goBack = () => {
    router.back();
};

/**
 * 显示提示信息
 */
const showMessage = (msg, type) => {
    message.value = msg;
    messageType.value = type;
    setTimeout(() => {
        message.value = '';
    }, 3000); // 3秒后自动隐藏
};

onMounted(() => {
    fetchUserProfile();
});
</script>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 80vh;
}

.content-card {
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  width: 100%;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
}

.instruction {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.save-button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  margin-top: 10px;
}

.save-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.back-button {
  margin-top: 20px;
  background-color: #f0f2f5;
  color: #666;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #e0e4e8;
}

.message {
  padding: 12px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 头像组样式 */
.avatar-group {
  text-align: center;
  margin-bottom: 30px;
}

.avatar-edit-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.avatar-edit-wrapper:hover {
  box-shadow: 0 0 0 4px #007bff;
}

.avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-edit-wrapper:hover .avatar-overlay {
  opacity: 1;
}

.avatar-text {
  color: white;
  font-size: 14px;
}

.avatar-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

</style>
