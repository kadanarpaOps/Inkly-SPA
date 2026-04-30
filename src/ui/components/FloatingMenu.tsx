import { useState } from "react";

type Props = {
  start: () => void,
  pause: () => void,
  stop: () => void,
  speechStatus: string
}

function FloatingMenu({ start, pause, stop, speechStatus }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {/* Botones desplegables */}
      <div className={`flex flex-col items-end space-y-2 mb-2 transation-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <button
          onClick={start}
          className="bg-gray-500 text-white w-14 h-14 rounded-full shadow hover:bg-gray-600 transition"
        >
          S
        </button>
        <button
          onClick={pause}
          className="bg-gray-500 text-white w-14 h-14 rounded-full shadow hover:bg-gray-600 transition"
        >
          P
        </button>
        <button
          onClick={stop}
          className="bg-gray-500 text-white w-14 h-14 rounded-full shadow hover:bg-gray-600 transition"
        >
          St
        </button>
      </div>
        
      {/* Boton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-gray-700 transition"
      >
        {speechStatus !== "started" ? "O" : "⏸"}
      </button>
    </div>
  );
}

export default FloatingMenu