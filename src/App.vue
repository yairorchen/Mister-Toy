<script>
import test from './components/test.vue';
export default{
  name:'app',
  components:{ test},
  data() {
    return {
      
    }
  },
}
</script>
<template>
  <h2>hello world</h2>
  <router-view></router-view>
</template>