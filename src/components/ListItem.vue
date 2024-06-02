<script>
import {getTypeImg, getType} from '../utils/getType';

export default {
        props: {
          type: {
            required: true,
          },
          name: {
            required: true,
          },
          dynamicId: {
            required: true,
          },
          index: {
            required: true
          },
          selectedRoomIndex: {
            required: true
          },
          hasSelectedRoom: {
            required: true
          }
        },
        methods: {
            getType,
            getTypeImg, 
            setIndex: function (){
                this.$emit('data-index', this.index, this.dynamicId);
            } 
        }
    }

</script>

<template>
    <li class="transition hover:bg-indigo-100" :class="hasSelectedRoom && selectedRoomIndex == index ? 'bg-indigo-100' : ''">
        <a href="#" @click="setIndex">
          <div class="py-5 border-b px-3">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold">{{ name }} 
                <span class="text-lg italic text-gray-400">#{{ dynamicId }}</span>
              </h3>
              <img 
              v-if="getTypeImg(type) != null"
              v-bind:src="getTypeImg(type)" v-bind:style="{height: '30px', width: '30px'}"/>
            </div>
            <div class="text-lg italic text-gray-600">{{ getType(type) }}</div>
          </div>
        </a>
      </li>   
</template>

<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>