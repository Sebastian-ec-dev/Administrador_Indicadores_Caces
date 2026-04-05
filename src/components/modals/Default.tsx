import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import Textarea from "../ui/Textarea";
import { modal_name_Schema, type ModalForm } from "../../lib/validators/inputs";
import Typography from "../ui/Typography";
import ActionButtons from "../layout/ActionButtons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (modelData: { name: string; description: string }) => void;
  modalTitle?: string;
  modalName?: string;
  modalDescription?: string;
};

const CreateDefaultModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  modalTitle,
  modalName,
  modalDescription,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ModalForm>({
    resolver: zodResolver(modal_name_Schema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: modalName || "",
        description: modalDescription || "",
      });
    }
  }, [isOpen, modalName, modalDescription, reset]);

  const onSubmit = (data: ModalForm) => {
    onSave({
      name: data.name.trim(),
      description: data.description || "",
    });

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <Typography
            text={modalTitle}
            variant="h2"
            className="text-left text-blue-900"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 ">
          {/* Nombre */}
          <div>
            <Typography text="NOMBRE" variant="h5" className="text-left mb-2" />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  placeholder="Ej. Rendimiento Académico"
                  validatorType="letters"
                  error={error?.message}
                />
              )}
            />
          </div>

          {/* Descripción */}
          <div>
            <Typography
              text="DESCRIPCIÓN"
              variant="h5"
              className="text-left mb-2"
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Describe el propósito y alcance de este criterio de evaluación..."
                  validatorType="any"
                  error={error?.message}
                />
              )}
            />
          </div>

          <ActionButtons
            actions={[
              {
                text: "Cancelar",
                onClick: () => handleClose(),
                variant: "cancel",
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

export default CreateDefaultModal;
