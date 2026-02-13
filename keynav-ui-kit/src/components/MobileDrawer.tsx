import { useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  restoreFocusRef?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function MobileDrawer({
  isOpen,
  onClose,
  restoreFocusRef,
  children,
}: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, panelRef, onClose, restoreFocusRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute right-0 top-0 h-full w-[min(20rem,85vw)] bg-white shadow-xl p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between">
          <div className="font-semibold">Menu</div>
          <button
            onClick={onClose}
            className="rounded-xl border px-3 py-1 text-sm"
          >
            Close
          </button>
        </div>

        <nav className="mt-4">{children}</nav>
      </div>
    </div>
  );
}
