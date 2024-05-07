import equal from "fast-deep-equal";
import { useEffect, useRef, useState } from "react";
import { useAutoSaveUpdatePost } from "./useUpdatePost";

export function useAutoSave(
  autoSaveEnabled,
  postId,
  newPost,
  saveDelay = 3000,
) {
  const prevState = useRef(autoSaveEnabled ? newPost : null);
  const [postHasChanged, setPostHasChanged] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Guardado");
  const { updatePost, isUpdating } = useAutoSaveUpdatePost();

  useEffect(() => {
    if (!autoSaveEnabled) return;

    if (prevState.current && !equal(prevState.current, newPost)) {
      prevState.current = newPost;
      setPostHasChanged(true);
      setSaveStatus("Esperando a guardar");
    }

    if (!prevState.current) {
      prevState.current = newPost;
    }
  }, [autoSaveEnabled, newPost]);

  useEffect(() => {
    if (!autoSaveEnabled) return;

    if (postHasChanged) {
      const timer = setTimeout(() => {
        updatePost({ postId, newPost });
        setPostHasChanged(false);
      }, saveDelay);

      return () => clearTimeout(timer);
    }
  }, [autoSaveEnabled, updatePost, postHasChanged, postId, newPost, saveDelay]);

  useEffect(() => {
    if (isUpdating) setSaveStatus("Guardando");
    if (!isUpdating) setSaveStatus("Guardado");
  }, [isUpdating]);

  return saveStatus;
}
