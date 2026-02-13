import { useRef, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState("");
  const timerRef = useRef<number | null>(null);

  const showToast = (msg: string, ms = 2500) => {
    setToast(msg);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(""), ms);
  };

  return { toast, showToast };
}
