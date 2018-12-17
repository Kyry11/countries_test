export type CountryHeader = Pick<ICountryInfo, 'name' | 'alpha3Code'>;

export const COUNTRY_HEADER_FIELDS: CountryInfoFields = [
  'name',
  'alpha3Code'
];

export type CountrySummary = Pick<ICountryInfo, 'name' | 'currencies' | 'latlng' | 'area' | 'flag'>;

export const COUNTRY_SUMMARY_FIELDS: CountryInfoFields = [
  'name',
  'currencies',
  'latlng',
  'area',
  'flag'
];

export type CountryInfoFields = (keyof ICountryInfo)[];

export interface ICountryInfo {
  name: string;
  alpha3Code: string;
  latlng: LatLong;
  area: number;
  currencies: ICurrency[];
  flag: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export type LatLong = [ number, number ];
