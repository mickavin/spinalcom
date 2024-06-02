import * as types from "../constants/type"
import builidingImg from '../assets/icons/builiding.png'
import floorImg from '../assets/icons/3.png'
import surfaceImg from '../assets/icons/surface.png'

import roomImg from '../assets/icons/room.png'
import officeImg from '../assets/icons/office.png'
import architectureImg from '../assets/icons/architecture.png'


// Retourne une image lié au type d'une infrastructure
export const getTypeImg = (type) => {
    switch (type) {
        case types.BUILDING:
            return builidingImg
        case types.FLOOR:
            return floorImg
        case types.ROOM:
            return surfaceImg
        default:
          return null
      } 
}

// Retourne une image lié au type d'une infrastructure
export const getTypeCardImg = (type) => {
    switch (type) {
        case types.BUILDING:
            return officeImg
        case types.FLOOR:
            return architectureImg
        case types.ROOM:
            return roomImg
        default:
          return null
      } 
}

// Retourne le type d'une infrastructure
export const getType = (type) => {
    switch (type) {
        case types.BUILDING:
            return 'Bâtiment'
        case types.FLOOR:
            return 'Etage'
        case types.ROOM:
            return 'Salle'
        default:
          return 'Autre'
      } 
}