
import { useRouter } from "next/router"
import { useContext } from "react"
import { HeatMapContext } from "../../context/HeatMapContext"
import { OrganizationsType } from "../../types/dbTypes"
import { nullIfDefault } from "../../utils"
import Filter from "../heatmap/Filter"

const ListSection = (props: { locationId?: any }) => {

    const router = useRouter()
    const { page, setPage, capacitiesList, pageAmount } = useContext(HeatMapContext)


    const onNextPage = () => {
        if (page < pageAmount - 1)
            setPage(page + 1)

    }

    const onPrevPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    return <>
        {
            capacitiesList ? <div className="rounded-[20px] bg-[var(--secondary-color)] h-[780px]">

                <Filter className="flex flex-row-reverse md:flex-col lg:flex-row  lg:p-1  flex-row justify-between items-center" useModal />

                <div className="shadow-md overflow-auto scrollbar flex flex-col items-center  divide-y min-h-fit h-[650px] overflow-auto">
                    {
                        capacitiesList.map(
                            (organizationInfo: OrganizationsType, index: number) => <div key={index} className=" px-5  w-full relative  min-h-32 flex flex-col   rounded-[20px]">
                                <div className="">

                                    <div className="font-semibold text-center w-full mt-4">

                                        {
                                            nullIfDefault(organizationInfo.invGroup) || nullIfDefault(organizationInfo.rdUnits) || nullIfDefault(organizationInfo.minicienciasCategory) || nullIfDefault(organizationInfo.center) || nullIfDefault(organizationInfo.laboratory)
                                        }
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-semibold">Capacidad: </span>
                                        {
                                            nullIfDefault(organizationInfo.invGroup) ? "Grupo de investigaci??n" : null ||
                                                nullIfDefault(organizationInfo.rdUnits) ? "Unidad I+D" : null ||
                                                    nullIfDefault(organizationInfo.center) ? "Centro" : null ||
                                                        nullIfDefault(organizationInfo.laboratory) ? "Laboratorio" : null ||
                                                            nullIfDefault(organizationInfo.minicienciasCategory) ? "Categor??a de minciencias" : null
                                        }
                                        <br />
                                        <span className="font-semibold">Entidad: </span>
                                        {
                                            organizationInfo.organization
                                        }
                                    </div>

                                </div>
                                <button onClick={() => router.push({
                                    pathname: '/info',
                                    query: { locationId: organizationInfo.locationId, capacityId: organizationInfo.id },
                                })}
                                    className="text-center text-md hover:bg-red-700 text-white self-center font-semibold bg-[var(--primary-color)] w-[80%] rounded-[20px] m-5">
                                    M??s informaci??n
                                </button>
                            </div>
                        )
                    }
                    {
                        pageAmount == 0 && <div className="mt-5">
                            No existe la capacidad
                        </div>
                    }
                </div>
                {
                    pageAmount > 0 && <div className="flex flex-col items-center">
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button onClick={onPrevPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-l hover:bg-[var(--primary-color)] ">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>

                            </button>
                            <button onClick={onNextPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400  border-0 border-l border-gray-700 rounded-r hover:bg-[var(--primary-color)]">

                                <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>

                        <span className="text-sm text-gray-700 ">
                            P??gina <span className="font-semibold text-gray-900">{page + 1}</span> de <span className="font-semibold text-gray-900">{pageAmount}</span>
                        </span>
                    </div>
                }


            </div> : undefined

        }
    </>

}


export default ListSection
