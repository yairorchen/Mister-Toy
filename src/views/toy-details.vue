<template lang="">
    <div>
        <h1>details</h1>
        <h3>name: {{toy.name}}</h3>
        <h3>price: {{toy.price}} $</h3>
        <h3>in stock: {{toy.inStock}}</h3>
        <h3>categories:</h3>
        <h3 v-for="label in toy.labels">
        <p> {{label}}</p>
        </h3>
        <section class="reviews">
        <h3>reviews:</h3>
        <h3 class="review" v-for="review in toy.reviews">
        <progress :value="review.stars" max="5"></progress>
        <p> {{review.txt}}</p>
        </h3>
        </section>
        <router-link to="/toy/">Back</router-link>
    </div>
</template>
<script>
export default {

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