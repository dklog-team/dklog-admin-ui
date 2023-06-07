<template>
    <div class="px-16 mt-16 flex justify-between">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">게시글 관리</h1>
        <button class="btn opacity-0 cursor-default">zzz</button>
        <button v-if="checkList != ''" class="btn btn-ghost bg-gray-100" @click="deleteListFunc">삭제</button>
    </div>
    <div class="px-16 mt-6 flex justify-between">
        <div class="flex items-center gap-x-4">
            <input v-model="requestData.startDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
            <span class="text-xl">~</span>
            <input v-model="requestData.endDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
            <button class="btn btn-secondary" @click="clickDateRangeBtn">적용</button>
        </div>
        <div class="flex">
            <div class="input-group w-fit border-2 rounded-xl mr-4">
                <select class="select" v-model="requestData.keywordType">
                    <option value="title">제목</option>
                    <option value="contentText">내용</option>
                </select>
                <input type="text" placeholder="검색어를 입력하세요" class="input focus:outline-none" v-model="requestData.keyword"
                       @keyup.enter="handleDirection"/>
                <button class="btn btn-circle btn-ghost" @click="handleDirection">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </button>
            </div>
            <button class="btn btn-ghost bg-gray-100" @click="reset">초기화</button>
        </div>
    </div>
    <div class="px-16 mt-6 overflow-x-auto w-full">
        <table class="table w-full">
            <thead>
            <tr class="border-b-2">
                <th class="bg-base-100">
                    <input type="checkbox" class="checkbox" id="checkbox" @change="handleAllCheckBox"
                           v-model="checkBoolean"/>
                </th>
                <th class="bg-base-100">
                    <button v-if="requestData.column !== 'member.username'" @click="handleSort('member.username')" class="flex">이름
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button v-if="requestData.column === 'member.username'" class="text-primary flex" @click="handleSort('member.username')">
                        이름
                        <svg v-if="requestData.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <svg v-if="requestData.sortDirection === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </th>
                <th class="bg-base-100">
                    <button v-if="requestData.column !== 'title'" @click="handleSort('title')" class="flex">제목
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button v-if="requestData.column === 'title'" class="text-primary flex" @click="handleSort('title')">
                        제목
                        <svg v-if="requestData.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <svg v-if="requestData.sortDirection === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </th>
                <th class="bg-base-100">
                    <button v-if="requestData.column !== 'views'" @click="handleSort('views')" class="flex">조회수
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button v-if="requestData.column === 'views'" class="text-primary flex" @click="handleSort('views')">
                        조회수
                        <svg v-if="requestData.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <svg v-if="requestData.sortDirection === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </th>
                <th class="bg-base-100">
                    <button v-if="requestData.column !== 'createdDate'" @click="handleSort('createdDate')" class="flex">작성일
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <button v-if="requestData.column === 'createdDate'" class="text-primary flex" @click="handleSort('createdDate')">
                        작성일
                        <svg v-if="requestData.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <svg v-if="requestData.sortDirection === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                </th>
                <th class="bg-base-100"></th>
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
                        </div>
                    </div>
                </td>
                <td>
                    <label :for="i.postId" class="cursor-pointer">{{ i.title }}</label>
                    <input type="checkbox" :id="i.postId" class="modal-toggle"/>
                    <label class="modal w-full h-full" :for="i.postId">
                        <label class="modal-box relative w-10/12 max-w-full">
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
                                <div class="prose min-w-full prose-pre:bg-[#262626] prose-pre:text-gray-300 prose-a:underline-offset-2 prose-a:decoration-yellow-400 prose-mark:text-yellow-400 whitespace-normal"
                                     v-html="i.contentHtml"></div>
                            </section>
                            <div class="flex">
                                <div class="modal-action">
                                    <label :for="i.postId" class="btn btn-active btn-ghost"
                                           @click="deleteOneFunc(i.postId, i.username)">삭제</label>
                                    <label :for="i.postId" class="btn">돌아가기</label>
                                </div>
                            </div>
                        </label>
                    </label>
                    <div class="flex">
                        <div class="text-sm opacity-50 overflow-hidden w-96">{{ i.previewContent }}</div>
                        <span v-if="i.previewContent" class="text-sm opacity-50">...</span>
                    </div>
                </td>
                <td>{{ i.views }}</td>
                <td>{{ i.preCreatedDate }}</td>
                <th>
                    <button id="deleteOneStudentBtn" class="btn btn-circle btn-ghost"
                            @click="deleteOneFunc(i.postId, i.username)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </button>
                </th>

            </tr>
            </tbody>
        </table>
    </div>
    <Pagination class="mb-6" v-if="load" :pagingUtil="paging" @changePage="changePage"></Pagination>
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
    column: "createdDate",
    sortDirection: "desc",
    keywordType: "title",
    keyword: "",
    page: 1,
    startDate: "",
    endDate:""
})
//페이지 관련 -> 컴포넌트로 빼보기
const paging = ref({});
const load = ref(false)

const getPostList = async () => {
    response = await getList(requestData.value)
    posts.value = response.data.postList
    paging.value = response.data.pagingUtil
    if(posts.value.length == 0){
        load.value = false
    }
}

const init = async () => {
    await getPostList()
    load.value = true
}
init()

const deleteListFunc = async () => {
    let answer = confirm(`${checkList.value.length}명의 학생을 삭제하시겠습니까?`)
    if(answer){
        const postIds = checkList.value
        const id = {
            postIds
        }
        await deleteList(id)
        await getPostList()
        alert("삭제가 완료되었습니다~")
    }
}

const deleteOneFunc = async (postId, username) => {
    let answer = confirm(`${username}의 게시글을 삭제하시겠습니까?`)
    if(answer){
        const deleteOne = []
        deleteOne[0] = postId
        const postIds = deleteOne
        const id = {
            postIds
        }
        await deleteList(id)
        await getPostList()
        alert("삭제가 완료되었습니다~")
    }
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
    requestData.value.page = 1
    await getPostList()
}

const changePage = async (page) => {
    requestData.value.page = page
    checkBoolean.value = false
    await getPostList()
}

const handleSort = async (column) => {
    if (requestData.value.column === column) {
        if (requestData.value.sortDirection === 'desc') {
            requestData.value.sortDirection = 'asc';
        } else {
            requestData.value.sortDirection = 'desc';
        }
    } else {
        requestData.value.column = column;
        requestData.value.sortDirection = 'desc';
    }
    await getPostList()
}

const clickDateRangeBtn = async () => {
    if(requestData.value.startDate<=requestData.value.endDate){
        requestData.value.page=1
        await getPostList()
    }else{
        alert("범위를 다시 한번 확인해주세요")
    }
}

const reset = async () => {
    requestData.value.startDate = ""
    requestData.value.endDate = ""
    requestData.value.keywordType = "title"
    requestData.value.keyword = ""
    requestData.value.column = "createdDate"
    requestData.value.sortDirection = "desc"
    await getPostList()
}
</script>

<style scoped>

</style>
