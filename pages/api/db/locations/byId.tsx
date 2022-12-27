// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const locationId: any = req.query.locationId
    const where = parseInt(locationId) ? {
        locationId: parseInt(locationId)
    } : {}
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

