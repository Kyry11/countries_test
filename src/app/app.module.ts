import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryInfoComponent } from './country-info/country-info.component';
import { CountrySearchComponent } from './country-search/country-search.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CountryDataService } from './services/country-data.service';
import { HttpClientModule } from '@angular/common/http';
import { LatlongPipe } from './pipes/latlong.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountryInfoComponent,
    CountrySearchComponent,
    SearchHistoryComponent,
    LatlongPipe,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbTypeaheadModule
  ],
  providers: [
    CountryDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
