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
    <VisitorChart />
  </section>
</template>

<script setup>
import VisitorChart from "../components/visitor/VisitorChart.vue";
import {getAllCount, getYesterdayCount, getTodayCount} from "../api/visitor.js";
import {ref} from "vue";

const allCount = ref()
const yesterdayCount = ref()
const todayCount = ref()

const init = async () => {
  let getAllCountData = await getAllCount();
  let getYesterdayCountData = await getYesterdayCount();
  let getTodayCountData = await getTodayCount();

  allCount.value = getAllCountData.data.count
  yesterdayCount.value = getYesterdayCountData.data.count
  todayCount.value = getTodayCountData.data.count
}
init()
</script>

<style scoped>

</style>