// store/useTableStore.ts
import { create } from "zustand";
import type { TableRow } from "../features/tables/TablesScreenConfig";

type TableStore = {
  data: TableRow[];
  setData: (data: TableRow[] | ((prev: TableRow[]) => TableRow[])) => void;
  saveVersion: (
    modalId: number | string | null,
    modelData: Partial<TableRow>,
  ) => void;
};

export const useTableStore = create<TableStore>((set) => ({
  data: [],
  setData: (update) =>
    set((state) => ({
      data: typeof update === "function" ? update(state.data) : update,
    })),
  saveVersion: (modalId, modelData) =>
    set((state) => {
      const exists = state.data.some(
        (item) => (item.id as number | string | undefined) === modalId,
      );

      const newData = exists
        ? state.data.map((item) =>
            (item.id as number | string | undefined) === modalId
              ? {
                  ...item,
                  ...modelData,
                }
              : item,
          )
        : [
            {
              ...modelData,
            },
            ...state.data,
          ];

      return { data: newData };
    }),
}));
