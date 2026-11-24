<template>
  <div class="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card border-0 shadow w-100" style="max-width: 420px;">

      <div class="card-header bg-dark text-white text-center border-0 py-4">
        <h2 class="fw-bold mb-2">
          BlogSpace<span class="text-warning">.</span>
        </h2>

        <p class="text-secondary mb-0">
          Welcome back. Continue reading.
        </p>
      </div>

      <div class="card-body p-4 p-md-5">

        <h4 class="fw-bold mb-1">Login</h4>
        <p class="text-muted mb-4">
          Enter your account details to get started.
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

          <!-- Password -->
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

          <button type="submit" class="btn btn-dark w-100 py-2 mt-3">
            Login
          </button>
        </form>

        
        <div class="text-center mt-4">
          <small class="text-muted">
            Don't have an account?
            <router-link :to="{ name: 'Register' }" class="text-dark fw-bold text-decoration-none">
              Register
            </router-link>
          </small>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
    import { ref, watch, onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
    import { useRouter } from 'vue-router';

    import { Notyf } from 'notyf';

    import api from '../api'

    const router = useRouter();
    const {getUserDetails, user} = useGlobalStore();
    const notyf = new Notyf();

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    

    const submit = async () => {
        try {
            console.log(email.value)
            const res = await api.post('/users/login', {
                email: email.value,
                password: password.value
            });

            if (res.data) {
                notyf.success("Login Successful");

                localStorage.setItem("token",res.data.access);

                getUserDetails(res.data.access);

                email.value = "";
                password.value = "";

                router.push({path: "/"});
            }
        } catch (err) {
            console.error(err.response);
            notyf.error('login failed');
        }
    }

    onBeforeMount(()=>{
        if(user.token){
            router.push({path: "/"})
        }
    })
</script>
