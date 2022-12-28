
import { Doughnut, Radar, Pie, Bar } from 'react-chartjs-2';
import "chart.js/auto";
import React, { useEffect, useRef, useState } from 'react';



const MainChart = (
    props: {
        data: any,
        title: string
    }
) => {
    const { data, title } = props
    const chartTypes = ["doughnut", "radar", "pie", "bar"]
    const legendsOnTop = ["radar", "bar"]
    const chartRef = useRef(null)
    const [showLegends, setShowLegends] = useState(false)

    const [currentType, setCurrentType] = useState<string>()
    const onTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(ev.target.value)
    }

    const proccessProps = (options: any, data: any) => {

        console.log(data)
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

    useEffect(
        () => {
            if (chartRef.current) {
                console.log(chartRef.current)
            }
        }, [chartRef]
    )

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
            },
            tooltip:{
                caretSize:0
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

    return <div className='pt-2 flex flex-col h-[100%] relative'>
        <div className='pl-5 pr-2 flex justify-between text-sm'>
            <div className='font-extrabold  '>{title}  </div>
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
        <div className='flex justify-center h-[100%] pb-6 flex-col '>
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