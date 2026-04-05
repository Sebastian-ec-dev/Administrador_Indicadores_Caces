import { routeConfig } from "../../features/tables/Routes";
import type { BreadcrumbSegment } from "../../features/tables/TablesScreenConfig";

export function parsePath(pathname: string): BreadcrumbSegment[] {
  const parts = pathname.split("/").filter(Boolean);

  const segments: BreadcrumbSegment[] = [];
  let accumulatedPath = "";

  for (let i = 0; i < parts.length; i++) {
    const entity = parts[i];

    if (!routeConfig[entity as keyof typeof routeConfig]) continue;

    const id = parts[i + 1];

    if (id && !routeConfig[id as keyof typeof routeConfig]) {
      accumulatedPath += `/${entity}/${id}`;
      segments.push({ label: entity, id, path: accumulatedPath });
      i++;
    } else {
      accumulatedPath += `/${entity}`;
      segments.push({ label: entity, id: "", path: accumulatedPath });
    }
  }

  return segments;
}
