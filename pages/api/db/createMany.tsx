// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    createdAmount: number
}
import { prisma } from '../../../db'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const data2 = JSON.parse(req.body).data
    const created = await data2.reduce(
        async (prev: any, current: any) => prev = prev + await prisma.locations.create({
            data: {
                ...current,
                organizations:{
                    create: current.organizations,
                } ,

            }
        }),0
    )
    res.status(200).json({ createdAmount: created })
}
