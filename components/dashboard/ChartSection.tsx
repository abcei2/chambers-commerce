import MainChart from "./MainChart";
import { useContext, useEffect, useState } from "react";
import { filterFields } from "../../constants";
import { DashboardContext } from "../../context/DashboardContext";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const ChartSection = () => {

    const {chartsData} = useContext(DashboardContext)
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    if (!chartsData)
        return <></>

    return (<div className='flex flex-col  overflow-auto  scrollbar'>
        <Carousel
            className="rounded-[20px] "
            
            ssr responsive={responsive}
            >
                {
                    Object.keys(chartsData).map(
                        (chartParam, index) => <div key={index} className=" ">
                            <MainChart  title={filterFields[chartParam]} data={chartsData[chartParam]} />
                        </div> 
                    )
                }
               
            </Carousel>
          

    </div>
    )
}

export default ChartSection