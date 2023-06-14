<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-32 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex justify-center p-4">
        <a href="/login">
          <span class="font-semibold text-5xl align-middle bg-secondary rounded-md px-1 py-0.5 mr-2">dk</span>
          <span class="font-medium text-5xl align-middle">log</span>
        </a>
      </div>
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">관리자 계정으로 로그인 하세요</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">관리자 ID</label>
        <div class="mt-2">
          <input v-model="requestData.username" id="email" type="text" placeholder="아이디" class="input input-bordered w-full" />
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
        </div>
        <div class="mt-2">
          <input v-model="requestData.password" id="password" type="password" placeholder="비밀번호" class="input input-bordered w-full" />
        </div>
      </div>

      <div>
        <button type="button" class="w-full btn text-white shadow-sm" @click="clickSignInBtn">로그인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {authStore} from "../store/auth.js";
import {ref} from "vue";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";

const auth = authStore()
const cookies = useCookies().cookies
const router = useRouter()

const requestData = ref({
  username: '',
  password: '',
})

console.log('base url: ', import.meta.env.VITE_API_BASE_URL)

const clickSignInBtn = async () => {
  await auth.login(requestData.value)
  console.log('token: ', cookies.get('token'))
  console.log('adminId: ', cookies.get('adminId'))
  await router.push('/')
}
</script>

<style scoped>

</style>