// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const filterParams = req.query
    const results = (await prisma.locations.findMany({
        select: {
            organizations: {
                where: filterParams
            },
            lat:true,
            long:true
        },
    })).filter(
        (result)=> result.organizations.length > 0
    )

    res.status(200).json({ data: results })
}

