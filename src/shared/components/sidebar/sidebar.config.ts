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
import { UI_PERMISSIONS } from "@/features/permissions/ui-permissions";

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
        permission: UI_PERMISSIONS.DASHBOARD_VER,
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
        permission: UI_PERMISSIONS.VENTAS_VER,
        children: [
          { 
            label: "Apertura", 
            href: "/ventas/apertura", 
            permission: UI_PERMISSIONS.VENTAS_APERTURA_VER 
          },
          { 
            label: "Facturas", 
            href: "/ventas/administrar", 
            permission: UI_PERMISSIONS.VENTAS_FACTURAS_VER 
          },
          { 
            label: "Cierre", 
            href: "/ventas/cierre", 
            permission: UI_PERMISSIONS.VENTAS_CIERRE_VER 
          },
          { 
            label: "Facturas Electrónicas", 
            href: "/ventas/electronicas", 
            permission: UI_PERMISSIONS.VENTAS_ELECTRONICAS_VER
          },
          { 
            label: "Notas Crédito/Débito", 
            href: "/ventas/notas", 
            permission: UI_PERMISSIONS.VENTAS_NOTAS_VER
          },
          { 
            label: "Historial", 
            href: "/ventas/historial", 
            permission: UI_PERMISSIONS.VENTAS_HISTORIAL_VER
          },
        ],
      },
      {
        label: "Reciclaje",
        icon: Recycle,
        href: "/reciclaje",
        permission: UI_PERMISSIONS.RECICLAJE_VER,
        children: [
          {
            label: "Tablero",
            href: "/reciclaje/tablero",
            permission: UI_PERMISSIONS.RECICLAJE_TABLERO_VER,
          },
          {
            label: "Facturas",
            href: "/reciclaje/administrar",
            permission: UI_PERMISSIONS.RECICLAJE_FACTURAS_VER,
          },
        ],
      }
    ],
  },

  {
    groupLabel: "VALORES",
    items: [
      {
        label: "Redes",
        icon: Network,
        href: "/redes",
        permission: UI_PERMISSIONS.REDES_VER,
        children: [
          { 
            label: "Equipos", 
            href: "/redes/equipos/admin", 
            permission: UI_PERMISSIONS.REDES_EQUIPOS_VER 
          },
          { 
            label: "Bodega", 
            href: "/redes/bodega", 
            permission: UI_PERMISSIONS.REDES_BODEGA_VER
          },
          { 
            label: "Conexiones", 
            href: "/redes/conexiones", 
            permission: UI_PERMISSIONS.REDES_CONEXIONES_VER 
          },
          { 
            label: "Transferencias", 
            href: "/redes/transferencias", 
            permission: UI_PERMISSIONS.REDES_TRANSFERENCIAS_VER 
          },
        ],
      },
      {
        label: "Inventarios",
        icon: Boxes,
        href: "/inventarios",
        permission: UI_PERMISSIONS.INVENTARIOS_VER,
        children: [
          { 
            label: "Materiales", 
            href: "/inventarios/materiales", 
            permission: UI_PERMISSIONS.INVENTARIOS_MATERIALES_VER
          },
          { 
            label: "Categorías", 
            href: "/inventarios/categorias", 
            permission: UI_PERMISSIONS.INVENTARIOS_CATEGORIAS_VER
          },
          { 
            label: "Almacenes", 
            href: "/inventarios/almacenes", 
            permission: UI_PERMISSIONS.INVENTARIOS_ALMACENES_VER
          },
          { 
            label: "Traspasos", 
            href: "/inventarios/traspasos", 
            permission: UI_PERMISSIONS.INVENTARIOS_TRASPASOS_VER 
          },
          { 
            label: "Actas de Transferencia", 
            href: "/inventarios/actas", 
            permission: UI_PERMISSIONS.INVENTARIOS_ACTAS_VER
          },
          { 
            label: "Historial", 
            href: "/inventarios/historial", 
            permission: UI_PERMISSIONS.INVENTARIOS_HISTORIAL_VER
          },
        ],
      },
      {
        label: "Órdenes",
        icon: ClipboardList,
        href: "/ordenes",
        permission: UI_PERMISSIONS.ORDENES_VER,
        children: [
          { 
            label: "Órdenes de Compra", 
            href: "/ordenes/compra", 
            permission: UI_PERMISSIONS.ORDENES_COMPRA_VER
          },
          { 
            label: "Órdenes de Servicio", 
            href: "/ordenes/servicio", 
            permission: UI_PERMISSIONS.ORDENES_SERVICIO_VER 
          },
          { 
            label: "Historial", 
            href: "/ordenes/historial", 
            permission: UI_PERMISSIONS.ORDENES_HISTORIAL_VER
          },
        ],
      },
      {
        label: "Devoluciones",
        icon: Undo2,
        href: "/devoluciones",
        permission: UI_PERMISSIONS.DEVOLUCIONES_VER,
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
        permission: UI_PERMISSIONS.USUARIOS_VER,
        children: [
          { 
            label: "Administrar Usuarios", 
            href: "/crm/usuarios/admin", 
            permission: UI_PERMISSIONS.USUARIOS_ADMIN_VER
          },
          { 
            label: "Grupos", 
            href: "/crm/usuarios/grupos", 
            permission: UI_PERMISSIONS.USUARIOS_GRUPOS_VER
          },
        ],
      },
      {
        label: "Tickets Soporte",
        icon: Ticket,
        href: "/crm/tickets",
        permission: UI_PERMISSIONS.SOPORTE_VER,
      },
      {
        label: "Móviles",
        icon: Smartphone,
        href: "/crm/moviles",
        permission: UI_PERMISSIONS.MOVILES_VER,
      },
      {
        label: "Proveedores",
        icon: Truck,
        href: "/crm/proveedores",
        permission: UI_PERMISSIONS.PROVEEDORES_VER,
        children: [
          { 
            label: "Productos", 
            href: "/crm/proveedores/productos", 
            permission: UI_PERMISSIONS.PROVEEDORES_PRODUCTOS_VER 
          },
          { 
            label: "Servicios", 
            href: "/crm/proveedores/servicios", 
            permission: UI_PERMISSIONS.PROVEEDORES_SERVICIOS_VER
          },
        ],
      },
      {
        label: "Encuestas",
        icon: SearchCheck,
        href: "/crm/encuestas",
        permission: UI_PERMISSIONS.ENCUESTAS_VER,
        children: [
          { 
            label: "Encuestas", 
            href: "/crm/encuestas/", 
            permission: UI_PERMISSIONS.ENCUESTAS_VER
          }, 
          { 
            label: "Llamadas", 
            href: "/crm/encuestas/llamadas", 
            permission: UI_PERMISSIONS.ENCUESTAS_LLAMADAS_VER 
          },
          { 
            label: "Acuerdos", 
            href: "/crm/encuestas/acuerdos", 
            permission: UI_PERMISSIONS.ENCUESTAS_ACUERDOS_VER
          },     
          { 
            label: "Listado", 
            href: "/crm/encuestas/lista", 
            permission: UI_PERMISSIONS.ENCUESTAS_LISTA_VER
          },   
          { 
            label: "Listado ATS", 
            href: "/crm/encuestas/ats/lista", 
            permission: UI_PERMISSIONS.ENCUESTAS_ATS_LISTA_VER
          },      
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
        permission: UI_PERMISSIONS.PROYECTOS_VER,
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
        permission: UI_PERMISSIONS.CUENTAS_VER,
        children: [
          { 
            label: "Administrar Cuentas", 
            href: "/contabilidad/cuentas/admin", 
            permission: UI_PERMISSIONS.CUENTAS_ADMIN_VER
          },
          { 
            label: "Balance", 
            href: "/contabilidad/cuentas/balance", 
            permission: UI_PERMISSIONS.CUENTAS_BALANCE_VER
          },
          { 
            label: "Declaraciones", 
            href: "/contabilidad/cuentas/declaraciones", 
            permission: UI_PERMISSIONS.CUENTAS_DECLARACIONES_VER
          },
        ],  
      },
      {
        label: "Tesorería",
        icon: Banknote,
        href: "/contabilidad/tesoreria",
        permission: UI_PERMISSIONS.TESORERIA_VER,
        children: [
          { 
            label: "Anulaciones", 
            href: "/contabilidad/tesoreria/anulaciones", 
            permission: UI_PERMISSIONS.TESORERIA_ANULACIONES_VER
          },
          { 
            label: "Transacciones", 
            href: "/contabilidad/tesoreria/transacciones", 
            permission: UI_PERMISSIONS.TESORERIA_TRANSACCIONES_VER 
          },
          { 
            label: "Transferencias", 
            href: "/contabilidad/tesoreria/transferencias", 
            permission: UI_PERMISSIONS.TESORERIA_TRANSFERENCIA_VER
          },
          { 
            label: "Ingresos", 
            href: "/contabilidad/tesoreria/ingresos", 
            permission: UI_PERMISSIONS.TESORERIA_INGRESOS_VER
          },
          { 
            label: "Gastos", 
            href: "/contabilidad/tesoreria/gastos", 
            permission: UI_PERMISSIONS.TESORERIA_GASTOS_VER
          },
          { 
            label: "Importar Excel", 
            href: "/contabilidad/tesoreria/cargar-excel", 
            permission: UI_PERMISSIONS.TESORERIA_IMPORTAR_VER
          },
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
        permission: UI_PERMISSIONS.DATOS_VER,
        children: [
          { 
            label: "Estadísticas Generales", 
            href: "/informes/general", 
            permission: UI_PERMISSIONS.DATOS_ESTADISTICAS_VER
          },
          { 
            label: "Estadísticas de Servicios", 
            href: "/informes/servicios", 
            permission: UI_PERMISSIONS.DATOS_ESTADISTICAS_SERVICIOS_VER 
          },
          { 
            label: "Estadísticas de Tickets", 
            href: "/informes/tickets", 
            permission: UI_PERMISSIONS.DATOS_ESTADISTICAS_TICKETS_VER
          },
          { 
            label: "Reportes Técnicos", 
            href: "/informes/tecnicos", 
            permission: UI_PERMISSIONS.DATOS_REPORTES_VER
          },
          { 
            label: "Metas", 
            href: "/informes/metas", 
            permission: UI_PERMISSIONS.DATOS_METAS_VER 
          },
          { 
            label: "Declaraciones", 
            href: "/informes/declaraciones", 
            permission: UI_PERMISSIONS.DATOS_DECLARACIONES_VER 
          },
          { 
            label: "Declaraciones de Clientes", 
            href: "/informes/clientes-declaraciones", 
            permission: UI_PERMISSIONS.DATOS_DECLARACIONES_CLIENTE_VER
          },
          { 
            label: "Declaraciones de Proveedores", 
            href: "/informes/proveedores-declaraciones", 
            permission: UI_PERMISSIONS.DATOS_DECLARACIONES_PROVEEDOR_VER
          },
          { 
            label: "Declaraciones de Impuestos", 
            href: "/informes/impuestos", 
            permission: UI_PERMISSIONS.DATOS_DECLARACIONES_IMPUESTO_VER
          },
          { 
            label: "Transacciones de Clientes", 
            href: "/informes/transacciones-clientes", 
            permission: UI_PERMISSIONS.DATOS_TRANSACCIONES_CLIENTES_VER
          },
          { 
            label: "Calcular Ingresos", 
            href: "/informes/calcular-ingresos", 
            permission: UI_PERMISSIONS.DATOS_CALCULAR_INGRESOS_VER
          },
          { 
            label: "Calcular Gastos", 
            href: "/informes/calcular-gastos", 
            permission: UI_PERMISSIONS.DATOS_CALCULAR_GASTOS_VER
          },
          { 
            label: "Historial CRM", 
            href: "/informes/historial-crm", 
            permission: UI_PERMISSIONS.DATOS_HISTORIAL_VER
          },
        ],  
      },
      { 
        label: "Notas", 
        icon: StickyNote, 
        href: "/diverso/notas", 
        permission: UI_PERMISSIONS.NOTAS_VER 
      },
      {
        label: "Calendario",
        icon: Calendar,
        href: "/diverso/calendario",
        permission: UI_PERMISSIONS.CALENDARIO_VER,
      },
      { 
        label: "Documentos", 
        icon: FileText, 
        href: "/diverso/documentos", 
        permission: UI_PERMISSIONS.DOCUMENTOS_VER
      },
    ],
  },

  {
    groupLabel: "CONFIGURACIÓN",
    items: [
      {
        label: "General",
        icon: Settings,
        href: "/configuraciones",
        permission: UI_PERMISSIONS.CONFIG_VER,
        children: [
          { 
            label: "Empresa", 
            href: "/configuraciones/empresa", 
            permission: UI_PERMISSIONS.CONFIG_EMPRESA_VER 
          },
          { 
            label: "Facturación", 
            href: "/configuraciones/facturacion", 
            permission: UI_PERMISSIONS.CONFIG_FACTURACION_VER
          },
          { 
            label: "Moneda", 
            href: "/configuraciones/moneda", 
            permission: UI_PERMISSIONS.CONFIG_MONEDA_VER
          },
          { 
            label: "Asignaciones", 
            href: "/configuraciones/asignaciones", 
            permission: UI_PERMISSIONS.CONFIG_ASIGNACIONES_VER
          },
          { 
            label: "Promociones", 
            href: "/configuraciones/promociones", 
            permission: UI_PERMISSIONS.CONFIG_PROMOCIONES_VER 
          },
          { 
            label: "Formato Fecha y Hora", 
            href: "/configuraciones/formato", 
            permission: UI_PERMISSIONS.CONFIG_FORMATO_VER
          },
          { 
            label: "Categorías Transacciones", 
            href: "/configuraciones/categorias-transacciones", 
            permission: UI_PERMISSIONS.CONFIG_CATEGORIA_VER
          },
          { 
            label: "Metas", 
            href: "/configuraciones/metas", 
            permission: UI_PERMISSIONS.CONFIG_METAS_VER
          },
          { 
            label: "API REST", 
            href: "/configuraciones/api", 
            permission: UI_PERMISSIONS.CONFIG_API_VER 
          },
          { 
            label: "Correo Electrónico", 
            href: "/configuraciones/correo", 
            permission: UI_PERMISSIONS.CONFIG_CORREO_VER 
          },
          { 
            label: "Automatización Mensajes", 
            href: "/configuraciones/automatizacion", 
            permission: UI_PERMISSIONS.CONFIG_MENSAJES_VER
          },
          { 
            label: "Términos de Servicio", 
            href: "/configuraciones/terminos", 
            permission: UI_PERMISSIONS.CONFIG_TERMINOS_VER
          },
          { 
            label: "Seguridad",
            href: "/configuraciones/seguridad", 
            permission: UI_PERMISSIONS.CONFIG_SEGURIDAD_VER
          },
          { 
            label: "Tema", 
            href: "/configuraciones/tema", 
            permission: UI_PERMISSIONS.CONFIG_TEMA_VER
          },
          { 
            label: "Soporte", 
            href: "/configuraciones/soporte", 
            permission: UI_PERMISSIONS.CONFIG_BOLETOS_VER
          },
          { 
            label: "Mikrotiks", 
            icon: Router, 
            href: "/configuraciones/mikrotiks", 
            permission: UI_PERMISSIONS.CONFIG_MIKROTIKS_VER
          },
          { 
            label: "IPs de Usuarios", 
            href: "/configuraciones/ips", 
            permission: UI_PERMISSIONS.CONFIG_IPS_VER
          },
          { 
            label: "Acerca de", 
            href: "/configuraciones/acerca", 
            permission: UI_PERMISSIONS.CONFIG_ACERCA_VER
          },
          { 
            label: "Actualización", 
            href: "/configuraciones/update", 
            permission: UI_PERMISSIONS.CONFIG_UPDATE_VER
          },
        ],  
      },
      {
        label: "Empleados",
        icon: Users,
        href: "/empleados",
        permission: UI_PERMISSIONS.EMPLEADOS_VER,
      },
      {
        label: "Pagos",
        icon: Wallet,
        href: "/pagos",
        permission: UI_PERMISSIONS.PAGO_VER,
        children: [
          { 
            label: "Configuración", 
            href: "/pagos/configuracion", 
            permission: UI_PERMISSIONS.PAGO_CONFIG_VER
          },
          { 
            label: "Vías de Pago", 
            href: "/pagos/vias", 
            permission: UI_PERMISSIONS.PAGO_VIA_VER
          },
          { 
            label: "Monedas", 
            href: "/pagos/monedas", 
            permission: UI_PERMISSIONS.PAGO_MONEDAS_VER 
          },
          { 
            label: "Cambio de Divisas", 
            href: "/pagos/cambio", 
            permission: UI_PERMISSIONS.PAGO_CAMBIO_DIVISAS_VER
          },
          { 
            label: "Cuentas Bancarias", 
            href: "/pagos/cuentas", 
            permission: UI_PERMISSIONS.PAGO_CUENTAS_VER
          },
        ],
      },
      {
        label: "Complementos",
        icon: Globe,
        href: "/complementos",
        permission: UI_PERMISSIONS.COMPLEMENTOS_VER,
        children: [
          { 
            label: "reCaptcha", 
            href: "/complementos/recaptcha", 
            permission: UI_PERMISSIONS.COMPLEMENTOS_RECAPTCHA_VER 
          },
          { 
            label: "Acortador de URLs", 
            href: "/complementos/shortener", 
            permission: UI_PERMISSIONS.COMPLEMENTOS_URL_VER
          },
          { 
            label: "Twilio SMS", 
            href: "/complementos/twilio", 
            permission: UI_PERMISSIONS.COMPLEMENTOS_TWILIO_VER
          },
          { 
            label: "API de Divisas", 
            href: "/complementos/currency-api", 
            permission: UI_PERMISSIONS.COMPLEMENTOS_CURRENCY_VER
          },
        ],
      },
      {
        label: "Plantillas",
        icon: FileJson,
        href: "/plantillas",
        permission: UI_PERMISSIONS.PLANTILLAS_VER,
        children: [
          { 
            label: "Email", 
            href: "/plantillas/email", 
            permission: UI_PERMISSIONS.PLANTILLAS_EMAIL_VER
          },
          { 
            label: "SMS", 
            href: "/plantillas/sms", 
            permission: UI_PERMISSIONS.PLANTILLAS_SMS_VER
          },
          { 
            label: "Tema", 
            href: "/plantillas/tema", 
            permission: UI_PERMISSIONS.PLANTILLAS_TEMA_VER
          },
          { 
            label: "Localizaciones", 
            href: "/plantillas/localizaciones", 
            permission: UI_PERMISSIONS.PLANTILLAS_LOCALIZACIONES_VER
          },
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
        permission: UI_PERMISSIONS.EXPORTACION_VER,
        children: [
          { 
            label: "Personas", 
            href: "/backup/exportar/personas", 
            permission: UI_PERMISSIONS.EXPORTACION_PERSONAS_VER 
          },
          { 
            label: "Transacciones", 
            href: "/backup/exportar/transacciones", 
            permission: UI_PERMISSIONS.EXPORTACION_TRANSACCIONES_VER
          },
          { 
            label: "Productos", 
            href: "/backup/exportar/productos", 
            permission: UI_PERMISSIONS.EXPORTACION_PRODUCTOS_VER
          },
          { 
            label: "Declaraciones", 
            href: "/backup/exportar/declaraciones", 
            permission: UI_PERMISSIONS.EXPORTACION_DECLARACIONES_VER
          },
          { 
            label: "Impuestos", 
            href: "/backup/exportar/impuestos", 
            permission: UI_PERMISSIONS.EXPORTACION_IMPUESTO_VER
          },
          { 
            label: "Base de Datos", 
            href: "/backup/exportar/db", 
            permission: UI_PERMISSIONS.EXPORTACION_BACKUP_VER 
          },
        ],
      },
      {
        label: "Importar",
        icon: Upload,
        href: "/backup/importar",
        permission: UI_PERMISSIONS.IMPORTACION_VER,
        children: [
          { 
            label: "Usuarios", 
            href: "/backup/importar/usuarios", 
            permission: UI_PERMISSIONS.IMPORTACION_USUARIOS_VER
          },
          { 
            label: "Productos", 
            href: "/backup/importar/productos", 
            permission: UI_PERMISSIONS.IMPORTACION_PRODUCTOS_VER
          },
          { 
            label: "Equipos", 
            href: "/backup/importar/equipos", 
            permission: UI_PERMISSIONS.IMPORTACION_EQUIPOS_VER 
          },
          { 
            label: "Facturas", 
            href: "/backup/importar/facturas", 
            permission: UI_PERMISSIONS.IMPORTACION_FACTURAS_VER
          },
        ],
      },
    ],
  },
];