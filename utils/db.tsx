
import { chartFields } from '../constants'
import { Prisma, PrismaClient } from '@prisma/client'
import { LOCATIONS_DATA1_QUERY, LOCATIONS_DATA2_QUERY, LOCATIONS_DATA3_QUERY, LOCATIONS_DATA4_QUERY } from '../constants/db'


const prisma = new PrismaClient()

export const getAllChartsData = async () =>{
    const charsData: any = {}
    for (let nameIndex in chartFields) {
        charsData[chartFields[nameIndex]] = await getChartData(chartFields[nameIndex])
    }
    return charsData
}

export const getAllDataPercents = async () =>{
    const dataPercentages: any = [
        await prisma.$queryRaw(LOCATIONS_DATA1_QUERY),
        await prisma.$queryRaw(LOCATIONS_DATA2_QUERY),
        await prisma.$queryRaw(LOCATIONS_DATA3_QUERY),
        await prisma.$queryRaw(LOCATIONS_DATA4_QUERY),

    ]   
    return dataPercentages.map(
        (dataItem:any) => ({
            ...dataItem[0],
            value: Math.ceil(dataItem[0].value)
        })
    )
}

export const getChartData = async (fieldName: any) => {

    const charData: any = {
        labels: [],
        datasets: [
            {
                label: '% de capacidades',
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
    const totalCapacities = await prisma.organizations.count()

    charData.labels = groupBy.map(
        (item) => item[fieldName].toString()
    )

    charData.datasets[0].data = groupBy.map(
        (item) => (100*item._count[fieldName] / totalCapacities).toFixed(1)
    )

    return charData
}