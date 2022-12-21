import MainChart from "./MainChart";
import { useEffect, useState } from "react";
import UploadData from "../UploadData";


const ChartSection = (props: {
    distinctsOrganization: string[]
}) => {
    const [chartsData, setChartsData] = useState<any>()

    useEffect(
        ()=>{
            fetch(
                "/api/db/distincts"
            ).then(
                (data)=>data.json()
            ).then(
                (chartsDataJson) =>setChartsData(chartsDataJson)
            )
        }
    )
    if (!chartsData)
        return <></>

    return (<div className='flex flex-col overflow-auto p-10 '>
        <div className='grid grid-cols-3 h-auto min-w-[900px]'>
            {
                Object.keys(chartsData).map(
                    (chartParam, index) => <MainChart key={index} data={chartsData[chartParam]} />
                )
            }
        </div>

    </div>
    )
}

export default ChartSection