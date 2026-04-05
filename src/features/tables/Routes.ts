export const knownPaths = [
  "versiones",
  "modelos",
  "criterios",
  "subcriterios",
  "indicadores",
  "elementos_fundamentales",
  "cuantitativos",
  "cualitativos",
  "configuracion_elementos_fundamentales",
];

export const routeConfig = {
  versiones: {
    next: "modelos",
    label: "Versiones",
  },
  modelos: {
    next: "criterios",
    label: "Modelos",
  },
  criterios: {
    next: "subcriterios",
    label: "Criterios",
  },
  subcriterios: {
    next: "indicadores",
    label: "Subcriterios",
  },
  indicadores: {
    next: "elementos_fundamentales",
    label: "Indicadores",
  },
  elementos_fundamentales: {
    next: null,
    label: "Elementos Fundamentales",
  },
  cuantitativos: {
    next: null,
    label: "Cuantitativos",
  },
  cualitativos: {
    next: null,
    label: "Cualitativos",
  },
  configuracion_elementos_fundamentales: {
    next: null,
    label: "Configuración de Elementos Fundamentales",
  },
} as const;

// tipos derivados automáticamente
export type RouteKey = keyof typeof routeConfig;

// siguiente ruta
export function getNextRoute(current: string) {
  return routeConfig[current as RouteKey]?.next;
}

// label (breadcrumb)
export function getRouteLabel(route: string) {
  return routeConfig[route as RouteKey]?.label ?? route;
}
