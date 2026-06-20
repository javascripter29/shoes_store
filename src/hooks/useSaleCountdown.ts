import { useEffect, useState } from "react";
import { formatCountdown, getSaleDeadline } from "../logic/countdown";

export function useSaleCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => getSaleDeadline() - Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(getSaleDeadline() - Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return formatCountdown(timeLeft);
}

