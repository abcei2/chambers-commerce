import ChartSection from "./ChartSection"
import ListSection from "./ListSection"


const Dashboard = () => {   
    return <div className=" md:grid flex flex-col md:grid-cols-4 p-10 gap-5 ">
        <div className=" gap-4 flex flex-col md:col-span-3">
            <ChartSection />
            <ChartSection />
        </div>
       <ListSection/>
       
    </div>
}


export default Dashboard
