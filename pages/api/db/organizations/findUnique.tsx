// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'
import { nullIfDefault } from '../../../../utils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const noTypeData: any = req.query
    const { id } = noTypeData

    const organizationData: any = await prisma.organizations.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!organizationData) {

        res.status(200).json({
            data: {}
        })
    }
    else {
        const { organization, laboratory, center, rdUnits, invGroup, minicienciasCategory, ...organizationDataLeft } = organizationData


        res.status(200).json({
            data: {
                ...organizationDataLeft,
                name: nullIfDefault(invGroup) || nullIfDefault(rdUnits) || nullIfDefault(center) || nullIfDefault(laboratory) || nullIfDefault(minicienciasCategory)
            }
        })
    }
}


