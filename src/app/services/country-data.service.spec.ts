import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryDataService } from './country-data.service';
import { COUNTRY_API_BASE_URL, COUNTRY_API_ISO_URL, COUNTRY_API_ALL_URL } from './config';
import { COUNTRY_SUMMARY_FIELDS, CountrySummary, CountryHeader, COUNTRY_HEADER_FIELDS } from './typings';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';

describe('LocationService', () => {

  let service: CountryDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CountryDataService
      ]
    });

    service = TestBed.get(CountryDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should successfully get all country headers', (done) => {

    const filter = '?fields=' + COUNTRY_HEADER_FIELDS.join(';');
    const summaryUrl = [ COUNTRY_API_BASE_URL, COUNTRY_API_ALL_URL, filter ].join('');

    const mockHeaderData: CountryHeader[] = [{"name":"Afghanistan","alpha3Code":"AFG"},{"name":"Åland Islands","alpha3Code":"ALA"},{"name":"Albania","alpha3Code":"ALB"}];

    service.getAllCountryHeaders()
                   .subscribe(res => {
                     expect(res).toEqual(mockHeaderData);
                     done();
                   });

    let countryRequest = httpMock.expectOne(summaryUrl);
    countryRequest.flush(mockHeaderData);

    httpMock.verify();
  });

  it('should successfully get all country headers using cached data', (done) => {

    const mockHeaderData: CountryHeader[] = [{"name":"Australia","alpha3Code":"AUS"}, {"name":"Afghanistan","alpha3Code":"AFG"},{"name":"Åland Islands","alpha3Code":"ALA"}];

    service.getAllCountryHeaders = () => of(mockHeaderData).pipe(take(1));
    
    const coldSpy = spyOn(service, 'getAllCountryHeaders').and.callThrough();

    service.getAllCountryHeadersCached()
                   .subscribe(res => {
                     expect(res).toEqual(mockHeaderData);
                     done();
                   });

    service.getAllCountryHeadersCached()
                   .subscribe(res => {
                     expect(res).toEqual(mockHeaderData);
                     done();
                   });

    expect(coldSpy).toHaveBeenCalledTimes(1);

    httpMock.verify();
  });

  it('should successfully get single country header', (done) => {

    const iso = 'AUS';

    const mockHeaderData: CountryHeader[] = [{"name":"Australia","alpha3Code":"AUS"}, {"name":"Afghanistan","alpha3Code":"AFG"},{"name":"Åland Islands","alpha3Code":"ALA"}];

    service.getAllCountryHeadersCached = () => of(mockHeaderData);

    service.getCountryHeader(iso)
                   .subscribe(res => {
                     expect(res).toEqual(mockHeaderData[0]);
                     done();
                   });

    httpMock.verify();
  });

  it('should successfully get country summary', (done) => {

    const iso = 'AUS';
    const filter = '?fields=' + COUNTRY_SUMMARY_FIELDS.join(';');
    const summaryUrl = [ COUNTRY_API_BASE_URL, COUNTRY_API_ISO_URL, iso, filter ].join('');

    const mockAusData: CountrySummary = {"currencies":[{"code":"AUD","name":"Australian dollar","symbol":"$"}],"flag":"https://restcountries.eu/data/aus.svg","name":"Australia","latlng":[-27.0,133.0],"area":7692024.0};

    service.getCountrySummary(iso)
                   .subscribe(res => {
                     expect(res).toEqual(mockAusData);
                     done();
                   });

    let countryRequest = httpMock.expectOne(summaryUrl);
    countryRequest.flush(mockAusData);

    httpMock.verify();
  });
});