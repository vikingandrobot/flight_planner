import { useState, useEffect } from 'react';
import { get, post } from '../api/FlightPlansAPI';

function useFlightPlans() {
  const [flightPlans, setFlightPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get()
      .then(setFlightPlans)
      .finally(() => setIsLoading(false));
  }, []);

  function addFlightPlan(flightPlan) {
    setIsLoading(true);
    return post(flightPlan)
      .then(get)
      .then(setFlightPlans)
      .finally(() => setIsLoading(false));
  }

  return {
    add: addFlightPlan,
    flightPlans,
    isLoading,
  };
}

export default useFlightPlans;
