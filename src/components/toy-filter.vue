<template lang="">
    <section class="filter">
        <input @input="filter()" v-model="filterBy.name" title="filter key words" type="text" placeholder="filter"/>

          <el-select  @change="filter()" v-model="filterBy.label" class="m-2" placeholder="Select" size="small">
    <el-option
      v-for="item in filterOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"/>
    </el-select>

    <div class="filter-btn">
    <el-radio-group v-model="filterBy.inStock" size="small">
      <el-radio-button @click="setFilter('All')" label="All" />
      <el-radio-button @click="setFilter('1')" label="In stock" />
      <el-radio-button @click="setFilter('0')" label="Out of stock" />
    </el-radio-group>
  </div>

    
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
            filterOptions: [
                {
                    value: 'All',
                    label: 'All',
                },
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
                },],
        }
    },
    computed: {
        
    },
    methods: {
        setFilter(status = true) {
            if(status==='1')
            this.filterBy.inStock = true
            else if (status === '0')
            this.filterBy.inStock = false
            else this.filterBy.inStock = 'All'
            this.$emit('filter', { ...this.filterBy })
        },
        // setFilter(status = true) {
        //     this.filterBy.inStock = status
        //     this.$emit('filter', { ...this.filterBy })
        // },
        filter() {
            this.$emit('filter', { ...this.filterBy })
            console.log(this.filterBy)
        },
    },
}
</script>
<style lang="">
    
</style>