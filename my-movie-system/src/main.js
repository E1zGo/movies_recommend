import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';

const app = createApp(App);

// 配置 axios 基础路径（后端接口地址）
axios.defaults.baseURL = 'http://localhost:8080/api';

// 可选：设置跨域请求时是否携带 cookie
// axios.defaults.withCredentials = true;

// 将 axios 挂载到全局
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
