// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const filterParams = req.query
    const results = (await prisma.locations.findMany({
        include: {
            organizations: {
                where: filterParams
            },
        }
    })).filter(
        (result)=> result.organizations.length > 0
    )
    res.status(200).json({ data: results })
}

