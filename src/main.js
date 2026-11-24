import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'notyf/notyf.min.css';

import './style.css';


import { createApp } from 'vue';
import App from './App.vue';

import { createPinia } from 'pinia';


import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import HomePage from './pages/HomePage.vue';
import LogoutPage from './pages/LogoutPage.vue';

import BrowsePostsPage from './pages/BrowsePostsPage.vue';
import MyPostsPage from './pages/MyPostsPage.vue';
import PostPage from './pages/PostPage.vue';

import AddPostPage from './pages/AddPostPage.vue';
import EditPostPage from './pages/EditPostPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
        {
            path: '/browse-posts',
            name: 'BrowsePosts',
            component: BrowsePostsPage
        },
        {
            path: '/my-posts',
            name: 'MyPosts',
            component: MyPostsPage
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: PostPage
        },
        {
            path: '/add-post',
            name: 'AddPost',
            component: AddPostPage
        },
        {
            path: '/editPost/:id',
            name: 'EditPost',
            component: EditPostPage
        }
    ]
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

