import React from "react";
import Typography from "../../components/ui/Typography";
import { FileText } from "lucide-react";
import ActionButtons from "../../components/layout/ActionButtons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
};

const FundamentalElementsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  title = "Fuentes de Información",
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl p-8 my-10 mx-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-2xl">
              <FileText className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <Typography text={title} variant="h2" className="text-blue-900" />
            </div>
          </div>
        </div>

        {/* Scrollable Text Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 border border-gray-100 rounded-2xl p-8 mb-6 text-gray-700 leading-relaxed text-[15px] max-h-[60vh]">
          <div className="whitespace-pre-wrap">
            <Typography
              text={content || "No hay información disponible."}
              variant="p"
              className="text-justify"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <ActionButtons
            actions={[
              {
                text: "Cerrar",
                variant: "cancel",
                onClick: onClose,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FundamentalElementsModal;
