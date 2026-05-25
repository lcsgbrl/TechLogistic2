import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { DataEntry } from "./pages/DataEntry";
import { Results } from "./pages/Results";
import { QATesting } from "./pages/QATesting";
import { Settings } from "./pages/Settings";
import { Routes } from "./pages/Routes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/entrada-dados",
    Component: DataEntry,
  },
  {
    path: "/rotas",
    Component: Routes,
  },
  {
    path: "/resultados",
    Component: Results,
  },
  {
    path: "/qa-testes",
    Component: QATesting,
  },
  {
    path: "/configuracoes",
    Component: Settings,
  },
]);
