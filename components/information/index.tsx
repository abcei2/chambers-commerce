import { useEffect, useState } from "react"
import { HeatMapContextProvider } from "../../context/HeatMapContext"
import ListSection from "../dashboard/ListSection"
import Loader from "../Loader"
import Profile from "./Profile"

const LocationInfo = (props: {
    locationId: string
}) => {

    const [locationData, setLocationData] = useState()
    useEffect(() => {
        fetch("/api/db/locations/byId?locationId=" + props.locationId).then(
            resp => resp.json()
        ).then(
            jsonData => setLocationData(jsonData.data[0])
        )
    }, [props.locationId])


    if (!locationData)
        return <Loader></Loader>

    return <div className="grid grid-cols-4">
        <div className="ml-5">

            <Profile info={locationData} />
        </div>
        <div className="col-span-2">

        </div>
        <div className="bg-white w-fit rounded-[20px]">
            <div className="text-center w-full text-lg mt-5">Capacidades de la entidad</div>
            <HeatMapContextProvider>
                <ListSection />
            </HeatMapContextProvider>
        </div>
    </div>
}
export default LocationInfo