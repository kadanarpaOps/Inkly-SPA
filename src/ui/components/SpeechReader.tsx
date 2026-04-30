import { useMemo } from 'react';
import { useSpeech } from 'react-text-to-speech'
import FloatingMenu from './FloatingMenu';

function SpeechReader () {
  const text = useMemo(
    () => (
      <article className="flex items-center justify-center min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)] px-6">
        <div className="max-w-2xl text-center leading-relaxed">
          <p className="text-lg font-medium">
            Preocupado por una sola hoja, no verás el árbol. Preocupado por un solo árbol, perderás el bosque entero. 
            No te obsesiones con un solo punto. Ve todo en su totalidad… sin esfuerzo. 
            Eso es lo que significa… ‘ver’ de verdad.
          </p>
        </div>
      </article>
    ),
    []
  );
  
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text,
    highlightText: true,
    showOnlyHighlightedText: false,
    highlightMode: "word",
    highlightProps: {
      style: { 
        color: "var(--color-on-primary)", 
        backgroundColor: "var(--color-primary)" 
      } 
    }
  });

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
        <Text />
      </div>
      
      <FloatingMenu start={start} pause={pause} stop={stop} speechStatus={speechStatus}/>
    </>
    
  );
}

export default SpeechReader