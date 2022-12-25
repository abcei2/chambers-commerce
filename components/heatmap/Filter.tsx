import { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import { filterFields } from "../../constants";
import { HeatMapContext } from "../../context/HeatMapContext";

const Filter = () => {

    const [selectsOption, setSelectOption] = useState<any>()
    const [filterOptions, setFilterOptions] = useState<any>({})
    const { updateData } = useContext(HeatMapContext)


    useEffect(() => {
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
    }, [])

    const submitFilters = (ev: any) => {
        ev.preventDefault()

        updateData(filterOptions)

    }

    const clearFilters = () => {
        setFilterOptions({})
        updateData({})
    }

    return (
        <div className='bg-white w-80 rounded-[20px]  max-h-[90%] overflow-auto '>
            <div className='bg-white w-80 rounded  flex justify-center p-5'>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={submitFilters}>Submit</button>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={clearFilters}>Clear</button>

            </div>
            <div className='flex justify-center flex-col p-5 gap-5 max-h-[90%]'>
                {

                    selectsOption && Object.keys(selectsOption).map(
                        (selectParam: any, indexSelect) => <div key={indexSelect} className='grid grid-cols-2 w-[70%] gap-5'>
                            <label>{filterFields[selectParam]}</label>
                            <Select
                                name={selectParam}
                                value={selectsOption[selectParam].filter(
                                    (selectOpt: any) => selectOpt.value == filterOptions[selectParam]
                                )}
                                onChange={
                                    (ev: any) => {
                                        setFilterOptions(
                                            (oldFilterOpts: any) => ({
                                                ...oldFilterOpts,
                                                [selectParam]: ev.value
                                            })
                                        )
                                    }
                                } className="min-w-[150px]" options={selectsOption[selectParam]} />
                        </div>
                    )

                }
            </div>
        </div>


    );
}

export default Filter