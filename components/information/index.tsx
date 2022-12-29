import { useContext } from "react"
import { ORGANIZATION_FIELDS } from "../../constants"
import { HeatMapContext } from "../../context/HeatMapContext"
import ListSection from "../dashboard/ListSection"
import HeatMap from "../heatmap"
import Loader from "../Loader"
import Profile from "./Profile"

const LocationInfo = () => {
    const { heatMapData, currentCapacity } = useContext(HeatMapContext)

    if (heatMapData.features.length==0)
        return <Loader></Loader>
    return <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[800px]  p-4 md:p-0 ">
        <div className="ml-5 flex flex-col gap-2  h-fit md:h-full  overflow-hidden rounded-[20px]">
            <div>
                <Profile info={heatMapData.features[0].properties} />
            </div>
            <div className="p-2 bg-[var(--secondary-color)] rounded-[20px] mb-2  h-96 md:h-full overflow-auto red-scrollbar">
                <div  className="grid grid-cols-1 text-sm py-1">
                    <label className="font-semibold uppercase text-center">{currentCapacity["name"]}</label>
                </div>
                {
                    Object.keys(currentCapacity).map(
                        (capacityParam: string, index)=>{
                            const currentField = ORGANIZATION_FIELDS.find(
                                (organizationField: any) => organizationField.name == capacityParam
                            )
                            if (!currentField)
                                return <></>
                            return <div key={index} className="grid grid-cols-1 text-sm py-1">
                                <label className="font-semibold">{currentField.showName}:</label>
                                <span className="col-span-2 "> {currentCapacity[currentField.name]} </span>
                            </div>
                    }
                    )
                }
       

            </div>
        </div>
        <div className="md:col-span-2 px-5  h-full">
            <HeatMap>
            </HeatMap>
        </div>
        <div className="bg-[var(--secondary-color)]  min-w-fit h-fit rounded-[20px]">
            <div className="text-center w-full text-lg ">Capacidades de la entidad</div>
            <ListSection />
        </div>
    </div>
}
export default LocationInfo