
import type { NextApiRequest, NextApiResponse } from 'next'
import { GET_RAND_ORGANIZATION } from '../../../../constants/db'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const organizationData: any = await prisma.$queryRaw(GET_RAND_ORGANIZATION)

    res.status(200).json({
        locationId: organizationData[0].locationId,
        organizationId: organizationData[0].id, 
    })
    
}


