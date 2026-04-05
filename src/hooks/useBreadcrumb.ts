import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { parsePath } from "../lib/parsers/ParsePath";
import { getRouteLabel, knownPaths } from "../features/tables/Routes";

export const useBreadcrumb = () => {
  const location = useLocation();

  const segments = useMemo(() => {
    return parsePath(location.pathname);
  }, [location.pathname]);

  const items = useMemo(() => {
    return segments.map((seg) => {
      const parts = seg.path.split("/").filter(Boolean);

      // si el último NO es un path conocido → es ID → lo quitamos
      const last = parts[parts.length - 1];

      if (!knownPaths.includes(last)) {
        parts.pop();
      }

      return {
        label: getRouteLabel(seg.label),
        href: "/" + parts.join("/"),
      };
    });
  }, [segments]);

  return items;
};
