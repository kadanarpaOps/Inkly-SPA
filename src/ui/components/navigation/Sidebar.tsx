import { BookCopy, CircleUserRound, Compass, SquarePen } from "lucide-react";
import { useLocation, useNavigate } from "react-router"

const Sidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

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
    </nav>
  )
}

export default Sidebar