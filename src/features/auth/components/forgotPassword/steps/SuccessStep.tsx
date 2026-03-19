'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function SuccessStep() {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            Contraseña actualizada
          </h2>

          <p className="text-sm text-muted-foreground">
            Tu contraseña se cambió correctamente.  
            Ahora puedes iniciar sesión con tus nuevas credenciales.
          </p>
        </div>

        <Button asChild size="lg" className="w-full">
          <Link href="/login">
            Ir a iniciar sesión
          </Link>
        </Button>
      </div>
    </div>
  )
}
