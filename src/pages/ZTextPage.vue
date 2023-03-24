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
    <div v-if="isLoggedIn()" class="loginT">
      <div class="big">
        <label for="title" class="label">Title:</label>
        <input type="text" id="title" v-model="title" class="title"/>
      </div>
      <div class="content">
        <label for="content" class="labelContent">Content:</label>
        <textarea id="content" v-model="content" class="textareaContent"></textarea>
      </div>
      <div class="abc">
        <label for="tag" class="tag">Tag:</label>
        <input type="text" id="tag" v-model="tag" class="taginput"/>
      </div>
      <div class="post">
        <button @click="postText" class="postButton">Post</button>
      </div>
    </div>
    <div v-else class="else">
      <div class="name">
        <label for="name" class="NameLabel">Name:</label>
        <input type="text" id="name" v-model="name" class="InputName"/>
      </div>
      <div class="logIn">
        <button @click="login" class="LoginButton">Log in</button>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin: auto;
  width: 50%;
  padding-top: 50px;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 50px;
  color: #1DA1F2;
}

.big {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.label {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1DA1F2;
}

.title {
  font-size: 18px;
  padding: 10px;
  border: 1px solid #1DA1F2;
  border-radius: 5px;
}

.content {
  margin-bottom: 20px;
}

.labelContent {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1DA1F2;
}

.textareaContent {
  font-size: 18px;
  padding: 10px;
  border: 1px solid #1DA1F2;
  border-radius: 5px;
  height: 150px;
}

.abc {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.tag {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1DA1F2;
}

.taginput {
  font-size: 18px;
  padding: 10px;
  border: 1px solid #1DA1F2;
  border-radius: 5px;
}

.post {
  display: flex;
  justify-content: flex-end;
}

.postButton {
  font-size: 18px;
  padding: 10px 20px;
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.else {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.NameLabel {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1DA1F2;
}

.InputName {
  font-size: 18px;
  padding: 10px;
  border: 1px solid #1DA1F2;
  border-radius: 5px;
}

.LoginButton {
  font-size: 18px;
  padding: 10px 20px;
  background-color: #1DA1F2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>