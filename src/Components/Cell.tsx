import { useRef, useEffect } from "react";
import type { CellOwner } from "../types";

type Props = {
  owner: CellOwner;
  onClick: () => void;
};

export default function Cell({ owner, onClick }: Props) {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (owner && cellRef.current) {
      cellRef.current.classList.add("cell-capture");
      const timer = setTimeout(() => {
        cellRef.current?.classList.remove("cell-capture");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [owner]);

  return (
    <div
      ref={cellRef}
      onClick={onClick}
      className={`
        aspect-square w-full 
        border border-white/5 
        transition-all duration-300 
        hover:scale-125 hover:z-10 hover:border-white/20 hover:shadow-lg
        cursor-pointer
        rounded-sm
      `}
      style={{
        backgroundColor: owner?.color ?? "rgba(255,255,255,0.03)",
        boxShadow: owner ? `0 0 12px ${owner.color}44` : 'none',
        "--glow-color": owner?.color ?? "rgba(255,255,255,0.5)"
      } as React.CSSProperties}
      title={owner ? `Owner: ${owner.username}` : "Unclaimed"}
    />
  );
}

