<template>
  <v-container class="section mt-8">
    <div class="d-inline-flex fade-in">
      <v-img class="ml-5" height="auto" width="100" src="../assets/images/tmdb.png"></v-img>
      <h1 class="white--text text-uppercase ml-5 mt-8">Popular Movies</h1>
    </div>
    <v-row class="slide-up container">
      <v-col v-for="movie in movieList" :key="movie.title" cols="6" sm="4" md="3" lg="2">
        <v-img height="100%" class="movie-poster" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" @click="goToMovie(movie)"></v-img>
      </v-col>
    </v-row>
    <v-pagination class="white--text mt-5 mb-12" color="red" :length="movies.total_pages" v-model="page" :total-visible="7" @input="newPage"></v-pagination>
  </v-container>
</template>

<script>
import router from "../router"

export default {
  data: function(){
    return{
      movies: [],
      page: 1,
      apiKey: process.env.VUE_APP_API_KEY
    }
  },
  mounted(){
    this.axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`).then((response) => {
      this.movies = response.data
    })
  },
  computed:{
    movieList: function(){
      return this.movies.results
    }
  },
  methods:{
    newPage: function(){
      this.axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`).then((response) => {
      this.movies = response.data
      })
    },
    goToMovie: function(movie){
      router.push({ name: 'movie-page', params: { id: movie.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-poster{
  cursor: pointer;
}

.container{
  margin: 0 auto;
}


.fade-in {
  animation: 2s fade-in;
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

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

