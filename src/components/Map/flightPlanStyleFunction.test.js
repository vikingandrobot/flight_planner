import flightPlanStyleFunction from './flightPlanStyleFunction';

jest.mock('ol/style/Circle');
jest.mock('ol/geom/Point');

class MockGeometry {
  constructor(coordinates) {
    this.coordinates = coordinates;
  }

  getCoordinates() {
    return this.coordinates;
  }
}

class MockFeature {
  constructor(geometry = new MockGeometry([])) {
    this.geometry = geometry;
  }

  getGeometry = () => {
    return this.geometry;
  }
}

describe('flightPlanStyleFunction', () => {
  test('should return a style for the line string if there are no coordinates', () => {
    const feature = new MockFeature();
    const styles = flightPlanStyleFunction(feature);
    expect(styles).toHaveLength(1);
    expect(styles[0]).toEqual(expect.objectContaining({
      stroke_: expect.objectContaining({
        color_: '#31a4eb',
        width_: 3,
      }),
      zIndex_: 0,
    }));
  });

  test('should draw a Circle on each coordinate and put it on top of the line string', () => {
    const feature = new MockFeature(new MockGeometry([[10, 20], [15, 30], [20, 40]]));
    const styles = flightPlanStyleFunction(feature);
    expect(styles).toHaveLength(4);
    expect(styles[0].zIndex_).toEqual(0);
    expect(styles[1].zIndex_).toEqual(1);
    expect(styles[2].zIndex_).toEqual(1);
    expect(styles[3].zIndex_).toEqual(1);
  });
});
