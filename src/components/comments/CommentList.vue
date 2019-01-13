<template>

    <ul>
        <li v-for ="comment in comments">{{comment.by}}--{{comment.id}}--<span v-if ="comment.child">{{comment.child.by}}</span></li>
    </ul>
</template>

<script>
import {eventHub} from '../../main.js'
export default {
    data(){
        return {
            comments:[]
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
        }
    }
}
</script>

