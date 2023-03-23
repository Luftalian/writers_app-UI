<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const name = ref(localStorage.getItem("name") || "");
const userId = ref(localStorage.getItem("user_id") || "");

const login = () =>
  axios.post("/api/users", {
    name: name.value,
  }).then(response => {
    userId.value = response.data.user_id;
    localStorage.setItem("user_id", userId.value);
    localStorage.setItem("name", name.value);
  });

const logout = () => {
  localStorage.removeItem("user_id");
  localStorage.removeItem("name");
  userId.value = "";
  name.value = "";
};

onMounted(() => {
  if (userId.value) {
    console.log(`User ID found in cache: ${userId.value}`);
    console.log(`User name found in cache: ${name.value}`);
  } else {
    console.log("User ID not found in cache");
    console.log("User name not found in cache");
  }
});
</script>

<template>
  <div class="login">
    <h1>This is a login page</h1>
    <div>
      <input type="text" v-model="name" />
    </div>
    <div>
      <button @click="login">login</button>
      <button v-if="userId" @click="logout">logout</button>
    </div>
    <div v-if="userId">
      <p>User name: {{ name }}</p>
      <p>User ID: {{ userId }}</p>
    </div>
  </div>
</template>
