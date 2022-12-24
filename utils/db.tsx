
import { chartFields } from '../constants'
import { Prisma, PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const getAllChartsData = async () =>{
    const charsData: any = {}
    for (let nameIndex in chartFields) {
        charsData[chartFields[nameIndex]] = await getChartData(chartFields[nameIndex])
    }
    return charsData
}

export const getChartData = async (fieldName: any) => {

    const charData: any = {
        labels: [],
        datasets: [
            {
                label: '# de capacidades',
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