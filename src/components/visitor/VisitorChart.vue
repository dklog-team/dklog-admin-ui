<template>
  <Line
      id="my-chart-id"
      class="h-72"
      v-if="loaded"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script setup>
import {ref} from "vue";
import {Line} from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {getCountStatistics} from "../../api/visitor.js";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

const loaded = ref(false)
const chartData = ref({})
const chartOptions = ref({})
const chartStyle = ref({})

const init = async () => {
  let response = await getCountStatistics();

  chartData.value = {
    labels: response.data.dateList,
    datasets: [
      {
        label: '일간 방문자 수',
        backgroundColor: '#f9d72f',
        borderColor: '#f9d72f',
        data: response.data.countList,
        tension: 0.3,
        pointStyle: 'circle',
        pointRadius: 7,
        pointHoverRadius: 12,
        // pointBackgroundColor: 'rgba(224, 168, 46, 0.3)',
        pointBackgroundColor: 'white',
        pointBorderWidth: 3,
      }
    ]
  }
  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: Math.floor(((Math.max(...response.data.countList) + 20) / 10)) * 10,
      }
    }
  }
  chartStyle.value = {
    // height: '30vh',
  }
  loaded.value = true
}
init()
</script>

<style scoped>

</style>