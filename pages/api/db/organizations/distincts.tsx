// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const chartFields = [
    'category', 'kind', 'area', 'productiveSector', 'ri4', 
]
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const charsData:any = {}
    for(let nameIndex in chartFields){
        charsData[chartFields[nameIndex]] = await getChartData(chartFields[nameIndex])
    }
    res.status(200).json(charsData)
}


const getChartData = async (fieldName:any)=>{

    const charData: any = {
        labels: [],
        datasets: [
            {
                label: '# de entidades',
                data: []
            },
        ],
    }

    const groupBy = await prisma.organizations.groupBy({
        by: [fieldName],
        _count: {
            [fieldName]: true,
        }
    })

    charData.labels = groupBy.map(
        (item) => item[fieldName].toString()
    )

    charData.datasets[0].data = groupBy.map(
        (item) => item._count[fieldName]
    )

    return charData
}