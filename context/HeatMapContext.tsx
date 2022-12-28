import { createContext, useEffect, useState } from "react";
import { filterFields } from "../constants";
import { HEATMAP_BASE_JSON } from "../constants/map";

const HeatMapContext = createContext<any>(null);
const CIRCLE_COLORS:any  = {
    'Institución Tecnológica': "#11b4da",
    'Unidades I+D': "#6fdc7f",
    'Centros de Innovación': "#c8dc6f",
    'Institución Universitaria/Escuela Tecnológica': "#dcb26f",
    'Universidad': "#dc6f6f" ,
    'Centros de Ciencia': "#c46fdc" ,
    'Centros de Investigación': "#47a4c9" ,
}

const PAGE_SIZE = 4
const HeatMapContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [selectsOption, setSelectOption] = useState<any>()
    const [filterOptions, setFilterOptions] = useState<any>({})


    const [heatMapData, setHeatMapData] = useState(HEATMAP_BASE_JSON)   

    const [capacitiesList, setCapacitiesList] = useState()
    const [page, setPage] = useState(0)

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
        updateHeapmapData()
        updateCapacitiesList()
    }, [])
    useEffect(
        () => {
            updateCapacitiesList(filterOptions)
        }, [page]
    )


    const updateHeapmapData = (filterOptions:any={})=>{
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
                                        color: CIRCLE_COLORS[locationData.category],
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

    const updateCapacitiesList = (filterOptions: any = {}) => {
        fetch(
            "/api/db/organizations/pagination?" + new URLSearchParams({
                page: page.toString(),
                size: PAGE_SIZE.toString(),
                ...filterOptions
            })
        ).then(
            (data) => data.json()
        ).then(
            (chartsDataJson) => setCapacitiesList(chartsDataJson.data)
        )
    }

    const updateData = (filterOptions: any = {}) => {
        updateCapacitiesList(filterOptions)
        updateHeapmapData(filterOptions)
    }

    return (
        <HeatMapContext.Provider value={{ heatMapData, updateHeapmapData,
            capacitiesList, updateCapacitiesList, 
            updateData,
            selectsOption, setSelectOption, 
            filterOptions, setFilterOptions, 
            page, setPage, PAGE_SIZE 
        }}>
            {props.children}
        </HeatMapContext.Provider>
    );
};

export { HeatMapContextProvider, HeatMapContext };