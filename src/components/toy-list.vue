
<template lang="">
    <div>
        <div class="preview" v-for="toy in toys">
                <button class="btn" @click="deleteToy(toy._id)">X</button>
                
               <toy-preview :toy="toy" />
               <div class="prev-links">
               <router-link :to="'/toy/'+ toy._id">Details</router-link>
               <router-link :to="'/edit/'+ toy._id">Edit</router-link>
               </div>
              </div>
    </div>
</template>
<script>
import toyPreview from './toy-preview.vue'
export default {
    name:'list preview',
    props: { toys: Array }, components: {
        toyPreview,
    },
    methods: {
        deleteToy(toyId) {
            this.$emit('delete', toyId)
        },
        toggleTodo(todo) {
            this.$emit('toggleTodo', todo)
        },
    },
}
</script>
