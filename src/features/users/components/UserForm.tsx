"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, User as UserIcon, Mail, Shield, Activity } from "lucide-react"
import type { Employee } from "@/shared/types/employee"

interface UserFormProps {
  employee?: Employee | null
  onSave: (data: Omit<Employee, "id" | "createdAt">) => void
  title: string
  description: string
}

function getInitials(name: string) {
  if (!name.trim()) return "?"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function UserForm({ employee, onSave, title, description }: UserFormProps) {
  const router = useRouter()
  const [name, setName] = useState(employee?.name ?? "")
  const [email, setEmail] = useState(employee?.email ?? "")
  const [role, setRole] = useState<Employee["role"]>(employee?.role ?? "viewer")
  const [status, setStatus] = useState<Employee["status"]>(employee?.status ?? "active")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSave({ name, email, role, status })
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Volver a usuarios
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Two-column grid: preview + personal info */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Avatar preview card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Vista previa</CardTitle>
                <CardDescription>
                  Asi se vera el usuario en el sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="size-14">
                    <AvatarFallback className="bg-primary/10 text-base font-medium text-primary">
                      {getInitials(name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground leading-tight">
                      {name || "Nombre del usuario"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {email || "correo@empresa.com"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info personal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informacion personal</CardTitle>
                <CardDescription>
                  Datos basicos del usuario en el sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="flex items-center gap-1.5">
                    <UserIcon className="size-3.5 text-muted-foreground" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ej: Juan Perez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-muted-foreground" />
                    Correo electronico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ej: juan@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Two-column grid: rol + estado */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Rol */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rol del usuario</CardTitle>
                <CardDescription>
                  Define los permisos de acceso al sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="role" className="flex items-center gap-1.5">
                    <Shield className="size-3.5 text-muted-foreground" />
                    Rol
                  </Label>
                  <Select value={role} onValueChange={(v) => setRole(v as Employee["role"])}>
                    <SelectTrigger id="role" className="w-full">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {role === "admin"
                      ? "Acceso total al sistema, incluyendo gestion de usuarios."
                      : role === "editor"
                        ? "Puede crear y editar contenido, pero no gestionar usuarios."
                        : "Solo puede visualizar informacion, sin permisos de edicion."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Estado */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estado de la cuenta</CardTitle>
                <CardDescription>
                  Controla si el usuario puede acceder al sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid gap-2">
                  <Label htmlFor="status" className="flex items-center gap-1.5">
                    <Activity className="size-3.5 text-muted-foreground" />
                    Estado
                  </Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as Employee["status"])}>
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {status === "active"
                      ? "El usuario puede iniciar sesion y utilizar el sistema."
                      : "El usuario no puede acceder al sistema hasta que se reactive."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="outline" asChild>
              <Link href="/">Cancelar</Link>
            </Button>
            <Button type="submit">
              {employee ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}
