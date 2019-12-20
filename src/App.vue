<template>
  <v-app>
      <v-content class="d-flex align-center" id="header" tag="header">
        <Navbar />
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: 0;
  font-family: 'Lato', sans-serif;
}

#header{
  background: linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0.8)),url('./assets/images/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
}

.section{
  margin: 0 auto;
}
</style>
