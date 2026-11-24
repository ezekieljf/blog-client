<template>
  <div class="row g-4">
    <div
      v-for="post in posts"
      :key="post._id"
      class="col-12"
    >
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">

          <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <div>
              <small class="text-secondary">
                {{ new Date(post.dateAdded).toLocaleDateString() }}
              </small>

              <h5 class="fw-bold mt-1 mb-0">
                {{ post.title }}
              </h5>
            </div>

            <span class="badge bg-warning text-dark">
              Admin View
            </span>
          </div>

          <p class="text-secondary mb-3">
            {{ post.content.substring(0, 200) }}
            {{ post.content.length > 200 ? '...' : '' }}
          </p>

          <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <small class="text-secondary">
              {{ post.comments?.length || 0 }} Comments
            </small>

            <div class="d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="$emit('delete-post', post._id)"
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div
      v-if="posts.length === 0"
      class="col-12"
    >
      <div class="bg-white rounded shadow-sm text-center p-5">
        <h5 class="fw-bold">No posts to manage.</h5>
        <p class="text-secondary mb-0">
          Posts created will appear here.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { Notyf } from 'notyf';
    import api from '../api';

    const notyf = new Notyf();

    defineProps({
      posts: {
        type: Array,
        required: true
      }
    })

    defineEmits(['refresh-posts', 'delete-post']);
</script>