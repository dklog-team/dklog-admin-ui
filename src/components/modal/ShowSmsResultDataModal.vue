<template>
  <div class="modal-box relative">
    <label for="showSmsResultData"
           class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    <div class="block w-full p-1">
      <div class="text-xl font-bold w-full mb-4 text-start">
        <h1>SMS 발송 요청 결과</h1>
      </div>
      <div class="w-full">
        <div class="overflow-x-auto w-full">
          <table class="table w-full">
            <!-- head -->
            <thead>
            <tr>
              <th>발신번호</th>
              <th>수신번호</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ props.smsResultData.from }}</td>
              <td>{{ props.smsResultData.to }}</td>
            </tr>
            </tbody>
            <thead>
            <tr>
              <th>요청일시</th>
              <th>완료일시</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ props.smsResultData.requestTime }}</td>
              <td>{{ props.smsResultData.completeTime }}</td>
            </tr>
            </tbody>
            <thead>
            <tr>
              <th>status code</th>
              <th>status name</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ props.smsResultData.statusCode }}</td>
              <td>{{ props.smsResultData.statusName }}</td>
            </tr>
            </tbody>
            <thead>
            <tr>
              <th>type</th>
              <th>메시지</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ props.smsResultData.type }}</td>
              <td>{{ props.smsResultData.statusMessage }}</td>
            </tr>
            </tbody>
            <thead class="w-full">
            <tr>
              <th colspan="2">내용</th>
            </tr>
            </thead>
            <tbody class="w-full">
            <tr>
              <td colspan="2">{{ props.smsResultData.content }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  smsResultData: Object,
})
</script>

<style scoped>

</style>