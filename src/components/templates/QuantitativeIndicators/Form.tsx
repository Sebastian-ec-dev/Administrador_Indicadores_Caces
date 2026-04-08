import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EvidenceConfig from "../../blocks/EvidenceConfig";
import EvidenceManager from "../../blocks/EvidenceManager";
import { VariableItem } from "../../blocks/VariableDefinition";

import Grid from "../../layout/Grid";
import ActionButtons from "../../layout/ActionButtons";
import Breadcrumb from "../../layout/Breadcrumb";

import Typography from "../../ui/Typography";
import { Input } from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import { StatusBadge } from "../../ui/StatusBadge";

import { useBreadcrumb } from "../../../hooks/useBreadcrumb";

import {
  variableDefinitionSchema,
  type VariableDefinitionForm,
} from "../../../lib/validators/inputs";

import type { FileTableRow } from "../../../types/DataTypes";

type Props = {
  onNext?: (
    data: VariableDefinitionForm & { evidences: FileTableRow[] },
  ) => void;
  dataForm?: VariableDefinitionForm & { evidences?: FileTableRow[] };
};

export const QuantitativeIndicators_Form: React.FC<Props> = ({
  onNext,
  dataForm,
}) => {
  // ==============================
  // FORM
  // ==============================
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<VariableDefinitionForm>({
    resolver: zodResolver(variableDefinitionSchema),
    mode: "onBlur",
    defaultValues: {
      name: dataForm?.name || "",
      standard: dataForm?.standard || "",
      period: dataForm?.period || "",
      sources: dataForm?.sources || "",
      calculation_guidelines: dataForm?.calculation_guidelines || "",
      variables: dataForm?.variables || [],
    },
  });

  const {
    fields: variablesFields,
    append: appendVariable,
    remove: removeVariable,
  } = useFieldArray({
    control,
    name: "variables",
  });

  // ==============================
  // STATE
  // ==============================
  const [files, setFiles] = useState<FileTableRow[]>(dataForm?.evidences || []);
  const [enabled, setEnabled] = useState(Boolean(dataForm?.evidences?.length));

  // ==============================
  // HELPERS
  // ==============================
  const addVariable = (type: "standard" | "selection") => {
    appendVariable({
      id: Date.now().toString(),
      type,
      name: "",
      description: "",
      options: type === "selection" ? [] : undefined,
    });
  };

  const onError = () => {
    alert("Por favor completa todos los campos requeridos");
  };

  const handleClose = () => {
    reset();
    setFiles([]);
    setEnabled(false);
  };

  // ==============================
  // VALIDATIONS
  // ==============================
  const validateVariables = (
    variables: VariableDefinitionForm["variables"],
  ) => {
    if (variables.length === 0) {
      return "Ingrese al menos una variable de calculo";
    }

    // 🔹 validar nombres únicos de variables
    const names = variables.map((v) => v.name.trim().toLowerCase());

    if (new Set(names).size !== names.length) {
      return "Hay variables con nombres repetidos";
    }

    // 🔹 validar options dentro de cada variable
    for (const variable of variables) {
      if (!variable.options?.length) continue;

      const optionNames = variable.options.map((o) =>
        o.name.trim().toLowerCase(),
      );

      if (new Set(optionNames).size !== optionNames.length) {
        return `La variable "${variable.name}" tiene opciones repetidas`;
      }
    }

    return null;
  };

  // ==============================
  // SUBMIT
  // ==============================
  const onSubmit = (data: VariableDefinitionForm) => {
    const error = validateVariables(data.variables);

    if (error) {
      alert(`❌ ${error}`);
      return;
    }

    if (enabled && files.length === 0) {
      alert(
        "Debe agregar al menos una evidencia o desactivar la opción de evidencias.",
      );
      return;
    }

    if (onNext) {
      onNext({
        ...data,
        evidences: enabled ? files : [],
      });
    }
  };

  const pathList = useBreadcrumb();

  // ==============================
  // UI
  // ==============================
  return (
    <div className="p-6">
      <Breadcrumb items={pathList} />

      <div className="text-left">
        <Typography
          variant="h1"
          text="Configuración de Indicador"
          className="mb-2"
        />

        <StatusBadge
          text="Tipo: Cuantitativo"
          variant="quantitative"
          className="mb-6 !w-auto"
        />
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          {/* NOMBRE */}
          <Typography variant="h5" text="NOMBRE DEL INDICADOR" />

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                placeholder="Ingrese el nombre del indicador..."
                validatorType="alphanumeric"
                error={fieldState.error?.message}
              />
            )}
          />

          {/* GRID */}
          <Grid className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4">
            {/* ESTANDAR */}
            <div>
              <Typography variant="h5" text="ESTANDAR" className="mt-4" />

              <Controller
                name="standard"
                control={control}
                render={({ field, fieldState }) => (
                  <Textarea
                    {...field}
                    rows={1}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* PERIODO */}
            <div>
              <Typography
                variant="h5"
                text="PERIODO DE EVALUACIÓN"
                className="mt-4"
              />

              <Controller
                name="period"
                control={control}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Seleccione un periodo", value: "" },
                      { label: "2020", value: "20" },
                      { label: "2022", value: "22" },
                    ]}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </Grid>

          {/* TEXTOS */}
          <Typography variant="h5" text="FUENTES DE INFORMACIÓN" />
          <Controller
            name="sources"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea {...field} rows={5} error={fieldState.error?.message} />
            )}
          />

          <Typography variant="h5" text="LINEAMIENTOS DE CÁLCULOS" />
          <Controller
            name="calculation_guidelines"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea {...field} rows={5} error={fieldState.error?.message} />
            )}
          />

          {/* VARIABLES */}
          <Grid>
            <Typography text="DEFINICIÓN DE VARIABLES" variant="h5" />

            <ActionButtons
              actions={[
                {
                  text: "Estandar",
                  onClick: () => addVariable("standard"),
                  variant: "secondary",
                },
                {
                  text: "Sección",
                  onClick: () => addVariable("selection"),
                  variant: "secondary",
                },
              ]}
            />
          </Grid>

          {variablesFields.map((field, index) => (
            <VariableItem
              key={field.id}
              index={index}
              control={control}
              onRemove={() => removeVariable(index)}
            />
          ))}

          {/* EVIDENCE */}
          <EvidenceConfig
            className="mt-4 mb-6"
            enabled={enabled}
            onToggle={setEnabled}
          />

          {enabled && (
            <EvidenceManager files={files} setFiles={setFiles} maxSizeMB={2} />
          )}

          {/* ACTIONS */}
          <ActionButtons
            actions={[
              {
                text: "Cancelar",
                variant: "cancel",
                onClick: handleClose,
              },
              {
                text: "Siguiente",
                type: "submit",
                disabled: isSubmitting,
              },
            ]}
          />
        </form>
      </div>
    </div>
  );
};
