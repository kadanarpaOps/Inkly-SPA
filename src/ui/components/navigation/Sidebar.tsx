import { useLocation } from "react-router"
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {

    const location = useLocation();
    const { authUser } = useAuth();

  return (
    <nav className="sticky left-0 top-0 h-screen w-64 border-r border-inputs-bg/15 bg-background-global flex flex-col p-6 z-50">

    </nav>
  )
}

export default Sidebar