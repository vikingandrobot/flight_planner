import { useState } from 'react';

function useDraftFlightPlan() {
  const [currentDraft, setCurrentDraft] = useState(null);

  function createDraft() {
    setCurrentDraft({ title: null, points: [] });
  }

  function clearDraft() {
    setCurrentDraft(null);
  }

  function updateTitle(title) {
    setCurrentDraft(prev => ({ ...prev, title }));
  }

  function updatePoints(points) {
    setCurrentDraft(prev => ({ ...prev, points }));
  }

  return {
    createDraft,
    clearDraft,
    updateTitle,
    updatePoints,
    currentDraft,
    isEditing: currentDraft !== null,
  };
}

export default useDraftFlightPlan;
