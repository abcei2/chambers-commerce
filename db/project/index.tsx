
import { doc, writeBatch, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { Row } from "read-excel-file";
import { uuidv4 } from "@firebase/util";


import db from "../firebase";

const ORGANIZATIONS_COLLECTION = "organization"
const LOCATION_COLLECTION = "location"

const ORGANIZATION_COLUMNS = [
    "Organización",    "Categoria",
    "Carácter",    "Dirección",
    "Municipio",    "Pagina Web",
    "Persona_Contacto",    "Cargo",
    "Correo",    "Teléfono",
    "Área",    "Sector Productivo",
    "Unidades I + D",    "Grupo Inv",
    "Categoria Minciencias",    "Centro",
    "Laboratorio",    "4RI",
    "Tipo4RI",    "Modelo de Negocio 1",
    "Modelo de Negocio 2",    "Modelo de Negocio 3",
    "Modelo de Negocio 4",    "Modelo de Negocio 5",
    "Cliente1",    "Cliente2",
    "Cliente3",    "Cliente4"
]

export const saveOrganizations = (
    organizationData: Row[]

) =>{
    let batch = writeBatch(db);
    organizationData.forEach(
        (organizationItem, itemIndex)=>{
            const organizationObj:any = {}
            organizationItem.map(
                (organizationValue,index) =>{
                    organizationObj[ORGANIZATION_COLUMNS[index]]=organizationValue
                }
            )
            if ((itemIndex+1)%500==0){
                console.log(itemIndex)
                batch.commit()
                batch = writeBatch(db);
            }
            console.log(doc(db, ORGANIZATIONS_COLLECTION, uuidv4()))
            batch.set(doc(db, ORGANIZATIONS_COLLECTION, uuidv4()), organizationObj, { merge: true });
        }
    )
    batch.commit()
}
