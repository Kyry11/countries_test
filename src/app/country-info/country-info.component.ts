import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryDataService } from '../services/country-data.service';
import { CountrySummary } from '../services/typings';
import { filter, flatMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent {

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryDataService
  ) { }

  public summary$: Observable<CountrySummary> = this.route.params.pipe(
    map(param => param['iso']),
    filter(iso => !!iso),
    flatMap(iso => this.countryService.getCountrySummary(iso))
  );
}
