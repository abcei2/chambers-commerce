
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import "react-multi-carousel/lib/styles.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CustomCarousel from "../CustomCarousel";

const DataSection = () => {

    const { chartsData } = useContext(DashboardContext)

    if (!chartsData)
        return <></>

    return (
        <CustomCarousel >
            {
                Object.keys(chartsData).map(
                    (chartParam, index) => <div key={index} className="mt-2 ml-2 rounded-[20px] flex flex-col bg-[var(--secondary-color)]">
                        <div className='flex justify-between px-4 pt-1'>
                            <div className=''>titulo  </div>
                           
                        </div>
                        <div className="flex w-content h-[6rem] justify-center gap-2">
                            <div className="h-full w-[4rem] flex items-center ">
                                <CircularProgressbar value={60} text={""} />
                            </div>
                            <div className="h-full text-[4rem] text-center flex items-center justify-center">
                                25%
                            </div>
                        </div>
                        <div className="text-center text-md text-white self-center font-bold bg-[var(--primary-color)] w-[80%] rounded-[20px] m-5">
                            Información
                        </div>
                    </div>
                )
            }
        </CustomCarousel>

    )
}

export default DataSection