import { useState } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";
import Typography from "../components/ui/Typography";
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import type { FileTableRow } from "../types/DataTypes";
import EvidenceConfig from "../components/blocks/EvidenceConfig";
import { Input } from "../components/ui/Input";
import Grid from "../components/layout/Grid";
import Textarea from "../components/ui/Textarea";
import ActionButtons from "../components/layout/ActionButtons";
import {
  fundamentalElementsSchema,
  type FundamentalElementsForm,
} from "../lib/validators/inputs";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm, Controller } from "react-hook-form";
import { createFundamentalElement } from "../hooks/useCreateFundamental_Elements";
import EvidenceManager from "../components/blocks/EvidenceManager";

// ====================== COMPONENT ======================
export const CreateFundamental_Elements: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FundamentalElementsForm>({
    resolver: zodResolver(fundamentalElementsSchema),
    defaultValues: {
      name: "",
      satisfactory: "",
      quasi_satisfactory: "",
      somewhat_satisfactory: "",
      deficient: "",
      extra_info: "",
    },
    mode: "onBlur",
  });
  const [files, setFiles] = useState<FileTableRow[]>([]);
  const [enabled, setEnabled] = useState(false);

  // ==================== HOOKS ====================

  const pathList = useBreadcrumb();

  // ==================== HANDLERS ====================

  const onSubmit = (data: FundamentalElementsForm) => {
    if (enabled && files.length === 0) {
      alert(
        "Debe agregar al menos una evidencia o desactivar la opción de evidencias.",
      );
      return;
    }

    createFundamentalElement(data, files, enabled);
    setFiles([]);
    setEnabled(false);
    reset();
  };

  const onError = () => {
    alert("Por favor completa todos los campos requeridos");
  };

  const handleClose = () => {
    setFiles([]);
    setEnabled(false);
    reset();
  };

  // ==================== RENDER ====================
  return (
    <div className="p-6">
      <Breadcrumb items={pathList} />

      <div className="text-left">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Typography
            variant="h1"
            text="Configuración de Elementos Fundamentales"
            className="text-left mb-6"
          />

          <Typography
            variant="h5"
            text="NOMBRE DEL ELEMENTO FUNDAMENTAL"
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
                placeholder="Ingrese el nombre del elemento fundamental..."
                validatorType="alphanumeric"
                error={error?.message}
              />
            )}
          />

          <Grid className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4">
            <div>
              <Typography
                variant="h5"
                text="SATISFACTORIO (1)"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="satisfactory"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="Proporcione una descripción detallada ..."
                    validatorType="any"
                    rows={5}
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div>
              <Typography
                variant="h5"
                text="CUASI SATISFACTORIO (0.75)"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="quasi_satisfactory"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="Proporcione una descripción detallada ..."
                    validatorType="any"
                    rows={5}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </Grid>

          <Grid className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-4">
            <div>
              <Typography
                variant="h5"
                text="POCO SATISFACTORIO (0.5)"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="somewhat_satisfactory"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="Proporcione una descripción detallada ..."
                    validatorType="any"
                    rows={5}
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div>
              <Typography
                variant="h5"
                text="DEFICIENTE (0)"
                className="text-left mb-1 mt-4 text-black"
              />

              <Controller
                name="deficient"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    placeholder="Proporcione una descripción detallada ..."
                    validatorType="any"
                    rows={5}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </Grid>

          <Typography
            variant="h5"
            text="INFORMACIÓN ADICIONAL (OPCIONAL)"
            className="text-left mb-1 mt-4 text-black"
          />

          <Controller
            name="extra_info"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Textarea
                value={field.value as string}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="Proporcione una descripción detallada ..."
                validatorType="any"
                rows={5}
                error={error?.message}
              />
            )}
          />

          <EvidenceConfig
            className="mt-4 mb-6"
            enabled={enabled}
            onToggle={setEnabled}
          />

          {enabled && (
            <EvidenceManager files={files} setFiles={setFiles} maxSizeMB={2} />
          )}

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
