
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {

    const noTypeData: any = req.query
    const { id } = noTypeData

    
    const locationData: any = await prisma.locations.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    res.status(200).json({ data: locationData })
}

