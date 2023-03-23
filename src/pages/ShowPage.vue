<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
// const props = defineProps({
//   cityName: {
//     type: String,
//     required: true,
//   },
// });
const contextsInfo = ref();
onMounted(async () => {
  const res = await axios.get("/api/show");
  contextsInfo.value = res.data;
});
</script>

<template>
  <div>
    <h1>投稿一覧</h1>
    <div id="container">
      <div v-if="contextsInfo">
        <div
          v-for="contextInfo in contextsInfo"
          :key="contextInfo.contexts"
          class="place"
       >
          <div v-if="contextInfo.username.String">
            <p class="username">{{ contextInfo.username.String }}</p>
          </div>
          <div v-else><p class="username">Anonymous</p></div>
          <p class="context">{{ contextInfo.contexts.String }}</p>
        </div>
      </div>
      <div v-else><p>投稿が見つかりませんでした</p></div>
    </div>
  </div>
</template>

<style>
#container {
  /* display: flex;
  flex-direction: column-reverse; */
}
.place {
  background-color: #ddd;
  margin-bottom: auto;
  border-radius: 10px;
  height: auto;
  overflow-wrap: break-word;
}
.username {
  margin-left: 10px;
  font-size: 20px;
}
.context {
  margin-left: 10px;
  font-size: 25px;
}
</style>
