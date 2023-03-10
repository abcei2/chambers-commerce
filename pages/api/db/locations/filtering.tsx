// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const noTypeData:any = req.query
    const { page, size, locationId, ...filterParams } = noTypeData
    const where = parseInt(locationId) ? {
        ...filterParams,
        locationId: parseInt(locationId)
    } : filterParams

    const results = (await prisma.locations.findMany({
        include: {
            organizations: {
                where
            },
        }
    })).filter(
        (result)=> result.organizations.length > 0
    )

    res.status(200).json({ data: results })
}

