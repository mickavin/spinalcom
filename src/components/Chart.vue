<template>
    <div class="canvas">
      <Pie :data="data" :options="options" />
    </div>
</template>
  
<script>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
  } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import groupBy from '../utils/groupBy';
  import { iterableArray } from '../utils/iterable';
  import { alphaticOnlyMethod } from '../utils/regex';
  import { colorRandomizer } from '../utils/color';

  ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
  
  export default {
    components: {
      Pie
    },
    props: {
      datas: {
        required: true
      }
    },
    data() {
      const data = this.getLabels().datasets
      const labels = this.getLabels().labels
      const backgroundColor = this.getLabels().colors
      return {
        data: {
        		labels,
        		datasets : [ {
        			backgroundColor,
        			data
        		} ]
        	},
        	options : {
        		responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Proportion des infrastructures'
              }
            }
        	}
        }
      
    },
    methods: {
        getLabels(){
          const editedData = iterableArray(this.datas).map(item => ({...item, name: alphaticOnlyMethod(item.name)}))
          const groupedData = groupBy(editedData, 'name')
          const labels = Object.keys(groupedData)
          const datasets = Object.values(groupedData).map(item => item.length)
          const colors = Object.keys(groupedData).map(item => colorRandomizer())
          return {
            labels,
            datasets,
            colors
          }
        },
      }
    }
  
  </script>
  <style>
    .canvas {
      height: 400px;
      width: 400px;
    }
  </style>