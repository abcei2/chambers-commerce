
import { useEffect, useState } from "react"
import { OrganizationsType } from "../../types/dbTypes"

const ListSection = () => {

    const [organizationList, setOrganizationList] = useState<any>()

    useEffect(
        () => {
            fetch(
                "/api/db/organizations/pagination?" + new URLSearchParams({
                    page: "0",
                    size: "10",
                })
            ).then(
                (data) => data.json()
            ).then(
                (chartsDataJson) => setOrganizationList(chartsDataJson.data)
            )
        }, []
    )

    return <div className="flex flex-col gap-5">
        <div className="text-xl">
            ENTIDADES REGISTRADAS
        </div>

        {
            organizationList && organizationList.map(
                (organizationInfo: OrganizationsType, index: number) => <div key={index} className="border-2 border-gray-300 text center rounded">
                    {organizationInfo.organization}
                </div>
            )
        }

    </div>
}


export default ListSection
