import React from 'react';
import { fromLonLat } from 'ol/proj';

import Map from '../components/Map/Map';

import styles from './EditorPage.module.scss';

const LONGITUDE = 6.5685000;
const LATITUDE = 46.5185000;

const viewOptions = {
  center: fromLonLat([LONGITUDE, LATITUDE]),
  zoom: 17
}

function EditorPage() {
  return (
    <div className={styles.editorPage}>
      <header>
        <h1>Flight Planner</h1>
      </header>
      <section className={styles.editorMapContainer}>
        <Map
          className={styles.editorMap}
          viewOptions={viewOptions}
        />
      </section>
    </div>
  );
}

export default EditorPage;
