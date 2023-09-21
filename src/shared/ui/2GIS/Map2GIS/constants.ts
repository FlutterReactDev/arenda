import { MapEventHandlerTable } from '../models'
import { MapCustomEvents } from './models'

/** Массив с пользовательскими событиями карты **/
export const CUSTOM_EVENTS: Array<keyof (MapCustomEvents & Partial<MapEventHandlerTable>)> = ['onMount', 'onUnmount']
export const initalOptions = {
    key: _2GIS_KEY_,
    keepCenterWhileUserZoomRotate: true,
    scaleControl: true,
  };
  