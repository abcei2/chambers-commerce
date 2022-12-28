import { useContext, useEffect, useState } from "react"
import { HeatMapContextProvider } from "../../context/HeatMapContext"
import { InformationContext } from "../../context/InformationContext"
import ListSection from "../dashboard/ListSection"
import HeatMap from "../heatmap"
import Loader from "../Loader"
import Profile from "./Profile"

const LocationInfo = () => {
    const { locationData } = useContext(InformationContext)

    if (!locationData)
        return <Loader></Loader>

    return <div className="grid grid-cols-4 gap-2">
        <HeatMapContextProvider locationId={locationData.id}>
            <div className="ml-5">

                <Profile info={locationData} />
            </div>
            <div className="col-span-2 px-5 pb-10 ">
                <HeatMap>                    
                </HeatMap>
            </div>
            <div className="bg-white w-fit rounded-[20px]">
                <div className="text-center w-full text-lg mt-5">Capacidades de la entidad</div>
                    <ListSection />
            
            </div>
        </HeatMapContextProvider>
    </div>
}
export default LocationInfo