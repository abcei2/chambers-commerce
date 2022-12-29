export const chartFields = [
    'municipality','category', 'kind', 'area', 'productiveSector', 'ri4Type'
]

export const ORGANIZATION_FIELDS = [
    { name: 'organization', showName: 'Organización' },
    { name: 'category', showName: 'Categoría' },
    { name: 'kind', showName: 'Carácter' },
    { name: 'address', showName: 'Dirección' },
    { name: 'municipality', showName: 'Municipio' },
    { name: 'webPage', showName: 'Pagina Web' },
    { name: 'contact', showName: 'Contacto' },
    { name: 'position', showName: 'Cargo' },
    { name: 'email', showName: 'Correo' },
    { name: 'phone', showName: 'Teléfono' },
    { name: 'area', showName: 'Área' },
    { name: 'productiveSector', showName: 'Sector Productivo' },
    { name: 'rdUnits', showName: 'Unidades I+D' },
    { name: 'invGroup', showName: 'Categoria Minciencias' },
    { name: 'minicienciasCategory', showName: 'Categoria Minciencias' },
    { name: 'center', showName: 'Centro' },
    { name: 'laboratory', showName: 'Laboratorio' },
    { name: 'ri4', showName: '4RI' },
    { name: 'ri4Type', showName: 'Tipo4RI' },
    { name: 'bussinesModel1', showName: 'Modelo de Negocio 1' },
    { name: 'bussinesModel2', showName: 'Modelo de Negocio 2' },
    { name: 'bussinesModel3', showName: 'Modelo de Negocio 3' },
    { name: 'bussinesModel4', showName: 'Modelo de Negocio 4' },
    { name: 'bussinesModel5', showName: 'Modelo de Negocio 5' },
    { name: 'client1', showName: 'Cliente 1' },
    { name: 'client2', showName: 'Cliente 2' },
    { name: 'client3', showName: 'Cliente 3' },
    { name: 'client4', showName: 'Cliente 4' },
]
export const locationFields = [
    "organization",
    "nit",
    "lat", "long",
    "category",
    "kind",
    "address",
    "municipality",
    "webPage",
    "phone",
]

export const integerFields = ["ri4","locationId"]
export const floatFields = ["lat", "long"]

export const filterFields:any = {    
    kind: "Característica",
    category: "Categoría",
    area: "Area",
    productiveSector: "Sector Productivo",
    municipality:"Municipio",
    ri4Type: "Tipo de 4RI",
}

export const filterFieldsNoLocationsInfo: any = {
    area: "Area",
    productiveSector: "Sector Productivo",
    ri4Type: "Tipo de 4RI",
}