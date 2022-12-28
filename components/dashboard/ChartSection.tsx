import MainChart from "./MainChart";
import { useContext, useState } from "react";
import { filterFields } from "../../constants";
import { ChartsContext } from "../../context/ChartsContext";
import "react-multi-carousel/lib/styles.css";
import CustomCarousel from "../CustomCarousel";
import Loader from "../Loader";
import Modal from "../Modal";


const ChartSection = () => {

    const { chartsData, setShowChartModal, showChartModal, currentChartId } = useContext(ChartsContext)
   
    if (!chartsData)
        return <div className="flex justify-center ">
            <Loader />
        </div> 

    return (
        <div>
            <CustomCarousel>

                {
                    Object.keys(chartsData).map(
                        (chartParam, index) => <div key={index} className="mt-2 ml-2 bg-[var(--secondary-color)]  rounded-[20px] h-[16rem] max-w-96 overflow-hidden     ">
                            <MainChart chartId={chartParam} title={filterFields[chartParam]} data={chartsData[chartParam]} />
                        </div>
                    )
                }

            </CustomCarousel>
            <Modal setShowModal={setShowChartModal} showModal={showChartModal} fullscreen title={filterFields[currentChartId]}>
                <MainChart title={filterFields[currentChartId]} data={chartsData[currentChartId]}></MainChart>
            </Modal>
        </div>
   
    )
}

export default ChartSection