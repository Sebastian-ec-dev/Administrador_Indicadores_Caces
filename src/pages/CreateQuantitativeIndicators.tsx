import { useState } from "react";
import { QuantitativeIndicators_Form } from "../components/templates/QuantitativeIndicators/Form";
import type { VariableDefinitionForm } from "../lib/validators/inputs";
import { Formula } from "../components/templates/QuantitativeIndicators/Formula";
import type { FileTableRow } from "../types/DataTypes";

export const CreateQuantitativeIndicators = () => {
  const [step, setStep] = useState(1);

  const [variableData, setVariableData] = useState<
    (VariableDefinitionForm & { evidences: FileTableRow[] }) | undefined
  >(undefined);

  const [formula, setFormula] = useState("");

  const handleSave = () => {
    alert("Datos Guardados");
    const data = {
      ...variableData,
      formula,
    };
    console.log(data);
  };

  return (
    <>
      {step === 1 && (
        <QuantitativeIndicators_Form
          onNext={(data) => {
            setVariableData(data);
            setStep(2);
          }}
          dataForm={variableData}
        />
      )}

      {step === 2 && variableData && (
        <Formula
          variables={variableData.variables}
          txtFormula={formula}
          onBack={(data) => {
            setFormula(data);
            setStep(1);
          }}
          onSave={(data) => {
            setFormula(data);
            handleSave();
          }}
        ></Formula>
      )}
    </>
  );
};
