<template>
    <div class="w-5/12 h-1/2 max-h-80 inline-flex place-content-center border-2 mx-10" v-for="image in images" ><img class="inline object-scale-down" :src="image"></div>

    <infinite-loading @infinite="load"></infinite-loading>
</template>

<script setup>
    import {ref} from "vue";
    import {getList} from "../api/image.js";
    import InfiniteLoading from "v3-infinite-loading";
    import "v3-infinite-loading/lib/style.css";

    const images = ref([])
    let pageNum = 0
    let response
    const load = async state => {
        try {
            response = await getList(pageNum)
            if(response.data.length<3) {
                state.complete()
            }else {
                images.value.push(...response.data)
            }
            pageNum++
        } catch (error) {
            state.error()
        }
    }
</script>

<style scoped>

</style>
