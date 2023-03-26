<template>
    <div class="all">
      <h1>記事一覧</h1>
      <div class="tags">
        <select v-model="selectedTag" @change="getTaggedTexts" class="selectTags">
          <option value="" class="option">全てのタグ</option>
          <option v-for="tag in tags" :key="tag.tag_name" :value="tag.tag_name" class="OptionTag">{{ tag.tag_name }}</option>
        </select>
      </div>
      <table class="table">
        <thead class="thread">
          <tr class="tr">
            <th><button @click="sort('title')">タイトル</button></th>
            <th><button @click="sort('user_name')">作成者</button></th>
            <th><button @click="sort('created_at')">作成日時</button></th>
            <th><button @click="sort('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="text in texts" :key="text.text_id" @click="showTextDetails(text.text_id)" class="trKey">
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
  
  export default {
    data () {
      return {
        texts: [],
        tags: [],
        selectedTag: '',
        sortKey: '',
        sortOrder: 1
      }
    },
    created () {
      this.getTexts()
      this.getTags()
    },
    methods: {
      getTexts () {
        axios.get('https://luftalian.trap.show/writersapp/texts')
          .then(res => {
            this.texts = res.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      getTags () {
        axios.get('https://luftalian.trap.show/writersapp/tag')
          .then(res => {
            this.tags = res.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      getTaggedTexts () {
        if (this.selectedTag) {
          axios.get(`https://luftalian.trap.show/writersapp/tag/name/${this.selectedTag}`)
            .then(res => {
              this.texts = res.data
            })
            .catch(err => {
              console.error(err)
            })
        } else {
          this.getTexts()
        }
      },
      showTextDetails (textId) {
        this.$router.push(`/text/${textId}`)
      },
      sort (key) {
        if (key === this.sortKey) {
          this.sortOrder = -this.sortOrder
        } else {
          this.sortOrder = 1
        }
        this.sortKey = key
        this.texts.sort((a, b) => {
          if (a[key] < b[key]) return -this.sortOrder
          if (a[key] > b[key]) return this.sortOrder
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
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 32px;
  margin-bottom: 30px;
}

.tags {
  margin-bottom: 20px;
}

.selectTags {
  font-size: 16px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.selectTags:focus {
  outline: none;
}

.option {
  font-size: 16px;
}

.OptionTag {
  font-size: 16px;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

.thread {
  background-color: #ddd;
  font-weight: bold;
}

.tr {
  text-align: left;
}

th {
  padding: 10px;
}

.tbody {
  border: 1px solid #ddd;
}

.trKey {
  cursor: pointer;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

button {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3e8e41;
}

button:focus {
  outline: none;
}

a {
  color: #4CAF50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>