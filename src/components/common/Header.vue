<template>
  <header class="bg-white w-full p-4 border-b border-gray-200">
    <nav class="flex justify-end">
      <div>
        <div class="flex items-center gap-x-4">
          <div class="avatar">
            <div class="w-5 h-5 rounded-full ring ring-gray-300 ring-offset-base-100 ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="text-gray-300">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          <span class="text-gray-600">{{ username }}</span>
          <button type="button" class="btn btn-sm text-white" @click="clickLogoutBtn">로그아웃</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {authStore} from "../../store/auth.js";
import {onBeforeMount, ref} from "vue";
import {useCookies} from "vue3-cookies";
import {getUsername} from "../../api/admin.js";

const auth = authStore()
const cookies = useCookies().cookies

const username = ref('')

onBeforeMount(async () => {
  let adminId = cookies.get('adminId');
  const requestData = {
    adminId,
  }
  let response = await getUsername(requestData);
  console.log(response.data)
  username.value = response.data
})

const clickLogoutBtn = async () => {
  auth.logout()
}
</script>

<style scoped>

</style>