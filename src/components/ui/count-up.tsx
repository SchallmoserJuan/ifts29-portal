'use client'

import {useEffect, useRef, useState} from 'react'
import {useInView} from 'framer-motion'

export function CountUp({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, margin: '-100px'})
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return
    setHasAnimated(true)

    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, hasAnimated, end, duration])

  const displayValue = end >= 1000 ? count.toLocaleString() : String(count)

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
