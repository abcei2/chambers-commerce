import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LocationInfo from "../../components/information";
import { HeatMapContextProvider } from "../../context/HeatMapContext";

export default function Info() {
    const route = useRouter()
    const [locationId, setLocationId] = useState()
    const [capacityId, setCapacityId] = useState()
    
    useEffect(
        () => {
            const noTypeData:any = route.query
            const {locationId:locId, capacityId:capId} = noTypeData
            if (!locId || !capId){
                fetch("/api/db/organizations/findFirstRand").then(
                    data => data.json()
                ).then(
                    jsonData => {
                        setLocationId(jsonData.locationId)
                        setCapacityId(jsonData.organizationId)
                    }
                )
            }else{
                setLocationId(locId)
                setCapacityId(capId)
            }
        }, [route.query.locationId, route.query.capacityId]
    )

    return (locationId && capacityId) ? <div className="lg:px-5  w-full h-full relative  ">
        <HeatMapContextProvider locationId={locationId} capacityId={capacityId}>
            < LocationInfo  />
        </HeatMapContextProvider>
    </div >: <></>
}

