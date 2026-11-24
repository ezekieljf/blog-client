<template>
  <div class="container py-5">

    <!-- Page Header -->
    <div class="mb-4">
      <h2 class="fw-bold text-dark">
        Create a Post<span class="text-warning">.</span>
      </h2>

      <p class="text-secondary mb-0">
        Share your thoughts, ideas, and stories with the community.
      </p>
    </div>

    <!-- Add Post Form -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-dark text-light py-3">
        <h5 class="fw-bold mb-0">
          New Blog Post
        </h5>
      </div>

      <div class="card-body p-4">

        <form @submit.prevent="addPost">

          <!-- Title -->
          <div class="mb-4">
            <label for="title" class="form-label fw-semibold">
              Post Title
            </label>

            <input
              type="text"
              id="title"
              class="form-control"
              placeholder="Enter your post title"
              v-model="title"
              required
            />
          </div>

          <!-- Information -->
          <div class="mb-4">
            <label for="content" class="form-label fw-semibold">
              Information
            </label>

            <textarea
              id="content"
              class="form-control"
              rows="1"
              placeholder="What is post about"
              v-model="information"
              required
            ></textarea>
          </div>

          <!-- Content -->
          <div class="mb-4">
            <label for="content" class="form-label fw-semibold">
              Content
            </label>

            <textarea
              id="content"
              class="form-control"
              rows="10"
              placeholder="Write your thoughts here..."
              v-model="content"
              required
            ></textarea>
          </div>

          <!-- Buttons -->
          <div class="d-flex justify-content-end gap-2 flex-wrap">
            <button
              type="button"
              class="btn btn-outline-dark"
              @click="router.push({name: 'BrowsePosts'})"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="btn btn-warning fw-semibold"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Publishing...' : 'Publish Post' }}
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { Notyf } from 'notyf';
    import api from '../api';

    const router = useRouter();
    const notyf = new Notyf();

    const title = ref('');
    const content = ref('');
    const information = ref('');
    const isLoading = ref(false);

    const addPost = async () => {
        isLoading.value = true

        const postData = {
            title: title.value,
            content: content.value,
            information: information.value
        }

        try {
            const res = await api.post('/posts/addPost', postData)

            if (res.data) {
                notyf.success('Post published successfully!')

                title.value = '';
                information.value = '';
                content.value = '';

                router.push({name: 'BrowsePosts'})
            }

        } catch (err) {
            console.error(err.response)
            notyf.error('Failed to publish post.')
        } finally {
            isLoading.value = false
        }
    }
</script>