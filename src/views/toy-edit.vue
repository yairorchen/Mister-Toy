<template lang="">
    <div>
        <h1>edit</h1>
        <form @submit.prevent="updateToy()">
        <p>name:</p>
        <input  type="text" placeholder="name" v-model="updatedToy.name" />
        <p>price:</p>
        <input v-model="updatedToy.price"  type="number" placeholder="price"/>
        <p>in stock:</p>
        <input  type="text" placeholder="price" v-model="updatedToy.inStock" />
        <p>categories:</p>
            <select name="labels" id="labels" multiple v-model="updatedToy.labels">
                <option value="On wheels">On wheels</option>
                <option value="Box game">Box game</option>
                <option value="Art">Art</option>
                <option value="Baby">Baby</option>
                <option value="Doll">Doll</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                </select>
        <h3 v-for="label in updatedToy.labels">
            <p> {{label}}</p>
        </h3>
        <button>save</button>
        </form>
        <router-link to="/toy/">Back</router-link>
    </div>
</template>
<script>
export default {
    created() {
        this.getToyById()
        // this.todo = todoService.getById(id)
    },
    data() {
        return {
            toyId:'',
            updatedToy:{name:'',price:'',inStock:'',labels:'',}
        }
    },
    methods: {
        updateToy() {
            console.log(this.currToy);
            this.$store
                .dispatch({ type: 'updateToy', toy: this.updatedToy })
                .then((updatedToy) => {
                    console.log(updatedToy)
                    
                    // showSuccessMsg(`updated toy named: ${updatedToy.name}`)
                    // this.$router.push({ path: '/' })
                })
                .catch((err) => {
                    // showErrorMsg(`Cannot update toy`)
                })

            
        },
        addLabel(val){
            console.log(val);
        },
        getToyById(){
            const toyId = this.$route.params._id
            if(toyId)
            this.$store.dispatch({ type: 'getById', toyId }).then((toy) => {
                var currToy = JSON.parse(JSON.stringify(toy))
                this.updatedToy = currToy
                console.log(toy)
            })
        },
    },
    computed: {
        currToy() {
          return this.$store.getters.getCurrToy
        },
    },
}
</script>
<style lang="">
    
</style>