// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const field: any = req.query.field
    const distinctsData = await prisma.organizations.findMany({
        distinct: [field],
        select: {
            [field]: true,
        },
    })
    res.status(200).json(distinctsData.map(
        (distinctsItem) => distinctsItem[field]
    ))
}

