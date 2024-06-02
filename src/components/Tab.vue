<script>
import {getTypeImg, getType} from '../utils/getType';
import { Cindicator, Cindicators } from '../styles/CardStyle';
import {getIndicatorColorRoomElementFunction} from '../utils/color';
import { toPercent } from '../utils/percent'

export default {
        props: {
          type: {
            required: true,
          },
          parent: {
            required: false,
          },
          name: {
            required: true,
          },
          children: {
            required: true,
          },
          total: {
            required: false,
          },
          totalChildren: {

          },
          subInfraNumber: {
            required: false,
          }
        },
        methods: {
            getType,
            getTypeImg, 
        },
        
        data: () => ({
            Cindicator,
            Cindicators,
            getIndicatorColorRoomElementFunction,
            toPercent
        })
    }
</script>
<template>
    <li class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4 w-8/12">
            <img 
            v-if="getTypeImg(type) != null"
            class="h-12 w-12 flex-none bg-gray-50" :src="getTypeImg(type)" alt="" v-bind:style="{height: '30px', width: '30px'}">
            <div class="min-w-0 flex-auto">
                <p v-if="typeof parent == 'string'"  class="text-xl font-semibold leading-6 text-gray-900">{{ parent }} > {{ name }}</p>
                <p v-else  class="text-xl font-semibold leading-6 text-gray-900">{{ name }}</p>
                <p class="mt-1 truncate text-lg leading-5 text-gray-500">{{ getType(type) }}</p>
            </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end w-4/12">
            <div :style="Cindicators">
                <div 
                v-if="typeof subInfraNumber == 'number' && subInfraNumber > 0"
                v-for="index of 12" 
                :v-key="index"
                :style="[{height: `${(index+1)*2}px`}, Cindicator]"
                :class="getIndicatorColorRoomElementFunction(index, children.length, subInfraNumber, true)"
                >
                </div>  
            </div>
            <div class="mt-1 flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <p v-if="typeof subInfraNumber == 'number' && subInfraNumber > 0" class="text-xs leading-5 text-gray-500">
                Répartion de {{ children.length }}/{{ subInfraNumber }} ({{toPercent(children.length, subInfraNumber)}}%)
            </p>
            </div>
        </div>
        </li>
</template>
<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>