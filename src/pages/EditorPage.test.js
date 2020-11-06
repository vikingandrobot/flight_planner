import { render, screen } from '@testing-library/react';

import EditorPage from './EditorPage';

describe('EditorPage', () => {
  test('should render the editor page', () => {
    render(<EditorPage />);
    const linkElement = screen.getByText('Flight Planner');
    expect(linkElement).toBeInTheDocument();
  })
})
