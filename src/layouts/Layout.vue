<script>
import CardsBar from '../components/CardsBar.vue';
import { Cindicator, Cindicators } from '../styles/CardStyle';
import {SPACE_ENDPOINT, ROOM_CONTROL_ENDPOINT} from '../constants/endpoint';
import { fetchData } from '../api/fetch';
import { iterableArray } from '../utils/iterable';
import ListItem from '../components/ListItem.vue';
import search from '../utils/search';
import Chart from '../components/Chart.vue';
import CardNumber from '../components/CardNumber.vue';
import Tab from '../components/Tab.vue';
import RoomTab from '../components/RoomTab.vue';

export default {
  components: {
    CardsBar,
    ListItem,
    Chart,
    CardNumber,
    Tab,
    RoomTab
  },
  data: () => ({
      Cindicator,
      Cindicators,
      data: {},  // Contiendra les données récupérées
      roomData: [],  // Contiendra les données récupérées
      loading: true,  // Indicateur de chargement
      error: null,  // Contiendra un message d'erreur en cas de problème
      selectedBuildingIndex: null,
      selectedFloorIndex: null,
      selectedRoomIndex: null,
      searchedText: '',
      childKey: 0
  }),
  methods: {
    getGeographicContext(){
      return fetchData(SPACE_ENDPOINT)
      .then(data => {
        this.data = data
        this.childKey += 1
        console.log('Données récupérées:', this.data);
      })
      .catch(error => {
        console.error('Erreur:', error.message);
      });
    },
    getControlEndPoint(room){
      return fetchData(ROOM_CONTROL_ENDPOINT(room))
      .then(data => {
        console.log('Données récupérées:', data);
        return data
      })
      .then(data => this.roomData = iterableArray(data))
      .catch(error => {
        console.error('Erreur:', error.message);
      });
    },
    getBuildings(){
      const buildings = iterableArray(this.data.children)
      return buildings
    },
    getFloors(){
      const building = this.getBuildings()?.[this.selectedBuildingIndex]
      const floors = iterableArray(building?.children)
      return floors
    },
    getRooms(){
      const floor = this.getFloors()?.[this.selectedFloorIndex]
      const rooms = iterableArray(floor?.children)
      return rooms
    },
    getRoom(){
      const room = this.getRooms()?.[this.selectedRoomIndex]
      return room || null
    },
    getData(){
      switch(true){
        case (this.selectedRoomIndex != null):
          return this.getRooms()
        case (this.selectedFloorIndex != null):
          return this.getRooms()
        case (this.selectedBuildingIndex != null):
          return this.getFloors()
        default:
          return this.getBuildings()
      }
    },
    getFilteredData(){
      return search(this.searchedText, 
      this.getData(), 
      [{key: 'dynamicId', type: 'number'}, {key: 'name', type: 'string'}])
    },
    getAllChildren(){
      return iterableArray(this.getFilteredData()).map(item => {
        return item.children.map(child => ({
          ...child,
          parent: item.name,
          total: child.children.length
        }))
      }).flat()
    },
    getAllSubChildren(){
      return iterableArray(this.getAllChildren()).map(item => {
        return item.children.map(child => ({
          ...child,
          parent: item.name,
          total: child.children.length
        }))
      }).flat()
    },
    getRoomStatus(){
      const data = iterableArray(this.roomData?.[0]?.endpoints)
      return data
    },
    changeSelection(index, dynamicId){
      switch(true){
        case (this.selectedBuildingIndex == null):
          this.selectedBuildingIndex = index
          break
        case (this.selectedFloorIndex == null):
          this.selectedFloorIndex = index
          break
        case (this.selectedRoomIndex == null || this.selectedRoomIndex != null):
          this.selectedRoomIndex = index
          this.getControlEndPoint(dynamicId)
          break
        default:
          break
      }
    },
    removeSelection(){   
      switch(true){
        case (this.selectedRoomIndex != null):
          this.selectedRoomIndex = null
          this.roomData = []
          break
        case (this.selectedFloorIndex != null):
          this.selectedFloorIndex = null
          break
        case (this.selectedBuildingIndex != null):
          this.selectedBuildingIndex = null
          break
        default:
          break
      }
    },
    removeSelectionBtn(selected){   
      switch(true){
        case (selected == 0):
          this.selectedRoomIndex = null
          this.selectedFloorIndex = null
          this.selectedBuildingIndex = null
          this.roomData = []
          break
        case (selected == 1):
          this.selectedRoomIndex = null
          this.selectedFloorIndex = null
          this.roomData = []
          break
        default:
          break
      }
    },
    reloadChild() {
      this.childKey += 1; // Change la valeur de la clé pour forcer le rechargement
    }
  },
  mounted(){
    this.getGeographicContext()
  }
}
</script>
<template>
    <main class="flex w-screen h-screen shadow-lg rounded-3xl dark">
    <section class="flex flex-col w-1/12 bg-white rounded-l-3xl">
      <div class="w-16 mx-auto mt-12 mb-20 rounded-2xl text-white">
        <img src="../assets/logo.png" alt="Logo de SpinalCom"/>
      </div>
      <nav class="relative flex  flex-col py-4 items-center">
        <a href="#" 
        @click="removeSelectionBtn(0)"
        :class="selectedBuildingIndex == null ? 'bg-yellow-200' : ''"
        class="relative w-16 p-4 text-yellow-900 rounded-2xl mb-20">
          <img src="../assets/icons/builiding.png" alt="Bâtiments"/>
        </a>
       
        <a href="#"
        @click="removeSelectionBtn(1)"
        :class="selectedBuildingIndex != null && selectedFloorIndex == null ? 'bg-yellow-200' : ''"
        class="w-16 p-4 border text-gray-700 rounded-2xl mb-20">
          <img src="../assets/icons/3.png" alt="Etages"/>
        </a>
        <a 
        :class="selectedFloorIndex != null ? 'bg-yellow-200' : ''"
        href="#" class="w-16 p-2 border text-gray-700 rounded-2xl mb-20">
          <img src="../assets/icons/surface.png" alt="Pièces"/>
        </a>
       
      </nav>
    </section>
    <section class="flex flex-col pt-3 w-3/12 bg-gray-50 h-full overflow-y-scroll">
      <label class="px-3 input">
        <a 
        href="#"
        :class="selectedBuildingIndex != null ? 'w-1/12 p-1' : 'hidden'"  
        @click="removeSelection"
        >
          <img src="../assets/icons/return.png" :style="{height: '20px', width: '20px'}"/>
        </a>
        <input class="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
          placeholder="Rechercher..." 
          :class="selectedBuildingIndex != null ? 'w-11/12' : ''" 
          @input="event => searchedText = event.target.value" 
          :style="{fontSize: '10px'}"
        />
      </label>

      <ul class="mt-6">
           <ListItem 
            v-for="(item, index) in getFilteredData()"
            @data-index="changeSelection"
            v-bind:key="index"
            v-bind:index="index"
            v-bind="item"
            :hasSelectedRoom="selectedRoomIndex != null"
            :selectedRoomIndex="selectedRoomIndex"
           />
      </ul>
    </section>
    <section class="w-8/12 px-4 flex flex-col bg-white rounded-r-3xl">
      <div>
      <div class="flex flex-row">
        <Chart 
        v-if="selectedBuildingIndex == null && getFilteredData().length > 0"
        :datas="getFilteredData()"
        :name="'Buildings'"
        :key="childKey"
        />
        <Chart 
        v-else-if="selectedFloorIndex == null && selectedBuildingIndex != null && getFilteredData().length > 0"
        :datas="getFilteredData()"
        :name="'Floors'"
        :key="childKey + 1"

        />
        <Chart 
        v-else-if="selectedRoomIndex == null && selectedFloorIndex != null && getFilteredData().length > 0"
        :datas="getFilteredData()"
        :name="'Rooms'"
        :key="childKey + 2"

        />
        <CardsBar
        v-else-if="selectedRoomIndex != null && getRoomStatus().length > 0"
        :roomData="roomData"
        />
        <div 
        v-if="selectedRoomIndex == null"
        class="flex justify-center items-center">
          <CardNumber 
          :number="getFilteredData().length"
          :type="getFilteredData()?.[0]?.type"
          />
        </div>
      </div>
      
      <section class="flex flex-row">
        <section 
        v-if="selectedRoomIndex == null && getFilteredData().length > 0"
        class="w-6/12 rounded-xl shadow m-8 list">
          <div class="min-w-0 flex-1 pl-4 pt-8 pb-4 fixed bg-white">
            <h3 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Liste des infrastructures</h3>
          
          </div>
          <ul role="list" class="divide-y divide-gray-100 px-8 mt-20">
            <Tab 
            v-for="(item, index) in getFilteredData()"
            v-bind="item"
            v-bind:key="index"     
            :subInfraNumber="getAllChildren().length"
            v-bind:data-index="index"        
            />
          </ul>
        </section>
        <section 
        v-if="selectedFloorIndex == null && getAllChildren().length > 0"
        class="w-6/12 rounded-xl shadow m-8 list">
          <div class="min-w-0 flex-1 pl-4 pt-8 pb-4 fixed bg-white">
            <h3 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Liste des sous-infrastructures</h3>
          
          </div>
          <ul role="list" class="divide-y divide-gray-100 px-8 mt-20">
            <Tab 
            v-for="(item, index) in getAllChildren()"
            v-bind="item" 
            v-bind:key="index"   
            :subInfraNumber="getAllSubChildren().length"  
            />
          </ul>

        </section>
        <section 
        v-if="selectedRoomIndex != null && getRoomStatus().length > 0"
        class="w-full rounded-xl shadow m-8 list">
          <div class="min-w-0 flex-1 pl-4 pt-8 pb-4 fixed bg-white w-full">
            <h3 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Profil de pièces</h3>
          
          </div>
          <ul role="list" class="divide-y divide-gray-100 px-8 mt-20">
            <RoomTab 
            v-for="(item, index) in getRoomStatus()"
            v-bind:key="index"
            v-bind="item"    
            />
          </ul>
        </section>
      </section>
    </div>
  </section>
  </main>
</template>

<style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .list  {
    overflow-y: auto;
    height: 300px;
  }
</style>