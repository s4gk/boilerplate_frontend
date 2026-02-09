import { cn } from "@/shared/lib/utils";

const steps = ["Correo", "Código", "Contraseña"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((step, index) => {
        const isActive = index === current;
        const isCompleted = index < current;

        return (
          <div key={step} className="flex items-center w-full">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium",
                isCompleted && "bg-primary text-primary-foreground",
                isActive && "border-primary text-primary",
                !isActive && !isCompleted && "text-muted-foreground"
              )}
            >
              {index + 1}
            </div>

            <span
              className={cn(
                "ml-2 text-sm",
                isActive && "font-semibold",
                !isActive && "text-muted-foreground"
              )}
            >
              {step}
            </span>

            {index !== steps.length - 1 && (
              <div className="mx-4 h-px w-full bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
}
