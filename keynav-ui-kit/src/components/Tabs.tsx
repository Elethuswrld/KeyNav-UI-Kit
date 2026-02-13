import { useId, useRef, useState } from "react";

type Tab = { label: string; content: React.ReactNode };

export default function Tabs() {
  const id = useId();
  const tabs: Tab[] = [
    { label: "Overview", content: <p className="text-gray-700">Overview content…</p> },
    { label: "Keyboard", content: <p className="text-gray-700">Arrow keys switch tabs.</p> },
    { label: "ARIA", content: <p className="text-gray-700">Roles + aria-selected + aria-controls.</p> },
  ];

  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (i: number) => {
    refs.current[i]?.focus();
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTab((active + 1) % tabs.length);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTab((active - 1 + tabs.length) % tabs.length);
    }
    if (e.key === "Home") {
      e.preventDefault();
      focusTab(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <div id="tabs" className="w-full">
      <div
        role="tablist"
        aria-label="Demo tabs"
        className="flex flex-wrap gap-2"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t, i) => {
          const tabId = `${id}-tab-${i}`;
          const panelId = `${id}-panel-${i}`;
          const selected = i === active;

          return (
            <button
              key={t.label}
              ref={(el) => (refs.current[i] = el)}
              id={tabId}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              className={`rounded-xl px-4 py-2 border ${
                selected ? "bg-black text-white" : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tabs.map((t, i) => {
        const tabId = `${id}-tab-${i}`;
        const panelId = `${id}-panel-${i}`;
        const selected = i === active;

        return (
          <div
            key={t.label}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!selected}
            className="mt-4 rounded-2xl border bg-white p-4"
          >
            {t.content}
          </div>
        );
      })}
    </div>
  );
}
