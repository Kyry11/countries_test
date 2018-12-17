import { Pipe, PipeTransform } from '@angular/core';
import { ICurrency } from '../services/typings';

@Pipe({
  name: 'currencyInfo'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: ICurrency[]): any {
    return value && value.map(currency => `${currency.name} (${currency.symbol})`).join();
  }
}
