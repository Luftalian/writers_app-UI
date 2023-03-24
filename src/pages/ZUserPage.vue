<template>
    <div class="all">
      <h1>{{ user.name }}</h1>
      <p>アカウント作成日: {{ user.created_at }}</p>
      
      <h2>投稿した文章一覧</h2>
      <table class="table1">
        <thead class="thead1">
          <tr class="topTr">
            <th><button @click="sort('title')">タイトル</button></th>
            <th><button @click="sort('user_name')">作成者</button></th>
            <th><button @click="sort('created_at')">作成日時</button></th>
            <th><button @click="sort('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="text in createdTexts" :key="text.text_id" @click="showTextDetails(text.text_id)" class="noTopTr">
                <td>{{ text.title }}</td>
                <td>{{ text.user_name }}</td>
                <td>{{ formatDate(text.created_at) }}</td>
                <td>{{ text.good_count }}</td>
                <td>{{ text.content.substring(0, 20) }}</td>
            </tr>
        </tbody>
      </table>
      <h2>いいねを押した文章一覧</h2>
      <table class="table2">
        <thead class="thead2">
          <tr class="topTr2">
            <th><button @click="sort2('title')">タイトル</button></th>
            <th><button @click="sort2('user_name')">作成者</button></th>
            <th><button @click="sort2('created_at')">作成日時</button></th>
            <th><button @click="sort2('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody class="tbody2">
            <tr v-for="text in likedTexts" :key="text.text_id" @click="showTextDetails(text.text_id)" class="noTopTr2">
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
  
<style>
.all {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

th {
  font-weight: bold;
  background-color: #f7f7f7;
  text-align: left;
  padding: 10px;
  cursor: pointer;
}

th button {
  background-color: transparent;
  border: none;
  font-weight: normal;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
}

th button:hover {
  text-decoration: underline;
}

td {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  vertical-align: middle;
  font-size: 1.2rem;
}

tr:hover {
  background-color: #f7f7f7;
}

.noTopTr td {
  border-top: none;
}

.table1 {
  margin-bottom: 60px;
}

.topTr th:first-child,
.noTopTr td:first-child {
  width: 35%;
}

.topTr th:nth-child(2),
.noTopTr td:nth-child(2) {
  width: 15%;
}

.topTr th:nth-child(3),
.noTopTr td:nth-child(3) {
  width: 20%;
}

.topTr th:nth-child(4),
.noTopTr td:nth-child(4) {
  width: 10%;
}

.topTr th:nth-child(5),
.noTopTr td:nth-child(5) {
  width: 20%;
}

.table2 {
  margin-bottom: 60px;
}

.topTr2 th:first-child,
.noTopTr2 td:first-child {
  width: 35%;
}

.topTr2 th:nth-child(2),
.noTopTr2 td:nth-child(2) {
  width: 15%;
}

.topTr2 th:nth-child(3),
.noTopTr2 td:nth-child(3) {
  width: 20%;
}

.topTr2 th:nth-child(4),
.noTopTr2 td:nth-child(4) {
  width: 10%;
}

.topTr2 th:nth-child(5),
.noTopTr2 td:nth-child(5) {
  width: 20%;
}
</style>