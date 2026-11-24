<template>
  <div class="row g-4">
    <div
      v-for="post in posts"
      :key="post._id"
      class="col-md-6 col-lg-4"
    >
      <div class="card border-3 shadow-sm h-100">
        <div class="card-body d-flex flex-column p-4">
          <div class="d-flex justify-content-between mb-2">
            <small class="text-secondary">
              {{ new Date(post.dateAdded).toLocaleDateString() }}
            </small>

            <small class="text-secondary">
              {{ post.comments.length }} comments
            </small>
          </div>

          <h5 class="fw-bold mb-3">
            {{ post.title }}
          </h5>

          <div class="d-flex align-items-center gap-2 mb-3">
            <span class="text-secondary small">By:</span>
            <span class="fw-semibold text-dark">{{ post.authorName }}</span>
          </div>

          <!-- Post Information -->
          <div
            v-if="post.information"
            class="bg-light border-start border-4 border-warning px-3 py-2 mb-3"
          >
            <small class="text-secondary fw-semibold">
              {{ post.information }}
            </small>
          </div>

          <p class="text-secondary mb-4">
            {{ post.content.substring(0, 150) }}
            {{ post.content.length > 150 ? '...' : '' }}
          </p>

          <div class="d-flex justify-content-between mt-auto">
            <router-link
              class="btn btn-dark btn-sm"
              :to="{name: 'Post', params: {id: post._id}}"
            >
              Read More
              <span class="text-warning ms-1">→</span>
            </router-link>

            <div v-if="post.author == user.id && route.name === 'MyPosts'" class="d-flex gap-2">
                <router-link :to="{name: 'EditPost', params: {id: post._id}}" class="btn btn-warning fw-semibold">
                  Edit
                </router-link>

                <button @click="$emit('delete-post', post._id)" class="btn btn-danger fw-semibold">
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
        <h5 class="fw-bold">No posts available.</h5>
        <p class="text-secondary mb-0">
          Check back later for new stories.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { useGlobalStore } from '../stores/global';
    import { useRoute } from 'vue-router';

    const {user} = useGlobalStore();
    const route = useRoute();


    defineProps({
      posts: {
        type: Array,
        required: true
      }
    })

    defineEmits(['delete-post']);
</script>
