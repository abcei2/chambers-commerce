
import { Doughnut, Radar, Pie, Bar } from 'react-chartjs-2';
import "chart.js/auto";
import React, { useState } from 'react'; 

const MainChart = (
    props: {
        data: any,
        title:string
    }
) => {
    const { data, title } = props
    const chartTypes = ["doughnut", "radar", "pie","bar"]
    const [currentType, setCurrentType] = useState<string>()
    const onTypeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentType(ev.target.value)
    }

    const currentChart = () => {
        let options: any = {
            plugins: {
            }
        };

        switch (currentType) {
            case "doughnut":
                options = {
                    ...options,
                    plugins: {
                        ...options.plugins,
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    }
                }
                return <Doughnut data={data} options={options} />
            case "radar":
                return <Radar data={data} options={options} />
            case "pie":
                options = {
                    ...options,
                    plugins: {
                        ...options.plugins,
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'dot'
                            }
                        }
                    }
                }
                return <Pie data={data} options={options} />
            case "bar":
                return <Bar data={data} options={options} />
            default:
                options = {
                    ...options,
                    plugins: {
                        ...options.plugins,
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle'
                            }
                        }
                    }
                }
                return <Doughnut data={data} options={options} />
        }
    }

    return <div className='border-2 border-black rounded'>
        <div className='flex justify-between px-5'>
            <div>{title}  </div>
           {
                <select onChange={onTypeChange}>
                    {
                        chartTypes.map(
                            (chartType, index) => <option key={index} value={chartType}>{chartType}</option>
                        )
                    }
                </select>
            }
        </div>
        <div className='w-full h-full'>

            {currentChart()}
        </div>
    </div>
}

export default MainChart