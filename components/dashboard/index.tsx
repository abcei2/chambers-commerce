import { ChartsContextProvider } from "../../context/ChartsContext"
import { HeatMapContextProvider } from "../../context/HeatMapContext"
import HeatMap from "../heatmap"
import ChartSection from "./ChartSection"
import DataSection from "./DataSection"
import ListSection from "./ListSection"


const Charts = () => {
    return <div className="md:h-[900px] min-h-[500px]">
        <HeatMapContextProvider filterByLocation>
        
            <div className=" md:grid flex flex-col md:grid-cols-4 px-10 py-2 gap-5 h-full ">
                <div className="flex flex-col md:col-span-3">
                    <DataSection />

                    <ChartsContextProvider>
                        <ChartSection />
                    </ChartsContextProvider>

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


export default Charts
