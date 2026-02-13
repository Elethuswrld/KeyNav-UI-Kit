import { useRef, useState } from "react";
import MobileDrawer from "./MobileDrawer";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <span className="font-bold">KeyNav UI Kit</span>

        <nav className="hidden items-center gap-3 sm:flex" aria-label="Primary">
          <a className="rounded-lg px-3 py-2 hover:bg-gray-100" href="#dropdown">
            Dropdown
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-gray-100" href="#tabs">
            Tabs
          </a>
          <a className="rounded-lg px-3 py-2 hover:bg-gray-100" href="#playground">
            Playground
          </a>
        </nav>

        <button
          ref={menuBtnRef}
          className="sm:hidden rounded-xl border px-3 py-2 text-sm"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      <MobileDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
        restoreFocusRef={menuBtnRef}
      >
        <ul className="space-y-2">
          <li>
            <a
              className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              href="#dropdown"
              onClick={() => setOpen(false)}
            >
              Dropdown
            </a>
          </li>
          <li>
            <a
              className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              href="#tabs"
              onClick={() => setOpen(false)}
            >
              Tabs
            </a>
          </li>
          <li>
            <a
              className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              href="#playground"
              onClick={() => setOpen(false)}
            >
              Playground
            </a>
          </li>
        </ul>
      </MobileDrawer>
    </header>
  );
}
