import { useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    // Simple implementation that just shows an alert for now
    // In a production app, this would add to a toast queue
    const message = props.description || props.title || "";
    if (props.variant === "destructive") {
      console.error(message);
    } else {
      console.log(message);
    }
    
    // Add toast to state (for future UI implementation)
    setToasts((prev) => [...prev, props]);
    
    // For now, use native alert to show the message
    setTimeout(() => {
      alert(message);
    }, 0);
  };

  return { toast };
}
