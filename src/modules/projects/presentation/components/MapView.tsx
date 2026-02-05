import { useEffect, useRef } from 'react';
import { Project } from '@modules/projects/data/models/Projects.interface';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export const MapView = ({ projects }: { projects: Project[] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.0817, 4.6097], 
      zoom: 2
    });

    if (projects.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      projects.forEach((project) => {
        const coords: [number, number] = [project.position.lng, project.position.lat];
        bounds.extend(coords);
        new mapboxgl.Marker({ color: 'var(--secondary-500)' })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${project.title}</h4>`))
          .addTo(map);
      });

      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000
      });
    }

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(mapContainer.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [projects]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />;
};
