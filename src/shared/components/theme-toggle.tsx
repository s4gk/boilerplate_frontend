'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/shared/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      
      variant="ghost" 
      className="bg-transparent hover:bg-transparent shadow-none border-none"
    >
      <Sun className="h-5 w-5 dark:hidden text-foreground" />
      <Moon className="hidden h-5 w-5 dark:block text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}