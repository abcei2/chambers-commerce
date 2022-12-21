import { useEffect } from "react";
import Dashboard from "../components/dashboard";
import HeatMap from "../components/HeatMap"; 
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default function Home(props:{
  fieldNames:string[],
  distinctsOrganization:string[]
}) {


  return  <div>
    <Dashboard {...props} /> 
  </div>
}


export const getServerSideProps = async ({ req }) => {
  
  const token = req.headers.AUTHORIZATION
  const distinctsOrganization = await prisma.organizations.findMany({
    distinct:["organization"]
  })
  const fieldNames = Prisma.dmmf.datamodel.models.find(model => model.name === "Organizations")?.fields.map(
    (field) => field.name
  )
  return { props: { distinctsOrganization, fieldNames } }
}