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
    <v-content>
      <comment-list></comment-list>
    </v-content>
  </v-app>
</template>

<script>
import StorySearch from './components/story/StorySearch.vue';
import CommentList from './components/comments/CommentList.vue';

export default {
  name: 'App',
  components: {
    'app-story-search': StorySearch,
    'comment-list': CommentList
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
