import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tickize'
})
export class TickizePipe implements PipeTransform {

  transform(value: boolean, args?: any): any {
    return value ? '✓' : '✗';
  }

}
