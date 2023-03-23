<template>
    <div>
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
      <p>Created by {{ userName }} on {{ formatDate(createdAt) }}</p>
      <p>Good count: {{ goodCount }}</p>
  
      <!-- ログインしている場合は、いいねボタンを表示する -->
      <div v-if="loggedIn">
        <button v-if="!liked" @click="likeText">いいね！</button>
        <button v-else @click="unlikeText">いいね済み</button>
      </div>
  
      <!-- 自分が作成した記事の場合は、編集・削除ボタンを表示する -->
      <div v-if="isOwned">
        <button @click="editText">編集</button>
        <button @click="deleteText">削除</button>
      </div>
  
      <div v-if="tags.length > 0">
        <p>Tags:</p>
        <ul>
          <li v-for="tag in tags" :key="tag.tag_id">{{ tag.tag_name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: "",
        content: "",
        userName: "",
        createdAt: "",
        goodCount: 0,
        liked: false,
        loggedIn: false,
        isOwned: false,
        tags: [],
        textId: this.$route.params['id'], // URLパラメータからtext_idを取得
        userId: "" // ログインしている場合に使うuser_id
      };
    },
  
    methods: {
      async loadText() {
        // APIからtextの詳細を取得
              const response = await fetch(`/api/texts/${this.textId}`);
              const data = await response.json();
              this.title = data.title;
              this.content = data.content;
              this.userName = data.user_name;
              this.createdAt = data.created_at;
              this.goodCount = data.good_count;
              this.tags = "";
              this.isOwned = "";
              if (data.user_id == localStorage.getItem("user_id")) {
                this.isOwned = true;
              }
          },
            
          async likeText() {
            // いいね！を送信
            const response = await fetch(`/api/like`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                text_id: this.textId,
                user_id: this.userId
              })
            });
            const response2 = await fetch(`/api/texts/${this.textId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                good_count: this.goodCount + 1
              })
            });
            this.liked = true;
            const response3 = await fetch(`/api/texts/${this.textId}`);
            const data = await response3.json();
            this.goodCount = data.good_count;
          },

          async unlikeText() {
            // いいね！を解除
            const response = await fetch(`/api/like/delete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                text_id: this.textId,
                user_id: this.userId
              })
            });
            const response2 = await fetch(`/api/texts/${this.textId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                good_count: this.goodCount - 1
              })
            });
            this.liked = false;
            const response3 = await fetch(`/api/texts/${this.textId}`);
            const data = await response3.json();
            this.goodCount = data.good_count;
          },

          async editText() {
            // 編集画面に遷移
            this.$router.push(`/ztext/edit/${this.textId}`);
          },

          async deleteText() {
            // 削除画面に遷移
            this.$router.push(`/ztext/delete/${this.textId}`);
          },
          formatDate (dateStr) {
                const date = new Date(dateStr)
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`
            }
      },
        
      mounted() {
        this.loadText();
        // ログインしている場合は、user_idを取得
        if (localStorage.getItem("user_id")) {
          this.userId = localStorage.getItem("user_id");
          this.loggedIn = true;
        }
      }
  };
    </script>
