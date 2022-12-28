import { createContext, useEffect, useState } from "react";

const ChartsContext = createContext<any>(null);



const ChartsContextProvider = (props: {
    children: React.ReactNode
}) => {

    const [chartsData, setChartsData] = useState<any>()
    const [showChartModal, setShowChartModal] = useState(false)
    const [currentChartId, setCurrentChartId] = useState()

    useEffect(
        () => {
            fetch("/api/db/dashboard/chartsdata").then(
                (resp) => resp.json()
            ).then((jsonData) => setChartsData(jsonData))
        }, []
    )

    return (
        <ChartsContext.Provider value={{ chartsData, setChartsData ,
            showChartModal, setShowChartModal,
            currentChartId, setCurrentChartId
        }}>
            {props.children}
        </ChartsContext.Provider>
    );
};

export { ChartsContextProvider, ChartsContext };