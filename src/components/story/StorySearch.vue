<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field v-model="storyid"
        name = "id"
        @keyup.enter = "submit"
        placeholder ="enter story id"
        hint = "18879185"
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
    
    
  </v-container>
</template>

<script>
import {eventHub} from '../../main.js'
  export default {
    data () {
      return {
        storyid: '',
        comments: []
      }
    },
    methods: {
      submit(){
          console.log("submitted");
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
                            this.comments = [];
                            this.children = [];
                            var comments = data.kids;
                            for(let comment in comments){
                                let commentid = comments[comment];
                                // grab root cmnt id and get child comments of each
                                this.getComments(commentid);
                            }
                        } else {     // if type == comment   
                               
                            data.deleted?null:this.comments.push(data);
                            data.kids?this.getChild(data.kids[0]):null;
                        }
                    })
                    
      },
      getChild(id){
          this.$http.get('https://hacker-news.firebaseio.com/v0/item/'+id+'.json')
          .then(res=>{
              return res.json();
          })
          .then(data=>{
              data.deleted?null:this.appendChild(data);     
          })
      },
        appendChild(child){
            let parent = this.comments.filter(comment=>{
                return comment.id == child.parent;
            })
            let i = this.comments.indexOf(parent[0]);
            this.comments[i].child = child;
            eventHub.$emit('rootcomments',this.comments);
        }
    
    }
  }
</script>

<style>
 
</style>