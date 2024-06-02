<template>
    <div class="card-wrapper">
        <div :style="styles.card">
        <div :style="styles.cardTop" :class="getBatteryColor()">
            <div :style="styles.cardTopText">
            <h2>Nombre de {{ getType(type) }}s</h2>
           
            </div>
            <img :src="getTypeCardImg(type)" class="icon" />
        </div>
        <div class="cardBottom" :style="styles.cardBottom">
           
            <span class="fs-80p">
            {{number}}
            </span>
            <span class="typed">{{ getType(type) }}s</span>
        </div>
    </div>
  </div>
  </template>
  <script>
  import { to120 } from '../utils/percent'
  import * as styles from '../styles/CardStyle.js'
  import { getTypeCardImg, getType } from '../utils/getType.js';
  export default {
    data(){
        return {
          styles,
          getTypeCardImg, 
          getType
        }
    },
    props: {      
        type: {
            required: true,
        },
        number: {
            required: true,
            type: Number
        }
   } ,
   methods: {
    getBatteryColor(){
        const number = to120(this.number, 60)
        if(number >= 100){
            if(this.inversed) return 'red'
            return 'green'
        } else if(number >= 70 && number < 100){
            if(this.inversed) return 'orange'
            return 'yellow'
        } else if(number >= 40 && number < 70){
            if(this.inversed) return 'yellow'
            return 'orange'
        } else if(number < 40){
            if(this.inversed) return 'green'
            return 'red'
        }
    },
   }
  }
  </script>
  <style scoped>
  .icon {
        width: 7rem;
        position: absolute;
        top: 20px;
        right: 20px;
        filter: invert();
    }  
  
    .cardBottom {
        display: flex;
        justify-content: start;
        color: '#999'; 
        align-items: baseline;
    }

    .typed {
        font-size: 15px; 
        margin-left: 6px
    }

    .fs-80p {
        font-size: 80px;
        color: #777;
    }
  </style>