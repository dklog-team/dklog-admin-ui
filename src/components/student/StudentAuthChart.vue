<template>
  <Pie v-if="loaded" class="w-64" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import {ref} from "vue";
import {getStudentAuthData} from "../../api/student.js";

ChartJS.register(ArcElement, Tooltip, Legend)

const loaded = ref(false)
const chartData = ref({})
const chartOptions = ref({})
const chartStyle = ref({})

const init = async () => {
  let response = await getStudentAuthData();

  console.log(response)

  chartData.value = {
    labels: ['인증', '미인증'],
    datasets: [
      {
        backgroundColor: ['rgb(87, 160, 229)', 'rgb(237, 109, 133)'],
        // borderColor: '#f9d72f',
        data: [response.data.yesCount, response.data.noCount],
        // tension: 0.3,
        // pointStyle: 'circle',
        // pointRadius: 7,
        // pointHoverRadius: 12,
        // pointBackgroundColor: 'rgba(224, 168, 46, 0.3)',
        // pointBackgroundColor: 'white',
        // pointBorderWidth: 3,
      }
    ]
  }
  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     min: 0,
    //     max: Math.floor(((Math.max(...response.data.countList) + 20) / 10)) * 10,
    //   }
    // }
  }
  chartStyle.value = {
  }
  loaded.value = true
}
init()
</script>

<style scoped>

</style>