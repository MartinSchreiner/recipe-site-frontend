import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timesPipe'
})
export class TimesPipePipe implements PipeTransform {

  transform(value: number): any {
    const iterable = <Iterable<any>> {};
    iterable[Symbol.iterator] = function* (){
      let n=0;
      while (n < value/3){
        yield ++n;
      }
    };
    return iterable;
  }

}
