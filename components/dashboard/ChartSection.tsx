import MainChart from "./MainChart";
import { useContext, useEffect, useState } from "react";
import { filterFields } from "../../constants";
import { DashboardContext } from "../../context/DashboardContext";


const ChartSection = () => {

    const {chartsData} = useContext(DashboardContext)
 
    if (!chartsData)
        return <></>

    return (<div className='flex flex-col  overflow-auto  '>
        <div className='my-5 flex gap-5 w-94 h-64 min-w-[900px]'>
            {
                Object.keys(chartsData).map(
                    (chartParam, index) => <MainChart key={index} title={filterFields[chartParam]} data={chartsData[chartParam]} />
                )
            }
        </div>

    </div>
    )
}

export default ChartSection