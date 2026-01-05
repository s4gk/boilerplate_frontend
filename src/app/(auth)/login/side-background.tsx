'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

export function SideBackground() {
  const { resolvedTheme } = useTheme()
  console.log(resolvedTheme)

  const src =
    resolvedTheme === 'dark'
      ? '/images/auth/bg-dark.webp'
      : '/images/auth/bg-light.webp'

  return (
    <div className="relative w-1/2 overflow-hidden rounded-3xl">
      <Image
        src={src}
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
