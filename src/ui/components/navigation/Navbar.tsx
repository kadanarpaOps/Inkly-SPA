import { Bell, LogOut, PanelTopClose, Search } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth"

type NavbarProps = {
    isSidebarOpen: boolean | null,
    toggleSidebar: () => void
}

const Navbar = ({ isSidebarOpen, toggleSidebar }: NavbarProps) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, logout } = useAuth();

  return (
    <header className={`
      ${isSidebarOpen !== null ? "sticky" : "fixed"}
      top-0 z-40 w-full bg-background-global/80 backdrop-blur-sm
      px-4 md:pl-8 md:pr-12 py-4
    `}>
      <div className={`
        grid grid-cols-3 items-center
        ${location.pathname.includes("/write") && !isSidebarOpen
          ? "transition-opacity duration-500 opacity-0 hover:opacity-100"
          : ""}
      `}>

        {/* Izquierda — botón sidebar */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {isSidebarOpen !== null && (
            <button
              className="p-2 hover:bg-global/10 rounded-lg transition-colors cursor-pointer"
              onClick={toggleSidebar}
            >
              <PanelTopClose
                size={22}
                className={`transition-transform duration-300 transform
                  ${isSidebarOpen ? "rotate-270" : "rotate-90"}`}
              />
            </button>
          )}
        </div>

        {/* Centro — búsqueda */}
        <div className="flex justify-center items-center">
          <div className="flex items-center relative w-full max-w-xs">
            <button
              className="text-global hover:text-high-enfasis absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
              type="button"
            >
              <Search size={16} />
            </button>
            <input
              type="text"
              className="bg-search-bg border-none rounded-full py-2 pl-9 pr-4 text-sm text-global focus:ring-2 focus:ring-high-enfasis/50 w-full transition-all focus:outline-none"
              placeholder="Buscar..."
            />
          </div>
        </div>

        {/* Derecha — acciones usuario */}
        <div className="flex justify-end items-center gap-2 md:gap-4">
          {authUser && (
            <>
              <Bell fill="currentColor" size={22} className="cursor-pointer hover:text-high-enfasis transition-colors" />
              <LogOut
                size={22}
                className="cursor-pointer hover:text-high-enfasis transition-colors"
                onClick={() => { logout(); navigate("/auth"); }}
              />
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;