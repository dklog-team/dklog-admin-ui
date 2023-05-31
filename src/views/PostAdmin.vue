<template>
    <div class="flex">

        <button v-if="checkList != ''" class="btn btn-active btn-ghost" @click="deleteListFunc">삭제</button>
    </div>
    <div class="overflow-x-auto w-full">
        <table class="table w-full">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" class="checkbox" id="checkbox" @change="handleAllCheckBox" v-model="checkBoolean"/>
                </th>
                <th>이름</th>
                <th>게시글</th>
                <th>조회수</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in posts">
                <th>
                    <input type="checkbox" class="checkbox" v-model="checkList" :value="i.postId"/>
                </th>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img :src="i.picture">
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">{{ i.username }}</div>
                            <div class="text-sm opacity-50">게시일 {{i.createdDate}}</div>
                            <div class="text-sm opacity-50" v-if="i.modifiedDate">수정일 {{i.createdDate}}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {{i.title}}
                    <div class="flex">
                        <div class="text-sm opacity-50 overflow-hidden w-96">{{i.previewContent}}</div>
                        <span v-if="i.previewContent" class="text-sm opacity-50">...</span>
                    </div>
                </td>
                <td>{{ i.views }}</td>
                <th>
                    <button class="btn btn-ghost btn-xs" @click="deleteOneFunc(i.postId)">삭제</button>
                </th>
            </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import {onBeforeMount, ref} from "vue";
import {getList, deleteList} from "../api/post.js";
let response
onBeforeMount(async () => {
    response = await getList()
    posts.value = response.data.postList
    console.log(response.data.postList[0].postId)
})

const posts = ref([]);
const checkList = ref([]);
const deleteOne = [];
const checkBoolean = ref();

const deleteListFunc = async () => {
    const postIds = checkList.value
    const requestData = {
        postIds
    }
    await deleteList(requestData)
    response = await getList()
    posts.value = response.data.postList
    alert("삭제가 완료되었습니다~")
}

const deleteOneFunc = async (postId) => {
    deleteOne[0] = postId
    const postIds = deleteOne
    const requestData = {
        postIds
    }
    await deleteList(requestData)
    response = await getList()
    posts.value = response.data.postList
    alert("삭제가 완료되었습니다~")
}

const handleAllCheckBox = () =>{
    checkList.value = []
    if(checkBoolean.value){
        for(let i of posts.value){
            checkList.value.push(i.postId)
        }
    }else{
        checkList.value = []
    }
}
</script>

<style scoped>

</style>
