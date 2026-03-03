"use client"

import * as React from "react"
import { 
  Search, ChevronRight, Building2, User, 
  Fingerprint, MapPin, Filter, Clock, Trash2, X
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Kbd } from "@/components/ui/kbd"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function SearchInput() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  
  const [selectedCity, setSelectedCity] = React.useState<string>("all-cities")
  const [userFilterType, setUserFilterType] = React.useState<string>("all-types")

  const recents = [
    { id: 1, text: "Sede Principal Norte", type: "sede" },
    { id: 2, text: "Juan Pérez", type: "usuario" },
  ]

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      {/* TRIGGER RESPONSIVO */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="lg:hidden rounded-full border bg-background"
        >
          <Search className="size-5" />
        </Button>

        <button 
          onClick={() => setOpen(true)} 
          className="hidden lg:flex h-10 w-80 items-center gap-3 rounded-xl border border-input bg-muted/30 px-4 text-sm font-medium text-muted-foreground transition-all hover:bg-muted/50"
        >
          <Search className="size-4 opacity-50" />
          <span className="flex-1 text-left font-normal truncate">Buscar...</span>
          <Kbd>⌘ K</Kbd>
        </button>
      </div>

      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
      >
        <div className="flex flex-col border-b">
          <CommandInput 
            placeholder="Escribe nombre, cédula o ID..." 
            value={search}
            onValueChange={setSearch}
            className="h-14"
          />
          
          {/* BARRA DE FILTROS: COLUMNA EN MOBILE, FILA EN DESKTOP */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 bg-muted/20 border-t items-stretch sm:items-center">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
              <Filter className="size-3" />
              <span>Filtrar por:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-10 sm:h-8 flex-1 text-sm sm:text-xs bg-background">
                  <SelectValue placeholder="Ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-cities">Todas las ciudades</SelectItem>
                  <SelectItem value="bog">Bogotá</SelectItem>
                  <SelectItem value="med">Medellín</SelectItem>
                </SelectContent>
              </Select>

              <Select value={userFilterType} onValueChange={setUserFilterType}>
                <SelectTrigger className="h-10 sm:h-8 flex-1 text-sm sm:text-xs bg-background">
                  <SelectValue placeholder="Cualquier dato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">Cualquier dato</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="cedula">Cédula</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <CommandList className="max-h-[400px]">
          <CommandEmpty>No hay resultados.</CommandEmpty>

          {!search && (
            <CommandGroup 
              heading={
                <div className="flex items-center justify-between w-full pr-2 text-[11px]">
                  <span>BÚSQUEDAS RECIENTES</span>
                  <button className="hover:text-destructive flex items-center gap-1">
                    <Trash2 className="size-3" /> Limpiar
                  </button>
                </div>
              }
            >
              {recents.map((item) => (
                <CommandItem key={item.id} className="flex items-center gap-3 p-3 cursor-pointer group">
                  <Clock className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm flex-1">{item.text}</span>
                  <X className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {search && (
            <>
              <CommandGroup heading="Sedes">
                <CommandItem className="flex items-center gap-3 p-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                    <Building2 className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">Sede Principal Norte</span>
                    <span className="text-xs text-muted-foreground">ID: 001 • Bogotá</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">Sede</Badge>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Usuarios">
                <CommandItem className="flex items-center gap-3 p-3">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-600">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">Juan Pérez</span>
                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                      <Fingerprint className="size-3 shrink-0" /> 1.020.334.555
                      <MapPin className="size-3 shrink-0 ml-1" /> Medellín
                    </div>
                  </div>
                  <ChevronRight className="size-4 opacity-20 shrink-0" />
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}