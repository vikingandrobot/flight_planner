import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import matchMediaPolyfill from '../../../testUtils/matchMediaPolyfill';
import FlightPlanList from './FlightPlanList';

describe('FlightPlanList', () => {

  beforeEach(() => {
    // source https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
    matchMediaPolyfill();
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
