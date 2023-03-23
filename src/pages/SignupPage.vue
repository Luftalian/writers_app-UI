<script setup>
import axios from "axios";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const signup = () =>
  axios.post("/api/signup", {
    username: username.value,
    password: password.value,
  });
</script>

<template>
  <div class="signup">
    <h1>This is an signup page</h1>
    <div>
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
    </div>
    <div>
      <button @click="signup">Signup</button>
    </div>
  </div>
</template>
