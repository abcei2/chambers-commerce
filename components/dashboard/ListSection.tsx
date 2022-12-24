
import { useEffect, useState } from "react"
import { OrganizationsType } from "../../types/dbTypes"

const PAGE_SIZE = 5
const ListSection = () => {

    const [organizationList, setOrganizationList] = useState<any>()
    const [page, setPage] = useState(0)

    useEffect(
        () => {
            console.log("aaaaaaaaaaaa")
            fetch(
                "/api/db/organizations/pagination?" + new URLSearchParams({
                    page: page.toString(),
                    size: PAGE_SIZE.toString(),
                })
            ).then(
                (data) => data.json()
            ).then(
                (chartsDataJson) => setOrganizationList(chartsDataJson.data)
            )
        }, [page]
    )
    const onNextPage = () => {
        setPage(page + 1)

    }

    const onPrevPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const nullIfDefault = (value: string) => {
        return value != "No data" ? value : null
    }

    return <div className=" rounded-[20px] bg-white ">

    
        <div className="grid grid-cols-1 overflow-auto scrollbar md:h-[700px] h-[500px]">
            
            {
                organizationList && organizationList.map(
                    (organizationInfo: OrganizationsType, index: number) => <div key={index} className="px-5 relative  hover:bg-gray-100 min-h-32 flex flex-col   rounded-[20px]">
                        <div>

                            <div className="font-semibold text-center w-full">

                                {
                                    nullIfDefault(organizationInfo.invGroup) || nullIfDefault(organizationInfo.rdUnits) || nullIfDefault(organizationInfo.minicienciasCategory) || nullIfDefault(organizationInfo.center) || nullIfDefault(organizationInfo.laboratory)
                                }
                            </div>
                            <br/>
                            <div className="text-sm">
                                <span className="font-semibold">Capacidad: </span>
                                {
                                    nullIfDefault(organizationInfo.invGroup) ? "Grupo de investigación" : null ||
                                        nullIfDefault(organizationInfo.rdUnits) ? "Unidad I+D" : null ||
                                            nullIfDefault(organizationInfo.minicienciasCategory) ? "Categoría de minciencias" : null ||
                                                nullIfDefault(organizationInfo.center) ? "Centro" : null ||
                                                    nullIfDefault(organizationInfo.laboratory) ? "Laboratorio" : null
                                }
                                <br />
                                <span className="font-semibold">Entidad: </span>
                                {
                                    organizationInfo.organization
                                }
                            </div>

                        </div>
                        <div className="text-center text-lg text-white font-bold bg-purple-500 w-[90%] rounded-[20px] mt-5">
                            Información
                        </div>
                    </div>
                )
            }
        </div>
        <div className="flex flex-col items-center">
            <div className="inline-flex mt-2 xs:mt-0">
                <button onClick={onPrevPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-l hover:bg-gray-900 ">
                    <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    Prev
                </button>
                <button onClick={onNextPage} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400  border-0 border-l border-gray-700 rounded-r hover:bg-gray-900">
                    Next
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
