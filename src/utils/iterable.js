// Fonction prévenant d'une valeur non-array et non iterable
export function iterableArray (item){
    if(item != undefined && Array.isArray(item)){
        return [...item]
    } else {
        return []
    }
 }
 
// Fonction prévenant d'une valeur non-object et non iterable
export function iterableObject (item){
    if(item != undefined && item != null && typeof item === 'object'){
        return item
    } else {
        return {}
    }
 }