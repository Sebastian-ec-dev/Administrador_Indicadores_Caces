import { useState, useMemo, useCallback, useEffect } from "react";
import { Input } from "../components/ui/Input";
import Breadcrumb from "../components/layout/Breadcrumb";
import Typography from "../components/ui/Typography";
import Grid from "../components/layout/Grid";
import { DataTable } from "../components/ui/DataTable";
import { useTableStore } from "../store/useTableStore";
import { useLocation, useNavigate } from "react-router-dom";
import { getTableConfig } from "../features/tables/TablesScreenConfig";
import { getNextRoute } from "../features/tables/Routes";
import { parsePath } from "../lib/parsers/ParsePath";
import CreateDefaultModal from "../components/modals/Default";
import { getData, sentData } from "../hooks/useTables";
import SelectIndicatorModal from "../components/modals/Type_Indicators";
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import FundamentalElementsModal from "../components/modals/Fundamental_Elements";
import ActionButtons from "../components/layout/ActionButtons";
import type { IconType } from "../components/ui/Button";

// ====================== COMPONENT ======================
function TablesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndicatorOpen, setModalIndicatorOpen] = useState(false);
  const [modalFundamentalOpen, setModalFundamentalOpen] = useState(false);

  const [modal_Title, setModal_Title] = useState("");
  const [modal_Update_Title, setModal_Update_Title] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalId, setModalId] = useState("");
  const [lastPath, setLastPath] = useState("");
  const [modalFundamentalContent, setModalFundamentalContent] = useState("");

  // ==================== HOOKS ====================
  const { data } = useTableStore();
  const location = useLocation();
  const navigate = useNavigate();
  const pathList = useBreadcrumb();

  // ==================== MEMOS ====================
  // Lectura del PATH para generar breadcrumb y lógica de navegación
  const segments = useMemo(() => {
    return parsePath(location.pathname);
  }, [location.pathname]);

  // ==================== HANDLERS ====================

  // Handler navegación siguiente nivel
  const handleNext = useCallback(
    (row: unknown) => {
      const r = row as { id: string };

      if (segments.length === 0) return;

      const current = segments[segments.length - 1].label;
      const next = getNextRoute(current);

      if (!next) return;

      navigate(`${location.pathname}/${r.id}/${next}`);
    },
    [navigate, location.pathname, segments],
  );

  const handleInfo = useCallback((row: unknown) => {
    const r = row as { id: string; information_sources: string };
    setModalFundamentalOpen(true);
    setModalFundamentalContent(r.information_sources);
  }, []);

  const handleSave = (modelData: { name: string; description: string }) => {
    sentData(location.pathname, modelData.name, modelData.description, modalId);
  };

  const handleSecundary = () => {
    switch (lastPath) {
      case "criterios":
        alert(
          "Toca redirigir para publicar nueva versión de modelo... (en desarrollo)",
        );
        break;

      default:
        setModal_Title(modal_new_Title);
        setModalName("");
        setModalDescription("");
        setModalOpen(true);
    }
  };

  const handleNew = () => {
    setModalId("");

    switch (lastPath) {
      case "indicadores":
        setModalIndicatorOpen(true);
        break;
      case "elementos_fundamentales":
        navigate(
          `${location.pathname}/new/configuracion_elementos_fundamentales`,
        );
        break;
      default:
        setModal_Title(modal_new_Title);
        setModalName("");
        setModalDescription("");
        setModalOpen(true);
    }
  };

  const handleModal = useCallback(
    (row: unknown) => {
      const r = row as {
        id: string;
        name: string;
        description: string;
        type: string;
      };
      setModalId(r.id);
      switch (lastPath) {
        case "indicadores":
          if (r.type === "Cualitativo") {
            navigate(`${location.pathname}/cualitativos/${r.id}`);
          } else {
            navigate(`${location.pathname}/cuantitativos/${r.id}`);
          }

          break;
        case "elementos_fundamentales":
          navigate(
            `${location.pathname}/${r.id}/configuracion_elementos_fundamentales`,
          );
          break;
        default:
          setModal_Title(modal_Update_Title);
          setModalName(r.name);
          setModalDescription(r.description);
          setModalOpen(true);
      }
    },
    [lastPath, modal_Update_Title, navigate, location.pathname],
  );

  // ==================== MEMOS ====================

  // Información de la tabla (columnas, títulos, etc) dependiendo del path
  const {
    columns,
    title,
    description,
    main_button,
    secondary_button,
    secondary_button_icon,
    modal_new_Title = "",
    modal_update_Title = "",
  } = useMemo(() => {
    if (segments.length === 0) {
      return {
        columns: [],
        title: "",
        description: "",
        main_button: "",
        secondary_button: "",
        secondary_button_icon: "",
        modal_new_Title: "",
        modal_update_Title: "",
      };
    }

    const last = segments[segments.length - 1];

    return getTableConfig(
      `/${last.label}`,
      handleNext,
      handleModal,
      handleInfo,
    );
  }, [segments, handleNext, handleModal, handleInfo]);

  // ==================== EFFECTS ====================

  useEffect(() => {
    setModal_Update_Title(modal_update_Title);
  }, [modal_update_Title]);

  // Load data when location changes
  useEffect(() => {
    const last = location.pathname.split("/").filter(Boolean).pop();
    setLastPath(last || "");
    getData(location.pathname);
  }, [location.pathname]);

  // ==================== RENDER ====================
  return (
    <div className="p-6">
      {/* Modales */}
      <CreateDefaultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        modalTitle={modal_Title}
        modalName={modalName}
        modalDescription={modalDescription}
      />

      <SelectIndicatorModal
        isOpen={modalIndicatorOpen}
        onClose={() => setModalIndicatorOpen(false)}
        onSelect={(type) => {
          if (type === "qualitative") {
            navigate(`${location.pathname}/cualitativos/new`);
          } else {
            navigate(`${location.pathname}/cuantitativos/new`);
          }
        }}
      />

      <FundamentalElementsModal
        isOpen={modalFundamentalOpen}
        onClose={() => setModalFundamentalOpen(false)}
        content={modalFundamentalContent}
      />

      {/* Breadcrumb */}
      <Breadcrumb items={pathList} />

      {/* Header */}
      <Grid className="items-start mb-4">
        <div>
          <Typography variant="h1" text={title} className="text-left mb-2" />

          <Typography
            variant="p"
            text={description}
            className="text-left mb-4"
          />
        </div>

        {secondary_button === "" ? (
          <ActionButtons
            actions={[
              {
                icon: "plus",
                iconPosition: "left",
                onClick: () => handleNew(),
                text: main_button,
              },
            ]}
          />
        ) : (
          <ActionButtons
            actions={[
              {
                icon: secondary_button_icon as IconType,
                iconPosition: "left",
                variant: "secondary",
                onClick: () => handleSecundary(),
                text: secondary_button,
              },
              {
                icon: "plus",
                iconPosition: "left",
                onClick: () => handleNew(),
                text: main_button,
              },
            ]}
          />
        )}
      </Grid>

      {/* Search */}
      <Input
        value={searchTerm}
        onChange={setSearchTerm}
        variant="search"
        placeholder="Buscar por versión o Nombre"
        validatorType="any"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={data}
        rowKey="id"
        search={searchTerm}
      />
    </div>
  );
}

export default TablesScreen;
