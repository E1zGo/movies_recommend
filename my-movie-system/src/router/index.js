import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../HomePage.vue';
import MovieDetailPage from '../views/MovieDetailPage.vue';
import CategoriesPage from '../views/CategoriesPage.vue';
import MyPage from '../mypage/MyPage.vue';
import EditProfilePage from '../views/EditProfilePage.vue';
import MessagePage from '../views/MessagePage.vue';
import MyFavorites from '../mypage/MyFavorites.vue';
import MyHistory from '../mypage/MyHistory.vue';
import MyCustomization from '../mypage/MyCustomization.vue'; 
import MySettings from '../mypage/MySettings.vue';
import ContactSupport from '../mypage/ContactSupport.vue';
import MyComments from '../mypage/MyComments.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/movie/:id', // 动态路由，:id 是电影的参数
    name: 'MovieDetailPage',
    component: MovieDetailPage
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: CategoriesPage
  },
  {
    path: '/my-page',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/edit-profile', // 新页面的路径
    name: 'EditProfile', // 新页面的名称
    component: EditProfilePage, // 关联到新组件
  },
  {
    path: '/messages',
    name: 'MessagePage',
    component: MessagePage,
  },
  {
    path: '/my-page/favorites',
    name: 'MyFavorites',
    component: MyFavorites
  },
  {
    path: '/my-page/history',
    name: 'MyHistory',
    component: MyHistory
  },
  {
    path: '/my-page/customization', 
    name: 'MyCustomization',
    component: MyCustomization
  },
  {
    path: '/my-page/settings',
    name: 'MySettings',
    component: MySettings
  },
  {
    path: '/my-page/contact-support',
    name: 'ContactSupport',
    component: ContactSupport
  },
  {
    path: '/my-page/comments',
    name: 'MyComments',
    component: MyComments
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;