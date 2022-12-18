import MainChart from "./MainChart";
import readXlsxFile from 'read-excel-file'
import { useEffect, useRef } from "react";
import { saveOrganizations } from "../../db/project";

// File.

const ChartSection = () => {
    const inputRef = useRef()
    const data = {
        labels: ['1. Institución Técnica Profesional.',
            '2. Institución Tecnológica.', '3. Institución Universitaria/ Escuela Tecnológica.',
            '4. Universidad.', '5. Centros de Investigación.', '6. Centros de Innovación.'],
        datasets: [
            {
                label: '# de entidades',
                data: [12, 19, 3, 5, 2, 3]
            },
        ],
    };
    const onFileChange = (ev) => {

        console.log(ev.target)
            readXlsxFile(ev.target.files[0]).then((rows) => {
                saveOrganizations(rows.slice(1,rows.length))
                
            })
    }
 

    return (<div className='flex flex-col overflow-auto p-10 '>
        <div className='flex h-auto'>
            <MainChart data={data} />
            <MainChart data={data} />
            <MainChart data={data} />
        </div>
        <div className='flex h-auto'>
            <MainChart data={data} />
            <MainChart data={data} />
            <MainChart data={data} />
        </div>
        <input type="file" onChange={onFileChange} />
    </div>
    )
}

export default ChartSection