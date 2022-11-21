<template lang="">
    <div>
        <h3>{{toy.name}}</h3>
        <h3>{{toy.price}} $</h3>
        
    </div>
</template>
<script>
export default {
    name: 'item preview',
    props: { toy: Object }
}
</script>
<style lang="">
    
</style>