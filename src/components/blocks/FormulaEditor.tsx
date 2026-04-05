import React from "react";
import Textarea from "../ui/Textarea";

interface FormulaEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  title?: string;
  className?: string;
}

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  value,
  onChange,
  height = "h-80",
  title = "Editor de Fórmula",
  className = "",
}) => {
  return (
    <div
      className={`rounded-3xl border border-gray-100 overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b bg-gray-50 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-500">{title}</span>
      </div>

      <Textarea
        value={value}
        onChange={onChange}
        className={`w-full ${height} bg-gray-900 p-8 text-base font-mono 
                   text-gray-100 outline-none resize-none leading-relaxed 
                   !rounded-t-none !rounded-b-[40px]`}
        validatorType="any"
      />
    </div>
  );
};
