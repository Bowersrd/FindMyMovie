<template>
  <v-container class="section">
    <h1 class="white--text display-1 font-weight-medium text-uppercase ml-10">Find Your Movie</h1>
    <v-text-field
      class="mx-2 mt-5"
      append-icon="mdi-magnify"
      label="Search..."
      v-model="text"
      rows="1"
      clearable
      outlined
      rounded
      dark
      @keyup.enter="searchMovie"
      @click:append="searchMovie"
    ></v-text-field>
    <v-row class="slide-up">
      <v-col v-for="movie in movieList" :key="movie.id" cols="6" sm="4" md="3" lg="2">
        <v-img height="100%" class="movie-poster" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" @click="goToMovie(movie)" v-if="movie.poster_path != undefined"></v-img>
        <v-img height="100%" class="movie-poster" src="../assets/images/genericmovie.png" @click="goToMovie(movie)" v-else></v-img>
      </v-col>
    </v-row>
    <v-pagination class="white--text mt-5 mb-12" color="red" :length="movies.total_pages" v-model="page" :total-visible="7" @input="newPage" v-show="movies.length !== 0"></v-pagination>
  </v-container>
</template>

<script>
import router from "../router"

export default {
  data: function(){
    return{
      movies: [],
      text: '',
      page: 1
    }
  },
  methods: {
    searchMovie: function(){
      this.axios.get(`https://api.themoviedb.org/3/search/movie?api_key=0c34e3bc09bf8b788bce9f71ac36161a&language=en-US&query=${this.text}&page=1&include_adult=false`).then((response) => {
      this.movies = response.data
      })
    },
    goToMovie: function(movie){
      router.push({ name: 'movie-page', params: { id: movie.id } })
    },
    newPage: function(){
      this.axios.get(`https://api.themoviedb.org/3/search/movie?api_key=0c34e3bc09bf8b788bce9f71ac36161a&language=en-US&query=${this.text}&page=${this.page}&include_adult=false`).then((response) => {
      this.movies = response.data
      })
    }
  },
  computed:{
    movieList: function(){
      return this.movies.results
    },
    searchItem: function(){
      return encodeURIComponent(this.text)
    }
  } 
}
</script>

<style lang="scss" scoped>
.container{
  width: 80%;  
}

.section{
  margin-bottom: 80px;
}

.movie-poster{
  cursor: pointer;
}

.slide-up {
  animation: 1.5s slide-up;
}

// Keyframes
@keyframes slide-up {
  from {
    opacity: 0;
    margin-top: 250px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
}
</style>