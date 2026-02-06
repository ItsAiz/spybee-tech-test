import { useEffect, useRef } from 'react';
import { Project } from '@modules/projects/data/models/Projects.interface';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

export const MapView = ({ projects }: { projects: Project[] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.0817, 4.6097],
        zoom: 2,
      });
      const resizeObserver = new ResizeObserver(() => {
        mapRef.current?.resize();
      });
      resizeObserver.observe(mapContainer.current);
    }

    const map = mapRef.current;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (projects.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      projects.forEach((project) => {
        const coords: [number, number] = [project.position.lng, project.position.lat];
        bounds.extend(coords);
        const marker = new mapboxgl.Marker({ color: 'var(--secondary-500)' })
          .setLngLat(coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${project.title}</h4>`))
          .addTo(map);

        markersRef.current.push(marker);
      });

      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 1000,
      });
    }
  }, [projects]);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%', borderRadius: '8px' }} />;
};
