import React from 'react';
import { render } from '@testing-library/react';

import * as OlMap from 'ol/Map';
import * as OlView from 'ol/View';

import Map from './Map';

jest.mock('ol/Map');
jest.mock('ol/View');

describe('Map', () => {

  test('should pass down the class name to the container', () => {
    const { container } = render(<Map className='test-classname' />);
    expect(container).toMatchSnapshot();
  })

  test('should create a new Open Layers map on mount', () => {
    const viewOptions = {
      center: [0, 0],
      zoom: 11,
    };

    render(<Map viewOptions={viewOptions} />);

    expect(OlMap.default).toHaveBeenCalledTimes(1);
    expect(OlView.default).toHaveBeenCalledWith(viewOptions);
  });
});
