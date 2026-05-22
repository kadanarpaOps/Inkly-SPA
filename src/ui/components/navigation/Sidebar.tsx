import { BookCopy, CircleUserRound, Compass, SquarePen } from "lucide-react";
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth";

type SidebarProps = {
  isSidebarOpen: boolean,
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, loading } = useAuth();

  const navItem = (path: string, label: string, icon: React.ReactNode) => {
    const isActive = location.pathname.includes(path);
    return (
      <a
        className={
          "flex items-center space-x-3 py-4 px-4 " + (
            isActive
              ? "text-high-enfasis bg-high-enfasis/10 rounded-r-full border-l-4 border-high-enfasis cursor-default"
              : "text-several-light hover:bg-several-light/10 hover:rounded-r-full hover:border-l-4 border-several-light transition-all duration-100 cursor-pointer"
          )
        }
        onClick={() => navigate(path)}
      >
        {icon}
        <span>{label}</span>
      </a>
    );
  };

  return (
    <>
      <aside
        className={`
          hidden lg:block
          ${isSidebarOpen ? "w-64" : "w-0"}
          transition-all duration-300 ease-in-out overflow-hidden shrink-0
        `}
      >
        <SidebarContent
          navItem={navItem}
          authUser={authUser}
          loading={loading}
          navigate={navigate}
        />
      </aside>

      <aside
        className={`
          lg:hidden
          fixed top-0 left-0 h-full z-50
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          navItem={navItem}
          authUser={authUser}
          loading={loading}
          navigate={navigate}
        />
      </aside>
    </>
  );
};

interface SidebarContentProps {
  navItem: (path: string, label: string, icon: React.ReactNode) => React.ReactNode;
  authUser: ReturnType<typeof useAuth>["authUser"];
  loading: boolean;
  navigate: ReturnType<typeof useNavigate>;
}

function SidebarContent({ navItem, authUser, loading, navigate }: SidebarContentProps) {
  return (
    <nav className="w-64 min-h-full p-6 border-r border-inputs-bg/15 bg-background-global flex flex-col">
      <div className="text-3xl font-bold tracking-tighter text-high-enfasis mb-8">
        Inkly
      </div>

      <div className="flex-1 space-y-3">
        {navItem("/explore", "Explorar",     <Compass size={26} />)}
        {navItem("/library", "Mi Biblioteca", <BookCopy size={26} />)}
        {navItem("/write",   "Escribir",      <SquarePen size={26} />)}
        {navItem("/profile", "Mi Cuenta",     <CircleUserRound size={26} />)}
      </div>

      <div className="mt-auto border-t border-inputs-bg/15">
        {authUser ? (
          <div className="mt-6 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={
                  authUser.profileImageUrl
                    ? authUser.profileImageUrl
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.userName)}&background=dcd7ba&color=16161d`
                }
                alt="Imagen de Perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-global truncate">{authUser.userName}</p>
              <p className="text-xs text-several-light">
                {authUser.role.roleName === "INKLY_USER" ? "Escritor" : "Administrador"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex mt-6 items-center justify-center">
            {!loading ? (
              <button
                className="w-full bg-primary-container text-on-primary-fixed font-bold py-2 cursor-pointer rounded-xl hover:scale-[0.98] transition-all"
                onClick={() => navigate("/auth", { state: { authAction: "LOGIN" } })}
              >
                Iniciar Sesión
              </button>
            ) : (
              <div className="flex items-center w-10 h-10">
                <div className="loading-button" />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;