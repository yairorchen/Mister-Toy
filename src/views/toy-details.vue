<template lang="">
    <div class="details">
        <h1>Details</h1>
        <h3>name: {{toy.name}}</h3>
        <h3>price: {{toy.price}} $</h3>
        <h3>in stock: {{toy.inStock}}</h3>
        <h3>categories:</h3>
        <div class="categories">
        <p v-for="label in toy.labels">
        {{label}}
        </p>
        </div>
        <h3>Reviews:</h3>
        <section class="reviews">
        
        <p class="review" v-for="review in toy.reviews">
        <!-- <progress :value="review.stars" max="5"></progress> -->
        
         <div class="demo-rate-block">
            <span class="demonstration"></span>
             <el-rate v-model="review.stars" :colors="colors" />
        </div>
        <p>{{review.user}}: {{review.txt}}</p>

        </p>
        </section>
         <!-- <stars-rate/> -->
        <router-link to="/toy/">Back</router-link>
    </div>
</template>
<script>

export default {
    components: { },
    created() {
        const toyId = this.$route.params._id
        this.$store.dispatch({ type: 'getById', toyId }).then((toy) => {
            this.toy = JSON.parse(JSON.stringify(toy))
            console.log(toy)
        })
    },
    data() {
        return {
            toy: { title: '', createdAt: '' },
        }
    },
    computed: {
        currTodo() {
            return this.$store.getters.getCurrToy
        },
    },
    methods: {},
}
</script>
<style lang="">
    
</style>