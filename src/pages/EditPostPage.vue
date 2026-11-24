<template>
  <div class="container py-5">

    <!-- Page Header -->
    <div class="mb-4">
      <h2 class="fw-bold text-dark">
        Edit Post<span class="text-warning">.</span>
      </h2>
    </div>

    <!-- Edit Post Form -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-dark text-light py-3">
        <h5 class="fw-bold mb-0">
          Edit Blog Post
        </h5>
      </div>

      <div class="card-body p-4">

        <form @submit.prevent="editPost">

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
              {{ isLoading ? 'Editting...' : 'Edit Post' }}
            </button>
          </div>

        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
    import { ref , onBeforeMount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { Notyf } from 'notyf';
    import api from '../api';
    import { useGlobalStore } from '../stores/global';

    const {user} = useGlobalStore();

    const route = useRoute();
    const router = useRouter();
    const notyf = new Notyf();

    const title = ref('');
    const content = ref('');
    const information = ref('');
    const isLoading = ref(false);

    const editPost = async () => {
        isLoading.value = true

        const postData = {
            title: title.value,
            content: content.value,
            information: information.value
        }

        try {
            const res = await api.patch(`/posts/updatePost/${route.params.id}`, postData);

            if (res.data) {
                notyf.success('Post editted successfully!');

                title.value = '';
                information.value = '';
                content.value = '';

                router.push({name: 'BrowsePosts'});
            }

        } catch (err) {
            console.error(err.response);
            notyf.error('Failed to edit post.');
        } finally {
            isLoading.value = false;
        }
    }

    const fetchPost = async () => {
        isLoading.value = true;

        try {
            const res = await api.get(`/posts/getPost/${route.params.id}`);

            title.value = res.data.title
            content.value = res.data.content
            information.value = res.data.information
        } catch (err) {
            console.error(err);
            notyf.error('Error loading post details');
        } finally {
            isLoading.value = false;
        }
    }

    onBeforeMount(() => {
        fetchPost();
    })
</script>