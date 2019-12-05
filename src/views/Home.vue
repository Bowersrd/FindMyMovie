<template>
  <v-content class="headline section">
    <v-container fluid class="d-flex flex-column flex-md-row justify-center slide-left">
      <h1 class="white--text font-weight-black text-uppercase mr-md-8">Find My Movie</h1> 
      <v-btn to="/findmovie" x-large tile outlined color="red" class="mt-5 action-btn">Let's Go!</v-btn>
    </v-container>
    <v-container fluid class="d-flex justify-center white--text title slide-right">
      <p>Are you tired of scrolling through pages and pages of movie selections and falling asleep as soon as you find one? Let us find you a movie with a few simple questions.</p>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
.content{
  height:100vh;
}

.headline{
  width: 80%;
}

.action-btn{
  transition: transform 0.5s ease-in-out;
    &:hover{
    transform: scale(1.10)
    }
}

h1{
  font-size: 4em;
  line-height: 0.9em;
  @media screen and (max-width: 1340px){
    font-size: 2.65em;
    padding-top: 20px;
  }
}

.slide-right {
  animation: 2s slide-right;
}

.slide-left {
  animation: 2s slide-left;
}

// Media
@media screen and (max-width: 959px){
  .container{
    width: 70%;
  }

  .slide-left {
    animation: 2s slide-left-mobile;
  }

  .slide-right {
    animation: 2s slide-right-mobile;
  }
}

// Keyframes
@keyframes slide-left {
  from {
    opacity: 0;
    margin-left: 30%;
  }

  to {
    opacity: 1;
    margin-left: 0%;
  }
}

@keyframes slide-right {
  from {
    opacity: 0;
    margin-left: -30%;
  }

  to {
    opacity: 1;
    margin-left: 0%;
  }
}

// Mobile Keyframe Correction -- Due to container size, we need to adjust the keyframe animation

@keyframes slide-left-mobile {
  from {
    opacity: 0;
    margin-left: 45%;
  }

  to {
    opacity: 1;
    margin-left: 15%;
  }
}

@keyframes slide-right-mobile {
  from {
    opacity: 0;
    margin-left: -45%;
  }

  to {
    opacity: 1;
    margin-left: 15%;
  }
}
</style>