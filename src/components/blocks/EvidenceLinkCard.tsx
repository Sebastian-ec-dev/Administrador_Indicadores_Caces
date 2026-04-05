import { Link2 } from "lucide-react";
import { Input } from "../ui/Input";
import ActionButtons from "../layout/ActionButtons";
import {
  evidenceLinkSchema,
  type EvidenceLinkForm,
} from "../../lib/validators/inputs";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  name: string;
  url: string;
};

type Props = {
  onAdd: (data: FormValues) => void;
};

export default function EvidenceLinkCard({ onAdd }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EvidenceLinkForm>({
    resolver: zodResolver(evidenceLinkSchema),
    defaultValues: {
      name: "",
      url: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => {
    onAdd(data);
    reset();
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
        <Link2 className="w-8 h-8 text-blue-500" />
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Agregar enlace de evidencia
      </h3>

      <p className="text-sm text-gray-500 mb-6">
        Ingresa un nombre y una URL válida
      </p>

      <div className="w-full max-w-xl flex flex-col gap-4">
        <div className="text-left">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="Ingrese el nombre de la evidencia..."
                validatorType="alphanumeric"
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="text-left">
          <Controller
            name="url"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                placeholder="https://enlace.com"
                validatorType="any"
                error={error?.message}
              />
            )}
          />
        </div>
      </div>

      <ActionButtons
        actions={[
          {
            text: "Agregar",
            disabled: isSubmitting,
            onClick: handleSubmit(onSubmit),
            className: "!w-full",
          },
        ]}
        className="!w-full"
      />
    </div>
  );
}
