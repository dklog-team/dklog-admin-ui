<template>
  <div class="px-16 mt-16 flex justify-between">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">학생 관리</h1>
    </div>
    <div class="flex justify-end">
      <button class="btn btn-ghost w-16 px-1 bg-gray-100 hover:bg-gray-200 mr-4" v-show="checkIdList.length !== 0"
              @click="handleDeleteList">삭제
      </button>
      <button class="btn btn-secondary w-16 px-1" @click="clickRegisterStudent">등록</button>
    </div>
  </div>
  <div class="px-16 mt-6 flex justify-start">
    <div class="flex items-center w-2/12 mr-4">
      <select id="selectSemester" v-model="selectedSemester" @change="handleSemesterSelect"
              class="select select-bordered w-full max-w-xs">
        <option value="" disabled>기수</option>
        <option value="">전체</option>
        <option v-for="number in 10" :value="number">{{ number }}</option>
      </select>
    </div>
    <div class="flex">
      <div class="input-group w-fit border-2 rounded-xl mr-4">
        <input type="text" placeholder="학생 이름으로 검색" class="input focus:outline-none" v-model="data.name"
               @keyup.enter="handleSearch"/>
        <button class="btn btn-circle btn-ghost" @click="handleSearch">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
      <button class="btn btn-ghost bg-gray-100 hover:bg-gray-200" @click="clear">초기화</button>
    </div>
  </div>
  <div class="px-16 mt-6 overflow-x-auto">
    <table class="table w-full">
      <thead>
      <tr class="border-b-2">
        <th class="bg-base-100">
          <label>
            <input type="checkbox" class="checkbox" v-model="selectedAll" @change="handleAllCheck"/>
          </label>
        </th>
        <th class="bg-base-100 w-10">
          <button v-if="selectedSort.column !== 'studentId'" @click="handleSort('studentId')" class="flex">등록 번호
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
          <button v-if="selectedSort.column === 'studentId'" class="text-primary flex" @click="handleSort('studentId')">
            등록 번호
            <svg v-if="selectedSort.sort === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-if="selectedSort.sort === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </th>
        <th class="bg-base-100">
          <button v-if="selectedSort.column !== 'name'" @click="handleSort('name')" class="flex">이름
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
          <button v-if="selectedSort.column === 'name'" class="text-primary flex" @click="handleSort('name')">이름
            <svg v-if="selectedSort.sort === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-if="selectedSort.sort === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </th>
        <th class="bg-base-100">전화 번호</th>
        <th class="bg-base-100">기수</th>
        <th class="bg-base-100">
          <button v-if="selectedSort.column !== 'authStatus'" @click="handleSort('authStatus')" class="flex">가입 현황
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-0">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
          <button v-if="selectedSort.column === 'authStatus'" class="text-primary flex" @click="handleSort('authStatus')">가입 현황
            <svg v-if="selectedSort.sort === 'asc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clip-rule="evenodd"/>
            </svg>
            <svg v-if="selectedSort.sort === 'desc'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                 fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </th>
        <th class="bg-base-100">관리</th>
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
        <td>
          <p v-if="item.authStatus === 'N'">{{ item.name }}</p>
          <a href="#member-modal" v-if="item.authStatus === 'Y'" @click="clickStudentName(item.studentId, index)" class="hover:btn-link">
            {{ item.name }}
          </a>
          <div class="modal" id="member-modal">
            <member-modal :show-modal="isShowMemberModal" :member-info="memberData"
                          @close-modal="closeMemberModal"></member-modal>
          </div>
        </td>
        <td>{{ item.phoneNumber }}</td>
        <td>{{ item.semester }}</td>
        <td>
          <div v-if="item.authStatus === 'Y'" class="flex items-center">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p class="ml-2">인증 완료</p>
          </div>
          <div v-if="item.authStatus === 'N'" class="flex items-center">
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"/>
            <p class="ml-2">미인증</p>
          </div>
        </td>
        <td>
          <a href="#update-modal" id="editStudentBtn" class="btn btn-circle btn-ghost" @click="openModal(index)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
            </svg>
          </a>
          <div class="modal" id="update-modal">
            <update-modal :student-info="studentInfo" :show-modal="showUpdateModal" @handle-update=handleUpdate
                          @close-modal="closeModal"></update-modal>
          </div>
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
  <Pagination v-if="load && studentsData.length !== 0" :pagingUtil="pagination" @changePage="changePage" class="mb-6"></Pagination>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {deleteStudent, getStudents, updateStudent} from "../api/student.js";
import router from "../routes/index.js";
import UpdateModal from "../components/student/updateModal.vue";
import Pagination from "../components/common/Pagination.vue";
import MemberModal from "../components/student/memberModal.vue";
import {getMember} from "../api/member.js";

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
const showUpdateModal = ref(false);
const data = {
  name: '',
  semester: '',
  column: '',
  sortDirection: '',
  page: 1
}
const load = ref(false);
const isShowMemberModal = ref(false);
const memberData = ref({
  memberId: '',
  username: '',
  email: '',
  role: '',
  picture: '',
  githubUsername: ''
});

const printStudentList = async () => {
  const response = await getStudents(data);
  studentsData.value = response.data.studentList;
  pagination.value = response.data.pagingUtil;
  load.value = true;
}

onMounted(() => {
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

const handleSort = (column) => {
  if (selectedSort.value.column === column) {
    if (selectedSort.value.sort === 'desc') {
      selectedSort.value.sort = 'asc';
    } else {
      selectedSort.value.sort = 'desc';
    }
  } else {
    selectedSort.value.column = column;
    selectedSort.value.sort = 'desc';
  }
  data.column = column;
  data.sortDirection = selectedSort.value.sort;

  printStudentList();
}

const handleSearch = () => {
  data.page = 1;
  printStudentList();
}

const openModal = (index) => {
  studentInfo.value.studentId = studentsData.value[index].studentId
  studentInfo.value.name = studentsData.value[index].name
  studentInfo.value.phoneNumber = studentsData.value[index].phoneNumber
  studentInfo.value.semester = studentsData.value[index].semester
  studentInfo.value.authStatus = studentsData.value[index].authStatus
  showUpdateModal.value = true;
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
  showUpdateModal.value = false;
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
  router.replace('/student/new');
};

// memberModal 관련
const clickStudentName = async (studentId) => {
  isShowMemberModal.value = true;
  const response = await getMember(studentId);
  memberData.value = response.data
  if (memberData.value.email === null) {
    memberData.value.email = '이메일 정보 없음';
  }
}

const closeMemberModal = () => {
  isShowMemberModal.value = false;
  memberData.value = {
    memberId: '',
    username: '',
    email: '',
    role: '',
    picture: '',
    githubUsername: ''
  }
  printStudentList();
}
</script>

<style scoped>

</style>
