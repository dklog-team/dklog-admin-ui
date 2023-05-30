<template>
  <main class="flex">
    <SideBar v-if="$route.meta.hide"></SideBar>
    <div class="w-full">
      <Header v-if="$route.meta.hide"></Header>
      <router-view></router-view>
    </div>
  </main>
</template>

<script setup>
import SideBar from "./components/common/SideBar.vue";
import Header from "./components/common/Header.vue";
// import { useRouter } from "vue-router";
//
// const route = useRouter()
// console.log(route.currentRoute.value)
</script>

<style scoped>

</style>
