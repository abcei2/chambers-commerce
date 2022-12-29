import { floatFields, integerFields, ORGANIZATION_FIELDS } from "../constants";

export const getOrganizationSchema = () => ORGANIZATION_FIELDS.map(
    (field) => ({
        column: field.showName,
        type: (integerFields.includes(field.name) || floatFields.includes(field.name)) ? Number:String,
        value: (organization: any) => organization[field.name]
    })
)