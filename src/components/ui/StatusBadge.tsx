import { Plus } from "lucide-react";

const iconMap = {
  plus: <Plus className="w-4 h-4" />,
};

type IconType = keyof typeof iconMap;

type VariantType =
  | "published"
  | "draft"
  | "quantitative"
  | "qualitative"
  | "icons";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold px-3 py-1 text-xs tracking-wide transition-all w-full min-[800px]:w-auto ";

const variants = {
  published: "bg-blue-800 text-white",
  draft: "text-gray bg-gray-200 ",
  quantitative: "text-blue-800 bg-blue-300",
  qualitative: "text-[oklch(45%_0.183_55.934)] bg-[oklch(96.2%_0.059_95.617)]",
  icons: "w-24",
};

type Props = {
  text?: string;
  className?: string;
  variant?: VariantType;
  icon?: IconType;
  iconPosition?: "left" | "right";
};

export const StatusBadge = ({
  text,
  className = "",
  variant = "published",
  icon,
  iconPosition = "left",
}: Props) => {
  const Icon = icon ? iconMap[icon] : null;

  const isIconOnly = icon && !text;

  return (
    <p
      className={`${base} ${variants[variant]} ${
        isIconOnly ? "p-2 rounded-full" : ""
      } ${className}`}
    >
      {icon && iconPosition === "left" && Icon}

      {text && <span>{text}</span>}

      {icon && iconPosition === "right" && Icon}
    </p>
  );
};
