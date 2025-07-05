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
        
          <form  @submit.prevent="handleLogin">
            <div class="form-group mb-4">
              <label class="label text-secondary">Email Address</label>
              <input
                v-model="email" 
                type="email"
                class="form-control h-55"
                placeholder=""
              />
            </div>
            <div class="form-group mb-4">
              <label class="label text-secondary">Password</label>
              <input
                v-model="password" 
                type="password"
                class="form-control h-55"
                placeholder=""
              />
            </div>
            <div class="form-group mb-4">
             
            </div>
            <div class="form-group mb-4">
              <p>{{ error }}</p>
              <button type="submit" class="btn btn-primary fw-medium py-2 px-3 w-100">
                <i class="material-symbols-outlined text-white fs-20 me-2"></i>
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  error.value = '';

  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    });

    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    //  localStorage.setItem('token', result.token.access_token);

    if (res.role === 'superadmin') {
      router.push('/super-admin/dashboard');
    } else if (res.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
      // router.push('/user/dashboard');
    }
  } catch (err) {
    error.value = err?.data?.statusMessage || 'Invalid credentials';
  }
};
</script>