
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

    const pieDoughnutProps = (options: any, data: any) => {

        const withoutLabels = {
            ...data,
            datasets: [{
                ...data.datasets[0]
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
                    display: showLegends,
                    position: legendsOnTop.includes(currentType || "") ? "top" : "right",
                    overflow: "visible",
                }
            }
        }

        switch (currentType) {
            case "doughnut":
                return <Doughnut ref={chartRef} {...pieDoughnutProps(options, data)} />
            case "radar":
                return <Radar ref={chartRef} data={data} options={options} />
            case "pie":
                return <Pie ref={chartRef} {...pieDoughnutProps(options, data)} />
            case "bar":
                return <Bar ref={chartRef} data={data} options={options} />
            default:
                return <Doughnut ref={chartRef} {...pieDoughnutProps(options, data)} />
        }
    }

    return <div className='flex flex-col'>
        <div className='flex justify-between text-sm'>
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
        <div className=' flex justify-center h-[200px]'>
            <div className=' h-full overflow-auto'>

                {currentChart()}
            </div>
        </div>
        <div className=' flex gap-3 '>
            <input type={"checkbox"} onClick={(ev: any) => setShowLegends(ev.target.checked)}></input>
            <label className='text-xs'>Legends</label>
        </div>


    </div>
}

export default MainChart