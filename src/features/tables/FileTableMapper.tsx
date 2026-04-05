import type { FileTableRow } from "../../types/DataTypes";

export function mapFilesToTableRows(files: File[]): FileTableRow[] {
  return files.map((file) => ({
    file,
    name: file.name,
    size: formatFileSize(file.size),
    url: URL.createObjectURL(file),
    id: "New" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString().slice(0, 10),
    type: file.type,
  }));
}

function formatFileSize(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}
