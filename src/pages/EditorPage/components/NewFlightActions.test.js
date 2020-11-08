import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewFlightActions from './NewFlightActions';

describe('NewFlightActions', () => {
  test('should render the actions buttons for a new flight', () => {
    render(<NewFlightActions onCancel={() => {}} onCreate={() => {}} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Create Flight Plan')).toBeInTheDocument();
  });

  test('should disable the create button', () => {
    const callback = jest.fn();
    render(<NewFlightActions disabled onCancel={() => {}} onCreate={callback} />);
    userEvent.click(screen.getByText('Create Flight Plan'));
    expect(callback).not.toHaveBeenCalled();
  })

  test('should call the onCreate callback', () => {
    const callback = jest.fn();
    render(<NewFlightActions onCancel={() => {}} onCreate={callback} />);

    userEvent.click(screen.getByText('Create Flight Plan'));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
