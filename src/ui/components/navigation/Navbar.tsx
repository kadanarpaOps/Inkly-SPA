import { Bell, LogOut, PanelTopClose, Search, } from "lucide-react"
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
    <header className={`${isSidebarOpen !== null ? 'sticky' : 'fixed'} top-0 z-40 w-full bg-background-global/80 backdrop-blur-sm pl-8 pr-12 py-4`}>
        <div className={`grid grid-cols-3 items-center
            ${location.pathname.includes("/write") && !isSidebarOpen && 'transition-opacity duration-500 opacity-0 hover:opacity-100'}
        `}>
            <div className="flex items-center space-x-4">
                {isSidebarOpen !== null && (
                    <>
                        <button
                            className="p-2 hover:bg-global/10 rounded-lg transition-colors cursor-pointer"
                            onClick={toggleSidebar}
                        >
                            <PanelTopClose
                                size={24}
                                className={`transition-transform duration-300 transform
                                    ${isSidebarOpen ? "rotate-270" : "rotate-90"}`}
                            />
                        </button>
                        <span className="text-global font-semibold text-lg hidden md:block">
                        </span>
                    </>
                )}
            </div>
            <div className="flex justify-center items-center">
                <div className="flex items-center relative group">
                    <button
                      className="text-global hover:text-high-enfasis absolute top-2.2 left-3 opacity-50"
                      type="button"
                    >
                        <Search size={18} />
                    </button>
                    <input
                        type="text"
                        className="bg-search-bg border-none rounded-full py-2 pl-10 pr-6 text-sm text-global focus:ring-2 focus:ring-high-enfasis/50 w-64 transition-all focus:outline-none"
                        placeholder="Buscar Historias..."
                    />
                </div>
            </div>
            <div className="flex justify-end">
                {authUser && (
                    <>
                        <Bell fill="currentColor" size={26} />
                        <LogOut
                            size={26}
                            className="ml-4 md:ml-8 cursor-pointer hover:text-high-enfasis"
                            onClick={() => {logout(); navigate("/explore")}}
                        />
                    </>
                )}
            </div>
        </div>
    </header>
  )
}

export default Navbar
