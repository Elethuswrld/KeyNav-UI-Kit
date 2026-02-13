import { useEffect } from "react";

function getFocusable(container: HTMLElement) {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ];
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(",")))
    .filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

export function useFocusTrap(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLElement>,
  onClose: () => void,
  restoreFocusRef?: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const focusables = getFocusable(container);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Move focus into modal
    (first ?? container).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      if (focusables.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }

      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (!active || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to opener
      restoreFocusRef?.current?.focus();
    };
  }, [isOpen, containerRef, onClose, restoreFocusRef]);
}
