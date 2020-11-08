import ShallowRenderer from 'react-test-renderer/shallow';

import EditorPage from './EditorPage';

describe('EditorPage', () => {
  test('should render the editor page', () => {
    const renderer = new ShallowRenderer();

    expect(renderer.render(<EditorPage />)).toMatchSnapshot();
  })
})
