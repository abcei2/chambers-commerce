
import { Doughnut, Radar, Pie, Bar } from 'react-chartjs-2';
import "chart.js/auto";
import React, { useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { captureRejectionSymbol } from 'events';

const pieDoughnutProps = (options: any, data: any) => {

    const withoutLabels = {
        ...data
    }
    options = {
        ...options
    }
    return { data: withoutLabels, options }

}

const MainChart = (
    props: {
        data: any,
        title: string
    }
) => {
    const { data, title } = props
    const chartTypes = ["doughnut", "radar", "pie", "bar"]
    const [currentType, setCurrentType] = useState<string>()
    const onTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(ev.target.value)
    }

    const currentChart = () => {
   
        let options: any = {
            plugins: {
                datalabels: {
                    borderColor: 'white',
                    color: 'white',
                    font: {
                        weight: 'bold'
                    },
                    formatter: (value: number, chart) => Math.round(100 *(value / chart.dataset.data.reduce((prev: number, current: number)=> prev+current,0)))+ "%",
                },
                legend:{
                    display:false
                }
            }
        }

        switch (currentType) {
            case "doughnut":

                return <Doughnut plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)}  />
            case "radar":
                return <Radar plugins={[ChartDataLabels]} data={data} options={options}  />
            case "pie":
                return <Pie plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)}  />
            case "bar":
                return <Bar plugins={[ChartDataLabels]}  data={data} options={options}  />
            default:
                return <Doughnut plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)} />
        }
    }

    return <div className='bg-white rounded-[20px] pl-8 pr-2 pt-2 overflow-auto min-w-[300px]'>
        <div className='flex justify-between '>
            <div className=''>{title}  </div>
            {
                <select className='rounded hover:rounded-none' onChange={onTypeChange}>
                    {
                        chartTypes.map(
                            (chartType, index) => <option key={index} className='' value={chartType}>{chartType}</option>
                        )
                    }
                </select>
            }
        </div>
        <div className='w-[90%] h-[80%]'>

            {currentChart()}
        </div>
    </div>
}

export default MainChart