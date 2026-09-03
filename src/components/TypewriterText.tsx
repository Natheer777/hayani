import { useTypewriter } from '../hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  enabled?: boolean;
}

export default function TypewriterText({
  text,
  speed = 30,
  delay = 0,
  className = '',
  enabled = true,
}: TypewriterTextProps) {
  const { displayedText, isComplete } = useTypewriter({
    text,
    speed,
    delay,
    enabled,
  });

  return (
    <p className={className}>
      {displayedText}
      {!isComplete && <span className="typewriter-cursor">|</span>}
    </p>
  );
}
