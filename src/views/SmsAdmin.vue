<template>
  <section class="px-16 mt-16 mb-16">
    <h1 class="text-2xl font-semibold">SMS 발송 관리</h1>
    <div class="mt-6 flex items-center gap-x-4">
      <input v-model="startDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
      <span class="text-xl">~</span>
      <input v-model="endDate" type="date" class="input input-bordered w-full max-w-min cursor-pointer"/>
      <button class="btn btn-secondary" @click="clickDateRangeBtn">적용</button>
      <button class="btn btn-ghost bg-gray-100" @click="init">초기화</button>
    </div>
    <div v-if="loading" class="flex justify-center items-center w-full h-80 rounded-lg border mt-6">
      <span class="loader"></span>
    </div>
    <div v-else class="overflow-x-auto w-full mt-6">
      <table class="table w-full">
        <!-- head -->
        <thead>
        <tr>
          <th>요청일시</th>
          <th>상태</th>
          <th>Type</th>
          <th>발신번호</th>
          <th>수신번호</th>
          <th>요청결과</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(smsRequestData, index) in smsSendRequestDataList" :key="index">
          <tr>
            <td>{{ smsRequestData.requestTime }}</td>
            <td>
              <div class="flex justify-start items-center gap-x-2">
                <span class="relative flex h-3.5 w-3.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-success"></span>
                </span>
                <span>{{ smsRequestData.statusName }}</span>
              </div>
            </td>
            <td>{{ smsRequestData.type }}</td>
            <td>{{ smsRequestData.from }}</td>
            <td>{{ smsRequestData.to }}</td>
            <td>
              <label for="showSmsResultData" class="btn btn-circle btn-ghost" @click="clickShowSmsResultData(index)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width=1.5 stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </label>
              <input type="checkbox" id="showSmsResultData" class="modal-toggle"/>
              <div v-if="loadedModal" class="modal">
                <ShowSmsResultDataModal :sms-result-data="smsResultData"></ShowSmsResultDataModal>
              </div>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div>
        <Pagination :paging-util="pagingUtil" @change-page="changePage"></Pagination>
      </div>
    </div>
  </section>
</template>

<script setup>
import {getSmsRequestDataList, getSmsResultData} from "../api/sms.js";
import {ref} from "vue";
import ShowSmsResultDataModal from "../components/modal/ShowSmsResultDataModal.vue";
import Pagination from "../components/common/Pagination.vue";

const smsSendRequestDataList = ref([])
const pagingUtil = ref({})
const loadedModal = ref(false)
const smsResultData = ref({})
const loading = ref(true)
const startDate = ref('')
const endDate = ref('')

const init = async () => {
  let response = await getSmsRequestDataList()
  console.log(response.data)
  smsSendRequestDataList.value = response.data.smsSendRequestDataList
  pagingUtil.value = response.data.pagingUtil
  loading.value = false
}
init()

const clickShowSmsResultData = async (index) => {
  console.log('clickShowSmsResultData' + index)
  let messageId = smsSendRequestDataList.value[index].messageId
  smsResultData.value = (await getSmsResultData(messageId)).data
  loadedModal.value = true
}

const clickDateRangeBtn = async () => {
  let requestData = {
    startDate: startDate.value,
    endDate: endDate.value,
  }
  let response = await getSmsRequestDataList(requestData)
  smsSendRequestDataList.value = response.data.smsSendRequestDataList
  pagingUtil.value = response.data.pagingUtil
}

const changePage = async (page) => {
  console.log(`changePage ${page}`)
  const requestData = {
    starDate: startDate.value,
    endDate: endDate.value,
    page: page,
  }
  let response = await getSmsRequestDataList(requestData);
  smsSendRequestDataList.value = response.data.smsSendRequestDataList
  pagingUtil.value = response.data.pagingUtil
}
</script>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #dddddd;
  border-bottom-color: #f9d72f;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>