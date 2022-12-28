import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LocationInfo from "../../components/information";
import { HeatMapContextProvider } from "../../context/HeatMapContext";

export default function Info() {
    const route = useRouter()
    const [locationId, setLocationId] = useState()
    
    useEffect(
        () => {
            const locId:any = route.query.locationId
            setLocationId(locId)
        }, [route.query.locationId]
    )

    return locationId ? <div className="lg:px-5  w-full h-full relative  ">
        <HeatMapContextProvider locationId={locationId}>
            < LocationInfo  />
        </HeatMapContextProvider>
    </div >: <></>
}

