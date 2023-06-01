<template>
    <div class="flex">
        <label for="selectColumn">컬럼:</label>
        <select class="select w-full max-w-xs" id="selectColumn" v-model="column" @change="handleDirection">
            <option value="postId">기본</option>
            <option value="title">제목</option>
            <option value="views">조회수</option>
        </select>
        <label for="selectDir">방식:</label>
        <select class="select w-full max-w-xs" id="selectDir" v-model="sortDirection" @change="handleDirection">
            <option value="">내림차순</option>
            <option value="asc">오름차순</option>
        </select>
        <div class="form-control">
            <div class="input-group">
                <select class="select" v-model="keywordType">
                    <option value="title">제목</option>
                    <option value="contentText">내용</option>
                </select>
                <input type="text" placeholder="Search…" class="input input-bordered w-96" v-model="keyword"/>
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

<!--페이지 처리 아직 페이지 이동은 안넣음 나중에 @click 이벤트에 axios 넣을 예정-->
    <div v-if="posts.length>0" class="flex justify-center mt-10">
        <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <!-- 이전 페이지 존재 -->
                <a v-if="paging.startPage == paging.pageNumber && !paging.existPrePageGroup"
                   class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <a v-if="!(paging.startPage == paging.pageNumber && !paging.existPrePageGroup)"
                   class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <!-- 페이지 번호 -->
                <span v-for="page in pageNumbers">
                        <a v-if="paging.pageNumber == page" class="relative z-10 inline-flex items-center bg-[#f9d72f] px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                            {{ page }}
                        </a>
                        <a v-if="paging.pageNumber != page" @click="" aria-current="page" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            {{ page }}
                        </a>
                </span>
                <!-- 다음 페이지 존재 -->
                <a v-if="paging.endPage == paging.pageNumber && !paging.existNextPageGroup"
                   class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
                <a v-if="!(paging.endPage == paging.pageNumber && !paging.existNextPageGroup)"
                   class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                    </svg>
                </a>
            </nav>
        </div>
    </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {deleteList, getList} from "../api/post.js";

let response
const posts = ref([]);
const checkList = ref([]);
const deleteOne = [];
const checkBoolean = ref();
const column = ref("postId");
const sortDirection = ref("");
const keywordType = ref("title");
const keyword = ref("");
let requestData = ref({
    column: column,
    sortDirection: sortDirection,
    keywordType: keywordType,
    keyword: keyword
})
//페이지 관련 -> 컴포넌트로 빼보기
const paging = ref([]);
const pageNumbers = ref([]);

onBeforeMount(async () => {
    response = await getList(requestData.value)
    posts.value = response.data.postList
    paging.value = response.data.pagingUtil
    console.log(response.data.pagingUtil)
    for (let i = paging.value.startPage; i <= paging.value.endPage; i++) {
        pageNumbers.value.push(i)
    }
})

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
}

</script>

<style scoped>

</style>
