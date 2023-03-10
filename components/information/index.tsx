import { useContext } from "react"
import Select from 'react-select'
import { ORGANIZATION_FIELDS } from "../../constants"
import { HeatMapContext } from "../../context/HeatMapContext"
import ListSection from "../dashboard/ListSection"
import HeatMap from "../heatmap"
import Loader from "../Loader"
import Profile from "./Profile"

const LocationInfo = () => {
    const { setLocationId, popUpCoordinates, currentCapacity, locationsOptions, locationId, setFilterOptions, updateData } = useContext(HeatMapContext)


    return <div className="p-4 md:p-0">
        {
            locationsOptions && <div className="flex flex-row-reverse pb-2">

                <Select defaultValue={
                    locationsOptions.find(
                        (opt: any) => opt.value == locationId
                    )
                } options={locationsOptions} className="w-64"
                    onChange={
                        (ev: any) => {
                            setFilterOptions(
                                (oldFilterOpts: any) => {
                                    const newFiltersOpts = {}
                                    updateData(newFiltersOpts, ev.value)
                                 
                                    return newFiltersOpts
                                }
                            )
                        }
                    }></Select>
            </div>
        }
        
        {
            popUpCoordinates.info  && locationsOptions ? <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[800px]   ">
                <div className="ml-5 flex flex-col gap-2  h-fit md:h-full  overflow-hidden rounded-[20px]">
                    <div>
                        <Profile {...popUpCoordinates} />
                    </div>
                    {
                        currentCapacity && <div className="p-2 bg-[var(--secondary-color)] rounded-[20px] mb-2  h-96 md:h-full overflow-auto red-scrollbar">
                            <div className="grid grid-cols-1 text-sm py-1">
                                <label className="font-semibold uppercase text-center">{currentCapacity["name"]}</label>
                            </div>
                            {
                                Object.keys(currentCapacity).map(
                                    (capacityParam: string, index) => {
                                        const currentField = ORGANIZATION_FIELDS.find(
                                            (organizationField: any) => organizationField.name == capacityParam
                                        )
                                        if (!currentField)
                                            return <div key={index}></div>
                                        return <div key={index} className="grid grid-cols-1 text-sm py-1">
                                            <label className="font-semibold">{currentField.showName}:</label>
                                            <span className="col-span-2 "> {currentCapacity[currentField.name]} </span>
                                        </div>
                                    }
                                )
                            }

                        </div>
                    }
                    
                </div>
                <div className="md:col-span-2 px-5  h-full">
                    <HeatMap>
                    </HeatMap>
                </div>
                <div className="bg-[var(--secondary-color)]  min-w-fit h-fit rounded-[20px]">
                    <div className="text-center w-full text-lg ">Capacidades de la entidad</div>
                    <ListSection />
                </div>
            </div> : <Loader></Loader>
        }
        
    </div>
}
export default LocationInfo