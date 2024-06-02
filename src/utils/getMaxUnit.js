import * as maxUnits from '../constants/value';
import briefcase from '../assets/icons/briefcase.png'
import humidityper from '../assets/icons/humidityper.png'
import light from '../assets/icons/light.png'
import thermometer from '../assets/icons/thermometer.png'
import co2 from '../assets/icons/co2.png'
import wavesound from '../assets/icons/wave-sound.png'

// Retourne une image lié à l'unité d'une valeur
export const getUnitImg = (unit) => {
    switch (unit) {
        case maxUnits.TEMPERATURE_TYPE:
            return thermometer
        case maxUnits.CONSIGNE_TEMP_TYPE:
            return thermometer
        case maxUnits.LIGHT_TYPE:
            return light
        case maxUnits.OCCUPATION_TYPE:
            return briefcase
        case maxUnits.CONSIGNE_LIGHT_TYPE:
            return light
        case maxUnits.CO2_TYPE:
            return co2
        case maxUnits.HYGROMETRY_TYPE:
            return humidityper
        default:
          return wavesound
      } 
}

// Retourne l'unité critique lié au statisques d'une salle
export default (unit) => {
    switch (unit) {
        case maxUnits.TEMPERATURE_TYPE:
            return maxUnits.TEMPERATURE
        case maxUnits.CONSIGNE_TEMP_TYPE:
            return maxUnits.CONSIGNE_TEMP
        case maxUnits.LIGHT_TYPE:
            return maxUnits.LIGHT
        case maxUnits.OCCUPATION_TYPE:
            return maxUnits.OCCUPATION
        case maxUnits.CONSIGNE_LIGHT_TYPE:
            return maxUnits.CONSIGNE_LIGHT
        case maxUnits.CO2_TYPE:
            return maxUnits.CO2
        case maxUnits.HYGROMETRY_TYPE:
            return maxUnits.HYGROMETRY
        default:
          return maxUnits.OTHER
      } 
}

// Retourne l'unité d'une valeur
export const getUnit = (unit) => {
    switch (unit) {
        case maxUnits.TEMPERATURE_TYPE:
            return '°C'
        case maxUnits.CONSIGNE_TEMP_TYPE:
            return '°C'
        case maxUnits.LIGHT_TYPE:
            return ""
        case maxUnits.OCCUPATION_TYPE:
            return ""
        case maxUnits.CONSIGNE_LIGHT_TYPE:
            return ""
        case maxUnits.CO2_TYPE:
            return '%'
        case maxUnits.HYGROMETRY_TYPE:
            return '%'
        case maxUnits.OTHER_TYPE:
          return 'dB'
        default:
            ''
      } 
}