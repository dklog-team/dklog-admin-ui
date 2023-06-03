<template>
  <dialog class="modal modal-open rounded-3xl bg-transparent" v-if="showModal">
    <div class="modal-box w-full shadow-lg">
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">dklog 회원 정보</h2>
      <div class="w-full mt-5 flex bg-gray-50 p-8 shadow-inner">
        <div class="avatar flex flex-col text-center">
          <div class="w-36 rounded-full">
            <img :src="memberInfo.picture"/>
          </div>
          <h5 class="mt-3 text-lg font-semibold">{{memberInfo.githubUsername}}</h5>
        </div>
        <div class="ml-5">
          <p class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
            <span class="text-sm font-medium"> ID : {{memberInfo.memberId}} </span>
          </p>
          <p class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm font-medium"> Username : {{memberInfo.username}} </span>
          </p>
          <p class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span class="text-sm font-medium"> E-mail : {{memberInfo.email}} </span>
          </p>
          <p class="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm font-medium"> Role : {{memberInfo.role}} </span>
          </p>
        </div>
      </div>
      <div class="modal-action">
        <button class="btn btn-sm btn-primary bg-opacity-60 border-opacity-60" @click="handleDelete">삭제</button>
        <button class="btn btn-sm btn-secondary" @click="handleClose">확인</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
import {deleteMember} from "../../api/member.js";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  memberInfo: {
    type: Object,
    required: true
  },
  studentName: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['close-modal'])

const handleClose = () => {
  emit('close-modal');
}

const handleDelete = async () => {
  const answer = confirm(`회원 정보 삭제 시 현재 회원이 작성한 글과 댓글이 모두 삭제됩니다.\n정말 삭제하시겠습니까?`)
  if(answer){
    await deleteMember(props.memberInfo.memberId);
  }
  handleClose();
}

</script>


<style scoped>

</style>