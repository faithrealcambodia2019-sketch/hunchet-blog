import { useEffect } from "react";
import { CheckIcon } from "./Icons";

export default function Toast({ message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  return (
    <div className="luxury-toast-pill" role="status" aria-live="polite">
      <div className="toast-icon-wrap">
        <CheckIcon style={{ width: 14, height: 14 }} />
      </div>
      <span className="toast-message">{message}</span>
    </div>
  );
}
