import Typography from "../ui/Typography";
import Grid from "../layout/Grid";
import Switch from "../ui/Switch";

type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
};

function EvidenceConfig({
  enabled,
  onToggle,
  title = "Configuración de Evidencias",
  description = "Activa esta opción cuando el indicador requiera evidencias predefinidas.",
  className,
}: Props) {
  return (
    <Grid
      className={`bg-gray-100 border border-gray-300 rounded-xl p-4 gap-y-4 ${className}`}
    >
      {/* Texto */}
      <div>
        <Typography
          text={title}
          variant="h3"
          className="font-semibold text-blue-900"
        />

        <Typography text={description} variant="h5" />
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-end">
        <Switch enabled={enabled} onToggle={onToggle} />
      </div>
    </Grid>
  );
}

export default EvidenceConfig;
