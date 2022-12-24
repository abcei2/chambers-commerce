import { createContext, useState } from "react";

const DashboardContext = createContext<any>(null);



const DashboardContextProvider = (props: {
    children: React.ReactNode,
    defaultChartsData:any
}) => {

    const [chartsData, setChartsData] = useState<any>(props.defaultChartsData)

    return (
        <DashboardContext.Provider value={{ chartsData, setChartsData }}>
            {props.children}
        </DashboardContext.Provider>
    );
};

export { DashboardContextProvider, DashboardContext };