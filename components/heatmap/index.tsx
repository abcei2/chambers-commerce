import { useRef, useEffect, useContext, ReactNode, useState } from 'react';
import { Map, Source, Layer, NavigationControl, Popup, PointLike } from 'react-map-gl';
import type { MapRef } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';
import { HeatMapContext } from '../../context/HeatMapContext';
import 'mapbox-gl/dist/mapbox-gl.css'
import Profile from '../information/Profile';


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


export const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'organizations',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': ['get', 'color'],
        'circle-radius': 10,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    },
};

export const unclusteredPointTextLayer: LayerProps = {
    id: 'unclustered-labels',
    type: 'symbol',
    source: 'organizations',
    filter: ['!', ['has', 'point_count']],
    layout: {
        'text-field': ["slice", ['get', 'category'], 0, 1],
        'text-font': ['DIN Offc Pro Medium',],
        'text-size': 14,
    },
    paint: {
        'text-color': 'black'
    }
};


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here


const HeatMap = (props: {
    children: ReactNode
}) => {
    const mapRef = useRef<MapRef>(null);

    const { showPopup, heatMapData, popUpCoordinates, setPopUpCoordinates, setShowPopup } = useContext(HeatMapContext)

    useEffect(() => {
        if (mapRef.current && showPopup)
            mapRef.current.flyTo({ center: [popUpCoordinates.longitude, popUpCoordinates.latitude], duration: 2000 });

    }, [popUpCoordinates, showPopup])

    const onClick = (event: any) => {
        if (!mapRef.current)
            return

        const bbox: PointLike | [PointLike, PointLike] = [
            [event.point.x - 5, event.point.y - 5],
            [event.point.x + 5, event.point.y + 5]
        ];
        // Find features intersecting the bounding box.
        const selectedFeatures: any = mapRef.current.queryRenderedFeatures(bbox, {
            layers: ['unclustered-point']
        });
        if (selectedFeatures.length > 0) {
            setShowPopup(true)
            setPopUpCoordinates({
                showPopup: false,
                latitude: selectedFeatures[0].geometry.coordinates[1],
                longitude: selectedFeatures[0].geometry.coordinates[0],
                info: selectedFeatures[0].properties
            })

        } else {

            setShowPopup(false)
            setPopUpCoordinates({
                ...popUpCoordinates,
                showPopup: false,
            })
        }

        event.originalEvent.stopPropagation();

    };


    return (
        <Map
            initialViewState={heatMapData.features.length == 1 ? {
                latitude: heatMapData.features[0].geometry.coordinates[1],
                longitude: heatMapData.features[0].geometry.coordinates[0],
                zoom: 15
            } : {
                latitude: 6.251029,
                longitude: -75.580353,
                zoom: 12
            }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            mapboxAccessToken={MAPBOX_TOKEN}
            onClick={onClick}
            ref={mapRef}
            style={{ borderRadius: "20px" }}
        >
            {props.children}

            {
                popUpCoordinates.showPopup && <Popup
                    {...popUpCoordinates}

                    anchor="bottom"
                    className="mapboxgl-popup-content"
                    onClose={() => setPopUpCoordinates(
                        {
                            ...popUpCoordinates,
                            showPopup: false
                        }
                    )}>
                    <Profile {...popUpCoordinates} />
                </Popup>
            }
            <NavigationControl position='top-right' />
            {
                heatMapData.features.length > 0 && <Source
                    id="organizations"
                    type="geojson"
                    data={heatMapData}
                    cluster={heatMapData.features.length > 1}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    {heatMapData.features.length > 1 && <Layer {...clusterLayer} />}
                    {heatMapData.features.length > 1 && <Layer {...clusterCountLayer} />}
                    <Layer {...unclusteredPointLayer} />
                    <Layer {...unclusteredPointTextLayer} />

                </Source>
            }



        </Map >
    );
}
export default HeatMap