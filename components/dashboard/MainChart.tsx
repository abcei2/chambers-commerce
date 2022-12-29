
import { Doughnut, Radar, Pie, Bar } from 'react-chartjs-2';
import "chart.js/auto";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChartsContext } from '../../context/ChartsContext';



const MainChart = (
    props: {
        data: any,
        title: string,
        chartId?: string,
    }
) => {
    const { data, title } = props
    const chartTypes = ["doughnut", "radar", "pie", "bar"]
    const legendsOnTop = ["radar", "bar"]

    const { setCurrentChartId, setShowChartModal } = useContext(ChartsContext)

    const chartRef = useRef(null)
    const [showLegends, setShowLegends] = useState(false)
    const [currentType, setCurrentType] = useState<string>()
    const onTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(ev.target.value)
    }

    const proccessProps = (options: any, data: any) => {

        const withoutLabels = {
            ...data,
            labels: data.labels.map(
                (label: string) => {
                    if (legendsOnTop.includes(currentType || "")) {
                        if (label.length > 8) {
                            return label.slice(0, 8) + "..."
                        }
                    }

                    return label
                }
            ),
            datasets: [{
                ...data.datasets[0],
            }]
        }
        options = {
            ...options
        }
        return { data: withoutLabels, options }

    }
    const chartFullScreen = () => {
        setCurrentChartId(props.chartId)
        setShowChartModal(true)
    }

    const currentChart = () => {

        let options: any = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: legendsOnTop.includes(currentType || "") ? true : showLegends,
                    position: legendsOnTop.includes(currentType || "") ? "top" : "right",
                    overflow: "scroll",
                }
            }
        }

        switch (currentType) {
            case "doughnut":
                return <Doughnut ref={chartRef} {...proccessProps(options, data)} />
            case "radar":
                return <Radar ref={chartRef} {...proccessProps(options, data)} />
            case "pie":
                return <Pie ref={chartRef} {...proccessProps(options, data)} />
            case "bar":
                return <Bar ref={chartRef} {...proccessProps(options, data)} />
            default:
                return <Doughnut ref={chartRef} {...proccessProps(options, data)} />
        }
    }

    return <div className='pt-2 flex flex-col h-full relative'>
        <div className='pl-5 pr-2 flex justify-between text-sm flex-row-reverse'>

            {
                props.chartId && <button onClick={chartFullScreen} className='hover:bg-[var(--base-color)] rounded-[20px] px-2 hover:border-gray-300 font-extrabold flex items-center flex-row-reverse gap-2'>
                    {title}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>

                </button>
            }
            {
                <select className='rounded hover:rounded-none ' onChange={onTypeChange}>
                    {
                        chartTypes.map(
                            (chartType, index) => <option key={index} className='' value={chartType}>{chartType}</option>
                        )
                    }
                </select>
            }
        </div>
        <div className='flex justify-center h-[100%] w-full pb-6 flex-col '>
            {currentChart()}
        </div>
        {
            !legendsOnTop.includes(currentType || "") && <div className='pl-5 pr-2 absolute top-[90%] flex gap-3 '>
                <input type={"checkbox"} onClick={(ev: any) => setShowLegends(ev.target.checked)}></input>
                <label className='text-xs'>Legends</label>
            </div>
        }



    </div>
}

export default MainChart