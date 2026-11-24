<script setup>
    import {onBeforeMount, ref} from "vue";
    import { useGlobalStore } from "../stores/global";
    const {user} = useGlobalStore();
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold fs-4">
        BlogSpace<span class="text-warning">.</span>
      </router-link>

      <span class="nav-link text-warning fw-semibold d-block d-lg-none ms-auto mx-3">
        Hello, {{ user.username }}
      </span>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav me-auto">
          <router-link :to="{ name: 'BrowsePosts' }" class="nav-link">{{ !user.isAdmin ? 'Posts' : 'Manage Posts'}}</router-link>
          <router-link v-if="!user.isAdmin && user.token" :to="{ name: 'MyPosts' }" class="nav-link"> My posts</router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!user.email">Login</router-link>
          <div class="d-flex" v-else>
            <span class="nav-link text-warning fw-semibold d-none d-lg-block">
              Hello, {{ user.username }}
            </span>
            <router-link :to="{ name: 'Logout'}" class="nav-link">Logout</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>