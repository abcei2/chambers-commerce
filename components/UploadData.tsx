
import readXlsxFile, { Row } from 'read-excel-file'
import { floatFields, integerFields, locationFields, organizationFields } from '../constants';
// File.


const UploadData = () => {

    const toDbData = async (rows: Row[], fieldNames: string[], fieldNameOffset: number = 0) => rows.map(
        (row) => row.reduce(
            (prev, current: any, currentIndex) => {
                if (currentIndex == fieldNameOffset - fieldNameOffset) return {}
                let currentData: any = current
                if (integerFields.includes(fieldNames[currentIndex - fieldNameOffset]))
                    currentData = parseInt(current) || 0
                else if (floatFields.includes(fieldNames[currentIndex - fieldNameOffset]))
                    currentData = parseFloat(current) || 0
                else
                    currentData = current ? current.toString() : "No data"

                return {
                    ...prev,
                    [fieldNames[currentIndex - fieldNameOffset]]: currentData
                }
            }, {}
        )
    )


    const onFileChange = async (ev:any) => {

        const locationRows = await readXlsxFile(ev.target.files[0], { sheet: 2 })
        const organizationRows = await readXlsxFile(ev.target.files[0], { sheet: 1 })
        const organizationData = await toDbData(organizationRows, organizationFields)
        const locationData = (await toDbData(locationRows, locationFields, 1)).map(
            (locationObj: any) => (
                {
                    ...locationObj,
                    organizations: organizationData.filter(
                        (organization: any) => organization.organization == locationObj.organization
                    )
                }
            )
        )
        const dataUploaded = await fetch("/api/db/createMany",
            {
                method: "POST",
                body: JSON.stringify({
                    data: locationData
                })
            })
        console.log(dataUploaded)
    }

    return <input type="file" onChange={onFileChange} />

   
}

export default UploadData