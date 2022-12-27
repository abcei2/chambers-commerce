import { createContext, useEffect, useState } from "react";
import { filterFields } from "../constants";
import { HEATMAP_BASE_JSON } from "../constants/map";

const HeatMapContext = createContext<any>(null);


const HeatMapContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [heatMapData, setHeatMapData] = useState(HEATMAP_BASE_JSON)   
    const [selectsOption, setSelectOption] = useState<any>()
    const [filterOptions, setFilterOptions] = useState<any>({})

    useEffect(() => {
        //LOAD FILTER OPTIONS
        Object.keys(filterFields).forEach(
            (filterKey: any) => {
                fetch("/api/db/organizations/distincts?" + new URLSearchParams({
                    field: filterKey,
                })).then(
                    (distinctsNames) => distinctsNames.json()
                ).then(
                    (distincsJson) => setSelectOption(
                        (oldSelectOpts: any) => {
                            return {
                                ...oldSelectOpts,
                                [filterKey]: distincsJson.map(
                                    (distinctName: string) => ({ value: distinctName, label: distinctName })
                                )
                            }
                        }
                    )
                )
            }
        )
        //UPDATE HEATMAPDATA
        updateData()
    }, [])

    useEffect(() => {
       
        //UPDATE HEATMAPDATA
        updateData()
    }, [])
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
        <HeatMapContext.Provider value={{ heatMapData, updateData, selectsOption, setSelectOption, filterOptions, setFilterOptions }}>
            {props.children}
        </HeatMapContext.Provider>
    );
};

export { HeatMapContextProvider, HeatMapContext };