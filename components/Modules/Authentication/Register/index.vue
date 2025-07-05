<template>
  <div class="m-auto m-1230">
    <div class="row align-items-center">
      <div class="col-lg-6 d-none d-lg-block">
        <img
          src="~/assets/images/register.jpg"
          class="rounded-3"
          alt="register"
        />
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
          <h3 class="fs-28 mb-2">Register to Trezo Dashboard</h3>
          <p class="fw-medium fs-16 mb-4">
            Register with social account or enter your details
          </p>
          
          <form @submit.prevent="handleRegister">
            <div class="form-group mb-3">
              <label class="label text-secondary">Full Name</label>
              <input
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Enter your full name"
              />
            </div>
            <div class="form-group mb-3">
              <label class="label text-secondary">Email Address</label>
              <input
                v-model="email" 
                type="email"
                class="form-control"
                placeholder="example@trezo.com"
              />
            </div>
            <div class="form-group mb-3">
              <label class="label text-secondary">DOB</label>
              <input
                v-model="dob"
                type="date"
                class="form-control"
              />
            </div>
            <div class="form-group mb-3">
              <label class="label text-secondary">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Type password"
              />
            </div>
            <div class="form-group mb-3">
              <label class="label text-secondary">Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <div class="form-group mb-3">
              <button  class="btn btn-primary fw-medium py-2 px-3 w-100">Register</button>
            </div>
            
          </form>
          <p class="text-red-500 mt-2">{{ error }}</p>
          <p class="text-green-500 mt-2">{{ success }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("");
const email = ref("");
const dob = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");


const handleRegister = async () => {
  error.value = "";
  success.value = "";

  if (!name.value || !email.value || !dob.value || !password.value || !confirmPassword.value) {
    error.value = "All fields are required.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  try {
    const res = await $fetch("/api/register", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        dob: dob.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      },
    });

    success.value = res.message;
    name.value = email.value = dob.value = password.value = confirmPassword.value = "";
  } catch (err: any) {
    error.value = err?.data?.statusMessage || "Something went wrong";
  }
};

</script> 