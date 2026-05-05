import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align';
import Toolbar from "../../components/writing/Toolbar";

const extensions = [
    TextStyleKit, StarterKit,
    TextAlign.configure({
        alignments: ['left', 'center', 'right', 'justify'],
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left'
    })
];

export default function Write() {

    const editor = useEditor({
        extensions,
        content: 'Hola Mundo'
    })

    return (
        <div className="grow flex flex-col items-center px-12 pb-12 overflow-y-auto writing-canvas">
            {/** Barra de Herramientas */}
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
