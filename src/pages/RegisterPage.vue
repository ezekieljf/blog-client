<template>
  <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card border-0 shadow w-100" style="max-width: 420px;">

      <div class="card-header bg-dark text-white text-center border-0 py-4">
        <h2 class="fw-bold mb-2">
          BlogSpace<span class="text-warning">.</span>
        </h2>
        <p class="text-secondary mb-0">
          Create your account and start sharing stories.
        </p>
      </div>

      <div class="card-body p-4 p-md-5">

        <h4 class="fw-bold mb-1">Register</h4>
        <p class="text-muted mb-4">
          Join our community of writers and readers.
        </p>

        <form @submit.prevent="submit">

          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter your email"
              v-model="email"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter your username"
              v-model="username"
              required
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label fw-semibold">
              Password
            </label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                id="password"
                placeholder="Enter your password"
                v-model="password"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div class="mb-3">
            <label for="confirmPassword" class="form-label fw-semibold">
              Confirm Password
            </label>
            <div class="input-group">
              <input
                :type="showCPassword ? 'text' : 'password'"
                class="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                v-model="confirmPassword"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="showCPassword = !showCPassword"
              >
                {{ showCPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-dark w-100 py-2 mt-3">
            Register
          </button>

        </form>

        <div class="text-center mt-4">
          <small class="text-muted">
            Already have an account?
            <RouterLink :to="{ name: 'Login' }" class="text-dark fw-bold text-decoration-none">
              Login
            </RouterLink>
          </small>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    import { Notyf } from 'notyf';

    import api from '../api'

    const router = useRouter();
    const {getUserDetails, user} = useGlobalStore();
    const notyf = new Notyf();

    const email = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const showPassword = ref(false);
    const showCPassword = ref(false);
    

    const submit = async () => {
        try {
            if (password.value != confirmPassword.value) {
                notyf.error("Passwords do not match!");
                return
            }

            const res = await api.post('/users/register', {
                email: email.value,
                username: username.value,
                password: password.value
            });

            if (res.data) {
                notyf.success("Registered Successful");

                email.value = "";
                password.value = "";
                confirmPassword.value = "";

                router.push({path: "/login"});
            }
        } catch (err) {
            console.error(err.response);
            notyf.error("Registered Failed");
        }
    }

    onBeforeMount(()=>{
        if(user.token){
            router.push({path: "/"})
        }
    })
</script>
