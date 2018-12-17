import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CountryDataService } from '../services/country-data.service';
import { Router } from '@angular/router';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { CountryHeader } from '../services/typings';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent {

  constructor(
    private dataService: CountryDataService,
    private router: Router
  ) { }

  public formatter = (result: CountryHeader) => `${result.name} (${result.alpha3Code})`;

  private isMatch = (sr: CountryHeader, phrase: string) => sr.name.toLowerCase().indexOf(phrase.toLowerCase()) > -1
                                                            || sr.alpha3Code.toLowerCase().indexOf(phrase.toLowerCase()) > -1

  public search = (text$: Observable<string>) =>
    combineLatest(
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(phrase => phrase.length > 2)
      ),
      this.dataService.getAllCountryHeadersCached()
    ).pipe(
      map(([phrase, searchResults]) => searchResults.filter(sr => this.isMatch(sr, phrase))),
      map(results => results.slice(0, 10))
    )

  selectItem = (e: NgbTypeaheadSelectItemEvent) => this.router.navigate(['/country/' + (e.item as CountryHeader).alpha3Code]);
}
