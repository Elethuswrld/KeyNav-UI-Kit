import { useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  restoreFocusRef?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
};

export default function Modal({ isOpen, title, onClose, restoreFocusRef, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, panelRef, onClose, restoreFocusRef);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1 text-sm"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3">{children}</div>

        <div className="mt-6 flex gap-2">
          <button className="rounded-lg bg-black px-4 py-2 text-white">Primary</button>
          <button className="rounded-lg border px-4 py-2">Secondary</button>
        </div>
      </div>
    </div>
  );
}
