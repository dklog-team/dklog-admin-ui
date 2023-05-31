<template>
  <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">등록할 학생의 정보를 입력해주세요</h2>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium leading-6 text-gray-900">이름</label>
      <div class="mt-2">
        <input v-model="data.name" id="name" type="text" placeholder="교육생 이름" class="input input-bordered w-full"/>
      </div>
    </div>

    <div class="mb-4">
      <div class="flex items-center justify-between">
        <label for="phoneNum" class="block text-sm font-medium leading-6 text-gray-900">휴대전화번호</label>
      </div>
      <div class="mt-2">
        <input v-model="data.phoneNumber" id="phoneNum" type="text" placeholder="010********" class="input input-bordered w-full" maxlength="11"/>
      </div>
    </div>

    <div class="mb-6">
      <div class="flex items-center justify-between">
        <label for="semester" class="block text-sm font-medium leading-6 text-gray-900">기수</label>
      </div>
      <div class="mt-2">
        <input v-model="data.semester" id="semester" type="number" placeholder="기수" class="input input-bordered w-full"/>
      </div>
    </div>

    <div>
      <button type="button" class="w-full btn text-white shadow-sm" @click="register">등록</button>
      <button type="button" class="w-full mt-2 btn btn-outline text-black shadow-sm" @click="cancel">취소</button>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {registerStudent} from "../api/student.js";
import router from "../routes/index.js";

const data = ref({
  name: '',
  phoneNumber: '',
  semester: ''
});

const register = () => {
  if(data.value.name === '' || data.value.phoneNumber === '' || data.value.semester === ''){
    alert('모든 데이터를 입력해주세요.');
    return
  }
  registerStudent(data.value)
  router.push(`/student`);
}

const cancel = () => {
  router.push(`/student`);
};

</script>

<style scoped>

</style>