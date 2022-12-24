import { HeatMapContextProvider } from "../../context/HeatMapContext"
import HeatMap from "../heatmap"
import ChartSection from "./ChartSection"
import ListSection from "./ListSection"


const Dashboard = () => {
    return <div className=" md:grid flex flex-col md:grid-cols-4 p-10 gap-5 ">
        <div className=" gap-4 flex flex-col md:col-span-3">
            <ChartSection />
            <ChartSection />

            <HeatMapContextProvider>
                <div className="w-full h-[40%] p-5 ">
                    <HeatMap />
                </div>

            </HeatMapContextProvider>
        </div>
        <ListSection />

    </div>
}


export default Dashboard
