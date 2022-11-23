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
  <div class="main-layout"> 
  <main-header/>
  <router-view></router-view>
  </div>
</template>