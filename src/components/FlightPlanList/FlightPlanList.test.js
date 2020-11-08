import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlightPlanList from './FlightPlanList';

describe('FlightPlanList', () => {

  beforeEach(() => {
    // source https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  })

  const plans = [
    {
      title: 'My flight plan 1', id: '1234',
    },
    {
      title: 'My flight plan 2', id: '4567',
    },
    {
      title: 'My flight plan 3', id: '7890',
    },
  ];

  test('should render a list of flightPlans', () => {
    render (<FlightPlanList flightPlans={plans} />);

    expect(screen.getByText('My flight plan 1')).toBeInTheDocument();
    expect(screen.getByText('My flight plan 2')).toBeInTheDocument();
    expect(screen.getByText('My flight plan 3')).toBeInTheDocument();
  });

  test('should call the onRowClick callback', () => {
    const clickSpy = jest.fn();
    render (<FlightPlanList flightPlans={plans} onRowClick={clickSpy} />);

    userEvent.click(screen.getAllByText('View')[1]);

    expect(clickSpy).toHaveBeenCalledWith(plans[1]);
  });
});
