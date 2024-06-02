<template>
    <div class="card-wrapper">
        <div :style="styles.card">
        <div :style="styles.cardTop" :class="getBatteryColor()">
            <div :style="styles.cardTopText">
                <div>
                    <h1>{{ name }}</h1><h3>#{{ dynamicId }}</h3>
                </div>
                <div class="flex-row">
                    <span v-if="typeof currentValue == 'number'" :style="styles.value">{{ Math.round(currentValue*10)/10 }}</span>
                    <span style="font-size: 14px;">{{ getUnit(name) }}</span>
                    <div v-if="typeof currentValue == 'boolean'" :style="[styles.value, {fontSize: '25px', marginTop: '20px'}]">{{ currentValue ? 'Activée' : 'Désactivée' }}</div>
                    
                </div>
            </div>
            <img :src="getUnitImg(name)" class="icon" />
        </div>
        <div :style="styles.cardBottom">
           
            
            <span class="badge" :class="getOrderStatus()">
                {{this.name.includes('Consigne') ? 'Consigne' : 'Mesure'}} 
            </span>
            <span :class="getStatus()">
                {{!this.name.includes('Consigne')  ? 'Statistiques' 
                : 'Etat' 
                }} 
            </span>
            
            <div v-if="typeof currentValue == 'number'" class="p-20">
                <h3 :style="styles.title">Valeur critique</h3>
                <div :style="styles.indicators">
                    <div 
                    v-for="index of length" 
                    :class="getIndicatorColor(index)" 
                    :style="[{height: `${(index+1)*4}px`}, styles.indicator]">
                    </div>  
                </div>
            </div>
            <div v-else class="p-20">
                
            </div>
        </div>
    </div>
  </div>
  </template>
  <script>
  import { to120 } from '../utils/percent'
  import * as styles from '../styles/CardStyle.js'
  import getMaxUnit, {getUnit, getUnitImg} from '../utils/getMaxUnit'
  import {getIndicatorColorRoomElementFunction} from '../utils/color'


  export default {
    data(){
        return {
          length: [0,1,2,3,4,5,6,7,8,9,10,11],
          styles,
          getMaxUnit,
          getUnit,
          getUnitImg
        }
    },
    props: {
    name:  {
        required: false,
        type: String
    },
    inversed:  {
        required: false,
        type: Boolean,
        default: false
    },
    type: {
        required: true
    },
    dynamicId: {
        required: false,
        type: Number,
    },


    currentValue: {
        required: true
    }
   } ,
   methods: {
    getStatus(){
      return this.name.includes('Consigne') ? 'badge free' :'badge booked'
    },
    getOrderStatus(){
        return this.name.includes('Consigne') ? 'ordered' : 'unordered'
    },
    getBatteryColor(){
        if(typeof this.currentValue == 'boolean' && this.currentValue){
            return 'green'
        }
        if(typeof this.currentValue == 'boolean'){
            return 'red'
        }
        const battery_level = to120( this.currentValue ,getMaxUnit(this.name))
        if(battery_level >= 100){
            if(this.inversed) return 'red'
            return 'green'
        } else if(battery_level >= 70 && battery_level < 100){
            if(this.inversed) return 'orange'
            return 'yellow'
        } else if(battery_level >= 40 && battery_level < 70){
            if(this.inversed) return 'yellow'
            return 'orange'
        } else if(battery_level < 40){
            if(this.inversed) return 'green'
            return 'red'
        }
    },
    getIndicatorColor(index){
        return getIndicatorColorRoomElementFunction(index, this.currentValue ,getMaxUnit(this.name), false)
    },
   }
  }
  </script>
  <style>
  .icon {
        width: 7rem;
        position: absolute;
        top: 20px;
        right: 20px;
        filter: invert();
    }  
  
  
  
  </style>