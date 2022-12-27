// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from './db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const results = await prisma.locations.findMany()

    res.status(200).json({ data: results })
}

