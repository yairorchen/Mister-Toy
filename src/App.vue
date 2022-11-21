<script>
import mainHeader from './components/header.vue'
export default{
  name:'app',
  components:{ mainHeader},
  data() {
    return {
      
    }
  },
}
</script>
<template>
  <main-header/>
  <router-view></router-view>
</template>