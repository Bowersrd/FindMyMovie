<template>
  <nav>
    <v-app-bar app dark flat class="px-4 py-3" color="transparent">
      <v-toolbar-title class="text-md-right d-none d-md-flex">Find My Movie</v-toolbar-title>
      <v-spacer class="d-none d-md-flex"></v-spacer>
      <v-btn tile exact :to="link.route" text class="d-none d-md-flex" v-for="link in links" :key="link.name">{{ link.name }}</v-btn>
      <v-spacer class="d-md-none"></v-spacer>
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      width="50%"
      color="grey darken-4"
    >
      <v-list color="transparent">
        <v-list-item
          v-for="link in links"
          :key="link.name"
          :to="link.route"
        >
          <v-list-item-content>
            <v-list-item-title class="white--text text-uppercase mt-3">{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
    data: () => {
      return {
        links: [
          {name: 'Home', route: '/'},
          {name: 'Find Movie', route: '/findmovie'},
          {name: 'Top Movies', route: '/movies'},
          {name: 'Search', route: '/search'}
          ],
        drawer: false
      }
    }    
}
</script>

<style lang="scss" scoped>
.v-btn--active{
  background: red;
}
</style>