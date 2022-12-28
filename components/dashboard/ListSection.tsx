
import { useRouter } from "next/router"
import { useContext } from "react"
import { HeatMapContext } from "../../context/HeatMapContext"
import { OrganizationsType } from "../../types/dbTypes"
import { nullIfDefault } from "../../utils"
import Filter from "../heatmap/Filter"

const ListSection = (props: { locationId?:any}) => {

    const router = useRouter()
    const { page, setPage, capacitiesList, PAGE_SIZE } = useContext(HeatMapContext)

  
    const onNextPage = () => {
        setPage(page + 1)

    }

    const onPrevPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }  

    return <div className=" rounded-[20px] bg-[var(--secondary-color)]  ">

        <Filter />
        <div className="grid grid-cols-1 overflow-auto scrollbar md:h-[700px] h-[500px] divide-y ">
            
            {
                capacitiesList && capacitiesList.map(
                    (organizationInfo: OrganizationsType, index: number) => <div key={index} className=" px-5  relative  hover:bg-gray-100 min-h-32 flex flex-col   rounded-[20px]">
                        <div>

                            <div className="font-semibold text-center w-full mt-4">

                                {
                                    nullIfDefault(organizationInfo.invGroup) || nullIfDefault(organizationInfo.rdUnits) || nullIfDefault(organizationInfo.minicienciasCategory) || nullIfDefault(organizationInfo.center) || nullIfDefault(organizationInfo.laboratory)
                                }
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Capacidad: </span>
                                {
                                    nullIfDefault(organizationInfo.invGroup) ? "Grupo de investigación" : null ||
                                        nullIfDefault(organizationInfo.rdUnits) ? "Unidad I+D" : null ||
                                            nullIfDefault(organizationInfo.minicienciasCategory) ? "Categoría de minciencias" : null ||
                                                nullIfDefault(organizationInfo.center) ? "Centro" : null ||
                                                    nullIfDefault(organizationInfo.laboratory) ? "Laboratorio" : null
                                }
                                <br/>
                                <span className="font-semibold">Entidad: </span>
                                {
                                    organizationInfo.organization
                                }
                            </div>

                        </div>
                        <button onClick={() => router.push({
                            pathname: '/info',
                            query: { locationId: organizationInfo.locationId },
                        })}
                            className="text-center text-md text-white self-center font-semibold bg-[var(--primary-color)] w-[80%] rounded-[20px] m-5">
                            Información
                        </button>
                    </div>
                )
            }
        </div>
        <div className="flex flex-col items-center">
            <div className="inline-flex mt-2 xs:mt-0">
                <button onClick={onPrevPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-l hover:bg-gray-900 ">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
             
                </button>
                <button onClick={onNextPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400  border-0 border-l border-gray-700 rounded-r hover:bg-gray-900">
             
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            <span className="text-sm text-gray-700 ">
                Showing <span className="font-semibold text-gray-900">{page * PAGE_SIZE}</span> to <span className="font-semibold text-gray-900">{PAGE_SIZE * (page + 1)}</span>
            </span>
        </div>

    </div>
}


export default ListSection
