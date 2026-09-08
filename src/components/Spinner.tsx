import { useEffect, useRef, useState } from 'react'
import './Spinner.css'
import spinnerVideo from '../assets/spinner/12.mp4'

interface SpinnerProps {
  minDisplayTime?: number
  onFinish?: () => void
  playbackRate?: number
}

export default function Spinner({
  minDisplayTime = 2200,
  onFinish,
  playbackRate = 1,
}: SpinnerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setIsVisible(false)
        onFinish?.()
      }, 600)
    }, minDisplayTime)

    return () => clearTimeout(timer)
  }, [minDisplayTime, onFinish])

  if (!isVisible && !isFading) return null

  return (
    <div className={`spinner-overlay ${isFading ? 'fade-out' : ''}`}>
      <div className="spinner-container">
        <video
          ref={videoRef}
          className="spinner-video"
          src={spinnerVideo}
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  )
}
