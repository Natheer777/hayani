import FloatingLines from './FloatingLines'

export default function AnimatedBackground() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <FloatingLines 
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={8}
        lineDistance={8}
        bendRadius={8}
        bendStrength={-2}
        interactive={true}
        parallax={true}
        animationSpeed={1}
        linesGradient={['#00e5ff', '#00f3e7', '#00ff88']}
        mixBlendMode="screen"
        lightMode={false}
      />
    </div>
  )
}
