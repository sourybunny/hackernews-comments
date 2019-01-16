<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Hacker News</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-toolbar>

    <v-content>
      <app-story-search></app-story-search>
    </v-content>
  </v-app>
</template>

<script>
import StorySearch from './components/story/StorySearch.vue';


export default {
  name: 'App',
  components: {
    'app-story-search': StorySearch
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style>
html,body{
  overflow-x: hidden;
}
</style>
