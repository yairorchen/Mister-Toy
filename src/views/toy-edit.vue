<template>
    <div class="edit-container">
        <h1>Edit</h1>
        <form @submit.prevent="updateToy()">
        <p>name:</p>
        <input  type="text" placeholder="name" v-model="updatedToy.name" />
        <p>price:</p>
        <input v-model="updatedToy.price"  type="number" placeholder="price"/>
        <p>in stock:</p>
        <input  type="text" placeholder="price" v-model="updatedToy.inStock" />
        <p>categories:</p>

        <el-select v-model="updatedToy.labels" multiple placeholder="Select" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <button>save</button>
        </form>
        <router-link to="/toy/">Back</router-link>
        
    </div>
</template>
<script>
// import labelSelect from '../components/select.vue';

export default {
    components: {},
    created() {
        this.getToyById()
        // this.todo = todoService.getById(id)
    },
    data() {
        return {
            toyId:'',
            updatedToy:{name:'',price:'',inStock:'',labels:'',},
            options: [
                {
                    value: 'On wheels',
                    label: 'On wheels',
                },
                {
                    value: 'Box game',
                    label: 'Box game',
                },
                {
                    value: 'Art',
                    label: 'Art',
                },
                {
                    value: 'Baby',
                    label: 'Baby',
                },
                {
                    value: 'Doll',
                    label: 'Doll',
                }, {
                    value: 'Puzzle',
                    label: 'Puzzle',
                }, {
                    value: 'Outdoor',
                    label: 'Outdoor',
                },
            ]
           
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




   


