<template>
    <v-content class="d-flex align-center">
        <v-container class="d-flex flex-column align-center slide-up genre-container">
            <h1 class="display-1 white--text font-weight-black text-uppercase mb-3">Pick your mood</h1>
            <v-row class="my-4">
                <v-col class="d-flex justify-center" cols="12" sm="6" md="3" lg="2" v-for="genre in genres" :key="genre.name">
                    <v-card class="grey darken-4 raised genre-card" :class="{ active:genre.id == active }" height="200" width="90%" @click="getGenre(genre.id); scrollTo(); active = genre.id" :style="{'background-image': 'url(' + require(`../assets/images/${genre.icon}.png`) + ')'}">
                        <v-card-title class="white--text text-uppercase body-1">{{ genre.name }}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                <v-dialog dark v-model="extras" width="300px">
                    <v-card>
                        <v-card-title>
                            Narrow Your Movie
                        </v-card-title>
                        <v-container>
                            <v-select
                            v-model="year"
                            :items="years"
                            label="Enter a Specific Year"
                            outlined
                            ></v-select>
                        </v-container>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="error darken-1" text @click="extras = false; year = null">Cancel</v-btn>
                            <v-btn color="success darken-1" outlined text @click="extras = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
            <v-row>
                <transition name="fade" mode="out-in">
                    <v-col class="mb-8" v-show="genreSelected != ''">
                        <v-btn id="action-btn" large outlined tile color="red" :loading="loading" @click="getData">Find My Movie</v-btn>
                        <v-btn class="ml-5" large tile color="red" @click="extras = true; listYears()"> {{ yearPicked }} </v-btn>
                    </v-col>
                </transition>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import router from "../router"

export default {
    data: function(){
        return{
            genres: [
                {name: 'Action', id: '28', icon: 'action'},
                {name: 'Animation', id: '16', icon: 'animation'},
                {name: 'Comedy', id: '35', icon: 'comedy'},
                {name: 'Drama', id: '18', icon: 'drama'},
                {name: 'Family', id: '10751', icon: 'family'},
                {name: 'Fantasy', id: '14', icon: 'fantasy'},
                {name: 'Horror', id: '27', icon: 'horror'},
                {name: 'Mystery', id: '9648', icon: 'mystery'},
                {name: 'Romance', id: '10749', icon: 'romance'},
                {name: 'Sci-Fi', id: '878', icon: 'scifi'},
                {name: 'Thriller', id: '53', icon: 'thriller'},
                {name: 'Western', id: '37', icon: 'western'}
            ],
            genreSelected: '',
            active: null,
            movie: [],
            random: null,
            page: null,
            loading: false,
            extras: false,
            year: null,
            years: [],
            options: {
                duration: 1000,
                easing: 'easeInOutCubic'
            }
        }
    },
    methods: {
        getGenre: function(genre){
            return this.genreSelected = genre
        },
        getData: function(){
            this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=0c34e3bc09bf8b788bce9f71ac36161a&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=5&with_runtime.gte=60&with_genres=${this.genreSelected}&year=${this.year}`).then((response) => {
            let pages = response.data.total_pages 
            this.page = Math.floor((Math.random() * pages) + 1)
            this.random = Math.floor((Math.random() * 19) + 1)
            }).then(() => {
                this.getMovie();
                this.loading = true
            })
        },
        getMovie: function(){
            this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=0c34e3bc09bf8b788bce9f71ac36161a&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&vote_average.gte=5&with_runtime.gte=60&page=${this.page}&with_genres=${this.genreSelected}&year=${this.year}`).then((response) => {
            this.movie = response.data.results
            }).then(() => {
                    setTimeout(this.sendToMovie, 1000)
            })
        },
        sendToMovie: function(){
            if (this.year > new Date().getFullYear() || this.year < 1930 && this.year != null){
                this.loading = false
                alert('Invalid Year')
            } else {
            router.push({ name: 'movie-page', params: { id: this.movie[this.random].id } })
            }
        },
        scrollTo: function(){
            this.$vuetify.goTo(9999, this.options)
        },
        listYears: function(){
            let currentYear = new Date().getFullYear()
            let startYear = 1930
            while ( startYear <= currentYear ) {
                this.years.unshift(startYear++);
            }   
            return this.years;
        }
    },
    computed: {
        yearPicked: function(){
            let year = this.year
            if (year == null){
                return 'Select Year...'
            } else {
                return year
            }
        }
    }    
}
</script>

<style lang="scss" scoped>
.genre-card{
    background-position: center 15px;
    background-size: contain;
    opacity: 0.5;
    transition: all 0.3s ease-in-out;
    &:hover {
        opacity: 0.9;
        cursor: pointer;
        transform: scale(1.05)
    }
}

.active {
        opacity: 0.9;
        transform: scale(1.05);
}

// Animations
div.slide-up {
  animation: 1.5s slide-up;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0;
}
</style>