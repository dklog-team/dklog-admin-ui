<template>
  <div class="flex w-84 justify-between mx-auto my-1">
    <div>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">학생 관리 페이지</h2>
      <p class="mt-2 text-sm leading-8 text-gray-600">dktechin 교육생 명단 관리</p>
    </div>
    <div class="flex justify-end">
      <button class="btn btn-ghost w-16 px-1" v-show="checkIdList.length !== 0" @click="handleDeleteList">삭제</button>
      <button class="btn btn-secondary w-16 px-1" @click="clickRegisterStudent">등록</button>
    </div>
  </div>
  <div class="flex w-full justify-between">
    <div class="flex w-full">
      <div class="flex w-full h-auto justify-items-center">
        <label for="selectSort" class="label-text">정렬 방식:</label>
        <select id="selectSort" class="select w-full max-w-xs" v-model="selectedSort" @change="handleSort">
          <option :value="{ 'sort' : 'desc', 'column': 'studentId'}">최신순</option>
          <option :value="{ 'sort': 'asc', 'column': 'studentId'}">등록순</option>
          <hr>
          <option :value="{ 'sort': 'asc', 'column': 'name'}">A-Z</option>
          <option :value="{ 'sort': 'desc', 'column': 'name'}">Z-A</option>
        </select>
      </div>
      <div class="flex w-full h-auto justify-items-center">
        <label for="selectSemester" class="label-text">기수:</label>
        <select id="selectSemester" v-model="selectedSemester" @change="handleSemesterSelect"
                class="select w-full max-w-xs">
          <option value="">All</option>
          <option v-for="number in 10" :value="number">{{ number }}</option>
        </select>
      </div>
      <div class="input-group">
        <input type="text" placeholder="학생 이름으로 검색" class="input focus:outline-none" v-model="data.name"
               @keyup.enter="printStudentList"/>
        <button class="btn btn-circle btn-ghost" @click="printStudentList">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        <button class="btn btn-ghost" @click="clear">초기화</button>
      </div>
    </div>
  </div>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" v-model="selectedAll" @change="handleAllCheck"/>
          </label>
        </th>
        <th>등록 번호</th>
        <th>이름</th>
        <th>전화 번호</th>
        <th>기수</th>
        <th>가입 현황</th>
        <th>actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in studentsData" :key="item.studentId">
        <th>
          <label>
            <input type="checkbox" class="checkbox" :value="item.studentId" v-model="checkIdList"/>
          </label>
        </th>
        <td>{{ item.studentId }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phoneNumber }}</td>
        <td>{{ item.semester }}</td>
        <td>{{ item.authStatus }}</td>
        <td>
          <button id="editStudentBtn" class="btn btn-circle btn-ghost" @click="openModal(index)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
            </svg>
          </button>
          <update-modal :student-info="studentInfo" :show-modal="showModal" @handle-update=handleUpdate
                        @close-modal="closeModal"></update-modal>
          <button id="deleteOneStudentBtn" class="btn btn-circle btn-ghost"
                  @click="handleDeleteOne(item.studentId, item.name)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <Pagination v-if="load" :pagingUtil="pagination" @changePage="changePage"></Pagination>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {deleteStudent, getStudents, updateStudent} from "../api/student.js";
import router from "../routes/index.js";
import UpdateModal from "../components/student/updateModal.vue";
import Pagination from "../components/common/Pagination.vue";
import {getList} from "../api/post.js";

const studentsData = ref([]);
const pagination = ref({});
const selectedSort = ref({
  sort: 'desc',
  column: 'studentId'
});
const selectedSemester = ref('');
const studentInfo = ref({
  studentId: '',
  name: '',
  phoneNumber: '',
  semester: '',
  authStatus: ''
})
const selectedAll = ref(false);
const checkIdList = ref([]);
const showModal = ref(false);
const data = {
  name: '',
  semester: '',
  column: '',
  sortDirection: '',
  page: 1
}
const load = ref(false);

const printStudentList = async () => {
  const response = await getStudents(data);
  studentsData.value = response.data.studentList;
  pagination.value = response.data.pagingUtil;
  load.value = true;
}

onMounted(()=>{
  console.log('mounted!')
  printStudentList();
})

const handleSemesterSelect = () => {
  if (selectedSemester.value !== '') {
    data.semester = selectedSemester.value;
  } else {
    data.semester = '';
  }

  printStudentList();
};

const handleSort = () => {
  data.sortDirection = selectedSort.value.sort;
  data.column = selectedSort.value.column;

  printStudentList();
}

const openModal = (index) => {
  studentInfo.value.studentId = studentsData.value[index].studentId
  studentInfo.value.name = studentsData.value[index].name
  studentInfo.value.phoneNumber = studentsData.value[index].phoneNumber
  studentInfo.value.semester = studentsData.value[index].semester
  studentInfo.value.authStatus = studentsData.value[index].authStatus
  showModal.value = true;
}

const handleUpdate = async () => {
  let answer = confirm('수정하시겠습니까?')
  if (answer) {
    await updateStudent(studentInfo.value)
    closeModal()
    await printStudentList()
  }
}

const closeModal = () => {
  showModal.value = false;
}

const handleAllCheck = () => {
  if (selectedAll.value) {
    for (let i of studentsData.value) {
      checkIdList.value.push(i.studentId);
    }
  } else {
    checkIdList.value = [];
  }
};

const handleDeleteList = async () => {
  let answer = confirm(`${checkIdList.value.length}명의 학생을 삭제하시겠습니까?`)
  if (answer) {
    const data = {
      studentIds: checkIdList.value
    }
    await deleteStudent(data);
    alert('삭제가 완료되었습니다.');
    await printStudentList();
    checkIdList.value = [];
  }
}

const handleDeleteOne = async (selectId, selectName) => {
  let answer = confirm(`${selectName}님을 삭제하시겠습니까?`);
  if (answer) {
    const data = {
      studentIds: [selectId]
    }
    await deleteStudent(data);
    alert('삭제가 완료되었습니다.');
    await printStudentList();
    checkIdList.value = [];
  }
}

const clear = () => {
  selectedSort.value = {
    sort: 'desc',
    column: 'studentId'
  }
  selectedSemester.value = '';
  data.name = '';
  data.semester = '';
  data.column = '';
  data.sortDirection = '';

  printStudentList();
};

const changePage = async (page) => {
  data.page = page
  await printStudentList();
}

const clickRegisterStudent = () => {
  router.replace('/new/student');
};
</script>

<style scoped>

</style>