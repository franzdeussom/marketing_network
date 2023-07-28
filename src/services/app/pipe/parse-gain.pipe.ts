import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseGain'
})
export class ParseGainPipe implements PipeTransform {

  transform(value: string): unknown {
    return Number.parseInt(value);
  }

}
