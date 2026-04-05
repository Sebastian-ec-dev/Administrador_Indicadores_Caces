import type { FileTableRow } from "../types/DataTypes";
import type { FundamentalElementsForm } from "../lib/validators/inputs";

export const createFundamentalElement = async (
  data: FundamentalElementsForm,
  files: FileTableRow[],
  enabled: boolean,
) => {
  const data_endpoint = {
    name: data.name,
    satisfactory: data.satisfactory,
    quasi_satisfactory: data.quasi_satisfactory,
    somewhat_satisfactory: data.somewhat_satisfactory,
    deficient: data.deficient,
    extra_info: data.extra_info,
    files: files,
    requiresEvidences: enabled,
  };
  console.log("Creando elemento fundamental con datos:", data_endpoint);
};
