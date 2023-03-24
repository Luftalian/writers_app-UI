<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import { ref } from "vue";
const userId = "me";//ref(localStorage.getItem("user_id") || "me");
const userName = ref(localStorage.getItem("name"));
</script>

<template>
  <main>
    <div :class="$style.container">
      <header :class="$style.header">
        <router-link to="/" :class="$style.home">Home</router-link>
        |
        <!-- <router-link to="/axios">Axios</router-link>
        |
        <router-link to="/city/Tokyo">Tokyo</router-link>
        |
        <router-link to="/allcountry">Country</router-link>
        |
        <router-link to="/write">Write</router-link>
        |
        <router-link to="/show">Show</router-link>
        |
        <router-link to="/signup">Signup</router-link>
        |
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/logout">Logout</router-link>
        | -->
        <router-link to="/ZLogin" :class="$style.zlogin">ZLogin</router-link>
        |
        <router-link to="/ZText/post" :class="$style.ztextpost">ZTextPost</router-link>
        |
        <router-link to="/ZAllText" :class="$style.zalltext">ZAllText</router-link>
        |
        <router-link  v-bind:to="{name: 'zuser', params: {id: userId }}" :class="$style.zuser">ZUser</router-link>
        <div :class="$style.username">
          User Name: {{ userName }}
        </div>
      </header>

      <router-view class="routerView"/>
    </div>
  </main>
</template>

<style module>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1da1f2;
  color: #fff;
}

.home {
  color: #fff;
  font-weight: bold;
}

.zlogin,
.ztextpost,
.zalltext,
.zuser {
  color: #fff;
  font-weight: bold;
}

.zlogin:hover,
.ztextpost:hover,
.zalltext:hover,
.zuser:hover {
  text-decoration: underline;
}

.username {
  font-size: 14px;
  margin-top: 8px;
  color: #fff;
}
</style>