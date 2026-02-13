import { useEffect } from "react";

type Options = {
  onHelp: () => void;
  isHelpOpen: boolean;
};

export function useGlobalHotkeys({ onHelp, isHelpOpen }: Options) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don’t hijack typing in inputs/textareas/contenteditable
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        target?.isContentEditable;

      if (isTyping) return;

      // "?" is Shift + "/"
      if (e.key === "?" && !isHelpOpen) {
        e.preventDefault();
        onHelp();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onHelp, isHelpOpen]);
}
