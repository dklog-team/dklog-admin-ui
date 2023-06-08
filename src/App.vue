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

if (import.meta.env.PROD) {
  console.log = () => {}
}
</script>

<style scoped>

</style>
