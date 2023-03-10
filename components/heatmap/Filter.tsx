import { useContext } from "react";
import Select from 'react-select'
import { filterFields } from "../../constants";
import { HeatMapContext } from "../../context/HeatMapContext";
import Modal from "../Modal";

const Filter = (props: { className?: string, useModal?: boolean }) => {
    const { updateData, clearPopup, selectsOption, filterOptions, setFilterOptions, 
        isFilterDivVisible, setIsFilterDivVisible, filterDiv, downloadOrganizationData } = useContext(HeatMapContext)


    const submitFilters = (ev: any) => {
        ev.preventDefault()

        updateData(filterOptions)
        setIsFilterDivVisible(false)
        clearPopup()

    }

    const clearFilters = () => {
        setFilterOptions({})
        updateData({})
        setIsFilterDivVisible(false)
        clearPopup()
    }

    const filterTemplate = () => {
        const template = isFilterDivVisible && <div className='md:w-80  md:text-sm text-xs max-h-[80%] pointer-events-none   overflow-visible '>
            <div className="flex gap-1">
                <div className='bg-[var(--secondary-color)] p-5 rounded-[20px] flex justify-center flex-col  gap-5 max-h-[90%] overflow-visible pointer-events-auto'>
                    {

                        selectsOption && Object.keys(selectsOption).map(
                            (selectParam: any, indexSelect) => <div key={indexSelect} className='grid grid-cols-2 md:w-[70%] gap-5'>

                                <label className="" >{filterFields[selectParam]}</label>
                                <Select
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
                                    } className="md:min-w-[150px] " options={selectsOption[selectParam]} />
                            </div>
                        )

                    }

                </div>
                <div>
                    {
                        !props.useModal &&
                        <div className={(props.className || "") + " "}>
                            < div className="bg-[var(--secondary-color)] w-fit flex h-fit rounded-lg p-2 pointer-events-auto" onClick={() => setIsFilterDivVisible((oldvalue: boolean) => !oldvalue)}>
                                {props.useModal && <span className="">Filtro de capacidad</span>}<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div> <div className="bg-[var(--secondary-color)] w-fit flex h-fit rounded-lg p-2 pointer-events-auto">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                        </div>
                    }

                </div>

            </div>
            <div className='md:w-80  rounded  flex justify-center p-5 gap-4 pointer-events-none'>

                <button className="pointer-events-auto rounded-3xl bg-[var(--primary-color)] hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    onClick={submitFilters}>Filtrar</button>
                <button className="pointer-events-auto rounded-3xl bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)] text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={clearFilters}>Limpiar</button>

            </div>
        </div>
        if (props.useModal) {
            return <Modal title="Filtro de capacidades" setShowModal={setIsFilterDivVisible} showModal={isFilterDivVisible}>
                {template}
            </Modal>
        }
        return template
    }

    return (
        <div ref={filterDiv} >


            {filterTemplate()}
            <div className={(props.className || "") + " text-xs lg:text-sm"}>
                {
                    (!isFilterDivVisible || props.useModal) && < div className="bg-[var(--secondary-color)] hover:bg-[var(--base-color)] w-fit items-center flex h-fit rounded-lg p-2 pointer-events-auto" onClick={() => setIsFilterDivVisible((oldvalue: boolean) => !oldvalue)}>
                        {props.useModal && <span className="">Configurar filtro</span>}<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                }

                {
                    (!isFilterDivVisible || props.useModal) && <div onClick={downloadOrganizationData} className="bg-[var(--secondary-color)] hover:bg-[var(--base-color)] items-center w-fit flex  flex-row-reverse h-fit rounded-lg p-2 pointer-events-auto">
                        {props.useModal && <span className="">Descargar datos</span>} <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                }
            </div>




        </div>



    );
}

export default Filter