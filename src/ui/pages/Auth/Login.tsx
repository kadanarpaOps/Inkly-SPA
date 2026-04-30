export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-10 overflow-hidden rounded-xl min-h-200">
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
            <div className="w-full max-w-xs aspect-3/4 relative mb-8 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuDoYYdLl9lqmZJ4NwoR5AdFWcEjNvH1jmg8Jq0kjfFMNUnwQHuVkcObt5uSYPSza3mzTYbEiSMPzYXkMWUygbdeJ6ZmqkPy1XPufN8fL-qzgWcNEisTLHvi-MFxObYcUabfzmQF2aG6SBAGD7GAnbOOdPtQ86Vfu2WkH-Q7oE1AOn8wRwoqOWlPaceZOZ-ubMyBdA8VKg1uo_l19V5NsrRl48NRaqrfKDgGBGoIr1A3EPWcKGgqSudZbJojeOjPnhUT3wpo6r6oM"
                alt="Libros antiguos apilados"
                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500"
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
      </div>
    </main>
  );
}
