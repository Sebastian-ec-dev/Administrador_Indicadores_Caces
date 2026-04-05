import {
  versionData,
  criteriaData,
  fundamentalElementsData,
  indicatorsData,
  modelData,
  subcriteriaData,
} from "../mock/version";
import type { TableRow } from "../features/tables/TablesScreenConfig";

import { useTableStore } from "../store/useTableStore";

export const getData = async (path: string) => {
  // Este metodo es solo para pruebas ya que se debe colocar el fecth con el path para extaer los datos
  const split = path.split("/");

  let List: TableRow[] = [];
  switch (split[split.length - 1]) {
    case "versiones":
      List = versionData;
      break;
    case "modelos":
      List = modelData;
      break;
    case "criterios":
      List = criteriaData;
      break;

    case "subcriterios":
      List = subcriteriaData;
      break;
    case "indicadores":
      List = indicatorsData;
      break;
    case "elementos_fundamentales":
      List = fundamentalElementsData;
      break;
    default:
      List = [];
  }

  // Cargamos los datos al store para que se puedan usar en la tabla y en el modal de edicion/creacion
  useTableStore.getState().setData(List.reverse());
};

export const sentData = async (
  path: string,
  name: string,
  description: string,
  modalId: string,
) => {
  const split = path.split("/");
  const today = new Date().toISOString().slice(0, 10);

  switch (split[split.length - 1]) {
    case "versiones":
      if (modalId === "") {
        useTableStore.getState().saveVersion(modalId, {
          id:
            Math.max(
              0,
              ...useTableStore
                .getState()
                .data.map((i) =>
                  Number((i.id as number | string | undefined) ?? 0),
                ),
            ) + 1,
          name: name,
          description: description,
          version: "1.1.0 Prueba",
          createdAt: today,
        });
      } else {
        useTableStore.getState().saveVersion(modalId, {
          name: name,
          description: description,
          createdAt: today,
        });
      }

      break;
    case "modelos":
      if (modalId === "") {
        useTableStore.getState().saveVersion(modalId, {
          id:
            Math.max(
              0,
              ...useTableStore
                .getState()
                .data.map((i) =>
                  Number((i.id as number | string | undefined) ?? 0),
                ),
            ) + 1,
          name: name,
          description: description,
          status: false,
          createdAt: today,
        });
      } else {
        useTableStore.getState().saveVersion(modalId, {
          name: name,
          description: description,
          createdAt: today,
        });
      }

      break;
    default:
      if (modalId === "") {
        useTableStore.getState().saveVersion(modalId, {
          id:
            Math.max(
              0,
              ...useTableStore
                .getState()
                .data.map((i) =>
                  Number((i.id as number | string | undefined) ?? 0),
                ),
            ) + 1,
          name: name,
          description: description,
          createdAt: today,
        });
      } else {
        useTableStore.getState().saveVersion(modalId, {
          name: name,
          description: description,
          createdAt: today,
        });
      }
  }
};
