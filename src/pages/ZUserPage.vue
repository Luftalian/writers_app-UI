<template>
    <div>
      <h1>{{ user.name }}</h1>
      <p>アカウント作成日: {{ user.created_at }}</p>
      
      <h2>投稿した文章一覧</h2>
      <table>
        <thead>
          <tr>
            <th><button @click="sort('title')">タイトル</button></th>
            <th><button @click="sort('user_name')">作成者</button></th>
            <th><button @click="sort('created_at')">作成日時</button></th>
            <th><button @click="sort('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="text in createdTexts" :key="text.text_id" @click="showTextDetails(text.text_id)">
                <td>{{ text.title }}</td>
                <td>{{ text.user_name }}</td>
                <td>{{ formatDate(text.created_at) }}</td>
                <td>{{ text.good_count }}</td>
                <td>{{ text.content.substring(0, 20) }}</td>
            </tr>
        </tbody>
      </table>
      <h2>いいねを押した文章一覧</h2>
      <table>
        <thead>
          <tr>
            <th><button @click="sort2('title')">タイトル</button></th>
            <th><button @click="sort2('user_name')">作成者</button></th>
            <th><button @click="sort2('created_at')">作成日時</button></th>
            <th><button @click="sort2('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="text in likedTexts" :key="text.text_id" @click="showTextDetails(text.text_id)">
                <td>{{ text.title }}</td>
                <td>{{ text.user_name }}</td>
                <td>{{ formatDate(text.created_at) }}</td>
                <td>{{ text.good_count }}</td>
                <td>{{ text.content.substring(0, 20) }}</td>
            </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import { ref } from "vue";

  const id = ref("");
  const userId = localStorage.getItem("user_id");

  export default {
    data() {
        if (this.$route.params["id"] === "me") {
            id.value = userId
        }
      return {
        user: {},
        createdTexts: [],
        likedTexts: [],
        paramUserID: id,
        sortKey: '',
        sortOrder: 1,
        sortKey2: '',
        sortOrder2: 1
      }
    },
    async created() {
      const userId = this.paramUserID; // User IDを取得
      try {
        const response = await axios.get(`/api/users/${userId}`)
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
      
      try {
        const response = await axios.get(`/api/like/user/${userId}`)
        this.likedTexts = response.data        
      } catch (error) {
        console.error(error)
      }
      
      try {
        const response = await axios.get(`/api/create/user/${userId}`);
        this.createdTexts = response.data
      } catch (error) {
        console.error(error)
      }
    },
    methods: {
        showTextDetails (textId) {
            this.$router.push(`/ztext/${textId}`)
        },
        sort (key) {
            if (key === this.sortKey) {
            this.sortOrder = -this.sortOrder
            } else {
            this.sortOrder = 1
            }
            this.sortKey = key
            this.createdTexts.sort((a, b) => {
            if (a[key] < b[key]) return -this.sortOrder
            if (a[key] > b[key]) return this.sortOrder
            return 0
            })
        },
        sort2 (key) {
            if (key === this.sortKey2) {
            this.sortOrder2 = -this.sortOrder2
            } else {
            this.sortOrder2 = 1
            }
            this.sortKey2 = key
            this.likedTexts.sort((a, b) => {
            if (a[key] < b[key]) return -this.sortOrder2
            if (a[key] > b[key]) return this.sortOrder2
            return 0
            })
        },
        formatDate (dateStr) {
            const date = new Date(dateStr)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`
        }
    }
  }
  </script>