<template>
  <div class="px-16 mt-16 flex justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">댓글 관리 페이지</h1>
    </div>
    <div class="flex justify-end">
      <button class="btn btn-ghost w-16 px-1 bg-gray-100 hover:bg-gray-200 mr-4" v-show="commentCheckList.length !== 0"
              @click="deleteList">삭제
      </button>
    </div>
  </div>
  <div class="px-16 mt-6 flex justify-start">
    <div class="flex items-center w-3/12 mr-6">
      <select id="selectSemester" v-model="data.semester" @change="handleSemester"
              class="select select-bordered w-/12 max-w-xs">
        <option value="" disabled>기수</option>
        <option value="">all</option>
        <option v-for="number in 10" :value="number">{{ number }}기</option>
      </select>
    </div>
    <div class="flex items-center gap-x-4">
      <input v-model="startDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
      <span class="text-xl">~</span>
      <input v-model="endDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
      <button class="btn btn-secondary mr-4" @click="handleDate">적용</button>
    </div>
    <div class="flex">
      <select class="select select-bordered w- max-w-xs mr-4" v-model="selectedColumn">
        <option value="" disabled>검색</option>
        <option value="name">댓글 작성자</option>
        <option value="content">댓글 내용</option>
      </select>
      <div class="input-group w-fit border-2 rounded-xl mr-6">
        <input type="text" placeholder="검색" v-model="searchText" class="input focus:outline-none"
               @keyup.enter="handleSearch"/>
        <button class="btn btn-circle btn-ghost" @click="handleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </button>
      </div>
      <button class="btn btn-ghost bg-gray-100 hover:bg-gray-200" @click="clear">초기화</button>
    </div>
  </div>
  <!--  <div>-->
  <div class="px-16 mt-6 overflow-x-auto">
    <table class="table w-full">
      <thead>
      <tr class="border-b-2">
        <th class="bg-base-100">
          <label>
            <input type="checkbox" class="checkbox" v-model="selectAllCheckbox" @change="selectAllCheck"/>
          </label>
        </th>
        <th class="bg-base-100 w-10">
          <button v-if="selectedSortDirection.column !== 'member.student.name'" class="flex"
                  @click="handleSortChange('member.student.name')">이름
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
          <button v-if="selectedSortDirection.column === 'member.student.name'" class="text-primary flex"
                  @click="handleSortChange('member.student.name')">이름
            <svg v-if="selectedSortDirection.sort === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-if="selectedSortDirection.sort === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </th>
        <th class="bg-base-100">댓글</th>
        <th class="bg-base-100 w-10">
          <button v-if="selectedSortDirection.column !== 'createdDate'" @click="handleSortChange('createdDate')"
                  class="flex">작성일
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
          <button v-if="selectedSortDirection.column === 'createdDate'" class="text-primary flex"
                  @click="handleSortChange('createdDate')">작성일
            <svg v-if="selectedSortDirection.sort === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-if="selectedSortDirection.sort === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </th>
        <th class="bg-base-100">글 번호</th>
        <th class="bg-base-100">관리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="comment in comments" :key="comment.commentId">
        <th>
          <label>
            <input v-model="commentCheckList" :value="comment.commentId" type="checkbox" class="checkbox"/>
          </label>
        </th>
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img :src="comment.picture"/>
              </div>
            </div>
            <div class="font-bold">{{ comment.studentSemester }}기_{{ comment.studentName }}</div>
            <div class="text-sm opacity-50"></div>
          </div>
        </td>
        <td>
          {{ comment.content }}
          <br/>
        </td>
        <td>{{ comment.createdDate.substring(0, 10) + " " + comment.createdDate.substring(11,) }}<br>
        </td>
        <td>{{ comment.postId }}</td>
        <th>
          <label class="btn btn-ghost" @click="deleteOne(comment.commentId)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
          </label>
        </th>
      </tr>
      </tbody>
    </table>
    <div v-if="comments.length === 0">존재하는 댓글이 없습니다.</div>
  </div>
  <Pagination v-if="load && comments.length > 0" :pagingUtil="paging" @changePage="changePage"
              class="mb-6"></Pagination>
</template>

<script setup>
import {ref} from "vue";
import {deleteCommentList, getCommentList} from "../api/comment.js"
import Pagination from "../components/common/Pagination.vue";

const comments = ref('');
const selectedColumn = ref('');
const selectedSortDirection = ref({
  sort: 'desc',
  column: 'createdData',
});
const commentCheckList = ref([]);
const selectAllCheckbox = ref(false);
const searchText = ref('');
const startDate = ref('');
const endDate = ref('');

const data = {
  column: 'createdDate',
  sortDirection: '',
  name: '',
  semester: '',
  content: '',
  page: 1,
};

const paging = ref({});
const load = ref(false)

let response;

const init = async () => {
  response = await getCommentList(data)
  comments.value = response.data.commentList
  paging.value = response.data.pagingUtil
  load.value = true
}
init()

const selectAllCheck = () => {
  if (selectAllCheckbox.value) {
    for (let i of comments.value)
      commentCheckList.value.push(i.commentId);
  } else {
    commentCheckList.value = [];
  }
};

const deleteList = async () => {
  const commentIds = commentCheckList.value;
  const requestData = {commentIds}

  if (confirm(`${commentCheckList.value.length}개의 댓글을 삭제하시겠습니까?`)) {
    await deleteCommentList(requestData);
    commentCheckList.value = [];

    response = await getCommentList(data);
    comments.value = response.data.commentList;

    alert("삭제가 완료되었습니다");
  }
};

const deleteOne = async (commentId) => {
  const requestData = {commentIds: [commentId]}

  if (confirm("삭제하시겠습니까?")) {
    await deleteCommentList(requestData);

    response = await getCommentList(data);
    comments.value = response.data.commentList;

    alert("삭제가 완료되었습니다");
  }
};

const handleSortChange = async (column) => {
  if (selectedSortDirection.value.column === column) {
    if (selectedSortDirection.value.sort === 'desc') {
      selectedSortDirection.value.sort = 'asc';
    } else {
      selectedSortDirection.value.sort = 'desc';
    }
  } else {
    selectedSortDirection.value.column = column
    selectedSortDirection.value.sort = 'desc'
  }
  data.column = column;
  data.sortDirection = selectedSortDirection.value.sort;
  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const handleSemester = async () => {
  console.log(data.semester)
  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const handleSearch = async () => {
  if (selectedColumn.value === 'name')
    data.name = searchText.value;
  else
    data.content = searchText.value;

  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const clear = async () => {
  selectedSortDirection.value = {
    sort: 'desc',
    column: 'createdDate',
  }
  data.name = '';
  data.semester = '';
  data.content = '';
  data.column = 'createdDate';
  data.sortDirection = '';

  console.log("data : " + data);

  response = await getCommentList(data);
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil;
}

const handleDate = async () => {
  const request = {
    startDate: startDate.value,
    endDate: endDate.value,
  }
  response = await getCommentList(request)
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil;
}

const changePage = async (page) => {
  const request = {
    startDate: startDate.value,
    endDate: endDate.value,
    page: page,
  }
  response = await getCommentList(request);
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil;
}
</script>

<style scoped>

</style>