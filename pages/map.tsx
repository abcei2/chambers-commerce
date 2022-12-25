
import HeatMap from "../components/heatmap";
import Filter from "../components/heatmap/Filter";
import { HeatMapContextProvider } from "../context/HeatMapContext";

export default function Map() {
    return <div className="sm:p-10 gap-5 sm:grid sm:grid-cols-3 lg:grid-cols-4 w-full h-screen ">

        <HeatMapContextProvider>
            <div className="lg:col-span-3 sm:col-span-2 w-full h-full sm:relative absolute">
                <div className="w-full h-full ">

                    <HeatMap />
                </div>
            </div>

            <div className=" sm:w-fit  sm:relative fixed ">
                <Filter />
            </div>

        </HeatMapContextProvider>
    </div>
}

