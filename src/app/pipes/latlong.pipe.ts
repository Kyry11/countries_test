import { Pipe, PipeTransform } from '@angular/core';
import { LatLong } from '../services/typings';

@Pipe({
  name: 'latlong'
})
export class LatlongPipe implements PipeTransform {

  transform(value: LatLong): any {
    return `Latitude: ${value[0]}° Longitude: ${value[1]}°`;
  }
}
