import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import 'ol/ol.css';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import ResizeObserver from 'resize-observer-polyfill';

import flightPlanStyleFunction from './flightPlanStyleFunction';

import styles from './Map.module.scss';

function Map({
  className = '',
  center = [0, 0],
  zoom = 1,
  onClick,
  fitViewToFlightPlan,
  flightPlan = null,
}) {
  const targetRef = useRef(null);
  const mapRef = useRef(null);
  const viewRef = useRef(null);
  const flightPlanSourceRef = useRef(new VectorSource());
  const sizeObserverRef = useRef();

  const hasFlightPlan = !!flightPlan;

  const handleClick = useCallback((e) => {
    if (onClick) {
      onClick(e.coordinate);
    }
  }, [onClick]);

  useEffect(() => {
    function createMap() {
      if (targetRef.current && !mapRef.current) {
        viewRef.current = new View({ center, zoom });

        mapRef.current = new OlMap({
          view: viewRef.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            new VectorLayer({
              source: flightPlanSourceRef.current,
              style: flightPlanStyleFunction,
            })
          ],
          target: targetRef.current,
        });

        // Size observer for the map
        sizeObserverRef.current = new ResizeObserver(() => {
          mapRef.current.updateSize()
        });
        sizeObserverRef.current.observe(targetRef.current);
      }
    }

    createMap();

    return () => {
      // Clean up
      if (sizeObserverRef.current) {
        sizeObserverRef.current.disconnect();
      }
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && onClick) {
      mapRef.current.un('click', handleClick);
      mapRef.current.on('click', handleClick);
    }

    return () => {
      mapRef.current.un('click', handleClick);
    }
  }, [onClick, handleClick]);

  useEffect(() => {
    flightPlanSourceRef.current.clear();
    if (flightPlan) {
      const feature = new Feature({
        geometry: new LineString(flightPlan.points),
      });
      flightPlanSourceRef.current.addFeature(feature);

      if (fitViewToFlightPlan && viewRef.current) {
        viewRef.current.fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
      }
    }
  }, [hasFlightPlan, JSON.stringify(flightPlan?.points)])

  return (
    <div ref={targetRef} className={`${styles.mapContainer} ${className}`} />
  )
}

Map.propTypes = {
  // A class name to pass to the map container to modify its style
  className: PropTypes.string,
  // Center of the map
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  fitViewToFlightPlan: PropTypes.bool,
  flightPlan: PropTypes.shape({
    points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  })
};

export default Map;
