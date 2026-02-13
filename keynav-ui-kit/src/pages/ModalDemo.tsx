import { useRef, useState } from "react";
import Modal from "../components/Modal";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Modal Demo</h1>

      <button
        ref={openBtnRef}
        onClick={() => setOpen(true)}
        className="rounded-xl bg-black px-4 py-2 text-white"
      >
        Open Modal
      </button>

      <p className="text-sm text-gray-600">
        Try: Tab/Shift+Tab to cycle, Esc to close, focus returns to the button.
      </p>

      <Modal
        isOpen={open}
        title="Keyboard-friendly modal"
        onClose={() => setOpen(false)}
        restoreFocusRef={openBtnRef}
      >
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input className="mt-1 w-full rounded-lg border p-2" placeholder="Type here" />
        </label>
        <a href="https://example.com" className="underline">
          Focusable link
        </a>
      </Modal>
    </div>
  );
}
