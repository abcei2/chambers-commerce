
import { Doughnut, Radar, Pie, Bar } from 'react-chartjs-2';
import "chart.js/auto";
import React, { useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';



const MainChart = (
    props: {
        data: any,
        title: string
    }
) => {
    const { data, title } = props
    const chartTypes = ["doughnut", "radar", "pie", "bar"]
    const [showLegends, setShowLegends]= useState(false)

    const [currentType, setCurrentType] = useState<string>()
    const onTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(ev.target.value)
    }  

    const pieDoughnutProps = (options: any, data: any) => {

        const withoutLabels = {
            ...data,
            datasets: [{
                ...data.datasets[0],
                datalabels: {
                    labels: {
                        name: {
                            align: 'center',
                            color: 'black',
                            font: { size: 12 },
                            formatter: function (value: any, ctx: any) {
                                if (showLegends)
                                    return ""
                                const percentValue = ctx.dataset.data[ctx.dataIndex] / ctx.dataset.data.reduce((prev: number, current: number) => prev + current, 0);
                                return ctx.chart.data.labels[ctx.dataIndex].length < 12 ? 100 * percentValue > 9 ? ctx.chart.data.labels[ctx.dataIndex] : "" : "";
                            }
                        },
                        value: {
                            align: 'bottom',
                            backgroundColor: function (ctx: any) {
                                return ctx.active ? 'white' : null;
                            },
                            formatter: (value: number, chart: any) => Math.round(100 * (value / chart.dataset.data.reduce((prev: number, current: number) => prev + current, 0))) + "%",
                            padding: 4
                        }
                    }
                }
            }]
        }
        options = {
            ...options
        }
        return { data: withoutLabels, options }

    }
    const currentChart = () => {
   
        let options: any = {
            plugins: {
                legend:{
                    display: showLegends,
                    position: "right",
                    overflow: "visible",
                }
            }
        }

        switch (currentType) {
            case "doughnut":

                return <Doughnut plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)}   />
            case "radar":
                return <Radar plugins={[ChartDataLabels]} data={data} options={options}  />
            case "pie":
                return <Pie plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)}  />
            case "bar":
                return <Bar plugins={[ChartDataLabels]} data={data} options={options}  />
            default:
                return <Doughnut plugins={[ChartDataLabels]} {...pieDoughnutProps(options, data)}  />
        }
    }

    return <div className=''>
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
        <div className=' flex justify-center '>
            <div className='w-[200px] h-[200px]'>

                {currentChart()}
            </div>
        </div>
        <div className=' flex gap-3 '>
            <input type={"checkbox"} onClick={(ev:any)=>setShowLegends(ev.target.checked)}></input>
            <label className='text-xs'>Legends</label>
        </div>

    </div>
}

export default MainChart