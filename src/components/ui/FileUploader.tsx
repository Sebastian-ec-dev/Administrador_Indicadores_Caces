import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";

export type AcceptType = "application/pdf" | "image/*" | "video/*";

const ACCEPTED_TYPES: Record<AcceptType, string> = {
  "application/pdf": "PDF",
  "image/*": "Imagen",
  "video/*": "Video",
};

type Props = {
  multiple?: boolean;
  maxSizeMB?: number;
  accept?: AcceptType;
  onFilesChange?: (files: File[]) => void;
};

export default function FileUploader({
  multiple = false,
  maxSizeMB = 20,
  accept = "application/pdf",
  onFilesChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const isValidFile = (file: File): boolean => {
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    if (accept === "image/*") {
      return fileType.startsWith("image/");
    }

    if (accept === "video/*") {
      return fileType.startsWith("video/");
    }

    if (accept) {
      return fileType === accept;
    }

    if (accept === "application/pdf" || !accept) {
      return fileType === "application/pdf" || fileName.endsWith(".pdf");
    }

    return false;
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (!isValidFile(file)) {
        alert(`El archivo "${file.name}" no es válido.`);
        return;
      }
      if (file.size > maxSizeBytes) {
        alert(
          `El archivo "${file.name}" excede el tamaño máximo de ${maxSizeMB} MB.`,
        );
        return;
      }
      validFiles.push(file);
    });

    onFilesChange?.(validFiles);
  };

  // === Drag & Drop Handlers ===
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-2xl p-10 text-center bg-white transition-all cursor-pointer
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
    >
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <UploadCloud className="w-9 h-9 text-blue-500" />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Seleccionar {ACCEPTED_TYPES[accept]}
      </h3>

      <p className="text-gray-600 mb-6">
        Arrastra y suelta varios archivos aquí o haz clic para explorar
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        className="bg-blue-800 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
      >
        Seleccionar archivos
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Máximo {maxSizeMB} MB <span className="font-medium">por archivo</span>
      </p>

      {/* Input oculto */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => processFiles(e.target.files)}
      />
    </div>
  );
}
