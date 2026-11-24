<template>
  <div class="container py-5 min-vh-100">

    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
      <div>
        <h2 class="fw-bold text-dark mb-1">
         My Posts
        </h2>

        <p class="text-secondary mb-0">
          Manage Posts
        </p>
      </div>

      <router-link v-if="!user.isAdmin" :to="{name: 'AddPost'}" class="btn btn-warning fw-semibold">
        + Add Post
      </router-link>
    </div>

    <PostList
      :posts="posts"
      @post-click="getPost"
      @delete-post="deletePost"
    />

  </div>
</template>
<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import api from '../api';
    import { useRouter } from 'vue-router';
    import { Notyf } from 'notyf';

    import PostList from '../components/PostList.vue';
    import AdminPostList from '../components/AdminPostList.vue';

    const {user} = useGlobalStore();

    const notyf = new Notyf();
    const router = useRouter();

    const posts = ref([]);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts/getMyPosts');
            posts.value = res.data.posts;
        } catch (err) {
            console.error(err);
        }
    }

    const getPost = (id) => {
        if (!user.token) {
            notyf.error('Please log in to view this post.');
            router.push({ name: 'Login' });
        } else {
            router.push({ path: `/posts/${id}` });
        }
    }

    const deletePost = async(id) => {
        console.log(id)
        const isConfirmed = confirm('Are you sure you want to delete this post?');

        if (!isConfirmed) {
            return;
        }

        try {
            const res = await api.delete(`/posts/deletePost/${id}`);
            notyf.success("Post Deleted!");
            fetchPosts();
        } catch (err) {
            notyf.error("Failed to delete post")
            console.error(err);
        }
    }

    onBeforeMount(() => {
        fetchPosts();
    })
</script>