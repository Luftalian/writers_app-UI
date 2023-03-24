<template>
  <div class="all">
    <h1>編集</h1>
    <form @submit.prevent="editText" class="form">
      <label for="title" class="title">タイトル:</label>
      <input type="text" id="title" v-model="title" required class="titleInput">
      <br>
      <label for="content" class="labelContent">本文:</label>
      <textarea id="content" v-model="content" required class="textareaContent"></textarea>
      <br>
      <label for="tags" class="tag">タグ:</label>
      <div v-for="tag in tags" :key="tag.tag_id" class="tagDiv">
        <input type="text" id="tags" v-model="tag.tag_name" class="inputText">
      </div>
      <br>
      <button type="submit" class="submit">更新</button>
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

<style>
  /* Reset default margin and padding */
  * {
    margin: 0;
    padding: 0;
  }
  
  /* Set the background color of the page */
  body {
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
  }
  
  /* Style the header */
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 24px;
    text-align: center;
    color: #1a73e8;
  }
  
  /* Style the form */
  .form {
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Style the input and textarea fields */
  input[type="text"], textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  /* Style the submit button */
  .submit {
    background-color: #1a73e8;
    color: #fff;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  /* Style the tags */
  .tagDiv {
    margin-bottom: 16px;
  }
  
  .inputText {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
</style>