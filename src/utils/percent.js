import { iterableArray } from './iterable'

// Produit en croix pour convertir une fraction (ou un rapport) sur 100
export function toPercent(number, per){
    return Math.round((number * 100)/per)
}

// Produit en croix pour convertir une fraction (ou un rapport) sur 120
export function to120(number, per){
    return (number * 120)/per
}

// Trouve la valeur d'un array la plus proche d'un nombre donné
export function findClosestNumber(array, target) {
    return iterableArray(array).reduce((closest, num) =>
      Math.abs(num.distance - target) < Math.abs(closest.distance - target) ? num : closest
    )
  }