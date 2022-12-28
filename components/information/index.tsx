import { useContext } from "react"
import { HeatMapContext } from "../../context/HeatMapContext"
import ListSection from "../dashboard/ListSection"
import HeatMap from "../heatmap"
import Loader from "../Loader"
import Profile from "./Profile"

const LocationInfo = () => {
    const { heatMapData } = useContext(HeatMapContext)

    if (heatMapData.features.length==0)
        return <Loader></Loader>

    return <div className="grid grid-cols-4 gap-2 md:h-[800px] h-[500px] ">
        <div className="ml-5">
            <Profile info={heatMapData.features[0].properties} />
        </div>
        <div className="col-span-2 px-5 h-full">
            <HeatMap>
            </HeatMap>
        </div>
        <div className="bg-[var(--secondary-color)]  min-w-fit  rounded-[20px]">
            <div className="text-center w-full text-lg ">Capacidades de la entidad</div>
            <ListSection />
        </div>
    </div>
}
export default LocationInfo