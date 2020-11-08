import React, { useState } from 'react';
import { Input, Typography, Layout } from 'antd';
import { fromLonLat } from 'ol/proj';

import Map from '../../components/Map/Map';
import FlightPlanList from '../../components/FlightPlanList/FlightPlanList';

import useFlightPlans from '../../hooks/useFlightPlans';

import NewFlightActions from './components/NewFlightActions';
import DefaultActions from './components/DefaultActions';
import FlightPlanNameModal from './components/FlightPlanNameModal';
import useDraftFlightPlan from './hooks/useDraftFlightPlan';

import styles from './EditorPage.module.scss';

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

// Rolex Learning Center
const INITIAL_CENTER = fromLonLat([6.5685000, 46.5185000]);
const zoom = 17;

function EditorPage() {
  const { isLoading, flightPlans, add } = useFlightPlans();
  const draft = useDraftFlightPlan();
  const [selectedFlightPlanId, setSelectedFlightPlanId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleNew() {
    draft.createDraft();
    setSelectedFlightPlanId(null);
  }

  function createNewFlightPlan(fp) {
    add(fp)
      .finally(() => {
        draft.clearDraft();
      });
  }

  function handleCreate() {
    if (!draft.currentDraft.title) {
      setIsModalOpen(true);
    } else {
      createNewFlightPlan(draft.currentDraft);
    }
  }

  function handleCancel() {
    draft.clearDraft();
  }

  function handleSelect({ id }) {
    draft.clearDraft();
    setSelectedFlightPlanId(id);
  }

  function handleTitleChange(e) {
    draft.updateTitle(e.target.value);
  }

  function handleDraftClick(coordinate) {
    draft.updatePoints([...draft.currentDraft.points, coordinate]);
  }

  return (
    <div className={styles.editorPage}>
      <Header className={styles.pageHeader}>
        <Title level={1}>Flight Planner</Title>
      </Header>
      <Layout className={styles.editorContent}>
        <header className={styles.editorHeader}>
          <div>
            {draft.isEditing && (
              <Input
                placeholder="Flight Plan name"
                onChange={handleTitleChange}
              />
            )}
          </div>

          <div className={styles.actionsContainer}>
            {draft.isEditing ?
            <NewFlightActions
              onCreate={handleCreate}
              onCancel={handleCancel}
              disabled={!draft.currentDraft || draft.currentDraft.points.length < 2}
            /> :
            <DefaultActions onNew={handleNew} />}
          </div>
        </header>
        <Layout>
          <Content>
            <Map
              center={INITIAL_CENTER}
              className={styles.editorMap}
              fitViewToFlightPlan={!draft.isEditing}
              flightPlan={draft.isEditing ? draft.currentDraft : (selectedFlightPlanId && flightPlans.find(fp => fp.id === selectedFlightPlanId))}
              onClick={draft.isEditing ? handleDraftClick : null}
              zoom={zoom}
            />
          </Content>
          <Sider width={250}>
            <FlightPlanList
              className={styles.editorFlightList}
              currentId={selectedFlightPlanId}
              flightPlans={flightPlans}
              loading={isLoading}
              onRowClick={handleSelect}
            />
          </Sider>
        </Layout>
        {isModalOpen && (
          <FlightPlanNameModal
            onCancel={() => { setIsModalOpen(false); }}
            onSubmit={(title) => {
              setIsModalOpen(false);
              const newDraft = { ...draft.currentDraft, title };
              createNewFlightPlan(newDraft);
            }}
          />
        )}
      </Layout>
    </div>
  );
}

export default EditorPage;
