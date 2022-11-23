<template lang="">
    <header class=" full">   
          <!-- <h1> Mister Toy </h1> -->
        
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo "
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="1"> <router-link to="/toy/">Toy Shop</router-link></el-menu-item>
    <el-sub-menu index="2">
      <template #title>Options</template>
      <el-menu-item index="2-1"><router-link to="/edit/">Add New Toy</router-link></el-menu-item>
      <el-menu-item index="2-2"> <router-link to="/dashboard/">Dashboard</router-link></el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4"><router-link to="/shops/">Shops Locations</router-link></el-menu-item>
  </el-menu>


    </header>
</template>
<script>

export default {
    data() {
        return {}
    },
    methods: {},
    computed: {},
    components: {

    },
}
</script>
