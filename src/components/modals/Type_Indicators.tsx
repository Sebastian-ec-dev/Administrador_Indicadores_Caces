import React from "react";
import Typography from "../../components/ui/Typography";
import Grid from "../../components/layout/Grid";
import { MessageSquare, BarChart3 } from "lucide-react";
import ActionButtons from "../layout/ActionButtons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: "qualitative" | "quantitative") => void;
};

const SelectIndicatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  const handleSelect = (type: "qualitative" | "quantitative") => {
    onSelect(type);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl p-8 my-10 mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ActionButtons
          actions={[
            {
              icon: "circlex",
              variant: "icons",
              iconPosition: "left",
              className: "!px-0 !py-0",
              onClick: onClose,
            },
          ]}
          className="!justify-end !py-2"
        />

        {/* Header */}
        <div className="text-center mb-10">
          <Typography
            text="Seleccione el tipo de Indicador"
            variant="h2"
            className="text-blue-900"
          />
          <Typography
            text="Elija la naturaleza del indicador para comenzar la configuración."
            variant="p"
            className="text-gray-500 mt-2"
          />
        </div>

        {/* Opciones */}

        <Grid className="gap-y-3">
          <div className="border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
              <MessageSquare className="w-8 h-8 text-blue-800" />
            </div>

            <Typography
              text="Cualitativo"
              variant="h3"
              className="text-blue-900 mb-2"
            />

            <Typography
              text="Ideal para medir percepciones, niveles de satisfacción o categorías subjetivas basadas en observaciones y descripciones detalladas."
              variant="p"
              className="text-gray-500 mb-6"
            />

            <ActionButtons
              actions={[
                {
                  text: "Seleccionar",
                  onClick: () => handleSelect("qualitative"),
                },
              ]}
              className="!justify-center"
            />
          </div>

          {/* Cuantitativo */}
          <div className="border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
              <BarChart3 className="w-8 h-8 text-blue-800" />
            </div>

            <Typography
              text="Cuantitativo"
              variant="h3"
              className="text-blue-900 mb-2"
            />

            <Typography
              text="Diseñado para datos numéricos, porcentajes y estadísticas medibles que permiten un análisis matemático y comparativo riguroso."
              variant="p"
              className="text-gray-500 mb-6"
            />

            <ActionButtons
              actions={[
                {
                  text: "Seleccionar",
                  onClick: () => handleSelect("quantitative"),
                },
              ]}
              className="!justify-center"
            />
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default SelectIndicatorModal;
