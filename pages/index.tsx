import Dashboard from "../components/dashboard";
import { DashboardContextProvider } from "../context/DashboardContext";


export default function Home() {

  return  <div>
    <DashboardContextProvider>
      <Dashboard /> 
    </DashboardContextProvider>
  </div>
}



