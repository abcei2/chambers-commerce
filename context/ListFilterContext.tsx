import { createContext, useEffect, useState } from "react";
import { filterFields } from "../constants";
import { HEATMAP_BASE_JSON } from "../constants/map";

const ListFilterContext = createContext<any>(null);


const PAGE_SIZE = 4
const ListFilterContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [selectsOption, setSelectOption] = useState<any>()
    const [filterOptions, setFilterOptions] = useState<any>({})

    const [listFilterData, setListFilterData] = useState()
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
        updateData()
    }, [])

    useEffect(
        () => {
            updateData(filterOptions)
        }, [page]
    )
    
    const updateData = (filterOptions: any = {}) => {
        fetch(
            "/api/db/organizations/pagination?" + new URLSearchParams({
                page: page.toString(),
                size: PAGE_SIZE.toString(),
                ...filterOptions
            })
        ).then(
            (data) => data.json()
        ).then(
            (chartsDataJson) => setListFilterData(chartsDataJson.data)
        )
    }

    return (
        <ListFilterContext.Provider value={{ 
            listFilterData, updateData, selectsOption, 
            setSelectOption, filterOptions, setFilterOptions, page, setPage, PAGE_SIZE
            }}>
            {props.children}
        </ListFilterContext.Provider>
    );
};

export { ListFilterContextProvider, ListFilterContext };