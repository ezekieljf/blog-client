<template>
  <div class="bg-light min-vh-100">

    <section class="bg-black text-white py-5">
      <div class="container py-4">
        <h1 class="display-4 fw-bold">
          Stories worth reading.
        </h1>

        <p class="lead text-secondary">
          Discover ideas, insights, and stories shared by our community.
        </p>

        <router-link :to="{name: 'BrowsePosts'}" class="btn btn-warning mt-3">
          Browse Posts
        </router-link>
      </div>
    </section>

    
    <section class="container py-5">
      <h2 class="fw-bold mb-4">Latest Blogs</h2>

      
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-dark"></div>
        <p class="mt-2">Loading blogs...</p>
      </div>

      
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      
      <div v-else class="row g-4">

        <!-- User View -->
        <PostList
          :posts="posts"
          @post-click="getPost"
          @delete-post="deletePost"
        />

        <!-- No Blogs -->
        <div v-if="posts.length === 0" class="col-12">
          <p class="text-muted text-center">
            No blog posts available yet.
          </p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import api from '../api';

    import PostList from '../components/PostList.vue';


    const posts = ref([])
    const isLoading = ref(true)
    const error = ref('')

    const fetchPosts = async () => {
        try {
            const res = await api.get('/posts/getPosts');
            console.log(res.data.posts)
            posts.value = res.data.posts.slice(-3);
        } catch(err) {
            console.error(err);
            error.value = err
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
      fetchPosts()
    })
</script>