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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  font-weight: bold;
  color: #1a73e8;
  text-align: center;
  margin-bottom: 30px;
}

.label {
  font-size: 20px;
  color: #1a73e8;
  margin-right: 10px;
}

.title {
  width: 100%;
  font-size: 24px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #1a73e8;
}

.labelContent {
  font-size: 20px;
  color: #1a73e8;
  margin-right: 10px;
}

.textareaContent {
  width: 100%;
  height: 200px;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #1a73e8;
}

.tag {
  font-size: 20px;
  color: #1a73e8;
  margin-right: 10px;
}

.taginput {
  width: 100%;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #1a73e8;
}

.postButton {
  display: block;
  width: 200px;
  height: 50px;
  margin: 0 auto;
  background-color: #1a73e8;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.InputName {
  width: 100%;
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #1a73e8;
}

.NameLabel {
  font-size: 20px;
  color: #1a73e8;
  margin-right: 10px;
}

.LoginButton {
  display: block;
  width: 200px;
  height: 50px;
  margin: 0 auto;
  background-color: #1a73e8;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.else {
  text-align: center;
}

.loginT {
  display: flex;
  flex-direction: column;
}

.big {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.abc {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.post {
text-align: center;
}

.error {
color: red;
font-size: 16px;
margin-top: 10px;
}

.success {
color: green;
font-size: 16px;
margin-top: 10px;
}

</style>