import { useSpeech } from 'react-text-to-speech'
import FloatingMenu from './FloatingMenu';

type Props = {
  text: string
}

function SpeechReader ({text}: Props) {
  const { speechStatus, start, pause, stop } = useSpeech({
    text,
    highlightText: false
  });

  return (
    <>
      <FloatingMenu 
        start={start} 
        pause={pause} 
        stop={stop} 
        speechStatus={speechStatus}
      />
    </>
  );
}

export default SpeechReader