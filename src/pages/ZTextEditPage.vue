<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const name = ref("");
const title = ref("");
const content = ref("");
const tag = ref("");
const userId = localStorage.getItem("user_id");
const user_name = localStorage.getItem("name");
const textId = ref(this.$route.params['id'])

const putText = async () => {
  const response = await axios.put(`/api/texts/${textId}`, {
    title: title.value,
    content: content.value,
    user_id: userId,
    user_name: user_name,
  });
  const textId = response.data.text_id;

  // add tag
  await axios.put(`/api/tag/${textId}`, {
    tag_name: tag.value,
    text_id: textId,
  });

  // link user to text
  await axios.put("/api/create", {
    user_id: userId,
    text_id: textId,
  });
    title.value = "";
    content.value = "";
    tag.value = "";
};

const getText = async () => {
    const response = await axios.get(`/api/texts/${textId}`, {
        title: response.title.value,
        content: response.content.value,
        user_id: response.userId,
        user_name: response.user_name,
    });
    const textId = response.data.text_id;
    
    // add tag
    await axios.get("/api/tag", {
        tag_name: tag.value,
        text_id: textId,
    });
    
    // link user to text
    await axios.get("/api/create", {
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

onMounted(async () => {
  this.getText();
});
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
        <button @click="putText">Put</button>
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