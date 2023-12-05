import { Map } from "@2gis/mapgl/global";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";

import { useIsUnmounted } from "./useInUnmounted";

/**
 * Хук слушает изменение размеров контейнера карты и обновляет размер карты.
 * @param mapInstance инстанс карты
 */
export const useInvalidateSize = <T extends HTMLElement = HTMLElement>(
  mapInstance: Map | null
): MutableRefObject<T | null> => {
  const ref = useRef<T>(null);

  const isUnmounted = useIsUnmounted();

  const invalidateSize = useCallback(() => {
    if (mapInstance) {
      mapInstance.invalidateSize();
    }
  }, [mapInstance]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserver = new window.ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        requestAnimationFrame(() => {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }

          invalidateSize();
        });
      }
    );

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [invalidateSize, isUnmounted]);

  return ref;
};
