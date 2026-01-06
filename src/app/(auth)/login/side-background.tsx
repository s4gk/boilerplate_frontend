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
      ? '/images/auth/bg-dark.webp'
      : '/images/auth/bg-light.webp'

  return (
    <div className="relative w-1/2 overflow-hidden rounded-3xl">
      {/* Imagen */}
      <Image
        src={src}
        alt="Auth background"
        fill
        className="object-cover"
        priority
      />

      {/* Botón – superior izquierda */}
      <div className="absolute right-4 bottom-4 z-10">
        <ThemeToggle />
      </div>

      {/* Texto – parte inferior */}
      <div className="absolute right-0 bottom-6 left-0 z-10 px-6 text-center">
        <p className="text-sm text-white/90">
          Este equipo avanza porque cada uno cumple su parte, sin excusas.
        </p>
      </div>
    </div>
  )
}
