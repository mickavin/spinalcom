<script>
import {getTypeImg, getType} from '../utils/getType';

export default {
        props: {
        // Propriété de l'Objet d'une infrastructure retournant le type de cet objet
          type: {
            required: true,
          },
        // Propriété de l'Objet d'une infrastructure retournant le nom de cet objet
        name: {
            required: true,
          },
        // Propriété de l'Objet d'une infrastructure retournant l'id de cet objet
          dynamicId: {
            required: true,
          },
        // index de la ligne
          index: {
            required: true
          },
          // ID de la salle sélectionnée
          selectedRoomIndex: {
            required: true
          },
          // Boolean retournant true si une salle est sélectionnée
          hasSelectedRoom: {
            required: true,
            type: Boolean
          }
        },
        methods: {
            // Retourne le type d'une infrastructure
            getType,
            // Retourne une image lié au type d'une infrastructure
            getTypeImg, 
            // Communique l'index et l'id de la ligne au composant parent
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