"use client";

import { useEffect, useState } from "react";
import "./style.css";

export default function Relogio() {
  const [hora, setHora] = useState<Date | null>(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    // Set initial time immediately after mount
    setHora(new Date());

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex flex-col items-center not-italic">
      <span className="relative">
        <span className="letra-d"></span>
        <span className="text-[3em]">
          <span className="text-transparent">D</span>
          IW
        </span>
      </span>

      <span>
        {hora ? hora.toLocaleTimeString() : "Loading..."}
      </span>
    </div>
  );
}
