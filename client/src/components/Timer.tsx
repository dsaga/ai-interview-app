import { useEffect, useState } from "react";

export function Timer({ timeMin }: { timeMin: number }) {
  const [time, setTime] = useState(timeMin * 60);

  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    if (time <= 0) clearTimeout(interval);

    return () => clearTimeout(interval);
  }, [time]);

  return (
    <div className="flex items-center justify-center">{`${Math.floor(
      time / 60
    )}:${time % 60}`}</div>
  );
}
