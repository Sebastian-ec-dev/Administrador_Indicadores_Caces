import {
  Plus,
  Trash2,
  Pencil,
  ArrowRight,
  NotebookText,
  Database,
  Globe2,
  CircleX,
  EyeIcon,
  UploadCloud,
  Menu,
  Calculator,
} from "lucide-react";

const iconMap = {
  plus: <Plus className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
  edit: <Pencil className="w-4 h-4" />,
  arrow: <ArrowRight className="w-4 h-4" />,
  notebook: <NotebookText className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  globe: <Globe2 className="w-5 h-5" />,
  circlex: <CircleX className="w-7 h-7" />,
  eye: <EyeIcon className="w-5 h-5" />,
  upload: <UploadCloud className="w-5 h-5" />,
  menu: <Menu className="w-7 h-7" />,
  calculator: <Calculator className="w-7 h-7" />,
};

export type IconType = keyof typeof iconMap;

export type VariantType = "primary" | "secondary" | "cancel" | "add" | "icons";

export type ButtonType = "button" | "submit" | "reset";

export type IconPosition = "left" | "right";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all px-4 py-2 w-full min-[800px]:w-auto cursor-pointer";

const variants = {
  primary: "bg-blue-800 text-white hover:bg-blue-700",
  secondary:
    "text-blue-800 border-2 border-blue-800/100 hover:bg-blue-800 hover:text-white",
  cancel: "text-gray-800 hover:bg-gray-300",
  add: "text-blue-800",
  icons: "w-24",
};

type Props = {
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: VariantType;
  icon?: IconType;
  iconPosition?: IconPosition;
  type?: ButtonType;
  disabled?: boolean;
};

export const Button = ({
  text,
  onClick,
  className = "",
  variant = "primary",
  icon,
  iconPosition = "left",
  type = "button",
  disabled = false,
}: Props) => {
  const Icon = icon ? iconMap[icon] : null;

  const isIconOnly = icon && !text;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${
        isIconOnly ? "p-2 rounded-full !w-auto" : ""
      } ${className}`}
    >
      {icon && iconPosition === "left" && Icon}

      {text && <span>{text}</span>}

      {icon && iconPosition === "right" && Icon}
    </button>
  );
};
