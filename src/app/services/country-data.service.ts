import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CountryHeader, COUNTRY_HEADER_FIELDS, CountrySummary, COUNTRY_SUMMARY_FIELDS } from './typings';
import { Observable } from 'rxjs';
import { map, share, publishReplay, refCount } from 'rxjs/operators';
import { COUNTRY_API_BASE_URL, COUNTRY_API_ALL_URL, COUNTRY_API_ISO_URL, COUNTRY_API_NAME_URL } from './config';

@Injectable()
export class CountryDataService {

    constructor(
        private http: HttpClient
    ) { }

    private cachedCountryHeaders$: Observable<CountryHeader[]>;

    public getAllCountryHeaders(): Observable<CountryHeader[]> {
        console.log('getting all countries');
        const filter = '?fields=' + COUNTRY_HEADER_FIELDS.join(';');
        return this.http.get<CountryHeader[]>([ COUNTRY_API_BASE_URL, COUNTRY_API_ALL_URL, filter ].join(''));
    }

    public getAllCountryHeadersCached(): Observable<CountryHeader[]> {
        console.log('getting all countries cached');
        if (!this.cachedCountryHeaders$) {
            this.cachedCountryHeaders$ = this.getAllCountryHeaders()
                .pipe(
                    publishReplay(1),
                    refCount()
                );
        }

        return this.cachedCountryHeaders$;
    }

    public getCountryHeader(iso: string): Observable<CountryHeader | undefined> {
        console.log('getting country header', iso);

        return this.getAllCountryHeadersCached()
            .pipe(
                map(headers => headers.find(header => header.alpha3Code === iso))
            );
    }

    public getCountrySummary(iso: string): Observable<CountrySummary> {
        console.log('getting country by iso', iso);
        const filter = '?fields=' + COUNTRY_SUMMARY_FIELDS.join(';');
        return this.http.get<CountrySummary>([ COUNTRY_API_BASE_URL, COUNTRY_API_ISO_URL, iso, filter ].join(''));
    }
}