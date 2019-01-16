<template>
      <div>
    <v-card class="mb-3 elevation-0">
          <v-container fluid>
              <v-layout row align-start
                        justify-space-around>
                  <v-flex xs3 sm2 md1>
                    <v-avatar>
                        <v-img 
                            :src="comment.avatar"  >
                        </v-img>
                    </v-avatar>
                  
                </v-flex>
                  <v-flex xs9 sm10 md11 >
                      <v-card-text><h3>
                          {{comment.by}}: 
                        <span class="grey--text" v-html ="comment.text"></span> </h3>            
                    
                      </v-card-text>
                      
                    <v-card-actions class="mb-3" >
                        
                        <v-btn small class="mr-3" @click= "show = !show">
                            reply
                        </v-btn>
                        
                        <em>{{moment(getTime()).fromNow()}}</em>
                    </v-card-actions>
                    
                    <app-reply v-if ="show"></app-reply>
                   
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
         <template v-if ="comment.kids">
              <comment-list v-for ="comment in children" class="ml-4"  :comment = "comment"></comment-list>

        </template>
</div>
</template>

<script>
import {eventHub} from '../../main.js';
import Reply from './Reply.vue';
var moment = require('moment');
export default {
    name: 'CommentList',
    components: {
        'appReply': Reply
    },
    data(){
        return {
            moment:moment,
            show: false,
            children:[]
        }
    },
    props: ['comment','count'],
    created(){

        if(this.comment.kids){
            this.getChild(this.comment.kids[0]);
            
        }
        EventHub.$on('clearArray', ()=> {   
            this.children = [];
        });
    },
    methods:{
        getTime(){
            return this.comment.time*1000;
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
            let childdata= child;
            childdata.avatar = 'http://i.pravatar.cc/150?u='+this.count;
            this.count++;
            this.children.push(childdata);    
        }
        
    }
}
</script>

