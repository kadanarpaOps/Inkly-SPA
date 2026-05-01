import { Eye } from "lucide-react";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-10 overflow-hidden rounded-xl min-h-170 drop-shadow-2xl">
        {/** Left Panel */}
        <section className="hidden md:flex md:col-span-4 bg-background-global relative overflow-hidden flex-col px-12 py-8 justify-between">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-waves-decoration opacity-20 blur-3xl"></div>
          <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 rounded-full bg-waves-decoration opacity-30 blur-3xl"></div>
          <div className="relative z-10">
            <span className="text-3xl font-semibold tracking-tighter text-global">
              Inkly
            </span>
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-full max-w-xs relative mb-8 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuDoYYdLl9lqmZJ4NwoR5AdFWcEjNvH1jmg8Jq0kjfFMNUnwQHuVkcObt5uSYPSza3mzTYbEiSMPzYXkMWUygbdeJ6ZmqkPy1XPufN8fL-qzgWcNEisTLHvi-MFxObYcUabfzmQF2aG6SBAGD7GAnbOOdPtQ86Vfu2WkH-Q7oE1AOn8wRwoqOWlPaceZOZ-ubMyBdA8VKg1uo_l19V5NsrRl48NRaqrfKDgGBGoIr1A3EPWcKGgqSudZbJojeOjPnhUT3wpo6r6oM"
                alt="Libros antiguos apilados"
                className="w-full object-cover rounded-lg opacity-80 group-hover:opacity-100 max-h-80 transition-opacity duration-500"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-global">
              Donde las palabras cobran vida.
            </h2>
            <p className="text-several-light font-light leading-relaxed max-w-xs">
              Tu santuario personal para la lectura profunda y la creación
              literaria.
            </p>
          </div>
          <div className="relative z-10 text-xs text-several-light opacity-50">
            © 2026 Inkly. Inspirando narrativas.
          </div>
        </section>
        {/** Right Panel */}
        <section className="col-span-1 md:col-span-6 bg-surface-container-low p-8 md:p-16 flex flex-col">
          <div className="flex gap-8 mb-12">
            <button className="pb-4 text-lg font-medium text-high-enfasis border-b-2 border-high-enfasis transition-all cursor-pointer">
              Iniciar Sesión
            </button>
            <button className="pb-4 text-lg font-medium text-several-light hover:text-global transition-all cursor-pointer">
              Registrarse
            </button>
          </div>
          <div className="grow flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-global mb-2">
                Bienvenido
              </h1>
              <p className="text-several-light">¿Preparado para entintarte?</p>
            </div>
            <form action="" className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
                  Usuario o Correo
                </label>
                <input type="text"
                  className="w-full bg-inputs-bg border-none text-global placeholder-several-light rounded-xl px-5 py-4 mt-2 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
                  placeholder="ejemplo@inkly.dev"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-widest text-several-light ml-1">
                    Contraseña
                  </label>
                  <a className="text-xs font-medium text-several-light hover:text-high-enfasis transition-colors cursor-pointer">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <input type="password"
                  className="w-full bg-inputs-bg border-none text-global placeholder-several-light rounded-xl px-5 py-4 mt-2 focus:ring-2 focus:ring-high-enfasis focus:outline-none transition-all"
                  placeholder="Ingresa tu contraseña"
                  />
                  <button className="text-several-light hover:text-high-enfasis absolute top-6.5 right-4" type="button">
                    <Eye size={20} className="cursor-pointer"></Eye>
                  </button>
                </div>
              </div>
              <button
              className="w-full bg-primary-container text-on-primary-fixed font-bold py-4 cursor-pointer rounded-full hover:shadow-lg hover:shadow-high-enfasis/20 active:scale-[0.98] transition-all mt-2" type="submit">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
