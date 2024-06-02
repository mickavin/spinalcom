<script>
import Card from './Card.vue'
import { iterableArray } from '../utils/iterable'
import { findClosestNumber } from '../utils/percent'
import sound from '../assets/wheel.mp3'

export default {
  components: {
    Card
  },
  props: {
    marker: {
      required: false
    },
    roomData: {
      required: false
    }
  },
  methods: {
    // Retourne les informations liés à une salle
    getData(){
      const data = iterableArray(this.roomData?.[0]?.endpoints)
      return data
    },
    // Calcule la card la plus au centre pour créer un effet de zoom dessus
    calculateActiveIndex() {
      let activeIndex = 0
      let items = document.querySelectorAll('.item')
      const width = window.innerWidth
      let distances = Array.from(items).map(item => {
          let rect = item.getBoundingClientRect()
          return {
              index: item.dataset.index,
              distance: rect.left
          }
      })
      distances.sort((a, b) => a.distance - b.distance)
      activeIndex = findClosestNumber(distances, width/2).index
      return activeIndex
  },
  // Callback appelé quand les cards sont scrollés
    onScroll() {
      if(this.disabled === false){
        if(this.activeIndex != this.calculateActiveIndex()){
          const audio = new Audio(sound)
          audio.play()
        }
        this.activeIndex = this.calculateActiveIndex()
      }
      
    }
  },
  data: () => ({
    activeIndex: 0,
    disabled: false,
  })
  
}

</script>
<template>
  <div>
    <div class="bottombar">
      <div class="container" 
      v-on:scroll="onScroll">
        <Card class="item" 
        v-for="(item, index) in getData()" 
        v-bind:key="index" 
        v-bind:class="{ active: `${index}` === `${activeIndex}` }" 
        v-bind:data-index="index" 
        v-bind="item"/> 
      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
  width: 100%;
  display: flex;
  place-items: center;
  overflow-x: scroll;
  white-space: nowrap;
  padding-left: 400px;
  padding-right: 100vw;
  margin-bottom: 10px;
}

.active {
  transform: scale(0.9) !important;
  transition: 0.5s;
}

.item {
  transform: scale(0.7);
  transition: 0.5s;

}

@media screen and (max-width: 420px) {
  .item.active {
    transform: scale(0.8) !important;
  }
  .item {
    transform: scale(0.6)  !important;
  }
}

@media screen and (max-height: 420px) {
  .item.active {
    transform: scale(0.8) !important;
  }
  .item {
    transform: scale(0.6)  !important;
  }
}

.bottombar {
    width: 100vw;
    transition: all 0.3s ease-out;
    background-color: transparent;
}

</style>
