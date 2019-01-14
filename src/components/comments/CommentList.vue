<template>
<v-container>
  <v-layout row wrap align-center
            justify-space-around>
    <v-flex xs12 sm10 md10>
      <app-comment v-for ="(comment,index) in comments" :child="comment.child" :comment= "comment" :index= "index">
      </app-comment> 
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {eventHub} from '../../main.js';
import Comment from './Comment.vue';
export default {
    components: {
        'appComment': Comment
    },
    data(){
        return {
            comments:[],
            count:0
        }
    },
    created(){
        eventHub.$on('rootcomments', data=>{
            this.updateComments(data);
        })

    },
    methods: {
        updateComments(data){
            
            this.comments = data;
            for(var comment in this.comments){
            this.comments[comment].avatar = 'http://i.pravatar.cc/150?u='+this.count;
            this.count++;
            if(this.comments[comment].child){
            this.comments[comment].child.avatar = 'http://i.pravatar.cc/150?u='+this.count;
            this.count++;  
            }
            }
            console.log(this.comments);
        }
    }
}
</script>

