<template>
  <div class="container py-5 min-vh-100 ">

    <!-- Back Button -->
    <router-link
      :to="{name: 'BrowsePosts'}"
      class="btn btn-outline-dark mb-4"
    >
      ← Back to Posts
    </router-link>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-warning" role="status"></div>
      <p class="text-secondary mt-2">Loading post...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Post Content -->
    <div v-else-if="post" class="card border-3 shadow-sm">
      <div class="card-body p-4 p-md-5">

        <!-- Information -->
        <p
          v-if="post.information"
          class="text-secondary fw-semibold mb-3"
        >
          {{ post.information }}
        </p>

        <!-- Title -->
        <h1 class="fw-bold mb-4">
          {{ post.title }}
          <span class="text-warning">.</span>
        </h1>

        <!-- Author and Date -->
        <div class="d-flex flex-wrap gap-3 text-secondary mb-4">
          <small>
            <span class="fw-semibold text-dark">Author:</span>
            {{ post.authorName }}
          </small>

          <small>
            <span class="fw-semibold text-dark">Published:</span>
            {{ new Date(post.dateAdded).toLocaleDateString() }}
          </small>
        </div>

        <hr />

        <!-- Full Content -->
        <div
          class="text-dark lh-lg text-break"
          style="white-space: pre-line;"
        >
          {{ post.content }}
        </div>

      </div>
    </div>

    <!-- Comments Section -->
    <div class="mt-5 pt-4 border-top" v-if="!isLoading">

      <!-- Comments Header -->
      <div class="mb-4">
        <h4 class="fw-bold mb-0">
          Comments <span class="text-warning">.</span>
          <span class="badge bg-dark">{{ post.comments?.length || 0 }}</span>
        </h4>
      </div>

      <!-- Add Comment Input -->
      <form @submit.prevent="addComment" class="mb-4">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            v-model="newComment"
            placeholder="Write a comment..."
            required
          />

          <button
            type="submit"
            class="btn btn-warning fw-semibold"
            :disabled="isCommentLoading"
          >
            Submit
          </button>
        </div>
      </form>

      <!-- Comments List -->
      <div
        v-if="post.comments && post.comments.length > 0"
        class="d-flex flex-column gap-3"
      >
        <div
          v-for="(comment, index) in post.comments"
          :key="comment._id || index"
          class="bg-light rounded p-3 border"
        >
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold text-dark">
              {{ comment.username }}
            </span>

            <small class="text-secondary">
              {{ comment.dateAdded
                ? new Date(comment.dateAdded).toLocaleDateString()
                : ''
              }}
            </small>
          </div>

          <p class="mb-0 text-secondary">
            {{ comment.comment }}
          </p>
        </div>
      </div>

      <!-- Empty Comments -->
      <div
        v-else
        class="text-center bg-light rounded p-4"
      >
        <p class="fw-semibold mb-1">No comments yet.</p>
        <small class="text-secondary">
          Be the first to share your thoughts about this post.
        </small>
      </div>

    </div>

  </div>
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import api from '../api';
    import { useGlobalStore } from '../stores/global';
    import { Notyf } from 'notyf';

    const notyf = new Notyf();
    const route = useRoute();
    const router = useRouter();
    const {user} = useGlobalStore();


    const post = ref(null);
    const isLoading = ref(true);
    const isCommentLoading = ref(false);
    const error = ref('');

    const newComment = ref('')

    const addComment = async () => {
        if(!user.token) {
            notyf.error("Please login to comment");
            router.push({name: "Login"})
        } else {
            isCommentLoading.value = true;
            try {
                const res = await api.post(`/posts/addComment/${route.params.id}`, {
                    comment: newComment.value
                });
                console.log(res);

                fetchPost();
            } catch (err) {
                console.log(err);
                notyf.error("Failed to add comment");
            } finally {
                isCommentLoading.value = false;
            }

            newComment.value = '';
        }
    }

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/getPost/${route.params.id}`);

            post.value = res.data;
        } catch (err) {
            console.error(err)
            error.value = 'Failed to load post.'
        } finally {
            isLoading.value = false
        }
    }

    onBeforeMount(() => {
        fetchPost();
    })
</script>