<template>
  <div>
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">댓글 관리 페이지</h2>
    <p class="mt-2 text-sm leading-8 text-gray-600">dklog 댓글 관리</p>
  </div>
  <div>
    <label for="selectedSortDirection">정렬: </label>
    <select class="select w-20 max-w-xs" v-model="selectedSortDirection" @change="handleSortChange">
      <option :value="{'sort':'desc','column':'createdDate'}">최신순</option>
      <option :value="{'sort':'asc','column':'createdDate'}">오래된 순</option>
      <hr>
      <option :value="{ 'sort': 'asc', 'column': 'member.student.name'}">asc</option>
      <option :value="{ 'sort': 'desc', 'column': 'member.student.name'}">desc</option>
    </select>

    <label for="selectedSemester"> 기수 : </label>
    <select class="select w-20 max-w-xs" v-model="selectedSemester" @change="handleSemester">
      <option value=" ">all</option>
      <option v-for="number in 3" :value="number">{{ number }}기</option>
    </select>

    <select class="select w-20 max-w-xs" v-model="selectedColumn">
      <option value="name">댓글 작성자</option>
      <option value="content">댓글 내용</option>
    </select>
    <input type="text" placeholder="검색" v-model="searchText" class="input w-full max-w-xs"/>
    <button @click="handleSearch">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    </button>
    <button @click="clear">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
    </button>
  </div>

  <div>
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" v-model="selectAllCheckbox" @change="selectAllCheck"/>
            </label>
          </th>
          <th>이름</th>
          <th>댓글</th>
          <th>날짜</th>
          <th>글 번호</th>
          <th>
            <button v-if="commentCheckList.length >0" @click="deleteList">삭제</button>
          </th>
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
              <div>
                <div class="font-bold">{{ comment.studentSemester }}기_{{ comment.studentName }}</div>
                <div class="text-sm opacity-50"></div>
              </div>
            </div>
          </td>
          <td>
            {{ comment.content }}
            <br/>
          </td>
          <td>작성일 : {{ comment.createdDate }}<br>
            <div v-if="comment.modifiedDate" class="text-gray-500">수정일 : {{ comment.modifiedDate }}</div>
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

        <tfoot>
        <tr v-if="comments.length === 0">존재하는 댓글이 없습니다.</tr>
        <tr>
          <th></th>
          <th>이름</th>
          <th>댓글</th>
          <th>날짜</th>
          <th>글 번호</th>
          <th></th>
        </tr>
        </tfoot>

      </table>
      <Pagination v-if="load && comments.length > 0" :pagingUtil="paging" @changePage="changePage"></Pagination>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref} from "vue";
import {deleteCommentList, getCommentList} from "../api/comment.js"
import Pagination from "../components/common/Pagination.vue";

const comments = ref('');
const selectedColumn = ref('');
const selectedSemester = ref('');
const selectedSortDirection = ref({
  sort: 'desc',
  column: 'createdData',
});
const commentCheckList = ref([]);
const selectAllCheckbox = ref(false);
const searchText = ref('');

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

onBeforeMount(async () => {
  response = await getCommentList({});
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil
  load.value = true
});

const selectAllCheck = () => {
  if (selectAllCheckbox.value) {
    for(let i of comments.value)
      commentCheckList.value.push(i.commentId);
  } else {
    commentCheckList.value = [];
  }
};

const deleteList = async () => {
  const commentIds = commentCheckList.value;
  const requestData = {commentIds}

  console.log(requestData.value);
  await deleteCommentList(requestData);
  commentCheckList.value = [];

  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const deleteOne = async (commentId) => {
  const requestData = {commentIds: [commentId]}

  await deleteCommentList(requestData);

  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const handleSortChange = async () => {
  data.sortDirection = selectedSortDirection.value.sort;
  data.column = selectedSortDirection.value.column;

  response = await getCommentList(data);
  comments.value = response.data.commentList;
};

const handleSemester = async () => {
  data.semester = selectedSemester.value;
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
    sort : 'desc',
    column: 'createdDate',
  }
  selectedSemester.value = '';
  data.name = '';
  data.semester= '';
  data.content = '';
  data.column = 'createdDate';
  data.sortDirection = '';

  console.log("data : " +data);

  response = await getCommentList(data);
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil;
}

const changePage = async (page) => {
  data.page = page
  response = await getCommentList(data);
  comments.value = response.data.commentList;
  paging.value = response.data.pagingUtil;
}
</script>

<style scoped>

</style>