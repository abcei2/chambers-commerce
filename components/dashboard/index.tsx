import { HeatMapContextProvider } from "../../context/HeatMapContext"
import HeatMap from "../heatmap"
import Filter from "../heatmap/Filter"
import ChartSection from "./ChartSection"
import DataSection from "./DataSection"
import ListSection from "./ListSection"


const Dashboard = () => {
    return <div className="">
        <HeatMapContextProvider>

        
            <div className=" md:grid flex flex-col md:grid-cols-4 px-10 py-2 gap-5 ">
                <div className="flex flex-col md:col-span-3">
                    <DataSection />
                    <ChartSection />

                    <div className="w-full h-[40%] p-5 ">
                        <HeatMap>
                        </HeatMap>
                    </div>

                </div>
                <ListSection />
            </div>
        </HeatMapContextProvider>

    </div>
}


export default Dashboard
