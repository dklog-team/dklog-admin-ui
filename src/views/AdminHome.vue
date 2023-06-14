<template>
  <section class="px-16 mt-16">
    <div class="flex items-center gap-x-10 border border-gray-200 p-8 rounded-lg shadow">
      <div>
        <p class="mb-2 text-gray-600">오늘 방문자 수</p>
        <p class="text-xl font-semibold">{{ todayCount }}</p>
      </div>
      <div>
        <p class="mb-2 text-gray-600">어제 방문자 수</p>
        <p class="text-xl font-semibold">{{ yesterdayCount }}</p>
      </div>
      <div>
        <p class="mb-2 text-gray-600">누적 방문자 수</p>
        <p class="text-xl font-semibold">{{ allCount }}</p>
      </div>
    </div>
  </section>
  <section class="px-16 mt-16">
    <VisitorChart/>
  </section>
  <section class="px-16 mt-16">
    <div class="flex gap-x-6">
      <div class="w-1/2">
        <h1 class="text-xl text-semibold">인기글</h1>
      </div>
      <div class="w-1/2">
        <h1 class="text-xl text-semibold">교육생 인증 현황</h1>
      </div>
    </div>
    <div class="flex gap-x-6 mt-4">
      <div class="w-1/2">
        <div class="border border-gray-200 p-8 rounded-lg shadow h-full">
          <div class="flex-1 space-y-4">
            <div v-for="(post, index) in popularPostList" :key="index" class="flex">
              <span class="font-semibold mr-4">{{ index + 1 }}</span>
              <span class="transition text-gray-500 hover:text-gray-700 hover:underline cursor-pointer truncate"
                    @click="clickPopularPost(index)">{{ post.title }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="flex justify-center items-center border border-gray-200 p-8 rounded-lg shadow gap-x-12 h-full">
          <div>
            <StudentAuthChart/>
          </div>
          <div v-if="loaded" class="text-center">
            <h2 class="text-8xl text-gray-500 font-bold">{{ `${Math.floor(studentAuthData.percent)}%` }}</h2>
            <label for="noAuthStudentsModal" class="btn btn-ghost btn-sm btn-active w-full mt-8">미인증 교육생 확인</label>
            <!-- modal -->
            <input type="checkbox" id="noAuthStudentsModal" class="modal-toggle"/>
            <div class="modal">
              <div class="modal-box relative">
                <label for="noAuthStudentsModal"
                       class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <div class="block w-full p-1">
                  <div class="text-xl font-bold w-full mb-4 text-start">
                    <h1>미인증 교육생</h1>
                  </div>
                  <div class="w-full">
                    <table class="table w-full">
                      <thead>
                      <tr>
                        <th>번호</th>
                        <th>기수</th>
                        <th>이름</th>
                      </tr>
                      </thead>
                      <tbody>
                      <template v-for="(student, index) in studentAuthData.noAuthStudentList" :key="index">
                        <tr>
                          <th>{{ index + 1 }}</th>
                          <td>{{ student.semester }}</td>
                          <td>{{ student.name }}</td>
                        </tr>
                      </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="px-16 mt-16 mb-16">
    <div>
      <h1 class="text-xl text-semibold">최근글</h1>
    </div>
    <div class="flex justify-between gap-x-6">
      <div v-for="(post, index) in recentPostList" :key="index" class="mt-4 w-1/4">
        <div class="border border-gray-200 rounded-lg shadow">
          <div class="cursor-pointer" @click="clickRecentPost(index)">
            <img v-if="post.previewImage != null" :src="post.previewImage"
                 class="border-b h-40 w-full rounded-t-lg"/>
            <div v-else
                 class="rounded-lg border-b h-40">
              <template v-if="index % 2 == 1">
                <div class="h-full bg-[#f9d72f] text-gray-800 text-2xl rounded-t-lg flex justify-center items-center">
                  <span class="font-bold">dk</span>
                  <span class="font-medium">log</span>
                </div>
              </template>
              <template v-else>
                <div class="h-full bg-gray-800 text-[#f9d72f] text-2xl rounded-t-lg flex justify-center items-center">
                  <span class="font-bold">dk</span>
                  <span class="font-medium">log</span>
                </div>
              </template>
            </div>
          </div>
          <div class="p-4">
            <div class="h-16">
              <h1 class="font-semibold">{{ post.title }}</h1>
            </div>
            <div class="text-gray-500">
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="avatar mr-2">
                    <div class="w-6 rounded-full ring-2 ring-gray-300">
                      <img :src="post.picture"/>
                    </div>
                  </div>
                  <span>{{ post.username }}</span>
                </div>
                <span>{{ post.createdDate }}</span>
              </div>
            </div>
            <div class="flex justify-end gap-x-4 mt-4 text-gray-500">
              <div class="flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ post.views }}</span>
              </div>
              <div class="flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                </svg>
                <span>{{ post.commentCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import VisitorChart from "../components/visitor/VisitorChart.vue";
import {getAllCount, getYesterdayCount, getTodayCount} from "../api/visitor.js";
import {ref} from "vue";
import {getPopularPostList, getRecentPostList} from "../api/post.js";
import {getStudentAuthData} from "../api/student.js";
import StudentAuthChart from "../components/student/StudentAuthChart.vue";
import index from "vue3-highlightjs";

const allCount = ref()
const yesterdayCount = ref()
const todayCount = ref()
const popularPostList = ref()
const recentPostList = ref()
const studentAuthData = ref()
const loaded = ref(false)

const init = async () => {
  allCount.value = (await getAllCount()).data.count
  yesterdayCount.value = (await getYesterdayCount()).data.count
  todayCount.value = (await getTodayCount()).data.count
  popularPostList.value = (await getPopularPostList()).data.popularPostList
  recentPostList.value = (await getRecentPostList()).data.recentPostList
  studentAuthData.value = (await getStudentAuthData()).data

  console.log(popularPostList.value)
  console.log(recentPostList.value)
  console.log(studentAuthData.value)
  loaded.value = true
}
init()

const clickPopularPost = (index) => {
  let win = window.open(`${import.meta.env.VITE_DKLOG_URL}/post/${popularPostList.value[index].postId}`, '_blank');
  win.focus()
}

const clickRecentPost = (index) => {
  let win = window.open(`${import.meta.env.VITE_DKLOG_URL}/post/${recentPostList.value[index].postId}`, '_blank');
  win.focus()
}
</script>

<style scoped>

</style>