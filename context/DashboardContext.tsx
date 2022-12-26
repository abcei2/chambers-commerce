import { createContext, useEffect, useState } from "react";

const DashboardContext = createContext<any>(null);



const DashboardContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [chartsData, setChartsData] = useState<any>()

    useEffect(
        () => {
            fetch("/api/db/dashboard/chartsdata").then(
                (resp) => resp.json()
            ).then((jsonData) => setChartsData(jsonData))
        }, []
    )

    return (
        <DashboardContext.Provider value={{ chartsData, setChartsData }}>
            {props.children}
        </DashboardContext.Provider>
    );
};

export { DashboardContextProvider, DashboardContext };