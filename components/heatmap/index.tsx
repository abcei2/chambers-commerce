import { useRef, useEffect, useContext, ReactNode } from 'react';
import { Map, Source, Layer, NavigationControl } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import { HeatMapContext } from '../../context/HeatMapContext';
import 'mapbox-gl/dist/mapbox-gl.css'


const clusterLayer: LayerProps = {
    id: 'clusters',
    type: 'circle',
    source: 'organizations',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 20, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

const clusterCountLayer: LayerProps = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'organizations',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};


const unclusteredPointLayer = (sourceName:string): LayerProps => ({
    id: 'unclustered-point',
    type: 'circle',
    source: sourceName,
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': ['get', 'color'],
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
});

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here


const HeatMap = (props:{
    children:ReactNode
}) => {
    const mapRef = useRef<MapRef>(null);
    const { updateData, heatMapData } = useContext(HeatMapContext)

    useEffect(() => {
        updateData()
    }, [])

    const onClick = (event: any) => {
        if (!mapRef.current || !event.features)
            return
        const feature = event.features[0];

        const mapboxSource = mapRef.current.getSource('organizations') as GeoJSONSource;

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
        <Map
            initialViewState={{
                latitude: 6.251029,
                longitude: -75.580353,
                zoom: 12
            }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
            onClick={onClick}
            style={
                {
                    borderRadius:"20px"
                }
            }
            ref={mapRef}
        >
            {props.children}
            <NavigationControl position='top-right' />
            <Source
                id="organizations"
                type="geojson"
                data={heatMapData}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                
            </Source>
            <Source
                id="organizations"
                type="geojson"
                data={heatMapData}
            >
                <Layer {...unclusteredPointLayer("organizations")} />
            </Source>
        </Map >
    );
}
export default HeatMap