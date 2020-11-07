import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'ol/ol.css';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import styles from './Map.module.scss';

const defaultViewOptions = {
  center: [0, 0],
  zoom: 1,
};

function Map({ className = '', viewOptions = defaultViewOptions }) {
  const targetRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    function createMap() {
      if (targetRef.current) {
        mapRef.current = new OlMap({
          view: new View(viewOptions),
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          target: targetRef.current,
        });
      }
    }

    createMap();
  }, []);

  return (
    <div ref={targetRef} className={`${styles.mapContainer} ${className}`} />
  )
}

Map.propTypes = {
  // A class name to pass to the map container to modify its style
  className: PropTypes.string,
  // Options for the Open Layers view
  viewOptions: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
  }),
};

export default Map;
