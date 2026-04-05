import type { Column } from "../../components/ui/DataTable";
import type {
  VersionRow,
  ModelRow,
  CriteriaRow,
  SubcriteriaRow,
  IndicatorsRow,
  Fundamental_ElementsRow,
  FileTableRow,
} from "../../types/DataTypes";
import {
  versionColumns,
  modelColumns,
  criteriaColumns,
  subcriteriaColumns,
  indicatorsColumns,
  fundamental_ElementsColumns,
  fileTableColumns,
} from "../tables/VersionTable";

export type TableRow = Record<string, unknown>;

type TableConfig = {
  columns: Column<TableRow>[];
  title?: string;
  description?: string;
  main_button?: string;
  secondary_button?: string;
  secondary_button_icon?: string;
  modal_new_Title?: string;
  modal_update_Title?: string;
};

export type BreadcrumbSegment = {
  label: string; // nombre de la entidad
  id: string; // id que viene en la ruta
  path: string; // href parcial
};

export function getTableConfig(
  pathname: string,
  handleNext?: (row: TableRow) => void,
  handleModal?: (row: TableRow) => void,
  handleInfo?: (row: TableRow) => void,
  handleDelete?: (row: TableRow) => void,
): TableConfig {
  switch (pathname) {
    case "/versiones":
      return {
        columns: versionColumns(
          handleNext as (row: VersionRow) => void,
          handleModal as (row: VersionRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Versiones",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nueva Versión ",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "Crear Nueva Versión",
        modal_update_Title: "Modificar Versión",
      };

    case "/modelos":
      return {
        columns: modelColumns(
          handleNext as (row: ModelRow) => void,
          handleModal as (row: ModelRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Modelos",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nuevo Modelo",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "Crear Nuevo Modelo",
        modal_update_Title: "Modificar Modelo",
      };

    case "/criterios":
      return {
        columns: criteriaColumns(
          handleNext as (row: CriteriaRow) => void,
          handleModal as (row: CriteriaRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Criterios",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nuevo Criterio",
        secondary_button: "Publicar Modelo",
        secondary_button_icon: "globe",
        modal_new_Title: "Crear Nuevo Criterio",
        modal_update_Title: "Modificar Criterio",
      };

    case "/subcriterios":
      return {
        columns: subcriteriaColumns(
          handleNext as (row: SubcriteriaRow) => void,
          handleModal as (row: SubcriteriaRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Subcriterios",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nuevo Subcriterio",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "Crear Nuevo Subcriterio",
        modal_update_Title: "Modificar Subcriterio",
      };

    case "/indicadores":
      return {
        columns: indicatorsColumns(
          handleNext as (row: IndicatorsRow) => void,
          handleModal as (row: IndicatorsRow) => void,
          handleInfo as (row: IndicatorsRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Indicadores",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nuevo Indicador",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "",
        modal_update_Title: "",
      };

    case "/elementos_fundamentales":
      return {
        columns: fundamental_ElementsColumns(
          handleModal as (row: Fundamental_ElementsRow) => void,
        ) as unknown as Column<TableRow>[],
        title: "Gestión de Elementos Fundamentales",
        description:
          "Administra y consulta el histórico de modelos de Indicadores educativos.",
        main_button: "Crear Nuevo Elemento",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "",
        modal_update_Title: "",
      };

    case "/evidencias":
      return {
        columns: fileTableColumns(
          handleNext as (row: FileTableRow) => void,
          handleDelete as (row: FileTableRow) => void,
        ) as unknown as Column<TableRow>[],
      };

    default:
      return {
        columns: [],
      };
  }
}
