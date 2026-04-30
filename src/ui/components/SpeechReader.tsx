import { useMemo } from 'react';
import { useSpeech } from 'react-text-to-speech'
import FloatingMenu from './FloatingMenu';

function SpeechReader () {
  const text = useMemo(
    () => (
      <>
        <p>Preocupado por una sola hoja, no verás el árbol. Preocupado por un solo árbol, perderás el bosque entero. No te obsesiones con un solo punto. Ve todo en su totalidad… sin esfuerzo. Eso es lo que significa… ‘ver’ de verdad.</p>
      </>
    ),
    [],
  );
  
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text,
    highlightText: true,
    showOnlyHighlightedText: false,
    highlightMode: "word",
    highlightProps: { style: { color: "white", backgroundColor: "blue" } },
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