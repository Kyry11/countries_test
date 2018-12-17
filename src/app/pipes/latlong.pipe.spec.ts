import { LatlongPipe } from './latlong.pipe';
import { LatLong } from '../services/typings';

describe('LatlongPipe', () => {
  
  let pipe: LatlongPipe;

  const mockLatLong: LatLong = [-27.0,133.0];

  beforeEach(() => {
    pipe = new LatlongPipe();
  });

  it('should create an instance', () => {
    
    expect(pipe).toBeTruthy();
  });

  it('should format currency correctly', () => {

    const result = pipe.transform(mockLatLong);

    expect(result).toBe(`Latitude: ${mockLatLong[0]}° Longitude: ${mockLatLong[1]}°`);
  });
});
