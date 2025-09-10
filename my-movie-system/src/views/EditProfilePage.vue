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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 模拟从后端获取的初始数据
const avatarUrl = ref('https://picsum.photos/id/64/150/150');
const nickname = ref('你的昵称');
const birthday = ref('2000-01-01');

const message = ref('');
const messageType = ref('');

// 返回上一页
const goBack = () => {
  router.back();
};

// 模拟头像文件处理
const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
    showMessage('头像已更新！', 'success');
  }
};

// 模拟保存修改
const updateProfile = () => {
  // 这里可以添加表单验证逻辑
  if (!nickname.value || !birthday.value) {
    showMessage('请填写所有必填项！', 'error');
    return;
  }

  // 模拟 API 请求
  setTimeout(() => {
    // 假设请求成功
    showMessage('个人信息保存成功！', 'success');
    console.log('个人信息已保存:', {
      nickname: nickname.value,
      birthday: birthday.value,
    });
  }, 1000);
};

const showMessage = (msg, type) => {
  message.value = msg;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
  }, 3000); // 3秒后自动隐藏
};
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
