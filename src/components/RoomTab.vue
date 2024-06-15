<script>
import {getTypeImg, getType} from '../utils/getType';
import { Cindicator, Cindicators } from '../styles/CardStyle';
import {getIndicatorColorRoomElementFunction} from '../utils/color';
import { toPercent } from '../utils/percent'
import getMaxUnit, {getUnit, getUnitImg} from '../utils/getMaxUnit'

export default {
        props: {
          type: {
            required: true,
          },
          parent: {
            required: false,
          },
          dynamicId: {
            required: true,
          },
          name:  {
              required: false,
              type: String
          },
          currentValue: {
            required: false
          }
        },
        methods: {
            // Retourne le type d'une infrastructure
            getType,
            // Retourne une image lié au type d'une infrastructure
            getTypeImg, 
            // Retourne une image lié à l'unité d'une valeur
            getUnitImg,
            // Retourne l'unité d'une valeur
            getUnit,
            // Retourne l'unité critique lié au statisques d'une salle
            getMaxUnit,
            //Retourne un visuelle de barre incrémenté
            getIndicatorColor(index){
                return getIndicatorColorRoomElementFunction(index, this.currentValue ,getMaxUnit(this.name), false)
            },
        },
        
        data: () => ({
            // Style pour l'élaboration des barres graphiques indicatives
            Cindicator,
            // Style pour l'élaboration des barres graphiques indicatives
            Cindicators,
            //Retourne un visuelle de barre incrémenté
            getIndicatorColorRoomElementFunction,
            // Produit en croix pour convertir une fraction (ou un rapport) sur 100
            toPercent
        })
    }
</script>
<template>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4 w-8/12">
            <img 
            v-if="getUnitImg(name) != null"
            class="h-12 w-12 flex-none bg-gray-50 d-30" :src="getUnitImg(name)" :alt="name">
            <div class="min-w-0 flex-auto">
                <p v-if="typeof parent == 'string'"  class="text-xl font-semibold leading-6 text-gray-900">{{ name }}</p>
                <p v-else  class="text-xl font-semibold leading-6 text-gray-900">{{ name }}</p>
                <p class="mt-1 truncate text-lg leading-5 text-gray-500">#{{ dynamicId }}</p>
            </div>
        </div>
        <div class="flex flex-row">
          <span style="font-size: 30px;" v-if="typeof currentValue == 'number'">{{Math.round(currentValue*10)/10}}                     
          </span>
          <span 
          v-if="typeof currentValue == 'number'"
          style="font-size: 14px;">{{ getUnit(name) }}</span>
          <span v-if="typeof currentValue == 'boolean'" :style="[{fontSize: '15px'}]">
            {{ currentValue ? 'Activée' : 'Désactivée' }}
          </span>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end w-4/12">
            <div :style="Cindicators">
                <div 
                v-if="typeof currentValue == 'number'"
                v-for="index of 12" 
                v-bind:key="index"
                :style="[{height: `${(index+1)*2}px`}, Cindicator]"
                :class="getIndicatorColor(index)"
                >
                </div>  
            </div>
            <div class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p v-if="typeof currentValue == 'number'" class="text-xs leading-5 text-gray-500">
                Valeur critique
            </p>
            </div>
        </div>
       
        </li>
</template>
<style scoped>

  .d-30 {
    height: 30px; 
    width: 30px;
  }
</style>