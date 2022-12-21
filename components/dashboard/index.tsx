import ChartSection from "./ChartSection"
import ListSection from "./ListSection"


const Dashboard = () => {   
    return <div className="md:grid md:grid-cols-4 p-10 gap-4">
        <div className="col-span-3">
            <ChartSection />
        </div>
       <ListSection/>
    </div>
}


export default Dashboard
