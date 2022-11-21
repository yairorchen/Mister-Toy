<script>
import toyFilter from '../components/toy-filter.vue';
import toyList from '../components/toy-list.vue';
import toyService from '../services/toy.service'
export default {
    name: 'toy app',
    components: { toyFilter, toyList },
    created() {
        this.$store.dispatch({ type: 'loadToys' })
    },
    data() {
        return {

        }
    },
    mounted(){
        console.log('holla')
        toyService.query()
    },computed:{
        toys() {
            return this.$store.getters.toys
        },
    },
    methods: {
        addToy() {
            this.$store
                .dispatch({ type: 'addToy', toy: this.toyToEdit })
                .then((savedToy) => {
                    console.log(savedToy)
                    showSuccessMsg(`Added toy titled: ${savedToy.title}`)
                })
                .catch((err) => {
                    showErrorMsg(`Cannot add toy`)
                })
            this.toyToEdit = toyService.getEmptyToy()
        },

        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
        },
        filter(filterBy) {
            this.$store.commit({ type: 'setFilter', filterBy: filterBy })
        },
    }
}
</script>
<template >
    <div>
        <router-link to="/edit/">Add Toy</router-link>
        <toy-filter  @filter="filter"/>
        <toy-list :toys="toys" @delete="removeToy" />
    </div>
</template>