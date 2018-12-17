import { CountryInfoComponent } from './country-info.component';
import { of } from 'rxjs';
import { CountryDataService } from '../services/country-data.service';
import { ActivatedRoute } from '@angular/router';
import { CountrySummary } from '../services/typings';

describe('CountryInfoComponent', () => {
  
  let component: CountryInfoComponent;

  const mockIso = 'AUS';
  const mockSummary: CountrySummary = {"currencies":[{"code":"AUD","name":"Australian dollar","symbol":"$"}],"flag":"https://restcountries.eu/data/aus.svg","name":"Australia","latlng":[-27.0,133.0],"area":7692024.0};
  
  const mockActivatedRoute: ActivatedRoute = {
    params: of({iso: mockIso})
  } as unknown as ActivatedRoute;

  const mockService: CountryDataService = {
    getCountrySummary: (iso: string) => of(mockSummary)
  } as CountryDataService

  beforeEach(() => {
    component = new CountryInfoComponent(mockActivatedRoute, mockService);
  });

  it('should create summary stream', () => {
    
    expect(component.summary$).not.toBeUndefined();

  });

  it('should invoke data service with correct parameter', (done) => {
    
    const spyGetCountrySummary = spyOn(mockService, 'getCountrySummary').and.returnValue(of(null));

    component.summary$.subscribe((summary) => {
      expect(spyGetCountrySummary).toHaveBeenCalledTimes(1);
      expect(spyGetCountrySummary).toHaveBeenCalledWith(mockIso);
      done();
    });
  });

  it('should invoke data service to get country summary on route param change', (done) => {
    
    const spyGetCountrySummary = spyOn(mockService, 'getCountrySummary').and.callThrough();

    component.summary$.subscribe((summary) => {
      expect(spyGetCountrySummary).toHaveBeenCalledTimes(1);
      expect(summary).toEqual(mockSummary);
      done();
    });
  });
});
