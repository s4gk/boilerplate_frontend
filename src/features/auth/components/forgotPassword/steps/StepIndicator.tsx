type Step = 'EMAIL' | 'CODE' | 'RESET' | 'SUCCESS'

interface StepIndicatorProps {
  step: Step
}

export function StepIndicator({ step }: StepIndicatorProps) {
  const steps: { key: Exclude<Step, 'SUCCESS'>; label: string }[] = [
    { key: 'EMAIL', label: 'Correo' },
    { key: 'CODE', label: 'Código' },
    { key: 'RESET', label: 'Contraseña' },
  ]

  const currentIndex = steps.findIndex((s) => s.key === step)

  return (
    <div className="mb-10 flex items-center justify-between">
      {steps.map((item, index) => {
        const isCompleted = index < currentIndex
        const isActive = index === currentIndex

        return (
          <div key={item.key} className="flex flex-1 items-center">
            {/* Circle */}
            <div
              className={[
                'flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium',
                isCompleted &&
                  'border-primary bg-primary text-primary-foreground',
                isActive && 'border-primary text-primary',
                !isCompleted &&
                  !isActive &&
                  'border-muted text-muted-foreground',
              ].join(' ')}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span
              className={[
                'ml-3 text-sm',
                isActive && 'font-medium text-primary',
                isCompleted && 'text-primary',
                !isActive &&
                  !isCompleted &&
                  'text-muted-foreground',
              ].join(' ')}
            >
              {item.label}
            </span>

            {/* Line */}
            {index < steps.length - 1 && (
              <div className="mx-4 h-px flex-1 bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )
}
