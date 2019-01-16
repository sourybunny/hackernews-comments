<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field v-model="storyid"
        name = "id"
        @keyup.enter = "submit"
        placeholder ="enter story id"
        hint = "18879185"
        @change = "emptyArr"
        single-line>

        </v-text-field>

      </v-flex>
      <v-flex xs6 >
        <v-btn round outline color = "primary" 
        @click.prevent = "submit" 
        :disabled = "!storyid" 
        >Get Comments</v-btn>
      </v-flex>
    </v-layout>
    <v-content>
        <h2 class="text-xs-center"> {{msg}}</h2>
        <comment-list v-for="comment in comments" :comment = "comment" :count = "count"></comment-list>

    </v-content>
  </v-container>

  
</template>

<script>
import {eventHub} from '../../main.js';
import CommentList from '../../components/comments/CommentList.vue';
  export default {
      name: 'StorySearch',
      data () {
      return {
        storyid: '',
        comments: [],
        count:1,
        msg: ''
      }
    },
    components: {  
    'CommentList': CommentList
    },
    methods: {
    emptyArr(){
        this.comments = [];
        EventHub.$emit('clearArray');
    },
     submit(){
          this.getComments(this.storyid);
          console.log("submitted",this.comments);
      },
      getComments(id){
          this.$http.get('https://hacker-news.firebaseio.com/v0/item/'+id+'.json')
                    .then(response =>{
                        return response.json();
                    }, err =>{
                        console.log("error getting story", err);
                    })
                    .then(data=>{
                        // if it's a story, get list of all root comment ids 
                        if(data.type == "story"){
                            this.msg=data.descendants==0?'no comments yet':'';
                            this.comments = [];
                            this.children = [];
                            this.count = 0;
                            var comments = data.kids;
                            for(let comment in comments){
                                let commentid = comments[comment];
                                // grab root cmnt id 
                                this.getComments(commentid);
                            }
                        } else {     // if type == comment   
                            let commentdata = data;
                            commentdata.avatar = 'http://i.pravatar.cc/150?u='+this.count;
                            this.count++;
                            if(!data.deleted){
                                this.comments.push(commentdata);
                                
                            }
                        }
                    })
      }
    }
  }
</script>

<style>
 
</style>