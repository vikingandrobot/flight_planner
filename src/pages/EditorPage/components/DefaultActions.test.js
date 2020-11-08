import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DefaultActions from './DefaultActions';

describe('DefaultActions', () => {
  test('should render the default actions buttons', () => {
    render(<DefaultActions onNew={() => {}} />);
    expect(screen.getByText('New Flight Plan')).toBeInTheDocument();
  });

  test('should call the onNew callback on click', () => {
    const callback = jest.fn();
      render(<DefaultActions onNew={callback} />);

      userEvent.click(screen.getByText('New Flight Plan'));
      expect(callback).toHaveBeenCalledTimes(1);
  });
});
