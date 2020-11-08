import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { PlusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { fromLonLat } from 'ol/proj';

import Map from '../../components/Map/Map';

import styles from './EditorPage.module.scss';

const { Title } = Typography;

const LONGITUDE = 6.5685000;
const LATITUDE = 46.5185000;

const center = fromLonLat([LONGITUDE, LATITUDE]);
const zoom = 17;

function NewFlightActions({ onCreate, onCancel, disabled }) {
  return (
    <>
      <Button
        type="primary"
        onClick={onCreate}
        disabled={disabled}
        icon={<CheckCircleOutlined />}
      >
        Create Flight Plan
      </Button>
      <Button
        onClick={onCancel}
      >
        Cancel
      </Button>
    </>
  )
}

function DefaultActions({ onNew }) {
  return (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={onNew}
    >
      New Flight Plan
    </Button>
  )
}

function EditorPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [flightPlans, setFlightPlans] = useState([]);
  const [draftFlightPlan, setDraftFlightPlan] = useState(null);

  function handleNew() {
    setIsCreating(true);
    setDraftFlightPlan({ title: null, points: [] });
  }

  function handleCreate() {
    setFlightPlans([...flightPlans, draftFlightPlan]);
    setDraftFlightPlan(null);
    setIsCreating(false);
  }

  function handleCancel() {
    setIsCreating(false);
    setDraftFlightPlan(null);
  }

  function handleTitleChange(e) {

    setDraftFlightPlan(prevDraft => ({ ...prevDraft, title: e.target.value }));
  }

  function handleDraftClick(coordinate) {
    setDraftFlightPlan(prevDraft => ({ ...prevDraft, points: [...draftFlightPlan.points, coordinate] }));
  }

  return (
    <div className={styles.editorPage}>
      <header className={styles.pageHeader}>
        <Title level={1}>Flight Planner</Title>
      </header>
      <section className={styles.editorContent}>
        <header className={styles.editorHeader}>
          <div>
            {isCreating && (
              <Input
                placeholder="Flight Plan name"
                onChange={handleTitleChange}
              />
            )}
          </div>

          <div className={styles.actionsContainer}>
            {isCreating ?
            <NewFlightActions
              onCreate={handleCreate}
              onCancel={handleCancel}
              disabled={!draftFlightPlan || draftFlightPlan.points.length < 2}
            /> :
            <DefaultActions onNew={handleNew} />}
          </div>
        </header>
        <div className={styles.editorMapContainer}>
          <Map
            className={styles.editorMap}
            center={center}
            zoom={zoom}
            onClick={isCreating ? handleDraftClick : null}
            flightPlan={draftFlightPlan}
          />
        </div>
      </section>
    </div>
  );
}

export default EditorPage;
