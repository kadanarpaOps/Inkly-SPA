import { useState } from "react";
import LoginLeftPanel from "../../components/decorative/LoginLeftPanel";
import LoginForm from "./forms/LoginForm";
import RegisterLeftPanel from "../../components/decorative/RegisterLeftPanel";
import RegisterForm from "./forms/RegisterForm";
import { useLocation } from "react-router";

export default function Auth() {

  const location = useLocation();
  const [authAction, setAuthAction] = useState<string>(location.state?.authAction || "LOGIN");

  return (
    <main
      className={
        authAction === "LOGIN"
          ? "min-h-screen flex items-center justify-center px-4 py-8 md:px-0 md:py-0"
          : "overflow-hidden"
      }
    >
      <div
        className={
          authAction === "LOGIN"
            ? "w-full max-w-6xl grid grid-cols-1 md:grid-cols-10 overflow-hidden rounded-xl min-h-auto md:min-h-170 drop-shadow-2xl"
            : "flex min-h-screen md:h-screen w-full overflow-hidden"
        }
      >
        {/* Panel izquierdo — decorativo */}
        <section
          className={
            authAction === "LOGIN"
              ? "hidden md:flex md:col-span-4 bg-background-global relative overflow-hidden flex-col px-12 py-8 justify-between"
              : "hidden lg:flex lg:w-[40%] bg-background-global relative overflow-hidden flex-col p-12"
          }
        >
          {authAction === "LOGIN" ? <LoginLeftPanel /> : <RegisterLeftPanel />}
        </section>

        {/* Panel derecho — formulario */}
        <section
          className={
            authAction === "LOGIN"
              ? "col-span-1 md:col-span-6 bg-surface-container-low p-6 sm:p-8 md:p-16 flex flex-col"
              : "w-full lg:w-[60%] flex items-center justify-center bg-background-global px-6 py-10 sm:py-12 md:px-24"
          }
        >
          <div className="flex flex-col gap-6 sm:gap-8 transition-all w-full">
            <nav className="flex space-x-6 sm:space-x-8">
              <button
                className={
                  "pb-3 sm:pb-4 text-base sm:text-lg font-medium cursor-pointer transition-all " +
                  (authAction === "LOGIN"
                    ? "text-high-enfasis border-b-2 border-high-enfasis"
                    : "text-several-light hover:text-global")
                }
                onClick={() => setAuthAction("LOGIN")}
              >
                Iniciar Sesión
              </button>
              <button
                className={
                  "pb-3 sm:pb-4 text-base sm:text-lg font-medium transition-all cursor-pointer " +
                  (authAction === "REGISTER"
                    ? "text-high-enfasis border-b-2 border-high-enfasis"
                    : "text-several-light hover:text-global")
                }
                onClick={() => setAuthAction("REGISTER")}
              >
                Registrarse
              </button>
            </nav>
            {authAction === "LOGIN" ? <LoginForm /> : <RegisterForm />}
          </div>
        </section>
      </div>
    </main>
  );
}