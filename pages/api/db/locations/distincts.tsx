// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const field: any = req.query.field
    const distinctsData = await prisma.locations.findMany({
        distinct: [field],
        select: {
            [field]: true,
            id: true,
            organizations:true
        },
        orderBy: {
            organization: "desc"
        }
    })
    res.status(200).json(distinctsData.map(
        (distinctsItem) => (
            { value: distinctsItem.id, label: distinctsItem[field], firtsOrganizationId: distinctsItem.organizations[0]?.id || -1 }
        )
    ))
}

