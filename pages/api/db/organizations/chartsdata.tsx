// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllChartsData } from '../../../../utils/db'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
  
    res.status(200).json(await getAllChartsData())
}

