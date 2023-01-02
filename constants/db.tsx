
import { Prisma, PrismaClient } from '@prisma/client'
const MUNICIPALITY_CHART2_QUERY = Prisma.sql`
    select (count(*)* 100)/(select count(*) from Locations) percentage, municipality
    from
    (
        select
            count(*) counts,
            o.municipality
        from
            Locations l
        inner join Organizations o on
            o.locationId = l.id
        where
            o.ri4Type <> 'No data'
        group by
            o.locationId,
            o.municipality
    )a
    GROUP by
        municipality;
`

const MUNICIPALITY_CHART3_QUERY = Prisma.sql`
    select	 sum(counts) idUnits,	municipality
    from
        (
		select
			count(*) counts,
			o.municipality
		from
			Locations l
		inner join Organizations o on
			o.locationId = l.id
		where
			o.rdUnits  <> 'No data'
		group by
			o.locationId,
			o.municipality
		)a
    GROUP by
        municipality;
`

const MUNICIPALITY_CHART4_QUERY = Prisma.sql`
select	 sum(counts) invGroup,	municipality from(
	select
		count(*) counts,
		o.municipality
	from
		Locations l
	inner join Organizations o on
		o.locationId = l.id
	where
		o.invGroup  <> 'No data'
	group by
		o.locationId,
		o.municipality
)a 
GROUP by
municipality;
`

export const LOCATIONS_DATA1_QUERY = Prisma.sql`
    select 100*count(*)/(select count(*) from Locations l) value, 'Laboratorios' name, 'Entidades' title from 
    ( 
        select count(*) from Locations l inner join Organizations o on o.locationId = l.id 
        where o.laboratory <> 'No data' group by o.locationId
    ) a
`
export const LOCATIONS_DATA2_QUERY = Prisma.sql`
    select 100*count(*)/(select count(*) from Locations l) value, 'Capacidad 4RI' name, 'Entidades' title  from 
    ( 
        select count(*) from Locations l inner join Organizations o on o.locationId = l.id 
        where o.ri4  = 1 group by o.locationId
    ) a
`
export const LOCATIONS_DATA3_QUERY = Prisma.sql`
    select 100*count(*)/(select count(*) from Locations l) value, 'Trabajan consultoría' name, 'Modelo de negocio' title from 
    ( 
        select count(*) from Locations l inner join Organizations o on o.locationId = l.id  
        where o.bussinesModel1 = 'Consultoría' or o.bussinesModel2 = 'Consultoría' or o.bussinesModel3 = 'Consultoría' or o.bussinesModel4 = 'Consultoría' group by o.locationId
    ) a
`
export const LOCATIONS_DATA4_QUERY = Prisma.sql`
    select 100*count(*)/(select count(*) from Locations l) value, 'Clientes empresariales' name, 'Tipo de clientes' title from 
    ( 
        select count(*) from Locations l inner join Organizations o on o.locationId = l.id  
        where o.client1 = 'Empresas/ Agremiaciones' or o.client2 = 'Empresas/ Agremiaciones' or o.client3 = 'Empresas/ Agremiaciones' or o.client4 = 'Empresas/ Agremiaciones' group by o.locationId
    ) a
`


export const GET_RAND_ORGANIZATION = Prisma.sql`
    SELECT *
    FROM Organizations
    ORDER BY RAND()
    LIMIT 1
`