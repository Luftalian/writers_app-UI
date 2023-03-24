<template>
  <div>
    <h1>編集</h1>
    <form @submit.prevent="editText">
      <label for="title">タイトル:</label>
      <input type="text" id="title" v-model="title" required>
      <br>
      <label for="content">本文:</label>
      <textarea id="content" v-model="content" required></textarea>
      <br>
      <label for="tags">タグ:</label>
      <div v-for="tag in tags" :key="tag.tag_id">
        <input type="text" id="tags" v-model="tag.tag_name">
      </div>
      <br>
      <button type="submit">更新</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      textId: this.$route.params["id"],
    };
  },
  methods: {
    async loadText() {
      // APIからtextの詳細を取得
      const response = await fetch(`/api/texts/${this.textId}`);
      const data = await response.json();
      this.title = data.title;
      this.content = data.content;
      const response2 = await fetch(`/api/tag/text/${this.textId}`);
      const data2 = await response2.json();
      this.tags = data2;
    },

    async editText() {
      const response = await fetch(`/api/texts/${this.textId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
          tags: this.tags,
        }),
      });
      this.$router.push(`/ztext/${this.textId}`);
    },
  },
  mounted() {
    this.loadText();
  },
};
</script>