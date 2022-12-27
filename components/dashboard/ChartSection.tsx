import MainChart from "./MainChart";
import { useContext } from "react";
import { filterFields } from "../../constants";
import { DashboardContext } from "../../context/DashboardContext";
import "react-multi-carousel/lib/styles.css";
import CustomCarousel from "../CustomCarousel";
import Loader from "../Loader";


const ChartSection = () => {

    const { chartsData } = useContext(DashboardContext)
   
    if (!chartsData)
        return <div className="flex justify-center ">
            <Loader />
        </div> 

    return (
        <CustomCarousel>
         
            {
                Object.keys(chartsData).map(
                    (chartParam, index) => <div key={index} className="mt-2 ml-2 bg-[var(--secondary-color)]  rounded-[20px] pl-5 pr-2 pt-2 h-[16rem] max-w-96 overflow-hidden     ">
                        <MainChart title={filterFields[chartParam]} data={chartsData[chartParam]} />
                    </div>
                )
            }

        </CustomCarousel>
    )
}

export default ChartSection