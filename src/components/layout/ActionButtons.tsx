import { Button } from "../ui/Button";
import type {
  VariantType,
  ButtonType,
  IconType,
  IconPosition,
} from "../ui/Button";

export type Action = {
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: VariantType;
  icon?: IconType;
  iconPosition?: IconPosition;
  type?: ButtonType;
  disabled?: boolean;
};

type Props = {
  actions: Action[];
  className?: string;
};

export default function ActionButtons({ actions, className = "" }: Props) {
  return (
    <div
      className={`flex flex-col-reverse md:flex-row justify-end mt-4 gap-2 ${className}`}
    >
      {actions.map((action, index) => {
        const isPrimary = action.variant === "primary";

        return (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            text={action.text}
            icon={action.icon}
            iconPosition={action.iconPosition}
            type={action.type}
            disabled={action.disabled}
            className={`
              w-full sm:w-auto
              ${isPrimary ? "order-1 sm:order-2" : "order-2 sm:order-1"}
              ${action.className || ""}
            `}
          />
        );
      })}
    </div>
  );
}
