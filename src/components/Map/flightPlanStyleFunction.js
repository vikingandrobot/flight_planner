import { Stroke, Style, Fill } from 'ol/style';
import { Circle } from 'ol/geom';

// Received the vector feature and returns the corresponding styles.
export default function flightPlanStyleFunction(feature) {
  const styles = [
    // linestring
    new Style({
      stroke: new Stroke({
        color: '#31a4eb',
        width: 3,
      }),
      zIndex: 0,
    }),
  ];

  const coordinates = feature.getGeometry().getCoordinates();

  return styles.concat(coordinates.map(coordinate => new Style({
    geometry: new Circle(coordinate, 4),
    fill: new Fill({
      color: '#6bc7ff',
    }),
    stroke: new Stroke({
      color: '#31a4eb',
      width: 2,
    }),
    zIndex: 1,
  })));
}
