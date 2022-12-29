import { createContext, useEffect, useState } from "react";
import { filterFields, filterFieldsNoLocationsInfo } from "../constants";
import { CIRCLE_COLORS, HEATMAP_BASE_JSON } from "../constants/map";
import useComponentVisible from "../hooks/useComponentVisible";
import writeXlsxFile from 'write-excel-file'
import { getOrganizationSchema } from "../utils/excel";



const HeatMapContext = createContext<any>(null);


const PAGE_SIZE = 4
const HeatMapContextProvider = (props: {
    children: React.ReactNode,
    locationId?:string,
    capacityId?:string,
    filterByLocation?:boolean
}) => {

    const [locationId, setLocationId] = useState<any>(props.locationId)

    const { ref: filterDiv, isComponentVisible: isFilterDivVisible, setIsComponentVisible: setIsFilterDivVisible } = useComponentVisible(false);
    const [selectsOption, setSelectOption] = useState<any>()
    const [filterOptions, setFilterOptions] = useState<any>({})
    const [locationsOptions, setLocationsOptions] = useState()

    const [heatMapData, setHeatMapData] = useState(HEATMAP_BASE_JSON)
    const [showPopup, setShowPopup] = useState(false)
    const [popUpCoordinates, setPopUpCoordinates] = useState({
        showPopup: false,
        latitude: 6.251029,
        longitude: -75.580353,
        info: null
    })

    const [capacitiesList, setCapacitiesList] = useState()
    const [currentCapacity, setCurrentCapacity] = useState()
    const [pageAmount, setPageAmount] = useState(0)
    const [page, setPage] = useState(0)

    useEffect(
        ()=>{
            setLocationId(props.locationId)
        },[props.locationId]
    )

    useEffect(() => {
        if (showPopup) {
            setPopUpCoordinates((oldCoordinates) => ({
                ...oldCoordinates,
                showPopup,
            }))
            setShowPopup(false)
        }
    }, [showPopup])

    useEffect(() => {
        //LOAD FILTER OPTIONS
        const {locationId:locId, ...filterFieldsNoLocId} = filterFields
        Object.keys(locationId ? filterFieldsNoLocationsInfo : filterFieldsNoLocId).forEach(
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

        updateHeapmapData()
        updateCapacitiesList()
        allLocationNamesAndId()
      
    }, [])

    useEffect(
        () =>{
            if (props.capacityId)
                updateCurrentCapacity(props.capacityId)
        }, [props.capacityId]
    )
    useEffect(
        () => {
            updateCapacitiesList(filterOptions)
        }, [page]
    )

    const allLocationNamesAndId = ()=>{
        fetch("/api/db/locations/distincts?" + new URLSearchParams({
            field: "organization",
        })).then(
            response => response.json()
        ).then(
            (jsonData) => {
                if(props.filterByLocation)
                {
                    setSelectOption(
                        (oldSelectOpts: any) => {
                            return {
                                ...oldSelectOpts,
                                locationId: jsonData
                            }
                        }
                    )
                }
                setLocationsOptions(jsonData)
            }
        )
    }

    const updateCurrentCapacity = (capacityId:string) =>{
        fetch("/api/db/organizations/findUnique?id=" + capacityId).then(
            (resp) => resp.json()
        ).then(
            (jsonData) => setCurrentCapacity(jsonData.data)
        )
    }

    const downloadOrganizationData = async() =>{
        const excelObjects = heatMapData.features.reduce(
            (prevtFeature: any, currentFeature: any) => [...prevtFeature, ...currentFeature.properties.organizations],[]
        )

        await writeXlsxFile(excelObjects, {
            schema:getOrganizationSchema(),
            fileName: 'file.xlsx'
        })
        
    }
    const clearPopup = () =>{
        setShowPopup(false)
        setPopUpCoordinates(
            (oldData: any) => (
                {
                    ...oldData,
                    showPopup: false
                }
            )
        )
    }
    
    const updateHeapmapData = (filterOptions: any = {}, locationIdParam:string=locationId) => {
        const queryData = {
            ...filterOptions,
            ...(locationIdParam?{ locationId: locationIdParam }:{})
        }
        fetch("/api/db/locations/filtering?" + new URLSearchParams(queryData)).then(
            response => response.json()
        ).then(
            (jsonData) => {
                const locationDataArray = jsonData.data
                if (locationDataArray.length == 1){
                    setPopUpCoordinates(
                        {
                            showPopup: false,
                            latitude: locationDataArray[0].lat,
                            longitude: locationDataArray[0].long,
                            info: locationDataArray[0]
                        }
                    )
                    setShowPopup(true)
                }
                setHeatMapData(
                    (oldHeatMapData: any) => {
                        return {
                            ...oldHeatMapData,
                            features: [...locationDataArray.map(
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
                                    }
                                }
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
                ...({ locationId } || {}),
                ...filterOptions
            })
        ).then(
            (data) => data.json()
        ).then(
            (chartsDataJson) => {
                setCapacitiesList(chartsDataJson.data)
                setPageAmount(chartsDataJson.pageAmount)
            }
        )
    }

    const updateData = (filterOptions: any = {}) => {
        updateCapacitiesList(filterOptions)
        if(!locationId)
            updateHeapmapData(filterOptions)
    }

    return (
        <HeatMapContext.Provider value={{
            heatMapData, updateHeapmapData,
            popUpCoordinates, setPopUpCoordinates, 
            setShowPopup, showPopup, clearPopup,

            capacitiesList, updateCapacitiesList, 
            currentCapacity, updateCurrentCapacity,
            pageAmount,
            page, setPage, PAGE_SIZE,

            updateData,
            selectsOption, setSelectOption,
            filterOptions, setFilterOptions,
            filterDiv, isFilterDivVisible, setIsFilterDivVisible,

            downloadOrganizationData,

            locationsOptions,

            locationId
        }}>
            {props.children}
        </HeatMapContext.Provider>
    );
};

export { HeatMapContextProvider, HeatMapContext };