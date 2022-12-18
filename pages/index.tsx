import Dashboard from "../components/dashboard";
import HeatMap from "../components/HeatMap";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  const { user } = useAuth();
  return  <div>
    {user ? <Dashboard /> : <Login />}
  </div>
}
