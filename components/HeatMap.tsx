import * as React from 'react';
import { useRef } from 'react';
import { render } from 'react-dom';
import { Map, Source, Layer } from 'react-map-gl';


import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';

const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here

function ControlPanel() {
    return (
        <div className="control-panel">
            <h3>Create and Style Clusters</h3>
            <p>Use Mapbox GL JS' built-in functions to visualize points as clusters.</p>
            <div className="source-link">
                <a
                    href="https://github.com/visgl/react-map-gl/tree/7.0-release/examples/clusters"
                    target="_new"
                >
                    View Code ↗
                </a>
            </div>
        </div>
    );
}

const data: any = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] } },
        { "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-150.4048, 63.1224, 105.5] } },
        { "type": "Feature", "properties": { "id": "ak16994517", "mag": 1.6, "time": 1507424832518, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.3597, 63.0781, 0.0] } },
        { "type": "Feature", "properties": { "id": "ci38021336", "mag": 1.42, "time": 1507423898710, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-118.497, 34.299667, 7.64] } },
        { "type": "Feature", "properties": { "id": "us2000b2nn", "mag": 4.2, "time": 1507422626990, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-87.6901, 12.0623, 46.41] } },
        { "type": "Feature", "properties": { "id": "ak16994510", "mag": 1.6, "time": 1507422449194, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-151.5053, 63.0719, 0.0] } },
        { "type": "Feature", "properties": { "id": "us2000b2nb", "mag": 4.6, "time": 1507420784440, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-178.4576, -20.2873, 614.26] } },
        { "type": "Feature", "properties": { "id": "ak16994298", "mag": 2.4, "time": 1507419370097, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-148.789, 63.1725, 7.5] } },
        { "type": "Feature", "properties": { "id": "nc72905861", "mag": 1.39, "time": 1507418785100, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-120.993164, 36.421833, 6.37] } },
        { "type": "Feature", "properties": { "id": "ci38021304", "mag": 1.11, "time": 1507418426010, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [-117.0155, 33.656333, 12.37] } }]
}



const HeatMap = () => {
    const mapRef = useRef<MapRef>(null);

    const onClick = (event: any) => {
        if (!mapRef.current)
            return
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = mapRef.current.getSource('earthquakes') as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            mapRef.current?.easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500
            });
        });
    };

    return (
        <>
            <div className="w-full h-full absolute">
                <Map
                    initialViewState={{
                        latitude: 40.67,
                        longitude: -103.59,
                        zoom: 3
                    }}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    interactiveLayerIds={[clusterLayer.id || ""]}
                    onClick={onClick}

                    ref={mapRef}
                >
                    <Source
                        id="earthquakes"
                        type="geojson"
                        data={data}
                        cluster={true}
                        clusterMaxZoom={14}
                        clusterRadius={50}
                    >
                        <Layer {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                        <Layer {...unclusteredPointLayer} />
                    </Source>
                </Map>
            </div>
            <div className="w-full h-full absolute flex justify-end items-center p-10 ">
                <div className='bg-zinc-300 w-96 h-[70%] rounded'>
                    <div className='flex justify-center flex-col p-10 gap-5'>
                        <div className='grid grid-cols-2 w-[70%] gap-5'>
                            <label>Carácter</label>
                            <select className='w-32'>
                                <option value="private">Privado</option>
                                <option value="public">Pública</option>
                                <option value="mix">Mixta</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-2 w-[70%] gap-5'>
                            <label>Categoria</label>                                  
                            <select className='w-32'>
                                <option value="Institución Técnica Profesional.">Institución Técnica Profesional.</option>
                                <option value="Institución Tecnológica.">Institución Tecnológica.</option>
                                <option value="mix">Institución Universitaria/ Escuela Tecnológica.</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-2 w-[70%] gap-5'>
                            <label>Categoria</label>
                            <select className='w-32'>
                                <option value="Institución Técnica Profesional.">Institución Técnica Profesional.</option>
                                <option value="Institución Tecnológica.">Institución Tecnológica.</option>
                                <option value="mix">Institución Universitaria/ Escuela Tecnológica.</option>
                            </select>
                        </div>
                        <div className='grid grid-cols-2 w-[70%] gap-5'>
                            <label>Categoria</label>
                            <select className='w-32'>
                                <option value="Institución Técnica Profesional.">Institución Técnica Profesional.</option>
                                <option value="Institución Tecnológica.">Institución Tecnológica.</option>
                                <option value="mix">Institución Universitaria/ Escuela Tecnológica.</option>
                            </select>
                        </div>
                        <button>Save</button>
                    </div>
                </div>

            </div>
        </>
    );
}
export default HeatMap