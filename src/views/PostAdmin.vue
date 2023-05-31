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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
                    <a href="#detail" :href="keyword">{{i.title}}</a>
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
<!--    <a href="#my-modal-2" class="btn">open modal</a>-->
    <!-- Put this part before </body> tag -->
    <div class="modal" id="detail">
        <div class="modal-box">
            <h3 class="font-bold text-lg">{{column}}</h3>
            <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div class="modal-action">
                <a href="#" class="btn">Yay!</a>
            </div>
        </div>
    </div>
</template>


<script setup>
import {onBeforeMount, ref} from "vue";
import {getList, deleteList, getSortList} from "../api/post.js";
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
const column = ref("postId");
const sortDirection = ref("");
const keywordType = ref("title");
const keyword = ref("");
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

const handleDirection = async () => {
    let reqColumn = column.value
    let reqDir = sortDirection.value
    let reqKeywordType = keywordType.value
    let reqKeyword = keyword.value
    const param = {
        reqColumn,
        reqDir
    }
    const keywordParam = {
        reqKeyword,
        reqKeywordType
    };
    response = await getSortList(param, keywordParam)
    posts.value = response.data.postList
}
</script>

<style scoped>

</style>
