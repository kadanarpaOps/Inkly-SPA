import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder, CharacterCount } from '@tiptap/extensions';
import Toolbar from "../../components/writing/Toolbar";
import { useState } from 'react';

const extensions = [
    TextStyleKit, StarterKit,
    TextAlign.configure({
        alignments: ['left', 'center', 'right', 'justify'],
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left'
    }),
    Placeholder.configure({
        placeholder: "Comienza tu historia...",
    }),
    CharacterCount.configure({
        mode: "nodeSize",
    })
];

export default function Write() {

    const [ wordsCount, setWordsCount ] = useState(0);

    const editor = useEditor({
        extensions,
        onUpdate({ editor }) {
            setWordsCount(editor.storage.characterCount.words());
        },
    })

    return (
        <div className="grow flex flex-col items-center px-12 pb-12 writing-canvas">
            {/** Barra de Herramientas */}
            <Toolbar editor={editor} />
            <div className="w-full max-w-3xl grow">
                <div className="relative focus:outline-none">
                    <h1 className="text-5xl font-bold mb-10 text-global outline-none">
                        Capitulo I: Sangre y Entrañas
                    </h1>
                    <EditorContent editor={editor} className='leading-relaxed' />
                </div>
            </div>
            <div className="fixed bottom-8 right-12 flex items-center space-x-4 bg-search-bg/80 px-5 py-3 rounded-2xl ghost-border backdrop-opacity-95 shadow-2xl z-40">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-several-light uppercase tracking-tighter">
                        Palabras
                    </span>
                    <span className="text-sm font-bold text-high-enfasis">
                        { wordsCount }
                    </span>
                </div>
                <div className="w-px h-6 bg-toolbar-bg"></div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-several-light uppercase tracking-tighter">
                        Lectura
                    </span>
                    <span className="text-sm font-bold text-global">
                        { Math.ceil(wordsCount / 200) } min
                    </span>
                </div>
                <div className="ml-2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
        </div>
    );
}
