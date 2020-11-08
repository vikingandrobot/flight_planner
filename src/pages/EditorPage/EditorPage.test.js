import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import matchMediaPolyfill from '../../../testUtils/matchMediaPolyfill';
import * as FlightPlansAPIImport from '../../api/FlightPlansAPI';
import * as MapImport from '../../components/Map/Map';
import EditorPage from './EditorPage';


/*
 * Since most of the Map interactions happen outside of React and in scoped
 * environment, we're gonna mock the Map and display the props instead.
 */
jest.mock('../../components/Map/Map', () => ({
  __esModule: true,
  default: function MapMock(props) {
    const { flightPlan } = props;
    return (
      <>
        <div>MapMock</div>
        <div>{flightPlan?.id}</div>
      </>
    );
  },
}));

const DEFAULT_PLANS = [
  {
    id: 'abcd-1234',
    title: 'Rolex Learning Center',
    points: [
      [731340.3154337693, 5863703.367232675],
      [731338.9386689285, 5863913.189770418],
    ],
  },
  {
    id: 'efgh-5678',
    title: 'Cathédrale de Lausanne',
    points: [
      [738723.6704740375, 5864513.580420917],
      [738663.343385889, 5864522.235484955],
      [738650.7084765892, 5864448.536886312],
    ],
  }
];

async function renderEditorPageWithChildrenSpies() {
  const constructorSpy = jest.spyOn(MapImport, 'default');

  let result;
  await act(async () => {
    result = render(<EditorPage />);
  });


  return {
    ...result,
    mapLatestProps: () => constructorSpy.mock.calls[constructorSpy.mock.calls.length - 1][0],
  };
}

describe('EditorPage', () => {

  let plans = DEFAULT_PLANS.slice();

  beforeEach(() => {
    matchMediaPolyfill();
    plans = DEFAULT_PLANS.slice();
    jest.spyOn(FlightPlansAPIImport, 'get').mockResolvedValue(plans);
    jest.spyOn(FlightPlansAPIImport, 'post').mockImplementation((fp) => {
      plans.push(fp);
      return Promise.resolve();
    });
  });

  test('should render the editor page', async () => {
    let result;
    await act(async () => {
      result = render(<EditorPage />);
    });
    expect(result.container).toMatchSnapshot();
  })

  describe('Existing Flight Plans', () => {
    test('should load and render the list of flight plans', async () => {
      render(<EditorPage />);

      const firstFlightPlan = await screen.findByText('Rolex Learning Center');
      expect(firstFlightPlan).toBeInTheDocument();
      expect(screen.getByText('Cathédrale de Lausanne')).toBeInTheDocument();
    });

    test('should display the selected flight plan in the map', async () => {
      render(<EditorPage />);

      await screen.findByText('Rolex Learning Center');
      userEvent.click(screen.getAllByText('View')[1]);

      expect(screen.getByText('efgh-5678')).toBeInTheDocument();
      userEvent.click(screen.getAllByText('View')[0]);

      expect(screen.getByText('abcd-1234')).toBeInTheDocument();
    });
  });

  describe('Creating a Flight Plan', () => {
    test('should display a button to draw a new Flight Plan', async () => {
      await act(async () => {
        render(<EditorPage />);
      });
      expect(screen.getByText('New Flight Plan')).toBeInTheDocument();
    });

    test('should display a button to cancel and a new button to create the new Flight Plan', async () => {
      await act(async () => {
        render(<EditorPage />);
      });

      expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
      expect(screen.queryByText('Create Flight Plan')).not.toBeInTheDocument();

      userEvent.click(screen.getByText('New Flight Plan'));
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Create Flight Plan')).toBeInTheDocument();
    });

    test('should disable the create button if there are less that 2 points in the flight plans', async () => {
      const postSpy = jest.spyOn(FlightPlansAPIImport, 'post');

      await act(async () => {
        render(<EditorPage />);
      });
      userEvent.click(screen.getByText('New Flight Plan'));
      userEvent.click(screen.getByText('Create Flight Plan'));

      expect(postSpy).not.toHaveBeenCalled();
      expect(screen.queryByText('Please enter a name for your Flight Plan')).not.toBeInTheDocument();
    });

    test('should create a new flight plan', async () => {
      const postSpy = jest.spyOn(FlightPlansAPIImport, 'post');
      const { mapLatestProps } = await renderEditorPageWithChildrenSpies();

      userEvent.click(screen.getByText('New Flight Plan'));

      // Add some points
      act(() => {
        mapLatestProps().onClick([111, 222]);
      });

      act(() => {
        mapLatestProps().onClick([333, 444]);
      });
      // Type a title
      userEvent.type(screen.getByRole('textbox'), 'My new title');

      userEvent.click(screen.getByText('Create Flight Plan'));

      expect(postSpy).toHaveBeenCalledWith({
        title: 'My new title',
        points: [
          [111, 222],
          [333, 444],
        ],
      });
      const newlyCreated = await screen.findByText('My new title');
      expect(newlyCreated).toBeInTheDocument();
    });
  });
});
