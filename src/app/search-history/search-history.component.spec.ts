import { SearchHistoryComponent } from './search-history.component';
import { of } from 'rxjs';
import { CountryDataService } from '../services/country-data.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';

describe('CountryHistoryComponent', () => {
  
  let component: SearchHistoryComponent;

  const mockIso = 'AUS';
  const mockHeaders = [{'name':'Australia','alpha3Code':'AUS'}, {'name':'Afghanistan','alpha3Code':'AFG'}, {'name':'Åland Islands','alpha3Code':'ALA'}];
  
  const mockRouter: Router = {
    events: of(new NavigationEnd(1, '', ''))
  } as unknown as Router;

  const mockActivatedRoute: ActivatedRoute = {
    params: of({iso: mockIso})
  } as unknown as ActivatedRoute;
  
  const mockService: CountryDataService = {
    getCountryHeader: (param: string) => of(mockHeaders[0])
  } as unknown as CountryDataService

  beforeEach(() => {
    component = new SearchHistoryComponent(mockRouter, mockActivatedRoute, mockService);
  });

  it('should set up history updater and stream', (done) => {
    
    expect(component.history).toEqual([]);
    expect(component['updateHistory']).not.toBeUndefined();
    expect(component.history$).not.toBeUndefined();

    done();
  });

  it('should add new items to history', (done) => {
    
    component.history = [];

    component['updateHistory'](mockHeaders[0]);

    expect(component.history.length).toBe(1);
    expect(component.history).toEqual([mockHeaders[0]]);
    
    done();
  });

  it('should add new items at the top of the list', (done) => {
    
    component.history = [mockHeaders[0]];

    component['updateHistory'](mockHeaders[1]);

    expect(component.history.length).toBe(2);
    expect(component.history).toEqual([mockHeaders[1], mockHeaders[0]]);
    
    done();
  });

  it('should remove existing matching items', (done) => {
    
    component.history = [mockHeaders[0], mockHeaders[1]];

    component['updateHistory'](mockHeaders[1]);

    expect(component.history.length).toBe(2);
    expect(component.history).toEqual([mockHeaders[1], mockHeaders[0]]);
    
    done();
  });

  it('should update history in respoinse to router events', (done) => {
    
    const spygetCountryHeader = spyOn(mockService, 'getCountryHeader').and.callThrough();

    component.history$.subscribe(() => {

      expect(spygetCountryHeader).toHaveBeenCalledTimes(1);
      expect(component.history.length).toEqual(1);
      
      done();
    });
  });
});
