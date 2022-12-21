import { createContext, useState } from "react";

const HeatMapContext = createContext<any>(null);

const HEATMAP_BASE_JSON: any = {
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": []
}

const HeatMapContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [heatMapData, setHeatMapData] = useState(HEATMAP_BASE_JSON)   


    const updateData = (filterOptions:any={})=>{
        fetch("/api/db/locations/filtering?" + new URLSearchParams(filterOptions)).then(
            response => response.json()
        ).then(
            (jsonData) => {
                const locationDataArray = jsonData.data
                console.log(locationDataArray)
                setHeatMapData(
                    (oldHeatMapData: any) => {
                        return {
                            ...oldHeatMapData,
                            features: [ ...locationDataArray.map(
                                (locationData: any) => ({
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "Point",
                                        coordinates: [locationData.long || 0, locationData.lat || 0, 7.64]
                                    }
                                })
                            )]
                        }
                    }
                )
            }
        )
    }

    return (
        <HeatMapContext.Provider value={{ heatMapData, updateData }}>
            {props.children}
        </HeatMapContext.Provider>
    );
};

export { HeatMapContextProvider, HeatMapContext };