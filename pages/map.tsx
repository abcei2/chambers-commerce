
import HeatMap from "../components/heatmap";
import Filter from "../components/heatmap/Filter";
import { HeatMapContextProvider } from "../context/HeatMapContext";

export default function Map() {
    return <div className="lg:p-5  w-full h-screen relative ">

        <HeatMapContextProvider>
          
            <div className=" w-full h-full  ">

                <HeatMap>
                    <div className="py-3 top-28 right-1 pointer-events-none absolute z-2">
                        <Filter />
                    </div>
                </HeatMap>
            </div>

        

        </HeatMapContextProvider>
    </div>
}

