
import Dashboard from "../components/dashboard";
import { DashboardContextProvider } from "../context/DashboardContext";
import { getAllChartsData } from "../utils/db";

export default function Home(props: { chartsData :any}) {
  return  <div>
    <DashboardContextProvider defaultChartsData={props.chartsData}>
      <Dashboard /> 
    </DashboardContextProvider>
  </div>
}
// Fetch all posts (in /pages/index.tsx)
export async function getStaticProps() {
  const chartsData = await getAllChartsData()
  return {
    props: {chartsData }
  }
}


