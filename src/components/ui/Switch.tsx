import Typography from "../ui/Typography";

export type ButtonType = "button" | "submit" | "reset";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  type?: ButtonType;
};

function Switch({ enabled, onToggle, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={() => onToggle(!enabled)}
      className={`relative w-12 h-6 rounded-full transition ${
        enabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <Typography
        variant="span"
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition ${
          enabled ? "translate-x-6" : ""
        }`}
      />
    </button>
  );
}

export default Switch;
