
import ChartSection from "./ChartSection"


const Dashboard = (props: {
    distinctsOrganization: string[]
}) => {

    return <div className="md:grid md:grid-cols-4 p-10 gap-4">
        <div className="col-span-3">

            <ChartSection  {...props} />
        </div>
        <div className="flex flex-col gap-5">
            <div className="text-xl">
                ENTIDADES REGISTRADAS
            </div>
            <div className="border-2 border-gray-300 text center rounded">
                        Institución 1
            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
            <div className="border-2 border-gray-300 text center rounded">
                Institución 1

            </div>
        </div>
    </div>
}


export default Dashboard
