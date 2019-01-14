<template>
    <v-card>
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
                    
                    <app-reply v-if ="show" :index= "index"></app-reply>
                   
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>

</template>
<script>
import Reply from './Reply.vue';
var moment = require('moment');
export default {
    components: {
        'appReply': Reply
    },
    data(){
        return {
            moment:moment,
            show: false,
            selectedComponent: ''
        }
    },
    props:['comment','child','index'],
    methods:{
        getTime(){
            return this.comment.time*1000;
        }
        
    }
    
}
</script>
