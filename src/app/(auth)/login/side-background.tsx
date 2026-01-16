'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { ThemeToggle } from '@/components/theme-toggle'
import { useMounted } from '@/hooks/useMounted'

export function SideBackground() {
  const mounted = useMounted()
  const { resolvedTheme } = useTheme()

  if (!mounted) return null

  const src =
    resolvedTheme === 'dark'
      ? '/images/auth/bg-dark..webp'
      : '/images/auth/bg-light.webp'

  return (
    <div className="relative w-1/2 overflow-hidden rounded-md">
      {/* Imagen */}
      <Image
        src={src}
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />

      {/* Botón – superior derecha */}
      <div className="absolute top-4 right-4 z-10 bg-background rounded-md p-1">
        <ThemeToggle />
      </div>
    </div>
  )
}
