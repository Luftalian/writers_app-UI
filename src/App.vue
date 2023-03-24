<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from "vue";
const userId = "me";
const userName = ref(localStorage.getItem("name"));
</script>

<template>
  <main>
    <div :class="$style.container">
      <header :class="$style.header">
        <router-link to="/" :class="$style.home">Home</router-link>
        |
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container {
  width: 100%;
  max-width: 1280px;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.home, .zlogin, .ztextpost, .zalltext, .zuser {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px;
  transition: all 0.3s ease;
}

.home:hover, .zlogin:hover, .ztextpost:hover, .zalltext:hover, .zuser:hover {
  color: #1a73e8;
}

.username {
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>