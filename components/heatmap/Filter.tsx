import { useContext, useEffect, useState } from "react";
import Select from 'react-select'
import { filterFields } from "../../constants";
import { HeatMapContext } from "../../context/HeatMapContext";

const Filter = () => {

    const [openMenu, setOpenMenu] = useState(false)
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
        <div className="flex justify-end ">

            
            {
                openMenu && <div className='w-80   max-h-[90%] pointer-events-none '>

                    <div className='bg-white rounded-[20px] flex justify-center flex-col p-5 gap-5 max-h-[90%] overflow-auto pointer-events-auto'>
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
                    <div className=' w-80 rounded  flex justify-center p-5 gap-4 pointer-events-none'>

                        <button className="pointer-events-auto rounded-3xl bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        onClick={submitFilters}>Filtrar</button>
                        <button className="pointer-events-auto rounded-3xl bg-white hover:bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        onClick={clearFilters}>Limpiar</button>

                </div>
            </div>
            }
            <div className="bg-white w-fit h-fit rounded-lg p-2 pointer-events-auto" onClick={() => setOpenMenu(!openMenu)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
        </div>
        


    );
}

export default Filter