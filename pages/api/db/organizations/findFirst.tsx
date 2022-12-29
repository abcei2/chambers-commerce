
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const organizationData: any = await prisma.organizations.findFirst({
            select: {
                id: true,
                locationId:true
            }
        }
    )

    if (!organizationData) {

        res.status(200).json({
            data: {}
        })
    }
    else {
        res.status(200).json({
            locationId: organizationData.locationId,
            organizationId: organizationData.id, 
        })
    }
}


