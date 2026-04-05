import type {
  VersionRow,
  ModelRow,
  CriteriaRow,
  SubcriteriaRow,
  IndicatorsRow,
  Fundamental_ElementsRow,
  FileTableRow,
} from "../types/DataTypes";

// ===== Versiones =====
export const versionData: VersionRow[] = [
  {
    id: "1",
    version: "v1.0.0",
    name: "Modelo A",
    description: "Modelo inicial con IA",
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    version: "v1.1.0",
    name: "Modelo B",
    description: "Mejoras en rendimiento",
    createdAt: "2026-03-25",
  },
  {
    id: "3",
    version: "v1.2.0",
    name: "Modelo C",
    description: "Ajustes de métricas",
    createdAt: "2026-03-27",
  },
];

// ===== Modelos =====
export const modelData: ModelRow[] = [
  {
    id: "1",
    name: "Modelo A",
    description: "Primera versión del modelo",
    createdAt: "2026-03-20",
    status: true,
  },
  {
    id: "2",
    name: "Modelo B",
    description: "Optimizado para rendimiento",
    createdAt: "2026-03-25",
    status: true,
  },
  {
    id: "3",
    name: "Modelo C",
    description: "Versión experimental",
    createdAt: "2026-03-27",
    status: false,
  },
];

// ===== Criterios =====
export const criteriaData: CriteriaRow[] = [
  {
    id: "1",
    name: "Precisión",
    description: "Evalúa la exactitud del modelo",
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    name: "Velocidad",
    description: "Tiempo de respuesta del modelo",
    createdAt: "2026-03-21",
  },
  {
    id: "3",
    name: "Robustez",
    description: "Resistencia ante errores",
    createdAt: "2026-03-22",
  },
];

// ===== Subcriterios =====
export const subcriteriaData: SubcriteriaRow[] = [
  {
    id: "1",
    name: "Error tipo I",
    description: "Falsos positivos",
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    name: "Error tipo II",
    description: "Falsos negativos",
    createdAt: "2026-03-21",
  },
  {
    id: "3",
    name: "Consistencia",
    description: "Resultados repetibles",
    createdAt: "2026-03-22",
  },
];

// ===== Indicadores =====
export const indicatorsData: IndicatorsRow[] = [
  {
    id: "1",
    name: "Exactitud",
    type: "Cuantitativo",
    information_sources:
      "Informe interno desarrollado por el departamento de análisis, sustentado en la recopilación y procesamiento de datos operativos, indicadores clave de rendimiento (KPI) y revisiones estratégicas realizadas durante el último periodo.",
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    name: "Latencia",
    type: "Cuantitativo",
    information_sources:
      "Informe interno desarrollado por el departamento de análisis, sustentado en la recopilación y procesamiento de datos operativos, indicadores clave de rendimiento (KPI) y revisiones estratégicas realizadas durante el último periodo.",
    createdAt: "2026-03-21",
  },
  {
    id: "3",
    name: "Cobertura",
    type: "Cualitativo",
    information_sources:
      "Informe interno desarrollado por el departamento de análisis, sustentado en la recopilación y procesamiento de datos operativos, indicadores clave de rendimiento (KPI) y revisiones estratégicas realizadas durante el último periodo.",
    createdAt: "2026-03-22",
  },
];

// ===== Elementos Fundamentales =====
export const fundamentalElementsData: Fundamental_ElementsRow[] = [
  {
    id: "1",
    name: "Calidad del dato",
    satisfactory: "≥ 95%",
    quasi_satisfactory: "90-94%",
    somewhat_satisfactory: "80-89%",
    deficient: "< 80%",
    evidence: ["Reporte de auditoría", "Logs de sistema"],
    createdAt: "2026-03-20",
  },
  {
    id: "2",
    name: "Seguridad",
    satisfactory: "Cumple con estándar ISO",
    quasi_satisfactory: "Cumple parcialmente",
    somewhat_satisfactory: "Requiere mejoras",
    deficient: "No cumple",
    evidence: ["Certificado ISO", "Pruebas de penetración"],
    createdAt: "2026-03-21",
  },
  {
    id: "3",
    name: "Documentación",
    satisfactory: "Completa y actualizada",
    quasi_satisfactory: "Parcialmente completa",
    somewhat_satisfactory: "Desactualizada",
    deficient: "Ausente",
    evidence: [],
    createdAt: "2026-03-22",
  },
];

export const fileTableData: FileTableRow[] = [
  {
    id: "1",
    name: "informe_calidad_dato.pdf",
    size: "2.5 MB",
    url: "https://www.youtube.com/",
    createdAt: "2026-03-20",
    type: "application/pdf",
  },
  {
    id: "2",
    name: "certificado_seguridad.pdf",
    size: "1.2 MB",
    url: "https://www.uce.edu.ec/",
    createdAt: "2026-03-21",
    type: "application/pdf",
  },
];
