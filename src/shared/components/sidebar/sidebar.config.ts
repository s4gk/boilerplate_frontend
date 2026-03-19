import { 
  Wallet, 
  Boxes, 
  Network, 
  FileText, 
  Settings, 
  LayoutDashboard, 
  Recycle, 
  Router, 
  ClipboardList, 
  ShoppingCart, 
  Undo2, 
  Users, 
  Ticket, 
  Smartphone, 
  Truck, 
  SearchCheck, 
  Briefcase, 
  CheckSquare, 
  Banknote, 
  BarChart3, 
  StickyNote, 
  Calendar, 
  FileJson, 
  Globe, 
  Download, 
  Upload 
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href?: string;
  icon?: React.ElementType;
  permission?: string;
  children?: SidebarItem[];
};

export type SidebarGroupConfig = {
  groupLabel: string;
  items: SidebarItem[];
};

export const sidebarConfig: SidebarGroupConfig[] = [
  {
    groupLabel: "PRINCIPAL",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        permission: "dashboard.principal.ver",
      },
    ],
  },

  {
    groupLabel: "COBRANZA",
    items: [
      {
        label: "Ventas",
        icon: ShoppingCart,
        href: "/ventas",
        permission: "ventas.apertura.ver",
        children: [
          { label: "Apertura", href: "/ventas/apertura", permission: "ventas.apertura.ver" },
          { label: "Facturas", href: "/ventas/administrar", permission: "ventas.facturas.ver" },
          { label: "Cierre", href: "/ventas/cierre", permission: "ventas.cierre.ver" },
          { label: "Facturas Electrónicas", href: "/ventas/electronicas", permission: "ventas.electronicas.ver" },
          { label: "Notas Crédito/Débito", href: "/ventas/notas", permission: "ventas.notas.ver" },
          { label: "Historial", href: "/ventas/historial", permission: "ventas.historial.ver" },
        ],
      },
      {
        label: "Reciclaje",
        icon: Recycle,
        href: "/reciclaje",
        permission: "reciclaje.tablero.ver",
        children: [
          { label: "Tablero", href: "/reciclaje/tablero", permission: "reciclaje.tablero.ver" },
          { label: "Facturas", href: "/reciclaje/administrar", permission: "reciclaje.facturas.ver" },
        ],
      },
    ],
  },

  {
    groupLabel: "VALORES",
    items: [
      {
        label: "Redes",
        icon: Network,
        href: "/redes",
        permission: "redes.equipos.ver",
        children: [
          { label: "Equipos", href: "/redes/equipos/admin", permission: "redes.equipos.ver" },
          { label: "Bodega", href: "/redes/bodega", permission: "redes.bodega.ver" },
          { label: "Conexiones", href: "/redes/conexiones", permission: "redes.conexiones.ver" },
          { label: "Transferencias", href: "/redes/transferencias", permission: "redes.transferencias.ver" },
        ],
      },
      {
        label: "Inventarios",
        icon: Boxes,
        href: "/inventarios",
        permission: "inventarios.materiales.ver",
        children: [
          { label: "Materiales", href: "/inventarios/materiales", permission: "inventarios.materiales.ver" },
          { label: "Categorías", href: "/inventarios/categorias", permission: "inventarios.categorias.ver" },
          { label: "Almacenes", href: "/inventarios/almacenes", permission: "inventarios.almacenes.ver" },
          { label: "Traspasos", href: "/inventarios/traspasos", permission: "inventarios.traspasos.ver" },
          { label: "Actas de Transferencia", href: "/inventarios/actas", permission: "inventarios.actas.ver" },
          { label: "Historial", href: "/inventarios/historial", permission: "inventarios.historial.ver" },
        ],
      },
      {
        label: "Órdenes",
        icon: ClipboardList,
        href: "/ordenes",
        permission: "ordenes.compra.ver",
        children: [
          { label: "Órdenes de Compra", href: "/ordenes/compra", permission: "ordenes.compra.ver" },
          { label: "Órdenes de Servicio", href: "/ordenes/servicio", permission: "ordenes.servicio.ver" },
          { label: "Historial", href: "/ordenes/historial", permission: "ordenes.historial.ver" },
        ],
      },
      {
        label: "Devoluciones",
        icon: Undo2,
        href: "/devoluciones",
        permission: "devoluciones.principal.ver",
      },
    ],
  },

  {
    groupLabel: "CRM",
    items: [
      {
        label: "Usuarios",
        icon: Users,
        href: "/crm/usuarios",
        permission: "usuarios.administrar.ver",
        children: [
          { label: "Administrar Usuarios", href: "/crm/usuarios/admin", permission: "usuarios.administrar.ver" },
          { label: "Grupos", href: "/crm/usuarios/grupos", permission: "usuarios.grupos.ver" },
        ],
      },
      {
        label: "Tickets Soporte",
        icon: Ticket,
        href: "/crm/tickets",
        permission: "soporte.tickets.ver",
      },
      {
        label: "Móviles",
        icon: Smartphone,
        href: "/crm/moviles",
        permission: "moviles.principal.ver",
      },
      {
        label: "Proveedores",
        icon: Truck,
        href: "/crm/proveedores",
        permission: "proveedores.productos.ver",
        children: [
          { label: "Productos", href: "/crm/proveedores/productos", permission: "proveedores.productos.ver" },
          { label: "Servicios", href: "/crm/proveedores/servicios", permission: "proveedores.servicios.ver" },
        ],
      },
      {
        label: "Encuestas",
        icon: SearchCheck,
        href: "/crm/encuestas",
        permission: "encuestas.principal.ver",
        children: [
          { label: "Encuestas", href: "/crm/encuestas/", permission: "encuestas.principal.ver" },
          { label: "Llamadas", href: "/crm/encuestas/llamadas", permission: "encuestas.llamadas.ver" },
          { label: "Acuerdos", href: "/crm/encuestas/acuerdos", permission: "encuestas.acuerdos.ver" },
          { label: "Listado", href: "/crm/encuestas/lista", permission: "encuestas.lista.ver" },
          { label: "Listado ATS", href: "/crm/encuestas/ats/lista", permission: "encuestas.ats.ver" },
        ],
      },
    ],
  },

  {
    groupLabel: "PROYECTOS",
    items: [
      {
        label: "Proyectos",
        icon: Briefcase,
        href: "/proyectos",
        permission: "proyectos.principal.ver",
      },
    ],
  },

  {
    groupLabel: "CONTABILIDAD",
    items: [
      {
        label: "Cuentas",
        icon: Wallet,
        href: "/contabilidad/cuentas",
        permission: "cuentas.administrar.ver",
        children: [
          { label: "Administrar Cuentas", href: "/contabilidad/cuentas/admin", permission: "cuentas.administrar.ver" },
          { label: "Balance", href: "/contabilidad/cuentas/balance", permission: "cuentas.balance.ver" },
          { label: "Declaraciones", href: "/contabilidad/cuentas/declaraciones", permission: "cuentas.declaraciones.ver" },
        ],
      },
      {
        label: "Tesorería",
        icon: Banknote,
        href: "/contabilidad/tesoreria",
        permission: "tesoreria.anulaciones.ver",
        children: [
          { label: "Anulaciones", href: "/contabilidad/tesoreria/anulaciones", permission: "tesoreria.anulaciones.ver" },
          { label: "Transacciones", href: "/contabilidad/tesoreria/transacciones", permission: "tesoreria.transacciones.ver" },
          { label: "Transferencias", href: "/contabilidad/tesoreria/transferencias", permission: "tesoreria.transferencias.ver" },
          { label: "Ingresos", href: "/contabilidad/tesoreria/ingresos", permission: "tesoreria.ingresos.ver" },
          { label: "Gastos", href: "/contabilidad/tesoreria/gastos", permission: "tesoreria.gastos.ver" },
          { label: "Importar Excel", href: "/contabilidad/tesoreria/cargar-excel", permission: "tesoreria.importar.ver" },
        ],
      },
    ],
  },

  {
    groupLabel: "INFORMES",
    items: [
      {
        label: "Datos e Informes",
        icon: BarChart3,
        href: "/informes",
        permission: "datos.estadisticas.ver",
        children: [
          { label: "Estadísticas Generales", href: "/informes/general", permission: "datos.estadisticas.ver" },
          { label: "Estadísticas de Servicios", href: "/informes/servicios", permission: "datos.estadisticas_servicios.ver" },
          { label: "Estadísticas de Tickets", href: "/informes/tickets", permission: "datos.estadisticas_tickets.ver" },
          { label: "Reportes Técnicos", href: "/informes/tecnicos", permission: "datos.reportes.ver" },
          { label: "Metas", href: "/informes/metas", permission: "datos.metas.ver" },
          { label: "Declaraciones", href: "/informes/declaraciones", permission: "datos.declaraciones.ver" },
          { label: "Declaraciones de Clientes", href: "/informes/clientes-declaraciones", permission: "datos.declaraciones_cliente.ver" },
          { label: "Declaraciones de Proveedores", href: "/informes/proveedores-declaraciones", permission: "datos.declaraciones_proveedor.ver" },
          { label: "Declaraciones de Impuestos", href: "/informes/impuestos", permission: "datos.declaraciones_impuesto.ver" },
          { label: "Transacciones de Clientes", href: "/informes/transacciones-clientes", permission: "datos.transacciones_clientes.ver" },
          { label: "Calcular Ingresos", href: "/informes/calcular-ingresos", permission: "datos.calcular_ingresos.ver" },
          { label: "Calcular Gastos", href: "/informes/calcular-gastos", permission: "datos.calcular_gastos.ver" },
          { label: "Historial CRM", href: "/informes/historial-crm", permission: "datos.historial.ver" },
        ],
      },
      { label: "Notas", icon: StickyNote, href: "/diverso/notas", permission: "diverso.notas.ver" },
      { label: "Calendario", icon: Calendar, href: "/diverso/calendario", permission: "diverso.calendario.ver" },
      { label: "Documentos", icon: FileText, href: "/diverso/documentos", permission: "diverso.documentos.ver" },
    ],
  },

  {
    groupLabel: "CONFIGURACIÓN",
    items: [
      {
        label: "General",
        icon: Settings,
        href: "/configuraciones",
        permission: "configuracion.empresa.ver",
        children: [
          { label: "Empresa", href: "/configuraciones/empresa", permission: "configuracion.empresa.ver" },
          { label: "Facturación", href: "/configuraciones/facturacion", permission: "configuracion.facturacion.ver" },
          { label: "Moneda", href: "/configuraciones/moneda", permission: "configuracion.moneda.ver" },
          { label: "Asignaciones", href: "/configuraciones/asignaciones", permission: "configuracion.asignaciones.ver" },
          { label: "Promociones", href: "/configuraciones/promociones", permission: "configuracion.promociones.ver" },
          { label: "Formato Fecha y Hora", href: "/configuraciones/formato", permission: "configuracion.formato.ver" },
          { label: "Categorías Transacciones", href: "/configuraciones/categorias-transacciones", permission: "configuracion.categorias.ver" },
          { label: "Metas", href: "/configuraciones/metas", permission: "configuracion.metas.ver" },
          { label: "API REST", href: "/configuraciones/api", permission: "configuracion.api.ver" },
          { label: "Correo Electrónico", href: "/configuraciones/correo", permission: "configuracion.correo.ver" },
          { label: "Automatización Mensajes", href: "/configuraciones/automatizacion", permission: "configuracion.mensajes.ver" },
          { label: "Términos de Servicio", href: "/configuraciones/terminos", permission: "configuracion.terminos.ver" },
          { label: "Seguridad", href: "/configuraciones/seguridad", permission: "configuracion.seguridad.ver" },
          { label: "Tema", href: "/configuraciones/tema", permission: "configuracion.tema.ver" },
          { label: "Soporte", href: "/configuraciones/soporte", permission: "configuracion.boletos.ver" },
          { label: "Mikrotiks", icon: Router, href: "/configuraciones/mikrotiks", permission: "configuracion.mikrotiks.ver" },
          { label: "IPs de Usuarios", href: "/configuraciones/ips", permission: "configuracion.ips.ver" },
          { label: "Acerca de", href: "/configuraciones/acerca", permission: "configuracion.acerca.ver" },
          { label: "Actualización", href: "/configuraciones/update", permission: "configuracion.update.ver" },
        ],
      },
      {
        label: "Empleados",
        icon: Users,
        href: "/users",
        permission: "empleados.principal.ver",
      },
      {
        label: "Pagos",
        icon: Wallet,
        href: "/pagos",
        permission: "pagos.configuracion.ver",
        children: [
          { label: "Configuración", href: "/pagos/configuracion", permission: "pagos.configuracion.ver" },
          { label: "Vías de Pago", href: "/pagos/vias", permission: "pagos.vias.ver" },
          { label: "Monedas", href: "/pagos/monedas", permission: "pagos.monedas.ver" },
          { label: "Cambio de Divisas", href: "/pagos/cambio", permission: "pagos.cambio_divisas.ver" },
          { label: "Cuentas Bancarias", href: "/pagos/cuentas", permission: "pagos.cuentas.ver" },
        ],
      },
      {
        label: "Complementos",
        icon: Globe,
        href: "/complementos",
        permission: "complementos.recaptcha.ver",
        children: [
          { label: "reCaptcha", href: "/complementos/recaptcha", permission: "complementos.recaptcha.ver" },
          { label: "Acortador de URLs", href: "/complementos/shortener", permission: "complementos.url.ver" },
          { label: "Twilio SMS", href: "/complementos/twilio", permission: "complementos.twilio.ver" },
          { label: "API de Divisas", href: "/complementos/currency-api", permission: "complementos.currency.ver" },
        ],
      },
      {
        label: "Plantillas",
        icon: FileJson,
        href: "/plantillas",
        permission: "plantillas.email.ver",
        children: [
          { label: "Email", href: "/plantillas/email", permission: "plantillas.email.ver" },
          { label: "SMS", href: "/plantillas/sms", permission: "plantillas.sms.ver" },
          { label: "Tema", href: "/plantillas/tema", permission: "plantillas.tema.ver" },
          { label: "Localizaciones", href: "/plantillas/localizaciones", permission: "plantillas.localizaciones.ver" },
        ],
      },
    ],
  },

  {
    groupLabel: "RESPALDO",
    items: [
      {
        label: "Exportar",
        icon: Download,
        href: "/backup/exportar",
        permission: "exportacion.personas.ver",
        children: [
          { label: "Personas", href: "/backup/exportar/personas", permission: "exportacion.personas.ver" },
          { label: "Transacciones", href: "/backup/exportar/transacciones", permission: "exportacion.transacciones.ver" },
          { label: "Productos", href: "/backup/exportar/productos", permission: "exportacion.productos.ver" },
          { label: "Declaraciones", href: "/backup/exportar/declaraciones", permission: "exportacion.declaraciones.ver" },
          { label: "Impuestos", href: "/backup/exportar/impuestos", permission: "exportacion.impuestos.ver" },
          { label: "Base de Datos", href: "/backup/exportar/db", permission: "exportacion.backup.ver" },
        ],
      },
      {
        label: "Importar",
        icon: Upload,
        href: "/backup/importar",
        permission: "importacion.usuarios.ver",
        children: [
          { label: "Usuarios", href: "/backup/importar/usuarios", permission: "importacion.usuarios.ver" },
          { label: "Productos", href: "/backup/importar/productos", permission: "importacion.productos.ver" },
          { label: "Equipos", href: "/backup/importar/equipos", permission: "importacion.equipos.ver" },
          { label: "Facturas", href: "/backup/importar/facturas", permission: "importacion.facturas.ver" },
        ],
      },
    ],
  },
];