import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  
  let pipe: CurrencyPipe;

  const mockCurrency = [{"code":"AUD","name":"Australian dollar","symbol":"$"}];

  beforeEach(() => {
    pipe = new CurrencyPipe();
  });

  it('should create an instance', () => {
    
    expect(pipe).toBeTruthy();
  });

  it('should format currency correctly', () => {

    const result = pipe.transform(mockCurrency);

    expect(result).toBe(`${mockCurrency[0].name} (${mockCurrency[0].symbol})`);
  });
});
