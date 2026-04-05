// components/blocks/FormulaEditor.tsx
import React, { useState } from "react";
import { evaluateFormula } from "../../../lib/utils/FormulaEngine";
import type { Variable, Example } from "./FormulaExamples";
import { examples, mathFunctions } from "./FormulaExamples";
import ActionButtons from "../../layout/ActionButtons";
import Typography from "../../ui/Typography";
import { Input } from "../../ui/Input";
import Select from "../../ui/Select";
import { ListItem } from "../../ui/ListItem";
import { FormulaEditor } from "../../blocks/FormulaEditor";

type Props = {
  onBack?: (txtFormula: string) => void;
  onSave?: (txtFormula: string) => void;

  variables: Variable[];
  txtFormula: string;
};

export const Formula: React.FC<Props> = ({
  variables,
  onBack,
  txtFormula,
  onSave,
}) => {
  const [formula, setFormula] = useState(txtFormula || "");

  const [values, setValues] = useState<Record<string, string | number>>(() => {
    const initial: Record<string, string | number> = {};
    variables.forEach((v) => {
      if (v.type === "standard") {
        initial[v.name] = 0;
      } else if (v.options?.length) {
        initial[v.name] = Number(v.options[0].value);
      }
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<"functions" | "examples">(
    "functions",
  );

  const [result_formula, setResultFormula] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const insertText = (text: string) => {
    setFormula((prev) => prev + " " + text);
  };

  const loadExample = (example: Example) => {
    setFormula(example.formula);
  };

  const calcular = () => {
    const res = evaluateFormula(formula, values);
    setResultFormula(res);
  };

  const handleBack = () => {
    onBack?.(formula);
  };

  const handleSave = () => {
    if (formula === "") {
      alert("Ingrese una formula");
      return;
    }

    onSave?.(formula);
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <div
        className={`
    fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl lg:shadow-none
    transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}

          <div className="flex border-b bg-gray-50">
            <ActionButtons
              actions={[
                {
                  text: "Funciones",
                  onClick: () => setActiveTab("functions"),
                  variant: "cancel",
                  className: "!flex-1",
                },
                {
                  text: "Ejemplos",
                  onClick: () => setActiveTab("examples"),
                  variant: "cancel",
                  className: "!flex-1",
                },
              ]}
              className="!w-full !gap-0 !mt-0 !flex-row"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-2.5">
            {activeTab === "functions"
              ? mathFunctions.map((fn) => (
                  <ListItem
                    title={fn.name}
                    description={fn.description}
                    onClick={() => {
                      insertText(fn.formula);
                      setIsSidebarOpen(false);
                    }}
                  />
                ))
              : examples.map((example) => (
                  <ListItem
                    title={example.title}
                    description={example.description}
                    onClick={() => {
                      loadExample(example);
                      setIsSidebarOpen(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ActionButtons
          actions={[
            {
              icon: "menu",
              onClick: () => setIsSidebarOpen(true),
              variant: "icons",
              className:
                "lg:hidden p-3 rounded-2xl hover:bg-gray-100 transition-colors",
            },
          ]}
          className="!justify-start !flex-row"
        />

        <div className="h-16  px-6 flex items-center justify-end">
          <div className="flex items-center gap-3 w-full">
            <ActionButtons
              actions={[
                {
                  text: "Regresar",
                  variant: "secondary",
                  className: "order-none ",
                  onClick: handleBack,
                },
                {
                  text: "Guardar",
                  variant: "primary",
                  className: "order-none",
                  onClick: handleSave,
                },
              ]}
              className=" !flex-row !mt-0 !w-full"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 lg:p-8 space-y-10">
          <FormulaEditor value={formula} onChange={setFormula} />

          <div className="space-y-6">
            <Typography
              text="SIMULADOR DE CÁLCULO"
              variant="h4"
              className="text-gray-800 font-semibold"
            />

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border p-8">
                <div className="mb-6">
                  <Typography
                    text="Variables de entrada"
                    variant="h5"
                    className="text-gray-800 font-semibold"
                  />
                  <Typography
                    text="Ingresa los valores para realizar el cálculo"
                    variant="span"
                    className="text-gray-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {variables.map((variable) => (
                    <div key={variable.id} className="space-y-2">
                      <Typography
                        text={variable.name}
                        variant="h5"
                        className="text-gray-800 font-semibold text-left"
                      />

                      {variable.type === "standard" ? (
                        <Input
                          type="text"
                          value={String(values[variable.name] || "")}
                          onChange={(value) =>
                            setValues((prev) => ({
                              ...prev,
                              [variable.name]: value,
                            }))
                          }
                          validatorType="decimal"
                          className="w-full"
                        />
                      ) : (
                        <Select
                          value={String(values[variable.name] ?? "")}
                          onChange={(value) =>
                            setValues((prev) => ({
                              ...prev,
                              [variable.name]: value,
                            }))
                          }
                          options={
                            variable.options?.map((opt) => ({
                              label: opt.name,
                              value: String(opt.value),
                            })) || []
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>

                <ActionButtons
                  actions={[
                    {
                      text: "Ejecutar Cálculo",
                      onClick: calcular,
                      icon: "calculator",
                      className: "!w-full",
                    },
                  ]}
                />
              </div>

              <div
                className="lg:col-span-2 bg-blue-800
                    rounded-3xl p-10 flex flex-col items-center justify-center text-white 
                    shadow-xl relative overflow-hidden"
              >
                <div className="text-center relative z-10 w-full">
                  <Typography text="RESULTADO" variant="h4" />

                  <div className="min-h-[120px] flex items-center justify-center">
                    {result_formula !== undefined && result_formula !== null ? (
                      <Typography
                        text={
                          typeof result_formula === "number"
                            ? result_formula.toLocaleString("es-ES", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 8,
                              })
                            : String(result_formula)
                        }
                        variant="h1"
                        className="text-white tracking-tighter break-all"
                      />
                    ) : (
                      <Typography
                        text="—"
                        variant="h1"
                        className="text-white tracking-tighter break-all"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
