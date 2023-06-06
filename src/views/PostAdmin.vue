<template>
    <div class="flex">
        <label for="selectColumn">컬럼:</label>
        <select class="select w-full max-w-xs" id="selectColumn" v-model="requestData.column" @change="handleDirection">
            <option value="postId">기본</option>
            <option value="title">제목</option>
            <option value="views">조회수</option>
        </select>
        <label for="selectDir">방식:</label>
        <select class="select w-full max-w-xs" id="selectDir" v-model="requestData.sortDirection" @change="handleDirection">
            <option value="">내림차순</option>
            <option value="asc">오름차순</option>
        </select>
        <div class="form-control">
            <div class="input-group">
                <select class="select" v-model="requestData.keywordType">
                    <option value="title">제목</option>
                    <option value="contentText">내용</option>
                </select>
                <input type="text" placeholder="Search…" class="input input-bordered w-96" v-model="requestData.keyword"/>
                <button class="btn btn-square" @click="handleDirection">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
            </div>
        </div>
        <button v-if="checkList != ''" class="btn btn-active btn-ghost" @click="deleteListFunc">삭제</button>
    </div>
    <div class="overflow-x-auto w-full">
        <table class="table w-full">
            <thead>
            <tr>
                <th>
                    <input type="checkbox" class="checkbox" id="checkbox" @change="handleAllCheckBox"
                           v-model="checkBoolean"/>
                </th>
                <th>이름</th>
                <th>게시글</th>
                <th>조회수</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i,index) in posts">
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
                            <div class="text-sm opacity-50">게시일 {{ i.createdDate }}</div>
                            <div class="text-sm opacity-50" v-if="i.modifiedDate">수정일 {{ i.createdDate }}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <label :for="i.postId" class="cursor-pointer">{{ i.title }}</label>
                    <input type="checkbox" :id="i.postId" class="modal-toggle"/>
                    <div class="modal w-full h-full">
                        <div class="modal-box w-11/12 max-w-5xl h-11/12 max-h-5xl">
                            <h1 class="text-4xl font-semibold mb-6">{{ i.title }}</h1>
                            <div class="text-gray-500 flex items-center">
                                <div class="flex items-center w-4/5">
                                    <span>{{ i.createdDate }}</span>
                                    <span class="ml-1 hidden md:inline-block">작성</span>
                                    <span class="mx-4 hidden md:inline-block">|</span>
                                    <span v-if="i.modifiedDate"
                                          class="hidden md:inline-block"> {{ i.modifiedDate }} 수정</span>
                                    <span v-if="i.modifiedDate" class="hidden md:inline-block mx-4">|</span>
                                    <span class="hidden md:inline-block mr-1">조회수</span>
                                    <span class="hidden md:inline-block">{{ i.views }}</span>
                                    <span class="mx-4">|</span>
                                    <div class="avatar mr-2">
                                        <div class="w-6 rounded-full ring-2 ring-gray-300">
                                            <img :src="i.picture">
                                        </div>
                                    </div>
                                    <span>{{ i.username }}</span>
                                </div>
                            </div>
                            <hr class="my-10"/>
                            <!-- content main -->
                            <section class="flex justify-center">
                                <div class="prose min-w-full prose-pre:bg-[#262626] prose-pre:text-gray-300 prose-a:underline-offset-2 prose-a:decoration-yellow-400 prose-mark:text-yellow-400"
                                     v-html="i.contentHtml"></div>
                            </section>
                            <div class="flex">
                                <div class="modal-action">
                                    <label :for="i.postId" class="btn btn-active btn-ghost"
                                           @click="deleteOneFunc(i.postId)">삭제</label>
                                    <label :for="i.postId" class="btn">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="text-sm opacity-50 overflow-hidden w-96">{{ i.previewContent }}</div>
                        <span v-if="i.previewContent" class="text-sm opacity-50">...</span>
                    </div>
                </td>
                <td>{{ i.views }}</td>
                <th>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-6 h-6 cursor-pointer" @click="deleteOneFunc(i.postId)">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                </th>
            </tr>
            </tbody>
        </table>
    </div>
    <Pagination v-if="load" :pagingUtil="paging" @changePage="changePage"></Pagination>
</template>

<script setup>
import {ref} from "vue";
import {deleteList, getList} from "../api/post.js";
import Pagination from "../components/common/Pagination.vue";

let response
const posts = ref([]);
const checkList = ref([]);
const checkBoolean = ref();
let requestData = ref({
    column: "postId",
    sortDirection: "",
    keywordType: "title",
    keyword: "",
    page: 1
})
//페이지 관련 -> 컴포넌트로 빼보기
const paging = ref({});
const load = ref(false)

const init = async () => {
    response = await getList(requestData.value)
    posts.value = response.data.postList
    paging.value = response.data.pagingUtil
    console.log(response.data.pagingUtil)
    load.value = true
}
init()

const deleteListFunc = async () => {
    const postIds = checkList.value
    const id = {
        postIds
    }
    await deleteList(id)
    console.log(requestData.value)
    response = await getList(requestData.value)
    posts.value = response.data.postList
    alert("삭제가 완료되었습니다~")
}

const deleteOneFunc = async (postId) => {
    const deleteOne = []
    deleteOne[0] = postId
    const postIds = deleteOne
    const id = {
        postIds
    }
    await deleteList(id)
    response = await getList(requestData.value)
    posts.value = response.data.postList
    alert("삭제가 완료되었습니다~")
}

const handleAllCheckBox = () => {
    checkList.value = []
    if (checkBoolean.value) {
        for (let i of posts.value) {
            checkList.value.push(i.postId)
        }
    }
}

const handleDirection = async () => {
    response = await getList(requestData.value)
    posts.value = response.data.postList
    paging.value = response.data.pagingUtil
}

const changePage = async (page) => {
    requestData.value.page = page
    response = await getList(requestData.value)
    posts.value = response.data.postList
    paging.value = response.data.pagingUtil
}
</script>

<style scoped>

</style>
