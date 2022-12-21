
import HeatMap from "../components/heatmap";
import { HeatMapContextProvider } from "../context/HeatMapContext";

export default function Map() {
    return <div>
        <HeatMapContextProvider>
            <HeatMap />
        </HeatMapContextProvider>
    </div>
}

