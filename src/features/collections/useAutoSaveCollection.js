import equal from "fast-deep-equal";
import { useEffect, useRef, useState } from "react";
import { useAutoSaveUpdateCollection } from "./useUpdateCollection";

export function useAutoSaveCollection(
  autoSaveEnabled,
  collectionId,
  newCollection,
  saveDelay = 1500,
) {
  const prevState = useRef(autoSaveEnabled ? newCollection : null);
  const [collectionHasChanged, setCollectionHasChanged] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Guardado");
  const { updateCollection, isUpdating } = useAutoSaveUpdateCollection();

  useEffect(() => {
    if (!autoSaveEnabled) return;

    if (prevState.current && !equal(prevState.current, newCollection)) {
      prevState.current = newCollection;
      setCollectionHasChanged(true);
      setSaveStatus("Esperando a guardar");
    }

    if (!prevState.current) {
      prevState.current = newCollection;
    }
  }, [autoSaveEnabled, newCollection]);

  useEffect(() => {
    if (!autoSaveEnabled) return;

    if (collectionHasChanged) {
      const timer = setTimeout(() => {
        updateCollection({ collectionId, newCollection });
        setCollectionHasChanged(false);
      }, saveDelay);

      return () => clearTimeout(timer);
    }
  }, [
    autoSaveEnabled,
    updateCollection,
    collectionHasChanged,
    collectionId,
    newCollection,
    saveDelay,
  ]);

  useEffect(() => {
    if (isUpdating) setSaveStatus("Guardando");
    if (!isUpdating) setSaveStatus("Guardado");
  }, [isUpdating]);

  return saveStatus;
}
