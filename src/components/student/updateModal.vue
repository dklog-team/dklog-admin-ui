<template>
    <div class="modal-box w-full shadow-lg">
      <h1 class="text-xl font-bold w-full mb-4 text-start">수정할 학생의 정보를 입력해주세요</h1>
      <div class="mt-5 w-full sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">이름</label>
          <div class="mt-2">
            <input id="name" type="text" placeholder="교육생 이름" class="input input-bordered w-full"
                   v-model="studentInfo.name"/>
          </div>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label for="phoneNum" class="block text-sm font-medium leading-6 text-gray-900">휴대전화번호</label>
          </div>
          <div class="mt-2">
            <input id="phoneNum" type="text" placeholder="010********" class="input input-bordered w-full"
                   maxlength="11" v-model="studentInfo.phoneNumber"/>
          </div>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label for="semester" class="block text-sm font-medium leading-6 text-gray-900">기수</label>
          </div>
          <div class="mt-2">
            <input id="semester" type="number" placeholder="기수" class="input input-bordered w-full"
                   v-model="studentInfo.semester"/>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex items-center justify-between">
            <label for="authStatus" class="block text-sm font-medium leading-6 text-gray-900">가입현황</label>
          </div>
          <div id="authStatus" class="mt-2 flex">
                    <span class="mr-2 flex justify-items-center">
                      <input id="authStatusY" type="radio" class="radio" v-model="studentInfo.authStatus" value="Y">
                      <label for="authStatusY" class="label-text ml-2">Y</label>
                    </span>
            <span class="flex justify-items-center">
                      <input id="authStatusN" type="radio" class="radio" v-model="studentInfo.authStatus" value="N">
                      <label for="authStatusN" class="label-text ml-2">N</label>
                    </span>
          </div>
        </div>

      </div>
      <div class="modal-action flex">
        <a href="#" type="button" class="btn text-white shadow-sm" @click="handleOk">수정</a>
        <a href="#" type="button" class="btn btn-outline text-black shadow-sm" @click="handleClose">취소</a>
      </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  studentInfo: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['handle-Update', 'close-Modal'])


const handleOk = async () => {
  emit('handle-Update')
}

const handleClose = () => {
  emit('close-Modal')
}
</script>

<style scoped>

</style>