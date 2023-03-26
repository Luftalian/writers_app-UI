<template>
    <div v-if="title !== '' && (typeof title !== 'undefined')" class="all">
      <h1 class="titleH1">{{ title }}</h1>
      <p class="content">{{ content }}</p>
      <p class="username">Created by {{ userName }} on {{ formatDate(createdAt) }}</p>
      <p class="goodCount">Good count: {{ goodCount }}</p>
  
      <!-- ログインしている場合は、いいねボタンを表示する -->
      <div v-if="loggedIn" class="login">
        <button v-if="!liked" @click="likeText" class="good">いいね！</button>
        <button v-else @click="unlikeText" class="alreadyGood">いいね済み</button>
      </div>
  
      <!-- 自分が作成した記事の場合は、編集・削除ボタンを表示する -->
      <div v-if="isOwned" class="Owner">
        <button @click="editText" class="edit">編集</button>
        <button @click="deleteText" class="delete">削除</button>
      </div>
  
      <div v-if="tags.length > 0" class="tags">
        <p>Tags:</p>
        <ul class="tagsUl">
          <li v-for="tag in tags" :key="tag.tag_id" class="tagLi">{{ tag.tag_name }}</li>
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
              const response = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`);
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
            const response = await fetch(`https://luftalian.trap.show/writersapp/like`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text_id: this.textId,
                user_id: this.userId
              })
            });
            if (response.ok) {
              // リクエストが成功した場合の処理
              const response2 = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  good_count: this.goodCount + 1
                })
              });
              this.liked = true;
              const response3 = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`);
              const data = await response3.json();
              this.goodCount = data.good_count;
            } else {
              // エラーが発生した場合の処理
              this.liked = true;
              console.log("いいね！の送信に失敗しました。");
            }
          },
          async loadTag() {
            // APIからtagの詳細を取得
            const response = await fetch(`https://luftalian.trap.show/writersapp/tag/text/${this.textId}`);
            const data = await response.json();
            this.tags = data;
          },
          async unlikeText() {
            // いいね！を解除
            const response = await fetch(`https://luftalian.trap.show/writersapp/like/delete`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text_id: this.textId,
                user_id: this.userId
              })
            });

            if (response.ok) {
              // リクエストが成功した場合の処理
              const response2 = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  good_count: this.goodCount - 1
                })
              });
              this.liked = false;
              const response3 = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`);
              const data = await response3.json();
              this.goodCount = data.good_count;
            } else {
              // エラーが発生した場合の処理
              this.liked = false;
              console.log("いいね！の解除に失敗しました。");
            }
          },

          async editText() {
            // 編集画面に遷移
            this.$router.push(`/ztext/edit/${this.textId}`);
          },

          async deleteText() {
            const response2 = await fetch(`https://luftalian.trap.show/writersapp/texts/${this.textId}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                }
              });
              this.$router.push(`/ZAllText`);
          },
          formatDate (dateStr) {
                const date = new Date(dateStr)
                return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`
          },
          async loadLike() {
            // いいね！を解除
            const response = await fetch(`https://luftalian.trap.show/writersapp/like/check`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                text_id: this.textId,
                user_id: this.userId
              })
            });
            const data = await response.json();
            this.liked = data.check;
          }
      },
        
      mounted() {
        this.loadText();
        // ログインしている場合は、user_idを取得
        if (localStorage.getItem("user_id")) {
          this.userId = localStorage.getItem("user_id");
          this.loggedIn = true;
        }
        this.loadLike();
        this.loadTag();
      }
  };
    </script>
    <style>
    .all {
      max-width: 800px;
      margin: auto;
      padding: 40px 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  
    .titleH1 {
      font-size: 36px;
      font-weight: bold;
      margin: 0;
    }
  
    .content {
      font-size: 20px;
      margin: 20px 0;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  
    .username {
      font-size: 16px;
      color: #666;
      margin: 20px 0;
    }
  
    .goodCount {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }
  
    .login button {
      font-size: 20px;
      color: #fff;
      background-color: #4285f4;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .login button:hover {
      background-color: #0f9d58;
    }
  
    .alreadyGood {
      background-color: #ddd;
      cursor: default;
    }
  
    .Owner button {
      font-size: 20px;
      color: #fff;
      background-color: #db4437;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    .Owner button:hover {
      background-color: #c02015;
    }
  
    .tags {
      margin-top: 20px;
    }
  
    .tags p {
      font-size: 16px;
      color: #666;
      margin: 0;
    }
  
    .tagsUl {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 10px 0 0;
      list-style: none;
    }
  
    .tagLi {
      font-size: 16px;
      color: #fff;
      background-color: #4285f4;
      border-radius: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px 10px;
      transition: background-color 0.3s;
    }
  
    .tagLi:hover {
      background-color: #0f9d58;
    }
  </style>
