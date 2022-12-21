// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma, PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const page: any = req.query.page
    const size: any = req.query.size
    
    const results = await prisma.organizations.findMany({
        skip: parseInt(page) * parseInt(size),
        take: parseInt(size),
    })
    
    res.status(200).json({ data: results })
}

