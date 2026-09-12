interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  enabled?: boolean;
}

export default function TypewriterText({
  text,
  className = '',
}: TypewriterTextProps) {
  return <p className={className}>{text}</p>;
}
