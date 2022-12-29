// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const noTypeData: any = req.query

    const { page, size, locationId, ...filterParams } = noTypeData

    const where = parseInt(locationId)?{
        ...filterParams,
        locationId: parseInt(locationId)
    } : filterParams
    const results = await prisma.$transaction([
        prisma.organizations.aggregate({
            _count: {
                id: true,
            },
            where
        }),
        prisma.organizations.findMany({
            where,
            skip: parseInt(page) * parseInt(size),
            take: parseInt(size),
            orderBy: [
                {
                    locationId: 'desc',
                }
            ],
        })
    ])

    
    res.status(200).json({ data: results[1], pageAmount: Math.ceil(results[0]._count.id /parseInt(size))})
}

