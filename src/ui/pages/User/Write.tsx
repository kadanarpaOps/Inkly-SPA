import { Bold, ChevronDown, Italic, TextAlignCenter, TextAlignEnd, TextAlignJustify, TextAlignStart, Underline } from "lucide-react";

export default function Write() {

    return (
        <div className="grow flex flex-col items-center px-12 pb-12 overflow-y-auto writing-canvas">
            {/** Barra de Herramientas */}
            <div className="sticky top-4 z-30 w-full max-w-4xl bg-search-bg/90 backdrop-opacity-95 rounded-2xl p-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] mb-12">
                <div className="flex items-center space-x-1">
                    {/** Font Selector */}
                    <div className="relative group px-3 border-r border-toolbar-bg/30">
                        <button className="flex items-center cursor-pointer space-x-2 text-sm text-global py-1.5 px-2 hover:bg-toolbar-bg/50 rounded transition-all">
                            <span>Serif (Clásica)</span>
                            <ChevronDown size={20} />
                        </button>
                    </div>
                    {/** Formatting Options */}
                    <div className="flex items-center px-2 space-x-1 border-r border-toolbar-bg/30">
                        <button className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-lg bg-high-enfasis text-background-global transition-transform hover:scale-90">
                            <Bold size={20} strokeWidth={3} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-several-light hover:bg-toolbar-bg/50 hover:text-global duration-300 transition-all">
                            <Italic size={20} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-several-light hover:bg-toolbar-bg/50 hover:text-global duration-300 transition-all">
                            <Underline size={20} />
                        </button>
                    </div>
                    {/** Alignment Options */}
                    <div className="flex items-center px-2 space-x-1">
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-global bg-toolbar-bg/50">
                            <TextAlignStart size={20} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-global hover:bg-toolbar-bg/50 hover:text-global duration-300 transition-all">
                            <TextAlignCenter size={20} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-global hover:bg-toolbar-bg/50 hover:text-global duration-300 transition-all">
                            <TextAlignEnd size={20} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center cursor-pointer rounded-lg text-global hover:bg-toolbar-bg/50 hover:text-global duration-300 transition-all">
                            <TextAlignJustify size={20} />
                        </button>
                    </div>
                </div>
                <button className="bg-high-enfasis cursor-pointer text-background-global px-6 py-2 rounded-xl font-bold text-sm tracking-tight hover:scale-95 transition-all">
                    Guardar
                </button>
            </div>
        </div>
    );
}
