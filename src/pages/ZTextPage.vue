<script setup>
import axios from "axios";
import { ref } from "vue";

const name = ref("");
const title = ref("");
const content = ref("");
const tag = ref("");
const userId = localStorage.getItem("user_id");
const user_name = localStorage.getItem("name");

const postText = async () => {
  const response = await axios.post("/api/texts", {
    title: title.value,
    content: content.value,
    user_id: userId,
    user_name: user_name,
  });
  const textId = response.data.text_id;

  // add tag
  await axios.post("/api/tag", {
    tag_name: tag.value,
    text_id: textId,
  });

  // link user to text
  await axios.post("/api/create", {
    user_id: userId,
    text_id: textId,
  });
    title.value = "";
    content.value = "";
    tag.value = "";
};

const login = async () => {
  const response = await axios.post("/api/users", {
    name: name.value,
  });
  localStorage.setItem("user_id", response.data.user_id);
};

const isLoggedIn = () => !!localStorage.getItem("user_id");

</script>

<template>
  <div class="container">
    <h1>{{ isLoggedIn() ? "Create a new post" : "Please log in to create a post" }}</h1>
    <div v-if="isLoggedIn()">
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="content">Content:</label>
        <textarea id="content" v-model="content"></textarea>
      </div>
      <div>
        <label for="tag">Tag:</label>
        <input type="text" id="tag" v-model="tag" />
      </div>
      <div>
        <button @click="postText">Post</button>
      </div>
    </div>
    <div v-else>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div>
        <button @click="login">Log in</button>
      </div>
    </div>
  </div>
</template>