import { to120 } from '../utils/percent'

//Retourne un visuelle de barre incrémenté
export function getInfraIndicatorColorFunction(index, battery_level_percent, inversed = true){
    const battery_level = Math.round(to120(battery_level_percent, 100)/10)
    const i = index + 1
    if(i <= battery_level){
        if(i >= 10){
            if(inversed) return 'green'
            return 'red'
        } else if(i >= 7 && i < 10){
            if(inversed) return 'yellow'
            return 'orange'
        } else if(i >= 4 && i < 7){
            if(inversed) return 'orange'
            return 'yellow'
        } else if(i < 4){
            if(inversed) return 'red'
            return 'green'
        }
    } else {
        return 'grey'
    }
}

//Retourne un visuelle de barre incrémenté
export function getIndicatorColorRoomElementFunction(index, battery_level_percent, total, inversed = true){
    const battery_level = Math.round(to120(battery_level_percent, total)/10)
    const i = index
    if(i <= battery_level){
        if(i >= 10){
            if(inversed) return 'green'
            return 'red'
        } else if(i >= 7 && i < 10){
            if(inversed) return 'yellow'
            return 'orange'
        } else if(i >= 4 && i < 7){
            if(inversed) return 'orange'
            return 'yellow'
        } else if(i < 4){
            if(inversed) return 'red'
            return 'green'
        }
    } else {
        return 'grey'
    }
}

// Génère des couleurs aléatoire sur base HEX
export function colorRandomizer() {
    let letters = '0123456789ABCDEF';
    let colors = '#';
    for (let i = 0; i < 6; i++) {
        colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
}

// Thème Dark
export const dark = {
    background: '#2c3e50',
    surface: '#34495e',
    primary: '#ffffff',
    'primary-darken-1': '#ffffff',
    secondary: '#AAAAAA',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
}
  
// Thème Light
export const light = {
    background: '#fff8e7',
    surface: '#fff8e7',
    primary: '#34495e',
    'primary-darken-1': '#ffffff',
    secondary: '#AAAAAA',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
}