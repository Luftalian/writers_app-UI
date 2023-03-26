<template>
    <div class="all">
      <h1>記事一覧</h1>
      <div class="tags">
        <select v-model="selectedTag" @change="getTaggedTexts" class="tagsSelect">
          <option value="" class="option">全てのタグ</option>
          <option v-for="tag in tags" :key="tag.tag_name" :value="tag.tag_name" class="optionTags">{{ tag.tag_name }}</option>
        </select>
      </div>
      <table class="table">
        <thead class="thead">
          <tr class="tr">
            <th><button @click="sort('title')">タイトル</button></th>
            <th><button @click="sort('user_name')">作成者</button></th>
            <th><button @click="sort('created_at')">作成日時</button></th>
            <th><button @click="sort('good_count')">いいね</button></th>
            <th>本文（先頭20文字）</th>
          </tr>
        </thead>
        <tbody classs="tbody">
          <tr v-for="text in texts" :key="text.text_id" @click="showTextDetails(text.text_id)" class="text">
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
        this.texts = []
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
        this.$router.push(`/ztext/${textId}`)
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
  * {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  
  .all {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  
  .tags {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tagsSelect {
    font-size: 18px;
    padding: 8px 16px;
    border: 2px solid #ddd;
    border-radius: 4px;
    margin-right: 20px;
    cursor: pointer;
  }
  
  .option {
    font-weight: bold;
  }
  
  .optionTags {
    font-weight: normal;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 50px;
  }
  
  .thead {
    background-color: #eee;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
  
  .th {
    padding: 10px;
    cursor: pointer;
  }
  
  .th button {
    background-color: transparent;
    border: none;
    color: #666;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
  }
  
  .th button:focus {
    outline: none;
  }
  
  .tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .text {
    cursor: pointer;
    font-size: 18px;
  }
  
  .text:hover {
    background-color: #f2f2f2;
  }
  
  td {
    padding: 10px;
  }
  
  td:last-child {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }
    
    .tagsSelect {
      font-size: 16px;
      padding: 6px 12px;
      margin-right: 10px;
    }
    
    .th button {
      font-size: 16px;
    }
    
    td {
      font-size: 16px;
      padding: 8px;
    }
  }
</style>