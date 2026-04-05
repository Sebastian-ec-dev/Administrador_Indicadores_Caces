import React, { useEffect } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import { type VariableDefinitionForm } from "../../lib/validators/inputs";
import Typography from "../ui/Typography";
import { Input } from "../ui/Input";
import ActionButtons from "../layout/ActionButtons";
import Textarea from "../ui/Textarea";
import Grid from "../layout/Grid";

export const VariableItem: React.FC<{
  index: number;
  control: Control<VariableDefinitionForm>;
  onRemove: () => void;
}> = ({ index, control, onRemove }) => {
  const variableType = useWatch({
    control,
    name: `variables.${index}.type` as const,
  });

  const {
    fields: optionsFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `variables.${index}.options` as const,
  });

  useEffect(() => {
    if (variableType === "selection" && optionsFields.length === 0) {
      appendOption({
        id: Date.now().toString(),
        name: "",
        value: "",
        description: "",
      });
    }
  }, [variableType, optionsFields.length, appendOption]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 relative">
      <ActionButtons
        actions={[
          {
            icon: "circlex",
            onClick: onRemove,
            variant: "icons",
            type: "button",
            className: "!px-0 hover:text-red-500",
          },
        ]}
        className="!mt-0 !items-end"
      />

      <Grid className="gap-y-5">
        <Controller
          name={`variables.${index}.name`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Typography
                variant="h5"
                text={
                  variableType === "selection"
                    ? "VARIABLE (SELECCIÓN)"
                    : "NOMBRE (EJ. N1)"
                }
                className="text-left mb-2"
              />

              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="Ej. N1"
                validatorType="alphanumeric"
                error={error?.message}
              />
            </div>
          )}
        />

        <Controller
          name={`variables.${index}.description`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Typography
                variant="h5"
                text={
                  variableType === "selection"
                    ? "DESCRIPCIÓN GENERAL"
                    : "DESCRIPCIÓN DE LA VARIABLE"
                }
                className="text-left mb-2"
              />

              <Textarea
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Ingrese una descripción..."
                validatorType="any"
                rows={1}
                error={error?.message}
              />
            </div>
          )}
        />
      </Grid>

      {variableType === "selection" && (
        <div className="mt-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
            <table className="min-w-[800px] w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-4">
                    <Typography text="Nombre de Opción" variant="h5" />
                  </th>
                  <th className="text-left p-4">
                    <Typography text="Valor" variant="h5" />
                  </th>
                  <th className="text-left p-4">
                    <Typography text="Descripción" variant="h5" />
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {optionsFields.map((optionField, optIndex) => (
                  <tr key={optionField.id}>
                    <td className="p-4">
                      <Controller
                        name={`variables.${index}.options.${optIndex}.name`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            placeholder="Ej. N1"
                            validatorType="alphanumeric"
                            error={error?.message}
                            className="bg-white"
                          />
                        )}
                      />
                    </td>
                    <td className="p-4">
                      <Controller
                        name={`variables.${index}.options.${optIndex}.value`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Input
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            placeholder="Ej. 1"
                            validatorType="decimal"
                            error={error?.message}
                            className="bg-white"
                          />
                        )}
                      />
                    </td>
                    <td className="p-4">
                      <Controller
                        name={`variables.${index}.options.${optIndex}.description`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <Textarea
                            value={field.value || ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder="Ingrese una descripción..."
                            validatorType="any"
                            rows={1}
                            error={error?.message}
                          />
                        )}
                      />
                    </td>
                    <td className="p-4">
                      <ActionButtons
                        actions={[
                          {
                            icon: "delete",
                            onClick: () => removeOption(optIndex),
                            variant: "icons",
                            className: "!mt-0 hover:text-red-500",
                          },
                        ]}
                        className="!mt-0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ActionButtons
            actions={[
              {
                onClick: () =>
                  appendOption({
                    id: Date.now().toString(),
                    name: "",
                    value: "",
                    description: "",
                  }),
                icon: "plus",
                text: "Añadir opción de selección",
                variant: "secondary",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};
