import { BookCopy, CircleUserRound, Compass, SquarePen } from "lucide-react";
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  return (
    <nav className="sticky left-0 top-0 h-screen w-64 border-r border-inputs-bg/15 bg-background-global flex flex-col p-6 z-50">
        <div className="text-3xl font-bold tracking-tighter text-high-enfasis mb-8">
          Inkly
        </div>
        <div className="flex-1 space-y-3">
          <a
            className={"flex items-center space-x-3 py-4 px-4 ".concat(
            location.pathname.includes("/explore")
            ? "text-high-enfasis bg-high-enfasis/10 rounded-r-full border-l-4 border-high-enfasis cursor-default"
            : "text-several-light hover:bg-several-light/10 hover:rounded-r-full hover:border-l-4 border-several-light transition-all duration-100 cursor-pointer")}
            onClick={() => navigate("/explore")}
          >
            <Compass size={26} />
            <span>Explorar</span>
          </a>
          <a
            className={"flex items-center space-x-3 py-4 px-4 ".concat(
            location.pathname.includes("/library")
            ? "text-high-enfasis bg-high-enfasis/10 rounded-r-full border-l-4 border-high-enfasis cursor-default"
            : "text-several-light hover:bg-several-light/10 hover:rounded-r-full hover:border-l-4 border-several-light transition-all duration-100 cursor-pointer")}
            onClick={() => navigate("/library")}
          >
            <BookCopy size={26} />
            <span>Mi Biblioteca</span>
          </a>
          <a
            className={"flex items-center space-x-3 py-4 px-4 ".concat(
            location.pathname.includes("/write")
            ? "text-high-enfasis bg-high-enfasis/10 rounded-r-full border-l-4 border-high-enfasis cursor-default"
            : "text-several-light hover:bg-several-light/10 hover:rounded-r-full hover:border-l-4 border-several-light transition-all duration-100 cursor-pointer")}
            onClick={() => navigate("write")}
          >
            <SquarePen size={26} />
            <span>Escribir</span>
          </a>
          <a
            className={"flex items-center space-x-3 py-4 px-4 ".concat(
            location.pathname.includes("/profile")
            ? "text-high-enfasis bg-high-enfasis/10 rounded-r-full border-l-4 border-high-enfasis cursor-default"
            : "text-several-light hover:bg-several-light/10 hover:rounded-r-full hover:border-l-4 border-several-light transition-all duration-100 cursor-pointer")}
            onClick={() => navigate("/profile")}
          >
            <CircleUserRound size={26} />
            <span>Mi Cuenta</span>
          </a>
        </div>
        <div className="mt-auto border-t border-inputs-bg/15">
          { authUser ? (
            <div className="mt-6 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCsnFhyjVfUyaR7ufPrrLxwdMFvsrYPCx7MA_RinvozvIC6Aj3cm5vMVbuFI3vi_A6ZHrPABua37CDh7R0cLoeHUdDckfGusen9a81PDZ8n1vAHdn_RIFXFULHr-TV2GmZa1pi9CnXUyfM8u0B4zj-4iPe48L1PQoO2p-Dgzlfex5qxJTYBRtNKIIUGcEteqjxxkhXTIFJJlyT1wBQl8VTDe4cykAgOaNlseUiQCBdmhvD_0CZvlmdJYb6CaOezm-MmKl4jjouC-w"
                  alt="Imágen de Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-global">Nolan Grayson</p>
                <p className="text-xs text-several-light">Escritor</p>
              </div>
            </div>
          ) : (
            <div className="flex mt-6 items-center justify-center">
              <button
                className="w-full bg-primary-container text-on-primary-fixed font-bold py-2 cursor-pointer rounded-xl hover:scale-[0.98] transition-all"
                onClick={() => {
                  const authAction = "LOGIN";
                  navigate("/auth", {
                    state: { authAction }
                  });
                }}
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
    </nav>
  )
}

export default Sidebar