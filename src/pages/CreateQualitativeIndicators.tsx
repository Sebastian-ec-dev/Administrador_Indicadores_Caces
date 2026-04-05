import React from "react";
import { Input } from "../components/ui/Input";
import Breadcrumb from "../components/layout/Breadcrumb";
import Typography from "../components/ui/Typography";
import Grid from "../components/layout/Grid";
import Textarea from "../components/ui/Textarea";
import Select from "../components/ui/Select";
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { StatusBadge } from "../components/ui/StatusBadge";
import ActionButtons from "../components/layout/ActionButtons";
import {
  qualitativeSchema,
  type QualitativeIndicatorForm,
} from "../lib/validators/inputs";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm, Controller } from "react-hook-form";
import { createQualitativeIndicator } from "../hooks/useCreateIndicators";

export const CreateQualitativeIndicators: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<QualitativeIndicatorForm>({
    resolver: zodResolver(qualitativeSchema),
    defaultValues: {
      name: "",
      standard: "",
      period: "",
      sources: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: QualitativeIndicatorForm) => {
    createQualitativeIndicator(data);
    reset();
  };

  const handleClose = () => {
    reset();
  };

  const onError = () => {
    alert("Por favor completa todos los campos requeridos");
  };

  const pathList = useBreadcrumb();

  return (
    <div className="p-6">
      <Breadcrumb items={pathList} />

      <div className="text-left">
        <Typography
          variant="h1"
          text="Configuración de Indicador"
          className="text-left mb-2"
        />

        <StatusBadge
          text="Tipo: Cualitativo"
          variant="qualitative"
          className="mb-6 !w-auto"
        />

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Typography
            variant="h5"
            text="NOMBRE DEL INDICADOR"
            className="text-left mb-1 text-black"
          />
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="Ingrese el nombre del indicador..."
                validatorType="alphanumeric"
                error={error?.message}
              />
            )}
          />

          <Grid className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4">
            <div>
              <Typography
                variant="h5"
                text="ESTANDAR"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="standard"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="ESTANDAR......."
                    validatorType="any"
                    rows={1}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <div>
              <Typography
                variant="h5"
                text="PERIODO DE EVALUACIÓN"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="period"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    name={field.name}
                    onBlur={field.onBlur}
                    options={[
                      { label: "Seleccione un periodo", value: "" },
                      { label: "2020", value: "20" },
                      { label: "2022", value: "22" },
                    ]}
                    placeholder="Seleccione un periodo"
                    error={error?.message}
                  />
                )}
              />
            </div>
          </Grid>

          <Typography
            variant="h5"
            text="FUENTES DE INFORMACIÓN"
            className="text-left mb-1 mt-4 text-black"
          />

          <Controller
            name="sources"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Textarea
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="FUENTES DE INFORMACIÓN......."
                validatorType="any"
                rows={5}
                error={error?.message}
              />
            )}
          />

          <ActionButtons
            actions={[
              {
                text: "Cancelar",
                variant: "cancel",
                onClick: () => handleClose(),
              },
              {
                text: isSubmitting ? "Guardando..." : "Guardar",
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
