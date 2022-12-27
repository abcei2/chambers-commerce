
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CustomCarousel from "../CustomCarousel";
import Loader from "../Loader";

const DataSection = () => {

    const [percentData, setPercentData] = useState<Array<{name:string,value:number, title:string}>>()

    useEffect(()=>{
        fetch("/api/db/dashboard/percentagedata").then(
            (resp) => resp.json()
        ).then(
            (dataJson) => setPercentData(dataJson)
        )
    },[])


    if (!percentData)
        return <div className="flex justify-center">
            <Loader />
        </div> 
    return (
        <CustomCarousel >
            {
                percentData.map(
                    (percentItem: { name: string, value: number, title: string }, index) => <div key={index} className="mt-2 ml-2 rounded-[20px] font-black flex flex-col bg-[var(--secondary-color)]">
                       
                        <div className="flex w-content h-[6rem] justify-center gap-2">
                            <div className="h-full w-[4rem] flex items-center ">
                                <CircularProgressbar styles={buildStyles({ pathColor: "red" })} value={ Math.ceil(percentItem.value)} text={""} />
                            </div>
                            <div className="h-full text-[4rem] text-center flex items-center justify-center">
                                {percentItem.value}%
                            </div>
                        </div>
                        <div className="text-center text-md text-white self-center font-semibold bg-[var(--primary-color)] w-[80%] rounded-[20px] m-5">
                            {percentItem.name}
                        </div>
                    </div>
                )
            }
        </CustomCarousel>

    )
}

export default DataSection