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
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

label {
  font-size: 20px;
}

.titleInput {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.textareaContent {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.tagDiv {
  margin-bottom: 10px;
}

.inputText {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.submit {
  background-color: #008CBA;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
}

.submit:hover {
  background-color: #006F8B;
}

@media (max-width: 768px) {
  .all {
    margin-top: 10px;
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  label {
    font-size: 16px;
  }

  .titleInput {
    height: 30px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .textareaContent {
    height: 200px;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .inputText {
    height: 30px;
    font-size: 16px;
  }

  .submit {
    font-size: 16px;
    padding: 8px 16px;
  }
}
</style>