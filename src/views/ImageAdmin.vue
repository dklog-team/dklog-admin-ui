<template>
    <div class="px-16 mt-16 flex justify-between">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">이미지 관리</h1>
    </div>
    <div class="px-16 mt-6 h-full">
        <div v-if="images.length>0" class="w-1/3 h-1/4 max-h-80 inline-flex place-content-center border border-gray-200 rounded-lg shadow"
             v-for="image in images">
            <img class="inline w-full object-contain" :src="image">
        </div>
        <infinite-loading @infinite="load" v-text=""></infinite-loading>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {getList} from "../api/image.js";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const images = ref([])
let pageNum = 0
let response
const load = async (state) => {
    response = await getList(pageNum)
    if (response.data.length < 1) {
        console.log(pageNum)
    } else {
        images.value.push(...response.data)
        pageNum++
    }

}
</script>

<style scoped>

</style>
