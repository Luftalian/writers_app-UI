<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const name = ref(localStorage.getItem("name") || "");
const userId = ref(localStorage.getItem("user_id") || "");

const login = () =>
  axios.post("https://luftalian.trap.show/writersapp/users", {
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
    <div class="inputText">
      <input type="text" v-model="name" placeholder="User Name"/>
    </div>
    <div class="button">
      <button @click="login" class="loginButton">login</button>
      <button v-if="userId" @click="logout" class="logoutButton">logout</button>
    </div>
    <div v-if="userId" class="UserDiv">
      <p>User name: {{ name }}</p>
      <p>User ID: {{ userId }}</p>
    </div>
  </div>
</template>

<style>
  /* ページ全体の背景 */
  body {
    background-color: #F5F5F5;
  }

  /* ログインページの背景と幅の設定 */
  .login {
    background-color: #FFFFFF;
    margin: 100px auto;
    padding: 30px;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  /* ログインフォームの入力欄のスタイル */
  .inputText {
    margin: 30px auto;
    width: 80%;
    text-align: left;
  }

  .inputText input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #808080;
    font-size: 18px;
    padding: 5px;
    margin-bottom: 10px;
  }

  .inputText input:focus {
    border-bottom: 2px solid #0057D9;
    outline: none;
  }

  /* ログインフォームのボタンスタイル */
  .button {
    margin: 30px auto;
    width: 80%;
  }

  .button button {
    background-color: #0057D9;
    border: none;
    border-radius: 10px;
    color: #FFFFFF;
    font-size: 18px;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
  }

  .button button:hover {
    background-color: #274B8B;
  }

  /* ログアウトボタンのスタイル */
  .logoutButton {
    background-color: #F44336;
  }

  .logoutButton:hover {
    background-color: #D32F2F;
  }

  /* ユーザー情報のスタイル */
  .UserDiv {
    margin-top: 50px;
  }

  .UserDiv p {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .UserDiv p:first-child {
    margin-top: 0px;
  }

</style>