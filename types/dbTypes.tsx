export type User = {
    id: string,
    name: string,
    email: string,
}

export type OrganizationsType = {

    locationId?: number,

    organization: string,
    category: string,
    kind: string,
    address: string,
    municipality: string,
    contact: string,
    webPage: string,
    position: string,
    email: string,
    phone: string,
    area: string,
    productiveSector: string,

    rdUnits: string,
    invGroup: string,
    minicienciasCategory: string,
    center: string,
    laboratory: string,

    ri4: number
    ri4Type: string,

    bussinesModel1: string,
    bussinesModel2: string,
    bussinesModel3: string,
    bussinesModel4: string,
    bussinesModel5: string,

    client1: string,
    client2: string,
    client3: string,
    client4: string,
}

export type LocationsType = {
    id?: number,
    organizations:OrganizationsType[]
    organization: string,
    nit: string,
    lat: number,
    long: number,
    category: string,
    kind: string,
    address: string,
    municipality: string,
    webPage: string,
    phone: string,
}

