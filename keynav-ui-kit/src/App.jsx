import { useRef, useState } from "react";
import SkipLink from './components/SkipLink'
import Modal from "./components/Modal";
import HelpModalContent from "./pages/HelpModalContent";
import { useGlobalHotkeys } from "./hooks/useGlobalHotkeys";
import ToastRegion from "./components/ToastRegion";
import { useToast } from "./hooks/useToast";
import Navbar from "./components/Navbar";

function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const helpBtnRef = useRef(null);
  const { toast, showToast } = useToast();

  useGlobalHotkeys({
    onHelp: () => setHelpOpen(true),
    isHelpOpen: helpOpen,
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SkipLink />

      <Navbar />

      <main id="main" tabIndex={-1} className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold">Beginner additions ✅</h1>
        <p className="mt-2 text-gray-600">
          Try pressing <b>?</b> to open help. Use <b>Tab</b> to move around.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => showToast("Saved successfully ✅")}
            className="rounded-xl bg-black px-4 py-2 text-white
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Save
          </button>
          <button
            onClick={() => showToast("Copied to clipboard 📋")}
            className="rounded-xl border bg-white px-4 py-2
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          >
            Copy
          </button>
        </div>

        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold">Focus Playground</h2>

          <p className="text-gray-600 text-sm">
            Use only your keyboard. Tab through everything below.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Text input"
              className="rounded-xl border p-3"
            />

            <input
              type="email"
              placeholder="Email input"
              className="rounded-xl border p-3"
            />

            <select className="rounded-xl border p-3">
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
            </select>

            <a
              href="#"
              className="rounded-xl border p-3 text-center hover:bg-gray-100"
            >
              Focusable Link Card
            </a>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="rounded-xl bg-black px-4 py-2 text-white">
              Primary Action
            </button>

            <button className="rounded-xl border px-4 py-2">
              Secondary Action
            </button>

            <button
              disabled
              className="rounded-xl border px-4 py-2 opacity-50"
            >
              Disabled Button
            </button>
          </div>
        </section>
      </main>

      <Modal
        isOpen={helpOpen}
        title="Keyboard Shortcuts"
        onClose={() => setHelpOpen(false)}
        restoreFocusRef={helpBtnRef}
      >
        <HelpModalContent />
      </Modal>

      <ToastRegion message={toast} />
    </div>
  )
}

export default App
