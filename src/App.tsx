import { Routes, Route } from "react-router-dom";
import TablesScreen from "./pages/TablesScreen";
import { CreateQualitativeIndicators } from "./pages/CreateQualitativeIndicators";
import { CreateFundamental_Elements } from "./pages/CreateFundamental_Elements";
import { CreateQuantitativeIndicators } from "./pages/CreateQuantitativeIndicators";

function App() {
  return (
    <Routes>
      {/* 🎯 Ruta específica */}
      <Route
        path="/versiones/:vId/modelos/:mId/criterios/:cId/subcriterios/:sId/indicadores/cualitativos/:newId"
        element={<CreateQualitativeIndicators />}
      />
      <Route
        path="/versiones/:vId/modelos/:mId/criterios/:cId/subcriterios/:sId/indicadores/cuantitativos/:newId"
        element={<CreateQuantitativeIndicators />}
      />
      <Route
        path="/versiones/:vId/modelos/:mId/criterios/:cId/subcriterios/:sId/indicadores/:iId/elementos_fundamentales/:newId/configuracion_elementos_fundamentales"
        element={<CreateFundamental_Elements />}
      />
      {/* 🌐 Catch-all */}
      <Route path="/versiones/*" element={<TablesScreen />} />
    </Routes>
  );
}

export default App;
