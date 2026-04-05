import type { QualitativeIndicatorForm } from "../lib/validators/inputs";

export const createQualitativeIndicator = async (
  data: QualitativeIndicatorForm,
) => {
  const data_endpoint = {
    name: data.name,
    standard: data.standard,
    period: data.period,
    sources: data.sources,
    type: "Cualitativo",
  };
  console.log("Creando indicador cualitativo con datos:", data_endpoint);
};
