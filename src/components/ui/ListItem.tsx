import React from "react";
import Typography from "./Typography";

interface ListItemProps {
  title: string;
  description: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  onClick,
  icon,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      className={`group p-5 rounded-2xl border border-transparent 
                  hover:bg-blue-50 hover:border-blue-100 
                  cursor-pointer transition-all duration-200 
                  active:scale-[0.98] hover:shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-blue-600">{icon}</div>}

        <div className="flex-1 min-w-0">
          <Typography
            text={title}
            variant="h5"
            className="group-hover:text-blue-700 transition-colors"
          />
          <Typography text={description} variant="span" />
        </div>
      </div>
    </div>
  );
};
