"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { UserFormDialog } from "./UserFormDialog"
import { DeleteUserDialog } from "./DeleteUserDialog"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
  Users,
  ShieldCheck,
  Eye,
  FileEdit,
} from "lucide-react"
import Link from "next/link"
import { useUsersTable } from "../hooks/useUsersTable"
import type { Employee } from "@/shared/types/employee"

const roleLabels: Record<Employee["role"], string> = {
  admin: "Administrador",
  editor: "Editor",
  viewer: "Visualizador",
}

const roleIcons: Record<Employee["role"], React.ReactNode> = {
  admin: <ShieldCheck className="size-3" />,
  editor: <FileEdit className="size-3" />,
  viewer: <Eye className="size-3" />,
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const MONTHS = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
]

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-")
  return `${parseInt(day, 10)} ${MONTHS[parseInt(month, 10) - 1]} ${year}`
}

export function UsersTable() {
  const {
    employees,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    formOpen,
    setFormOpen,
    deleteOpen,
    setDeleteOpen,
    selectedEmployee,
    handleEdit,
    handleDeleteClick,
    handleSave,
    handleDeleteConfirm,
  } = useUsersTable()

  const activeCount = employees.filter((e) => e.status === "active").length
  const inactiveCount = employees.filter((e) => e.status === "inactive").length

  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total usuarios</p>
              <p className="text-2xl font-semibold text-card-foreground">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <div className="size-2.5 rounded-full bg-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Activos</p>
              <p className="text-2xl font-semibold text-card-foreground">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <div className="size-2.5 rounded-full bg-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactivos</p>
              <p className="text-2xl font-semibold text-card-foreground">{inactiveCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button asChild className="gap-2">
          <Link href="/users/new">
            <Plus className="size-4" />
            Nuevo usuario
          </Link>
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[280px]">Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha de registro</TableHead>
              <TableHead className="w-[60px]">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="size-8 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No se encontraron usuarios</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                          {getInitials(employee.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground leading-tight">
                          {employee.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {employee.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-foreground">
                      {roleIcons[employee.role]}
                      {roleLabels[employee.role]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={employee.status === "active" ? "default" : "secondary"}
                      className={
                        employee.status === "active"
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/15"
                          : "bg-muted text-muted-foreground border-transparent hover:bg-muted"
                      }
                    >
                      <span
                        className={`mr-1 inline-block size-1.5 rounded-full ${
                          employee.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"
                        }`}
                      />
                      {employee.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {formatDate(employee.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Acciones para ${employee.name}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${employee.id}/edit`}>
                            <Pencil className="size-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(employee)}
                        >
                          <Trash2 className="size-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground">
        {"Mostrando "}
        <span className="font-medium text-foreground">{filteredEmployees.length}</span>
        {" de "}
        <span className="font-medium text-foreground">{employees.length}</span>
        {" usuarios"}
      </p>

      {/* Dialogs */}
      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={selectedEmployee}
        onSave={handleSave}
      />
      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={selectedEmployee}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
