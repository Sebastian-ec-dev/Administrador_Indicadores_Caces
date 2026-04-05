import type { Column } from "../../components/ui/DataTable";
import Typography from "../../components/ui/Typography";
import ActionButtons from "../../components/layout/ActionButtons";
import type { Action } from "../../components/layout/ActionButtons";
import type {
  VersionRow,
  ModelRow,
  CriteriaRow,
  SubcriteriaRow,
  IndicatorsRow,
  Fundamental_ElementsRow,
  FileTableRow,
} from "../../types/DataTypes";
import { StatusBadge } from "../../components/ui/StatusBadge";

export const versionColumns = (
  handleNext: (row: VersionRow) => void,
  handleModal: (row: VersionRow) => void,
): Column<VersionRow>[] => [
  {
    header: "VERSIÓN",
    field: "version",
    render: (value) => (
      <Typography
        variant="h4"
        text={value as string}
        className="text-left text-blue-600"
      />
    ),
  },
  {
    header: "NOMBRE DE LA VERSIÓN",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "DESCRIPCIÓN",
    field: "description",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "edit",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleModal(row),
          },
          {
            icon: "arrow",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleNext(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];

export const modelColumns = (
  handleNext: (row: ModelRow) => void,
  handleModal: (row: ModelRow) => void,
): Column<ModelRow>[] => [
  {
    header: "NOMBRE DEL MODELO",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "DESCRIPCIÓN",
    field: "description",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "ESTADO",
    field: "status",
    render: (value) => (
      <div className="text-left">
        <StatusBadge
          text={value ? "Publicado" : "Borrador"}
          variant={value ? "published" : "draft"}
        ></StatusBadge>
      </div>
    ),
  },
  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "edit",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleModal(row),
          },
          {
            icon: "arrow",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleNext(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];

export const criteriaColumns = (
  handleNext: (row: CriteriaRow) => void,
  handleModal: (row: CriteriaRow) => void,
): Column<CriteriaRow>[] => [
  {
    header: "NOMBRE DEL CRITERIO",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "DESCRIPCIÓN",
    field: "description",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "edit",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleModal(row),
          },
          {
            icon: "arrow",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleNext(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];

export const subcriteriaColumns = (
  handleNext: (row: SubcriteriaRow) => void,
  handleModal: (row: SubcriteriaRow) => void,
): Column<SubcriteriaRow>[] => [
  {
    header: "NOMBRE DEL SUBCRITERIO",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "DESCRIPCIÓN",
    field: "description",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "edit",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleModal(row),
          },
          {
            icon: "arrow",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleNext(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];

export const indicatorsColumns = (
  handleNext: (row: IndicatorsRow) => void,
  handleModal: (row: IndicatorsRow) => void,
  handleInfo: (row: IndicatorsRow) => void,
): Column<IndicatorsRow>[] => [
  {
    header: "NOMBRE DEL INDICADOR",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "TIPO",
    field: "type",
    render: (value) => (
      <div className="text-left">
        <StatusBadge
          text={value as string}
          variant={value === "Cuantitativo" ? "quantitative" : "qualitative"}
        ></StatusBadge>
      </div>
    ),
  },

  {
    header: "FUENTES DE INFORMACIÓN",
    field: "information_sources",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "notebook",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleInfo(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={
          [
            {
              icon: "edit",
              iconPosition: "left",
              variant: "icons",
              onClick: () => handleModal(row),
            },
            ...(row.type === "Cualitativo"
              ? [
                  {
                    icon: "arrow",
                    iconPosition: "left",
                    variant: "icons",
                    onClick: () => handleNext(row),
                  },
                ]
              : []),
          ] as Action[]
        }
        className="!justify-start"
      />
    ),
  },
];

export const fundamental_ElementsColumns = (
  handleModal: (row: Fundamental_ElementsRow) => void,
): Column<Fundamental_ElementsRow>[] => [
  {
    header: "NOMBRE DEL ELEMENTO",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "SATISFACTORIO (1)",
    field: "satisfactory",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "QUASI SATISFACTORIO (0.75)",
    field: "quasi_satisfactory",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "POCO SATISFACTORIO (0.5)",
    field: "somewhat_satisfactory",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "DEFICIENTE (0)",
    field: "deficient",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },
  {
    header: "EVIDENCIAS CARGADAS",
    field: "evidence",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "notebook",
            iconPosition: "left",
            variant: "icons",
            text: `${row.evidence?.length ?? 0}`,
            disabled: true,
          },
        ]}
        className="!justify-start"
      />
    ),
  },
  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "arrow",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleModal(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];

export const fileTableColumns = (
  handleNext: (row: FileTableRow) => void,
  handleDelete: (row: FileTableRow) => void,
): Column<FileTableRow>[] => [
  {
    header: "NOMBRE DE LA EVIDENCIA",
    field: "name",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "TAMAÑO (MB)",
    field: "size",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "TIPO",
    field: "type",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "FECHA DE CREACIÓN",
    field: "createdAt",
    render: (value) => (
      <Typography
        variant="p"
        text={value as string}
        className="text-left text-sm"
      />
    ),
  },

  {
    header: "ACCIONES",
    field: "id",
    render: (_, row) => (
      <ActionButtons
        actions={[
          {
            icon: "eye",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleNext(row),
          },
          {
            icon: "delete",
            iconPosition: "left",
            variant: "icons",
            onClick: () => handleDelete(row),
          },
        ]}
        className="!justify-start"
      />
    ),
  },
];
