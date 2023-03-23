<template>
    <div>
      <h1>記事一覧</h1>
      <div>
        <select v-model="selectedTag" @change="getTaggedTexts">
          <option value="">全てのタグ</option>
          <option v-for="tag in tags" :key="tag.tag_name" :value="tag.tag_name">{{ tag.tag_name }}</option>
        </select>
      </div>
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
          <tr v-for="text in texts" :key="text.text_id" @click="showTextDetails(text.text_id)">
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
        axios.get('/api/texts')
          .then(res => {
            this.texts = res.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      getTags () {
        axios.get('/api/tag')
          .then(res => {
            this.tags = res.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      getTaggedTexts () {
        if (this.selectedTag) {
          axios.get(`/api/tag/name/${this.selectedTag}`)
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