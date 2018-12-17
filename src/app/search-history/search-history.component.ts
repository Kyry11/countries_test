import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap, map, flatMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CountryDataService } from '../services/country-data.service';
import { CountryHeader } from '../services/typings';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent {

  public history: CountryHeader[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountryDataService
  ) { }

  private updateHistory = (header: CountryHeader) => {
    this.history = [
      { alpha3Code: header.alpha3Code, name: header.name },
      ...this.history.filter(i => i.alpha3Code !== header.alpha3Code)
    ];
  };
    
  public history$ = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap(route => route.params.pipe( take(1) )),
        filter(param => !!param.iso),
        flatMap(param => this.countryService.getCountryHeader(param.iso)),
        tap(this.updateHistory)
      );
}
