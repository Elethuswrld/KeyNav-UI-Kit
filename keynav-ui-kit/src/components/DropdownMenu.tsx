import { useEffect, useMemo, useRef, useState } from "react";

type Item = { id: string; label: string };

function startsWithIgnoreCase(text: string, q: string) {
  return text.toLowerCase().startsWith(q.toLowerCase());
}

export default function DropdownMenu() {
  const items: Item[] = useMemo(
    () => [
      { id: "new", label: "New File" },
      { id: "open", label: "Open…" },
      { id: "save", label: "Save" },
      { id: "export", label: "Export PDF" },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const typeRef = useRef("");
  const typeTimer = useRef<number | null>(null);

  const close = () => {
    setOpen(false);
    // restore focus
    buttonRef.current?.focus();
  };

  const focusItem = (index: number) => {
    setActive(index);
    const el = menuRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitem']")[index];
    el?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || buttonRef.current?.contains(t)) return;
      close();
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(items.length - 1));
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem((active + 1) % items.length);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem((active - 1 + items.length) % items.length);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      focusItem(items.length - 1);
      return;
    }

    // typeahead: build a small buffer and jump
    if (e.key.length === 1 && /\S/.test(e.key)) {
      typeRef.current += e.key;
      if (typeTimer.current) window.clearTimeout(typeTimer.current);
      typeTimer.current = window.setTimeout(() => (typeRef.current = ""), 600);

      const idx = items.findIndex((it) => startsWithIgnoreCase(it.label, typeRef.current));
      if (idx >= 0) focusItem(idx);
    }
  };

  const onSelect = (it: Item) => {
    alert(`Selected: ${it.label}`);
    close();
  };

  return (
    <div className="relative inline-block" id="dropdown">
      <button
        ref={buttonRef}
        className="rounded-xl border bg-white px-4 py-2 hover:bg-gray-100"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) requestAnimationFrame(() => focusItem(0));
        }}
        onKeyDown={onButtonKeyDown}
      >
        Actions ▾
      </button>

      {open ? (
        <ul
          ref={menuRef}
          className="absolute left-0 mt-2 w-56 rounded-2xl border bg-white p-2 shadow-lg"
          role="menu"
          aria-label="Actions"
          onKeyDown={onMenuKeyDown}
        >
          {items.map((it, idx) => (
            <li key={it.id} role="none">
              <button
                role="menuitem"
                className={`w-full rounded-xl px-3 py-2 text-left hover:bg-gray-100 ${
                  idx === active ? "bg-gray-100" : ""
                }`}
                onMouseEnter={() => setActive(idx)}
                onClick={() => onSelect(it)}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
