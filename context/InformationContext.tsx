import { createContext, useEffect, useState } from "react";


const InformationContext = createContext<any>(null);
const InformationContextProvider = (props: {
    children: React.ReactNode,
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

    return (
        <InformationContext.Provider value={{
            locationData
        }}>
            {props.children}
        </InformationContext.Provider>
    );
};

export { InformationContextProvider, InformationContext };