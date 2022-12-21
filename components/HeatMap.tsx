import { useRef, useEffect, useState } from 'react';
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


const data: any = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
}




const HeatMap = () => {
    const mapRef = useRef<MapRef>(null);
    const [heatMapData, setHeatMapData] = useState(data)

    useEffect(() => {
        fetch("/api/db/locations/getall").then(
            response => response.json()
        ).then(
            (jsonData) => {
                const locationDataArray = jsonData.data
                setHeatMapData(
                    (oldHeatMapData: any) =>{
                        return {
                        ...oldHeatMapData,
                            features: [...oldHeatMapData.features, ...locationDataArray.map(
                            (locationData: any) => ({
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    type: "Point",
                                    coordinates: [locationData.long || 0, locationData.lat || 0, 7.64]
                                }                                
                            })
                        )]}
                    }
                )
            }
        )
    }, [])

    const onClick = (event: any) => {
        if (!mapRef.current)
            return
        const feature = event.features[0];

        const mapboxSource = mapRef.current.getSource('earthquakes') as GeoJSONSource;

        if (!feature)
            return

        const clusterId = feature.properties.cluster_id;

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

    if (heatMapData.features.lenght==0)
        return <></>

    return (
        <>
            <div className="w-full h-full absolute">
                <Map
                    initialViewState={{
                        latitude: 6.251029,
                        longitude: -75.580353,
                        zoom: 12
                    }}
                    mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    interactiveLayerIds={[clusterLayer.id || ""]}
                    onClick={onClick}

                    ref={mapRef}
                >
                    <Source
                        id="earthquakes"
                        type="geojson"
                        data={heatMapData}
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
            <div className="w-full flex justify-end">
                <div className='bg-zinc-300 w-80 h-[70%] rounded fixed m-10'>
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