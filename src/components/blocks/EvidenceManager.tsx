// components/blocks/EvidenceManager.tsx
import React, { useCallback, useMemo } from "react";
import Grid from "../layout/Grid";
import EvidenceLinkCard from "./EvidenceLinkCard";
import FileUploader from "../ui/FileUploader";
import { DataTable } from "../ui/DataTable";
import type { FileTableRow } from "../../types/DataTypes";
import { mapFilesToTableRows } from "../../features/tables/FileTableMapper";
import { getTableConfig } from "../../features/tables/TablesScreenConfig";
import type { AcceptType } from "../ui/FileUploader";

type Props = {
  files: FileTableRow[];
  setFiles: React.Dispatch<React.SetStateAction<FileTableRow[]>>;
  multiple?: boolean;
  maxSizeMB?: number;
  accept?: AcceptType;
};

const EvidenceManager: React.FC<Props> = ({
  files,
  setFiles,
  multiple,
  maxSizeMB,
  accept,
}) => {
  // ==================== HANDLERS ====================
  const handleFiles = useCallback(
    (newFiles: File[]) => {
      const mapped = mapFilesToTableRows(newFiles);
      setFiles((prev) => [...prev, ...mapped]);
    },
    [setFiles],
  );

  const handleNext = useCallback((row: unknown) => {
    const r = row as { url: string };
    if (r.url) {
      window.open(r.url, "_blank");
    }
  }, []);

  const handleDelete = useCallback(
    (row: unknown) => {
      const r = row as { id: string };
      setFiles((prev) => prev.filter((f) => f.id !== r.id));
    },
    [setFiles],
  );

  const handleAddLink = useCallback(
    (data: { name: string; url: string }) => {
      const newRow: FileTableRow = {
        id: "New" + Math.random().toString(36).substr(2, 9),
        name: data.name,
        size: "0 MB",
        url: data.url,
        createdAt: new Date().toISOString().slice(0, 10),
        type: "url",
      };
      setFiles((prev) => [...prev, newRow]);
    },
    [setFiles],
  );

  // ==================== COLUMNS ====================
  const { columns } = useMemo(() => {
    return getTableConfig(
      `/evidencias`,
      handleNext,
      undefined,
      undefined,
      handleDelete,
    );
  }, [handleNext, handleDelete]);

  // ==================== RENDER ====================
  return (
    <div>
      <Grid className="!my-4">
        <div>
          <EvidenceLinkCard onAdd={handleAddLink} />
        </div>
        <FileUploader
          multiple={multiple}
          maxSizeMB={maxSizeMB || 0}
          accept={accept || "application/pdf"}
          onFilesChange={handleFiles}
        />
      </Grid>

      <DataTable columns={columns} data={[...files].reverse()} />
    </div>
  );
};

export default EvidenceManager;
