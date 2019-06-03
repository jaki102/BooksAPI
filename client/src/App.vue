<template>
  <div id="app">
    <table class='books_data'>
      <tr>
        <th class="sort-by" @click="sortMethod('id', id_dir)">Id</th>
        <th class="sort-by" @click="sortMethod('title', title_dir)">Tytuł</th>
        <th class="sort-by" @click="sortMethod('author', author_dir)">Autor</th>
        <th class="sort-by" @click="sortMethod('class', class_dir)">Gatunek</th>
        <th class="sort-by" @click="sortMethod('pages', pages_dir)">Liczba stron</th>
      </tr>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>{{ book.class }}</td>
        <td>{{ book.pages }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data:function(){
    return {
      books:null,
      id_dir: 'ASC',
      title_dir: 'ASC',
      author_dir: 'ASC',
      class_dir: 'ASC',
      pages_dir: 'ASC',
    }   
  },
  mounted(){
    axios.get('http://localhost:3000/books').then((response)=>{
      this.books = response.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  },
  methods:{
    sortMethod(param, dir){
      dir = dir === 'ASC' ? 'DESC' : 'ASC';
      axios.get('http://localhost:3000/books', { params: { parameter: param, direction: dir} }).then((response)=>{
        this.books = response.data
      })
      .catch((err)=>{
        console.log(err);
      })
      if(param == 'id'){
        this.id_dir = dir;
      } else if(param == 'title'){
        this.title_dir = dir;
      } else if(param == 'author'){
        this.author_dir = dir;
      } else if(param == 'class'){
        this.class_dir = dir;
      } else if(param == 'pages'){
        this.pages_dir = dir;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display:flex;
  justify-content: center;
  .books_data{
    border:1px solid grey;
    border-collapse: collapse;
    tr{
      &:nth-child(odd):not(:first-child){
        background-color: #eceff1;
      }
      th:hover{
        cursor: pointer;
        background-color: #eceff1;
      }
      th, td{
        box-sizing: border-box;
        min-width: 55px;
        padding: 20px 10px;
        text-align: center;
        border:1px solid grey;
      }
      th.sort-by { 
        padding-right: 20px;
        position: relative;
      }
      .sort-by:before,
      .sort-by:after {
        border: 4px solid transparent;
        content: "";
        display: block;
        height: 0;
        right: 10px;
        top: 50%;
        position: absolute;
        width: 0;
      }
      .sort-by:before {
        border-bottom-color: #666;
        margin-top: -9px;
      }
      .sort-by:after {
        border-top-color: #666;
        margin-top: 1px;
      }
    }
  }
}
</style>
