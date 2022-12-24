
import HeatMap from "../components/heatmap";
import Filter from "../components/heatmap/Filter";
import { HeatMapContextProvider } from "../context/HeatMapContext";

export default function Map() {
    return <div>
        <HeatMapContextProvider>
            <div className="w-full h-full absolute">

                <HeatMap />
            </div>

            <div className="w-full flex justify-end absolute z-10">
                <Filter />
            </div>

        </HeatMapContextProvider>
    </div>
}

