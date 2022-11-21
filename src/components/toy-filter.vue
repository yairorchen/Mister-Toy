<template lang="">
    <section class="filter">
        <input @input="filter()" v-model="filterBy.name" title="filter key words" type="text" placeholder="filter"/>
        <select @change="filter()" name="labels" id="labels" v-model="filterBy.label">
                <option value="All">All</option>
                <option value="On wheels">On wheels</option>
                <option value="Box game">Box game</option>
                <option value="Art">Art</option>
                <option value="Baby">Baby</option>
                <option value="Doll">Doll</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                </select>

        <button class="btn" @click="setFilter(true)">In stock</button>
        <button class="btn" @click="setFilter(false)">Out of stock </button>
        <button class="btn" @click="setFilter('All')">All </button>

    </section>
</template>
<script>
export default {
    data() {
        return {
            filterBy: {
                name: '',
                inStock: 'All',
                label:'All',
            },
        }
    },
    computed: {
        
    },
    methods: {
        setFilter(status = true) {
            this.filterBy.inStock = status
            this.$emit('filter', { ...this.filterBy })
        },
        filter() {
            this.$emit('filter', { ...this.filterBy })
            console.log(this.filterBy)
        },
    },
}
</script>
<style lang="">
    
</style>