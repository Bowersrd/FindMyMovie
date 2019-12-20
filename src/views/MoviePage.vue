<template>
    <v-container class="d-flex justify-center section my-8">
        <div class="movie-container d-flex flex-column flex-md-row">
            <v-img class="image" :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" raised v-if="movie.poster_path != undefined"></v-img>
            <v-img height="100%" class="movie-poster" src="../assets/images/genericmovie.png" @click="goToMovie(movie)" v-else></v-img>
            <div class="movie-details mt-5">
                <h1 class="display-2 white--text text-uppercase font-weight-medium"> {{ movie.title }} </h1>
                <div class="d-flex flex-wrap mt-3">
                    <p class="body-2 white--text"> {{ movie.release_date | formatDate}} |</p>
                    <p class="body-2 white--text ml-1"> {{ movie.runtime }} minutes</p>
                    <p class="body-2 white--text ml-1" v-for="(genre, index) in movie.genres" :key="genre.name">| {{ movie.genres[index].name }} </p>
                </div>
                <v-divider dark class="mt-2"></v-divider>
                <p class="body-1 white--text font-italic mt-2"> {{ movie.tagline }} </p>
                <div class="d-flex">
                    <v-rating
                        v-model="rating"
                        :length="length"
                        :half-increments="halfIncrements"
                        :readonly="readonly"
                        :size="size"
                        color="yellow darken-2"
                        backgroundColor="grey darken-3"
                    ></v-rating>
                    <p class="caption yellow--text text--darken-2 mt-3 ml-1">({{ movie.vote_count }} ratings)</p>
                </div>
                <p class="body-1 white--text my-3"> {{ movie.overview }} </p>
                <v-carousel class="video-container" height="350px" hide-delimiters v-if="trailers.length > 0">
                    <v-carousel-item
                    v-for="trailer in trailers"
                    :key="trailer.key"
                    >
                        <iframe class="mt-5" width="100%" height="330px"
                        :src="`https://www.youtube.com/embed/${trailer.key}`">
                        </iframe>
                    </v-carousel-item>
                </v-carousel>
            </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data: function(){
        return{
            id: this.$route.params.id,
            movie: [],
            trailers: [],
            halfIncrements: true,
            length: 5,
            rating: null,
            readonly: true,
            size: 25
        }
    },
    mounted(){
        this.axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=0c34e3bc09bf8b788bce9f71ac36161a&language=en-US&append_to_response=videos`).then((response) => {
            this.movie = response.data
            this.rating = Math.round((response.data.vote_average/2)*2)/2
            this.trailers = response.data.videos.results
        })
    },
    computed: {
        formatDate: function(){
            return this.movie.release_date.filters()
        }
    }
}
</script>

<style lang="scss" scoped>
.movie-container{
    width: 80%;
    .image {
        width: 100%;
        max-width: 400px;
    }
    @media screen and (max-width: 959px){
        align-items: center;
        padding: 50px 0;
    }
}

.movie-details{
        margin-left: 75px;
        @media screen and (max-width: 959px){
            margin-left: 0;
        }
}

.v-application p{
    margin-bottom: 10px;
}

.video-container{
    width: 100%;
    max-width: 600px;
    iframe{
        border: none;
        opacity: 0.8;
    }
}

</style>