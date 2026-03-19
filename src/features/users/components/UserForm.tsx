"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Shield, Activity, User as UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import type { Employee } from "@/shared/types/employee"

interface UserFormProps {
  employee?: Employee | null
  onSave: (data: Omit<Employee, "id" | "createdAt">) => Promise<void> | void
  title: string
  description: string
}

const roleOptions: Array<{
  value: Employee["role"]
  label: string
  description: string
}> = [
  {
    value: "admin",
    label: "Administrador",
    description: "Acceso total al sistema y gestión de usuarios.",
  },
  {
    value: "editor",
    label: "Editor",
    description: "Puede crear y modificar contenido operativo.",
  },
  {
    value: "viewer",
    label: "Visualizador",
    description: "Solo puede consultar información.",
  },
]

const statusOptions: Array<{
  value: Employee["status"]
  label: string
  description: string
}> = [
  {
    value: "active",
    label: "Activo",
    description: "Puede ingresar y usar el sistema.",
  },
  {
    value: "inactive",
    label: "Inactivo",
    description: "No puede acceder hasta ser reactivado.",
  },
]

function getInitials(name: string) {
  const trimmed = name.trim()

  if (!trimmed) return "?"

  return trimmed
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getRoleLabel(role: Employee["role"]) {
  return roleOptions.find((option) => option.value === role)?.label ?? role
}

function getStatusLabel(status: Employee["status"]) {
  return statusOptions.find((option) => option.value === status)?.label ?? status
}

export function UserForm({
  employee,
  onSave,
  title,
  description,
}: UserFormProps) {
  const router = useRouter()

  const [name, setName] = useState(employee?.name ?? "")
  const [email, setEmail] = useState(employee?.email ?? "")
  const [role, setRole] = useState<Employee["role"]>(employee?.role ?? "viewer")
  const [status, setStatus] = useState<Employee["status"]>(employee?.status ?? "active")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedRole = useMemo(
    () => roleOptions.find((option) => option.value === role),
    [role]
  )

  const selectedStatus = useMemo(
    () => statusOptions.find((option) => option.value === status),
    [status]
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      await onSave({
        name: name.trim(),
        email: email.trim(),
        role,
        status,
      })

      router.push("/users")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
            <Link href="/users">
              <ArrowLeft className="size-4" />
              Volver a usuarios
            </Link>
          </Button>
        </div>

        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-base">Resumen</CardTitle>
                <CardDescription>
                  Vista previa del usuario dentro del sistema.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback className="bg-primary/10 text-base font-medium text-primary">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {name.trim() || "Nombre del usuario"}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {email.trim() || "correo@empresa.com"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Rol
                    </p>
                    <p className="text-sm text-foreground">{getRoleLabel(role)}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedRole?.description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Estado
                    </p>
                    <p className="text-sm text-foreground">{getStatusLabel(status)}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedStatus?.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {employee ? "Editar usuario" : "Nuevo usuario"}
                </CardTitle>
                <CardDescription>
                  Completa la información básica y define su acceso.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <section className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-foreground">
                      Información personal
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Datos visibles del usuario dentro de la plataforma.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <UserIcon className="size-3.5 text-muted-foreground" />
                        Nombre completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ej: Santiago García"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="size-3.5 text-muted-foreground" />
                        Correo electrónico
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ej: santiago@empresa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium text-foreground">
                      Acceso y estado
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Define permisos y disponibilidad de la cuenta.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="role" className="flex items-center gap-2">
                        <Shield className="size-3.5 text-muted-foreground" />
                        Rol
                      </Label>

                      <Select
                        value={role}
                        onValueChange={(value) => setRole(value as Employee["role"])}
                      >
                        <SelectTrigger id="role" className="w-full">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <p className="text-xs text-muted-foreground">
                        {selectedRole?.description}
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="status" className="flex items-center gap-2">
                        <Activity className="size-3.5 text-muted-foreground" />
                        Estado
                      </Label>

                      <Select
                        value={status}
                        onValueChange={(value) => setStatus(value as Employee["status"])}
                      >
                        <SelectTrigger id="status" className="w-full">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <p className="text-xs text-muted-foreground">
                        {selectedStatus?.description}
                      </p>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/users">Cancelar</Link>
                  </Button>

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? "Guardando..."
                      : employee
                        ? "Guardar cambios"
                        : "Crear usuario"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </main>
  )
}