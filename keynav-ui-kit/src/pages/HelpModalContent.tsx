export default function HelpModalContent() {
  return (
    <div className="space-y-3 text-sm">
      <p className="text-gray-700">
        Keyboard shortcuts and navigation patterns in this app.
      </p>

      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Tab</span> — move forward
        </li>
        <li>
          <span className="font-semibold">Shift + Tab</span> — move backward
        </li>
        <li>
          <span className="font-semibold">Enter / Space</span> — activate buttons/links
        </li>
        <li>
          <span className="font-semibold">Esc</span> — close modal/menu
        </li>
        <li>
          <span className="font-semibold">?</span> — open this help
        </li>
      </ul>

      <p className="text-gray-500">
        Tip: Use keyboard-only to verify you can reach everything and see focus clearly.
      </p>
    </div>
  );
}
