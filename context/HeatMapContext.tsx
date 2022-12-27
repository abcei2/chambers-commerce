import { createContext, useState } from "react";
import { HEATMAP_BASE_JSON } from "../constants/map";

const HeatMapContext = createContext<any>(null);


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
                setHeatMapData(
                    (oldHeatMapData: any) => {
                        return {
                            ...oldHeatMapData,
                            features: [ ...locationDataArray.map(
                                (locationData: any) => {
                                    console.log(locationData.organizations)
                                    return {
                                    type: "Feature",
                                    properties: {
                                        color: "#11b4da",
                                        ...locationData

                                    },
                                    geometry: {
                                        type: "Point",
                                        coordinates: [locationData.long || 0, locationData.lat || 0, 0]
                                    }
                                }}
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