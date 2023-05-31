<template>
  <div class="flex w-84 justify-between mx-auto my-1">
    <div>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">학생 관리 페이지</h2>
      <p class="mt-2 text-sm leading-8 text-gray-600">dktechin 교육생 명단 관리</p>
    </div>
    <div class="flex justify-end">
      <button class="btn btn-ghost w-16 px-1">삭제</button>
      <button class="btn btn-secondary w-16 px-1" @click="clickRegisterStudent">등록</button>
    </div>
  </div>
  <div class="flex w-full justify-between">
    <div class="flex w-full">
      <div class="flex w-full h-auto justify-items-center">
        <label for="selectSort">정렬 방식:</label>
        <select id="selectSort" class="select w-full max-w-xs" v-model="selectedSort" @change="handleSort">
          <option :value="{ 'sort' : 'desc', 'column': 'studentId'}">최신순</option>
          <option :value="{ 'sort': 'asc', 'column': 'studentId'}">등록순</option>
          <hr>
          <option :value="{ 'sort': 'asc', 'column': 'name'}">A-Z</option>
          <option :value="{ 'sort': 'desc', 'column': 'name'}">Z-A</option>
        </select>
      </div>
      <div class="flex w-full h-auto justify-items-center">
        <label for="selectSemester">기수:</label>
        <select id="selectSemester" v-model="selectedSemester" @change="handleSemesterSelect"
                class="select w-full max-w-xs">
          <option v-for="number in 10" :value="number">{{ number }}</option>
        </select>
      </div>
      <div class="input-group">
        <input type="text" placeholder="학생 이름으로 검색" class="input focus:outline-none" v-model="data.name"/>
        <button class="btn btn-circle btn-ghost" @click="handleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" v-model="selectedStudent"/>
          </label>
        </th>
        <th>등록 번호</th>
        <th>이름</th>
        <th>전화 번호</th>
        <th>기수</th>
        <th>가입 현황</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in studentsData" :key="item.studentId">
        <th>
          <label>
            <input type="checkbox" class="checkbox" :value="studentsData.studentId"/>
          </label>
        </th>
        <td>{{ item.studentId }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phoneNumber }}</td>
        <td>{{ item.semester }}</td>
        <td>{{ item.authStatus }}</td>
        <td>
          <button class="btn btn-sm btn-ghost">수정</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {ref, onBeforeMount} from "vue";
import {getStudents} from "../api/student.js";
import router from "../routes/index.js";

const studentsData = ref([]);
const pagination = ref([]);
const selectedSort = ref({});
const selectedSemester = ref(null);
const selectedStudent = ref();
const data = {
  name: '',
  semester: '',
  column: '',
  sortDirection: '',
}

onBeforeMount( () => {
  printStudentList();
});

console.log(studentsData);

const handleSemesterSelect = () => {
  data.semester = selectedSemester.value;
  data.column = 'name';
  data.sortDirection = 'asc';

  printStudentList();
};

const handleSort = () => {
  data.sortDirection = selectedSort.value.sort;
  data.column = selectedSort.value.column;

  printStudentList();
}

const handleSearch = () => {
  data.column = '';
  data.sortDirection = '';
  console.log(data);

  printStudentList();
}

const printStudentList = async () => {
  const response = await getStudents(data);
  studentsData.value = response.data.studentList;
  pagination.value = response.data.pagingUtil;
}

const clickRegisterStudent = () => {
  router.push('/new/student');
};
</script>

<style scoped>

</style>