import { CountrySearchComponent } from './country-search.component';
import { of } from 'rxjs';
import { CountryDataService } from '../services/country-data.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';

describe('CountrySearchComponent', () => {
  
  let component: CountrySearchComponent;

  const mockHeaders = [{"name":"Australia","alpha3Code":"AUS"}, {"name":"Afghanistan","alpha3Code":"AFG"}, {"name":"Åland Islands","alpha3Code":"ALA"}];
  
  const mockRouter: Router = {
    navigate: (parms: any[]) => null
  } as unknown as Router;

  const mockService: CountryDataService = {
    getAllCountryHeadersCached: () => of(mockHeaders)
  } as unknown as CountryDataService

  beforeEach(() => {
    component = new CountrySearchComponent(mockService, mockRouter)
  });

  describe('Helpers', () => {

    it('should set up formatter', () => {

      expect(component.formatter).not.toBeUndefined();

      const result = component.formatter(mockHeaders[0]);

      expect(result).toEqual('Australia (AUS)');

    });

    it('should set up isMatch verifier', () => {
      
      expect(component['isMatch']).not.toBeUndefined();

    });

    it('should match country names to terms', () => {

      const result = component['isMatch'](mockHeaders[0], 'aus');

      expect(result).toEqual(true);

    });

    it('should match country iso codes to terms', () => {

      const result = component['isMatch'](mockHeaders[2], 'ala');

      expect(result).toEqual(true);

    });

    it('should return flase when no match found', () => {

      const result = component['isMatch'](mockHeaders[0], 'aud');

      expect(result).toEqual(false);

    });

    it('should ignore case when performing a match', () => {

      const result = component['isMatch'](mockHeaders[0], 'aUs');

      expect(result).toEqual(true);

    });

    it('should set up search hook', () => {
      
      expect(component.search).not.toBeUndefined();

    });

    it('should set up selected item handler', () => {
      
      expect(component.selectItem).not.toBeUndefined();

    });
  });

  it('should invoke data service to get country summary on user input', (done) => {
    
    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.returnValue(of([]));

    const input$ = component.search(of('abc'));
    
    input$.subscribe((summary) => {
      expect(spygetAllCountryHeadersCached).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should not trigger if passed in term is less then 3 chars', (done) => {
    
    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.returnValue(of([]));
    
    let triggered = false;

    const input$ = component.search(of('au')).pipe(tap(() => triggered = true));
    
    input$.subscribe();

    expect(triggered).toBeFalsy();
    done();
  });

  it('should trigger if passed in term is 3 chars', (done) => {
    
    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.returnValue(of([]));
    
    let triggered = false;

    const input$ = component.search(of('xyz')).pipe(tap(() => triggered = true));
    
    input$.subscribe();

    expect(triggered).toBeTruthy();
    done();
  });

  it('should return correct matches on matched terms passed in', (done) => {
    
    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.callThrough();

    const input$ = component.search(of('aus'));
    
    input$.subscribe((summary) => {
      expect(spygetAllCountryHeadersCached).toHaveBeenCalledTimes(1);
      expect(summary).toEqual([mockHeaders[0]]);
      done();
    });
  });

  it('should return [] on non matched terms passed in', (done) => {
    
    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.callThrough();

    const input$ = component.search(of('xyz'));
    
    input$.subscribe((summary) => {
      expect(spygetAllCountryHeadersCached).toHaveBeenCalledTimes(1);
      expect(summary).toEqual([]);
      done();
    });
  });

  it('should limit the result set to 10 items when there are more matches', (done) => {
    
    const elevenMatches = [{"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"}, {"name":"Australia","alpha3Code":"AUS"},{"name":"Australia","alpha3Code":"AUS"}];

    const spygetAllCountryHeadersCached = spyOn(mockService, 'getAllCountryHeadersCached').and.returnValue(of(elevenMatches));

    const input$ = component.search(of('aus'));
    
    input$.subscribe((summary) => {
      expect(spygetAllCountryHeadersCached).toHaveBeenCalledTimes(1);
      expect(summary.length).toEqual(10);
      expect(summary.length).toBeLessThan(elevenMatches.length);
      done();
    });
  });

  it('should navigate user to country route when selection is made', (done) => {
    
    const spyRouterNavigate = spyOn(mockRouter, 'navigate');

    component.selectItem({ item: mockHeaders[0] } as NgbTypeaheadSelectItemEvent);

    expect(spyRouterNavigate).toHaveBeenCalledWith(['/country/' + mockHeaders[0].alpha3Code]);
    done();
  });
});
