<template>
  <div class="m-auto m-1230">
    <div class="row align-items-center">
      <div class="col-lg-6 d-none d-lg-block">
        <img src="~/assets/images/login.jpg" class="rounded-3" alt="login" />
      </div>
      <div class="col-lg-6">
        <div class="mw-480 ms-lg-auto">
          <div class="d-inline-block mb-4">
            <img
              src="~/assets/images/logo.svg"
              class="rounded-3 for-light-logo"
              alt="login"
            />
            <img
              src="~/assets/images/white-logo.svg"
              class="rounded-3 for-dark-logo"
              alt="login"
            />
          </div>
          <h3 class="fs-28 mb-2">Welcome back to Admin!</h3>
          <p class="fw-medium fs-16 mb-4">
            Sign In with social account or enter your details
          </p>
        
          <form @submit.prevent="handleLogin"  >
            <div class="form-group mb-4">
              <label class="label text-secondary">Email Address</label>
              <input
                v-model="email" 
                type="email"
                class="form-control h-55"
                placeholder="akash@gmail.com"
              />
            </div>
            <div class="form-group mb-4">
              <label class="label text-secondary">Password</label>
              <input
                v-model="password" 
                type="password"
                class="form-control h-55"
                placeholder="123456"
              />
            </div>
            <div class="form-group mb-4">
             
            </div>
            <div class="form-group mb-4">
              <p>{{ message }}</p>
              <button type="submit" class="btn btn-primary fw-medium py-2 px-3 w-100">
                <i class="material-symbols-outlined text-white fs-20 me-2">login</i>
                <span>Login</span>
              </button>

            </div>

            <div class="form-group">
              <p>
                Don’t have an account..
               
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useApi } from '~/utils/api';

export default defineComponent({

  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
   async handleLogin() {
  try {
    const result = await useApi('http://localhost:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: this.email, password: this.password })
    });

    console.log('Result:', result);

    if (result.token) {
      this.message = result.message;
      localStorage.setItem('token', result.token.access_token);
      this.$router.push('/dashboard');
    } else {
      this.message = result.message || 'Login failed';
    }
  } catch (err) {
    console.error('Login error:', err);
    this.message = 'Error occurred during login';
  }
}

  }
});
</script>